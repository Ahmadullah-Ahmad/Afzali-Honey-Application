import { Card, Dialog } from "@material-tailwind/react";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutSide } from "../hooks/Ref";

const StyleModel = `rounded-lg darkModeMiddle shadow-lg pt-[2rem] px-[3rem] transition-all duration-500  `;
const buttonStyle = `bg-[none] p-[0.4rem] rounded-sm transform translate-x-[0.8rem] transition-all duration-900  absolute top-1 right-8`;
export const ModelContext = createContext();

function Model({ children }) {
  const [openName, setOpneName] = useState("");
  const close = () => {
    setOpneName("");
  };
  const OpenWindow = setOpneName;

  const [formData, setformData] = useState(null);

  return (
    <ModelContext.Provider
      value={{ close, OpenWindow, openName, formData, setformData }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) throw new Error("The model context is out of scope");
  return context;
}

function Window({ children, name, position }) {
  const { close, openName, formData } = useContext(ModelContext);
  const { ref } = useOutSide({ Close: close });
  return createPortal(
    <Dialog open={openName === name} handler={close}>
      <Card
        className={`${StyleModel} ${
          !position
            ? " fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] duration-[10000s]"
            : position
        }`}
        ref={ref}
      >
        <button onClick={close} className={buttonStyle + "  hidden md:block"}>
          <HiXMark size={30} className="darkModeMiddle text-gray-800" />
        </button>
        <div>{cloneElement(children, { close: close, formData })}</div>
      </Card>
    </Dialog>,
    document.body,
  );
}

function Open({ children, open: openWindowName, formData }) {
  const { OpenWindow, setformData } = useContext(ModelContext);
  return cloneElement(children, {
    onClick: () => {
      OpenWindow(openWindowName);
      setformData(formData);
    },
  });
}
Model.Open = Open;
Model.Window = Window;
export default Model;
