import { zodResolver } from '@hookform/resolvers/zod'
import signinImage from '../../../assets/auth/signIn.png'
import CustomForm from '../../../component/Form/CustomForm'
import CustomInput from '../../../component/Form/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { signInSchema } from '../../../schema/authSchema'
const SignIn = () => {
    const navigate = useNavigate()
    const submit = (data) => {
        console.log(data)
        navigate('/')
    }
    return (
        <div className="w-full max-w-4xl mx-auto h-screen grid grid-cols-1 md:grid-cols-2  place-content-center">
            <div>
                <img src={signinImage} className='size-96 mx-auto' alt="" />
            </div>
            <div className='mt-16'>
                <div>
                    <h1 className='font-semibold text-xl'>Hello,Welcome!</h1>
                    <span>Please Enter Your Details Below to Continue</span>

                </div>
                <CustomForm onSubmit={submit} resolver={zodResolver(signInSchema)}>
                    <CustomInput
                        name="email"
                        type="text"
                        placeholder="Email"
                    />
                    <CustomInput
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <div className='flex justify-between items-center my-8'>
                        <div className='flex items-center gap-1'>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="checkbox">Remember me</label>
                        </div>
                        <Link to='forget-password' className='text-[#4c7e95]'>Forgot Password?</Link>
                    </div>
                    <button type='submit' className='w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300'>Sign In</button>
                </CustomForm>
            </div>
        </div>
    )
}

export default SignIn
