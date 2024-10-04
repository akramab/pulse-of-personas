package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"

	"github.com/BurntSushi/toml"
	openai "github.com/sashabaranov/go-openai"
)

type Config struct {
	APIKey string `toml:"API_KEY"`
}

func NewConfig() Config {
	var config Config
	_, err := toml.DecodeFile("config.toml", &config)
	if err != nil {
		panic(err)
	}
	return config
}

func imageToBase64(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	imgBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	imgBase64Str := base64.StdEncoding.EncodeToString(imgBytes)
	return "data:image/jpeg;base64," + imgBase64Str, nil
}

func main() {
	config := NewConfig()
	client := openai.NewClient(config.APIKey)

	imageURL1 := "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
	imageURL2 := "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"

	imgBase64_1, err := imageToBase64(imageURL1)
	if err != nil {
		fmt.Printf("Failed to convert image 1: %v\n", err)
		return
	}

	imgBase64_2, err := imageToBase64(imageURL2)
	if err != nil {
		fmt.Printf("Failed to convert image 2: %v\n", err)
		return
	}

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model:     openai.GPT4oMini,
			MaxTokens: 300,
			Messages: []openai.ChatCompletionMessage{
				{
					Role: openai.ChatMessageRoleUser,
					MultiContent: []openai.ChatMessagePart{
						{
							Type: openai.ChatMessagePartTypeText,
							Text: "What are in these images? Is there any difference between them?",
						},
						{
							Type: openai.ChatMessagePartTypeImageURL,
							ImageURL: &openai.ChatMessageImageURL{
								URL: imgBase64_1,
							},
						},
						{
							Type: openai.ChatMessagePartTypeImageURL,
							ImageURL: &openai.ChatMessageImageURL{
								URL: imgBase64_2,
							},
						},
					},
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	fmt.Println(resp.Choices[0].Message.Content)
}
