package openai

import (
	"encoding/base64"
	"io"
	"net/http"

	"github.com/sashabaranov/go-openai"
)

// ImageRequest is used for making a prompt with images to the ChatGPT server
// We should be able to handle local images too, but this support has not yet been implemented
type ImageRequest struct {
	// Your given prompt for ChatGPT
	Prompt    string
	DrugName  string
	DrugPrice string
	// Put the link to the images that you want to attach here
	ImageURLs   []string
	ImageBase64 []string
}

// Right now ChatGPT API only accept image in a base64 format
// this function is used to convert every image to base64.
func (r *ImageRequest) imagesToBase64() error {
	r.ImageBase64 = make([]string, len(r.ImageURLs))
	for idx, url := range r.ImageURLs {
		resp, err := http.Get(url)
		if err != nil {
			return err
		}
		defer resp.Body.Close()

		imgBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			return err
		}

		imgBase64Str := base64.StdEncoding.EncodeToString(imgBytes)
		r.ImageBase64[idx] = "data:image/jpeg;base64," + imgBase64Str
	}

	return nil
}

func (r *ImageRequest) buildChatMessagePart() ([]openai.ChatMessagePart, error) {
	if len(r.ImageBase64) == 0 {
		err := r.imagesToBase64()
		if err != nil {
			return nil, err
		}
	}

	chatMessagePart := make([]openai.ChatMessagePart, 0)
	for _, imgBase64 := range r.ImageBase64 {
		chatMessagePart = append(chatMessagePart, openai.ChatMessagePart{
			Type: openai.ChatMessagePartTypeImageURL,
			ImageURL: &openai.ChatMessageImageURL{
				URL: imgBase64,
			},
		})
	}

	chatMessagePart = append(chatMessagePart, openai.ChatMessagePart{
		Type: openai.ChatMessagePartTypeText,
		Text: r.Prompt,
	})
	return chatMessagePart, nil
}
