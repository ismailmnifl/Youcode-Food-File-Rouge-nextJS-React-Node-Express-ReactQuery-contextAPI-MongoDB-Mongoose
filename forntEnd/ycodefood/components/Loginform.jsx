import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { setToken } from "../helpers/auth/token";
import { useRouter } from "next/router";

import { Context } from '../context/Context';


export default function Loginform() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { dispatch, isFetching } = useContext(Context);

  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: "LOGIN_START" });

    const results = await axios.post("http://localhost:8000/auth/", {
      "email": email,
      "password": password
    });
    console.log(results.data);
    if (results.data.credential == true) {
      dispatch({ type: "LOGIN_SUCCESS", payload:{user : results.data}  });
      setError(false);
      setToken(results.data.token);
      router.push("/");
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
   
  }

    return (
      <div>
        <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 ">
          <div className="flex mt-1 mb-5 flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <div className="flex items-center justify-center w-[100%]">

            <img src="/78126-secure-login.gif" alt="" width="200px" height="200px" />
            </div>
            {error && <div className="text-white font-normal text-sm flex items-center justify-center bg-red-400 rounded-sm mt-2 mb-2 p-5">Invalid email or password</div>}
            <div className="mt-10">
              <form onSubmit={onSubmit}>
                <div className="flex flex-col mb-6">
                  <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                  <div>


                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="text" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                  <div>


                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
                  </div>
                </div>

               

                <div className="flex w-full">
                  <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                    <span className="mr-2 uppercase">Login</span>
                    <span>
                      <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </button>

                </div>
              </form>

              
            </div>
            <div className="flex justify-center items-center mt-6">
             
            </div>
          </div>
        </div>
      </div>
    )
  }