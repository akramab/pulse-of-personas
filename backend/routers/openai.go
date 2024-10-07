package routers

import (
	openai "bg-proto/open-ai"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func OpenAIRouter(client openai.Client) http.Handler {
	r := chi.NewRouter()

	r.Post("/desc-medicine-image", func(w http.ResponseWriter, r *http.Request) {
		request := openai.ImageRequest{
			Prompt:    fmt.Sprintf("You're a market analyst specializing in a pharmaceutical company like CVS. Your task is to identify the market segments, such as the target sex, age group, seasonality, and income level. The brand name is %s and its price is $%s", r.FormValue("name"), r.FormValue("price")),
			ImageURLs: []string{r.FormValue("imageUrl")},
		}

		result, err := client.AskPromptWithImages(r.Context(), request)
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
