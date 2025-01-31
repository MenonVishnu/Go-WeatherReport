package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"strings"

	"github.com/MenonVishnu/weather/helpers"
)

type weatherData struct {
	Name string `json:"name"`
	Main struct {
		Kelvin float64 `json:"temp"`
	} `json:"main"`
}

type EmailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

var (
	SMTPHost = os.Getenv("SMTPHOST") // Replace with your SMTP server
	SMTPPort = os.Getenv("SMTPPORT") // Typically 587 for TLS
	Username = os.Getenv("USERNAME") // Replace with your email
	Password = os.Getenv("PASSWORD") // Replace with your email app password
	city     = "Airoli"
)

func SendMail(w http.ResponseWriter, r *http.Request) {
	var emailRequest EmailRequest

	// Parse the JSON body
	err := json.NewDecoder(r.Body).Decode(&emailRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Prepare the email message
	from := Username
	to := emailRequest.To
	subject := emailRequest.Subject
	//API Request
	body, err := Query(city)
	if err != nil {
		fmt.Println(err)
	}
	message := fmt.Sprintf("From: %s\nTo: %s\nSubject: %s\n\n%v", from, to, subject, body)

	// Set up authentication
	auth := smtp.PlainAuth("", Username, Password, SMTPHost)

	// Send the email
	err = smtp.SendMail(SMTPHost+":"+SMTPPort, auth, from, []string{to}, []byte(message))
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to send email: %v", err), http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Email sent successfully to %s", to)

}

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello from go\n"))
}

func Query(city string) (weatherData, error) {
	apiConfigData, err := helpers.LoadApiConfig(os.Getenv("APIFILE"))
	if err != nil {
		return weatherData{}, err
	}

	resp, err := http.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiConfigData.OpenWeatherMapApiKey)
	if err != nil {
		return weatherData{}, err
	}

	defer resp.Body.Close()

	var data weatherData
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return weatherData{}, err
	}
	fmt.Println(data)

	return data, nil

}

// Need to change this according to the UserList array - done, Need to test
func AddName(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var user helpers.UserList
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "Could not read the Body", http.StatusInternalServerError)
		}

		for _, val := range helpers.Users {
			if val.Email == user.Email {
				http.Error(w, "Email already exists", http.StatusAlreadyReported)
				json.NewEncoder(w).Encode(helpers.Users)
				return
			}
		}
		helpers.Users = append(helpers.Users, user)

		//storing the updated data in the file
		err = helpers.StoreUserList(os.Getenv("FILENAME"), helpers.Users)
		if err != nil {
			http.Error(w, "error", http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode(helpers.Users)
	} else {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
}

func DelName(w http.ResponseWriter, r *http.Request) {
	email := strings.SplitN(r.URL.Path, "/", 3)[2]
	for i, val := range helpers.Users {
		if val.Email == email {
			//updating the file by deleting the entry
			helpers.Users = append(helpers.Users[:i], helpers.Users[i+1:]...)
			err := helpers.StoreUserList("names.txt", helpers.Users)
			if err != nil {
				http.Error(w, "error", http.StatusInternalServerError)
			}
			json.NewEncoder(w).Encode(helpers.Users)
			return
		}
	}
	http.Error(w, "Email not found", http.StatusNotFound)
}
