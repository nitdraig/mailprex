"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./../../assets/success.svg";

const VerifyView = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const REALAPI = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${REALAPI}/auth/verify?token=${token}`);
          const data = await response.json();

          if (response.ok) {
            setMessage(data.message);
            toast.success("Your Account has been verified, please Login", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
            setError("");
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          } else {
            setMessage("");
            setError(data.message);
          }
        } catch (error) {
          setMessage("");
          toast.error("Error verifying account", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        }
      };

      verifyToken();
    }
  }, [token]);
  return (
    <section className="w-full bg-accent h-full pt-20 pb-8  flex flex-col items-center justify-center">
      <img
        src="https://res.cloudinary.com/draig/image/upload/v1718503129/mailprex/njnaga8qv9y5zy0v3rhr.svg"
        alt="Acount Verified"
        className="h-96 float"
        loading="lazy"
      />
      <div className="flex flex-col items-center justify-center">
        <a
          href="/login"
          className="flex items-center space-x-2 bg-primary hover:bg-primary/60 text-gray-100 px-4 py-2 mt-6 rounded-lg transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Go to Login</span>
        </a>
      </div>
    </section>
  );
};
export default VerifyView;
