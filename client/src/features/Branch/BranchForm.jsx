import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAddBranch } from "./useCreateBranch";
import toast from "react-hot-toast";
import { useEditBranch } from "./useEditBranch";

function BranchForm({ close, formData: branch = {} }) {
  const { id: editId, ...editValue } = branch;
  const isEidtSession = Boolean(editId);
  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { addNewBranch, isAdding } = useAddBranch();
  const { EditBranch, isEditting } = useEditBranch();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      EditBranch(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("این نمائنده گی بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        },
      );
      close();
    } else {
      addNewBranch(
        { branch: data },
        {
          onSuccess: () => {
            toast.success("این نمائنده گی بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
          onError: (error) => {
            toast.error(error.message);
            close?.();
          },
        },
      );
    }
  }
  //   branch
  //   manager
  //   location
  return (
    <Card className="darkModeMiddle w-full items-center p-4 shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="h-full md:w-[60%]"
      >
        <div className="items-center md:flex ">
          <Input
            color="light-blue"
            type="text"
            className="dark:text-white "
            dir="rtl"
            label="نام نمایندګی"
            {...register("name", {
              required: true,
            })}
            error={errors?.name ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            className="dark:text-white "
            dir="rtl"
            color="light-blue"
            translate="yes"
            type="text"
            label="ادرس نمایندګی"
            {...register("location", {
              required: true,
            })}
            error={errors?.location ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            className="dark:text-white "
            dir="rtl"
            color="light-blue"
            translate="yes"
            type="text"
            label="شماره نمایندګی"
            {...register("phone", {
              required: true,
            })}
            error={errors?.phone ? true : false}
          />
        </div>
        <div className="flex items-center justify-end md:justify-start lg:justify-end">
          <div className="px-2">
            <Button
              type="reset"
              variant="outlined"
              onClick={() => close()}
              color="blue-gray"
              className="darkModeCancel font-semibold"
            >
              لغو كردن
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            color="blue"
            className="darkModeSubmit font-semibold"
          >
            {isAdding || isEditting ? <Spinner /> : "  ثبت كردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BranchForm;
