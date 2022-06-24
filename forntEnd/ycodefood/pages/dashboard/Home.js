import React, { useState, useEffect } from "react";
import {
    useQuery,
    useMutation,
    QueryClient,
    useQueryClient,
} from "react-query";

import axios from "axios";


function Home() {


    const statsData = useQuery("statsData", () =>
        axios.get(
            "http://localhost:8000/stats/"
        ).then((res) => res.data)
    );

    return (
        <div>
            <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
                    <div className="bg-green-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Total Revenue</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.income} DH<span className="text-green-400"><i className="fas fa-caret-down"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
                    <div className="bg-blue-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Total Users</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.userCount} <span className="text-blue-400"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
                    <div className="bg-orange-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right pr-1">
                                <h5 className="text-white">Total Reservations</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.reservationCount} <span className="text-orange-400"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
                    <div className="bg-purple-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Total Reviews</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.reviewCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
                    <div className="bg-red-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Rectaurant Count</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.reastauCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
                    <div className="bg-pink-600 border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pl-1 pr-4"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                            <div className="flex-1 text-right">
                                <h5 className="text-white">Category Count</h5>
                                <h3 className="text-white text-3xl">{statsData?.data?.categoryCount} <span className="text-pink-400"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home