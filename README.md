# Product Catalog API

A RESTful API for managing a product catalog, built with **Domain-Driven Design (DDD)** principles.

**Stack:** Node.js · Express v5 · MongoDB · Mongoose · KafkaJS · Docker

---

## Getting Started

```bash
# 1. Clone the repo and install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env

# 3. Run with Docker
docker compose up
```

The server runs on `http://localhost:3000`.

---

## Environment Variables

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `PORT`           | Server port (default: `3000`)                    |
| `DATABASE_URL`   | MongoDB connection string                        |
| `NODE_ENV`       | `development` or `production`                    |
| `KAFKA_BROKERS`  | Kafka broker address (default: `localhost:9092`) |
| `KAFKA_USERNAME` | SASL username — optional                         |
| `KAFKA_PASSWORD` | SASL password — optional                         |

---

## API Endpoints

Base URL: `/api/v1`

### Create a Product

```
POST /api/v1/products
```

**Request Body:**

```json
{
  "name": "Wireless Keyboard",
  "price": 49.99,
  "provider": "Logitech",
  "description": "Compact wireless keyboard",
  "quantity": 150
}
```

| Field         | Type   | Rules                      |
| ------------- | ------ | -------------------------- |
| `name`        | string | required · min 3 · max 100 |
| `price`       | number | required · positive        |
| `provider`    | string | required · min 3 · max 100 |
| `description` | string | required · min 3 · max 100 |
| `quantity`    | number | required · min 0           |

**Response `201`:**

```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Wireless Keyboard",
      "price": 49.99,
      "provider": "Logitech",
      "description": "Compact wireless keyboard",
      "status": "In Stock"
    }
  }
}
```

---

### List Products

```
GET /api/v1/products
```

**Query Parameters:**

| Parameter         | Default      | Example                         |
| ----------------- | ------------ | ------------------------------- |
| `page`            | `1`          | `?page=2`                       |
| `limit`           | `10`         | `?limit=20`                     |
| `sort`            | `-createdAt` | `?sort=-price,name`             |
| `fields`          | all          | `?fields=name,price`            |
| `name`            | —            | `?name=keyboard`                |
| `provider`        | —            | `?provider=logitech`            |
| `price[gte/lte]`  | —            | `?price[gte]=10&price[lte]=100` |
| `quantity[gt/lt]` | —            | `?quantity[gt]=0`               |

String filters use case-insensitive partial matching. Numeric filters support `gte`, `gt`, `lte`, `lt` operators.

**Response `200`:**

```json
{
  "status": "success",
  "count": 2,
  "data": {
    "products": [...]
  }
}
```

---

### Get a Product

```
GET /api/v1/products/:id
```

| Parameter | Type          | Description               |
| --------- | ------------- | ------------------------- |
| `id`      | string (UUID) | Product unique identifier |

**Response `200`:**

```json
{
  "status": "success",
  "data": {
    "product": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Wireless Keyboard",
      "price": 49.99,
      "provider": "Logitech",
      "description": "Compact wireless keyboard",
      "status": "In Stock"
    }
  }
}
```

---

## Product Response Object

| Field         | Type   | Notes                                              |
| ------------- | ------ | -------------------------------------------------- |
| `id`          | string | UUID v4                                            |
| `name`        | string |                                                    |
| `price`       | number |                                                    |
| `provider`    | string |                                                    |
| `description` | string | Falls back to `"No description provided"`          |
| `status`      | string | `"In Stock"` or `"Out of Stock"` based on quantity |

> `quantity` is intentionally excluded from the response.

---

## Error Responses

All errors follow this shape:

```json
{
  "status": "fail",
  "message": "Error description here",
  "isOperational": true
}
```

| Status | Cause                                     |
| ------ | ----------------------------------------- |
| `400`  | Validation failed or invalid field type   |
| `404`  | Product or route not found                |
| `429`  | Rate limit exceeded (100 req / hour / IP) |
| `500`  | Unexpected server error                   |

---

## Kafka Events

When a product is created, a `product-created` event is published to Kafka.

**Topic:** `product-created`  
**Payload:**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Wireless Keyboard",
  "price": 49.99,
  "provider": "Logitech",
  "description": "Compact wireless keyboard",
  "quantity": 150
}
```

---

## Project Structure

```
src/
├── presentation/       # Routes, controllers, validators, DTOs
├── application/        # Use cases
├── domain/             # Entities, repository interfaces, domain services
└── infrastructure/     # MongoDB models, repositories, Kafka client
```
