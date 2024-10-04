package config

import "github.com/BurntSushi/toml"

// Config holds all the necessary configuration values
// for this application to run
type Config struct {
	// APIKey should have a valid OpenAPI APIKey value.
	// You can get your API Key from here "https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key".
	// Put the API Key value in the config.toml file
	APIKey string `toml:"API_KEY"`
}

// NewConfig() create a new config to be used throghout this application
func NewConfig() Config {
	var config Config
	_, err := toml.DecodeFile("config.toml", &config)
	if err != nil {
		panic(err)
	}
	return config
}
