package uscensus

import (
	"bg-proto/config"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type Client interface {
	// This is a test function to fetch data from US Census API
	GetData(ctx context.Context, year int, stateCode StateCode, rangeCode RangeCode) ([][]string, error)
}

type clientImpl struct {
	APIKey string
}

// NewClient() creates a new Client and set the default model to GPT4oMini
func NewClient(config config.Config) Client {
	return &clientImpl{
		APIKey: config.USCensusAPIKey,
	}
}

func (c *clientImpl) GetData(ctx context.Context, year int, stateCode StateCode, rangeCode RangeCode) ([][]string, error) {
	url := fmt.Sprintf("https://api.census.gov/data/%d/acs/acs1?get=NAME,%s&for=state:%d&key=%s", year, rangeCode, stateCode, c.APIKey)

	// Create a new HTTP request
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error making request: %v\n", err)
		return nil, err
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v\n", err)
		return nil, err
	}

	// Parse the JSON response
	var result [][]string
	err = json.Unmarshal(body, &result)
	if err != nil {
		log.Printf("Error unmarshaling response: %v\n", err)
		return nil, err
	}

	return result, nil
}
