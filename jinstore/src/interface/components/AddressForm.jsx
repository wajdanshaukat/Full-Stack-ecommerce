import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AddressForm = ({
  data,
  handleChange,
  isShipping = false,
  disabledEmail = false,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Prefill ONLY if form data is empty (all blank)
    if (
      !isShipping &&
      Object.values(data).every(val => val === "" || val === "Pakistan")
    ) {
      const prefillFields = {
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "Pakistan",
        streetAddress: user.street_address || "",
        apartment: user.apartment || "",
        town: user.town || "",
        state: user.state || "",
        zipCode: user.zip_code || "",
        companyName: user.company_name || "",
      };

      Object.entries(prefillFields).forEach(([name, value]) => {
        handleChange({ target: { name, value } }, isShipping);
      });
    }
  }, [user]);

  return (
    <>
      {/* your full form as is, unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700">First name *</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={(e) => handleChange(e, isShipping)}
            className="mt-1 block w-full border px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Last name *</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={(e) => handleChange(e, isShipping)}
            className="mt-1 block w-full border px-4 py-2 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Company name</label>
        <input
          type="text"
          name="companyName"
          value={data.companyName}
          onChange={(e) => handleChange(e, isShipping)}
          className="mt-1 block w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Country *</label>
        <select
          name="country"
          value={data.country}
          onChange={(e) => handleChange(e, isShipping)}
          className="mt-1 block w-full border px-4 py-2 rounded-md"
        >
          <option>Pakistan</option>
          <option>Turkey</option>
          <option>United States</option>
          <option>China</option>
          <option>England</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Street address *</label>
        <input
          type="text"
          name="streetAddress"
          value={data.streetAddress}
          onChange={(e) => handleChange(e, isShipping)}
          placeholder="House number and street name"
          className="mt-1 mb-3 block w-full border px-4 py-2 rounded-md"
        />
        <input
          type="text"
          name="apartment"
          value={data.apartment}
          onChange={(e) => handleChange(e, isShipping)}
          placeholder="Apartment, suite, unit etc."
          className="block w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Town / City *</label>
        <input
          type="text"
          name="town"
          value={data.town}
          onChange={(e) => handleChange(e, isShipping)}
          className="mt-1 block w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700">State *</label>
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={(e) => handleChange(e, isShipping)}
            className="mt-1 block w-full border px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={data.zipCode}
            onChange={(e) => handleChange(e, isShipping)}
            className="mt-1 block w-full border px-4 py-2 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Phone *</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={(e) => handleChange(e, isShipping)}
          className="mt-1 block w-full border px-4 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email address *</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e, isShipping)}
          className="mt-1 block w-full border px-4 py-2 rounded-md"
          disabled={disabledEmail}
        />
      </div>
    </>
  );
};

export default AddressForm;
