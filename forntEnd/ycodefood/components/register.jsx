
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from 'react-toastify';

export default function RegisterComponents() {


  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adresse, setAdresse] = useState("");
  const [age, setage] = useState("");
  const [Myfiles, setMyfiles] = useState("");
  const [role, setRole] = useState("");
  const [restaurant, setRestaurant] = useState("");

  const [openRestauSelect, setopenRestauSelect] = useState(false);


  const [responseError, setresponseError] = useState(false);

  //getting all the role from the db
  const { isLoading, error, data, isFetching } = useQuery("rolesData", () =>
    axios.get(
      "http://localhost:8000/role/"
    ).then((res) => res.data)
  );


  const allowedRestauData = useQuery("allowedRestauData", () =>
    axios.get(
      "http://localhost:8000/restaurant/allowed/"
    ).then((res) => res.data)
  );
  console.log("allowedRestauData : ", allowedRestauData.data);

  //logic for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setresponseError(false);

    //uploading image logic

    const formData = new FormData();
    formData.append("file", Myfiles);
    try {
      if (fullName == "" || email == "" || password=="" 
      || phoneNumber=="" || adresse =="" || age=="" || Myfiles=="" ) {
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
        const response = await axios({
          method: "post",
          url: "http://localhost:8000/upload/",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(async (res) => {
  
          //uploading image logic
  
          console.log(res.data[0].filename);
          const avatar = res.data[0].filename;
          const user = await axios.post("http://localhost:8000/user/", {
            "fullName": fullName,
            "age": age,
            "email": email,
            "avatar": avatar,
            "password": password,
            "phoneNumber": phoneNumber,
            "adresse": adresse,
            "roleId": role,
            "restauId": restaurant,
          });
          console.log(user.data);
          toast.success('the user was added succesfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        });
      }
      

    } catch (error) {
      console.log(error)
    }
  }

  const handeleRoleChoice = (value)=> {
    if (value == "62a64f623c198132787d053a") {
      setopenRestauSelect(true);
    }else {
      setopenRestauSelect(false);
      setRestaurant("62b3a11902708b6df2298c2b");
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error : {error}</p>
  return (
    <div className="bg-white">
      <div className="flex items-center justify-center mb-5 bg-sky-700 h-52 ">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-white">
          Register user
        </h1>
      </div>
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">

        <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="file" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Image</label>
            <input onChange={(e) => setMyfiles(e.target.files[0])} name="file" type="file" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>
          <div>
            <label htmlFor="fullName" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Full name*</label>
            <input onChange={(e) => setFullName(e.target.value)} name="fullName" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label htmlFor="email" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Email*</label>
            <input onChange={(e) => setEmail(e.target.value)} name="email" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div>
            <label htmlFor="Age" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Age*</label>
            <input onChange={(e) => setage(e.target.value)} name="Age" type="number" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="Password" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Password*</label>
            <input onChange={(e) => setPassword(e.target.value)} name="Password" type="password" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Phone Number*</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="Adresse" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Adresse*</label>
            <input name="Adresse" onChange={(e) => setAdresse(e.target.value)} className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="role" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Role*</label>
            <select onChange={(e) => { setRole(e.target.value); handeleRoleChoice(e.target.value) }} name="role" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">
              <option value="62a64f4e3c198132787d0536" defaultValue disabled>--select the user role--</option>
              {
                data.map((role) => (
                  <option key={role._id} value={role._id}>{role.description}</option>
                ))
              }
            </select>
          </div>
          {openRestauSelect && (
             <div className="sm:col-span-2">
             <label htmlFor="restaurant" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Restaurant*</label>
             <select onChange={(e) => setRestaurant(e.target.value)} name="restaurant" className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2">
               <option value="62b3a11902708b6df2298c2b" defaultValue disabled>--select the user restaurant--</option>
               {
                 allowedRestauData.data.map((restaurant) => (
                   <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>
                 ))
               }
             </select>
           </div>
          )}
         


          <div className="sm:col-span-2 flex justify-between items-center">
            <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Send</button>

            <span className="text-gray-500 text-sm">*Required</span>
          </div>

          <p className="text-gray-400 text-xs">By signing up to our newsletter you agree to our <a href="#" className="hover:text-indigo-500 active:text-indigo-600 underline transition duration-100">Privacy Policy</a>.</p>
        </form>
      </div>
    </div>
  )
}