import React, { useState, useEffect,useContext } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { Context } from "../context/Context";
import { toast } from 'react-toastify';


function Reviews(resauId) {

  const { user, dispatch } = useContext(Context);

  const queryClient = useQueryClient();
  const [stars, setStars] = useState("");
  const [description,setDescription] = useState("");


  const restaurantId = resauId.resauId;


  const reviewData = useQuery("reviewData", () =>
    axios.get(
      `http://localhost:8000/review/restaurant/${restaurantId}`
    ).then((res) => res.data)
  );

  const stats = useQuery("statsData", () =>
    axios.get(
      `http://localhost:8000/stats/review/${restaurantId}`
    ).then((res) => res.data)
  );
  console.log(stats.data);

  const insertReview = async (e)=> {
    e.preventDefault(); 
    if(description =="")
    {
      toast.error('the review desription is required !', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else {
      const newReview = await axios.post("http://localhost:8000/review/", {
        "description": description,
        "stars": stars,
        "userId" : user.user._id,
        "restauId" : restaurantId
      });
      console.log(newReview.data);
        queryClient.invalidateQueries('reviewData')
        queryClient.invalidateQueries('statsData')
    }
   
  }



  return (
    <>    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <div className="border rounded-lg p-4">
                <h2 className="text-gray-800 text-lg lg:text-xl font-bold mb-3">Customer Reviews</h2>

                <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex gap-0.5 -ml-1">
                  {
                          Array.from({ length: stats?.data?.reviewAVG }, (_, i) =>
                            <span key={i}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                          )
                        }
                  </div>

                  <span className="text-sm font-semibold">{parseFloat(stats?.data?.reviewAVG.toFixed(1))}/5</span>
                </div>

                <span className="block text-gray-500 text-sm">Bases on {stats?.data?.reviewCount} reviews</span>


                <form onSubmit={insertReview}>
                  <label htmlFor="file" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Star Count</label>
                  <select  onChange={(e) => setStars(e.target.value)}  name="role" className="w-full mb-2 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">

                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>

                  </select>
                  <textarea  onChange={(e) => setDescription(e.target.value)} className="w-full mb-2 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" name="review" id="review" cols="30" rows="10"></textarea>



                  <button href="#" className="block w-[100%] bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:ring ring-indigo-300 border text-gray-500 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 md:px-8 py-2 md:py-3">
                    Write a review
                  </button>

                </form>

              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="border-b pb-4 md:pb-6">
                <h2 className="text-gray-800 text-lg lg:text-xl font-bold">Students Reviews</h2>
              </div>

              <div className="divide-y">
                {
                  reviewData?.data?.map((item) => (
                    <div key={item._id} className="flex flex-col gap-3 py-4 md:py-8">
                      <div>
                        <span className="block text-sm font-bold">{item?.user?.fullName}</span>
                        <span className="block text-gray-500 text-sm">{item.createdAt}</span>
                      </div>
                      <div className="flex items-start justify-start flex-row">
                        {
                          Array.from({ length: item.stars }, (_, i) =>
                            <span key={i}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                          )
                        }


                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default Reviews