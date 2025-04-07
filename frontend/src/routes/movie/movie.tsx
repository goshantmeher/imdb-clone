import useMovie from "@/components/movie/hooks/useMovie";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Movie() {
  const { movieData, movieActorList, movieProducerList, canEdit } = useMovie();
  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex gap-4 justify-between">
        <div className=" flex gap-4 flex-wrap">
          <img
            src={movieData.avatar}
            alt={movieData.name}
            className="w-[200px] h-[251px]"
          />
          <div className="flex flex-col gap-0 justify-end">
            <h2 className="text-lg font-bold">{movieData.name}</h2>
            <p className="text-sm text-gray-600">
              Release: {movieData.year_of_release}
            </p>
          </div>
        </div>
        {canEdit && (
          <Link to={`/movie/edit/${movieData._id}`}>
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
        <h1 className="text-2xl ">Plot</h1>
        <p className="text-sm text-gray-600 text-justify">{movieData.plot}</p>
      </div>
      <div>
        <h1 className="text-2xl mb-4">Images</h1>
        <div className="flex flex-wrap gap-2">
          {movieData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Celebrity Image ${index + 1}`}
              className="w-[200px] h-[251px]"
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl mb-4">Actors</h1>
        <div className="flex flex-wrap gap-2">
          {movieActorList.results.map((actor) => (
            <div
              key={actor._id}
              className="flex flex-col items-center cursor-pointer "
            >
              <Link to={`/actor/${actor._id}`}>
                <img
                  src={actor.avatar}
                  alt={actor.name}
                  className="w-[200px] h-[251px] hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <h2 className="text-lg font-bold">{actor.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-4">Producer</h1>
        <div className="flex flex-wrap gap-2">
          {movieProducerList.results.map((producer) => (
            <div
              key={producer._id}
              className="flex flex-col items-center cursor-pointer "
            >
              <Link to={`/producer/${producer._id}`}>
                <img
                  src={producer.avatar}
                  alt={producer.name}
                  className="w-[200px] h-[251px] hover:scale-105 transition-transform duration-200"
                />
                <div>
                  <h2 className="text-lg font-bold">{producer.name}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movie;
