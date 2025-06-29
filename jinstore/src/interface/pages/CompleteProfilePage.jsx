import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../components/AddressForm";
import Breadcrumbs from "../../interface/components/Breadcrumbs";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { validateField } from "../../utils/validation";
import axios from "axios";

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
    userType: "customer",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const localUser = user || JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      if (
        localUser.firstName &&
        localUser.lastName &&
        localUser.email &&
        !Object.values(errors).some((e) => e)
      ) {
        const type = localUser.user_type || "customer";
        navigate(type === "vendor" ? "/dashboard" : "/");
      } else {
        setProfileData({
          firstName: localUser.firstName || "",
          lastName: localUser.lastName || "",
          email: localUser.email || "",
          phone: localUser.phone || "",
          country: localUser.country || "Pakistan",
          streetAddress: localUser.streetAddress || "",
          apartment: localUser.apartment || "",
          town: localUser.town || "",
          state: localUser.state || "",
          zipCode: localUser.zipCode || "",
          companyName: localUser.companyName || "",
          userType: localUser.user_type || "customer",
        });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "country",
      "streetAddress",
      "apartment",
      "town",
      "state",
      "zipCode",
      "companyName",
      "userType",
    ];
    
  
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!profileData[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields before saving.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/protected/complete-profile",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      login(updatedUser, token);
      toast.success("Profile saved successfully!");
  
      setTimeout(() => {
        navigate(updatedUser.user_type === "vendor" ? "/dashboard" : "/");
      }, 1000);
    } catch (error) {
      toast.error("Failed to save profile.");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6 font-semibold">Complete Your Profile</h1>
        <form onSubmit={handleSubmit}>
          <AddressForm
            data={profileData}
            handleChange={handleChange}
            disabledEmail={true}
            errors={errors}
          />

          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
