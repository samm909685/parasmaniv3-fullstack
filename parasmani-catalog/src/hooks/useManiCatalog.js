import { useEffect, useState } from "react";
import { getManiCatalog } from "../services/maniService";
export default function useManiCatalog() {
  const [state, setState] = useState({ loading: true, error: "", types: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    getManiCatalog(controller.signal).then(types => {
      if (!controller.signal.aborted) setState({ loading: false, error: "", types });
    }).catch(error => {
      if (!controller.signal.aborted) setState({ loading: false, error: error.message, types: [] });
    });
    return () => controller.abort();
  }, [attempt]);
  const retry = () => {
    setState({ loading: true, error: "", types: [] });
    setAttempt(value => value + 1);
  };
  return { ...state, retry };
}
