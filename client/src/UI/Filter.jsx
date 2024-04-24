import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
function Filter({ filterField, options }) {
  const [searchParmas, setSearchParams] = useSearchParams();
  const currentField = searchParmas.get(filterField) || options?.at(0).value;

  function handleClick(value) {
   
    searchParmas.set(filterField, value);
    if (searchParmas.get("page")) searchParmas.set("page", 1);
    setSearchParams(searchParmas);
  }
  return (
    <Tabs value={currentField} className="darkModeButtom rounded-md">
      <TabsHeader className="darkModeButtom w-auto rounded-md bg-gray-50 shadow-none dark:opacity-80">
        {options?.map((option) => (
          <Tab
            key={option.value}
            value={option.value}
            onClick={() => {
              handleClick(option.value);
            }}
            className="w-auto rounded-md  px-3 font-semibold uppercase  dark:text-gray-500 dark:focus:text-black sm:text-lg md:px-6"
          >
            {option.label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}

export default Filter;
