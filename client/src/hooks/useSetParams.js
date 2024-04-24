import { useSearchParams } from "react-router-dom";

function useSetParams() {
  const [searchParmas, setSearchParams] = useSearchParams();

  function handleClick(type, value) {
    if (value) {
      searchParmas.set("type", value);
      if (searchParmas.get("page")) searchParmas.set("page", 1);
      setSearchParams(searchParmas);
    } else {
      searchParmas.delete(type);
      setSearchParams(searchParmas);
    }
  }

  return { setParams: handleClick };
}

export default useSetParams;
