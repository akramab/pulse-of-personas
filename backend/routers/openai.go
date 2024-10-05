package routers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func OpenAIRouter() http.Handler {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode("hello")
	})

	return r
}
