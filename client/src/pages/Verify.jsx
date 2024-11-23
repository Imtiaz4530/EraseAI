import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "@clerk/clerk-react";

const Verify = () => {
  const [token, setToken] = useState(null);
  const { backendUrl, loadCreditData } = useContext(AppContext);

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");

  const verifyPayment = async () => {
    try {
      const token1 = await getToken();

      setToken(token1);

      if (!token) {
        return null;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/verifystripe`,
        { success, transactionId },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditData();
        navigate("/");
      } else {
        navigate("/buy");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
};

export default Verify;
