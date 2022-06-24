
import React, { useState, useEffect } from "react";
import {
	useQuery,
	useMutation,
	QueryClient,
	useQueryClient,
} from "react-query";

import axios from "axios";

import Layout from '../../components/Layout'

function users() {

	const queryClient = useQueryClient();
		//load all users data
	const { isLoading, error, data, isFetching } = useQuery("usersData", () =>
		axios.get(
			"http://localhost:8000/user/"
		).then((res) => res.data)
	);
	//images url prefix
	const imageUrl = "http://localhost:8000/uploads/";

	
	const mutation = useMutation(userId => {
		return axios.delete(`http://localhost:8000/user/${userId.id}`,)
	},{
		onSuccess: () => {
			queryClient.invalidateQueries('usersData')
		  },
	}
	)
	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error : {error}</p>
	return (
		<Layout>
			<div className="bg-white p-2 rounded-md w-full">
				<div className=" flex items-center justify-between pb-6">
					<div>
						<h2 className="text-gray-600 font-semibold">Products Oder</h2>
						<span className="text-xs">All products item</span>
					</div>
					<div className="flex items-center justify-between">

						<div className="lg:ml-40 ml-10 space-x-8">
							<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
						</div>
					</div>
				</div>
				
					<div className="overflow-y-scroll h-[500px]">
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
											Role
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Phone Number
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Email
										</th>
										<th
											className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((item) => (
										<tr key={item?._id}>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

												<div className="flex items-center">
													<div className="flex-shrink-0 w-10 h-10">
														<img className="w-full h-full object-cover rounded-full"
															src={imageUrl + item?.avatar}
															alt="" />
													</div>
													<div className="ml-3">
														<p className="text-gray-900 whitespace-no-wrap">
															{item?.fullName}
														</p>
													</div>
												</div>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{item?.role?.description || "no role"}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{item?.phoneNumber}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900 whitespace-no-wrap">
													{item?.email}
												</p>
											</td>
											<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<span onClick={() => {
													const id = item?._id
													mutation.mutate({ id });
												}}
													className="relative inline-block px-3 py-1 font-semibold text-red-900 cursor-pointer leading-tight">
													<span aria-hidden
														className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
													<span className="relative">Delete</span>
												</span>
											</td>
										</tr>
									))};
								</tbody>
							</table>
						</div>
					</div>
				
			</div>
		</Layout>
	)
}

export default users