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
	// default OpenAPI model to be used for prompts
	// for now the default is set to GPT4oMini
	defaultPromptModel string
	// default OpenAPI model to be used for generating images
	// for now the default is set to DALL-E-2 for support on creating multiple images up to 10 images at once
	defaultImageGenerationModel string
}

// NewClient() creates a new Client and set the default model to GPT4oMini
func NewClient(config config.Config) Client {
	return Client{
		oaclient:                    openai.NewClient(config.APIKey),
		defaultPromptModel:          openai.GPT4oMini,
		defaultImageGenerationModel: openai.CreateImageModelDallE2,
	}
}

// This function should be used for a simple prompt to the ChatGPT server
func (c *Client) AskPrompt(ctx context.Context, prompt string) (string, error) {
	resp, err := c.oaclient.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: c.defaultPromptModel,
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
func (c *Client) AskPromptWithImages(ctx context.Context, request ImageRequest) (string, error) {
	chatMessagePart, err := request.buildChatMessagePart()
	if err != nil {
		return "", err
	}

	resp, err := c.oaclient.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: c.defaultPromptModel,
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

// Create images based on a given prompt.
// TODO: For now the images will be given as a URL.
// We could change this to save created image to local later if we want.
func (c *Client) CreateImageFromPrompt(ctx context.Context, prompt string, numOfImages int) ([]string, error) {
	reqUrl := openai.ImageRequest{
		Model:          c.defaultImageGenerationModel,
		Prompt:         prompt,
		Size:           openai.CreateImageSize256x256, // default to 256x256 for now
		ResponseFormat: openai.CreateImageResponseFormatURL,
		N:              numOfImages,
	}

	respUrl, err := c.oaclient.CreateImage(ctx, reqUrl)
	if err != nil {
		fmt.Printf("Image creation error: %v\n", err)
		return nil, err
	}

	imageURLs := make([]string, len(respUrl.Data))
	for idx, data := range respUrl.Data {
		imageURLs[idx] = data.URL
	}

	return imageURLs, nil
}
