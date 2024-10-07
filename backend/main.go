package main

import (
	"bg-proto/config"
	openai "bg-proto/open-ai"
	"bg-proto/routers"
	uscensus "bg-proto/us-census"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func main() {
	config := config.NewConfig()
	censusClient := uscensus.NewClient(config)
	openaiClient := openai.NewClient(config)

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Route("/", func(r chi.Router) {
		r.Mount("/uscensus", routers.USCensusRouter(censusClient))
		r.Mount("/openai", routers.OpenAIRouter(openaiClient))
	})

	port := 9090
	defaultTimeout := 100 * time.Second
	address := fmt.Sprintf(":%d", port)
	srv := http.Server{
		Addr:         address,
		Handler:      r,
		ReadTimeout:  defaultTimeout,
		WriteTimeout: defaultTimeout,
		IdleTimeout:  defaultTimeout,
	}

	log.Printf("Server started on port:%d!", port)
	srv.ListenAndServe()
}
