import unittest
from .models import Product, ProductCategory
from .services import ProductService, ProductCategoryService
import json
from mongoengine import disconnect

class ProductServiceTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Ensure a clean connection for tests.
        disconnect()  # Disconnect from previous connections if any.
        # Optionally, connect to a test DB.
        from mongoengine import connect
        connect(db="test_inventory_db", host="localhost", port=27017)

    def setUp(self):
        # Clean collections before each test.
        Product.drop_collection()
        ProductCategory.drop_collection()

    def test_create_and_get_product(self):
        category = ProductCategory(title="Electronics", description="Test Cat")
        category.save()
        data = {
            "name": "Test Product",
            "description": "Test Desc",
            "category": category,
            "price": 99.99,
            "brand": "TestBrand",
            "quantity": 5
        }
        product = ProductService.create_product(data)
        self.assertIsNotNone(product.id)
        fetched = ProductService.get_product(product.id)
        self.assertEqual(fetched.name, "Test Product")

    def test_update_product(self):
        category = ProductCategory(title="Electronics", description="Test Cat")
        category.save()
        data = {
            "name": "Test Product",
            "description": "Desc",
            "category": category,
            "price": 100.0,
            "brand": "BrandX",
            "quantity": 3
        }
        product = ProductService.create_product(data)
        update_data = {
            "name": "Updated Product",
            "description": "New Desc",
            "category": category,
            "price": 150.0,
            "brand": "BrandY",
            "quantity": 10
        }
        updated = ProductService.update_product(product.id, update_data)
        self.assertEqual(updated.name, "Updated Product")

class ProductCategoryServiceTest(unittest.TestCase):

    def setUp(self):
        Product.drop_collection()
        ProductCategory.drop_collection()

    def test_create_category(self):
        data = {"title": "Food", "description": "All food items"}
        category = ProductCategoryService.create_category(data)
        self.assertIsNotNone(category.id)
        self.assertEqual(category.title, "Food")


import json
from django.urls import reverse
from rest_framework.test import APITestCase
from products.models import Product, ProductCategory  # Import your models

class ProductAPITest(APITestCase):

    def setUp(self):
        Product.drop_collection()
        ProductCategory.drop_collection()

        self.category = ProductCategory(title="Test Category", description="Test Desc")
        self.category.save()

    def test_create_product_api(self):
        url = reverse('create_product')
        data = {
            "name": "API Product",
            "description": "Created via API",
            "category": str(self.category.id),  # pass category as ObjectId string
            "price": 200.0,
            "brand": "APIBrand",
            "quantity": 4
        }
        response = self.client.post(
            url,
            data=json.dumps(data),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        res_data = json.loads(response.content)
        self.assertIn("product", res_data)
