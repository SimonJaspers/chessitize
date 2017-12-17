/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Trim a string using native trim
 *
 * @param {string} str
 * @return {string}
 */
const trim = str => str.trim();
/* unused harmony export trim */


/**
 * @param {*} x
 * @returns {boolean}
 */
const isObject = x => Object.prototype.toString.call(x) === "[object Object]";

/**
 * Maps arrays or objects
 * @param {function} f - a -> b
 * @param {*} functor
 * @returns {*}
 */
const map = (f, functor) => {
  if (Array.isArray(functor) || typeof f.map === "function")
    return functor.map(f);

  if (isObject(functor))
    return Object.entries(functor).reduce(
      (o, [k, v]) => Object.assign(o, { [k]: f(v) }),
      {}
    );

  return functor;
};
/* unused harmony export map */


/**
 * Filters arrays or objects.
 * @param {function} pred - Filter function of x -> bool
 * @param {*} filterable
 * @returns {*}
 */
const filter = (pred, filterable) => {
  if (Array.isArray(filterable) || typeof filterable.filter === "function")
    return filterable.filter(pred);

  if (isObject(filterable)) {
    return Object.entries(filterable).reduce(
      (o, [k, v]) => Object.assign(o, pred(v) ? { [k]: v } : {}),
      {}
    );
  }

  return filterable;
};
/* unused harmony export filter */


/**
 * Create a range of numbers, starting at 1
 * @param {number} n - The length/end of the range
 * @returns {[number]}
 */
const range = n => Array.from({ length: n }, (_, i) => i);
/* harmony export (immutable) */ __webpack_exports__["a"] = range;


/**
 * Returns a list of all combinations of two arrays
 * @param {[*]} xs
 * @param {[*]} ys
 * @returns {[[*]]}
 */
const xProd = (xs, ys) =>
  xs.reduce((acc, x) => acc.concat(ys.map(y => [x, y])), []);
/* unused harmony export xProd */


/**
 *
 * @param {string} key
 * @returns {function}
 */
const prop = key => obj => obj[key];
/* unused harmony export prop */


/**
 * Compose 2
 * @param {function} f
 * @param {function} g
 * @returns {function}
 */
const compose = (f, g) => x => f(g(x));
/* unused harmony export compose */



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageHandling_squareChanges__ = __webpack_require__(2);


const pointReducer = (acc, { x, y }) => acc.concat(x, y);

/**
 * @param {[{x, y}]} refPoints
 * @param {Image} img
 * @returns {DataURL}
 */
const perspectiveTransform = (refPoints, img) => {
  const cvs = fx.canvas();

  const from = refPoints.reduce(pointReducer, []);
  const to = [0, 256, 0, 0, 256, 0, 256, 256];

  return cvs
    .draw(cvs.texture(img))
    .perspective(from, to)
    .update()
    .toDataURL();
};

/**
 * @param {DataURL} dataURL
 * @returns {ko.observable}
 */
const crop = (dataURL, writeTo) => {
  const img = new Image();
  const cvs = document.createElement("canvas");
  cvs.width = 256;
  cvs.height = 256;
  const ctx = cvs.getContext("2d");

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    writeTo(cvs.toDataURL());
  };
  img.src = dataURL;

  return writeTo;
};

const BoardImage = imgFile => {
  const transformFrom = ko.observableArray([
    { x: 0, y: 256 },
    { x: 0, y: 0 },
    { x: 256, y: 0 },
    { x: 256, y: 256 }
  ]);
  const fourPoints = ko.observableArray([]);
  // Write from points to transformFrom every 4th item
  fourPoints.subscribe(points => {
    if (points.length === 4) {
      transformFrom(points);
      fourPoints([]);
    }
  });

  const myCrop = ko.observable();
  // Link a virtual img
  const img = new Image();

  const redraw = transform => {
    crop(perspectiveTransform(transform, img), myCrop);
  };

  transformFrom.subscribe(redraw);

  // Load initial image
  img.onload = () => redraw(transformFrom());
  img.src = URL.createObjectURL(imgFile);

  return {
    original: img.src,
    crop: myCrop,
    onClick: (d, e) => {
      const bbox = e.target.getBoundingClientRect();
      fourPoints.push({
        x: e.clientX - bbox.x,
        y: e.clientY - bbox.y
      });
    }
  };
};

const images = ko.observableArray([]);

const onNewFiles = (d, e) => {
  images(Array.from(e.target.files).map(BoardImage));
};

ko.applyBindings({ onNewFiles, images });


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Square__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



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
const squareChanges = (ctxBefore, ctxAfter) => {
  // Note: (Simon) The board has to be square
  const squareSize = ctxBefore.canvas.width / 8;

  const changes = __WEBPACK_IMPORTED_MODULE_0__Square__["a" /* default */].allInBoard().map(square => {
    const before = getImageDataForSquare(square, squareSize, ctxBefore);
    const after = getImageDataForSquare(square, squareSize, ctxAfter);

    return {
      square,
      before,
      after,
      difference: totalDiff(before.data, after.data)
    };
  });

  return changes;
};
/* unused harmony export squareChanges */



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const rowOrder = "87654321";
const fileOrder = "abcdefgh";

/**
 * Represents a square in a chess board without its contents
 *
 * @typedef {Object} Square
 * @property {number} row
 * @property {number} file
 * @property {string} code - Name of the square
 * @property {[number]} coord - row and file nrs in array
 * @property {boolean} inBounds - is this a legal square
 */

/**
 * Create a square by row and file nr.
 *
 * @param {number} rowNr
 * @param {number} fileNr
 * @returns {Square}
 */
const Square = (rowNr, fileNr) => ({
  row: rowNr,
  file: fileNr,
  code: `${fileOrder[fileNr]}${rowOrder[rowNr]}`,
  coord: [rowNr, fileNr],
  inBounds: rowNr >= 0 && rowNr <= 7 && fileNr >= 0 && fileNr <= 7
});

/**
 * Create the square for a square name
 * @param {string} code
 * @returns {Square}
 */
Square.fromCode = code =>
  Square(rowOrder.indexOf(code[1]), fileOrder.indexOf(code[0]));

/**
 * Create the square for a coordinate array
 * @param {[number]} coords - [rowNr, fileNr]
 */
Square.fromCoord = ([rowNr, fileNr]) => Square(rowNr, fileNr);

/**
 * Returns a new square based on an old square and a delta
 *
 * @param {Square} square - The reference square
 * @param {[number]} delta - The dRow and dFile to translate
 * @returns {Square}
 */
Square.relativeFrom = ({ row, file }, [dRow, dFile]) =>
  Square(row + dRow, file + dFile);

/**
 * Returns a square for an index starting left to right, top to bottom
 * @param {Number} i
 * @returns {Square}
 */
Square.fromIndex = i => Square(Math.floor(i / 8), i % 8);

/**
 * Return a list of all the squares in a chess board
 * @returns {[Square]}
 */
Square.allInBoard = () =>
  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* range */])(64)
    .map(i => [Math.floor(i / 8), i % 8])
    .map(Square.fromCoord);

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzlmMDRiMWZmOGQwMDY4MWM2MzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3NxdWFyZUNoYW5nZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsRUFBRTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLFlBQVk7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsRUFBRTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWlELFNBQVMsS0FBSztBQUMvRDtB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WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzOWYwNGIxZmY4ZDAwNjgxYzYzNSIsIi8qKlxuICogVHJpbSBhIHN0cmluZyB1c2luZyBuYXRpdmUgdHJpbVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHRyaW0gPSBzdHIgPT4gc3RyLnRyaW0oKTtcblxuLyoqXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc09iamVjdCA9IHggPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuXG4vKipcbiAqIE1hcHMgYXJyYXlzIG9yIG9iamVjdHNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGYgLSBhIC0+IGJcbiAqIEBwYXJhbSB7Kn0gZnVuY3RvclxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSAoZiwgZnVuY3RvcikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdG9yKSB8fCB0eXBlb2YgZi5tYXAgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZnVuY3Rvci5tYXAoZik7XG5cbiAgaWYgKGlzT2JqZWN0KGZ1bmN0b3IpKVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhmdW5jdG9yKS5yZWR1Y2UoXG4gICAgICAobywgW2ssIHZdKSA9PiBPYmplY3QuYXNzaWduKG8sIHsgW2tdOiBmKHYpIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiBmdW5jdG9yO1xufTtcblxuLyoqXG4gKiBGaWx0ZXJzIGFycmF5cyBvciBvYmplY3RzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZCAtIEZpbHRlciBmdW5jdGlvbiBvZiB4IC0+IGJvb2xcbiAqIEBwYXJhbSB7Kn0gZmlsdGVyYWJsZVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAocHJlZCwgZmlsdGVyYWJsZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJhYmxlKSB8fCB0eXBlb2YgZmlsdGVyYWJsZS5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZmlsdGVyYWJsZS5maWx0ZXIocHJlZCk7XG5cbiAgaWYgKGlzT2JqZWN0KGZpbHRlcmFibGUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGZpbHRlcmFibGUpLnJlZHVjZShcbiAgICAgIChvLCBbaywgdl0pID0+IE9iamVjdC5hc3NpZ24obywgcHJlZCh2KSA/IHsgW2tdOiB2IH0gOiB7fSksXG4gICAgICB7fVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyYWJsZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmFuZ2Ugb2YgbnVtYmVycywgc3RhcnRpbmcgYXQgMVxuICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbGVuZ3RoL2VuZCBvZiB0aGUgcmFuZ2VcbiAqIEByZXR1cm5zIHtbbnVtYmVyXX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJhbmdlID0gbiA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBuIH0sIChfLCBpKSA9PiBpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgY29tYmluYXRpb25zIG9mIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7WypdfSB4c1xuICogQHBhcmFtIHtbKl19IHlzXG4gKiBAcmV0dXJucyB7W1sqXV19XG4gKi9cbmV4cG9ydCBjb25zdCB4UHJvZCA9ICh4cywgeXMpID0+XG4gIHhzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KHlzLm1hcCh5ID0+IFt4LCB5XSkpLCBbXSk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHByb3AgPSBrZXkgPT4gb2JqID0+IG9ialtrZXldO1xuXG4vKipcbiAqIENvbXBvc2UgMlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZ1xuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9IChmLCBnKSA9PiB4ID0+IGYoZyh4KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzcXVhcmVDaGFuZ2VzIH0gZnJvbSBcIi4vaW1hZ2VIYW5kbGluZy9zcXVhcmVDaGFuZ2VzXCI7XG5cbmNvbnN0IHBvaW50UmVkdWNlciA9IChhY2MsIHsgeCwgeSB9KSA9PiBhY2MuY29uY2F0KHgsIHkpO1xuXG4vKipcbiAqIEBwYXJhbSB7W3t4LCB5fV19IHJlZlBvaW50c1xuICogQHBhcmFtIHtJbWFnZX0gaW1nXG4gKiBAcmV0dXJucyB7RGF0YVVSTH1cbiAqL1xuY29uc3QgcGVyc3BlY3RpdmVUcmFuc2Zvcm0gPSAocmVmUG9pbnRzLCBpbWcpID0+IHtcbiAgY29uc3QgY3ZzID0gZnguY2FudmFzKCk7XG5cbiAgY29uc3QgZnJvbSA9IHJlZlBvaW50cy5yZWR1Y2UocG9pbnRSZWR1Y2VyLCBbXSk7XG4gIGNvbnN0IHRvID0gWzAsIDI1NiwgMCwgMCwgMjU2LCAwLCAyNTYsIDI1Nl07XG5cbiAgcmV0dXJuIGN2c1xuICAgIC5kcmF3KGN2cy50ZXh0dXJlKGltZykpXG4gICAgLnBlcnNwZWN0aXZlKGZyb20sIHRvKVxuICAgIC51cGRhdGUoKVxuICAgIC50b0RhdGFVUkwoKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtEYXRhVVJMfSBkYXRhVVJMXG4gKiBAcmV0dXJucyB7a28ub2JzZXJ2YWJsZX1cbiAqL1xuY29uc3QgY3JvcCA9IChkYXRhVVJMLCB3cml0ZVRvKSA9PiB7XG4gIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICBjb25zdCBjdnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICBjdnMud2lkdGggPSAyNTY7XG4gIGN2cy5oZWlnaHQgPSAyNTY7XG4gIGNvbnN0IGN0eCA9IGN2cy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgd3JpdGVUbyhjdnMudG9EYXRhVVJMKCkpO1xuICB9O1xuICBpbWcuc3JjID0gZGF0YVVSTDtcblxuICByZXR1cm4gd3JpdGVUbztcbn07XG5cbmNvbnN0IEJvYXJkSW1hZ2UgPSBpbWdGaWxlID0+IHtcbiAgY29uc3QgdHJhbnNmb3JtRnJvbSA9IGtvLm9ic2VydmFibGVBcnJheShbXG4gICAgeyB4OiAwLCB5OiAyNTYgfSxcbiAgICB7IHg6IDAsIHk6IDAgfSxcbiAgICB7IHg6IDI1NiwgeTogMCB9LFxuICAgIHsgeDogMjU2LCB5OiAyNTYgfVxuICBdKTtcbiAgY29uc3QgZm91clBvaW50cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG4gIC8vIFdyaXRlIGZyb20gcG9pbnRzIHRvIHRyYW5zZm9ybUZyb20gZXZlcnkgNHRoIGl0ZW1cbiAgZm91clBvaW50cy5zdWJzY3JpYmUocG9pbnRzID0+IHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdHJhbnNmb3JtRnJvbShwb2ludHMpO1xuICAgICAgZm91clBvaW50cyhbXSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBteUNyb3AgPSBrby5vYnNlcnZhYmxlKCk7XG4gIC8vIExpbmsgYSB2aXJ0dWFsIGltZ1xuICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICBjb25zdCByZWRyYXcgPSB0cmFuc2Zvcm0gPT4ge1xuICAgIGNyb3AocGVyc3BlY3RpdmVUcmFuc2Zvcm0odHJhbnNmb3JtLCBpbWcpLCBteUNyb3ApO1xuICB9O1xuXG4gIHRyYW5zZm9ybUZyb20uc3Vic2NyaWJlKHJlZHJhdyk7XG5cbiAgLy8gTG9hZCBpbml0aWFsIGltYWdlXG4gIGltZy5vbmxvYWQgPSAoKSA9PiByZWRyYXcodHJhbnNmb3JtRnJvbSgpKTtcbiAgaW1nLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoaW1nRmlsZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBvcmlnaW5hbDogaW1nLnNyYyxcbiAgICBjcm9wOiBteUNyb3AsXG4gICAgb25DbGljazogKGQsIGUpID0+IHtcbiAgICAgIGNvbnN0IGJib3ggPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGZvdXJQb2ludHMucHVzaCh7XG4gICAgICAgIHg6IGUuY2xpZW50WCAtIGJib3gueCxcbiAgICAgICAgeTogZS5jbGllbnRZIC0gYmJveC55XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBpbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG5jb25zdCBvbk5ld0ZpbGVzID0gKGQsIGUpID0+IHtcbiAgaW1hZ2VzKEFycmF5LmZyb20oZS50YXJnZXQuZmlsZXMpLm1hcChCb2FyZEltYWdlKSk7XG59O1xuXG5rby5hcHBseUJpbmRpbmdzKHsgb25OZXdGaWxlcywgaW1hZ2VzIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuaW1wb3J0IHsgcmFuZ2UgfSBmcm9tIFwiLi8uLi91dGlsc1wiO1xuXG4vLyBOb3RlOiAoU2ltb24pIElmIHdlIHdhbnQgdG8gdGVzdCB0aGlzLCB3ZSBtaWdodCB3YW50IHRvIHVzZTpcbi8vICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZ2V0LWltYWdlLWRhdGFcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKi9cbmNvbnN0IGdldEltYWdlRGF0YUZvclNxdWFyZSA9IChzcXVhcmUsIHNxdWFyZVNpemUsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZS5yb3cgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFic29sdXRlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gYXJyYXlzIGJ5IHN1bW1pbmcgZXZlcnkgaW5kZXhcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSBbTnVtYmVyXX0gYXJyMlxuICogQHJldHVybnMgTnVtYmVyXG4gKi9cbmNvbnN0IHRvdGFsRGlmZiA9IChhcnIxLCBhcnIyKSA9PiB7XG4gIGNvbnN0IGwgPSBNYXRoLm1heChhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBsZXQgZCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBkICs9IE1hdGguYWJzKChhcnIxW2ldIHx8IDApIC0gKGFycjJbaV0gfHwgMCkpO1xuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QmVmb3JlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QWZ0ZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHNxdWFyZUNoYW5nZXMgPSAoY3R4QmVmb3JlLCBjdHhBZnRlcikgPT4ge1xuICAvLyBOb3RlOiAoU2ltb24pIFRoZSBib2FyZCBoYXMgdG8gYmUgc3F1YXJlXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBjdHhCZWZvcmUuY2FudmFzLndpZHRoIC8gODtcblxuICBjb25zdCBjaGFuZ2VzID0gU3F1YXJlLmFsbEluQm9hcmQoKS5tYXAoc3F1YXJlID0+IHtcbiAgICBjb25zdCBiZWZvcmUgPSBnZXRJbWFnZURhdGFGb3JTcXVhcmUoc3F1YXJlLCBzcXVhcmVTaXplLCBjdHhCZWZvcmUpO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0SW1hZ2VEYXRhRm9yU3F1YXJlKHNxdWFyZSwgc3F1YXJlU2l6ZSwgY3R4QWZ0ZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogdG90YWxEaWZmKGJlZm9yZS5kYXRhLCBhZnRlci5kYXRhKVxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHJvd09yZGVyID0gXCI4NzY1NDMyMVwiO1xuY29uc3QgZmlsZU9yZGVyID0gXCJhYmNkZWZnaFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzcXVhcmUgaW4gYSBjaGVzcyBib2FyZCB3aXRob3V0IGl0cyBjb250ZW50c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNxdWFyZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2RlIC0gTmFtZSBvZiB0aGUgc3F1YXJlXG4gKiBAcHJvcGVydHkge1tudW1iZXJdfSBjb29yZCAtIHJvdyBhbmQgZmlsZSBucnMgaW4gYXJyYXlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5Cb3VuZHMgLSBpcyB0aGlzIGEgbGVnYWwgc3F1YXJlXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBzcXVhcmUgYnkgcm93IGFuZCBmaWxlIG5yLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3dOclxuICogQHBhcmFtIHtudW1iZXJ9IGZpbGVOclxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuY29uc3QgU3F1YXJlID0gKHJvd05yLCBmaWxlTnIpID0+ICh7XG4gIHJvdzogcm93TnIsXG4gIGZpbGU6IGZpbGVOcixcbiAgY29kZTogYCR7ZmlsZU9yZGVyW2ZpbGVOcl19JHtyb3dPcmRlcltyb3dOcl19YCxcbiAgY29vcmQ6IFtyb3dOciwgZmlsZU5yXSxcbiAgaW5Cb3VuZHM6IHJvd05yID49IDAgJiYgcm93TnIgPD0gNyAmJiBmaWxlTnIgPj0gMCAmJiBmaWxlTnIgPD0gN1xufSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgc3F1YXJlIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUNvZGUgPSBjb2RlID0+XG4gIFNxdWFyZShyb3dPcmRlci5pbmRleE9mKGNvZGVbMV0pLCBmaWxlT3JkZXIuaW5kZXhPZihjb2RlWzBdKSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgY29vcmRpbmF0ZSBhcnJheVxuICogQHBhcmFtIHtbbnVtYmVyXX0gY29vcmRzIC0gW3Jvd05yLCBmaWxlTnJdXG4gKi9cblNxdWFyZS5mcm9tQ29vcmQgPSAoW3Jvd05yLCBmaWxlTnJdKSA9PiBTcXVhcmUocm93TnIsIGZpbGVOcik7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBzcXVhcmUgYmFzZWQgb24gYW4gb2xkIHNxdWFyZSBhbmQgYSBkZWx0YVxuICpcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgLSBUaGUgcmVmZXJlbmNlIHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGVsdGEgLSBUaGUgZFJvdyBhbmQgZEZpbGUgdG8gdHJhbnNsYXRlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUucmVsYXRpdmVGcm9tID0gKHsgcm93LCBmaWxlIH0sIFtkUm93LCBkRmlsZV0pID0+XG4gIFNxdWFyZShyb3cgKyBkUm93LCBmaWxlICsgZEZpbGUpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzcXVhcmUgZm9yIGFuIGluZGV4IHN0YXJ0aW5nIGxlZnQgdG8gcmlnaHQsIHRvcCB0byBib3R0b21cbiAqIEBwYXJhbSB7TnVtYmVyfSBpXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUluZGV4ID0gaSA9PiBTcXVhcmUoTWF0aC5mbG9vcihpIC8gOCksIGkgJSA4KTtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCB0aGUgc3F1YXJlcyBpbiBhIGNoZXNzIGJvYXJkXG4gKiBAcmV0dXJucyB7W1NxdWFyZV19XG4gKi9cblNxdWFyZS5hbGxJbkJvYXJkID0gKCkgPT5cbiAgcmFuZ2UoNjQpXG4gICAgLm1hcChpID0+IFtNYXRoLmZsb29yKGkgLyA4KSwgaSAlIDhdKVxuICAgIC5tYXAoU3F1YXJlLmZyb21Db29yZCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNxdWFyZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1NxdWFyZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9