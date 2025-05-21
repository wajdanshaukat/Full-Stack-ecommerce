import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [userType, setUserType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
        user_type: userType,
      });

      const loginRes = await axios.post(
        "http://localhost:8000/auth/login/",
        new URLSearchParams({ username: email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const token = loginRes.data.access_token;
      await login(token); // fetch profile

      toast.success("Registration successful! Welcome!");

      // Redirect to CompleteProfilePage after signup
      navigate("/complete-profile");
    } catch (error) {
      console.error("Sign-up failed:", error.response?.data || error.message);
      toast.error("Sign-up failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8">
        <p className="text-sm text-center text-gray-500 mb-4">
          There are many advantages to creating an account: the payment process
          is faster, shipment tracking is possible, and much more.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-gray-700 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <label className="font-medium">Account Type</label>
            <div className="flex flex-col gap-1 pl-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={userType === "customer"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                I am a customer
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="vendor"
                  checked={userType === "vendor"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                I am a vendor
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Your personal data will be used to support your experience throughout
            this website, to manage access to your account, and for other purposes
            described in our{" "}
            <a href="#" className="text-purple-600 hover:underline">
              privacy policy
            </a>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
