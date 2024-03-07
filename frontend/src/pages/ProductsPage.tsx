import { useParams, useSearchParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productsApi";
import { useEffect, useState } from "react";
import { Product } from "../types/Product.interface";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagintation";
import usePagination from "../hooks/usePagination";

export default function ProductsPage() {
  const { category, subcategory, subsubcategory } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const { page } = usePagination();
  console.log(`page: ${page}`);

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
    console.log("pobieranie");
    downloadProducts();
  }, [category, subcategory, subsubcategory]);

  return (
    <div className="w-full">
      <Breadcrumbs />
      <div className="mt-6 flex max-w-4xl flex-col gap-6">
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        <Pagination
          page={parseInt(page!)}
          total={30}
          goToPage={(page: number) => console.log(page)}
        />
      </div>
    </div>
  );
}
