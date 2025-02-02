package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	"gopkg.in/gomail.v2"

	"github.com/MenonVishnu/weather/helpers"
)

type weatherData struct {
	Name string `json:"name"`
	Main struct {
		Kelvin float64 `json:"temp"`
	} `json:"main"`
}

func SendMail() {
	var (
		SMTPHost = os.Getenv("SMTPHOST")
		SMTPport = os.Getenv("SMTPPORT")
		Username = os.Getenv("EMAIL")
		Password = os.Getenv("PASS")
	)
	// Prepare the email message
	SMTPPort, err := strconv.Atoi(SMTPport)
	if err != nil {
		fmt.Println("Error Converting SMTP Port!! ", err)
	}

	for _, user := range helpers.Users {

		subject := fmt.Sprintf("Today's Temperature in %s", user.City)

		m := gomail.NewMessage()
		m.SetHeader("From", Username)
		m.SetHeader("To", user.Email)
		m.SetHeader("Subject", subject)

		//Before API Request I could use redis to check weather the city data is already available or not
		/*Redis Get Query*/

		//API Request
		body, err := Query(user.City)
		if err != nil {
			fmt.Println(err)
		}
		m.SetBody("text/plain", fmt.Sprintf("%v", body))

		/*Redis Set Query*/
		//If the city data is not available, store the same into redis cache so that you don't need to call the API again

		dialer := gomail.NewDialer(SMTPHost, SMTPPort, Username, Password)
		err = dialer.DialAndSend(m)
		if err != nil {
			fmt.Println("Error Sending Mail to ", user.Email, "  ", err)
		} else {
			fmt.Println("Email Sent Success!!")
		}
	}
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
