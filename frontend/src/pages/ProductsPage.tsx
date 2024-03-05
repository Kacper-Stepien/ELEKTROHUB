import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productsApi";
import { useEffect, useState } from "react";
import { Product } from "../types/Product.interface";

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
  }, [category]);

  return (
    <div className="">
      <p>
        {category} {subcategory} {subsubcategory}
      </p>
      <div>
        {products.map((product) => (
          <div key={product._id} className="bg-red-500">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}
