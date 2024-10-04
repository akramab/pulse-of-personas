package openai

import (
	"bg-proto/config"
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"

	"github.com/sashabaranov/go-openai"
)

type Client struct {
	oaclient *openai.Client
}

type ImageRequest struct {
	Prompt    string
	ImageURLs []string
}

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

func NewClient(config config.Config) Client {
	return Client{
		oaclient: openai.NewClient(config.APIKey),
	}
}

func (c *Client) DescribeImages(request ImageRequest) (string, error) {
	chatMessagePart, err := request.buildChatMessagePart()
	if err != nil {
		return "", err
	}

	resp, err := c.oaclient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4oMini,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:         openai.ChatMessageRoleUser,
					MultiContent: chatMessagePart,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}
