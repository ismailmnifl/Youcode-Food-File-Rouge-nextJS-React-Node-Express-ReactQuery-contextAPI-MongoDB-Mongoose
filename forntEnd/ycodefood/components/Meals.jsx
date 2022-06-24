
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

function Meals(resauId) {

	const queryClient = useQueryClient();

  const { user, dispatch } = useContext(Context);
  const userIndex = user?.user?._id;
  const userName = user?.user?.fullName;

  const restaurantId = resauId.resauId;
  const restauId = resauId.resauId;

  const restaurantData = useQuery("restaurantData", () =>
    axios.post(
      "http://localhost:8000/meal/restaurant", {
      restaurantId: restaurantId
    }
    ).then((res) => res.data)
  );

  const categoryData = useQuery("categoryData", () =>
    axios.get(
      "http://localhost:8000/category/"
    ).then((res) => res.data)
  );

  //images url prefix
  const imageUrl = "http://localhost:8000/uploads/";

  const [restauData, setRestauData] = useState([]);
  useEffect(() => {
    const getRestauData = async () => {
      const restaurant = await axios.get(`http://localhost:8000/restaurant/single/${restauId}`);
      setRestauData(restaurant.data);
    }
    getRestauData();
  }, []);


  const insertCard = async (index,name,price) => {

    
    const card = await axios.post("http://localhost:8000/card/", {
      "mealId": index,
      "userId": userIndex,
      "restauId": restaurantId,
      "mealName":name,
      "mealPrice":price,
      "userName":userName
    });
    console.log(card.data);
    queryClient.invalidateQueries('userCardData')
    toast.success('your meals has been added to the card !', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  if (restaurantData.isLoading) return <p>Loading...</p>
  if (restaurantData.error) return <p>Error : {restaurantData.error}</p>


  const mapsHeight = "100%";
  const mapsWidth = "50%"
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">

        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
              <div className="bg-gray-100 flex rounded-lg px-2 py-2 md:py-1 lg:py-1 h-[300px]">
                <iframe className="border-4	rounded-md border-slate-500" width={mapsWidth} height={mapsHeight} id="gmap_canvas" src={`https://maps.google.com/maps?q=${restauData.mapsId}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                </iframe>
                <div className="w-[50%] h-[100%] flex items-center flex-col justify-center">
                  <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
                    <img src={imageUrl + restauData.logo} loading="lazy" alt="Photo by Radu Florin" className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex items-start flex-col text-base">
                    <h1><span className="text-sky-700 font-medium">Name : </span>{restauData.name}</h1>
                    <h1><span className="text-sky-700 font-medium">Phone : </span>{restauData.phoneNumber}</h1>
                    <h1><span className="text-sky-700 font-medium">Adresse : </span>{restauData.adresse}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {restaurantData?.data?.map((meal) => (
              <div key={meal._id} className="flex flex-col items-center bg-gray-100 rounded-lg p-4 lg:p-8">
                <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-200 rounded-full overflow-hidden shadow-lg mb-2 md:mb-4">
                  <img src={imageUrl + meal.image} loading="lazy" alt="Photo by Radu Florin" className="w-full h-full object-cover object-center" />
                </div>

                <div>
                  <div className="text-indigo-500 md:text-lg font-bold text-center">{meal.name}</div>
                  <p className="text-gray-500 text-sm md:text-base text-center mb-3 md:mb-4">{meal.price} DH</p>
                  <button onClick={()=> {
                    insertCard(meal._id,meal.name,meal.price)
                  }} className="flex items-center justify-center text-white bg-sky-700 p-3 rounded-md w-[100px]">Order This</button>
                  <div className="flex justify-center">

                  </div>
                </div>
              </div>
            ))}



          </div>
        </div>
      </div>
    </div>
  )
}

export default Meals