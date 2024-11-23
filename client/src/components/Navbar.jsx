import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const navigate = useNavigate();

  const { credit, loadCreditData } = useContext(AppContext);

  useEffect(() => {
    if (isSignedIn) {
      loadCreditData();
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center justify-between mx-4 py-4 lg:mx-44">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-32 sm:w-44" />
      </Link>

      {isSignedIn ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-gray-900 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-500"
          >
            <img src={assets.credit_icon} alt="" className="w-5" />
            <p className="text-xs sm:text-sm font-medium text-gray-400">
              Credits : {credit}
            </p>
          </button>
          <p className="text-gray-400 max-sm:hidden">Hi, {user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn()}
          className="bg-gray-900 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full "
        >
          Get Started
          <img src={assets.arrow_icon} alt="" className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
