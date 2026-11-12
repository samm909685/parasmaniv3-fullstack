import { useEffect, useState } from "react";
import { getManiCatalog } from "../services/maniService";
export default function useManiCatalog() {
  const [state, setState] = useState({ loading: true, error: "", products: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    getManiCatalog(controller.signal).then(products => {
      if (!controller.signal.aborted) setState({ loading: false, error: "", products });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ loading: false, error: error.message, products: [] });
    });
    return () => controller.abort();
  }, [attempt]);
  const retry = () => {
    setState({ loading: true, error: "", products: [] });
    setAttempt(value => value + 1);
  };
  return { ...state, retry };
}
