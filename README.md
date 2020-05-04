# auth-node-api
 
## curl

```sh
curl -X POST localhost:3000/register -H 'Content-Type: application/json' -d '{"email": "0001@gmail.com", "name": "Test 1", "password": "Qwerty123", "passwordConfirmation": "Qwerty123"}'
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