import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Logo({ classNames, alt, to }) {
  return (
    <div>
      <Link to={to || "/home"}>
        <Avatar
          src={"/image/logo.svg"}
          className={` ${classNames}`}
          size={"lg"}
          alt={alt || "logo"}
        />
      </Link>
    </div>
  );
}

export default Logo;
