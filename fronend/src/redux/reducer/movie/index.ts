import {
  IMovieSearchObject,
  IMovie,
  ISearchData,
  ICelebritySearchObject,
} from "@/model/types";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IMovieState {
  movieData: IMovie;
  movieList: IMovie[];
  movieSearchData: ISearchData<IMovieSearchObject>;
  actorList: ISearchData<ICelebritySearchObject>;
  producerList: ISearchData<ICelebritySearchObject>;
}

const initialState: IMovieState = {
  movieData: {
    _id: "",
    name: "",
    year_of_release: 0,
    producer_id: "",
    actor_ids: [],
    createdBy: "",
    plot: "",
    avatar: "",
    images: [],
    createdAt: "",
    updatedAt: "",
  },
  movieList: [],
  movieSearchData: {
    results: [],
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    },
  },
  actorList: {
    results: [],
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    },
  },
  producerList: {
    results: [],
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    },
  },
};

export const movieSlice = createSlice({
  name: "celebrity",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<IMovie>) => {
      state.movieData = action.payload;
    },
    clearMovie: (state) => {
      state.movieData = initialState.movieData;
      state.actorList = initialState.actorList;
      state.producerList = initialState.producerList;
    },
    setMovieList: (state, action: PayloadAction<IMovie[]>) => {
      state.movieList = action.payload;
    },
    clearMovieList: (state) => {
      state.movieList = initialState.movieList;
    },
    setMovieSearchData: (
      state,
      action: PayloadAction<ISearchData<IMovieSearchObject>>
    ) => {
      state.movieSearchData = action.payload;
    },
    appendMovieSearchData: (
      state,
      action: PayloadAction<ISearchData<IMovieSearchObject>>
    ) => {
      state.movieSearchData.results = [
        ...state.movieSearchData.results,
        ...action.payload.results,
      ];
      state.movieSearchData.pagination = {
        ...state.movieSearchData.pagination,
        total: action.payload.pagination.total,
        page: action.payload.pagination.page,
        limit: action.payload.pagination.limit,
        totalPages: action.payload.pagination.totalPages,
      };
    },
    clearMovieSearchData: (state) => {
      state.movieSearchData = initialState.movieSearchData;
    },
    setMovieActorList: (
      state,
      action: PayloadAction<ISearchData<ICelebritySearchObject>>
    ) => {
      state.actorList = action.payload;
    },
    clearMovieActorList: (state) => {
      state.actorList = initialState.actorList;
    },
    setMovieProducerList: (
      state,
      action: PayloadAction<ISearchData<ICelebritySearchObject>>
    ) => {
      state.producerList = action.payload;
    },
    clearMovieProducerList: (state) => {
      state.producerList = initialState.producerList;
    },
  },
});

export const {
  addMovie,
  clearMovie,
  setMovieList,
  clearMovieList,
  setMovieSearchData,
  appendMovieSearchData,
  clearMovieSearchData,
  setMovieActorList,
  clearMovieActorList,
  setMovieProducerList,
  clearMovieProducerList,
} = movieSlice.actions;

export const selectMovie = (state: RootState) => state.movie.movieData;
export const selectMovieList = (state: RootState) => state.movie.movieList;
export const selectMovieSearchData = (state: RootState) =>
  state.movie.movieSearchData;
export const selectMovieActorList = (state: RootState) => state.movie.actorList;
export const selectMovieProducerList = (state: RootState) =>
  state.movie.producerList;

const movieReducer = movieSlice.reducer;
export default movieReducer;
