import { useEffect, useState } from "react";

export default function useIsUserRegistered() {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && new Date(user.expiredAt) > new Date()) {
      setIsUserRegistered(true);
    } else {
      localStorage.removeItem("user");
    }
  }, [setIsUserRegistered]);

  return [isUserRegistered, setIsUserRegistered];
}
