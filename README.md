# React Dev

CSR practice with React.js and some servers.

![service diagram](images/service_diagram.png)

## Development

### Database

```bash
cd database

docker-compose up
```

### Backend

```bash
cd server

go mod download

./scripts/run_server.sh
```

### Frontend

```bash
cd client

npm install

npm run dev
```

## Production

```bash
docker-compose build

docker-compose up
```
