
import React, { useState, useEffect, useContext } from "react";

import {
    useQuery,
    useMutation,
    QueryClient,
    useQueryClient,
} from "react-query";
import { toast } from 'react-toastify';

import { Context } from "../context/Context";


import axios from "axios";


function card() {
    const queryClient = useQueryClient();
    //images url prefix
    const imageUrl = "http://localhost:8000/uploads/";

    const [fullCardPrice,setFullCardPrice] = useState(0);

    const { user, dispatch } = useContext(Context);

    const userIndex = user?.user?._id;
    //fetch all user card data
    const userCardData = useQuery("userCardData", () =>
        axios.get(
            `http://localhost:8000/card/${userIndex}`
        ).then((res) => res.data)
    );
    console.log(userCardData.data);

    var totalPrice = 0;
    if (userCardData.data) {
        for (let index = 0; index < userCardData.data.length; index++) {
                totalPrice = totalPrice + userCardData?.data[index]?.meal?.price;
        }
    }

    //delete single card item
    	
	const mutation = useMutation(cardId => {
		return axios.delete(`http://localhost:8000/card/${cardId.id}`,)
	},{
		onSuccess: () => {
			queryClient.invalidateQueries('userCardData')
		  },
	})
    const handleCheckOut = async (userCardData) => {
        for (let index = 0; index < userCardData.length; index++) {
            console.log("reservation index",userCardData[index]._id);
            const reservation = await axios.post("http://localhost:8000/reservation/", {
                "cardId" : userCardData[index]._id
              });
              console.log("reservation ",index," : ",reservation.data);
    }
   
              toast.success('the user was added succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
    }
    const [reservationEfecter,setReservationEfecter] =useState(false);
    return (
        <div
            className='w-[100%] pb-8 pt-8 h-min-screen bg-sky-700 flex items-center justify-start flex-col'>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
                    <div className="mb-6 sm:mb-10 lg:mb-16">
                        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Your Cart</h2>
                    </div>
                    {/* card star */}
                    {userCardData?.data?.map((cardItem) => (
                        <div key={cardItem._id}>
                        <div  className="flex flex-col gap-4 md:gap-6 mb-6 sm:mb-8">
                            <div className="flex flex-wrap border rounded-lg overflow-hidden gap-x-4 sm:gap-y-4 lg:gap-6">
                                <a href="#" className="group w-32 sm:w-40 h-48 sm:h-56 block bg-gray-100 overflow-hidden relative">
                                    <img src={imageUrl + cardItem?.meal?.image} loading="lazy" alt="Photo by Thái An" className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200" />
                                </a>

                                <div className="flex flex-col justify-between flex-1 py-4">
                                    <div>
                                        <div href="#" className="inline-block text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100 mb-1">{cardItem?.meal?.name}</div>

                                        <span className="block text-gray-500">Size : {cardItem?.meal?.size}</span>
                                        <span className="block text-gray-500">Sauce : {cardItem?.meal?.sause}</span>
                                    </div>

                                    <div>

                                        
                                    </div>
                                </div>

                                <div className="w-full sm:w-auto flex justify-between border-t sm:border-none p-4 sm:pl-0 lg:p-6 lg:pl-0">
                                    <div className="flex flex-col items-start gap-2">
                                        

                                        <button className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold select-none transition duration-100" onClick={() => {
													const id = cardItem._id
													mutation.mutate({ id });
												}}>Delete</button>
                                    </div>

                                    <div className="pt-3 md:pt-2 ml-4 md:ml-8 lg:ml-16">
                                        <span className="block text-gray-800 md:text-lg font-bold">{cardItem?.meal?.price} DH</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </div>
                    ))

                    }

                    {/* card end */}

                    <div className="flex flex-col items-end gap-4">
                        <div className="w-full sm:max-w-xs bg-gray-100 rounded-lg p-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-gray-500 gap-4">
                                    <span>Subtotal</span>
                                    <span>{totalPrice} DH</span>
                                </div>

                                <div className="flex justify-between text-gray-500 gap-4">
                                    <span>Shipping</span>
                                    <span>0 DH</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-start text-gray-800 gap-4">
                                    <span className="text-lg font-bold">Total</span>

                                    <span className="flex flex-col items-end">
                                        <span className="text-lg font-bold">{totalPrice} DH</span>
                                        <span className="text-gray-500 text-sm">including VAT</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button 
                        onClick={()=>{
                            handleCheckOut(userCardData.data)
                        }
                        } className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Check out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default card