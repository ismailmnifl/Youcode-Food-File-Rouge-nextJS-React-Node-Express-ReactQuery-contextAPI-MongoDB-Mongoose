import Layout from '../../components/Layout'
import ReseravationModal from '../../components/ReseravationModal'
import React, { useState, useEffect } from "react";
import {
	useQuery,
	useMutation,
	QueryClient,
	useQueryClient,
} from "react-query";

import axios from "axios";

function reservations() {

	const queryClient = useQueryClient();

	
  //images url prefix
  const imageUrl = "http://localhost:8000/uploads/";


	const restaurantData = useQuery("restaurantData", () =>
		axios.get(
			"http://localhost:8000/restaurant/"
		).then((res) => res.data)
	);
	console.log(restaurantData.data);


	const mutation = useMutation(restauId => {
		return axios.delete(`http://localhost:8000/restaurant/${restauId.id}`,)
	},{
		onSuccess: () => {
			queryClient.invalidateQueries('restaurantData')
			
		  },
	}
	)

	if (restaurantData.isLoading) return <p>Loading...</p>
	if (restaurantData.error) return <p>Error : {error}</p>
	return (
		<Layout>

			<div className="bg-white p-2 rounded-md w-full">
				<div className=" flex items-center justify-between pb-6">
					<div>
						<h2 className="text-gray-600 font-semibold">Products Oder</h2>
						<span className="text-xs">All products item</span>
					</div>
					<div className="flex items-center justify-between">

						<ReseravationModal />
					</div>
				</div>
				<div>
					<div className="overflow-x-auto">
						<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Name
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Phone Number
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Athorized
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Adresse
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{restaurantData.data.map((item) => (
										<tr key={item._id}>
											<td className="px-5 py-5 bg-white text-sm">
												<div className="flex items-center">
													<div className="flex-shrink-0 w-10 h-10">
														<img className="w-full object-cover h-full rounded-full"
															src={imageUrl + item.logo} alt="" />
													</div>
													<div className="ml-3">
														<p className="text-gray-900 whitespace-no-wrap">
															{item.name}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">{item.phoneNumber}</p>
											</td>
											<td className="px-5 py-5 bg-white text-sm">
												<div className="text-gray-900 whitespace-no-wrap">
													{item.allowed ?
														<p className='w-16 bg-green-200 opacity-50 flex items-center justify-center px-3 py-1 font-semibold rounded-full text-green-900 leading-tight'>True</p>
														: <p className='w-16 bg-red-200 opacity-50 flex items-center justify-center px-3 py-1 font-semibold rounded-full text-red-900 leading-tight'>False</p>}
												</div>
											</td>
											<td className="px-5 py-5 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">{item.adresse}</p>
											</td>
											<td className="px-5 py-5 bg-white text-sm">
												<p className='w-16 bg-red-200 cursor-pointer flex items-center justify-center px-3 py-1 font-semibold rounded-full text-red-900 leading-tight' 
												onClick={() => {
													const id = item._id
													mutation.mutate({ id });
												}
													
												}
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

		</Layout>
	)
}

export default reservations