export interface IMovie {
  _id: string;
  name: string;
  year_of_release: number;
  producer_id: string;
  actor_ids: string[];
  createdBy: string;
  plot: string;
  avatar: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICelebrity {
  _id: string;
  name: string;
  dob: string;
  bio: string;
  roles: string[];
  avatar: string;
  images: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IApiSuccessResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

export interface IMovieSearchObject {
  _id: string;
  name: string;
  year_of_release: number;
  avatar: string;
}

export interface ISearchData<T> {
  results: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICelebritySearchObject {
  _id: string;
  name: string;
  roles: string[];
  avatar: string;
}
