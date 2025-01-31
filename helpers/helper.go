package helpers

import (
	"encoding/json"
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

	err = os.WriteFile(filename, bytes, 0644)
	if err != nil {
		return err
	}
	return nil
}

