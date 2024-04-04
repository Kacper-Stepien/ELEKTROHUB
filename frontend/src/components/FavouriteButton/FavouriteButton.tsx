import { FaHeart } from "react-icons/fa";
import { useAppSelector } from "../../store/store";
import FloatingButton from "../../ui/FloatingButton";
import Title from "./Title";
import ProductsList from "./ProductsList";

const FavouriteButton = () => {
  const { products: favouriteProducts } = useAppSelector(
    (state) => state.favouriteProducts,
  );
  const numberOfFavouriteProducts = favouriteProducts.length;

  return (
    <FloatingButton
      icon={<FaHeart />}
      name="Ulubione"
      itemCount={numberOfFavouriteProducts}
    >
      <Title numberOfItems={numberOfFavouriteProducts} />
      <ProductsList products={favouriteProducts} />
    </FloatingButton>
  );
};

export default FavouriteButton;
