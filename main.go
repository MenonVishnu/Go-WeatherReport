package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/MenonVishnu/weather/controllers"
	"github.com/MenonVishnu/weather/helpers"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err)
	}

	//get emails from text file
	helpers.Users, _ = helpers.LoadUserList(os.Getenv("FILENAME"))

	http.HandleFunc("/hello", controllers.Hello)
	http.HandleFunc("/weather/", func(w http.ResponseWriter, r *http.Request) {
		city := strings.SplitN(r.URL.Path, "/", 3)[2]
		data, err := controllers.Query(city)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		json.NewEncoder(w).Encode(data)
	})

	//add emails to the list and store them in file
	http.HandleFunc("/addname/", controllers.AddName)
	//delete emails from the list, basically unsubscribing them
	http.HandleFunc("/delname/", controllers.DelName)

	//send mails to all the emails in names.txt
	http.ListenAndServe(":8080", nil)
}

/*
Create a weather application where the application sends a mail to the user if there can be extreme
climate changes on the day. It would also give out a mail on mornings regarding the forecast along with
posibility of rain, High sun stroke, snow, etc. etc.
*/
