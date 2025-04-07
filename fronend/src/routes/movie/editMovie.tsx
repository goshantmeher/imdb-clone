import EditMovieForm from "@/components/movie/editMovieForm";
import useEditMovie from "@/components/movie/hooks/useEditMovie";
import PageContainer from "@/components/pageContainer";
import { useNavigate } from "react-router";

function EditMovie() {
  const { movieData, movieActorList, movieProducerList } = useEditMovie();
  const navigate = useNavigate();
  const postSubmit = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center  w-full h-full ">
        <div className="flex flex-col gap-4 w-full px-10 py-4 max-w-xl">
          <h1 className="font-bold text-xl">Edit Movie</h1>
          {movieData && movieData._id && (
            <EditMovieForm
              existingData={movieData}
              movieActorList={movieActorList}
              movieProducerList={movieProducerList}
              postSubmit={postSubmit}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default EditMovie;
