import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
         window.scrollTo(0, 0);
    }, 500);
  }, [pathname]);

  return null;
}
