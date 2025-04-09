import CelebrityList from "@/components/celebrity/celebrityList";
import useCelebrityDashboard from "@/components/celebrity/hooks/useCelebrityDashboard";
import PageContainer from "@/components/pageContainer";
import { Button } from "@/components/ui/button";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { memo } from "react";
import { Link } from "react-router";

interface ICelebrityDashboardProps {
  type: (typeof CELEBRITY_TYPES)[number];
}
function CelebrityDashboard({ type }: ICelebrityDashboardProps) {
  let actorRequired = false;
  let producerRequired = false;
  if (type === CELEBRITY_TYPES[0]) {
    actorRequired = true;
  } else if (type === CELEBRITY_TYPES[1]) {
    producerRequired = true;
  }

  const { actorSearchData, producerSearchData, query, canAdd } =
    useCelebrityDashboard(actorRequired, producerRequired);

  return (
    <PageContainer>
      <div className="flex flex-col h-full w-full px-10 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold ">All {type}</h1>
          {canAdd && (
            <Link to={`/celebrity/add/?type=${type}`}>
              <Button
                variant="default"
                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Add {type}
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-16 w-ful">
          {actorRequired && (
            <div className="flex flex-col  h-full w-full">
              <h1 className="text-2xl mb-4">Actors</h1>
              <CelebrityList
                data={actorSearchData}
                type={CELEBRITY_TYPES[0]}
                {...query}
              />
            </div>
          )}

          {producerRequired && (
            <div>
              <h1 className="text-2xl ">Producers</h1>
              <CelebrityList
                data={producerSearchData}
                type={CELEBRITY_TYPES[1]}
                viewMore={false}
                {...query}
              />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default memo(CelebrityDashboard);
