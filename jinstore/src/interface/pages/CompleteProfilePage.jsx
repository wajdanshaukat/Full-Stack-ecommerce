import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import Breadcrumbs from "../../interface/components/Breadcrumbs";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const CompleteProfilePage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    streetAddress: "",
    apartment: "",
    town: "",
    state: "",
    zipCode: "",
    companyName: "",
  });

  useEffect(() => {
    const localUser = user || JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      if (localUser.first_name && localUser.last_name && localUser.email) {
        navigate("/");
      } else {
        setProfileData({
          firstName: localUser.first_name || "",
          lastName: localUser.last_name || "",
          email: localUser.email || "",
          phone: localUser.phone || "",
          country: localUser.country || "Pakistan",
          streetAddress: localUser.street_address || "",
          apartment: localUser.apartment || "",
          town: localUser.town || "",
          state: localUser.state || "",
          zipCode: localUser.zip_code || "",
          companyName: localUser.company_name || "",
        });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...profileData,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      street_address: profileData.streetAddress,
      zip_code: profileData.zipCode,
      company_name: profileData.companyName,
    };

    // ✅ Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // ✅ Update context if possibleA
    if (login) {
      login(updatedUser, localStorage.getItem("token"));
    }

    toast.success("Profile saved locally!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Breadcrumbs
        links={[
          { title: "Home", href: "/" },
          { title: "Complete Profile", href: "/complete-profile" },
        ]}
      />
      <h1 className="text-3xl mb-6 font-semibold">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <AddressForm
          data={profileData}
          handleChange={handleChange}
          disabledEmail={true}
        />

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default CompleteProfilePage;
