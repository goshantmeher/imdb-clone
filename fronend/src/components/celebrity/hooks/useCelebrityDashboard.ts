import {
  getCelebritiesApi,
  IGetCelebritiesApiProps,
} from "@/api/celebrity/celebrityApi";
import {
  selectActorSearchData,
  selectProducerSearchData,
  setActorSearchData,
  setProducerSearchData,
} from "@/redux/reducer/celebrity";
import { CELEBRITY_TYPES } from "@/utils/constants/celebrity";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

const useCelebrityDashboard = (
  actorRequired = false,
  producerRequired = false
) => {
  const [searchParams] = useSearchParams();

  const { name, role, page, limit } = Object.fromEntries(
    searchParams.entries()
  );

  const actorSearchData = useSelector(selectActorSearchData);
  const producerSearchData = useSelector(selectProducerSearchData);

  const dispatch = useDispatch();

  const searchCelebrities = useCallback(
    async (data: IGetCelebritiesApiProps) => {
      getCelebritiesApi(data)
        .then((res) => {
          if (res.success) {
            if (data.role === CELEBRITY_TYPES[0]) {
              dispatch(setActorSearchData(res.data));
            } else {
              dispatch(setProducerSearchData(res.data));
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (page && limit) {
      const query: IGetCelebritiesApiProps = {
        page: page,
        limit: limit,
      };
      if (name) {
        query.name = name;
      }

      if (actorRequired) {
        query.role = CELEBRITY_TYPES[0];
        searchCelebrities(query);
      }
      if (producerRequired) {
        query.role = CELEBRITY_TYPES[1];
        searchCelebrities(query);
      }
    }
  }, [
    actorRequired,
    producerRequired,
    searchCelebrities,
    page,
    limit,
    name,
    role,
  ]);

  return {
    searchCelebrities,
    actorSearchData,
    producerSearchData,
    query: {
      name: name || "",
      role: role || "",
      page: page || "1",
      limit: limit || "10",
    },
  };
};

export default useCelebrityDashboard;
