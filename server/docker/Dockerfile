FROM golang:1.16.5-alpine AS builder

# Install server dependencies
WORKDIR /app
COPY go.mod go.sum /app/
RUN go mod download

# Build server
COPY . /app/
RUN go build -o server main.go

FROM alpine:3.14

WORKDIR /app
COPY --from=builder /app/server /app/server

ENTRYPOINT [ "./server" ]
