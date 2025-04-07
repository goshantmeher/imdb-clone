import { getCelebrityByIdApi } from "@/api/celebrity/celebrityApi";
import {
  addCelebriry,
  clearCelebrity,
  selectCelebrity,
} from "@/redux/reducer/celebrity";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const useEditCelebrity = () => {
  const { id } = useParams();
  const celebrityData = useSelector(selectCelebrity);
  const dispatch = useDispatch();

  const getCelebrity = useCallback(
    (id: string) => {
      getCelebrityByIdApi(id)
        .then((res) => {
          if (res.success) {
            dispatch(addCelebriry(res.data));
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getCelebrity(id);
    }
  }, [getCelebrity, id]);

  useEffect(() => {
    return () => {
      dispatch(clearCelebrity());
    };
  }, [dispatch]);

  return {
    celebrityData,
  };
};

export default useEditCelebrity;
