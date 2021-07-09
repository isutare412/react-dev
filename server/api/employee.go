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

func RegisterEmployeeAPIs(g *gin.RouterGroup, con *db.Container) {
	g.GET("/employee", con.HTTPHandler(getEmployees))
}

func getEmployees(c *gin.Context, con *db.Container) {
	coll := con.Client().Database("pgblog").Collection("employees")
	ctx, cancel := con.Context()
	defer cancel()

	cursor, err := coll.Find(ctx, bson.M{})
	if err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on getEmployees: %v", err)
		return
	}
	defer cursor.Close(context.Background())

	var employees = make([]*model.Employee, 0)
	for cursor.Next(ctx) {
		employee := &model.Employee{}
		if err := cursor.Decode(employee); err != nil {
			c.Writer.WriteHeader(http.StatusInternalServerError)
			logrus.Warnf("on getEmployees: %v", err)
			return
		}

		employees = append(employees, employee)
	}
	if err := ctx.Err(); err != nil {
		c.Writer.WriteHeader(http.StatusInternalServerError)
		logrus.Warnf("on getEmployees: %v", err)
		return
	}

	c.JSON(http.StatusOK, employees)
}
