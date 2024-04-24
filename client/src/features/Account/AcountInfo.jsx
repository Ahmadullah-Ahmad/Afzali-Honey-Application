import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useUser } from "../Authentication/useUser";
import { useChangeInfo } from "./useUpdateInfo";

function AcountInfo({ close }) {
  const { user } = useUser();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: user,
  });
  const { errors } = formState;
  const { isUpdating, updateInfo } = useChangeInfo();
  function handleFormSubmit(value) {
    const data = {
      id: value.id,
      name: value.name,
      username: value.username,
    };

    if (value.photo !== user?.photo) data.photo = value.photo[0];
    updateInfo({ data });
    close();
  }

  return (
    <Card className="w-full rounded-sm  darkModeMiddle shadow-none py-4">
      <Typography variant="h6" className="py-3 self-center">
        تعغیر کردن معلومات اکونت
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="h-full  ">
        <div>
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            label="نام"
            id="name"
            className="dark:text-white"
            {...register("name")}
            error={errors?.name ? true : false}
          />
        </div>
        <div className=" py-3  ">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="نام اکونت"
            {...register("username")}
          />
        </div>

        <div className=" py-1">
          <input
            type="file"
            accept="image/*"
            id="image"
            className="file:px-3 file:py-2 file:font-sans file:bg-gray-400 file:border-none file:rounded-md"
            {...register("photo")}
          />
        </div>
        <div className="flex items-center md:justify-end  justify-end lg:justify-end">
          <div className="px-2 ">
            <Button
              type="reset"
              variant="filled"
              onClick={() => close()}
              className="bg-gray-400 dark:bg-gray-200 dark:text-black font-semibold"
            >
              لغو کردن
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            className="bg-blue-400 dark:bg-blue-600 font-semibold"
          >
            {isUpdating ? <Spinner /> : "تعغیر کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AcountInfo;
