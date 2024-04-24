import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddExtract } from "./useCreateExtract";
import { useEditExtract } from "./useEditExtract";
import { useCompleteProducts } from "../Product/useGetCompleteProducts";

function HoneyForm({ close, formData: extract = {}, keepId }) {
  const { id: editId, ...editValue } = extract;
  const isEidtSession = Boolean(editId);
  const { register, formState, handleSubmit, control } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });

 
  const { products } = useCompleteProducts();
  const product = products?.filter(
    (el) => el.type === "شهت" || el.type === "ګورده" || el.type === "عسل"
  );
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { addExtractHoney, isAdding } = useAddExtract();
  const { EditExtract, isEditting } = useEditExtract();
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      data.keepId = keepId;
      EditExtract(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });
            close?.();
            toast.success("عسل بطوری موفقانه تعغیر شده");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
            close?.();
          },
        }
      );
      close();
    } else {
      data.keepId = keepId;
      addExtractHoney(
        { honey: data },
        {
          onSuccess: () => {
            toast.success("عسل بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
        }
      );
    }
  }

  return (
    <Card className="w-full items-center darkModeMiddle p-4 shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="h-full md:w-[60%]"
      >
        <div className="items-center md:flex ">
          <Input
            color="light-blue"
            type="number"
            min={0}
            dir="rtl"
            label="مقدار را داخل کنید"
            className="dark:text-white"
            {...register("amount", {
              required: "The amount is required",
            })}
            containerProps={{ arrow: "hidden" }}
            error={errors?.amount ? true : false}
          />
        </div>
        <div className="py-2">
          {product && !editId ? (
            <Controller
              name="productId"
              control={control}
              dir="rtl"
              // {...register("productId", { required: "option" })}
              render={({ field, value }) => (
                <Select
                  {...field}
                  className="darkModeMiddle"
                  label="نام عسل"
                  error={!errors?.productId ? false : true}
                  key={field}
                  value={toString(value)}
                  labelProps={{ className: "before:w-full " }}
                  placeholder="نام عسل"
                  style={{ textAlign: "right" }}
                >
                  {product?.map((el) => (
                    <Option
                      value={`${el?.id}`}
                      key={el.id}
                      className="capitalize "
                    >
                      {el?.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          ) : null}
        </div>
        <div className="py-2">
          {product && !editId ? (
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="darkModeMiddle "
                  label="نوع را انتخات کنید"
                  error={!errors?.type ? false : true}
                  labelProps={{ className: "before:w-full" }}
                  dir="rtl"
                >
                  <Option value={"عسل"} dir="rtl">
                    عسل
                  </Option>
                  <Option value={"ګورده"}>کورده</Option>
                </Select>
              )}
            />
          ) : null}
        </div>

        <div className="flex items-center md:justify-start justify-end lg:justify-end">
          <div className="px-2">
            <Button
              type="reset"
              variant="outlined"
              onClick={() => close()}
              color="blue-gray"
              className="font-semibold"
            >
              لغو کردن
            </Button>
          </div>
          <Button
            type="submit"
            variant="filled"
            color="blue"
            className="font-semibold"
          >
            {isAdding || isEditting ? <Spinner /> : "ثبت کردن"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default HoneyForm;
