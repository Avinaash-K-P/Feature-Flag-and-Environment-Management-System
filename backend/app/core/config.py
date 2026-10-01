from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):

    DATABASE_URL:str 

    SECRET_KEY:str

    ALGORITHM:str

    ACCESS_TOKEN_EXPIRY_MINUTES:int

    REFRESH_TOKEN_EXPIRY_DAYS:int

    RESET_TOKEN_EXPIRE_MINUTES:int

    REDIS_URL:str

    model_config = SettingsConfigDict(
        env_file = ".env",
        env_file_encoding = "utf-8"
    )

settings = Settings() # type: ignore      