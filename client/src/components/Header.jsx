import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Header = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
      {/* LEFT SIDE */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
          Remove the <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">
            background{" "}
          </span>
          from <br className="max-md:hidden" /> the images for free.
        </h1>
        <p className="my-6 text-[15px] text-gray-400">
          Effortlessly remove backgrounds from any image in seconds. Upload,
          process,
          <br className="max-sm:hidden" />
          and download high-quality results with just one click.
        </p>

        <div>
          <input
            onChange={(e) => removeBg(e.target.files[0])}
            accept="image/*"
            type="file"
            id="upload1"
            hidden
          />
          <label
            htmlFor="upload1"
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-700 to-fuchsia-600 m-auto hover:scale-105 transition-all duration-700"
          >
            <img src={assets.upload_btn_icon} alt="" width={20} />
            <p className="text-white text-sm">Upload your image</p>
          </label>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full max-w-md">
        <img src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
