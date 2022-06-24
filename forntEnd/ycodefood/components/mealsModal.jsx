import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";

import axios from "axios";

function mealsModal(restauId) {

  console.log(restauId.restauId);

  const queryClient = useQueryClient();


  const [showModal, setShowModal] = React.useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sauce, setSauce] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");


  const [Myfiles, setMyfiles] = useState("");

  //fetching all the categories
  const categoryData = useQuery("categoryData", () =>
    axios.get(
      "http://localhost:8000/category/"
    ).then((res) => res.data)
  );
  //inserting the meal and its image
  const handleSubmit = async (e) => {
    e.preventDefault();

    //uploading image logic

    const formData = new FormData();
    formData.append("file", Myfiles);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/upload/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(async (res) => {

        //uploading image logic

        console.log(res.data[0].filename);
        const image = res.data[0].filename;
        const user = await axios.post("http://localhost:8000/meal/", {
          "name": name,
          "price": price,
          "size": size,
          "sause": sauce,
          "restaurantId": restauId.restauId,
          "categoryId": category,
          "image": image
        });
        console.log(user.data);
        queryClient.invalidateQueries('restaurantMealsData')

      });

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button
        className="bg-indigo-600 px-4 py-2 text-white font-semibold tracking-wide cursor-pointer rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add new Restaurant
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-2 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto" onSubmit={handleSubmit}>

                    <div>
                      <label htmlFor="name" className="inline-block text-gray-800 text-sm sm:text-base mb-2">name*</label>
                      <input onChange={(e) => setName(e.target.value)} name="name" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>
                    <div>
                      <label htmlFor="file" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Image</label>
                      <input onChange={(e) => setMyfiles(e.target.files[0])} name="file" type="file" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div>
                      <label htmlFor="price" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Price*</label>
                      <input onChange={(e) => setPrice(e.target.value)} name="price" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div>
                      <label htmlFor="sause" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Sause*</label>
                      <input onChange={(e) => setSauce(e.target.value)} name="sause" type="text" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="Size" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Size*</label>
                      <input onChange={(e) => setSize(e.target.value)} name="Size" type="text" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="category" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Category*</label>
                      <select onChange={(e) => setCategory(e.target.value)} name="category" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">
                        <option value="Not Allowed" disabled defaultValue>--select meals category--</option>
                        {categoryData?.data.map((item) => (
                          <option key={item._id} value={item._id}>{item.title}</option>
                        ))}
                      </select>
                    </div>


                    <div className="sm:col-span-2 flex justify-between items-center">
                      <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Send</button>

                    </div>

                  </form>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                  <div className="sm:col-span-2 flex justify-between items-center">
                    <button onClick={() => setShowModal(false)} className="inline-block bg-red-500 hover:bg-red-600 active:bg-red-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Slose</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default mealsModal