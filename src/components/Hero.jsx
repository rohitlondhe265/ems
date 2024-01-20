import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="py-12 md:mx-36">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Your Test Series Portal</h1>
        <p className="text-lg mb-8">
          Prepare for success with our high-quality test series and expert
          guidance.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <img
            src="/quiz.png"
            alt="Test Series Image"
            className="mx-auto rounded-md w-96"
          />
          <div className="w-96">
          <Link
            href="/examination"
            className="bg-primary text-white py-2 px-6 rounded md:ml-8 hover:bg-opacity-75 duration-500"
          >
            Test YourSelf
          </Link></div>
        </div>
      </div>
    </div>
  );
}
