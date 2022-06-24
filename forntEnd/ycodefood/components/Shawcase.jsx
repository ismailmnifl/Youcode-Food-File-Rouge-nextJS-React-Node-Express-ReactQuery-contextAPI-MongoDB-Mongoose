
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";



export default function Showcase() {


  //images url prefix
	const imageUrl = "http://localhost:8000/uploads/";


  const router = useRouter();
  const { isLoading, error, data, isFetching } = useQuery("allowedRestauData", () =>
		axios.get(
			"http://localhost:8000/restaurant/allowed/"
		).then((res) => res.data)
	);


	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error : {error}</p>

  const handleClick = (index) => {
    router.push("/restaurant/[restaurantId]", `/restaurant/${index}`);
  } 
  return (
    <>
    
    <div className="w-[100%] flex items-center justify-center ">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Available Restaurants</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-6 sm:gap-y-8 lg:gap-y-12">
          {data.map((item) => (
            <div key={item._id} onClick={() => handleClick(item._id)}  className="cursor-pointer">
              <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4 lg:p-8">
        <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
          <img src={imageUrl + item.logo} loading="lazy" alt="Photo by Radu Florin" className="w-full h-full object-cover object-center" />
        </div>

        <div>
          <div className="text-indigo-500 md:text-lg font-bold text-center">{item.name}</div>
          <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">{item.phoneNumber}</p>

          <div className="flex justify-center">
            <div className="flex gap-4">
              <a href="#" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a href="#" target="_blank" className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition duration-100">
                <svg className="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
           </div>
           
          ))}


      
        </div>
      </div>
    </div>
    </>
  )
}