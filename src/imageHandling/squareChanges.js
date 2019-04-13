import Square from "./../Square";
import { range } from "./../utils";

const sum = (x, y) => x + y;

// Note: (Simon) If we want to test this, we might want to use:
//               https://www.npmjs.com/package/get-image-data

/**
 *
 * @param {Square} square
 * @param {CanvasRenderingContext2D} boardCtx
 */
const getImageDataForSquare = (square, squareSize, boardCtx) =>
  boardCtx.getImageData(
    square.file * squareSize,
    square.row * squareSize,
    squareSize,
    squareSize
  );

/**
 *
 * @param {Square} square
 * @param {Number} squareSize
 * @param {Number} cutOff Between 0 and 1
 * @param {CanvasRenderingContext2D} boardCtx
 * @returns {ImageData}
 */
const getCenterImageDataForSquare = (square, squareSize, cutOff, boardCtx) =>
  boardCtx.getImageData(
    square.file * squareSize + squareSize * cutOff,
    square.row * squareSize + squareSize * cutOff,
    squareSize - 2 * cutOff * squareSize,
    squareSize - 2 * cutOff * squareSize
  );

/**
 * Calculates the absolute difference between two arrays by summing every index
 * @param {[Number]} arr1
 * @param [Number]} arr2
 * @returns Number
 */
const totalDiff = (arr1, arr2) => {
  const l = Math.max(arr1.length, arr2.length);
  let d = 0;

  for (let i = 0; i < l; i += 1) {
    d += Math.abs((arr1[i] || 0) - (arr2[i] || 0));
  }

  return d;
};

/**
 *
 * @param {CanvasRenderingContext2D} ctxBefore
 * @param {CanvasRenderingContext2D} ctxAfter
 */
const centerAbsPixelDiff = (ctxBefore, ctxAfter) => {
  // Note: (Simon) The board has to be square
  const squareSize = ctxBefore.canvas.width / 8;

  const changes = Square.allInBoard().map(square => {
    const before = getCenterImageDataForSquare(
      square,
      squareSize,
      0.25,
      ctxBefore
    );
    const after = getCenterImageDataForSquare(
      square,
      squareSize,
      0.25,
      ctxAfter
    );

    return {
      square,
      before,
      after,
      difference: totalDiff(before.data, after.data)
    };
  });

  return changes;
};

/**
 * Returns an array of grey scale values (0 - 255) ignoring the
 * alpha channel
 * @param {[Number]} rgbaValues
 * @returns {[Number]}
 */
const rgbaToGreyScaleValues = rgbaValues => {
  const result = [];

  for (let i = 0; i < rgbaValues.length; i += 4) {
    result.push(
      Math.floor((rgbaValues[i] + rgbaValues[i + 1] + rgbaValues[i + 2]) / 3)
    );
  }

  return result;
};

/**
 *
 * @param {Number} threshold
 * @param {Number} pxPerRow
 * @param {[Number]} greyScaleData
 * @param {Number} pxNr
 * @returns {Number}
 */
const edgeValue = (threshold, pxPerRow, greyScaleData, pxNr) => {
  const rowSize = pxPerRow;
  let result = 0;

  const top = greyScaleData[pxNr - rowSize];
  const bottom = greyScaleData[pxNr + rowSize];
  const left = greyScaleData[pxNr - 1];
  const right = greyScaleData[pxNr + 1];

  // Pixels on edge of canvas
  if (
    top === undefined ||
    bottom === undefined ||
    left === undefined ||
    right === undefined
  )
    return 0;

  const v = greyScaleData[pxNr];
  if (Math.abs(v - top) > threshold) result += 1;
  if (Math.abs(v - bottom) > threshold) result += 1;
  if (Math.abs(v - left) > threshold) result += 1;
  if (Math.abs(v - right) > threshold) result += 1;

  return result;
};

/**
 *
 * @param {[Number]} arr1
 * @param {[Number]} arr2
 * @returns {Number}
 */
const sumDiff = (arr1, arr2) => Math.abs(arr1.reduce(sum) - arr2.reduce(sum));

const edgePixelCountDiff = (ctxBefore, ctxAfter) => {
  // Note: (Simon) The board has to be square
  const squareSize = ctxBefore.canvas.width / 8;
  const PADDING = 0.0625; // Has to result in round nr!
  const innerSquareSize = squareSize - 2 * PADDING * squareSize;
  const THRESHOLD = 15;

  const changes = Square.allInBoard().map(square => {
    const before = getCenterImageDataForSquare(
      square,
      squareSize,
      PADDING,
      ctxBefore
    );
    const after = getCenterImageDataForSquare(
      square,
      squareSize,
      PADDING,
      ctxAfter
    );

    const gsBefore = rgbaToGreyScaleValues(before.data);
    const gsAfter = rgbaToGreyScaleValues(after.data);

    const edgesBefore = gsBefore.map((v, i, all) =>
      edgeValue(THRESHOLD, innerSquareSize, all, i)
    );

    const edgesAfter = gsAfter.map((v, i, all) =>
      edgeValue(THRESHOLD, innerSquareSize, all, i)
    );

    const debugOverlay = document.createElement("canvas");
    debugOverlay.width = debugOverlay.height = innerSquareSize;

    const overlayImagedata = new ImageData(
      new Uint8ClampedArray(before.width * before.height * 4),
      before.width,
      before.height
    );
    
    edgesBefore.forEach((v, i) => {
      if (v === 0) return;
      i *= 4;
      overlayImagedata.data[i + 0] = 255;
      overlayImagedata.data[i + 1] = 0;
      overlayImagedata.data[i + 2] = 0;
      overlayImagedata.data[i + 3] = 255;
    });

    edgesAfter.forEach((v, i) => {
      if (v === 0) return;
      i *= 4;
      overlayImagedata.data[i + 0] = 0;
      overlayImagedata.data[i + 1] = 255;
      overlayImagedata.data[i + 2] = 0;
      overlayImagedata.data[i + 3] = 255;
    });

    debugOverlay.getContext("2d").putImageData(overlayImagedata, 0, 0);

    return {
      square,
      before,
      after,
      difference: sumDiff(edgesBefore, edgesAfter),
      debugOverlay
    };
  });

  return changes;
};

//export const squareChanges = centerAbsPixelDiff;
export const squareChanges = edgePixelCountDiff;
