import { Typography, ListItemPrefix } from "@material-tailwind/react";
import { HiHome, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

import { useContacts } from "./useGetContacts";
//
function Contacts() {
  const { contacts } = useContacts();
  return (
    <div className="darkModeTop  shadow-non flex min-h-[calc(100dvh-14dvh)] w-full flex-col items-center justify-center rounded-none ">
      <Typography variant="h3">با ما به تماس شود</Typography>
      <ul>
        {contacts?.map((el) => (
          <li className="gap-4 py-6 sm:grid sm:grid-cols-3" key={el.id}>
            <Typography variant="h6" className="flex w-64 items-center">
              <ListItemPrefix>
                <HiHome size={30} />
              </ListItemPrefix>

              <span className="font-normal uppercase">{el.name}</span>
            </Typography>
            <Typography className="flex w-64 items-center">
              <ListItemPrefix>
                <HiOutlineMapPin size={30} />
              </ListItemPrefix>

              <span className="font-normal uppercase"> {el.location}</span>
            </Typography>
            <Typography className="flex w-64 items-center">
              <ListItemPrefix>
                <HiOutlinePhone size={30} />
              </ListItemPrefix>
              <span className="font-normal uppercase">
                {el.phone || "078343434"}
              </span>
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
