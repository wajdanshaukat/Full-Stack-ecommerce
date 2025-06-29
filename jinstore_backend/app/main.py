from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routers import (product, brand, product_category, blog_post, product_image, auth, protected,
                         user_order, order_detail, wishlist_item, cart_item,)
from app.database.base import Base
from app.database.session import engine
import uvicorn
import os

# Ensure the upload directory exists
os.makedirs("static/uploads", exist_ok=True)

# Create all tables on startup
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title= "JinStore Backend",
)

# Mount static directory to serve uploaded images
static_path = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_path), name="static")


# Include API routers

app.include_router(auth.router)
app.include_router(protected.router)
app.include_router(brand.router)
app.include_router(product_category.router)
app.include_router(product_image.router)

# app.include_router(product_filter.router)
app.include_router(product.router)

app.include_router(blog_post.router)

app.include_router(user_order.router)

app.include_router(order_detail.router)

app.include_router(wishlist_item.router)

app.include_router(cart_item.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "E-commerce API is running 🚀"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
