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

	createImagePrompt := "Parrot on a skateboard performs a trick, cartoon style, natural light, high detail"
	resp, err := client.CreateImageFromPrompt(ctx, createImagePrompt)
	if err != nil {
		fmt.Printf("Error occured: %v\n", err)
		return
	}

	fmt.Println(resp)
}
