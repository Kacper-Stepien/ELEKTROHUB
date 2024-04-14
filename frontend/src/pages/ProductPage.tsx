import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi";
import LoadingSpinner from "../ui/LoadingSpinner";
import ProductDetails from "../components/ProductDetails";

const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const {
    isLoading,
    isError,
    data: product,
    error,
    isFetching,
  } = useQuery({
    queryKey: [`product/${id}`],
    queryFn: () => getProductById(id),
  });
  console.log(product);
  if (isError) {
    return (
      <div className="flex w-full justify-center">
        <div>Wystąpił błąd: {error.message}</div>
      </div>
    );
  }
  if (isLoading || isFetching) {
    return (
      <div className="w-full ">
        <LoadingSpinner fullScreen={false} />
      </div>
    );
  }
  return (
    <div className="w-full">
      {product && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductPage;
