package data

import "encoding/json"

// Task is a single item describing a task that needs to be performed.
type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

// ToJSON converts the given task array into it's JSON representation.
func ToJSON(tasks []Task) (tasksJSON []byte, err error) {
	return json.Marshal(tasks)
}
