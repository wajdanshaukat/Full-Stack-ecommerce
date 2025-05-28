import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const AccountDetailsForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Details</h2>
      <form className="space-y-6">
        {/* Same fields as before */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
