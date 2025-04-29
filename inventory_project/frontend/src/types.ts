export interface ObjectId {
    $oid: string;
  }
  
  export interface ProductCategory {
    _id: ObjectId; // Use the ObjectId interface
    title: string;
    description?: string; // Optional field
  }
  
  export interface Product {
    _id: ObjectId; // Use the ObjectId interface
    name: string;
    description?: string; // Optional field
    // For Week 7 (dummy data), represent category simply.
    // Could be category title (string) or null/undefined if no category.
    category?: string; // Or potentially ProductCategory['title'] | null;
    price: number;
    brand: string;
    quantity: number;
    created_at?: string; // Dates are often strings in JSON
    updated_at?: string;
  }