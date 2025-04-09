import { ICelebritySearchObject, ISearchData } from "@/model/types";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface ICelebrityListProps {
  data: ISearchData<ICelebritySearchObject>;
  type: (typeof CELEBRITY_TYPES)[number];
  viewMore?: boolean;
  page?: string;
  limit?: string;
  name?: string;
  role?: string;
}
function CelebrityList({
  data,
  type,
  viewMore = false,
  ...queryData
}: ICelebrityListProps) {
  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold mb-4">No Data Found</h1>
      </div>
    );
  }

  let linkHref = "actor";
  if (type === CELEBRITY_TYPES[1]) {
    linkHref = "producer";
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
        const linkHref = `/${type}?${queryString}`;
        window.location.href = linkHref;
      }
    }
  };

  return (
    <div className="flex flex-wrap  gap-4 sm:justify-start justify-center ">
      {data.results.map((celebrity) => (
        <div
          key={celebrity._id}
          className="flex flex-col items-center cursor-pointer "
        >
          <Link to={`/${linkHref}/${celebrity._id}`}>
            <img
              src={celebrity.avatar}
              alt={celebrity.name}
              className="w-[200px] h-[251px] hover:scale-105 transition-transform duration-200"
            />
            <div>
              <h2 className="text-lg font-bold">{celebrity.name}</h2>
              <p className="text-sm text-gray-600">
                {celebrity.roles.join(", ")}
              </p>
            </div>
          </Link>
        </div>
      ))}
      {viewMore && (
        <Link to={`/${linkHref}`}>
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

export default CelebrityList;
