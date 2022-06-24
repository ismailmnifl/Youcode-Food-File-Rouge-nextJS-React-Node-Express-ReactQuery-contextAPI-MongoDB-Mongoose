export default function Hero() {

    return (
        <div className="mt-6 bg-white pb-6 sm:pb-8 lg:pb-12">
                    <div className="spacer h-5"></div>

  <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">


    <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16">
 
      <div className="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12 xl:py-24">

        <h1 className="text-black-800 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12 uppercase">A humble platform so we can eat in peace</h1>

        <p className="lg:w-4/5 text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12">Tacos Pizza, salad whatever you want, you can order it here on <span className="text-sky-700 font-medium">Youcode Food</span> no need to look for Souhaib your ticket<span className="text-sky-700 font-medium"> await</span> you .</p>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5">
          <a href="#" className="inline-block bg-sky-700 hover:bg-sky-800 active:bg-sky-900 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Order now</a>

          <a href="#" className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Take tour</a>
        </div>
      </div>
    
      <div className="xl:w-5/12 h-48 lg:h-auto bg-gray-100 overflow-hidden shadow-lg rounded-lg">
        <img src="/foodotman.jpg" loading="lazy" alt="Photo by Fakurian Design" className="w-full h-full object-cover object-center" />
      </div>
      
    </section>
  </div>
</div>
    )
}