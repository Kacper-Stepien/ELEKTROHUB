import { useAppSelector } from "../store/store";

const useProductIsInFavourites = (productId: string) => {
  const { products } = useAppSelector((state) => state.favouriteProducts);
  return products.some((product) => product._id === productId);
};

export default useProductIsInFavourites;
