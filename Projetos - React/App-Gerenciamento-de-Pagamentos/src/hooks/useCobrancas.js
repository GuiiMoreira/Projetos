import { useContext } from "react";
import CobrancasContext from "../context/CobrancasContext";

function useCrobrancas() {
  return useContext(CobrancasContext);
}

export default useCrobrancas;
