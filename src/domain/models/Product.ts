// Product model that represents a product in the store
export interface Product {
  id: string; // Unique identifier for the product (UUID)
  name: string; // Name of the product
  description: string; // Description of the product
  category: string; // Category of the product (e.g., Electronics, Apparel)
  price: number; // Price of the product
}
