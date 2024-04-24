import {
  Button,
  Card,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useChangePassword } from "./useUpdatePassword";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

function UpdatePassword() {
  //for password management
  const [hidePassword, setHidePassword] = useState(true);
  const [hideComfirmPassword, setHideComfirmPassword] = useState(true);
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [ComfirmPassword, setComfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");

  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const { isUpdating, updatePassword } = useChangePassword();
  function handleFormSubmit(data) {
    updatePassword({ data });
    reset();
  }
  return (
    <Card className="w-full rounded-sm  md:items-start  darkModeTop  shadow-none bg-gray-300">
      <Typography
        variant="h6"
        className="py-3 self-center font-semibold text-xl"
      >
        تعغیر پسورد
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-[60%] md:w-[50%] self-center "
      >
        <div className="flex py-1">
          <Input
            dir="rtl"
            type={hideCurrentPassword ? "password" : "text"}
            id="password"
            color="blue"
            className="dark:text-white"
            icon={
              currentPassword ? (
                hideCurrentPassword ? (
                  <HiOutlineEyeSlash
                    className="cursor-pointer dark:text-white"
                    size={20}
                    onClick={() => setHideCurrentPassword((el) => !el)}
                  />
                ) : (
                  <HiOutlineEye
                    className="cursor-pointer dark:text-white"
                    size={20}
                    onClick={() => setHideCurrentPassword((el) => !el)}
                  />
                )
              ) : null
            }
            label=" پسورد قبلی را داخل کنید"
            {...register("currentPassword", {
              required: "The password name is required",
            })}
            onChange={(e) => setcurrentPassword(e.target.value)}
            error={errors?.currentPassword ? true : false}
          />
        </div>
        <div className="flex  py-1">
          <Input
            dir="rtl"
            type={hidePassword ? "password" : "text"}
            id="currentPassword"
            color="blue"
            className="dark:text-white"
            label=" پسورد جدید را داخل کنید"
            {...register("password", {
              required: "The password name is required",
            })}
            onChange={(e) => setPassword(e.target.value)}
            error={errors?.password ? true : false}
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

        <div className=" py-2">
          <div className="flex">
            <Input
              dir="rtl"
              color="light-blue"
              type={hideComfirmPassword ? "password" : "text"}
              label=" پسورد جدید را دوباره داخل کنید"
              className="dark:text-white"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === getValues().password ||
                  "لطفا پسورد را يكسان‌ داخل کنید",
              })}
              onChange={(e) => setComfirmPassword(e.target.value)}
              error={errors?.confirmPassword ? true : false}
              icon={
                ComfirmPassword ? (
                  hideComfirmPassword ? (
                    <HiOutlineEyeSlash
                      className="dark:text-white cursor-pointer"
                      size={20}
                      onClick={() => setHideComfirmPassword((el) => !el)}
                    />
                  ) : (
                    <HiOutlineEye
                      className="dark:text-white cursor-pointer"
                      size={20}
                      onClick={() => setHideComfirmPassword((el) => !el)}
                    />
                  )
                ) : null
              }
            />
          </div>
          <p className="text-xs text-red-500 text-right">
            {errors?.confirmPassword ? errors?.confirmPassword?.message : false}
          </p>
        </div>
        <div className="flex items-center md:justify-end  justify-end lg:justify-end">
          <div className="px-2 ">
            <Button
              type="reset"
              variant="filled"
              onClick={() => {
                setComfirmPassword("");
                setPassword("");
                setcurrentPassword("");
              }}
              className="bg-gray-400 dark:bg-gray-200 buttonText dark:text-black font-semibold"
            >
              لغو كردن‌
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            color="blue"
            className="bg-blue-400 dark:bg-blue-600 buttonText font-semibold"
          >
            {isUpdating ? <Spinner /> : "تعغیر کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UpdatePassword;
