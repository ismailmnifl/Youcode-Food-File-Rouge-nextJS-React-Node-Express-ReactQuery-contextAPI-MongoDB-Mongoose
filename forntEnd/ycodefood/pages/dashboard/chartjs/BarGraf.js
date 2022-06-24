import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{ name: 'Page A', uv: 100, pv: 1000, amt: 4100 },{ name: 'Page D', uv: 156, pv: 800, amt: 1400 },{ name: 'Page B', uv: 170, pv: 2000, amt: 2400 },{ name: 'Page C', uv: 400, pv: 2700, amt: 1400 }];
import React, { useState, useEffect } from "react";
import {
	useQuery,
	useMutation,
	QueryClient,
	useQueryClient,
} from "react-query";

import axios from "axios";
export default function BarGraf() {
  const stats = useQuery("statsDataCard", () =>
  axios.get(
    "http://localhost:8000/card/", {
    
  }
  ).then((res) => res.data)
);

console.log(stats?.data);
  return (
    <div className="barchart h-96 w-[50%] bg-white flex items-center justify-center rounded-xl">
      <LineChart className='bg-white' width={560} height={300} data={stats?.data}>
        <Line type="monotone" dataKey="mealPrice" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="mealName" />
        <YAxis />
      </LineChart>

    </div>
  )
}
