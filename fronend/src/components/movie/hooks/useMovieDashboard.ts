import { getMoviesApi, IGetMoviesApiProps } from "@/api/movie/movieApi";
import {
  selectMovieSearchData,
  setMovieSearchData,
} from "@/redux/reducer/movie";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const useMovieDashboard = () => {
  const [searchParams] = useSearchParams();

  const { actor_id, producer_id, year_of_release, page, limit } =
    Object.fromEntries(searchParams.entries());

  const movieSearchData = useSelector(selectMovieSearchData);

  const dispatch = useDispatch();

  const searchMovie = useCallback(
    async (data: IGetMoviesApiProps) => {
      if (actor_id) {
        data.actor_id = actor_id;
      }
      if (producer_id) {
        data.producer_id = producer_id;
      }
      if (year_of_release) {
        data.year_of_release = year_of_release;
      }
      if (page) {
        data.page = page;
      }
      if (limit) {
        data.limit = limit;
      }

      getMoviesApi(data)
        .then((res) => {
          if (res.success) {
            dispatch(setMovieSearchData(res.data));
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [actor_id, dispatch, limit, page, producer_id, year_of_release]
  );

  useEffect(() => {
    if (page && limit) {
      const query: IGetMoviesApiProps = {
        page: `${page}`,
        limit: `${limit}`,
      };

      searchMovie(query);
    }
  }, [limit, page, searchMovie]);

  return {
    movieSearchData,
    searchMovie,
    query: {
      actor_id,
      producer_id,
      year_of_release,
      page: page || "1",
      limit: limit || "10",
    },
  };
};

export default useMovieDashboard;
