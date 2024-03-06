import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productsApi";
import { useEffect, useState } from "react";
import { Product } from "../types/Product.interface";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { category, subcategory, subsubcategory } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const downloadProducts = async () => {
    if (!category) {
      return;
    }
    const response = await getProductsByCategory(category);
    console.log(response);
    if (!response.success) {
      console.error(response.message);
      return;
    }
    setProducts(response.products);
    setTotalProducts(response.totalProducts);
  };

  useEffect(() => {
    downloadProducts();
  }, []);

  return (
    <div className="w-full">
      <p>
        {category} {subcategory} {subsubcategory}
      </p>
      <div className="flex max-w-4xl flex-col gap-6">
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}
