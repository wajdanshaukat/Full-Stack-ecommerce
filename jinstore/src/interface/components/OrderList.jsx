import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = ({ orders }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full md:overflow-visible overflow-x-auto bg-white rounded-md shadow">
      <div className="min-w-[640px]">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="text-left px-4 py-2">Order ID</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Total Items</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-colors text-sm"
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">
                  {new Date(order.placed_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{order.order_details.length}</td>
                <td className="px-4 py-2 capitalize">
                  {order.status || "pending"}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                    className="inline-block px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
