import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function KelloggsLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    if (email === "admin@example.com" && password === "admin@123") {
      toast.success("Login successful!");
      setTimeout(() => navigate("/activity"), 1000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        {/* Logo */}
        <img
          src="src/assets/images/kellogs-logo.jpg"
          alt="Kelloggs Logo"
          className="mx-auto w-16 h-16 mb-5"
        />

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 mb-1">
          Kellogg Tolaram South Africa
        </h1>
        <p className="text-sm text-gray-500 mb-6">Sampling Application</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="text-left">
          {/* Email */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Forgot password */}
        <p className="text-sm text-blue-600 hover:underline mt-5 cursor-pointer text-center">
          Forgot password?
        </p>
      </div>
    </div>
  );
}
