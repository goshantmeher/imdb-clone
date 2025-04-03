//Pre-requisits
mongodb, db: imdb_clone

# create db in mongodb

```
db.auth("root", <password>)
use imdb_clone
db.createUser({
    user: <user>,
    pwd: <password>,
    roles: [{ role: "readWrite", db: "imdb_clone" }]
})
```
