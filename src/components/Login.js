import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, SetErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data

    let message;

    if (isSignInForm) {
      // For Sign In → no name field
      message = checkValidData(email.current.value, password.current.value);
    } else {
      // For Sign Up → includes name field
      message = checkValidData(
        email.current.value,
        password.current.value,
        name.current?.value // safe access
      );
    }
    SetErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/158280960?v=4&size=64",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              SetErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="text-white w-4/12 p-12 absolute bg-opacity-80 bg-black my-36 mx-auto right-0 left-0 "
        >
          <div>
            <h1 className="text-white font-bold text-3xl mb-2">
              {" "}
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
          </div>

          {!isSignInForm && (
            <input
              ref={name}
              className="p-4 my-5 w-full bg-gray-500 rounded-md"
              type="text"
              placeholder="Enter your name"
            ></input>
          )}

          <input
            ref={email}
            className="p-4 my-5 w-full bg-gray-500 rounded-md"
            type="text"
            placeholder="Email or phone number"
          ></input>
          <input
            ref={password}
            className="p-4 my-5 w-full bg-gray-500 rounded-md"
            type="text"
            placeholder="Password"
          ></input>

          <p className="text-red-500 font-semibold py-2">{errorMessage}</p>
          <button
            onClick={handleButtonClick}
            className="p-4 my-5 w-full bg-red-600 rounded-md"
          >
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
