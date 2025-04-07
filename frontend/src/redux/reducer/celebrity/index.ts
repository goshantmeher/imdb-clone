import { ICelebrity, ICelebritySearchObject, ISearchData } from "@/model/types";
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CelebrityState {
  celebrityData: ICelebrity;
  actorList: ICelebrity[];
  producerList: ICelebrity[];
  actorSearchData: ISearchData<ICelebritySearchObject>;
  producerSearchData: ISearchData<ICelebritySearchObject>;
}

const initialState: CelebrityState = {
  celebrityData: {
    _id: "",
    name: "",
    dob: "",
    bio: "",
    roles: [],
    avatar: "",
    images: [],
    createdBy: "",
    createdAt: "",
    updatedAt: "",
  },
  actorList: [],
  producerList: [],
  actorSearchData: {
    results: [],
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    },
  },
  producerSearchData: {
    results: [],
    pagination: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
    },
  },
};

export const celebritySlice = createSlice({
  name: "celebrity",
  initialState,
  reducers: {
    addCelebriry: (state, action: PayloadAction<ICelebrity>) => {
      state.celebrityData = action.payload;
    },
    clearCelebrity: (state) => {
      state.celebrityData = initialState.celebrityData;
    },
    setActorList: (state, action: PayloadAction<ICelebrity[]>) => {
      state.actorList = action.payload;
    },
    clearActorList: (state) => {
      state.actorList = initialState.actorList;
    },
    setProducerList: (state, action: PayloadAction<ICelebrity[]>) => {
      state.producerList = action.payload;
    },
    clearProducerList: (state) => {
      state.producerList = initialState.producerList;
    },
    setActorSearchData: (
      state,
      action: PayloadAction<ISearchData<ICelebritySearchObject>>
    ) => {
      state.actorSearchData = action.payload;
    },
    clearActorSearchData: (state) => {
      state.actorSearchData = initialState.actorSearchData;
    },
    setProducerSearchData: (
      state,
      action: PayloadAction<ISearchData<ICelebritySearchObject>>
    ) => {
      state.producerSearchData = action.payload;
    },
    clearProducerSearchData: (state) => {
      state.producerSearchData = initialState.producerSearchData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCelebriry,
  clearActorList,
  clearCelebrity,
  setActorList,
  setProducerList,
  clearProducerList,
  setActorSearchData,
  clearActorSearchData,
  setProducerSearchData,
  clearProducerSearchData,
} = celebritySlice.actions;

export const selectCelebrity = (state: RootState) =>
  state.celebrity.celebrityData;
export const selectActorList = (state: RootState) => state.celebrity.actorList;
export const selectProducerList = (state: RootState) =>
  state.celebrity.producerList;
export const selectActorSearchData = (state: RootState) =>
  state.celebrity.actorSearchData;
export const selectProducerSearchData = (state: RootState) =>
  state.celebrity.producerSearchData;

const celebrityReducer = celebritySlice.reducer;
export default celebrityReducer;
