import json
from datetime import datetime, date

from app.core.redis import redis_client


def set_cache(key: str, value, expire: int = 300):

    redis_client.set(
        key,
        json.dumps(
            value,
            default=lambda obj: obj.isoformat()
            if isinstance(obj, (datetime, date))
            else str(obj)
        ),
        ex=expire
    )


def get_cache(key: str):

    value = redis_client.get(key)

    if value is None:
        return None

    return json.loads(value)


def delete_cache(key: str):

    redis_client.delete(key)