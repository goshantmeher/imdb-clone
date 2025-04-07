import useCelebrity from "@/components/celebrity/hooks/useCelebrity";
import MovieList from "@/components/movie/movieList";
import PageContainer from "@/components/pageContainer";
import { Button } from "@/components/ui/button";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { Link } from "react-router";

interface ICelebrityProps {
  type: (typeof CELEBRITY_TYPES)[number];
}

function Celebrity({ type }: ICelebrityProps) {
  const { celebrityData, movieSearchData, canEdit } = useCelebrity(type);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 p-10">
        <div className="flex gap-4 justify-between">
          <div className=" flex gap-4 flex-wrap">
            <img
              src={celebrityData.avatar}
              alt={celebrityData.name}
              className="w-[200px] h-[251px]"
            />
            <div className="flex flex-col gap-0 justify-end">
              <h2 className="text-lg font-bold">{celebrityData.name}</h2>
              <p className="text-sm text-gray-600">
                Birth: {new Date(celebrityData.dob).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                {celebrityData.roles.join(", ")}
              </p>
            </div>
          </div>
          {canEdit && (
            <Link to={`/celebrity/edit/${celebrityData._id}?type=${type}`}>
              <Button
                variant={"secondary"}
                className="self-end bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Edit
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl ">Biography</h1>
          <p className="text-sm text-gray-600 text-justify">
            {celebrityData.bio}
          </p>
        </div>
        <div>
          <h1 className="text-2xl mb-4">Images</h1>
          <div className="flex flex-wrap gap-2">
            {celebrityData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Celebrity Image ${index + 1}`}
                className="w-[200px] h-[251px]"
              />
            ))}
            {!celebrityData.images.length && (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">No Images Found</h1>
              </div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-2xl mb-4">Movies</h1>
          <div className="flex flex-wrap gap-2">
            <MovieList
              viewMore={true}
              data={movieSearchData}
              actor_id={
                type === CELEBRITY_TYPES[0] ? celebrityData._id : undefined
              }
              producer_id={
                type === CELEBRITY_TYPES[1] ? celebrityData._id : undefined
              }
              page={String(movieSearchData.pagination.page)}
              limit={String(movieSearchData.pagination.limit)}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Celebrity;
