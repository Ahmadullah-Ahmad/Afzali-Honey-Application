import { Card } from "@material-tailwind/react";
import Contacts from "../features/Contacts/Contacts";
function ContactPage() {
  return (
    <Card className="rounded-none  darkModeTop shadow-none min-h-[calc(100dvh-11.5dvh)]  bg-gray-300 ">
      <Contacts />
    </Card>
  );
}

export default ContactPage;
