import React from "react";
import banner from "../../Images/Banner/banner.png";
const Banner = () => {
  return (
    <div className="mx-auto bg-base-200">
      
    <div className="px-2 py-3 container mx-auto flex justify-center items-center pt-5 flex-col-reverse lg:flex-row">
      <div className=" flex-1 flex justify-center">
        <div className="text-center">
          <h1 className=" font-bold text-6xl text-primary">BICYCLE LIFE</h1>
          <h1 className="font-bold text-2xl text-secondary lg:text-3xl">
            WE PROVIDE BEST PARTS
          </h1>
          <p className=" pt-5 text-justify lg:text-center text-md font-bold">
            Bicycle Life is one of the renowned brand for selling qualitifull
            bicycle parts! We manufacturer all kind of bicycle parts. Which is maintained by expert peoples!
          </p>
          <div className="flex justify-center my-5">
            <button className="hover:bg-teal-600 bg-gray-600 text-white font-bold py-3 px-10 rounded-full shadow-sm transition ease-in-out duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img className="w-2/3 ms-auto" src={banner} alt="" />
      </div>
    </div>
    </div>
  );
};

export default Banner;
