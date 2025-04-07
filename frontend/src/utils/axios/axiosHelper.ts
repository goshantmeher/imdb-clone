import axios from "axios";
interface IAxiosHelperProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  body?: unknown;
  headers?: { [key: string]: string };
  query?: Record<string, string>;
}
const axiosInstance = ({
  method,
  url,
  body,
  headers,
  query,
}: IAxiosHelperProps) => {
  const params = new URLSearchParams(query);
  const path = `?${params.toString()}`;

  const baseUrl = import.meta.env.VITE_APP_API_URL;
  url = baseUrl + url;
  if (query) {
    url += path;
  }
  return axios({
    method,
    url,
    data: body,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return parseFrommError(error);
    });
};

const parseFrommError = (error: unknown) => {
  try {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.error.status === 422) {
        const errorString = error.response?.data.error.message;
        const errorObject = JSON.parse(errorString);
        console.log(errorObject);
        const errorMessage = errorObject.reduce(
          (
            acc: string,
            value: {
              message: string;
              field: string;
            }
          ) => {
            return acc + value.message + "\n";
          },
          ""
        );
        return {
          message: errorMessage,
          status: 422,
        };
      }
      return (
        error.response?.data?.error || {
          message: "Something went wrong",
          status: 500,
        }
      );
    }
  } catch (error) {
    return error;
  }
};

export default axiosInstance;
