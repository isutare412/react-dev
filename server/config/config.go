package config

import (
	"fmt"
	"log"
	"os"
	"strconv"
)

var keys = []string{
	"PORT",
}

var optionalKeys = []string{
	"FRONT_END_DIR",
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

func FrontEndDir() string {
	return cache["FRONT_END_DIR"]
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
