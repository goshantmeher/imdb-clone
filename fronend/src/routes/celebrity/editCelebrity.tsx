import EditCelebrityForm from "@/components/celebrity/editCelebrityForm";
import useEditCelebrity from "@/components/celebrity/hooks/useEditCelebrity";
import PageContainer from "@/components/pageContainer";
import { useNavigate } from "react-router";

function EditCelebrity() {
  const { celebrityData } = useEditCelebrity();
  const navigate = useNavigate();
  const postSubmit = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center  w-full h-full ">
        <div className="flex flex-col gap-4 w-full px-10 py-4 max-w-xl">
          <h1 className="font-bold text-xl">Edit Celebrity</h1>
          {celebrityData && celebrityData._id && (
            <EditCelebrityForm
              existingData={celebrityData}
              postSubmit={postSubmit}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default EditCelebrity;
