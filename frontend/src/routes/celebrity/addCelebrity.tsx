import CelebrityForm from "@/components/celebrity/addCelebrityForm";
import PageContainer from "@/components/pageContainer";
import { useNavigate, useSearchParams } from "react-router";

function AddCelebrity() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate();
  const postSubmit = () => {
    navigate(-1);
  };
  return (
    <PageContainer>
      <div className="flex flex-col items-center  w-full h-full ">
        <div className="flex flex-col gap-4 w-full px-10 py-4 max-w-xl">
          <h1 className="font-bold text-xl">Add {type}</h1>
          <CelebrityForm postSubmit={postSubmit} />
        </div>
      </div>
    </PageContainer>
  );
}

export default AddCelebrity;
