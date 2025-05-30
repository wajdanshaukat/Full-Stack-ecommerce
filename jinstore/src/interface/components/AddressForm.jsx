import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AddressForm = ({
  data,
  handleChange,
  errors = {},
  isShipping = false,
  disabledEmail = false,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (
      !isShipping &&
      Object.values(data).every((val) => val === "" || val === "Pakistan")
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

  const inputClass = (field) =>
    `mt-1 block w-full border px-4 py-2 rounded-md ${
      errors[field] ? "border-red-500" : ""
    }`;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700">
            First name *
          </label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={(e) => {
              const { value } = e.target;
              if (/^[a-zA-Z\s]*$/.test(value)) handleChange(e, isShipping);
            }}
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Last name *
          </label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={(e) => {
              const { value } = e.target;
              if (/^[a-zA-Z\s]*$/.test(value)) handleChange(e, isShipping);
            }}
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Company name
        </label>
        <input
          type="text"
          name="companyName"
          value={data.companyName}
          onChange={(e) => handleChange(e, isShipping)}
          className={inputClass("companyName")}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Country *</label>
        <select
          name="country"
          value={data.country}
          onChange={(e) => handleChange(e, isShipping)}
          className={inputClass("country")}
        >
          <option>Pakistan</option>
          <option>Turkey</option>
          <option>United States</option>
          <option>China</option>
          <option>England</option>
        </select>
        {errors.country && (
          <p className="text-red-600 text-sm mt-1">{errors.country}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Street address *
        </label>
        <input
          type="text"
          name="streetAddress"
          value={data.streetAddress}
          onChange={(e) => handleChange(e, isShipping)}
          placeholder="House number and street name"
          className={inputClass("streetAddress")}
        />
        {errors.streetAddress && (
          <p className="text-red-600 text-sm mt-1">{errors.streetAddress}</p>
        )}

        <input
          type="text"
          name="apartment"
          value={data.apartment}
          onChange={(e) => handleChange(e, isShipping)}
          placeholder="Apartment, suite, unit etc."
          className={inputClass("apartment")}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Town / City *
        </label>
        <input
          type="text"
          name="town"
          value={data.town}
          onChange={(e) => handleChange(e, isShipping)}
          className={inputClass("town")}
        />
        {errors.town && (
          <p className="text-red-600 text-sm mt-1">{errors.town}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700">State *</label>
          <input
            type="text"
            name="state"
            value={data.state}
            onChange={(e) => handleChange(e, isShipping)}
            className={inputClass("state")}
          />
          {errors.state && (
            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={data.zipCode}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d{0,5}$/.test(value)) handleChange(e, isShipping);
            }}
            className={inputClass("zipCode")}
          />
          {errors.zipCode && (
            <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Phone *</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*$/.test(value)) handleChange(e, isShipping);
          }}
          className={inputClass("phone")}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Email address *
        </label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e, isShipping)}
          className={inputClass("email")}
          disabled={disabledEmail}
          title={
            disabledEmail
              ? "Email is fetched from your account and cannot be edited."
              : ""
          }
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
    </>
  );
};

export default AddressForm;
