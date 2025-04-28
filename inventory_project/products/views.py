from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .services import ProductService, ProductCategoryService
from datetime import datetime
import json

# --- API Endpoints (Keep these as they are) ---
def validate_product_data(data):
    required_fields = ['name', 'price', 'brand', 'quantity']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    return True, ""

@csrf_exempt
@require_http_methods(["POST"])
def create_product_api(request):
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    valid, msg = validate_product_data(data)
    if not valid:
        return JsonResponse({"error": msg}, status=400)

    product = ProductService.create_product(data)
    return JsonResponse({"message": "Product created", "product": product.to_json()}, status=201)

@require_http_methods(["GET"])
def get_product_api(request, product_id):
    product = ProductService.get_product(product_id)
    if product is None:
        return JsonResponse({"error": "Product not found"}, status=404)
    return JsonResponse(product.to_json(), safe=False)

@require_http_methods(["GET"])
def list_products_api(request):
    products = ProductService.list_products()
    products_list = [json.loads(p.to_json()) for p in products]
    return JsonResponse({"products": products_list})

@csrf_exempt
@require_http_methods(["PUT"])
def update_product_api(request, product_id):
    product = ProductService.get_product(product_id)
    if product is None:
        return JsonResponse({"error": "Product not found"}, status=404)
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    valid, msg = validate_product_data(data)
    if not valid:
        return JsonResponse({"error": msg}, status=400)

    updated_product = ProductService.update_product(product_id, data)
    return JsonResponse({"message": "Product updated", "product": updated_product.to_json()})

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_product_api(request, product_id):
    success = ProductService.delete_product(product_id)
    if success:
        return JsonResponse({"message": "Product deleted"})
    else:
        return JsonResponse({"error": "Product not found"}, status=404)

@csrf_exempt
@require_http_methods(["POST"])
def create_category_api(request):
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if 'title' not in data:
        return JsonResponse({"error": "Title is required"}, status=400)

    category = ProductCategoryService.create_category(data)
    return JsonResponse({"message": "Category created", "category": category.to_json()}, status=201)

@require_http_methods(["GET"])
def list_categories_api(request):
    categories = ProductCategoryService.list_categories()
    categories_list = [c.to_json() for c in categories]
    return JsonResponse({"categories": categories_list})

@csrf_exempt
@require_http_methods(["PUT"])
def update_category_api(request, category_id):
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    category = ProductCategoryService.update_category(category_id, data)
    if not category:
        return JsonResponse({"error": "Category not found"}, status=404)
    return JsonResponse({"message": "Category updated", "category": category.to_json()})

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_category_api(request, category_id):
    success = ProductCategoryService.delete_category(category_id)
    if success:
        return JsonResponse({"message": "Category deleted"})
    else:
        return JsonResponse({"error": "Category not found"}, status=404)

@csrf_exempt
@require_http_methods(["POST"])
def add_product_to_category_api(request, product_id, category_id):
    product = ProductCategoryService.add_product_to_category(product_id, category_id)
    if product:
        return JsonResponse({"message": "Product added to category", "product": product.to_json()})
    else:
        return JsonResponse({"error": "Product or Category not found"}, status=404)

@csrf_exempt
@require_http_methods(["POST"])
def remove_product_from_category_api(request, product_id):
    product = ProductCategoryService.remove_product_from_category(product_id)
    if product:
        return JsonResponse({"message": "Product removed from category", "product": product.to_json()})
    else:
        return JsonResponse({"error": "Product not found"}, status=404)


def product_list_view(request):
    products = ProductService.list_products()
    return render(request, 'products/product_list.html', {'products': products})

def product_detail_view(request, product_id):
    product = ProductService.get_product(product_id)
    if product:
        return render(request, 'products/product_detail.html', {'product': product})
    else:
        return render(request, 'products/product_not_found.html', {'product_id': product_id}, status=404)

def category_list_view(request):
    categories = ProductCategoryService.list_categories()
    return render(request, 'products/category_list.html', {'categories': categories})

def category_detail_view(request, category_id):
    category = ProductCategoryService.get_category(category_id)
    if category:
        products_in_category = ProductService.list_products().filter(category=category)
        return render(request, 'products/category_detail.html', {'category': category, 'products': products_in_category})
    else:
        return render(request, 'products/category_not_found.html', {'category_id': category_id}, status=404)

def product_create_view(request):
    categories = ProductCategoryService.list_categories()
    return render(request, 'products/product_create.html', {'categories': categories})


def product_update_view(request, product_id):
    product = ProductService.get_product(product_id)
    if product:
        return render(request, 'products/product_update.html', {'product': product})
    else:
        return render(request, 'products/product_not_found.html', {'product_id': product_id}, status=404)

def product_delete_view(request, product_id):
    product = ProductService.get_product(product_id)
    if product:
        return render(request, 'products/product_delete.html', {'product': product})
    else:
        return render(request, 'products/product_not_found.html', {'product_id': product_id}, status=404)

def category_create_view(request):
    return render(request, 'products/category_create.html')

def category_update_view(request, category_id):
    category = ProductCategoryService.get_category(category_id)
    if category:
        return render(request, 'products/category_update.html', {'category': category})
    else:
        return render(request, 'products/category_not_found.html', {'category_id': category_id}, status=404)

def category_delete_view(request, category_id):
    category = ProductCategoryService.get_category(category_id)
    if category:
        return render(request, 'products/category_delete.html', {'category': category})
    else:
        return render(request, 'products/category_not_found.html', {'category_id': category_id}, status=404)