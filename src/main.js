import { squareChanges } from "./imageHandling/squareChanges";

const testCvs = document.createElement("canvas");
testCvs.width = testCvs.height = 256;

const testCtx = testCvs.getContext("2d");
testCtx.fillStyle = "black";
testCtx.fillRect(0, 0, 128, 128);
testCtx.fillRect(128, 128, 128, 128);

document.body.appendChild(testCvs);

const testCvs2 = document.createElement("canvas");
testCvs2.width = testCvs2.height = 256;

const testCtx2 = testCvs2.getContext("2d");
testCtx2.fillStyle = "black";
testCtx2.fillRect(0, 0, 128, 128);

document.body.appendChild(testCvs2);

console.table(
  squareChanges(testCtx, testCtx2).map(
    ({ square: { code, row, file }, difference }) => ({
      code,
      row,
      file,
      difference
    })
  )
);
