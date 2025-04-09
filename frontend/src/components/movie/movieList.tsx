import { IMovieSearchObject, ISearchData } from "@/model/types";
import { memo, useMemo } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface IMovieListProps {
  data: ISearchData<IMovieSearchObject>;
  viewMore?: boolean;
  page?: string;
  limit?: string;
  actor_id?: string;
  producer_id?: string;
}
function MovieList({ data, viewMore = false, ...queryData }: IMovieListProps) {
  const linkTo = useMemo(() => {
    const sanitizedQueryData = Object.entries(queryData).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const params = new URLSearchParams(sanitizedQueryData);
    const queryString = params.toString();
    const linkHref = `/movie?${queryString}`;
    return queryString ? linkHref : "/movie";
  }, [queryData]);

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">No Data Found</h1>
      </div>
    );
  }

  const loadNextData = (isNext = true) => {
    const paginationData = data.pagination;

    if (paginationData) {
      const { page, totalPages } = paginationData;
      const nextPage = isNext ? page + 1 : page - 1;

      if (nextPage > 0 && nextPage <= totalPages) {
        const sanitizedQueryData = { ...queryData, page: String(nextPage) };
        const params = new URLSearchParams(
          Object.entries(sanitizedQueryData).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value);
            }
            return acc;
          }, {} as Record<string, string>)
        );
        const queryString = params.toString();
        const linkHref = `/movie?${queryString}`;
        window.location.href = linkHref;
      }
    }
  };

  return (
    <div className="flex flex-wrap  gap-4">
      {data.results.map((movie) => (
        <div
          key={movie._id}
          className="flex flex-col items-center cursor-pointer "
        >
          <Link to={`/movie/${movie._id}`}>
            <img
              src={movie.avatar}
              alt={movie.name}
              className="w-[200px] h-[251px] hover:scale-105 transition-transform duration-200"
            />
            <div>
              <h2 className="text-lg font-bold">{movie.name}</h2>
              <p className="text-sm text-gray-600">{movie.year_of_release}</p>
            </div>
          </Link>
        </div>
      ))}
      {viewMore && (
        <Link to={linkTo}>
          <div className="w-[200px] h-[251px] flex items-center justify-center bg-accent hover:bg-accent/50 transition-colors duration-200 cursor-pointer">
            <h2 className="text-lg font-bold">View More...</h2>
          </div>
        </Link>
      )}
      {!viewMore && (
        <div className="flex items-center justify-center w-full">
          <div className="flex  justify-center gap-8">
            <div className="flex justify-center w-full mt-4">
              <Button
                variant="default"
                onClick={() => {
                  loadNextData(false);
                }}
                disabled={queryData.page === "1"}
              >
                Previous
              </Button>
            </div>
            <div className="flex justify-center w-full mt-4">
              <Button
                variant="default"
                onClick={() => {
                  loadNextData();
                }}
                disabled={
                  queryData.page === data.pagination?.totalPages.toString()
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(MovieList);
