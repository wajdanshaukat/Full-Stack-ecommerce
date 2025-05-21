const ProductFullCard = ({ product }) => (
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
      <div className="flex items-start gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-contain bg-white rounded"
        />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
          <p className="text-red-500 font-bold text-sm">
            {product.price}{" "}
            <span className="text-gray-400 line-through ml-1">
              {product.original}
            </span>
          </p>
          <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full inline-block mt-1">
            {product.discount}
          </span>
          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-xs mb-1">
          Available Qty: <strong>{product.available}</strong>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
          <div
            className="bg-red-400 h-2 rounded-full"
            style={{ width: `${Math.min(100, product.available * 2)}%` }}
          ></div>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full w-full text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
  
  export default ProductFullCard;  