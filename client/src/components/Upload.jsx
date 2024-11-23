import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white bg-clip-text text-transparent md:py-16">
        See the magic, Try now
      </h1>

      <div className="text-center mb-24">
        <input
          onChange={(e) => removeBg(e.target.files[0])}
          accept="image/*"
          type="file"
          id="upload2"
          hidden
        />
        <label
          htmlFor="upload2"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-700 to-fuchsia-600 m-auto hover:scale-105 transition-all duration-700"
        >
          <img src={assets.upload_btn_icon} alt="" width={20} />
          <p className="text-white text-sm">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
