import { getCelebritiesApi } from "@/api/celebrity/celebrityApi";
import { getMovieByIdApi } from "@/api/movie/movieApi";
import {
  addMovie,
  clearMovie,
  selectMovie,
  selectMovieActorList,
  selectMovieProducerList,
  setMovieActorList,
  setMovieProducerList,
} from "@/redux/reducer/movie";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function useEditMovie() {
  const { id } = useParams();
  const movieData = useSelector(selectMovie);
  const movieActorList = useSelector(selectMovieActorList);
  const movieProducerList = useSelector(selectMovieProducerList);

  const dispatch = useDispatch();

  const getAllMovieCelebrity = useCallback(
    (ids: string[], type: (typeof CELEBRITY_TYPES)[number]) => {
      const idsString = ids.join(",");
      getCelebritiesApi({ id: idsString, page: "1", limit: "100" }).then(
        (res) => {
          if (res.success) {
            if (type === CELEBRITY_TYPES[0]) {
              dispatch(setMovieActorList(res.data));
            } else if (type === CELEBRITY_TYPES[1]) {
              dispatch(setMovieProducerList(res.data));
            }
          }
        }
      );
    },
    [dispatch]
  );

  const getMovie = useCallback(
    (id: string) => {
      getMovieByIdApi(id)
        .then((res) => {
          if (res.success) {
            dispatch(addMovie(res.data));
            console.log("res", res.data);

            const actorIds = res.data.actor_ids;
            const producerId = res.data.producer_id;
            getAllMovieCelebrity(actorIds, CELEBRITY_TYPES[0]);
            getAllMovieCelebrity([producerId], CELEBRITY_TYPES[1]);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [dispatch, getAllMovieCelebrity]
  );

  useEffect(() => {
    if (id) getMovie(id);
  }, [getMovie, id]);

  useEffect(() => {
    return () => {
      dispatch(clearMovie());
    };
  }, [dispatch]);

  return {
    movieData,
    movieActorList: movieActorList.results,
    movieProducerList: movieProducerList.results,
  };
}

export default useEditMovie;
