import {
  IApiSuccessResponse,
  IMovie,
  IMovieSearchObject,
  ISearchData,
} from "@/model/types";
import axiosInstance from "@/utils/axios/axiosHelper";

export const createMovieApi = async ({
  name,
  year_of_release,
  producer_id,
  actor_ids,
  plot,
  avatar,
  images,
}: Partial<IMovie>) => {
  const body = {
    name,
    year_of_release,
    producer_id,
    actor_ids,
    plot,
    avatar,
    images,
  };

  return await axiosInstance({
    method: "POST",
    url: "/movies",
    body,
  });
};

export const updateMovieApi = async (
  id: string,
  {
    name,
    year_of_release,
    producer_id,
    actor_ids,
    plot,
    avatar,
    images,
  }: Partial<IMovie>
) => {
  const body = {
    name,
    year_of_release,
    producer_id,
    actor_ids,
    plot,
    avatar,
    images,
  };

  return await axiosInstance({
    method: "PATCH",
    url: `/movies/${id}`,
    body,
  });
};

export const addActorToMovieApi = async (id: string, actor_id: string) => {
  const body = {
    actor_id,
  };
  return await axiosInstance({
    method: "PATCH",
    url: `/movies/${id}/add-actor`,
    body,
  });
};

export const removeActorFromMovieApi = async (id: string, actor_id: string) => {
  const body = {
    actor_id,
  };
  return await axiosInstance({
    method: "PATCH",
    url: `/movies/${id}/remove-actor`,
    body,
  });
};
export const getMovieByIdApi = async (id: string) => {
  return await axiosInstance({
    method: "GET",
    url: `/movies/${id}`,
  });
};
export interface IGetMoviesApiProps {
  page: string;
  limit: string;
  name?: string;
  year_of_release?: string;
  producer_id?: string;
  actor_id?: string;
}
export const getMoviesApi = async (
  data: IGetMoviesApiProps
): Promise<IApiSuccessResponse<ISearchData<IMovieSearchObject>>> => {
  if (!data.page) {
    data.page = "1";
  }
  if (!data.limit) {
    data.limit = "10";
  }
  return await axiosInstance({
    method: "GET",
    url: "/movies",
    query: data as unknown as Record<string, string>,
  });
};
