import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white bg-clip-text text-transparent">
        Steps to remove background <br /> image in seconds
      </h1>

      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
        <div className="flex items-start gap-4 bg-slate-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.upload_icon} alt="" />
          <div>
            <p className="text-xl font-medium text-white">Upload image</p>
            <p className="text-sm text-neutral-400">
              Select an image from your device <br /> to get started.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-slate-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.remove_bg_icon} alt="" />
          <div>
            <p className="text-xl font-medium text-white">Remove background</p>
            <p className="text-sm text-neutral-400">
              Instantly remove the background with <br /> AI precision.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-slate-700 border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.download_icon} alt="" />
          <div>
            <p className="text-xl font-medium text-white">Download image</p>
            <p className="text-sm text-neutral-400">
              Save your background-free image in <br /> just one click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
