import {
  Button,
  Card,
  Input,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useAddProduct } from "./useCreateProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useEditProduct } from "./useEditProduct";

function CategoryForm({ close, formData: product = {} }) {
  const { id: editId, ...editValue } = product;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { addNewProduct, isAdding } = useAddProduct();
  const { EditProduct, isEditting } = useEditProduct();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      let image;
      if (editValue.photo !== data.photo) {
        image = data?.photo[0];
      } else {
        image = editValue.photo;
      }
      data.photo = image;
      data.id = editId;
      EditProduct(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("این جنس بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        }
      );
    } else {
      if (data.photo) {
        data.photo = data?.photo[0];
      }

      addNewProduct(
        { product: data },
        {
          onSuccess: () => {
            toast.success("این جنس بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err);
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
            type="text"
            className="dark:text-white"
            label="نام جنس"
            {...register("name", {
              required: "The Honey name is required",
            })}
            error={errors?.name ? true : false}
            color="light-blue"
            dir="rtl"
          />
        </div>

        <div className="py-2">
          <Input
            type="text"
            label="نوع جنس"
            className="dark:text-white"
            {...register("type", {
              required: "The product name is required",
            })}
            error={errors?.type ? true : false}
            color="light-blue"
            dir="rtl"
          />
        </div>

        <div className="py-2">
          <Input
            color="light-blue"
            type="number"
            className="dark:text-white"
            label="قیمت جنس"
            dir="rtl"
            min={0}
            {...register("salePrice", {
              required: "The product name is required",
            })}
            error={errors?.salePrice ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            color="light-blue"
            type="number"
            className="dark:text-white"
            label="فایده جنس به فصدی"
            max={100}
            min={0}
            dir="rtl"
            {...register("advantage", {
              required: "The product name is required",
            })}
            error={errors?.advantage ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            color="light-blue"
            type="number"
            className="dark:text-white"
            label="مقدار جنس"
            dir="rtl"
            min={0}
            {...register("quantity", {
              required: "The product name is required",
            })}
            error={errors?.quantity ? true : false}
          />
        </div>
        {isEidtSession ? (
          <>
            <div className="py-2">
              <Input
                color="light-blue"
                type="number"
                dir="rtl"
                min={0}
                label="قیمت خریداری"
                className="dark:text-white"
                {...register("buyPrice", {
                  required: "The product name is required",
                })}
                error={errors?.buyPrice ? true : false}
              />
            </div>
          </>
        ) : null}

        <Textarea
          color="light-blue"
          className="dark:text-white text-right"
          label="توضیحات جنس"
          dir="rtl"
          {...register("description", {
            required: "The product name is required",
          })}
          labelProps={{
            className: `before:w-full  right-0 font-semibold truncate `,
          }}
          error={errors?.description ? true : false}
        />
        <div className="py-2">
          <input
            type="file"
            accept="image/*"
            id="image"
            className="file:px-3 file:py-2 file:font-sans file:bg-gray-400 file:border-none file:rounded-md"
            {...register("photo")}
            dir="rtl"
          />
          {errors?.photo ? true : false}
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
            className="darkModeSubimt font-semibold"
          >
            {isAdding || isEditting ? <Spinner /> : "ثبت کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default CategoryForm;
