import axiosInstance from "@/utils/axios/axiosHelper";

export const loginApi = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };

  return await axiosInstance({
    method: "POST",
    url: "/user/login",
    body,
  });
};

export const signupApi = async (
  email: string,
  password: string,
  name: string
) => {
  const body = {
    name,
    email,
    password,
  };

  return await axiosInstance({
    method: "POST",
    url: "/user",
    body,
  });
};

export const getLoggedInUserApi = async () => {
  return await axiosInstance({
    method: "GET",
    url: "/user",
  });
};

export const logoutApi = async () => {
  return await axiosInstance({
    method: "POST",
    url: "/user/logout",
  });
};
