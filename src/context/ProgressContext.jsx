import { createContext, useState } from "react";

const ProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function ProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");

  const progressCtx = {
    progress: progress,
    showCart: () => setProgress("cart"),
    hideCart: () => setProgress(""),
    showCheckout: () => setProgress("checkout"),
    hideCheckout: () => setProgress(""),
  };

  return (
    <ProgressContext.Provider value={progressCtx}>{children}</ProgressContext.Provider>
  );
}

export default ProgressContext;
