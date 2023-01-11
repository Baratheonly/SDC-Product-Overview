export interface products {
  id: number;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
}

export interface product {
  id: number;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
  features: feature[];
}

export interface feature {
  feature: string;
  value: string;
}

export interface productStyles {
  product_id: string;
  result: style[];
}

export interface style {
  style_id: number;
  name: string;
  original_price: string;
  sale_price: string;
  default_style: number;
  photos: photo[];
  skus: any; //skus keys can be any number... difficult to type a dynamic key... RESEARCH THIS!
}

export interface photo {
  thumbnail_url: string;
  url: string;
}

export interface relatedProduct {
  related_product_id: number;
}
