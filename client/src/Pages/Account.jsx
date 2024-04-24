import AccountCard from "../features/Account/AccountCard";
import UpdatePassword from "../features/Account/UpdatePassword";

function Account() {
  return (
    <div className="bg-gray-200 grid grid-rows-[auto_1fr] divide-y-2 divide-gray-400 dark:divide-gray-800 h-full darkModeTop  ">
      <AccountCard />
      <UpdatePassword />
    </div>
  );
}

export default Account;
