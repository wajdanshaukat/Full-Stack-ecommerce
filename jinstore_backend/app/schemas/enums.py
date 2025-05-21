from enum import Enum

class PaymentStatusEnum(str, Enum):
    pending = "Pending"
    paid = "Paid"
    failed = "Failed"

class ShippingMethodEnum(str, Enum):
    standard = "Standard"
    express = "Express"
    pickup = "Pickup"
