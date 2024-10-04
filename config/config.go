package config

import "github.com/BurntSushi/toml"

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
