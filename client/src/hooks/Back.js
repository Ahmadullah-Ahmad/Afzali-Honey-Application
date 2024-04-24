import { useNavigate } from "react-router-dom";

export function Back() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  return { goBack };
}
