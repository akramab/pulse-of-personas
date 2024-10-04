package main

import (
	"bg-proto/config"
	openai "bg-proto/open-ai"
	"fmt"
)

func main() {
	config := config.NewConfig()
	client := openai.NewClient(config)

	imageRequest := openai.ImageRequest{
		Prompt: "What are in these images? Is there any difference between them?",
		ImageURLs: []string{
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
		},
	}

	resp, err := client.DescribeImages(imageRequest)
	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return
	}

	fmt.Println(resp)
}
