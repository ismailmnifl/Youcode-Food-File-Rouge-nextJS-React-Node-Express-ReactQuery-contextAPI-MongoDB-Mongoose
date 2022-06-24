import { Context } from "../context/Context";

import React, { useState, useEffect, useContext } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";

import axios from "axios";

import MealsModal from '../components/mealsModal';

function reservation() {
  const { user, dispatch } = useContext(Context);
  const restauIndex = user?.user?.restaurant?._id;
  const queryClient = useQueryClient();
  //load all users data
  const restaurantMealsData = useQuery("restaurantMealsData", () =>
    axios.post(
      "http://localhost:8000/meal/restaurant", {
      restaurantId: restauIndex
    }
    ).then((res) => res.data)
  );

  //images url prefix
  const imageUrl = "http://localhost:8000/uploads/";

  //delete single meal 
  const mutation = useMutation(mealId => {
    return axios.delete(`http://localhost:8000/meal/${mealId.id}`,)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurantMealsData')
    },
  }
  )


  const cardMutation = useMutation(cardId => {
    return axios.delete(`http://localhost:8000/card/${cardId.id}`,)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('restaurantReservationData')
    },
  }
  )
  const restaurantReservationData = useQuery("restaurantReservationData", () =>
    axios.get(
      `http://localhost:8000/card/restaurant/${restauIndex}`
    ).then((res) => res.data)
  );
  console.log(restaurantReservationData.data);

  return (
    <div className='flex items-start justify-evenly flex-wrap  w-[100%] min-h-screen h-auto bg-sky-700'>
      <div className='w-[650px] h-[500px] bg-white mt-8 mb-8 rounded-md flex items-center justify-center flex-col'>
        <div className="bg-white p-2 rounded-md w-full overflow-y-scroll h-[100%]">
          <div className="overflow-x-auto ">
            <div className="inline-block w-[100%] shadow rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      size
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      price
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      category
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantReservationData?.data?.map((item) => (
                    <tr key={item?._id}>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="flex items-center">
                          
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{item?.userName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{item?.mealName}</p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="text-gray-900 whitespace-no-wrap">
                          {item?.mealPrice}
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.createdAt}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className='w-16 bg-red-200 cursor-pointer flex items-center justify-center px-3 py-1 font-semibold rounded-full text-red-900 leading-tight'
                          onClick={() => {
                            const id = item._id
                            cardMutation.mutate({ id });
                          }}
                        >Remove</p>
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      <div className='w-[650px] h-[500px] bg-white mt-8 mb-8 rounded-md flex items-center justify-center flex-col'>
        <div className="bg-white p-2 rounded-md w-full overflow-y-scroll h-[90%]">
          <div className="overflow-x-auto">
            <div className="inline-block w-[100%] shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      size
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      price
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      category
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantMealsData?.data?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full object-cover h-full rounded-full"
                              src={imageUrl + item.image} alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{item.size}</p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <div className="text-gray-900 whitespace-no-wrap">
                          {item.price}
                        </div>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.category?.title}
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <p className='w-16 bg-red-200 cursor-pointer flex items-center justify-center px-3 py-1 font-semibold rounded-full text-red-900 leading-tight'
                          onClick={() => {
                            const id = item._id
                            mutation.mutate({ id });
                          }}
                        >Remove</p>
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>

            </div>
          </div>

        </div>
        <div className="w-full flex items-start justify-start pl-4">
          <MealsModal restauId={restauIndex} />

        </div>

      </div>
    </div>
  )
}

export default reservation