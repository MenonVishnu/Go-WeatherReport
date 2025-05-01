package helpers

import (
	"encoding/json"
	"net/http"
	"os"
)

type apiConfigData struct {
	OpenWeatherMapApiKey string `json:"OpenWeatherMapApiKey"`
}

type UserList struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	City  string `json:"city"`
}

var Users []UserList

func LoadApiConfig(filename string) (apiConfigData, error) {
	bytes, err := os.ReadFile(filename)
	if err != nil {
		return apiConfigData{}, err
	}
	var apiKey apiConfigData

	err = json.Unmarshal(bytes, &apiKey)

	if err != nil {
		return apiConfigData{}, err
	}

	return apiKey, nil
}

func LoadUserList(filename string) ([]UserList, error) {
	bytes, err := os.ReadFile(filename)
	if err != nil {
		return []UserList{}, err
	}

	err = json.Unmarshal(bytes, &Users)
	if err != nil {
		return []UserList{}, err
	}
	return Users, nil
}

func StoreUserList(filename string, users []UserList) error {
	bytes, err := json.Marshal(users)
	if err != nil {
		return err
	}

	err = os.WriteFile(filename, bytes, 0644) //0644 is the the permissions for that file
	if err != nil {
		return err
	}
	return nil
}

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Add CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // For production, use specific domain
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Continue to actual handler
		next.ServeHTTP(w, r)
	})
}
