import CelebrityList from "@/components/celebrity/celebrityList";
import useCelebrityDashboard from "@/components/celebrity/hooks/useCelebrityDashboard";
import useMovieDashboard from "@/components/movie/hooks/useMovieDashboard";
import MovieList from "@/components/movie/movieList";
import PageContainer from "@/components/pageContainer";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { useEffect } from "react";
import { Link } from "react-router";

export default function Home() {
  const {
    actorSearchData,
    producerSearchData,
    searchCelebrities,
    query: celebrityQuery,
  } = useCelebrityDashboard(true, true);

  const { movieSearchData, searchMovie, query } = useMovieDashboard();
  useEffect(() => {
    if (searchCelebrities) {
      searchCelebrities({
        limit: "10",
        page: "1",
        role: CELEBRITY_TYPES[0],
      });
      searchCelebrities({
        limit: "10",
        page: "1",
        role: CELEBRITY_TYPES[1],
      });
    }
  }, [searchCelebrities]);

  useEffect(() => {
    if (searchMovie) {
      searchMovie({
        limit: "10",
        page: "1",
      });
    }
  }, [searchMovie]);
  return (
    <PageContainer>
      <div className="flex flex-col h-full w-full px-10 py-4">
        <div className="flex flex-col gap-16 w-ful">
          <div className="flex flex-col  h-full w-full">
            <Link to="/actor?page=1&limit=10" className="">
              <h1 className="text-2xl mb-4">Actors</h1>
            </Link>

            <CelebrityList
              data={actorSearchData}
              type={CELEBRITY_TYPES[0]}
              viewMore={true}
            />
          </div>

          <div>
            <Link to="/producer?page=1&limit=10" className="">
              <h1 className="text-2xl mb-4">Producers</h1>
            </Link>
            <CelebrityList
              data={producerSearchData}
              type={CELEBRITY_TYPES[1]}
              viewMore={true}
              {...celebrityQuery}
            />
          </div>

          <div>
            <Link to="/movie?page=1&limit=10" className="">
              <h1 className="text-2xl mb-4">Movies</h1>
            </Link>
            <MovieList data={movieSearchData} viewMore={true} {...query} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
