import { testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div>
      {/* TITLE */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8 ">
        {testimonialsData.map((item) => (
          <div key={item.id}>
            <p>&quot;</p>
            <p>{item.text}</p>
            <div>
              <img src={item.image} alt="" />
              <div>
                <p>{item.author}</p>
                <p>{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
