package routers

import (
	uscensus "bg-proto/us-census"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func USCensusRouter(client uscensus.Client) http.Handler {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		result, err := client.GetData(r.Context(), 2023, uscensus.StateCodeNewYork, uscensus.RangeCodeGetTotalAll)
		if err != nil {
			fmt.Println(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(result)
	})

	return r
}
