import { getCelebrityByIdApi } from "@/api/celebrity/celebrityApi";
import { getMoviesApi, IGetMoviesApiProps } from "@/api/movie/movieApi";
import {
  addCelebriry,
  clearCelebrity,
  selectCelebrity,
} from "@/redux/reducer/celebrity";
import {
  clearMovieSearchData,
  selectMovieSearchData,
  setMovieSearchData,
} from "@/redux/reducer/movie";
import { userState } from "@/redux/reducer/user";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const useCelebrity = (type: (typeof CELEBRITY_TYPES)[number]) => {
  const { id } = useParams();
  const celebrityData = useSelector(selectCelebrity);
  const movieSearchData = useSelector(selectMovieSearchData);
  const loggedInUser = useSelector(userState);
  const dispatch = useDispatch();
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    if (
      loggedInUser &&
      loggedInUser._id &&
      celebrityData &&
      celebrityData.createdBy &&
      celebrityData.createdBy === loggedInUser._id
    ) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [celebrityData, loggedInUser]);

  const getCelebrity = useCallback(
    (id: string) => {
      getCelebrityByIdApi(id)
        .then((res) => {
          if (res.success) {
            dispatch(addCelebriry(res.data));
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [dispatch]
  );

  const getAllMoviesByCelebrity = useCallback(
    ({ actor_id, producer_id, page, limit }: IGetMoviesApiProps) => {
      const query: IGetMoviesApiProps = {
        page,
        limit,
      };
      if (actor_id) {
        query.actor_id = actor_id;
      }
      if (producer_id) {
        query.producer_id = producer_id;
      }

      getMoviesApi(query)
        .then((res) => {
          if (res.success) {
            dispatch(setMovieSearchData(res.data));
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (id && type) {
      getCelebrity(id);
      if (type === CELEBRITY_TYPES[0]) {
        getAllMoviesByCelebrity({
          actor_id: id,
          page: "1",
          limit: "10",
        });
      } else {
        getAllMoviesByCelebrity({
          producer_id: id,
          page: "1",
          limit: "10",
        });
      }
    }
  }, [getAllMoviesByCelebrity, getCelebrity, id, type]);

  useEffect(() => {
    return () => {
      dispatch(clearCelebrity());
      dispatch(clearMovieSearchData());
    };
  }, [dispatch]);

  return {
    celebrityData,
    movieSearchData,
    canEdit,
  };
};

export default useCelebrity;
