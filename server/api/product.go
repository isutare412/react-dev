package api

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/db"
	"github.com/isutare412/pgserver/model"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
)

func RegisterProductAPIs(g *gin.RouterGroup, con *db.Container) {
	g.GET("/product", con.HTTPHandler(getProducts))
}

func getProducts(c *gin.Context, con *db.Container) {
	coll := con.Client().Database("pgblog").Collection("products")
	ctx, cancel := con.Context()
	defer cancel()

	cursor, err := coll.Find(ctx, bson.M{})
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on getProducts: %v", err)
		return
	}
	defer cursor.Close(context.Background())

	var products = make([]*model.Product, 0)
	for cursor.Next(ctx) {
		product := &model.Product{}
		if err := cursor.Decode(product); err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			logrus.Warnf("on getProducts: %v", err)
			return
		}

		products = append(products, product)
	}
	if err := ctx.Err(); err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on getProducts: %v", err)
		return
	}

	c.JSON(http.StatusOK, products)
}
