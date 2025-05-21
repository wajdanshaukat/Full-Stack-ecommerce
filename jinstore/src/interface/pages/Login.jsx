import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login/",
        new URLSearchParams({ username: email, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const token = res.data.access_token;
      if (rememberMe) localStorage.setItem("authToken", token);
      await login(token); // fetch profile inside login()

      toast.success("Welcome back!");

      // Redirect to CompleteProfilePage regardless of userType
      navigate("/complete-profile");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-8">
        <p className="text-sm text-center text-gray-500 mb-4">
          If you have an account, sign in with your email address.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Lost your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
