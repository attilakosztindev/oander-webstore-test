export interface Product {
  name: string;
  price: Price;
  in_stock: boolean;
  image: string;
  badges: string[];
  variants: any[];
  category: Category;
  id: string;
}

export interface Category {
  id: string;
  title: string;
}

interface Price {
  normal: number;
  special: number;
}