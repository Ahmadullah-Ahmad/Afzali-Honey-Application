import {
  Card,
  Input,
  Checkbox,
  Button,
  Spinner,
  Option,
  Select,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddSells } from "./useCreateSale";
import { useEditSales } from "./useEditSale";
import { useSideBar } from "../../Context/SideBar";
import { useCustomers } from "../Customer/useGetCustomer";
import { useState } from "react";
import { useCompleteProducts } from "../Product/useGetCompleteProducts";

function HoneyForm({ close, formData: sales = {} }) {
  const { id: editId, ...editValue } = sales;
  const isEidtSession = Boolean(editId);
  const { register, formState, handleSubmit, control } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { Customers, isLoading } = useCustomers();
  const { products, isLoading: Loading } = useCompleteProducts();

  const [showResgiterCustomer, setShowResgisterCustomer] = useState(false);

  const queryClient = useQueryClient();

  const { addNewSell, isAdding } = useAddSells();
  const { EditSales, isEditting } = useEditSales();
  const { billDispatch } = useSideBar();

  // console.log(products, productLabel);

  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      const { bill, ...UpdatedData } = data;
      EditSales(
        { UpdatedData },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ active: true });

            bill === "true"
              ? billDispatch({ type: "ADD_ITEM", data: data })
              : billDispatch({ type: "UPDATE_ITEM", data: UpdatedData });
            close?.();
            toast.success("این جنس بطوری موفقانه تعغیر شد");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        },
      );
    } else {
      data.price = data.price - (data.price * data.discount) / 100;
      const { customer, ...submitData } = data;
      if (data.customer && showResgiterCustomer) {
        const [customerName, phone] = customer.split("/");
        submitData.customerName = customerName;
        submitData.phone = phone;
      }

      addNewSell(
        { sells: submitData },
        {
          onSuccess: (value) => {
            toast.success("این جنس بطوری موفقانه اضافه شد");
            queryClient.invalidateQueries({ active: true });
            data.orignalPrice = data.price + (data.price * data.discount) / 100;
            billDispatch({ type: "ADD_ITEM", data: data });
            close?.();
          },
        },
      );
      close();
    }
  }

  // discount, quantity, pay, customerName, phone, product;
  if (Loading) return <Spinner />;
  return (
    <Card className="darkModeMiddle w-full items-center p-4 shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex h-full flex-col gap-2 md:w-[60%]"
      >
        <Controller
          name="product"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                label="نام تولید را انتخاب کنید"
                error={!errors?.product ? false : true}
                key={field}
                className="darkModeMiddle text-right capitalize"
                labelProps={{
                  className: "before:w-full ",
                }}
              >
                {products?.map((el) => (
                  <Option value={el.name} key={el.id} className="capitalize">
                    {el?.name}
                  </Option>
                ))}
              </Select>
            );
          }}
        />
        {!isLoading && showResgiterCustomer && !editId && (
          <>
            <Controller
              name="customer"
              control={control}
              rules={{ required: true }}
              render={({ field, value }) => {
                return (
                  <Select
                    {...field}
                    label="مشتری را انتخاب کنید"
                    error={!errors?.customer ? false : true}
                    key={field}
                    className="darkModeMiddle text-right capitalize"
                    value={toString(value)}
                    labelProps={{
                      className: "before:w-full ",
                    }}
                  >
                    {Customers?.map((el) => (
                      <Option
                        value={`${el?.name}/${el?.phone}`}
                        key={el.id}
                        className="capitalize"
                      >
                        {el?.name} {el?.phone}
                      </Option>
                    ))}
                  </Select>
                );
              }}
            />
          </>
        )}
        <Input
          dir="rtl"
          color="light-blue"
          type="number"
          className="dark:text-white "
          label="قیمت جنس"
          min={0}
          {...register("price", {
            required: "The product name is required",
          })}
          error={errors?.price ? true : false}
        />
        <Input
          dir="rtl"
          color="light-blue"
          className="dark:text-white "
          type="number"
          defaultValue={0}
          min={0}
          max={100}
          label="تخفیف"
          {...register("discount", {
            required: "The product discount is required",
            valueAsNumber: "Only number",
          })}
          error={errors?.discount ? true : false}
        />

        {!showResgiterCustomer && (
          <>
            <Input
              dir="rtl"
              color="light-blue"
              type="text"
              label="نام مشتری"
              className="dark:text-white "
              {...register("customerName", {
                required: "The product name is required",
              })}
              error={errors?.customerName ? true : false}
            />
            <Input
              defaultValue={null}
              dir="rtl"
              color="light-blue"
              type="text"
              className="dark:text-white "
              label="شماره مشتری"
              {...register("phone")}
              error={errors?.phone ? true : false}
            />
          </>
        )}
        <Input
          dir="rtl"
          color="light-blue"
          type="number"
          min={0}
          className="dark:text-white "
          label="مقدار جنس"
          {...register("quantity", {
            required: "The product count is required",
            valueAsNumber: "Only number",
          })}
          error={errors?.quantity ? true : false}
        />

        <div className="relative flex justify-between gap-3  " dir="rtl">
          <div>
            <Checkbox
              label="تادیه"
              labelProps={{ className: "dark:text-gray-50" }}
              containerProps={{ className: " gap-3" }}
              className="dark:text-white"
              value={true}
              {...register("pay")}
              color="blue"
            />
            {editId ? (
              <Checkbox
                label="بیل"
                labelProps={{
                  className: " absolute right-[124px] dark:text-gray-50",
                }}
                className="dark:text-white  "
                containerProps={{ className: "" }}
                value={true}
                {...register("bill")}
                color="blue"
                dir="rtl"
              />
            ) : null}
          </div>
          {!editId && (
            <Checkbox
              label=" این مشتری سابقه دارد؟"
              labelProps={{ className: "dark:text-gray-50" }}
              containerProps={{ className: " gap-3" }}
              className="dark:text-white"
              onClick={() => setShowResgisterCustomer((el) => !el)}
              color="blue"
            />
          )}
        </div>
        <div className="flex items-center justify-end">
          <div className="px-3">
            <Button
              type="reset"
              variant="outlined"
              onClick={() => {
                close();
              }}
              color="blue"
              className="darkModeCancel font-semibold"
            >
              لغو کردن
            </Button>
          </div>
          <Button
            type="submit"
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

export default HoneyForm;
