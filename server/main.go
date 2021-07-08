package main

import (
	"fmt"
	rawLog "log"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/config"
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

	// Middlewares
	router := gin.New()
	router.Use(
		log.GinLogger(logrus.StandardLogger()),
		gin.Recovery(),
	)

	// Front-end serving
	if path := config.FrontEndDir(); path != "" {
		router.Static("/", path)
		logrus.Info(fmt.Sprintf("Use static serving: '%s'", path))
	}

	// Back-end serving
	// TODO

	// Run server
	addr := fmt.Sprintf("0.0.0.0:%d", config.Port())
	logrus.Info(fmt.Sprintf("Run server at addr: %s", addr))
	if err := router.Run(addr); err != nil {
		logrus.Error(fmt.Sprintf("Failed to run: %v", err))
	}
}
