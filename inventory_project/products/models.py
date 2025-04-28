
# # Week 2 Task(usinh IN-line memory instead of mongodb)
# import uuid
# class Product:
#     def __init__(self, name, description, category, price, brand, quantity):
#         self.id = str(uuid.uuid4())
#         self.name = name
#         self.description = description
#         self.category = category
#         self.price = price
#         self.brand = brand
#         self.quantity = quantity
# # In-memory storage
# PRODUCTS = {}

from mongoengine import Document, StringField, FloatField, IntField, DateTimeField
from datetime import datetime
from mongoengine import ReferenceField

class ProductCategory(Document):
    title = StringField(required=True, max_length=100)
    description = StringField()
    meta = {'collection': 'product_categories'}

class Product(Document):
    name = StringField(required=True, max_length=100)
    description = StringField()
    category = ReferenceField(ProductCategory, required=False)
    price = FloatField(required=True, min_value=0)
    brand = StringField(required=True, max_length=50)
    quantity = IntField(required=True, min_value=0)
    # Advanced: audit fields
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'products'}
