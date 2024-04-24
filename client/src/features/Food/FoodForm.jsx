import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddFood } from "./useCreateFood";
import { useEditFood } from "./useEditFood";

function FoodForm({ close, formData: food = {}, keepId }) {
  const { id: editId, ...editValue } = food;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { createFood, isAdding } = useAddFood();
  const { EditFood, isEditting } = useEditFood();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      data.keepId = keepId;
      console.log(data);
      EditFood(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("غذا بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        }
      );
      close();
    } else {
      data.keepId = keepId;

      createFood(
        { food: data },
        {
          onSuccess: () => {
            toast.success("غذا بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
            close?.();
          },
        }
      );
    }
  }
  //   branch
  //   manager
  //   location
  return (
    <Card className="w-full items-center p-4 darkModeMiddle shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="h-full md:w-[60%]"
      >
        <div className="items-center md:flex ">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="نام غذا"
            {...register("name", {
              required: "The food name is required",
            })}
            error={errors?.name ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="number"
            className="dark:text-white "
            label="قیمت غذا"
            min={0}
            {...register("price", {
              required: "The price is required",
            })}
            error={errors?.price ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            className="dark:text-white "
            type="number"
            label="مقدار غذا"
            {...register("quantity", {
              required: "The quantity location is required",
            })}
            error={errors?.quantity ? true : false}
          />
        </div>
        <div className="flex items-center md:justify-start justify-end lg:justify-end">
          <div className="px-2">
            <Button
              type="reset"
              variant="outlined"
              onClick={() => close()}
              color="blue-gray"
              className="darkModeCancel font-semibold"
            >
              لغو کردن
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            className="darkModeSubmit font-semibold"
            color="blue"
          >
            {isAdding || isEditting ? <Spinner /> : "ثبت کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default FoodForm;
