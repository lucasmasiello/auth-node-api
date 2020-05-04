# auth-node-api

## dependencies
- Docker Compose : https://docs.docker.com/compose/install/
- Postman (for test purpose) : https://www.postman.com/downloads/

## run dev
```sh
npm i
npm up
```

## docker
```sh
docker exec -it auth-node-api_db_1 mongo -u admin -p secret auth
db
## select all
db.users.find({}).pretty()

## delete all
db.users.deleteMany({})
```