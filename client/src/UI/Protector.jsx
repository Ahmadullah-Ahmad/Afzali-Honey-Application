import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/Authentication/useUser";

function Protector({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { user, isLoading } = useUser();
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !user) {
        navigate("/login", { replace: true });
      }
    },
    [isLoading, user, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex items-center h-[100dvh] w-full darkModeTop justify-center">
        <Spinner className="h-20 w-20 " color="blue" />
      </div>
    );

  // 4. If there IS a user, render the app
  if (user) return children;
}

export default Protector;
