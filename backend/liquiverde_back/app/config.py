import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
CARBON_API_KEY = os.getenv("CARBON_API_KEY", "")
