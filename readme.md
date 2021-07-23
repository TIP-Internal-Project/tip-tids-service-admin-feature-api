# Admin Feature
  Engagement API for Admin Management. 
  See documentation [here](doc/admin-features.yaml).
## Repository
```
git clone https://github.com/esonpaguia/admin-feature.git
```

## Tech Stack
- node
- docker
- docker-compose

## Dev
```
cd admin-feature
npm install
DEBUG=admin-feature:* npm start
```

## Build & Deploy
- Startup
```
docker-compose up -d --build
```
- Shutdown
```
docker-compose down -v --rmi all
```