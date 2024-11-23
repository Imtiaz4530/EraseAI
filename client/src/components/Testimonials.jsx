import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div>
      {/* TITLE */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-white bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8 ">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="bg-slate-700 rounded-xl p-6 drop-shadow-md max-w-lg m-auto hover:scale-105 transition-all duration-700"
          >
            <p className="text-4xl text-gray-400">&quot;</p>
            <p className="text-sm text-gray-400">{item.text}</p>
            <div className="flex items-center gap-3 mt-5">
              <img src={item.image} alt="" className="w-9 rounded-full" />
              <div>
                <p className="text-white">{item.author}</p>
                <p className="text-sm text-gray-400">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
