import { useState } from "react";
import LoginForm from "../pages/Login";
import RegisterForm from "../pages/SignUp";
import Breadcrumbs from "../../interface/components/Breadcrumbs";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Breadcrumb - top-left */}
      <div className="absolute top-4 left-4 text-sm text-gray-500">
        <Breadcrumbs />
      </div>

      {/* Centered login/register box */}
      <div className="flex-grow flex justify-center py-12">
        <div className="w-full max-w-md my-12">
          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-4 text-xl font-medium">
            <button
              onClick={() => setActiveTab("login")}
              className={`${
                activeTab === "login"
                  ? "text-black font-semibold"
                  : "text-gray-400 cursor-pointer"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`${
                activeTab === "register"
                  ? "text-black font-semibold"
                  : "text-gray-400 cursor-pointer"
              }`}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
