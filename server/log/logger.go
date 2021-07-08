package log

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/config"
	"github.com/sirupsen/logrus"
)

const timeFormat = "02/Jan/2006:15:04:05 -0700"

func Initialize() {
	if config.IsDev() {
		logrus.SetFormatter(&logrus.TextFormatter{
			FullTimestamp: true,
		})
	} else {
		logrus.SetFormatter(&logrus.JSONFormatter{})
	}
}

func GinLogger(logger logrus.FieldLogger, notLogged ...string) gin.HandlerFunc {
	hostname, err := os.Hostname()
	if err != nil {
		hostname = "unknown"
	}

	// Record url path to skip loggin
	var skipPath map[string]struct{}
	if length := len(notLogged); length > 0 {
		skipPath = make(map[string]struct{})
		for _, p := range notLogged {
			skipPath[p] = struct{}{}
		}
	}

	var ginLog gin.HandlerFunc
	if config.IsDev() {
		ginLog = developmentLogger(logger, skipPath, hostname)
	} else {
		ginLog = productionLogger(logger, skipPath, hostname)
	}

	return ginLog
}

func developmentLogger(
	logger logrus.FieldLogger,
	skip map[string]struct{},
	hostname string,
) func(*gin.Context) {
	return func(c *gin.Context) {
		// Other handler can change c.Path, so take path before next
		path := c.Request.URL.Path
		start := time.Now()
		c.Next()

		// Pass logging certain path
		if _, ok := skip[path]; ok {
			return
		}

		// Gather information
		latency := time.Since(start).Milliseconds()
		statusCode := c.Writer.Status()
		dataLength := c.Writer.Size()
		if dataLength < 0 {
			dataLength = 0
		}

		if len(c.Errors) > 0 {
			logger.Error(c.Errors.ByType(gin.ErrorTypePrivate).String())
			return
		}

		msg := fmt.Sprintf("%s %s %d %d ms - %d",
			c.Request.Method, path, statusCode, latency, dataLength)

		if statusCode >= http.StatusInternalServerError {
			logger.Error(msg)
		} else if statusCode >= http.StatusBadRequest {
			logger.Warn(msg)
		} else {
			logger.Info(msg)
		}
	}
}

func productionLogger(
	logger logrus.FieldLogger,
	skip map[string]struct{},
	hostname string,
) func(*gin.Context) {
	return func(c *gin.Context) {
		// Other handler can change c.Path, so take path before next
		path := c.Request.URL.Path
		start := time.Now()
		c.Next()

		// Pass logging certain path
		if _, ok := skip[path]; ok {
			return
		}

		// Gather information
		latency := time.Since(start).Milliseconds()
		statusCode := c.Writer.Status()
		clientIP := c.ClientIP()
		clientUserAgent := c.Request.UserAgent()
		referer := c.Request.Referer()
		dataLength := c.Writer.Size()
		if dataLength < 0 {
			dataLength = 0
		}

		entry := logger.WithFields(logrus.Fields{
			"hostname":   hostname,
			"statusCode": statusCode,
			"latency":    latency,
			"clientIP":   clientIP,
			"method":     c.Request.Method,
			"path":       path,
			"referer":    referer,
			"dataLength": dataLength,
			"userAgent":  clientUserAgent,
		})

		if len(c.Errors) > 0 {
			entry.Error(c.Errors.ByType(gin.ErrorTypePrivate).String())
			return
		}

		msg := fmt.Sprintf("%s - %s [%s] \"%s %s\" %d %d \"%s\" \"%s\" (%dms)",
			clientIP, hostname, time.Now().Format(timeFormat), c.Request.Method, path,
			statusCode, dataLength, referer, clientUserAgent, latency)

		if statusCode >= http.StatusInternalServerError {
			entry.Error(msg)
		} else if statusCode >= http.StatusBadRequest {
			entry.Warn(msg)
		} else {
			entry.Info(msg)
		}
	}
}
