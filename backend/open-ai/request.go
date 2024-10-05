package openai

import (
	"encoding/base64"
	"io"
	"net/http"

	"github.com/sashabaranov/go-openai"
)

// ImageRequest is used for making a prompt with images to the ChatGPT server
// TODO: for now, only image URLs from the internet are supported.
// We should be able to handle local images too, but this support has not yet been implemented
type ImageRequest struct {
	// Your given prompt for ChatGPT
	Prompt string
	// Put the link to the images that you want to attach here
	ImageURLs []string
}

// Right now ChatGPT API only accept image in a base64 format
// this function is used to convert every image to base64.
func (r *ImageRequest) imagesToBase64() ([]string, error) {
	imgBase64List := make([]string, len(r.ImageURLs))
	for idx, url := range r.ImageURLs {
		resp, err := http.Get(url)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()

		imgBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}

		imgBase64Str := base64.StdEncoding.EncodeToString(imgBytes)
		imgBase64List[idx] = "data:image/jpeg;base64," + imgBase64Str
	}

	return imgBase64List, nil
}

func (r *ImageRequest) buildChatMessagePart() ([]openai.ChatMessagePart, error) {
	imgBase64List, err := r.imagesToBase64()
	if err != nil {
		return nil, err
	}

	chatMessagePart := make([]openai.ChatMessagePart, 0)
	for _, imgBase64 := range imgBase64List {
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
