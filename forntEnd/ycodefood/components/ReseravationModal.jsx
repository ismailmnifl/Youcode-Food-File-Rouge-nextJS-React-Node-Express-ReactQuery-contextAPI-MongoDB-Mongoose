import axios from "axios";
import React, { useState } from "react";

import {
	useQuery,
	useMutation,
	QueryClient,
	useQueryClient,
} from "react-query";
import { toast } from 'react-toastify';

export default function Modal() {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adresse, setAdresse] = useState("");
  const [mapsId, setMapsId] = useState("");
  const [Myfiles, setMyfiles] = useState("");
  const [allowed, setAllowed] = useState("");

  //this is for the displaying the modal
  const [showModal, setShowModal] = React.useState(false);

	const queryClient = useQueryClient();


  //uploading image logic
  const handleSubmit = async (e) => {
    e.preventDefault();
      if(name == "" || email=="" || phoneNumber=="" 
      || adresse=="" || mapsId=="" || Myfiles=="" || allowed=="") {
        toast.error('all fields are required', {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else {
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
        const logo = res.data[0].filename;
        const user = await axios.post("http://localhost:8000/restaurant/", {
          "name": name,
          "adresse": adresse,
          "email": email,
          "phoneNumber": phoneNumber,
          "allowed": allowed,
          "mapsId": mapsId,
          "logo": logo

        });
        console.log(user.data);
        queryClient.invalidateQueries('restaurantData');
        toast.success('the restaurant data was added succesfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      });

    } catch (error) {
      console.log(error)
    }
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
                      <label htmlFor="file" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Logo</label>
                      <input onChange={(e) => setMyfiles(e.target.files[0])} name="file" type="file" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div>
                      <label htmlFor="email" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Email*</label>
                      <input onChange={(e) => setEmail(e.target.value)} name="email" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div>
                      <label htmlFor="adresse" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Adresse*</label>
                      <input onChange={(e) => setAdresse(e.target.value)} name="adresse" type="text" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phoneNumber" className="inline-block text-gray-800 text-sm sm:text-base mb-2">phone Number*</label>
                      <input onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" type="text" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="mapsId" className="inline-block text-gray-800 text-sm sm:text-base mb-2">google maps index*</label>
                      <input onChange={(e) => setMapsId(e.target.value)} name="mapsId" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="Adresse" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Allowed*</label>
                      <select onChange={(e) => setAllowed(e.target.value)} name="allowed" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">
                        <option value="Not Allowed" disabled selected>--select the user role--</option>
                        <option value={true}>Allowed</option>
                        <option value={false} >Not Allowed</option>
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
  );
}