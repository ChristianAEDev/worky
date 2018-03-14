package db

import "github.com/ChristianAEDev/worky/server/data"

// Access describes the interface used to manage the data in a database.
type Access interface {
	LoadTasks() []data.Task
}
