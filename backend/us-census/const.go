package uscensus

type StateCode int
type RangeCode string

const (
	RangeCodeGetTotalAll             RangeCode = "B01001_001E"
	RangeCodeGetTotalMale            RangeCode = "B01001_002E"
	RangeCodeGetTotalMaleUnder5Years RangeCode = "B01001_003E"
	RangeCodeGetTotalMale5To9Years   RangeCode = "B01001_004E"
	RangeCodeGetTotalMale10To14Years RangeCode = "B01001_005E"

	StateCodeNewYork StateCode = 36
)
