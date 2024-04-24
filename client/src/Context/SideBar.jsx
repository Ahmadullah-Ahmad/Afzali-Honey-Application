import { createContext, useContext, useReducer } from "react";

const productInitialState = { product: "همه" };

function productReducer(state, action) {
  switch (action.type) {
    case "":
      return { ...state, product: "همه" };
    case action.type:
      return { ...state, product: action.type };
    default:
      new Error("No type found");
  }
}

const billInitialState = { bill: [], showX: true };

function BillReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.bill.length === 0) {
        state.bill = [...state.bill, action.data];
      } else if (state.bill.find((item) => item.id === action.data.id)) {
        state.bill = [...state.bill];
      } else {
        state.bill = [...state.bill, action.data];
      }
      return {
        ...state,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        bill: state.bill.filter((item) => item.id !== action.data),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        bill: state.bill.map((item) => {
          if (action.data.id === item.id) return action.data;
          return item;
        }),
      };
    default:
      new Error("No type found");
  }
}
const SideBarContext = createContext();

function SideProvider({ children }) {
  const [productState, productDispatch] = useReducer(
    productReducer,
    productInitialState,
  );
  const [billState, billDispatch] = useReducer(BillReducer, billInitialState);
  return (
    <SideBarContext.Provider
      value={{ productState, productDispatch, billState, billDispatch }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBar() {
  const context = useContext(SideBarContext);
  if (!context) Error("Context is used outside of scope");
  return context;
}

export default SideProvider;
