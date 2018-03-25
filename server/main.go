package main

import (
	"net/http"

	"github.com/ChristianAEDev/worky/server/rest"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig()
	if err != nil {
		log.Panicf("Fatal error config file: %s \n", err)
	}

	viper.SetDefault("port", "8080")

	log.SetFormatter(&log.JSONFormatter{})
}

func main() {
	log.Info("Starting...")

	router := mux.NewRouter()
	api := router.PathPrefix("/api/v1").Subrouter()

	// Register the routes Rest API
	api.HandleFunc("/tasks", rest.GetTasks).Methods("GET")
	api.HandleFunc("/tasks/{id:[0-9]+}", rest.GetTask).Methods("GET")
	api.HandleFunc("/tasks/{id:[0-9]+}", rest.DeleteTask).Methods("DELETE")

	// Host the front end
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./build")))

	methods := []string{"GET", "POST", "PUT", "DELETE"}
	headers := []string{"Content-Type"}

	port := viper.GetString("port")
	log.Infof("Started on port %v", port)
	// Startup the endpoint
	http.ListenAndServe(":"+port,
		handlers.CORS(handlers.AllowedMethods(methods), handlers.AllowedHeaders(headers))(router))
}
