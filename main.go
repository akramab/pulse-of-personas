package main

import (
	"bg-proto/config"
	uscensus "bg-proto/us-census"
	"context"
)

func main() {
	ctx := context.Background()
	config := config.NewConfig()
	censusClient := uscensus.NewClient(config)

	err := censusClient.GetData(ctx, 2023, uscensus.StateCodeNewYork, uscensus.RangeCodeGetTotalAll)
	if err != nil {
		panic(err)
	}
}
