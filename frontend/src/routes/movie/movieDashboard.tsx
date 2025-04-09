import useMovieDashboard from "@/components/movie/hooks/useMovieDashboard";
import MovieList from "@/components/movie/movieList";
import PageContainer from "@/components/pageContainer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function MovieDashboard() {
  const { movieSearchData, query, canAdd } = useMovieDashboard();
  return (
    <PageContainer>
      <div className="flex flex-col h-full w-full px-10 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">All Movies</h1>
          {canAdd && (
            <Link to="/movie/add">
              <Button
                variant="default"
                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Add Movie
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-16 w-ful">
          <div>
            <MovieList data={movieSearchData} viewMore={false} {...query} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default MovieDashboard;
