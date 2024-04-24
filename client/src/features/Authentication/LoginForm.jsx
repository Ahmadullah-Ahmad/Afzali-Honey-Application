import {
  Button,
  Card,
  Input,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  HiBuildingOffice2,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const { Login, isLogin } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    Login({ username: email, password });
  }
  return (
    <Card className="h-full w-full flex items-center rounded-none justify-center  shadow-none bg-transparent">
      <Card className=" sm:w-[430px] w-[100vw] py-6 px-10 darkModeMiddle  rounded-md shadow-none bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="py-3">
            <HiBuildingOffice2 size={50} />
          </div>
          <Typography
            variant="h4"
            className="text-center py-3 font-bold capitalize"
          >
            معلوما ت را دخل کنید
          </Typography>
        </div>
        <form className="flex flex-col  gap-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            id="email"
            dir="rtl"
            color="blue"
            label="نام کار برد"
            className="dark:text-white "
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between">
            <Input
              type={hidePassword ? "password" : "text"}
              id="password"
              color="blue"
              dir="rtl"
              label="پسورد را داخل کنید"
              onChange={(e) => setPassword(e.target.value)}
              className="dark:text-white"
              icon={
                password ? (
                  hidePassword ? (
                    <HiOutlineEyeSlash
                      className="cursor-pointer dark:text-white"
                      size={20}
                      onClick={() => setHidePassword((el) => !el)}
                    />
                  ) : (
                    <HiOutlineEye
                      className="cursor-pointer dark:text-white"
                      size={20}
                      onClick={() => setHidePassword((el) => !el)}
                    />
                  )
                ) : null
              }
            />
          </div>
          <div className=" flex justify-end pt-4 text-sm">
            <Button
              variant="filled"
              color="blue"
              type="submit"
              disabled={isLogin}
              className="px-5 darkModeSubimt"
            >
              {isLogin ? (
                <Spinner className="w-[35px] h-4 font-medium" color="gray" />
              ) : (
                "داخل شدن"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </Card>
  );
}

export default LoginForm;
