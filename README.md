
# Feature Flag & Environment Management System

## Title

**Feature Flag & Environment Management System**

A centralized platform that allows administrators and authorized users to manage application features across different environments without requiring application redeployment.

The system provides:

* Secure JWT-based authentication
* Role-Based Access Control (RBAC)
* Feature flag management
* Environment-specific feature configuration
* Feature rollouts
* User-specific feature assignments
* Audit logging
* Redis caching
* Dashboard analytics
* Paginated audit logs

---

## Tech Stack

### Backend

* Python 3.12
* FastAPI
* SQLAlchemy
* Alembic
* MySQL 8.0
* JWT Authentication
* Pydantic
* Redis
* Docker

### Frontend

* React.js
* TypeScript
* Vite
* Material UI
* Axios
* React Router
* Chart.js
* Tailwind CSS
* React Toastify

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* Swagger / OpenAPI

---

## MySQL Database

The application uses **MySQL 8.0** as the primary relational database.

### Main Tables

* `roles`
* `users`
* `feature_flags`
* `environments`
* `feature_flag_environments`
* `feature_rollouts`
* `user_assignments`
* `audit_logs`

### Database Features

* Primary and foreign key relationships
* Unique constraints
* Environment-specific feature configuration
* User-specific feature assignments
* Feature rollout percentage management
* Created and updated timestamps
* Alembic database migrations

### Database Migration

Alembic is used to manage database schema changes.

```bash
alembic revision --autogenerate -m "migration message"
alembic upgrade head
```

---

## Docker Configuration

Docker is used to run supporting infrastructure such as Redis and can also be used to containerize the application.

### Redis Container

```bash
docker pull redis:7

docker run -d \
  --name feature_flag_redis \
  -p 6379:6379 \
  redis:7
```

To verify the Redis connection:

```bash
docker exec -it feature_flag_redis redis-cli
```

Then:

```text
PING
```

Expected response:

```text
PONG
```

Docker Compose configuration can be added for running the complete application stack together.

---

## Redis Connections

Redis is used as a caching layer to reduce repeated database queries and improve API response performance.

### Redis Configuration

The Redis connection is configured using the environment variable:

```env
REDIS_URL=redis://localhost:6379/0
```

### Current Cache Keys

```text
profile:{user_id}
roles:all
feature_flag:all
environment:all
```

### Cache TTL

Cached data currently uses a **5-minute TTL**:

```text
300 seconds
```

### Cache Invalidation

Cache entries are invalidated when the corresponding data is created, updated, or deleted.

Example:

```python
delete_cache("feature_flag:all")
```

This ensures that stale feature and environment information is not continuously served from Redis.

---

## Audit Logs Applied

Audit logging is implemented to track important system activities.

### Current Audit Actions

| Action                  | Purpose                       |
| ----------------------- | ----------------------------- |
| `AUTH-LOGIN`          | Records successful user login |
| `PROFILE-UPDATE`      | Records profile updates       |
| `FEATURE_FLAG-CREATE` | Records feature flag creation |
| `ENVIRONMENT-CREATE`  | Records environment creation  |

Audit logs store information such as:

* User ID
* Action
* Entity type
* Entity ID
* Previous value
* New value
* Timestamp

### Audit Log API

```http
GET /audit-logs
```

The audit log endpoint is restricted to administrators and supports pagination.

Example:

```http
GET /audit-logs?page=1&limit=10
```

---

## Swagger Documentation

FastAPI automatically provides interactive API documentation using Swagger/OpenAPI.

After starting the backend application, Swagger can be accessed through:

```text
/docs
```

The Swagger documentation allows developers to:

* View all API endpoints
* Authenticate using JWT
* Test API requests
* View request schemas
* View response schemas
* Verify RBAC permissions
* Test pagination
* Test feature and environment management APIs

The project APIs were tested through Swagger during backend development.

---

## Author

**Avinaash K P**

Python Developer
