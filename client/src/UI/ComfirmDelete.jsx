import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

function ComfirmDelete({ open, resourceName, onDelete, disabled, close }) {
  return (
    <Dialog open={open} className="darkModeMiddle ">
      <DialogHeader className="darkModeMiddle flex justify-end rounded-md font-bold  text-gray-800">
        <Typography variant="h4">حذب کردن</Typography>
      </DialogHeader>
      <DialogBody className="darkModeMiddle text-right font-semibold uppercase  text-gray-800">
        آیا مطمعن استی کی این{" "}
        <span className="px-2 font-extrabold text-green-700">
          {resourceName}
        </span>
        را دایمی حذب شود؟
      </DialogBody>
      <DialogFooter className="flex justify-start gap-2">
        <Button
          variant="gradient"
          color="red"
          onClick={onDelete}
          disabled={disabled}
          className="buttonText"
        >
          حذب کردی
        </Button>
        <Button
          variant="gradient"
          color="blue"
          onClick={() => close(false)}
          disabled={disabled}
          className="buttonText"
        >
          لغو کردن
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ComfirmDelete;
