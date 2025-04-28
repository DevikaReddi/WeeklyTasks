from .models import Product, ProductCategory
from mongoengine.errors import DoesNotExist
from datetime import datetime

class ProductService:
    
    @staticmethod
    def create_product(data):
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            category=data.get('category', ''),
            price=data['price'],
            brand=data['brand'],
            quantity=data['quantity']
        )
        product.save()
        return product

    @staticmethod
    def get_product(product_id):
        try:
            return Product.objects.get(id=product_id)
        except DoesNotExist:
            return None

    @staticmethod
    def list_products():
        return Product.objects.all()

    @staticmethod
    def update_product(product_id, data):
        product = ProductService.get_product(product_id)
        if product is None:
            return None
        product.name = data['name']
        product.description = data.get('description', '')
        product.category = data.get('category', '')
        product.price = data['price']
        product.brand = data['brand']
        product.quantity = data['quantity']
        product.updated_at = datetime.utcnow()
        product.save()
        return product

    @staticmethod
    def delete_product(product_id):
        product = ProductService.get_product(product_id)
        if product:
            product.delete()
            return True
        return False
    

class ProductCategoryService:

    @staticmethod
    def create_category(data):
        category = ProductCategory(
            title=data['title'],
            description=data.get('description', '')
        )
        category.save()
        return category

    @staticmethod
    def get_category(category_id):
        try:
            return ProductCategory.objects.get(id=category_id)
        except Exception:
            return None

    @staticmethod
    def list_categories():
        return ProductCategory.objects.all()

    @staticmethod
    def update_category(category_id, data):
        category = ProductCategoryService.get_category(category_id)
        if category is None:
            return None
        category.title = data.get('title', category.title)
        category.description = data.get('description', category.description)
        category.save()
        return category

    @staticmethod
    def delete_category(category_id):
        category = ProductCategoryService.get_category(category_id)
        if category:
            category.delete()
            return True
        return False

    @staticmethod
    def add_product_to_category(product_id, category_id):
        product = ProductService.get_product(product_id)
        category = ProductCategoryService.get_category(category_id)
        if product and category:
            product.category = category
            product.save()
            return product
        return None

    @staticmethod
    def remove_product_from_category(product_id):
        product = ProductService.get_product(product_id)
        if product:
            product.category = None
            product.save()
            return product
        return None
