import { Card } from "@material-tailwind/react";

function Table({ children, colums }) {
  return (
    <Card
      className={`overflow-x-auto rounded-md shadow-md py-[3.5px] darkModeMiddle`}
    >
      <table className="darkModeMiddle min-w-full py-[3.5px] ">
        {children}
      </table>
    </Card>
  );
}

function Header({ children }) {
  return (
    <thead role={"row"}>
      <tr className="darkModeTop border-b border-blue-gray-50  p-2 text-right text-gray-600 dark:text-white">
        {children}
      </tr>
    </thead>
  );
}

function Row({ children }) {
  return (
    <tr
      role={"row"}
      className=" w-full text-right even:bg-gray-300 dark:even:bg-transparent"
    >
      {children}
    </tr>
  );
}
function Empty({ children }) {
  return (
    <p className="m-[2.4rem] text-center text-[1.6rem] font-medium">
      {children}
    </p>
  );
}
//By render props pattern
// function Body({ data, render }) {
//   console.log(data);
//   if (data?.length === 0) return <Empty>Not Data is Availible</Empty>;
//   return <div>{data?.map(render)}</div>;
// }
function Body({ children }) {
  return <tbody>{children}</tbody>;
}
function Footer({ children }) {
  return (
    <tfoot>
      <tr
        className=" border-t border-t-gray-200 p-3 dark:border-t-gray-900"
        role={"row"}
      >
        {children}
      </tr>
    </tfoot>
  );
}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
