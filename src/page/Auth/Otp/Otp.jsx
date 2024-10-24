import otpImage from "../../../assets/auth/otp.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };
  const handleMatchOtp = async () => {
    console.log(otp);
    navigate("/auth/new-password");
  };


  return (
    <div className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white ">
      <div>
        <img src={otpImage} className="w-full h-full mx-auto" alt="" />
      </div>
      <div className="mt-16">
        <div className="mb-5 space-y-5">
          <h1 className="font-semibold text-xl flex items-center gap-2">
            <Link to="/auth/forget-password">
              <IoIosArrowBack />
            </Link>
            Verify OTP
          </h1>
          <h1>{`We'll send a verification code to your email. Check your inbox and enter the code here.`}</h1>
        </div>
        <OTPInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle="otp-container"
              inputStyle={{
                width: "100%",
                maxWidth: "6.5rem",
                height: "3rem",
                margin: "0 0.5rem",
                fontSize: "2rem",
                fontWeight: "bold",
                borderBottom: "1px solid #4E4E4E",
                textAlign: "center",
                outline: "none",
              }}
            />
        <div onClick={handleMatchOtp} className="mt-5">
          <CustomButton border className="w-full">
            Verify
          </CustomButton>
        </div>
        <div className="flex justify-between items-center my-4">
          <h1>Didn’t receive code?</h1>
          <Link className="text-[#4c7e95]">Resend</Link>
        </div>
      </div>
    </div>
  );
};

export default Otp;
