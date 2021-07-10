package api

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/isutare412/pgserver/db"
	"github.com/isutare412/pgserver/model"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterProductAPIs(g *gin.RouterGroup, con *db.Container) {
	g.GET("/product", con.HTTPHandler(getProducts))
	g.POST("/product/like/:id", con.HTTPHandler(postLike))
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

func postLike(c *gin.Context, con *db.Container) {
	type reqBody struct {
		Like bool `json:"like"`
	}

	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on postLike: %v", err)
		return
	}

	var received = &reqBody{}
	if err := json.Unmarshal(body, received); err != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
		logrus.Warnf("on postLike: %v", err)
		return
	}

	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.Writer.WriteHeader(http.StatusBadRequest)
		logrus.Warnf("on postLike: %v", err)
		return
	}

	coll := con.Client().Database("pgblog").Collection("products")
	ctx, cancel := con.Context()
	defer cancel()

	var likeKey = "dislikes"
	if received.Like {
		likeKey = "likes"
	}

	_, err = coll.UpdateByID(ctx, objID, bson.M{
		"$inc": bson.D{{Key: likeKey, Value: 1}},
	})
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on postLike: %v", err)
		return
	}

	logrus.WithFields(logrus.Fields{
		"pid":  id,
		"type": likeKey,
	}).Info("Received like request")
}
