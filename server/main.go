package main

import (
	"fmt"
	rawLog "log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/api"
	"github.com/isutare412/pgserver/config"
	"github.com/isutare412/pgserver/db"
	"github.com/isutare412/pgserver/log"
	"github.com/sirupsen/logrus"
)

func main() {
	if err := config.LoadEnvs(); err != nil {
		rawLog.Fatalf("Failed to load env: %v", err)
	}

	log.Initialize()

	if !config.IsDev() {
		gin.SetMode(gin.ReleaseMode)
	}

	// Establish MongoDB connection
	mongoContainer, err := db.NewContainer(10 * time.Second)
	if err != nil {
		logrus.Fatalf("Failed to establish mongo connection: %v", err)
	}
	logrus.Infof("Connected MongoDB: %v", config.MongoURL())

	// Middlewares
	router := gin.New()
	router.Use(
		log.GinLogger(logrus.StandardLogger()),
		gin.Recovery(),
	)

	// Register APIs
	apiV1 := router.Group("/api/v1")
	api.RegisterProductAPIs(apiV1, mongoContainer)
	api.RegisterEmployeeAPIs(apiV1, mongoContainer)

	// Run server
	addr := fmt.Sprintf("0.0.0.0:%d", config.Port())
	logrus.Infof("Run server at: %s", addr)
	if err := router.Run(addr); err != nil {
		logrus.Fatalf("Failed to run: %v", err)
	}
}
