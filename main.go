package main

import (
	"context"
	"fmt"

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

func main() {
	config := NewConfig()
	client := openai.NewClient(config.APIKey)
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "Give me a suggestion for a great Key Visual to deliver on a campaign related to health product",
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
