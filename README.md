## Bakery Code Challenge

The challenge is implemented as an API. Hence, there is no UI component for test drive.
However, two test suites are given:

1. Unit Test - for functionalities testing `npm test`
2. End-2-end - for integration testing `npm run e2e`

To launch the application simply run `npm start`

System requirement:
 - Node v8.x.x

## Deployment

System requirement:
 - Docker [installed](https://docs.docker.com/engine/installation/)

```
docker-compose up
```

The application will be up and running on port `:3000` or visit live demo [https://bakery-shop.herokuapp.com/](https://bakery-shop.herokuapp.com/)

![Test Results](https://raw.githubusercontent.com/csokun/bakery/master/demo.png)

## API Interaction

System requirement:
- Postman Chrome add-on or REST complaint client

### Place Order

```
POST http://localhost:3000/orders
```

Payload:

```json
{
    "orders": [
        { "code": "VS5", "qty": 10 },
        { "code": "MB11", "qty": 14 },
        { "code": "CF", "qty": 13 }
    ]
}
```

Sample Response:

```json
[{
    "order": {
        "code": "VS5",
        "qty":  10,
        "total": 17.98
    },
    "result": [
        { "unit": 2, "qty": 5, "price": 8.99 }
    ],
    "error": null
}]
```

### Heatheat

Navigate to `http://localhost:3000/ping` to check the service status.

### Kill

Use this endpoint to kill the server process. This will simulate the system down scenario and `pm2` will bring the system backup.

```
POST http://localhost:3000/kill
```

It is higly recommend that you visit `http://localhost:3000/ping` after invoke this `kill` operation to confirm that the system is still running.


