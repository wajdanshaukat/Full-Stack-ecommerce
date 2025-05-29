import { Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useWishlist();

  useEffect(() => {
    if (product?.countdown) {
      const interval = setInterval(() => {
        const endDate = new Date(product.countdown);
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0) {
          clearInterval(interval);
          setTimeLeft("Sale Ended");
        } else {
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes}m`);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [product?.countdown]);

  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? "★" : "☆";
    }
    return stars;
  };


  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart ✅`);
  };

  const handleWishlistClick = () => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist ❌`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist ❤️`);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-b last:border-b-0 group relative transition hover:shadow-md">
      {/* Wishlist Button */}
      <button
        aria-label="Toggle Wishlist"
        className="absolute top-3 right-3 z-10"
        onClick={handleWishlistClick}
      >
        <Heart
          size={20}
          className={`transition ${
            isProductInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-gray-400 cursor-pointer"
          } hover:text-red-500`}
        />
      </button>

      {/* Product Image */}
      <div className="w-full h-36 flex justify-center items-center overflow-hidden">
        <img
          src={product?.images[0]?.image_path}
          alt={product?.name}
          className="object-contain h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-medium text-gray-800 truncate">{product.name}</h3>
      <div className="text-xs text-gray-400">{renderStars(product.rating)}</div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">${product.unit_price}</span>
        {product.onSale && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Sale</span>
        )}
      </div>

      {/* Countdown */}
      {timeLeft && <div className="text-xs text-orange-500 mt-2">{timeLeft}</div>}

      {/* Add to Cart Button */}
      <button
        className="mt-2 w-full bg-blue-500 text-white py-1.5 rounded text-sm flex items-center justify-center gap-1 hover:bg-blue-600 transition cursor-pointer
        text-[12px] sm:text-sm"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={14} className="sm:size-4" /> Add to cart
      </button>
    </div>
  );
};

export default ProductCard;