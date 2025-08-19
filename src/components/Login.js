import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    SetIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg" />
      </div>

      <div>
        <form className="text-white w-4/12 p-12 absolute bg-opacity-80 bg-black my-36 mx-auto right-0 left-0 ">
          <div>
            <h1 className="text-white font-bold text-3xl mb-2">
              {" "}
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
          </div>

          {!isSignInForm && (
            <input
              className="p-4 my-5 w-full bg-gray-300 rounded-md"
              type="text"
              placeholder="Enter your name"
            ></input>
          )}

          <input
            className="p-4 my-5 w-full bg-gray-300 rounded-md"
            type="text"
            placeholder="Email or phone number"
          ></input>
          <input
            className="p-4 my-5 w-full bg-gray-300 rounded-md"
            type="text"
            placeholder="Password"
          ></input>
          <button className="p-4 my-5 w-full bg-red-600 rounded-md">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already resgisterd? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
