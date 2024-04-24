import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddKeep } from "./useCreateKeeps";
import { useEditKeep } from "./useEditKeeps";

function KeepForm({ close, formData: keeps = {} }) {
  const { id: editId, ...editValue } = keeps;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { addNewKeep, isAdding } = useAddKeep();
  const { EditKeep, isEditting } = useEditKeep();
  const queryClient = useQueryClient();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      console.log(data);
      EditKeep(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("این معلومات بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
            close?.();
          },
        }
      );
    } else {
      addNewKeep(
        { keeps: data },
        {
          onSuccess: () => {
            toast.success("این معلومات بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
        }
      );
      close();
    }
  }
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
            label="نام کارمند"
            {...register("gardianName", {
              required: "The Seller name is required",
            })}
            error={errors?.gardianName ? true : false}
          />
        </div>

        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            label="ادرس"
            className="dark:text-white"
            {...register("location", {
              required: "The location name is required",
            })}
            error={errors?.location ? true : false}
          />
        </div>

        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            className="dark:text-white"
            type="number"
            min={0}
            label="تعداد صندوق"
            {...register("boxes", {
              required: "The material name is required",
            })}
            error={errors?.boxes ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="number"
            label="مقدار کرایه"
            min={0}
            className="dark:text-white"
            {...register("rent", {
              required: "The rent is required",
              valueAsNumber: "Only number",
            })}
            error={errors?.rent ? true : false}
          />
        </div>

        <div className="hidden">
          <Input
            dir="rtl"
            color="light-blue"
            type={"date"}
            className="dark:text-white"
            {...register("date")}
            defaultValue={format(Date.now(), "yyyy-MM-dd")}
          />
        </div>
        <div className="flex items-center justify-end">
          <div className="px-3">
            <Button
              type="reset"
              variant="outlined"
              color="light-blue"
              onClick={() => {
                close();
              }}
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
export default KeepForm;
