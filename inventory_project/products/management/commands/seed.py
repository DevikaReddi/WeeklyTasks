from django.core.management.base import BaseCommand
from products.models import Product, ProductCategory

class Command(BaseCommand):
    help = "Seed the database with sample data."

    def handle(self, *args, **kwargs):
        # Optional: clear existing data
        Product.drop_collection()
        ProductCategory.drop_collection()

        # Create categories
        electronics = ProductCategory(title="Electronics", description="Gadgets")
        electronics.save()
        clothing = ProductCategory(title="Clothing", description="Apparel")
        clothing.save()

        # Create products
        Product(
            name="Smartphone",
            description="Latest Android phone",
            category=electronics,
            price=699.99,
            brand="TechCorp",
            quantity=20
        ).save()

        Product(
            name="Hoodie",
            description="Warm and comfy",
            category=clothing,
            price=39.99,
            brand="FashionX",
            quantity=15
        ).save()

        self.stdout.write(self.style.SUCCESS("🎉 Seed data loaded!"))
