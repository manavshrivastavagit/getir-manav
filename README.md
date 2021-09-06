# Getir NodeJS Assignment

Deployed on Heroku :
[https://getir-manav.herokuapp.com](https://getir-manav.herokuapp.com)

### Swagger :
[Swagger Doc available at /api/docs](https://getir-manav.herokuapp.com/api/docs)

## Install dependencies
```
npm install
```

### Start App without Docker 

Copy .env.copy to .env` and fill with the values

```
MONGODB_CONNECTION=""
PORT=4000
```
- Run application with **`npm run start:dev`**

## Start App with Docker

```sh
PORT=4000 
MONGODB_CONNECTION='' docker-compose up -d prod
```
### Tests
```
npm test
```

### API Interface

##### `Get Records API`

Returns records that matched the filters.

Route: `/`

Method: `POST`

Request Body:

```json
{
  "startDate": "2021-08-07", 
  "endDate": "2021-09-07", 
  "minCount": 123, 
  "maxCount": 456 
}
```

Response:

```json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "sOmEKey",
            "createdAt": "2021-08-26T01:02:03.685Z",
            "totalCount": 1234
        }
    ]
}
```
#### Error Response:

```json
{
    "code": 500,
    "msg": "Unable to connect to server!",
    "error": "failed to connect to server on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017]"
}
```

```json
{
    "code": 400,
    "msg": "Bad Request",
    "error": [
        {
            "value": "2021-08-07",
            "msg": "endDate must be greater than startDate",
            "param": "endDate",
            "location": "body"
        },
        {
            "value": "2021-08-08",
            "msg": "startDate must be lower than endDate",
            "param": "startDate",
            "location": "body"
        }
    ]
}
```
```json
{
    "code": 400,
    "msg": "Bad Request",
    "error": [
        {
            "value": 456,
            "msg": "minCount must be lower than maxCount",
            "param": "minCount",
            "location": "body"
        },
        {
            "value": 123,
            "msg": "maxCount must be greater than minCount",
            "param": "maxCount",
            "location": "body"
        }
    ]
}
```