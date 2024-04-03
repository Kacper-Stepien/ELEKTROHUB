import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productsApi";
import { useEffect, useState } from "react";
import { Product } from "../types/Product.interface";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagintation";
import usePagination from "../hooks/usePagination";
import { PRODUCTS_PER_PAGE } from "../../constants";

export default function ProductsPage() {
  const { category, subcategory, subsubcategory } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { currentPage, goToPage, totalPages, setTotalPages } = usePagination();

  const downloadProducts = async () => {
    if (!category || currentPage < 1 || currentPage > totalPages) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await getProductsByCategory(
        category,
        currentPage,
        totalPages,
      );
      if (!response.success) {
        console.error(response.message);
        return;
      }
      setTotalPages(Math.ceil(response.totalProducts / PRODUCTS_PER_PAGE));
      console.log(response);
      setProducts(response.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("pobieranie");
    downloadProducts();
  }, [category, subcategory, subsubcategory, currentPage, totalPages]);

  return (
    <div className="w-full">
      {isLoading && <div>Ładowanie...</div>}
      {!isLoading && (
        <>
          <Breadcrumbs />
          <div className="mt-6 flex max-w-4xl flex-col gap-6">
            {products &&
              products.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                total={totalPages}
                goToPage={goToPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
