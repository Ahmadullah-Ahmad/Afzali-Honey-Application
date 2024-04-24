import { Card } from "@material-tailwind/react";
import { HiArrowLeft } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import LoginForm from "../features/Authentication/LoginForm";

function Login() {
  return (
    <Card className="h-[100dvh] shadow-none darkModeTop rounded-none ">
      <div className="p-3 absolute z-[9999] ">
        <NavLink to={"/home"}>
          <HiArrowLeft size={35} />
        </NavLink>
      </div>
      <LoginForm />
    </Card>
  );
}

export default Login;
