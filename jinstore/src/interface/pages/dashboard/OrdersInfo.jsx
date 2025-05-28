import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import OrderList from "../../components/OrderList";

const OrdersInfo = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://127.0.0.1:8000/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch orders:", err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="p-6">  
      {/* Centered content */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
  
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <OrderList orders={orders} />
        ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersInfo;
