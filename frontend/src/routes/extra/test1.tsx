import PageContainer from "@/components/pageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function Test1() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [waterCount, setWaterCount] = useState<number>(0);
  const onGenerate = () => {
    if (!value || value.trim() === "") {
      setError("Please enter a value");
      setMatrix([]);
      setWaterCount(0);
      return;
    } else {
      setError(null);
    }
    let _err = "";
    let highestWallHight = 0;
    const values = value
      .split(",")
      .map((v) => {
        const num = parseInt(v.trim());
        if (isNaN(num)) {
          _err = "Please enter a valid number";
          return "";
        }
        if (num < 0 || num > 100) {
          _err = "Please enter a number between 0 and 100";
          return "";
        }
        if (num > highestWallHight) {
          highestWallHight = num;
        }
        return num;
      })
      .filter((v) => v !== "");
    if (_err) {
      setError(_err);
      setMatrix([]);
      setWaterCount(0);
      return;
    } else if (values.length === 0) {
      setError("Please enter a valid value");
      return;
    }
    generateMatrix(values, highestWallHight);
  };

  const generateMatrix = (values: number[], highestWallHight: number) => {
    const xCount = values.length;
    const yCount = highestWallHight;
    const matrix = new Array(yCount + 1)
      .fill(0)
      .map(() => new Array(xCount + 2).fill(0));
    let currentWaterCount = 0;
    for (let i = 1; i < xCount + 1; i++) {
      const wallHeight = values[i - 1];
      if (wallHeight > 0) {
        for (let j = highestWallHight; j > highestWallHight - wallHeight; j--) {
          matrix[j][i] = 1;
        }
      } else {
        let waterHeight = 0;
        //has left wall
        for (let j = i - 1; j > 1; j--) {
          const prevWallHeight = values[j - 1];
          if (prevWallHeight === 0) {
            continue;
          } else {
            waterHeight = prevWallHeight;
            break;
          }
        }
        //has right wall
        if (waterHeight !== 0) {
          for (let j = i; j < values.length + 1; j++) {
            const nextWallHeight = values[j];
            if (nextWallHeight === undefined) {
              waterHeight = 0;
              break;
            }
            if (nextWallHeight === 0) {
              continue;
            } else {
              waterHeight = Math.min(waterHeight, nextWallHeight);
              break;
            }
          }
        }
        if (waterHeight > 0) {
          for (let j = 0; j < waterHeight; j++) {
            matrix[yCount - j][i] = 2;
            currentWaterCount++;
          }
        }
      }
    }
    setWaterCount(currentWaterCount);
    setMatrix(matrix);
  };

  //0,4,0,0,0,6,0,6,4,0,1,0,2
  return (
    <PageContainer>
      <div className="size-full  flex justify-center p-10">
        <div className="size-full  flex flex-col items-center">
          <div className="flex flex-col gap-4 w-2xl">
            <Label>Enter Value</Label>
            <Input
              placeholder={`enter value like 0,5,0,0,4,6`}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="default" className="w-full" onClick={onGenerate}>
              Generate
            </Button>
            {error && (
              <div>
                <span className="text-red-500">{error}</span>
              </div>
            )}
          </div>
          <div className="flex mt-4 flex-col gap-4 ">
            <div className="flex items-center justify-center w-full">
              <span className="text-xl font-bold">
                Water Count: {waterCount}
              </span>
            </div>
            {matrix && matrix.length > 0 && (
              <table className=" border-gray-500">
                <tbody>
                  {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`border-2 border-gray-500 p-4 w-20 ${
                            cell === 1
                              ? "bg-yellow-500"
                              : cell === 2
                              ? "bg-blue-500"
                              : "bg-white"
                          }`}
                        ></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {matrix && matrix.length > 0 && (
              <table className=" border-gray-500">
                <tbody>
                  {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`border-2 border-gray-500 p-4 w-20 ${
                            cell === 1
                              ? "bg-white"
                              : cell === 2
                              ? "bg-blue-500"
                              : "bg-white"
                          }`}
                        ></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Test1;
