import { Button, Input, Option, Select } from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

function ReportSearch() {
  const { register, handleSubmit, control, reset } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  function handlSearch(data) {
    searchParams.set("date", JSON.stringify(data));
    setSearchParams(searchParams);
    reset();
  }
  return (
    <>
      <form
        className="md:flex-row  justify-end darkModeTop flex flex-col bg-gray-300 gap-4 py-1 pr-3"
        onSubmit={handleSubmit(handlSearch)}
      >
        <div>
          <Input
            type="date"
            color="blue"
            label="از تاریخ"
            className="darkModeMiddle"
            {...register("from", { required: true })}
            dir="rtl"
          />
        </div>
        <div>
          <Input
            type="date"
            color="blue"
            label="تا تاریخ"
            className="darkModeMiddle"
            {...register("to", { required: true })}
            dir="rtl"
          />
        </div>
        <div>
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                className="darkModeMiddle font-semibold"
                label="نوع را انتخاب کنید"
                color="blue"
              >
                <Option className="text-right text-lg" value={"sales"}>
                  فروشات
                </Option>
                <Option className="text-right text-lg" value={"purchase"}>
                  خرید
                </Option>
                <Option className="text-right text-lg" value={"spend"}>
                  مصارف
                </Option>
              </Select>
            )}
          />
        </div>
        <div className="pl-5">
          <Button
            size="md"
            color="blue-gray"
            variant="filled"
            type="submit"
            className="py-3 darkModeSubimt"
          >
            جستجو
          </Button>
        </div>
      </form>
    </>
  );
}
export default ReportSearch;
