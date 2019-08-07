package main

// Returns the absolute value of an integer
func getAbsoluteValue(value int) int {
	if value < 0 {
		return -value
	}
	return value
}

// Returns the maximum value in a vector
func getMaxVectorValue(vector []int) int {
	var max = vector[0]

	for i := 1; i < len(vector); i++ {
		if vector[i] > max {
			max = vector[i]
		}
	}
	return max
}

// Returns the maximum value for scale the Y axis
func getMaxValue(english []int, german []int) int {
	var max = 0
	if len(english) != 0 && len(german) != 0 {
		var maxEnglish = getMaxVectorValue(english)
		var maxGerman = getMaxVectorValue(german)
		max = maxEnglish
		if maxGerman > maxEnglish {
			max = maxGerman
		}
	}
	return max
}

// Returns an int rounded to the nearest upper thousands
func roundNumber(number int) int {
	rounded := ((number / 1000) * 1000) + 1000
	return rounded
}
