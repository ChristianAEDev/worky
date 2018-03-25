package rest

import (
	"net/http"
	"strconv"

	"github.com/ChristianAEDev/worky/server/data"
	"github.com/ChristianAEDev/worky/server/db"
	log "github.com/sirupsen/logrus"
)

// DeleteTask removes a task from the database
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	taskID, err := extractIDFromURL(r)
	if err != nil {
		respondWithError(w, err)
	}
	log.Infof("Delete task %v", taskID)

	err = db.DeleteTask(taskID)
	if err != nil {
		respondWithError(w, err)
	}

	log.Infof("Deleted task %v", taskID)

	w.Write([]byte(strconv.Itoa(taskID)))
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	taskID, err := extractIDFromURL(r)
	if err != nil {
		respondWithError(w, err)
	}
	log.Infof("Get task %v", taskID)

	task, err := db.LoadTask(taskID)
	if err != nil {
		respondWithError(w, err)
	}

	taskJSON, err := task.ToJSON()
	if err != nil {
		respondWithError(w, err)
	}
	w.Write(taskJSON)
}

// GetTasks loads all tasks from the database and sends them as a JSON to the caller.
func GetTasks(w http.ResponseWriter, r *http.Request) {
	tasks := db.LoadTasks()

	tasksJSON, err := data.ToJSON(tasks)
	if err != nil {
		log.Warningf("Error creating JSON from task array", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	log.Infof("Returning %v tasks", len(tasks))
	w.Write(tasksJSON)
}
