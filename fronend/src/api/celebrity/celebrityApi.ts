import {
  IApiSuccessResponse,
  ICelebritySearchObject,
  ISearchData,
} from "@/model/types";
import axiosInstance from "@/utils/axios/axiosHelper";

export const createCelebrityApi = async (data: {
  name: string;
  images: string[];
  dob: string;
  bio: string;
  roles: string[];
  avatar: string;
}) => {
  const body = data;

  return await axiosInstance({
    method: "POST",
    url: "/celebrities",
    body,
  });
};

export const getCelebrityByIdApi = async (id: string) => {
  return await axiosInstance({
    method: "GET",
    url: `/celebrities/${id}`,
  });
};

export interface IGetCelebritiesApiProps {
  role?: string;
  name?: string;
  id?: string;
  page: string;
  limit: string;
}
export const getCelebritiesApi = async (
  data: IGetCelebritiesApiProps
): Promise<IApiSuccessResponse<ISearchData<ICelebritySearchObject>>> => {
  return await axiosInstance({
    method: "GET",
    url: "/celebrities",
    query: data as unknown as Record<string, string>,
  });
};

export const updateCelebrityApi = async (
  id: string,
  data: {
    name?: string;
    images?: string[];
    dob?: string;
    bio?: string;
    roles?: string[];
    avatar?: string;
  }
) => {
  const body = data;

  return await axiosInstance({
    method: "PATCH",
    url: `/celebrities/${id}`,
    body,
  });
};

export const addRoleToCelebrityApi = async (id: string, role: string) => {
  const body = { role };

  return await axiosInstance({
    method: "PATCH",
    url: `/celebrities/${id}/addRole`,
    body,
  });
};

export const removeRoleFromCelebrityApi = async (id: string, role: string) => {
  const body = { role };

  return await axiosInstance({
    method: "PATCH",
    url: `/celebrities/${id}/removeRole`,
    body,
  });
};
