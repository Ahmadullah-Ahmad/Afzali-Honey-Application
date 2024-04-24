import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEditCustomer } from "./useEditCustomer";

function KeepForm({ close, formData: keeps = {} }) {
  const { id: editId, ...editValue } = keeps;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { EditCustomer, isEditting } = useEditCustomer();
  const queryClient = useQueryClient();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;

      EditCustomer(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            toast.success("این معلومات بطوری موفقانه تعغیر شد");
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
  return (
    <Card className="w-full items-center p-4  shadow-none darkModeMiddle sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="h-full md:w-[60%]"
      >
        <div className="items-center md:flex ">
          <Input
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="نام مشتری"
            dir="rtl"
            {...register("name", {
              required: true,
            })}
            error={errors?.name ? true : false}
          />
        </div>

        <div className="py-2">
          <Input
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="شماره تلیفون"
            dir="rtl"
            {...register("phone", {
              required: "The phone name is required",
            })}
            error={errors?.phone ? true : false}
          />
        </div>

        <div className="flex items-center justify-end">
          <div className="px-3">
            <Button
              type="reset"
              variant="outlined"
              color="light-blue"
              className="darkModeCancel font-semibold"
              onClick={() => {
                close();
              }}
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
            {isEditting ? <Spinner /> : "ثبت کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
export default KeepForm;
