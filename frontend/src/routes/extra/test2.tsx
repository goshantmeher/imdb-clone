import PageContainer from "@/components/pageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Building {
  name: string;
  time: number;
  earningPerUnit: number;
}

const buildData: Building[] = [
  { name: "T", time: 5, earningPerUnit: 1500 },
  { name: "P", time: 4, earningPerUnit: 1000 },
  { name: "C", time: 10, earningPerUnit: 3000 },
];

function Test2() {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [result, setResult] = useState<{
    maxEarning: number;
    combinations: { T: number; P: number; C: number }[];
  }>({
    maxEarning: 0,
    combinations: [],
  });
  const onGenerate = () => {
    let maxEarning = 0;
    let bestCombinations: { T: number; P: number; C: number }[] = [];

    const startConstruction = (
      timeSpent: number,
      currrentEarning: number,
      currentCounts: Record<"T" | "P" | "C", number>
    ) => {
      if (currrentEarning > maxEarning) {
        maxEarning = currrentEarning;
        bestCombinations = [{ ...currentCounts }];
      } else if (currrentEarning === maxEarning) {
        bestCombinations.push({ ...currentCounts });
      }

      for (const build of buildData) {
        if (timeSpent + build.time <= totalTime) {
          const finishTime = timeSpent + build.time;
          const operationalTime = totalTime - finishTime;
          const newEarning = build.earningPerUnit * operationalTime;

          currentCounts[build.name as "T" | "P" | "C"]++;
          startConstruction(
            finishTime,
            currrentEarning + newEarning,
            currentCounts
          );
          currentCounts[build.name as "T" | "P" | "C"]--;
        }
      }
    };

    const initialBuildingCounts: Record<"T" | "P" | "C", number> = {
      T: 0,
      P: 0,
      C: 0,
    };
    startConstruction(0, 0, initialBuildingCounts);
    console.log("maxEarning", maxEarning);

    setResult({
      maxEarning,
      combinations: bestCombinations,
    });
  };

  return (
    <PageContainer>
      <div className="size-full  flex justify-center p-10">
        <div className="size-full  flex flex-col items-center">
          <div className="flex flex-col gap-4 w-2xl">
            <Label>Enter Value</Label>
            <Input
              placeholder={`Enter time`}
              type="number"
              value={totalTime}
              onChange={(e) => setTotalTime(Number(e.target.value))}
            />
            <Button variant="default" className="w-full" onClick={onGenerate}>
              Generate
            </Button>
          </div>
          <div className="flex mt-4 flex-col gap-4 ">
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-xl font-bold">Output</span>
              <span>Earning: {result.maxEarning}</span>
              <div className="flex flex-col gap-2">
                {result.combinations.map((item, index) => (
                  <div key={index} className="flex  gap-4">
                    <span>{`T:${item.T}`}</span>
                    <span>{`P:${item.P}`}</span>
                    <span>{`C:${item.C}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Test2;
