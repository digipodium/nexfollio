"use client";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required").min(3, "Too short!"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "Uppercase letter is required")
    .matches(/[a-z]/, "Lowercase letter is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/[_.@#/]/, "Special character is required")
    .min(8, "Minimum 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/add`,
        values,
      );
      console.log(res.status);
      if (res.status == 200) {
        toast.success("Signup successful! 🎉");
        router.push("/login");
      } else {
        toast.error("Signup failed");
      }
    },
    validationSchema: signupSchema,
  });

  return (
    <div
      id="signup-page"
      className="min-h-screen flex items-center justify-center pt-[calc(var(--nav-height)+16px)] sm:pt-[calc(var(--nav-height)+24px)] px-4 sm:px-6 pb-8 sm:pb-10 relative"
    >
      {/* Background glow */}
      <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.12),transparent_70%)] top-[15%] left-[10%] sm:left-[15%] blur-[60px] pointer-events-none" />
      <div className="absolute w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse,rgba(236,72,153,0.08),transparent_70%)] bottom-[15%] right-[10%] sm:right-[15%] blur-[60px] pointer-events-none" />

      <div className="glass-card animate-fade-in-up w-full max-w-[480px] py-8 sm:py-12 px-6 sm:px-9 relative">
        {/* Header */}
        <div className="text-center mb-7 sm:mb-9">
          <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-[14px] bg-linear-to-br from-accent-purple to-accent-pink inline-flex items-center justify-center text-lg sm:text-xl font-extrabold text-white mb-4 sm:mb-5 shadow-[0_8px_32px_rgba(168,85,247,0.3)]">
            N
          </div>
          <h3
            id="signup-heading"
            className="text-xl sm:text-[1.75rem] font-extrabold tracking-tight mb-1.5 sm:mb-2"
          >
            Create Account
          </h3>
          <p className="text-sm sm:text-[0.9375rem] text-txt-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-link font-semibold no-underline transition-colors duration-200 hover:text-link-hover"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Google Button */}
        <button
          id="google-signup-btn"
          type="button"
          className="w-full py-2.5 sm:py-3 rounded-xl bg-bg-glass border border-border-default text-txt-primary text-sm sm:text-[0.9375rem] font-medium cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-bg-glass-hover hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5"
        >
          <svg width="18" height="18" viewBox="0 0 46 47" fill="none">
            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="divider-text my-5 sm:my-7">
          or register with email
        </div>

        {/* Form */}
        <form onSubmit={signupForm.handleSubmit}>
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="input-label">Full Name</label>
              <input type="text" id="name" name="name" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.name} placeholder="John Doe" className="input-field" />
              {signupForm.errors.name && signupForm.touched.name && (
                <p className="input-error">{signupForm.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="input-label">Email Address</label>
              <input type="email" id="email" name="email" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.email} placeholder="you@example.com" className="input-field" />
              {signupForm.errors.email && signupForm.touched.email && (
                <p className="input-error">{signupForm.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" id="password" name="password" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.password} placeholder="••••••••" className="input-field" />
              {signupForm.errors.password && signupForm.touched.password && (
                <p className="input-error">{signupForm.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" onChange={signupForm.handleChange} onBlur={signupForm.handleBlur} value={signupForm.values.confirmPassword} placeholder="••••••••" className="input-field" />
              {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
                <p className="input-error">{signupForm.errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2 text-xs sm:text-[0.8125rem] text-txt-secondary cursor-pointer select-none">
              <input type="checkbox" id="terms-checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-accent-indigo mt-0.5 shrink-0" />
              <span>
                I agree to the{" "}
                <span className="text-link font-medium cursor-pointer hover:text-link-hover transition-colors duration-200">Terms of Service</span>{" "}
                and{" "}
                <span className="text-link font-medium cursor-pointer hover:text-link-hover transition-colors duration-200">Privacy Policy</span>
              </span>
            </label>

            {/* Submit */}
            <button type="submit" id="signup-submit-btn" className="btn-primary w-full py-3 sm:py-3.5 text-sm sm:text-[0.9375rem] mt-1">
              <span>Create Account</span>
            </button>
          </div>
        </form>

        {/* Password requirements */}
        <div className="mt-5 sm:mt-6 p-3 sm:p-4 rounded-xl bg-[rgba(99,102,241,0.06)] border border-[rgba(99,102,241,0.12)]">
          <p className="text-[0.6875rem] sm:text-xs font-semibold text-link mb-1.5 sm:mb-2 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Password Requirements
          </p>
          <div className="grid grid-cols-2 gap-1">
            {["Min 8 characters", "1 uppercase letter", "1 lowercase letter", "1 number", "1 special char (_.@#/)"].map((req, i) => (
              <span key={i} className="text-[0.5625rem] sm:text-[0.6875rem] text-txt-muted flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-accent-indigo shrink-0" /> {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
