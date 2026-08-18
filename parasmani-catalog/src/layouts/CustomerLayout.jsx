import { Outlet } from "react-router-dom";
import ParasmaniAssistant from "../components/ParasmaniAssistant/ParasmaniAssistant";

function CustomerLayout() {
  return (
    <>
      <Outlet />
      <ParasmaniAssistant />
    </>
  );
}

export default CustomerLayout;