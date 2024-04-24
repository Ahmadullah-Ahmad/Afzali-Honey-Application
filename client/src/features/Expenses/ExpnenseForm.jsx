import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddSpend } from "./useCreateExpenses";
import { useEditExpends } from "./useEditExpense";

function ExpnenseForm({ close, formData: spends = {} }) {
  const { id: editId, ...editValue } = spends;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { addNewSpend, isAdding } = useAddSpend();
  const { EditSpends, isEditting } = useEditExpends();
  const queryClient = useQueryClient();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      EditSpends(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("این معلومات بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);

            close?.();
          },
        }
      );
    } else {
      addNewSpend(
        { spend: data },
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
            label="نام گيرینده"
            {...register("taker", {
              required: "The withdrawal name is required",
            })}
            error={errors?.taker ? true : false}
          />
        </div>

        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="چرا پیسه می گیرد"
            {...register("reason", {
              required: true,
            })}
            error={errors?.reason ? true : false}
          />
        </div>

        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="number"
            min={0}
            className="dark:text-white"
            label="مقدار پیسه"
            {...register("amount", {
              required: true,
            })}
            error={errors?.amount ? true : false}
          />
        </div>
        <div className="flex items-center justify-end">
          <div className="px-3">
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                close();
              }}
              color="blue-gray"
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

export default ExpnenseForm;
