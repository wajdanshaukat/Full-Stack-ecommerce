from typing import Optional
from fastapi import Query

class ProductFilterParams:
    def __init__(
        self,
        name: Optional[str] = Query(None),
        min_price: Optional[float] = Query(None),
        max_price: Optional[float] = Query(None),
        category_name: Optional[str] = Query(None),
        limit: int = Query(10, gt=0),
        offset: int = Query(0, ge=0),
    ):
        self.name = name
        self.min_price = min_price
        self.max_price = max_price
        self.category_name = category_name
        self.limit = limit
        self.offset = offset
