export default function QuickFilter() {

    return (
        <div>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    <div className="bg-gray-100 rounded-lg px-4 py-6 md:py-8 lg:py-12">

                        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 uppercase">Quick filter</h2>

                        <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto ">if you don't have time to to browse all the restaurant menu, you can use our quick filter here</p>
                        <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 pt-3 mx-auto">
                            <div>
                                <label htmlFor="first-name" className="inline-block text-sky-700 text-sm sm:text-base mb-2">Restaurant</label>
                                <select name="" id="" className="w-full bg-gray-10 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" >
                                    <option value="">Select</option>
                                    <option value="">Option 1</option>
                                    <option value="">Option 2</option>
                                    <option value="">Option 3</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="last-name" className="inline-block text-sky-700 text-sm sm:text-base mb-2">Category</label>
                                <select name="" id="" className="w-full bg-gray-10 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2" >
                                    <option value="">Select</option>
                                    <option value="">Option 1</option>
                                    <option value="">Option 2</option>
                                    <option value="">Option 3</option>
                                </select>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}