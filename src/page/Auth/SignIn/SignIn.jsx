import signinImage from "../../../assets/auth/signIn.png";
import { Link, useNavigate } from "react-router-dom";
import { Form,Checkbox } from "antd";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import CustomButton from "../../../utils/CustomButton";
import CustomInput from "../../../utils/CustomInput";

const SignIn = () => {
  const navigate = useNavigate();
  const submit = (values) => {
    console.log(values);
    navigate('/')
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8 bg-white ">
      <div className="flex justify-center">
        <img
          src={signinImage}
          className="w-full h-full mx-auto"
          alt="Sign in illustration"
        />
      </div>
      <div className="mt-16 px-8">
        <div className="mb-8">
          <h1 className="font-semibold text-3xl text-gray-800">
            Hello, Welcome!
          </h1>
          <p className="text-gray-500">
            Please Enter Your Details Below to Continue
          </p>
        </div>
        <Form
          layout="vertical"
          onFinish={submit}
          className="space-y-4"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not a valid email!",
              },
            ]}
          >
            <CustomInput type="email" icon={HiOutlineMail} placeholder={"Enter Email"} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <CustomInput
              type="password"
              icon={HiOutlineLockClosed}
              placeholder={"Enter password"}
              isPassword
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/auth/forget-password" className="underline">
              Forgot password?
            </Link>
          </div>

          <Form.Item>
            <CustomButton className="w-full" border={true}>
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;