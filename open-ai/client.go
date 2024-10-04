package openai

import (
	"bg-proto/config"
	"context"
	"fmt"

	"github.com/sashabaranov/go-openai"
)

// Client wraps the OpenAPI library from github.com/sashabaranov/go-openai.
// This struct should implement simpler functions that are tailored for this application intended use
type Client struct {
	// openapi client used by this struct
	oaclient *openai.Client
	// default OpenAPI model to be used
	// for now the default is set to GPT4oMini
	defaultModel string
}

// NewClient() creates a new Client and set the default model to GPT4oMini
func NewClient(config config.Config) Client {
	return Client{
		oaclient:     openai.NewClient(config.APIKey),
		defaultModel: openai.GPT4oMini,
	}
}

// This function should be used for a simple prompt to the ChatGPT server
func (c *Client) AskPrompt(prompt string) (string, error) {
	resp, err := c.oaclient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: c.defaultModel,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
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

// Use this function if you want to make a promp with attached image / images
func (c *Client) AskPromptWithImages(request ImageRequest) (string, error) {
	chatMessagePart, err := request.buildChatMessagePart()
	if err != nil {
		return "", err
	}

	resp, err := c.oaclient.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: c.defaultModel,
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
