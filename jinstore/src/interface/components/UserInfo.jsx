import React from "react";

const UserInfo = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const billingAddress = `${user.streetAddress} ${user.apartment}, ${user.town}, ${user.state}, ${user.country}, ${user.zipCode}`;
  const shippingDifferent = user.shipping_address && user.shipping_address !== billingAddress;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Name</h2>
        <p>{fullName}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Email</h2>
        <p>{user.email}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Phone</h2>
        <p>{user.phone}</p>
      </div>

      {user.companyName && (
        <div>
          <h2 className="text-xl font-semibold">Company</h2>
          <p>{user.companyName}</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold">Billing Address</h2>
        <p>{billingAddress}</p>
      </div>

      {shippingDifferent && (
        <div>
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <p>{user.shipping_address}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
