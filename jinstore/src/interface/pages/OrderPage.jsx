import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const statusColor = {
  Processing: "bg-orange-100 text-orange-600",
  Shipped: "bg-black text-white",
  Completed: "bg-green-100 text-green-600",
  Refunded: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/order-details/by-order/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setOrderDetails(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div className="p-12">Loading order details...</div>;
  }

  const totalPrice = orderDetails.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Order #{id} Details</h1>
        <div className="flex items-center gap-2">
          <select className="border px-2 py-1 rounded text-sm">
            <option>All</option>
          </select>
          <select className="border px-2 py-1 rounded text-sm">
            <option>Asc</option>
            <option>Desc</option>
          </select>
          <select className="border px-2 py-1 rounded text-sm">
            <option>30</option>
            <option>50</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="border px-2 py-1 rounded text-sm"
          />
          <button className="bg-[#5c3ecf] text-white px-3 py-1 rounded text-sm">
            Actions
          </button>
        </div>
      </div>

      <div className=" bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-[#f6f5ff] text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-4 text-left">Product ID</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 text-red-500 font-medium">
                  {item.product_id}
                </td>
                <td className="p-4">{item.product_name}</td>
                <td className="p-4">${item.unit_price.toFixed(2)}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">
                  ${(item.unit_price * item.quantity).toFixed(2)}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${statusColor["Completed"]}`}
                  >
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end p-6 text-right text-xl font-bold text-gray-800">
        Order Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default OrderDetails;
