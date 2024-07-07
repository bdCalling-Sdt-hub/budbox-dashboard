import otpImage from '../../../assets/auth/otp.png'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import OTPInput from 'react-otp-input'
import { useState } from 'react'

const Otp = () => {
    const [otp, setOtp] = useState('')
    const handleMatchOtp = async () => {
        console.log(otp)
    }
    return (
        <div className="w-full max-w-4xl mx-auto h-screen grid grid-cols-1 md:grid-cols-2 gap-5 place-content-center">
            <div>
                <img src={otpImage} className='size-96 mx-auto' alt="" />
            </div>
            <div className='mt-16'>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl flex items-center gap-2'>
                        <Link to="/auth/forget-password"><IoIosArrowBack /></Link>
                        Verify OTP</h1>
                    <span>{`We'll send a verification code to your email. Check your inbox and enter the code here.`}</span>
                </div>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={{
                        height: "50px",
                        background: "#edf2f4",
                        width: "60px",
                        border: "1px solid #4c7e95",
                        borderRadius: "10px",
                        marginRight: "10px",
                        outline: "none",
                        color: "black",
                    }}
                    renderSeparator={<span> </span>}
                    renderInput={(props) => <input {...props} />}
                />
                <div className='flex justify-between items-center my-8'>
                    <h1>Didn’t receive code?</h1>
                    <Link className='text-[#4c7e95]'>Resend</Link>
                </div>
                <button onClick={handleMatchOtp} type='submit' className='w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300 mt-5'>Verify</button>
            </div>
        </div>
    )
}

export default Otp

