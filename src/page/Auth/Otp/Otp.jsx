import otpImage from '../../../assets/auth/otp.png'
import CustomForm from '../../../component/Form/CustomForm'
import CustomInput from '../../../component/Form/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'

const Otp = () => {
    const navigate = useNavigate()
    const submit = (data) => {
        console.log(data)
        navigate('/')
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
                <CustomForm onSubmit={submit}>
                    <CustomInput
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                    <div className='flex justify-between items-center my-8'>
                        <h1>Didn’t receive code?</h1>
                        <Link to='forget-password' className='text-[#4c7e95]'>Resend</Link>
                    </div>
                    <button type='submit' className='w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300 mt-5'>Verify</button>
                </CustomForm>
            </div>
        </div>
    )
}

export default Otp

