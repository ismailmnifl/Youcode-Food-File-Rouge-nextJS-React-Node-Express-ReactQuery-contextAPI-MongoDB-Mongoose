import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from "react";
import {
	useQuery,
	useMutation,
	QueryClient,
	useQueryClient,
} from "react-query";

import axios from "axios";
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];


export default function PieGraph() {
  const stats = useQuery("statsDataCard", () =>
  axios.get(
    "http://localhost:8000/card/", {
    
  }
  ).then((res) => res.data)
);

console.log(stats?.data);

  return (
    <div className='h-96 w-[46.5%] bg-white flex items-center justify-center rounded-xl'>
      <PieChart width={500} height={250}>
        <Pie data={stats?.data} dataKey="mealPrice" nameKey="userName" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
      </PieChart>
    </div>
  );

}
