"use client";

import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
          values
        );

        toast.success("Login successful 🚀");

        const { token } = response.data;
        localStorage.setItem("token", token);

        // 🔥 redirect after login
        router.push("/dashboard");

      } catch (err) {
        if (err?.response?.status === 403) {
          toast.error(err?.response?.data?.message);
        } else {
          toast.error("Something went wrong ❌");
        }
      }
    },
  });

  return (
    <div
      id="login-page"
      className="min-h-screen flex items-center justify-center pt-[calc(var(--nav-height)+16px)] sm:pt-[calc(var(--nav-height)+24px)] px-4 sm:px-6 pb-8 sm:pb-10 relative"
    >
      {/* Background glow */}
      <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)] top-[20%] right-[10%] sm:right-[20%] blur-[60px] pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.1),transparent_70%)] bottom-[20%] left-[10%] sm:left-[20%] blur-[60px] pointer-events-none" />

      <div className="glass-card animate-fade-in-up w-full max-w-[440px] py-8 sm:py-12 px-6 sm:px-9 relative">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-[14px] bg-linear-to-br from-accent-indigo to-accent-purple inline-flex items-center justify-center text-lg sm:text-xl font-extrabold text-white mb-4 sm:mb-5 shadow-[0_8px_32px_rgba(99,102,241,0.3)]">
            N
          </div>
          <h3
            id="login-heading"
            className="text-xl sm:text-[1.75rem] font-extrabold tracking-tight mb-1.5 sm:mb-2"
          >
            Welcome Back
          </h3>
          <p className="text-sm sm:text-[0.9375rem] text-txt-secondary">
            Sign in to continue building your portfolio
          </p>
        </div>

        {/* Google Button */}
        <button
          id="google-login-btn"
          type="button"
          className="w-full py-2.5 sm:py-3 rounded-xl bg-bg-glass border border-border-default text-txt-primary text-sm sm:text-[0.9375rem] font-medium cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-bg-glass-hover hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 46 47" fill="none">
            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="divider-text my-5 sm:my-7">
          or sign in with email
        </div>

        {/* Form */}
        <form onSubmit={loginForm.handleSubmit}>
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                onChange={loginForm.handleChange}
                value={loginForm.values.email}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-xs sm:text-[0.8125rem] text-txt-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-accent-indigo rounded"
                />
                Remember me
              </label>

              <span
                id="forgot-password-link"
                onClick={() => router.push("/forgotpassword")}
                className="text-xs sm:text-[0.8125rem] text-link cursor-pointer transition-colors duration-200 hover:text-link-hover"
              >
                Forgot Password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              className="btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-[0.9375rem] mt-1"
            >
              <span>Sign In</span>
            </button>
          </div>
        </form>

        {/* Signup link */}
        <p className="text-center text-[0.8125rem] sm:text-sm text-txt-secondary mt-5 sm:mt-7">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            id="goto-signup-link"
            className="text-link font-semibold no-underline transition-colors duration-200 hover:text-link-hover"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;