import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { resultImage, image } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="mx-4 my-3 min-h-[75vh] mt-14 lg:mx-44">
      <div className="bg-slate-700 rounded-lg px-8 py-6 drop-shadow-sm">
        {/* Image Container */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-8 ">
          {/* LEFT SIDE */}
          <div>
            <p className="font-semibold text-gray-300 mb-2">Original</p>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt=""
              className="rounded-md border"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col ">
            <p className="font-semibold text-gray-300 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              <img src={resultImage ? resultImage : ""} alt="" />
              {!resultImage && image && (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        {resultImage && (
          <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-2.5 text-white text-sm border border-gray-900 rounded-full hover:scale-105 transition-all duration-700"
            >
              Try another image
            </button>
            <a
              href={resultImage}
              download
              className="px-8 py-2.5 text-white text-sm bg-gradient-to-r bg-gray-900 rounded-full hover:scale-105 transition-all duration-700"
            >
              Download image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
