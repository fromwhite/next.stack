package handler
 
import (
	"fmt"
    "encoding/json"
    "math/rand"
    "net/http"
    "time"
)
 
func Handler(w http.ResponseWriter, r *http.Request) {
	numPoints := 1_000_000
	radius := 424242
	pointsInsideCircle := 0

	startTime := time.Now()

	prng := rand.New(rand.NewSource(time.Now().UnixNano()))

	for i := 0; i < numPoints; i++ {
		x := prng.Float64() * float64(radius - 1.0) + 1.0
		y := prng.Float64() * float64(radius - 1.0) + 1.0
		distance := x*x + y*y

		if distance <= float64(radius*radius) {
			pointsInsideCircle++
		}
	}

	piEstimate := 4 * float64(pointsInsideCircle) / float64(numPoints)

	// endTime := time.Now()
	// executionTime := endTime.Sub(startTime).Milliseconds()
	executionTime := float64(time.Since(startTime)) / float64(time.Millisecond)

	responseData := map[string]interface{}{
		"runtime":"Go",
		"message": fmt.Sprintf("%d / %d", pointsInsideCircle, numPoints),
		"time":  fmt.Sprintf("%.2f milliseconds",executionTime),
		"pi": piEstimate,
	}

	jsonResponse, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}