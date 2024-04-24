import {
  Button,
  Card,
  Input,
  Checkbox,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAddPurchase } from "./useCreatePurchase";
import { useEditPurchase } from "./useEditPurchase";
import { useState } from "react";
import { useCustomers } from "../Customer/useGetCustomer";

function PurchaseForm({ close, formData: purchase = {} }) {
  const { id: editId, ...editValue } = purchase;
  const isEidtSession = Boolean(editId);

  const { register, formState, handleSubmit, control } = useForm({
    defaultValues: isEidtSession ? editValue : {},
  });
  const { errors } = formState;

  const { addNewPurchase, isAdding } = useAddPurchase();
  const { EditPurchase, isEditting } = useEditPurchase();

  const { Customers, isLoading } = useCustomers();

  const [showResgiterCustomer, setShowResgisterCustomer] = useState(false);
  const queryClient = useQueryClient();

  const [hideDeadline, setHideDeadline] = useState(
    isEidtSession ? editValue.pay : false,
  );
  function handleFormSubmit(data) {
    if (isEidtSession) {
      data.id = editId;
      EditPurchase(
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
            close?.();
          },
        },
      );
    } else {
      const { customer, ...submitData } = data;
      if (data.customer && showResgiterCustomer) {
        const [customerName, phone] = customer.split("/");
        submitData.customerName = customerName;
        submitData.phone = phone;
      }
      addNewPurchase(
        { purchase: submitData },
        {
          onSuccess: () => {
            toast.success("این جنس بطوری موفقانه تعغیر شد");
            queryClient.invalidateQueries({ active: true });
            close?.();
          },
          onError: (error) => {
            toast.success(error.message);
            close?.();
          },
        },
      );
      console.log(data, submitData);
    }
  }

  // price,quantity,location,pay,productName,productType,customerName,phone,
  return (
    <Card className="darkModeMiddle w-full items-center p-4 shadow-none sm:w-[20rem] md:w-[35rem]">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="h-full md:w-[60%]"
      >
        {!showResgiterCustomer && (
          <>
            <div className="py-2">
              <Input
                dir="rtl"
                color="light-blue"
                type="text"
                className="dark:text-white"
                label="نام مشتری"
                {...register("customerName", {
                  required: "The Seller name is required",
                })}
                error={errors?.customerName ? true : false}
              />
            </div>
            <div className="py-2">
              <Input
                dir="rtl"
                color="light-blue"
                type="text"
                className="dark:text-white"
                label="شماره مشتری"
                {...register("phone")}
                error={errors?.phone ? true : false}
              />
            </div>
          </>
        )}
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            className="dark:text-white"
            type="text"
            label="جای خریداری"
            {...register("location", {
              required: "The location name is required",
            })}
            error={errors?.location ? true : false}
          />
        </div>
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
                        value={`${el?.name}/${el?.phone}/${el?.location}`}
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
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="نام جنس"
            {...register("productName", {
              required: "The material name is required",
            })}
            error={errors?.productName ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="text"
            className="dark:text-white"
            label="نوع جنس"
            {...register("productType", {
              required: "The Type type is required",
            })}
            error={errors?.productType ? true : false}
          />
        </div>
        <div className="py-2">
          <Input
            dir="rtl"
            color="light-blue"
            type="number"
            className="dark:text-white"
            label="مقدار جنس"
            min={0}
            {...register("quantity", {
              required: "The quantity is required",
              valueAsNumber: "Only number",
            })}
            error={errors?.quantity ? true : false}
          />
        </div>

        <div className="pt-2 ">
          <Input
            dir="rtl"
            color="light-blue"
            type="number"
            className="dark:text-white"
            label="قیمت جنس"
            min={0}
            {...register("price", {
              required: "The Material count is required",
            })}
            error={errors?.price ? true : false}
          />
          {errors?.root?.message}
        </div>

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
              onClick={() => setHideDeadline((el) => !el)}
            />
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
        {hideDeadline ? null : (
          <>
            <div className="mb-3">
              <Input
                type="date"
                {...register("deadline", { required: true })}
                label="تاریخ پرداخت قرضه"
                error={errors?.deadline ? true : false}
              />
            </div>
          </>
        )}

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

export default PurchaseForm;
