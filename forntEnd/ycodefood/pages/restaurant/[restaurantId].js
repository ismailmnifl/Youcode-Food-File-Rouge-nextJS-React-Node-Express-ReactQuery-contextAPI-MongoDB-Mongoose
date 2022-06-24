import React from 'react'
import Meals from '../../components/Meals'
import Reviews from '../../components/Reviews'
import { useRouter } from 'next/router'



function restaurant() {

  const router = useRouter()
  const { restaurantId } = router.query

  return (
    <>
      <div className="flex items-center justify-center bg-sky-700 h-52 w-[100%]">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-white">Restaurant</h1>
      </div>
      <Meals resauId ={restaurantId}/>
      <Reviews resauId ={restaurantId}/>
    </>
  )
}

export default restaurant