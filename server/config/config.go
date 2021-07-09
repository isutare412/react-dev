package config

import (
	"fmt"
	"log"
	"os"
	"strconv"
)

var keys = []string{
	"PORT",
	"MONGO_URL",
	"MONGO_USERNAME",
	"MONGO_PASSWORD",
}

var optionalKeys = []string{
	"MODE",
}

var cache map[string]string

func LoadEnvs() error {
	log.Println("Loading env configs")

	cache = make(map[string]string)

	// Load mandatories
	for _, key := range keys {
		got, exists := os.LookupEnv(key)
		if !exists {
			return fmt.Errorf("need env: '%s'", key)
		}
		cache[key] = got
	}

	// Load optionals
	for _, key := range optionalKeys {
		got, exists := os.LookupEnv(key)
		if !exists {
			continue
		}
		cache[key] = got
	}

	for k, v := range cache {
		log.Printf("Env: %s=%s", k, v)
	}
	log.Println("Loaded env configs")

	return nil
}

func Mode() string {
	return cache["MODE"]
}

func IsDev() bool {
	return Mode() == "development"
}

func Port() uint16 {
	got := cache["PORT"]
	if got == "" {
		return 0
	}

	parsed, err := strconv.ParseUint(got, 10, 16)
	if err != nil {
		return 0
	}

	return uint16(parsed)
}

func MongoURL() string {
	return cache["MONGO_URL"]
}

func MongoUsername() string {
	return cache["MONGO_USERNAME"]
}

func MongoPassword() string {
	return cache["MONGO_PASSWORD"]
}
