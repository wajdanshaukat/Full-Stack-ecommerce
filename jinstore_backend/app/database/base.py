from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create the base class
Base = declarative_base()

DATABASE_URL = "sqlite:///./ecommerce.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# SessionLocal is a session factory, used to create session objects
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all the tables in the database (based on your models)
def create_tables():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
    print("✅ Database tables created successfully.")