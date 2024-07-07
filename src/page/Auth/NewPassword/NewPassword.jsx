import { zodResolver } from '@hookform/resolvers/zod'
import changePasswordImage from '../../../assets/auth/changePassword.png'
import CustomForm from '../../../component/Form/CustomForm'
import CustomInput from '../../../component/Form/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import {newPasswordSchema } from '../../../schema/authSchema'
const NewPassword = () => {
    const navigate = useNavigate()
    const submit = (data) => {
        console.log(data)
        navigate('/')
    }
    return (
        <div className="w-full max-w-4xl mx-auto h-screen grid grid-cols-1 md:grid-cols-2 gap-5 place-content-center">
            <div>
                <img src={changePasswordImage} className='size-96 mx-auto' alt="" />
            </div>
            <div className='mt-16'>
                <div className='mb-5'>
                    <h1 className='font-semibold text-xl flex items-center gap-2'>
                        <Link to="/auth/otp"><IoIosArrowBack /></Link>
                        Update Password</h1>
                </div>
                <CustomForm onSubmit={submit} resolver={zodResolver(newPasswordSchema)}>
                    <CustomInput
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <CustomInput
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button type='submit' className='w-full bg-[#edf2f4]  text-[#4c7e95] py-2 px-4 border border-[#4c7e95] hover:bg-[#4c7e95] hover:text-white transition-all duration-300 mt-5'>Update</button>
                </CustomForm>
            </div>
        </div>
    )
}

export default NewPassword
