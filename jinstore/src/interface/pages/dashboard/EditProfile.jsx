import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { validateField } from "../../../utils/validation";

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = new URLSearchParams(location.search).get("mode") === "edit";

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
      if (localUser.firstName && localUser.lastName && localUser.email && !isEditMode) {
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
      "email",
      "phone",
      "country",
      "streetAddress",
      "town",
      "state",
      "zipCode",
    ];
  
    const newErrors = {};
    requiredFields.forEach((field) => {
      const errorMsg = validateField(field, profileData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }
  
    const updatedUser = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      country: profileData.country,
      streetAddress: profileData.streetAddress,
      apartment: profileData.apartment,
      town: profileData.town,
      state: profileData.state,
      zipCode: profileData.zipCode,
      companyName: profileData.companyName,
      user_type: profileData.userType,
    };
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/protected/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const data = await response.json();
  
      // Update localStorage and context
      const mergedUser = {
        ...data,
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress: data.streetAddress,
        zipCode: data.zipCode,
        companyName: data.companyName,
        userType: data.user_type,
      };
  
      localStorage.setItem("user", JSON.stringify(mergedUser));
      if (login && token) login(mergedUser, token);
  
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate(mergedUser.userType === "vendor" ? "/dashboard" : "/");
      }, 1000);
    } catch (err) {
      toast.error("An error occurred while updating your profile.");
      console.error(err);
    }
  };  

  return (
    <div className="p-6">
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

export default EditProfile;
