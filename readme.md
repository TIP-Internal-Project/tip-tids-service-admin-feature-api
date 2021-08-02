# Admin Feature
  Engagement API for Admin Management. 
  See documentation [here](doc/admin-feature.yaml).
## Repository
```
git clone https://github.com/esonpaguia/admin-feature.git
```

## Tech Stack
- node
- docker
- docker-compose

## Dev
  1. Initialize database
  ```
  docker-compose up -d --build
  ```
  2. Initialize application
  ```
  npm install
  DEBUG=admin-feature:* npm start
  ```
  3. Destroy
  ```
  docker-compose down -v --rmi all
  ```

## TODO
- create models
- populate collection