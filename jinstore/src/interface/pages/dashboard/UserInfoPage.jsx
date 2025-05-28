import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import UserInfo from "../../components/UserInfo";
import { Link } from "react-router-dom";


const UserInfoPage = () => {
  const { user: contextUser } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = contextUser || JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
    }
  }, [contextUser]);

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p>Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Centered content */} 
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">Your Profile Information</h1>
        <UserInfo user={user} />
        <div className="mt-6">
          <Link
            to="/dashboard/edit-profile?mode=edit"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
   
};

export default UserInfoPage;
