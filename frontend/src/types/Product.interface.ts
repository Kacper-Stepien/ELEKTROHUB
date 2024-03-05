export interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  onSale: boolean;
  averageRating: number;
  numberOfReviews: number;
  attributes: [
    {
      name: string;
      value: string;
    },
  ];
  images: [string];
}
