package main

import (
	"bg-proto/config"
	openai "bg-proto/open-ai"
	"context"
	"fmt"
)

func main() {
	ctx := context.Background()
	config := config.NewConfig()
	client := openai.NewClient(config)

	createImagePrompt := "Key Visual for selling flu medicine."
	numOfImages := 3
	resp, err := client.CreateImageFromPrompt(ctx, createImagePrompt, numOfImages)
	if err != nil {
		fmt.Printf("Error occured: %v\n", err)
		return
	}

	fmt.Println(resp)
}
