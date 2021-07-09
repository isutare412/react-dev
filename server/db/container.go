package db

import (
	"context"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Container struct {
	client  *mongo.Client
	timeout time.Duration
}

func NewContainer(timeout time.Duration) (*Container, error) {
	endpoint := fmt.Sprintf("mongodb://%s", config.MongoURL())
	credential := options.Credential{
		Username: config.MongoUsername(),
		Password: config.MongoPassword(),
	}

	option := options.Client().ApplyURI(endpoint).SetAuth(credential)
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// Establish connection
	client, err := mongo.Connect(ctx, option)
	if err != nil {
		return nil, fmt.Errorf("on NewContainer: %v", err)
	}

	// Check connection
	if err := client.Ping(context.Background(), nil); err != nil {
		return nil, fmt.Errorf("on NewContainer: %v", err)
	}

	return &Container{
		client:  client,
		timeout: timeout,
	}, nil
}

func (c *Container) Client() *mongo.Client {
	return c.client
}

func (c *Container) Context() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), c.timeout)
}

func (c *Container) HTTPHandler(
	handler func(*gin.Context, *Container),
) func(*gin.Context) {
	return func(ctx *gin.Context) {
		handler(ctx, c)
	}
}
