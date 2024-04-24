import {
  Button,
  Card,
  Input,
  Option,
  Radio,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useAddUser } from "./useCreateUser";
import toast from "react-hot-toast";
import { useBranchAll } from "../Branch/useAllBranches";
import { useEditUser } from "./useEditUser";

function BranchForm({ close, formData: user = {} }) {
  //for password management
  const [hidePassword, setHidePassword] = useState(true);
  const [hideComfirmPassword, setHideComfirmPassword] = useState(true);
  const [ComfirmPassword, setComfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const { id: editId, ...editValue } = user;
  const isEidtSession = Boolean(editId);
  const { register, formState, handleSubmit, getValues, control } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { branches } = useBranchAll();
  const { addNewUser, isAdding } = useAddUser();
  const { EditUser, isEditting } = useEditUser();
  const queryClient = useQueryClient();

  function handleFormSubmit(data) {
    if (isEidtSession) {
      let updateUser = {
        id: editId,
        branchId: data.branchId,
        role: data.role,
      };
      EditUser(
        { data: updateUser },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("معلومات کارمند بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
            close?.();
          },
        },
      );
    } else {
      addNewUser(
        { user: data },
        {
          onSuccess: () => {
            toast.success("معلومات کارمند بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
            close?.();
          },
        },
      );
    }
  }
  // name, username, password,role,photo, branchId
  return (
    <Card className="darkModeMiddle w-full items-center p-4 shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex h-full flex-col gap-2 md:w-[60%]"
      >
        {editId && (
          <p className="darkModeMiddle text-center font-semibold uppercase text-gray-500">
            تبدیل کردن وظیفه یا نماینده ګی کارمند
          </p>
        )}
        {!editId ? (
          <>
            <div className="items-center md:flex ">
              <Input
                dir="rtl"
                color="light-blue"
                type="text"
                className="dark:text-white"
                label="نام"
                {...register("name", {
                  required: "The name name is required",
                })}
                error={errors?.name ? true : false}
              />
            </div>

            <Input
              dir="rtl"
              color="light-blue"
              type="text"
              className="dark:text-white"
              label="نام کاربرد"
              {...register("username", {
                required: "The branch name is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Provide valid email",
                },
              })}
              error={errors?.username ? true : false}
            />

            <Input
              dir="rtl"
              type={hidePassword ? "password" : "text"}
              id="password"
              color="light-blue"
              className="dark:text-white"
              label="پسورد را دخل کنید"
              {...register("password", {
                required: "The password name is required",
              })}
              onChange={(e) => setPassword(e.target.value)}
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
              error={errors?.password ? true : false}
            />

            <div className="flex">
              <Input
                dir="rtl"
                color="blue"
                type={hideComfirmPassword ? "password" : "text"}
                label="بسورد را دوباره داخل کنید"
                className="dark:text-white"
                {...register("confirmPassword", {
                  required: "The branch name is required",
                  validate: (value) =>
                    value === getValues().password ||
                    "Provide the same passoword",
                })}
                onChange={(e) => setComfirmPassword(e.target.value)}
                icon={
                  ComfirmPassword ? (
                    hideComfirmPassword ? (
                      <HiOutlineEyeSlash
                        className="cursor-pointer dark:text-white"
                        size={20}
                        onClick={() => setHideComfirmPassword((el) => !el)}
                      />
                    ) : (
                      <HiOutlineEye
                        className="cursor-pointer dark:text-white"
                        size={20}
                        onClick={() => setHideComfirmPassword((el) => !el)}
                      />
                    )
                  ) : null
                }
                error={
                  errors?.confirmPassword
                    ? errors?.confirmPassword?.message
                    : false
                }
              />
            </div>
          </>
        ) : null}

        {branches ? (
          <Controller
            name="branchId"
            control={control}
            rules={{ required: true }}
            render={({ field, value }) => {
              return (
                <Select
                  {...field}
                  label="نماینده گی را انتخاب کنید"
                  error={!errors?.branchId ? false : true}
                  key={field}
                  className="darkModeMiddle text-right capitalize"
                  value={toString(value)}
                  labelProps={{
                    className: "before:w-full ",
                  }}
                  dir="rtl"
                >
                  {branches?.map((el) => (
                    <Option
                      value={`${el?.id}`}
                      key={el.id}
                      className="capitalize"
                    >
                      {el?.name}
                    </Option>
                  ))}
                </Select>
              );
            }}
          />
        ) : null}

        <div className="darkModeMiddle items-center justify-between md:flex">
          <Radio
            {...register("role", {
              required: "وظیفه کارمند را انتخاب کنید",
            })}
            color="blue"
            label={
              <Typography className="text-lg dark:text-white">مدیر</Typography>
            }
            value={"manager"}
          />
          <Radio
            {...register("role", {
              required: "وظیفه کارمند را انتخاب کنید",
            })}
            color="blue"
            label={
              <Typography className="text-lg dark:text-white">
                کارمند
              </Typography>
            }
            value={"user"}
            className="darkModeMiddle"
          />
        </div>
        <Typography
          variant="small"
          color="red"
          className="pb-2 text-right text-xs uppercase"
        >
          {errors?.role ? errors?.role?.message : ""}
        </Typography>

        <div className="flex items-center justify-end md:justify-start lg:justify-end">
          <div className="px-2">
            <Button
              type="reset"
              variant="outlined"
              color="blue"
              onClick={() => close()}
              className="darkModeCancel font-semibold"
            >
              لغو کردن
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            color="blue"
            className="darkModeSubmit font-semibold"
          >
            {isAdding || isEditting ? <Spinner /> : "ثبت کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BranchForm;
