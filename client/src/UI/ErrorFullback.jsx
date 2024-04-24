import { Button, Card, Typography } from "@material-tailwind/react";

function ErrorFullback({ error }) {
  const navigate = () => {
    document.location.replace("/home");
  };
  return (
    <Card className="h-[100dvh] darkModeTop rounded-none bg-gray-200 flex justify-center items-center">
      <Card className="darkModeMiddle w-[50%] h-[50%] flex justify-center text-center items-center">
        <Typography variant="h3">Something went Wrong</Typography>
        <Typography variant="paragraph">{error.message}</Typography>
        <Button color="blue" onClick={() => navigate()}>
          Try again
        </Button>
      </Card>
    </Card>
  );
}

export default ErrorFullback;
