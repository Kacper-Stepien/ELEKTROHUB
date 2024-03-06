import { FC } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface ProductRatingStarsProps {
  averageRating: number;
  numberOfReviews: number;
}

const ProductRatingStars: FC<ProductRatingStarsProps> = ({
  averageRating,
  numberOfReviews,
}) => {
  const starColor = "text-yellow-400";

  return (
    <div className="flex items-center gap-1 text-sm">
      {[...Array(5).keys()].map((index) => {
        const rating = averageRating - index;
        if (rating >= 1) {
          return <FaStar key={index} className={`${starColor}`} />;
        }
        if (rating >= 0.5) {
          return <FaStarHalfAlt key={index} className={`${starColor}`} />;
        }
        return <FaRegStar key={index} className={`${starColor}`} />;
      })}
      <p className="ml-1 font-bold">{averageRating}</p>
      <p className="ml-1">({numberOfReviews} opini)</p>
    </div>
  );
};

export default ProductRatingStars;
