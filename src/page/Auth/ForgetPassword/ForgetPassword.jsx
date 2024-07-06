import { zodResolver } from '@hookform/resolvers/zod'
import forgetPasswordImage from '../../../assets/auth/forget.png'
import CustomForm from '../../../component/Form/CustomForm'
import CustomInput from '../../../component/Form/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { forgetPasswordSchema } from '../../../schema/authSchema'
const ForgetPassword = () => {
    const navigate = useNavigate()
    const submit = (data) => {
        console.log(data)
        navigate('/')
    }
    return (
        <div className="w-full max-w-4xl mx-auto h-screen grid grid-cols-1 md:grid-cols-2 gap-5 place-content-center">
            <div>
                <img src={forgetPasswordImage} className='size-96 mx-auto' alt="" />
            </div>
            <div className='mt-16'>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl flex items-center gap-2'>
                        <Link to="/auth"><IoIosArrowBack /></Link>
                        Forgot Password</h1>
                    <span>{`Enter the email address associated with your account. We'll send you an OTP to your email.`}</span>
                </div>
                <CustomForm onSubmit={submit} resolver={zodResolver(forgetPasswordSchema)}>
                    <CustomInput
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                    <button type='submit' className='w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300 mt-5'>Send OTP</button>
                </CustomForm>
            </div>
        </div>
    )
}

export default ForgetPassword
