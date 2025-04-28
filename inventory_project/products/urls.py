from django.urls import path
from . import views

urlpatterns = [
    # --- HTML Views ---
    path('products/', views.product_list_view, name='product_list'),
    path('product/detail/<str:product_id>/', views.product_detail_view, name='product_detail'),
    path('categories/', views.category_list_view, name='category_list'),
    path('category/detail/<str:category_id>/', views.category_detail_view, name='category_detail'),

    path('product/create/', views.product_create_view, name='product_create'),
    path('product/update/<str:product_id>/', views.product_update_view, name='product_update'),
    path('product/delete/<str:product_id>/', views.product_delete_view, name='product_delete'),

    path('category/create/', views.category_create_view, name='category_create'),
    path('category/update/<str:category_id>/', views.category_update_view, name='category_update'),
    path('category/delete/<str:category_id>/', views.category_delete_view, name='category_delete'),

    # --- API Endpoints ---
    path('api/product/', views.create_product_api, name='create_product_api'),
    path('api/product/<str:product_id>/', views.get_product_api, name='get_product_api'),
    path('api/products/', views.list_products_api, name='list_products_api'),
    path('api/product/<str:product_id>/update/', views.update_product_api, name='update_product_api'),
    path('api/product/<str:product_id>/delete/', views.delete_product_api, name='delete_product_api'),
    path('api/category/', views.create_category_api, name='create_category_api'),
    path('api/categories/', views.list_categories_api, name='list_categories_api'),
    path('api/category/<str:category_id>/update/', views.update_category_api, name='update_category_api'),
    path('api/category/<str:category_id>/delete/', views.delete_category_api, name='delete_category_api'),
    path('api/product/<str:product_id>/add_category/<str:category_id>/', views.add_product_to_category_api, name='add_product_to_category_api'),
    path('api/product/<str:product_id>/remove_category/', views.remove_product_from_category_api, name='remove_product_from_category_api'),
]