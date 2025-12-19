import { useDispatch, useSelector } from "react-redux";

import { login, logout } from "../../../core/store/slices/authSlice";
import type { User } from "../models/userModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  const loginFn = (user: User) => {
    setError("");
    if (!name) {
      setError("Please enter your name");
      return;
    }

    dispatch(login(user));
  };

  const logoutFn = () => {
    dispatch(logout());
  };

  return {
    name,
    setName,
    error,
    setError,
    user,
    isAuthenticated,
    loginFn,
    logoutFn,
  };
};
