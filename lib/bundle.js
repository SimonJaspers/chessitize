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
/* harmony export (immutable) */ __webpack_exports__["b"] = trim;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageHandling_crop__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageHandling_perspectiveTransform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FEN__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Moves__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GameState__ = __webpack_require__(10);









const BoardImage = (imgFile, transformFrom) => {
  const fourPoints = ko.observableArray([]);
  // Write from points to transformFrom every 4th item
  fourPoints.subscribe(points => {
    if (points.length === 4) {
      transformFrom(points);
      fourPoints([]);
    }
  });

  const myCrop = ko.observable();
  const cropDataURL = ko.pureComputed(
    () => (myCrop() ? myCrop().toDataURL() : null)
  );

  // Link a virtual img
  const img = new Image();

  const redraw = transform => {
    Object(__WEBPACK_IMPORTED_MODULE_1__imageHandling_crop__["a" /* crop */])(Object(__WEBPACK_IMPORTED_MODULE_2__imageHandling_perspectiveTransform__["a" /* perspectiveTransform */])(transform, img), myCrop);
  };

  transformFrom.subscribe(redraw);

  // Load initial image
  img.onload = () => redraw(transformFrom());
  img.src = URL.createObjectURL(imgFile);

  const gameState = ko.observable(Object(__WEBPACK_IMPORTED_MODULE_5__GameState__["d" /* default */])());
  const board = ko.pureComputed(() => gameState().board);

  return {
    gameState,
    board,
    imageVisible: ko.observable(true),
    original: img.src,
    crop: cropDataURL,
    cropCvs: myCrop,
    onClick: (d, e) => {
      const bbox = e.target.getBoundingClientRect();
      fourPoints.push({
        x: e.clientX - bbox.x,
        y: e.clientY - bbox.y
      });
    }
  };
};

const App = function() {
  const transformFrom = ko.observableArray([
    { x: 8, y: 451 },
    { x: 23, y: 17 },
    { x: 453, y: 24 },
    { x: 449, y: 453 }
  ]);

  this.toggleImages = () => {
    this.images().forEach(bi => bi.imageVisible(!bi.imageVisible()));
  };

  this.images = ko.observableArray([]);
  this.onNewFiles = (d, e) => {
    this.images(
      Array.from(e.target.files).map(img => BoardImage(img, transformFrom))
    );
  };

  const getBestGuess = (imgBefore, imgAfter) => {
    const ctxBefore = imgBefore.cropCvs().getContext("2d");
    const ctxAfter = imgAfter.cropCvs().getContext("2d");

    const changes = Object(__WEBPACK_IMPORTED_MODULE_0__imageHandling_squareChanges__["a" /* squareChanges */])(ctxBefore, ctxAfter);

    const gameStateBefore = imgBefore.gameState();
    const allowedMoves = Object(__WEBPACK_IMPORTED_MODULE_4__Moves__["b" /* getAllLegalMoves */])(gameStateBefore);

    const possibilities = allowedMoves
      .map(move => {
        const fromSquareChange = changes[move.from.index].difference;
        const toSquareChange = changes[move.to.index].difference;

        return {
          move,
          fromSquareChange,
          toSquareChange,
          totalChange: fromSquareChange + toSquareChange,
          from: move.from.code,
          to: move.to.code
        };
      })
      .sort((p1, p2) => p2.totalChange - p1.totalChange);

    return possibilities[0];
  };

  this.analyze = () => {
    const pairs = this.images().reduce((pairs, img, i, imgs) => {
      if (imgs[i + 1]) pairs.push([img, imgs[i + 1]]);
      return pairs;
    }, []);

    this.images().forEach((img, i) => {
      // Last board
      if (!pairs[i]) return;

      const before = pairs[i][0];
      const after = pairs[i][1];

      const move = getBestGuess(before, after).move;

      after.gameState(Object(__WEBPACK_IMPORTED_MODULE_5__GameState__["a" /* applyMoveToGameState */])(before.gameState(), move));
    });
  };
};

ko.applyBindings(new App());


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
/* harmony export (immutable) */ __webpack_exports__["a"] = squareChanges;



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
  index: rowNr * 8 + fileNr,
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    writeTo(cvs);
  };
  img.src = dataURL;

  return writeTo;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = crop;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = perspectiveTransform;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Returns a board that holds a default start position
 * @returns {[[string]]}
 */
const StartPosition = () => [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
];
/* harmony export (immutable) */ __webpack_exports__["a"] = StartPosition;


const clone = board => board.slice(0).map(row => row.slice(0));

/**
 * Returns the piece (" " if empty) at a position in a board
 * @param {[[string]]} board 
 * @param {Square} square 
 * @returns {string}
 */
const getPieceAtSquare = (board, square) =>
  board[square.row][square.file];
/* harmony export (immutable) */ __webpack_exports__["b"] = getPieceAtSquare;


/**
 * Sets the square in a board to a (piece/empty) string
 *
 * @param {[[string]]} board 
 * @param {Square} square 
 * @param {string} value 
 */
const setSquareString = (board, square, value) => {
  const newBoard = clone(board);
  newBoard[square.row][square.file] = value;
  return newBoard;
};

/**
 * Returns a new piece in which the fromSquare is empty, and
 * the toSquare has the moved piece. Note: this function does
 * not perform any validity checks
 * 
 * @param {[[string]]} board 
 * @param {Square} fromSquare 
 * @param {Square} toSquare 
 * @returns {[[string]]}
 */
const movePieceInBoard = (board, fromSquare, toSquare) =>
  setSquareString(
    setSquareString(board, fromSquare, " "), // Board without fromSquare
    toSquare,
    getPieceAtSquare(board, fromSquare) // Get value from old square
  );
/* harmony export (immutable) */ __webpack_exports__["c"] = movePieceInBoard;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @param {string} piece
 * @returns {boolean}
 */
const pieceIsEmpty = piece => piece === " ";
/* harmony export (immutable) */ __webpack_exports__["c"] = pieceIsEmpty;


/**
 * @param {string} piece
 * @returns {boolean}
 */
const pieceIsWhite = piece =>
  !!piece && !pieceIsEmpty(piece) && piece.toUpperCase() === piece;
/* harmony export (immutable) */ __webpack_exports__["d"] = pieceIsWhite;


/**
 * @param {string} piece
 * @returns {boolean}
 */
const pieceIsBlack = piece =>
  !!piece && !pieceIsEmpty(piece) && piece.toLowerCase() === piece;
/* harmony export (immutable) */ __webpack_exports__["b"] = pieceIsBlack;


/**
 * @param {string} p1
 * @param {string} p2
 * @returns {boolean}
 */
const piecesAreSameColor = (p1, p2) =>
  (pieceIsWhite(p1) && pieceIsWhite(p2)) ||
  (pieceIsBlack(p1) && pieceIsBlack(p2));
/* harmony export (immutable) */ __webpack_exports__["e"] = piecesAreSameColor;


/**
 * @param {string} p1
 * @param {string} p2
 * @returns {boolean}
 */
const pieceCanTakePiece = (p1, p2) =>
  (pieceIsWhite(p1) && pieceIsBlack(p2)) ||
  (pieceIsBlack(p1) && pieceIsWhite(p2));
/* harmony export (immutable) */ __webpack_exports__["a"] = pieceCanTakePiece;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameState__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Square__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moves_pawn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__moves_knight__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__moves_king__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__piece__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__moves_bishop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__moves_queen__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__moves_rook__ = __webpack_require__(13);














/**
 * Returns a list of possible moves for a piece on a square
 * in a game
 * @param {GameState} state
 * @param {Square} square
 * @param {string} piece
 * @returns {[Move]}
 */
const getMovesForPiece = (state, square, piece) => {
  switch (piece) {
    case "p":
    case "P":
      return Object(__WEBPACK_IMPORTED_MODULE_2__moves_pawn__["a" /* getPawnMoves */])(state, square);
    case "n":
    case "N":
      return Object(__WEBPACK_IMPORTED_MODULE_3__moves_knight__["a" /* getKnightMoves */])(state, square);
    case "k":
    case "K":
      return Object(__WEBPACK_IMPORTED_MODULE_4__moves_king__["a" /* getKingMoves */])(state, square);
    case "b":
    case "B":
      return Object(__WEBPACK_IMPORTED_MODULE_7__moves_bishop__["a" /* getBishopMoves */])(state, square);
    case "q":
    case "Q":
      return Object(__WEBPACK_IMPORTED_MODULE_8__moves_queen__["a" /* getQueenMoves */])(state, square);
    case "r":
    case "R":
      return Object(__WEBPACK_IMPORTED_MODULE_9__moves_rook__["a" /* getRookMoves */])(state, square);
    default:
      return [];
  }
};

/**
 * Move
 *
 * @typedef {Object} Move
 * @property {Square} from
 * @property {Square} to
 * @property {boolean} takes
 * @property {boolean} pawnMove
 * @property {boolean} takesKing
 * @property {boolean} castles
 *
 */

/**
 * Creates a move to help create a PGN step
 * @param {Square} from
 * @param {Square} to
 * @param {GameState} state
 * @returns {Move}
 */
const Move = (from, to, state) => ({
  from,
  to,
  takes: Object(__WEBPACK_IMPORTED_MODULE_5__piece__["a" /* pieceCanTakePiece */])(
    Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, from),
    Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, to)
  ),
  takesKing: Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, to).toLowerCase() === "k",
  pawnMove: Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, from).toLowerCase() === "p",
  castles:
    Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, from).toLowerCase() === "k" &&
    Math.abs(from.file - to.file) === 2
});
/* harmony export (immutable) */ __webpack_exports__["a"] = Move;


/**
 * Returns a series of moves a piece can make on a board.
 * Will not include castles or en passant, those are handled
 * seperately
 *
 * @param {GameState} state
 * @param {Square} square
 * @returns {[Move]}
 */
const getMoves = (state, square) => {
  const board = state.board;
  const piece = Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(board, square);

  if (piece === " ") return [];

  // Get all moves for the piece without worrying about illegal moves
  return getMovesForPiece(state, square, piece);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = getMoves;


/**
 * @param {GameState} state
 * @param {[string]} emptySquareCodes
 * @param {[string]} safeSquareCodes
 * @returns {boolean}
 */
const castlingPrevented = (state, emptySquareCodes, safeSquareCodes) => {
  const clearPath = emptySquareCodes
    .map(__WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].fromCode)
    .map(sq => Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, sq))
    .every(__WEBPACK_IMPORTED_MODULE_5__piece__["c" /* pieceIsEmpty */]);

  if (!clearPath) return true;

  const attackCeck = state.whiteToMove
    ? __WEBPACK_IMPORTED_MODULE_0__GameState__["c" /* blackPieceAttacksSquare */]
    : __WEBPACK_IMPORTED_MODULE_0__GameState__["f" /* whitePieceAttacksSquare */];

  const underAttack = safeSquareCodes
    .map(__WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].fromCode)
    .some(sq => attackCeck(state, sq));

  return underAttack;
};

const castleMoves = (state, square) => {
  const piece = Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, square);
  const moves = [];
  const opts = {
    K: {
      long: {
        path: ["b1", "c1", "d1"],
        safe: ["a1", "c1", "d1", "e1"]
      },
      short: {
        path: ["f1", "g1"],
        safe: ["f1", "g1", "h1", "e1"]
      }
    },
    k: {
      long: {
        path: ["b8", "c8", "d8"],
        safe: ["a8", "c8", "d8", "e8"]
      },
      short: {
        path: ["f8", "g8"],
        safe: ["f8", "g8", "h8", "e8"]
      }
    }
  };

  const canCastleLong = Object(__WEBPACK_IMPORTED_MODULE_5__piece__["b" /* pieceIsBlack */])(piece)
    ? state.blackCanCastleLong
    : state.whiteCanCastleLong;

  const canCastleShort = Object(__WEBPACK_IMPORTED_MODULE_5__piece__["b" /* pieceIsBlack */])(piece)
    ? state.blackCanCastleShort
    : state.whiteCanCastleShort;

  const longCastleOpts = opts[piece].long;
  const shortCastleOpts = opts[piece].short;

  if (
    canCastleLong &&
    !castlingPrevented(state, longCastleOpts.path, longCastleOpts.safe)
  ) {
    moves.push(Move(square, __WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].relativeFrom(square, [0, -2]), state));
  }

  if (
    canCastleShort &&
    !castlingPrevented(state, shortCastleOpts.path, shortCastleOpts.safe)
  ) {
    moves.push(Move(square, __WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].relativeFrom(square, [0, 2]), state));
  }

  return moves;
};

/**
 * Gets a list of legal moves for the piece on a square
 * @param {GameState} state
 * @param {Square} square
 * @returns {[Move]}
 */
const getLegalMoves = (state, square) => {
  const piece = Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, square);

  if (Object(__WEBPACK_IMPORTED_MODULE_5__piece__["b" /* pieceIsBlack */])(piece) && !state.blackToMove) return [];
  if (Object(__WEBPACK_IMPORTED_MODULE_5__piece__["d" /* pieceIsWhite */])(piece) && !state.whiteToMove) return [];

  let moves = getMoves(state, square);

  if (piece === "K" || piece === "k") {
    moves = moves.concat(castleMoves(state, square));
  }

  return moves.filter(move => !movePutsOwnKingInCheck(state, move));
};
/* unused harmony export getLegalMoves */


/**
 * Gets a list of all legal moves for a state
 * @param {GameState} state
 */
const getAllLegalMoves = state =>
  __WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].allInBoard().reduce(
    (moves, square) => moves.concat(getLegalMoves(state, square)),
    []
  );
/* harmony export (immutable) */ __webpack_exports__["b"] = getAllLegalMoves;


/**
 * @param {GameState} state
 * @param {Move} move
 * @returns {boolean}
 */
const movePutsOwnKingInCheck = (state, move) => {
  const movedPiece = Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, move.from);
  const newState = Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["a" /* applyMoveToGameState */])(state, move);

  return Object(__WEBPACK_IMPORTED_MODULE_5__piece__["b" /* pieceIsBlack */])(movedPiece)
    ? Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["b" /* blackInCheck */])(newState)
    : Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["e" /* whiteInCheck */])(newState);
};

/**
 * @param {GameState} state
 * @param {Move} move
 * @returns {boolean}
 */
const moveGivesCheck = (state, move) => {
  const movedPiece = Object(__WEBPACK_IMPORTED_MODULE_6__Board__["b" /* getPieceAtSquare */])(state.board, move.from);
  const newState = Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["a" /* applyMoveToGameState */])(state, move);

  return Object(__WEBPACK_IMPORTED_MODULE_5__piece__["b" /* pieceIsBlack */])(movedPiece)
    ? Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["e" /* whiteInCheck */])(newState)
    : Object(__WEBPACK_IMPORTED_MODULE_0__GameState__["b" /* blackInCheck */])(newState);
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Square__ = __webpack_require__(3);





/**
 * Recursively explores a direction on a board until the piece
 * is out of moves
 * @param {GameState} state
 * @param {string} piece
 * @param {Square} square
 * @param {[number]} direction
 * @param {[number]} delta
 * @param {[Move]} results
 * @returns {[Move]}
 */
const getMovesUntilNotEmpty = (
  state,
  piece,
  square,
  direction,
  delta = [0, 0],
  results = []
) => {
  const newDelta = [delta[0] + direction[0], delta[1] + direction[1]];

  const nextSquare = __WEBPACK_IMPORTED_MODULE_3__Square__["a" /* default */].relativeFrom(square, newDelta);

  // Edge of board, end of move
  if (!nextSquare.inBounds) return results;

  const toPiece = Object(__WEBPACK_IMPORTED_MODULE_1__Board__["b" /* getPieceAtSquare */])(state.board, nextSquare);
  const hasPiece = toPiece !== " ";
  const hasEnemyPiece = hasPiece && !Object(__WEBPACK_IMPORTED_MODULE_0__piece__["e" /* piecesAreSameColor */])(piece, toPiece);

  // Own piece, end of move
  if (hasPiece && !hasEnemyPiece) return results;

  // We can make a move for sure
  const move = Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, nextSquare, state);

  if (hasPiece) return results.concat(move);

  return getMovesUntilNotEmpty(
    state,
    piece,
    square,
    direction,
    newDelta,
    results.concat(move)
  );
};

/**
 * Gets a list of moves for a piece on a square based on a set of
 * directions
 * @param {GameState} state
 * @param {Square} square
 * @param {[[number]]} directions
 * @returns {[Move]}
 */
const getDirectionalMoves = (state, square, directions) => {
  const piece = Object(__WEBPACK_IMPORTED_MODULE_1__Board__["b" /* getPieceAtSquare */])(state.board, square);
  return directions
    .map(d => getMovesUntilNotEmpty(state, piece, square, d))
    .reduce((xs, x) => xs.concat(x));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getDirectionalMoves;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Moves__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__piece__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Square__ = __webpack_require__(3);






/**
 * Represents a chess board during a game
 * @typedef {Object} GameState
 * @property {[[string]]} board
 * @property {boolean} whiteToMove
 * @property {boolean} blackToMove
 * @property {boolean} whiteCanCastleShort
 * @property {boolean} whiteCanCastleLong
 * @property {boolean} blackCanCastleShort
 * @property {boolean} blackCanCastleLong
 * @property {string?} enPassant - Position behind a pawn that just made a 2 square advance
 * @property {number} halfMoves - Half moves since last capture or pawn
 * @property {number} moveNr - Total moves in game. Starts at 1, increment per black move
 */

/**
 * Create a GameState
 * @param {[[string]]} board - A list of rows containing piece codes
 * @param {string} toMove - "w" for white, "b" for black
 * @param {string} castleOptions - Any combination of "KQkq" for white/black king/queen side castling
 * @param {string} enPassantSquare - Position behind a pawn that just made a 2 square advance
 * @param {string|number} halfMoves - Half moves since last capture or pawn advance
 * @param {string|number} fullMoves - Total moves in game. Starts at 1, increment per black move
 * @returns {GameState}
 */
const GameState = (
  board,
  toMove = "w",
  castleOptions = "KQkq",
  enPassantSquare = "-",
  halfMoves = 0,
  fullMoves = 1
) => {
  return Object.assign(
    {
      board: board || Object(__WEBPACK_IMPORTED_MODULE_0__Board__["a" /* StartPosition */])(),
      // Side to move
      whiteToMove: toMove === "w",
      blackToMove: toMove === "b",

      // En passant
      enPassant: enPassantSquare === "-" ? null : enPassantSquare,
      // Move numbers
      halfMoves: +halfMoves,
      moveNr: +fullMoves
    },
    castleOptionsFromString(castleOptions)
  );
};

/**
 * @param {string} castleStr
 * @returns {Object}
 */
const castleOptionsFromString = castleStr => ({
  whiteCanCastleShort: castleStr && castleStr.includes("K"),
  whiteCanCastleLong: castleStr && castleStr.includes("Q"),
  blackCanCastleShort: castleStr && castleStr.includes("k"),
  blackCanCastleLong: castleStr && castleStr.includes("q")
});

const castleStrFromOptions = ({
  whiteCanCastleShort,
  whiteCanCastleLong,
  blackCanCastleShort,
  blackCanCastleLong
}) =>
  [
    ["K", whiteCanCastleShort],
    ["Q", whiteCanCastleLong],
    ["k", blackCanCastleShort],
    ["q", blackCanCastleLong]
  ]
    .filter(([c, pred]) => pred)
    .map(([c, pred]) => c)
    .join("");

/**
 * @param {GameState} state
 * @param {Move} move
 * @returns {string?}
 */
const castleOptionsDiff = (state, move) => {
  let prevOptions = castleStrFromOptions(state);

  if (!prevOptions) return null;

  const piece = Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(state.board, move.from);

  switch (piece) {
    case "k":
      return prevOptions.replace("k", "").replace("q", "");
    case "r":
      return prevOptions.replace(move.from.file === 0 ? "q" : "k", "");
    case "K":
      return prevOptions.replace("K", "").replace("Q", "");
    case "R":
      return prevOptions.replace(move.from.file === 0 ? "Q" : "K", "");
  }

  return prevOptions;
};

/**
 *
 * @param {GameState} state
 * @param {Move} move
 * @returns {GameState}
 */
const applyMoveToGameState = (state, move) => {
  let board = Object(__WEBPACK_IMPORTED_MODULE_0__Board__["c" /* movePieceInBoard */])(state.board, move.from, move.to);

  if (move.castles) {
    // Move the rook as well
    const queenSide = move.to.file === 2; // "c"
    const relFrom = queenSide ? [0, -2] : [0, 1];
    const relTo = queenSide ? [0, 1] : [0, -1];

    console.log(
      "must move rook from",
      __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].relativeFrom(move.to, relFrom).code,
      "to",
      __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].relativeFrom(move.to, relTo).code
    );

    board = Object(__WEBPACK_IMPORTED_MODULE_0__Board__["c" /* movePieceInBoard */])(
      board,
      __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].relativeFrom(move.to, relFrom),
      __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].relativeFrom(move.to, relTo)
    );
  }

  return GameState(
    board,
    state.whiteToMove ? "b" : "w",
    castleOptionsDiff(state, move),
    move.isPawnMove && move.to.row - move.from.row === 2, // TODO: (Simon) get en passant square
    state.halfMoves + 1,
    state.moveNr + (state.whiteToMove ? 1 : 0)
  );
};
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMoveToGameState;


/**
 * @param {GameState} state
 * @returns {boolean}
 */
const hasCheck = state => {
  return __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].allInBoard().some(square =>
    Object(__WEBPACK_IMPORTED_MODULE_1__Moves__["c" /* getMoves */])(state, square).some(move => move.takesKing)
  );
};
/* unused harmony export hasCheck */


// TODO: (Simon) DRY
// Note: (Simon) Having to recalculate all moves for a color every time one
//               of these methods is called is very inefficient. Probably
//               better to store possible moves with a game state

/**
 * @param {GameState} state
 * @returns {boolean}
 */
const whiteInCheck = state => {
  return __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].allInBoard()
    .filter(sq => Object(__WEBPACK_IMPORTED_MODULE_3__piece__["b" /* pieceIsBlack */])(Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(state.board, sq)))
    .some(square => Object(__WEBPACK_IMPORTED_MODULE_1__Moves__["c" /* getMoves */])(state, square).some(move => move.takesKing));
};
/* harmony export (immutable) */ __webpack_exports__["e"] = whiteInCheck;


/**
 * @param {GameState} state
 * @returns {boolean}
 */
const blackInCheck = state => {
  return __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].allInBoard()
    .filter(sq => Object(__WEBPACK_IMPORTED_MODULE_3__piece__["d" /* pieceIsWhite */])(Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(state.board, sq)))
    .some(square => Object(__WEBPACK_IMPORTED_MODULE_1__Moves__["c" /* getMoves */])(state, square).some(move => move.takesKing));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = blackInCheck;


/**
 * Returns whether one of the black pieces attacks a square
 * @param {GameState} state
 * @param {Square} square
 * @returns {boolean}
 */
const blackPieceAttacksSquare = (state, square) => {
  return __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].allInBoard()
    .filter(sq => Object(__WEBPACK_IMPORTED_MODULE_3__piece__["b" /* pieceIsBlack */])(Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(state.board, sq)))
    .some(sq => Object(__WEBPACK_IMPORTED_MODULE_1__Moves__["c" /* getMoves */])(state, sq).some(move => move.to.code === square.code));
};
/* harmony export (immutable) */ __webpack_exports__["c"] = blackPieceAttacksSquare;


/**
 * Returns whether one of the white pieces attacks a square
 * @param {GameState} state
 * @param {Square} square
 * @returns {boolean}
 */
const whitePieceAttacksSquare = (state, square) => {
  return __WEBPACK_IMPORTED_MODULE_4__Square__["a" /* default */].allInBoard()
    .filter(sq => Object(__WEBPACK_IMPORTED_MODULE_3__piece__["d" /* pieceIsWhite */])(Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(state.board, sq)))
    .some(sq => Object(__WEBPACK_IMPORTED_MODULE_1__Moves__["c" /* getMoves */])(state, sq).some(move => move.to.code === square.code));
};
/* harmony export (immutable) */ __webpack_exports__["f"] = whitePieceAttacksSquare;


/* harmony default export */ __webpack_exports__["d"] = (GameState);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Square__ = __webpack_require__(3);





/**
 * @param {GameState} state
 * @param {Square} square
 * @param {[[number]] relatives - Square locations [dRow, dFile] relative to this square}
 * @returns {[Moves]}
 */
const getSquareMoves = (state, square, relatives) => {
  const thisPiece = Object(__WEBPACK_IMPORTED_MODULE_1__Board__["b" /* getPieceAtSquare */])(state.board, square);

  const toSquares = relatives
    .map(d => __WEBPACK_IMPORTED_MODULE_3__Square__["a" /* default */].relativeFrom(square, d))
    .filter(s => s.inBounds)
    .map(s => ({ square: s, piece: Object(__WEBPACK_IMPORTED_MODULE_1__Board__["b" /* getPieceAtSquare */])(state.board, s) }))
    // Only empty squares or squares with enemy pieces
    .filter(to => to.piece === " " || !Object(__WEBPACK_IMPORTED_MODULE_0__piece__["e" /* piecesAreSameColor */])(thisPiece, to.piece));

  return toSquares.map(to => Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, to.square, state));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getSquareMoves;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(9);

/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
const getBishopMoves = (state, square) => {
  return Object(__WEBPACK_IMPORTED_MODULE_0__directionBased__["a" /* getDirectionalMoves */])(state, square, [
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1]
  ]);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getBishopMoves;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(9);

/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
const getRookMoves = (state, square) => {
  return Object(__WEBPACK_IMPORTED_MODULE_0__directionBased__["a" /* getDirectionalMoves */])(state, square, [[1, 0], [-1, 0], [0, -1], [0, 1]]);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getRookMoves;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameState__ = __webpack_require__(10);



/* A regular chess game's starting position in FEN notation */
const START_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

/**
 * Splits up a fen string in to parts for rows, side to move, 
 * castle options, en passant, half moves and full moves
 * 
 * @param {string} fen 
 * @returns {[string]}
 */
const fenParts = fen => fen.split(/\s+/g);

/**
 * (Recursively) create a fen row code from a list of piece
 * codes, in which empty squares are " "
 * 
 * @param {[string]} pieces 
 * @param {string} [result=""] 
 * @param {number} [empties=0] 
 * @return {string}
 */
const pieceCodesToFenRow = (pieces, result = "", empties = 0) =>
  pieces.length === 0
    ? result + (empties || "")
    : pieces[0] === " "
      ? pieceCodesToFenRow(pieces.slice(1), result, empties + 1)
      : pieceCodesToFenRow(
          pieces.slice(1),
          result + (empties || "") + pieces[0],
          0
        );

/**
 * Translates a fen row code (part between /.../) to a list of pieces,
 * in which empty squares are " "
 * 
 * @param {string} fenRow 
 * @returns [string]
 */
const fenRowToPieceCodes = fenRow =>
  fenRow
    .split("")
    .reduce((acc, p) => acc.concat(+p > 0 ? Array(+p).fill(" ") : p), []);

/**
 * Transform a FEN string in to a game state
 * @param {string} fen 
 * @returns {GameState}
 */
const fenToGameState = fen => {
  const [rows, toMove, castles, enPassant, halfMoves, fullMoves] = fenParts(
    fen
  );

  const board = rows
    .split("/")
    .map(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* trim */])
    .map(fenRowToPieceCodes);

  return Object(__WEBPACK_IMPORTED_MODULE_1__GameState__["d" /* default */])(board, toMove, castles, enPassant, halfMoves, fullMoves);
};

/**
 * Generate a FEN string from a GameState
 * 
 * @param {GameState} state 
 * @returns {string}
 */
const gameStateToFen = state => {
  const rows = state.board.map(p => pieceCodesToFenRow(p));

  return [
    rows.join("/"),
    state.whiteToMove ? "w" : "b",
    [
      state.whiteCanCastleShort ? "K" : "",
      state.whiteCanCastleLong ? "Q" : "",
      state.blackCanCastleShort ? "k" : "",
      state.blackCanCastleLong ? "q" : ""
    ].join("") || "-",
    state.enPassant || "-",
    state.halfMoves,
    state.moveNr
  ].join(" ");
};

/* unused harmony default export */ var _unused_webpack_default_export = ({
  fenToGameState,
  gameStateToFen,
  START_POSITION
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Square__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__piece__ = __webpack_require__(7);






/**
 * Returns a list of possible moves for a square that holds a pawn
 * @param {GameState} state
 * @param {Square} square
 */
const getPawnMoves = (state, square) => {
  const board = state.board;
  const piece = Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(board, square);
  const isBlack = Object(__WEBPACK_IMPORTED_MODULE_3__piece__["b" /* pieceIsBlack */])(piece);

  const canTake = ({ square, piece }) =>
    // There's piece info
    piece &&
    // The square is on the board
    square.inBounds &&
    // There's a piece of the opposite color OR
    // it's the state's en passant square
    ((isBlack ? Object(__WEBPACK_IMPORTED_MODULE_3__piece__["d" /* pieceIsWhite */])(piece) : Object(__WEBPACK_IMPORTED_MODULE_3__piece__["b" /* pieceIsBlack */])(piece)) ||
      state.enPassant === square.code);

  const canMove = ({ square, piece }) => square.inBounds && Object(__WEBPACK_IMPORTED_MODULE_3__piece__["c" /* pieceIsEmpty */])(piece);

  const isStartPos = isBlack ? square.row === 1 : square.row === 6;

  const directions = [
    isBlack ? [1, 0] : [-1, 0], // First step
    isBlack ? [2, 0] : [-2, 0], // Second step
    isBlack ? [1, -1] : [-1, -1], // Takes left
    isBlack ? [1, 1] : [-1, 1] // Takes right
  ];

  const piecesAtValidSquares = directions
    .map(d => __WEBPACK_IMPORTED_MODULE_1__Square__["a" /* default */].relativeFrom(square, d))
    .map(s => ({
      piece: s.inBounds ? Object(__WEBPACK_IMPORTED_MODULE_0__Board__["b" /* getPieceAtSquare */])(board, s) : null,
      square: s
    }));

  const moves = [];
  const [firstStep, secondStep, takesLeft, takesRight] = piecesAtValidSquares;

  if (canMove(firstStep)) {
    moves.push(Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, firstStep.square, state));

    if (isStartPos && canMove(secondStep)) {
      moves.push(Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, secondStep.square, state));
    }
  }

  if (canTake(takesLeft)) {
    moves.push(Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, takesLeft.square, state));
  }

  if (canTake(takesRight)) {
    moves.push(Object(__WEBPACK_IMPORTED_MODULE_2__Moves__["a" /* Move */])(square, takesRight.square, state));
  }

  return moves;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getPawnMoves;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(11);

/**
 * @param {*} state 
 * @param {*} square 
 */
const getKnightMoves = (state, square) => {
  return Object(__WEBPACK_IMPORTED_MODULE_0__squareBased__["a" /* getSquareMoves */])(state, square, [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, -1],
    [2, 1],
    [-2, -1],
    [-2, 1]
  ]);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getKnightMoves;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(11);

/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
const getKingMoves = (state, square) => {
  // TODO: (Simon) Castling
  return Object(__WEBPACK_IMPORTED_MODULE_0__squareBased__["a" /* getSquareMoves */])(state, square, [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1]
  ]);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getKingMoves;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bishop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(13);



/**
 * @param {GameState} state 
 * @param {Square} square 
 * @returns {[Move]}
 */
const getQueenMoves = (state, square) => {
  return Object(__WEBPACK_IMPORTED_MODULE_1__bishop__["a" /* getBishopMoves */])(state, square).concat(Object(__WEBPACK_IMPORTED_MODULE_2__rook__["a" /* getRookMoves */])(state, square));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = getQueenMoves;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTUyYmRlOTRhNmJmMjY4MTU2NzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3NxdWFyZUNoYW5nZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9Cb2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGllY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9kaXJlY3Rpb25CYXNlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVN0YXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9zcXVhcmVCYXNlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvYmlzaG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9yb29rLmpzIiwid2VicGFjazovLy8uL3NyYy9GRU4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3Bhd24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2tuaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMva2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvcXVlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QVcsVUFBVTtBQUNyQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7OztBQ2xCOEI7QUFDTDtBQUNGO0FBQ3ZCO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBIiwiZmlsZSI6Ii4vbGliL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE1MmJkZTk0YTZiZjI2ODE1Njc3IiwiLyoqXG4gKiBUcmltIGEgc3RyaW5nIHVzaW5nIG5hdGl2ZSB0cmltXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgdHJpbSA9IHN0ciA9PiBzdHIudHJpbSgpO1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0geCA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG5cbi8qKlxuICogTWFwcyBhcnJheXMgb3Igb2JqZWN0c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gZiAtIGEgLT4gYlxuICogQHBhcmFtIHsqfSBmdW5jdG9yXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IChmLCBmdW5jdG9yKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0b3IpIHx8IHR5cGVvZiBmLm1hcCA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHJldHVybiBmdW5jdG9yLm1hcChmKTtcblxuICBpZiAoaXNPYmplY3QoZnVuY3RvcikpXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGZ1bmN0b3IpLnJlZHVjZShcbiAgICAgIChvLCBbaywgdl0pID0+IE9iamVjdC5hc3NpZ24obywgeyBba106IGYodikgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIGZ1bmN0b3I7XG59O1xuXG4vKipcbiAqIEZpbHRlcnMgYXJyYXlzIG9yIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkIC0gRmlsdGVyIGZ1bmN0aW9uIG9mIHggLT4gYm9vbFxuICogQHBhcmFtIHsqfSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IChwcmVkLCBmaWx0ZXJhYmxlKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcmFibGUpIHx8IHR5cGVvZiBmaWx0ZXJhYmxlLmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHJldHVybiBmaWx0ZXJhYmxlLmZpbHRlcihwcmVkKTtcblxuICBpZiAoaXNPYmplY3QoZmlsdGVyYWJsZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZmlsdGVyYWJsZSkucmVkdWNlKFxuICAgICAgKG8sIFtrLCB2XSkgPT4gT2JqZWN0LmFzc2lnbihvLCBwcmVkKHYpID8geyBba106IHYgfSA6IHt9KSxcbiAgICAgIHt9XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJhYmxlO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSByYW5nZSBvZiBudW1iZXJzLCBzdGFydGluZyBhdCAxXG4gKiBAcGFyYW0ge251bWJlcn0gbiAtIFRoZSBsZW5ndGgvZW5kIG9mIHRoZSByYW5nZVxuICogQHJldHVybnMge1tudW1iZXJdfVxuICovXG5leHBvcnQgY29uc3QgcmFuZ2UgPSBuID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IG4gfSwgKF8sIGkpID0+IGkpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBjb21iaW5hdGlvbnMgb2YgdHdvIGFycmF5c1xuICogQHBhcmFtIHtbKl19IHhzXG4gKiBAcGFyYW0ge1sqXX0geXNcbiAqIEByZXR1cm5zIHtbWypdXX1cbiAqL1xuZXhwb3J0IGNvbnN0IHhQcm9kID0gKHhzLCB5cykgPT5cbiAgeHMucmVkdWNlKChhY2MsIHgpID0+IGFjYy5jb25jYXQoeXMubWFwKHkgPT4gW3gsIHldKSksIFtdKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgcHJvcCA9IGtleSA9PiBvYmogPT4gb2JqW2tleV07XG5cbi8qKlxuICogQ29tcG9zZSAyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBnXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKGYsIGcpID0+IHggPT4gZihnKHgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNxdWFyZUNoYW5nZXMgfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL3NxdWFyZUNoYW5nZXNcIjtcbmltcG9ydCB7IGNyb3AgfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL2Nyb3BcIjtcbmltcG9ydCB7IHBlcnNwZWN0aXZlVHJhbnNmb3JtIH0gZnJvbSBcIi4vaW1hZ2VIYW5kbGluZy9wZXJzcGVjdGl2ZVRyYW5zZm9ybVwiO1xuaW1wb3J0IHsgc3F1YXJlQ2hhbmdlcyB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlc1wiO1xuXG5pbXBvcnQgRkVOIGZyb20gXCIuL0ZFTlwiO1xuaW1wb3J0IHsgZ2V0QWxsTGVnYWxNb3ZlcyB9IGZyb20gXCIuL01vdmVzXCI7XG5pbXBvcnQgR2FtZVN0YXRlLCB7IGFwcGx5TW92ZVRvR2FtZVN0YXRlIH0gZnJvbSBcIi4vR2FtZVN0YXRlXCI7XG5cbmNvbnN0IEJvYXJkSW1hZ2UgPSAoaW1nRmlsZSwgdHJhbnNmb3JtRnJvbSkgPT4ge1xuICBjb25zdCBmb3VyUG9pbnRzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgLy8gV3JpdGUgZnJvbSBwb2ludHMgdG8gdHJhbnNmb3JtRnJvbSBldmVyeSA0dGggaXRlbVxuICBmb3VyUG9pbnRzLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSA0KSB7XG4gICAgICB0cmFuc2Zvcm1Gcm9tKHBvaW50cyk7XG4gICAgICBmb3VyUG9pbnRzKFtdKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IG15Q3JvcCA9IGtvLm9ic2VydmFibGUoKTtcbiAgY29uc3QgY3JvcERhdGFVUkwgPSBrby5wdXJlQ29tcHV0ZWQoXG4gICAgKCkgPT4gKG15Q3JvcCgpID8gbXlDcm9wKCkudG9EYXRhVVJMKCkgOiBudWxsKVxuICApO1xuXG4gIC8vIExpbmsgYSB2aXJ0dWFsIGltZ1xuICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICBjb25zdCByZWRyYXcgPSB0cmFuc2Zvcm0gPT4ge1xuICAgIGNyb3AocGVyc3BlY3RpdmVUcmFuc2Zvcm0odHJhbnNmb3JtLCBpbWcpLCBteUNyb3ApO1xuICB9O1xuXG4gIHRyYW5zZm9ybUZyb20uc3Vic2NyaWJlKHJlZHJhdyk7XG5cbiAgLy8gTG9hZCBpbml0aWFsIGltYWdlXG4gIGltZy5vbmxvYWQgPSAoKSA9PiByZWRyYXcodHJhbnNmb3JtRnJvbSgpKTtcbiAgaW1nLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoaW1nRmlsZSk7XG5cbiAgY29uc3QgZ2FtZVN0YXRlID0ga28ub2JzZXJ2YWJsZShHYW1lU3RhdGUoKSk7XG4gIGNvbnN0IGJvYXJkID0ga28ucHVyZUNvbXB1dGVkKCgpID0+IGdhbWVTdGF0ZSgpLmJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVTdGF0ZSxcbiAgICBib2FyZCxcbiAgICBpbWFnZVZpc2libGU6IGtvLm9ic2VydmFibGUodHJ1ZSksXG4gICAgb3JpZ2luYWw6IGltZy5zcmMsXG4gICAgY3JvcDogY3JvcERhdGFVUkwsXG4gICAgY3JvcEN2czogbXlDcm9wLFxuICAgIG9uQ2xpY2s6IChkLCBlKSA9PiB7XG4gICAgICBjb25zdCBiYm94ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBmb3VyUG9pbnRzLnB1c2goe1xuICAgICAgICB4OiBlLmNsaWVudFggLSBiYm94LngsXG4gICAgICAgIHk6IGUuY2xpZW50WSAtIGJib3gueVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcblxuY29uc3QgQXBwID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHRyYW5zZm9ybUZyb20gPSBrby5vYnNlcnZhYmxlQXJyYXkoW1xuICAgIHsgeDogOCwgeTogNDUxIH0sXG4gICAgeyB4OiAyMywgeTogMTcgfSxcbiAgICB7IHg6IDQ1MywgeTogMjQgfSxcbiAgICB7IHg6IDQ0OSwgeTogNDUzIH1cbiAgXSk7XG5cbiAgdGhpcy50b2dnbGVJbWFnZXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbWFnZXMoKS5mb3JFYWNoKGJpID0+IGJpLmltYWdlVmlzaWJsZSghYmkuaW1hZ2VWaXNpYmxlKCkpKTtcbiAgfTtcblxuICB0aGlzLmltYWdlcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG4gIHRoaXMub25OZXdGaWxlcyA9IChkLCBlKSA9PiB7XG4gICAgdGhpcy5pbWFnZXMoXG4gICAgICBBcnJheS5mcm9tKGUudGFyZ2V0LmZpbGVzKS5tYXAoaW1nID0+IEJvYXJkSW1hZ2UoaW1nLCB0cmFuc2Zvcm1Gcm9tKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGdldEJlc3RHdWVzcyA9IChpbWdCZWZvcmUsIGltZ0FmdGVyKSA9PiB7XG4gICAgY29uc3QgY3R4QmVmb3JlID0gaW1nQmVmb3JlLmNyb3BDdnMoKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgY3R4QWZ0ZXIgPSBpbWdBZnRlci5jcm9wQ3ZzKCkuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IHNxdWFyZUNoYW5nZXMoY3R4QmVmb3JlLCBjdHhBZnRlcik7XG5cbiAgICBjb25zdCBnYW1lU3RhdGVCZWZvcmUgPSBpbWdCZWZvcmUuZ2FtZVN0YXRlKCk7XG4gICAgY29uc3QgYWxsb3dlZE1vdmVzID0gZ2V0QWxsTGVnYWxNb3ZlcyhnYW1lU3RhdGVCZWZvcmUpO1xuXG4gICAgY29uc3QgcG9zc2liaWxpdGllcyA9IGFsbG93ZWRNb3Zlc1xuICAgICAgLm1hcChtb3ZlID0+IHtcbiAgICAgICAgY29uc3QgZnJvbVNxdWFyZUNoYW5nZSA9IGNoYW5nZXNbbW92ZS5mcm9tLmluZGV4XS5kaWZmZXJlbmNlO1xuICAgICAgICBjb25zdCB0b1NxdWFyZUNoYW5nZSA9IGNoYW5nZXNbbW92ZS50by5pbmRleF0uZGlmZmVyZW5jZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vdmUsXG4gICAgICAgICAgZnJvbVNxdWFyZUNoYW5nZSxcbiAgICAgICAgICB0b1NxdWFyZUNoYW5nZSxcbiAgICAgICAgICB0b3RhbENoYW5nZTogZnJvbVNxdWFyZUNoYW5nZSArIHRvU3F1YXJlQ2hhbmdlLFxuICAgICAgICAgIGZyb206IG1vdmUuZnJvbS5jb2RlLFxuICAgICAgICAgIHRvOiBtb3ZlLnRvLmNvZGVcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuc29ydCgocDEsIHAyKSA9PiBwMi50b3RhbENoYW5nZSAtIHAxLnRvdGFsQ2hhbmdlKTtcblxuICAgIHJldHVybiBwb3NzaWJpbGl0aWVzWzBdO1xuICB9O1xuXG4gIHRoaXMuYW5hbHl6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBwYWlycyA9IHRoaXMuaW1hZ2VzKCkucmVkdWNlKChwYWlycywgaW1nLCBpLCBpbWdzKSA9PiB7XG4gICAgICBpZiAoaW1nc1tpICsgMV0pIHBhaXJzLnB1c2goW2ltZywgaW1nc1tpICsgMV1dKTtcbiAgICAgIHJldHVybiBwYWlycztcbiAgICB9LCBbXSk7XG5cbiAgICB0aGlzLmltYWdlcygpLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgLy8gTGFzdCBib2FyZFxuICAgICAgaWYgKCFwYWlyc1tpXSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBiZWZvcmUgPSBwYWlyc1tpXVswXTtcbiAgICAgIGNvbnN0IGFmdGVyID0gcGFpcnNbaV1bMV07XG5cbiAgICAgIGNvbnN0IG1vdmUgPSBnZXRCZXN0R3Vlc3MoYmVmb3JlLCBhZnRlcikubW92ZTtcblxuICAgICAgYWZ0ZXIuZ2FtZVN0YXRlKGFwcGx5TW92ZVRvR2FtZVN0YXRlKGJlZm9yZS5nYW1lU3RhdGUoKSwgbW92ZSkpO1xuICAgIH0pO1xuICB9O1xufTtcblxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwKCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuaW1wb3J0IHsgcmFuZ2UgfSBmcm9tIFwiLi8uLi91dGlsc1wiO1xuXG4vLyBOb3RlOiAoU2ltb24pIElmIHdlIHdhbnQgdG8gdGVzdCB0aGlzLCB3ZSBtaWdodCB3YW50IHRvIHVzZTpcbi8vICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZ2V0LWltYWdlLWRhdGFcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKi9cbmNvbnN0IGdldEltYWdlRGF0YUZvclNxdWFyZSA9IChzcXVhcmUsIHNxdWFyZVNpemUsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZS5yb3cgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFic29sdXRlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gYXJyYXlzIGJ5IHN1bW1pbmcgZXZlcnkgaW5kZXhcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSBbTnVtYmVyXX0gYXJyMlxuICogQHJldHVybnMgTnVtYmVyXG4gKi9cbmNvbnN0IHRvdGFsRGlmZiA9IChhcnIxLCBhcnIyKSA9PiB7XG4gIGNvbnN0IGwgPSBNYXRoLm1heChhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBsZXQgZCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBkICs9IE1hdGguYWJzKChhcnIxW2ldIHx8IDApIC0gKGFycjJbaV0gfHwgMCkpO1xuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QmVmb3JlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QWZ0ZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHNxdWFyZUNoYW5nZXMgPSAoY3R4QmVmb3JlLCBjdHhBZnRlcikgPT4ge1xuICAvLyBOb3RlOiAoU2ltb24pIFRoZSBib2FyZCBoYXMgdG8gYmUgc3F1YXJlXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBjdHhCZWZvcmUuY2FudmFzLndpZHRoIC8gODtcblxuICBjb25zdCBjaGFuZ2VzID0gU3F1YXJlLmFsbEluQm9hcmQoKS5tYXAoc3F1YXJlID0+IHtcbiAgICBjb25zdCBiZWZvcmUgPSBnZXRJbWFnZURhdGFGb3JTcXVhcmUoc3F1YXJlLCBzcXVhcmVTaXplLCBjdHhCZWZvcmUpO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0SW1hZ2VEYXRhRm9yU3F1YXJlKHNxdWFyZSwgc3F1YXJlU2l6ZSwgY3R4QWZ0ZXIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogdG90YWxEaWZmKGJlZm9yZS5kYXRhLCBhZnRlci5kYXRhKVxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHJvd09yZGVyID0gXCI4NzY1NDMyMVwiO1xuY29uc3QgZmlsZU9yZGVyID0gXCJhYmNkZWZnaFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzcXVhcmUgaW4gYSBjaGVzcyBib2FyZCB3aXRob3V0IGl0cyBjb250ZW50c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNxdWFyZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2RlIC0gTmFtZSBvZiB0aGUgc3F1YXJlXG4gKiBAcHJvcGVydHkge1tudW1iZXJdfSBjb29yZCAtIHJvdyBhbmQgZmlsZSBucnMgaW4gYXJyYXlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5Cb3VuZHMgLSBpcyB0aGlzIGEgbGVnYWwgc3F1YXJlXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBzcXVhcmUgYnkgcm93IGFuZCBmaWxlIG5yLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3dOclxuICogQHBhcmFtIHtudW1iZXJ9IGZpbGVOclxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuY29uc3QgU3F1YXJlID0gKHJvd05yLCBmaWxlTnIpID0+ICh7XG4gIHJvdzogcm93TnIsXG4gIGZpbGU6IGZpbGVOcixcbiAgaW5kZXg6IHJvd05yICogOCArIGZpbGVOcixcbiAgY29kZTogYCR7ZmlsZU9yZGVyW2ZpbGVOcl19JHtyb3dPcmRlcltyb3dOcl19YCxcbiAgY29vcmQ6IFtyb3dOciwgZmlsZU5yXSxcbiAgaW5Cb3VuZHM6IHJvd05yID49IDAgJiYgcm93TnIgPD0gNyAmJiBmaWxlTnIgPj0gMCAmJiBmaWxlTnIgPD0gN1xufSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgc3F1YXJlIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUNvZGUgPSBjb2RlID0+XG4gIFNxdWFyZShyb3dPcmRlci5pbmRleE9mKGNvZGVbMV0pLCBmaWxlT3JkZXIuaW5kZXhPZihjb2RlWzBdKSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgY29vcmRpbmF0ZSBhcnJheVxuICogQHBhcmFtIHtbbnVtYmVyXX0gY29vcmRzIC0gW3Jvd05yLCBmaWxlTnJdXG4gKi9cblNxdWFyZS5mcm9tQ29vcmQgPSAoW3Jvd05yLCBmaWxlTnJdKSA9PiBTcXVhcmUocm93TnIsIGZpbGVOcik7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBzcXVhcmUgYmFzZWQgb24gYW4gb2xkIHNxdWFyZSBhbmQgYSBkZWx0YVxuICpcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgLSBUaGUgcmVmZXJlbmNlIHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGVsdGEgLSBUaGUgZFJvdyBhbmQgZEZpbGUgdG8gdHJhbnNsYXRlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUucmVsYXRpdmVGcm9tID0gKHsgcm93LCBmaWxlIH0sIFtkUm93LCBkRmlsZV0pID0+XG4gIFNxdWFyZShyb3cgKyBkUm93LCBmaWxlICsgZEZpbGUpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzcXVhcmUgZm9yIGFuIGluZGV4IHN0YXJ0aW5nIGxlZnQgdG8gcmlnaHQsIHRvcCB0byBib3R0b21cbiAqIEBwYXJhbSB7TnVtYmVyfSBpXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUluZGV4ID0gaSA9PiBTcXVhcmUoTWF0aC5mbG9vcihpIC8gOCksIGkgJSA4KTtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCB0aGUgc3F1YXJlcyBpbiBhIGNoZXNzIGJvYXJkXG4gKiBAcmV0dXJucyB7W1NxdWFyZV19XG4gKi9cblNxdWFyZS5hbGxJbkJvYXJkID0gKCkgPT5cbiAgcmFuZ2UoNjQpXG4gICAgLm1hcChpID0+IFtNYXRoLmZsb29yKGkgLyA4KSwgaSAlIDhdKVxuICAgIC5tYXAoU3F1YXJlLmZyb21Db29yZCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNxdWFyZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1NxdWFyZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBwYXJhbSB7RGF0YVVSTH0gZGF0YVVSTFxuICogQHJldHVybnMge2tvLm9ic2VydmFibGV9XG4gKi9cbmV4cG9ydCBjb25zdCBjcm9wID0gKGRhdGFVUkwsIHdyaXRlVG8pID0+IHtcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gIGNvbnN0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGN2cy53aWR0aCA9IDI1NjtcbiAgY3ZzLmhlaWdodCA9IDI1NjtcbiAgY29uc3QgY3R4ID0gY3ZzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICB3cml0ZVRvKGN2cyk7XG4gIH07XG4gIGltZy5zcmMgPSBkYXRhVVJMO1xuXG4gIHJldHVybiB3cml0ZVRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvY3JvcC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBwb2ludFJlZHVjZXIgPSAoYWNjLCB7IHgsIHkgfSkgPT4gYWNjLmNvbmNhdCh4LCB5KTtcblxuLyoqXG4gKiBAcGFyYW0ge1t7eCwgeX1dfSByZWZQb2ludHNcbiAqIEBwYXJhbSB7SW1hZ2V9IGltZ1xuICogQHJldHVybnMge0RhdGFVUkx9XG4gKi9cbmV4cG9ydCBjb25zdCBwZXJzcGVjdGl2ZVRyYW5zZm9ybSA9IChyZWZQb2ludHMsIGltZykgPT4ge1xuICBjb25zdCBjdnMgPSBmeC5jYW52YXMoKTtcblxuICBjb25zdCBmcm9tID0gcmVmUG9pbnRzLnJlZHVjZShwb2ludFJlZHVjZXIsIFtdKTtcbiAgY29uc3QgdG8gPSBbMCwgMjU2LCAwLCAwLCAyNTYsIDAsIDI1NiwgMjU2XTtcblxuICByZXR1cm4gY3ZzXG4gICAgLmRyYXcoY3ZzLnRleHR1cmUoaW1nKSlcbiAgICAucGVyc3BlY3RpdmUoZnJvbSwgdG8pXG4gICAgLnVwZGF0ZSgpXG4gICAgLnRvRGF0YVVSTCgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvcGVyc3BlY3RpdmVUcmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSZXR1cm5zIGEgYm9hcmQgdGhhdCBob2xkcyBhIGRlZmF1bHQgc3RhcnQgcG9zaXRpb25cbiAqIEByZXR1cm5zIHtbW3N0cmluZ11dfVxuICovXG5leHBvcnQgY29uc3QgU3RhcnRQb3NpdGlvbiA9ICgpID0+IFtcbiAgW1wiclwiLCBcIm5cIiwgXCJiXCIsIFwicVwiLCBcImtcIiwgXCJiXCIsIFwiblwiLCBcInJcIl0sXG4gIFtcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIl0sXG4gIFtcIlJcIiwgXCJOXCIsIFwiQlwiLCBcIlFcIiwgXCJLXCIsIFwiQlwiLCBcIk5cIiwgXCJSXCJdXG5dO1xuXG5jb25zdCBjbG9uZSA9IGJvYXJkID0+IGJvYXJkLnNsaWNlKDApLm1hcChyb3cgPT4gcm93LnNsaWNlKDApKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwaWVjZSAoXCIgXCIgaWYgZW1wdHkpIGF0IGEgcG9zaXRpb24gaW4gYSBib2FyZFxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UGllY2VBdFNxdWFyZSA9IChib2FyZCwgc3F1YXJlKSA9PlxuICBib2FyZFtzcXVhcmUucm93XVtzcXVhcmUuZmlsZV07XG5cbi8qKlxuICogU2V0cyB0aGUgc3F1YXJlIGluIGEgYm9hcmQgdG8gYSAocGllY2UvZW1wdHkpIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICovXG5jb25zdCBzZXRTcXVhcmVTdHJpbmcgPSAoYm9hcmQsIHNxdWFyZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbmV3Qm9hcmQgPSBjbG9uZShib2FyZCk7XG4gIG5ld0JvYXJkW3NxdWFyZS5yb3ddW3NxdWFyZS5maWxlXSA9IHZhbHVlO1xuICByZXR1cm4gbmV3Qm9hcmQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgcGllY2UgaW4gd2hpY2ggdGhlIGZyb21TcXVhcmUgaXMgZW1wdHksIGFuZFxuICogdGhlIHRvU3F1YXJlIGhhcyB0aGUgbW92ZWQgcGllY2UuIE5vdGU6IHRoaXMgZnVuY3Rpb24gZG9lc1xuICogbm90IHBlcmZvcm0gYW55IHZhbGlkaXR5IGNoZWNrc1xuICogXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIFxuICogQHBhcmFtIHtTcXVhcmV9IGZyb21TcXVhcmUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gdG9TcXVhcmUgXG4gKiBAcmV0dXJucyB7W1tzdHJpbmddXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG1vdmVQaWVjZUluQm9hcmQgPSAoYm9hcmQsIGZyb21TcXVhcmUsIHRvU3F1YXJlKSA9PlxuICBzZXRTcXVhcmVTdHJpbmcoXG4gICAgc2V0U3F1YXJlU3RyaW5nKGJvYXJkLCBmcm9tU3F1YXJlLCBcIiBcIiksIC8vIEJvYXJkIHdpdGhvdXQgZnJvbVNxdWFyZVxuICAgIHRvU3F1YXJlLFxuICAgIGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIGZyb21TcXVhcmUpIC8vIEdldCB2YWx1ZSBmcm9tIG9sZCBzcXVhcmVcbiAgKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0JvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNFbXB0eSA9IHBpZWNlID0+IHBpZWNlID09PSBcIiBcIjtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VJc1doaXRlID0gcGllY2UgPT5cbiAgISFwaWVjZSAmJiAhcGllY2VJc0VtcHR5KHBpZWNlKSAmJiBwaWVjZS50b1VwcGVyQ2FzZSgpID09PSBwaWVjZTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VJc0JsYWNrID0gcGllY2UgPT5cbiAgISFwaWVjZSAmJiAhcGllY2VJc0VtcHR5KHBpZWNlKSAmJiBwaWVjZS50b0xvd2VyQ2FzZSgpID09PSBwaWVjZTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcDFcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZXNBcmVTYW1lQ29sb3IgPSAocDEsIHAyKSA9PlxuICAocGllY2VJc1doaXRlKHAxKSAmJiBwaWVjZUlzV2hpdGUocDIpKSB8fFxuICAocGllY2VJc0JsYWNrKHAxKSAmJiBwaWVjZUlzQmxhY2socDIpKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcDFcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUNhblRha2VQaWVjZSA9IChwMSwgcDIpID0+XG4gIChwaWVjZUlzV2hpdGUocDEpICYmIHBpZWNlSXNCbGFjayhwMikpIHx8XG4gIChwaWVjZUlzQmxhY2socDEpICYmIHBpZWNlSXNXaGl0ZShwMikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGllY2UuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEdhbWVTdGF0ZSwge1xuICBhcHBseU1vdmVUb0dhbWVTdGF0ZSxcbiAgd2hpdGVJbkNoZWNrLFxuICBibGFja0luQ2hlY2ssXG4gIGJsYWNrUGllY2VBdHRhY2tzU3F1YXJlLFxuICB3aGl0ZVBpZWNlQXR0YWNrc1NxdWFyZVxufSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vU3F1YXJlXCI7XG5cbmltcG9ydCB7IGdldFBhd25Nb3ZlcyB9IGZyb20gXCIuL21vdmVzL3Bhd25cIjtcbmltcG9ydCB7IGdldEtuaWdodE1vdmVzIH0gZnJvbSBcIi4vbW92ZXMva25pZ2h0XCI7XG5pbXBvcnQgeyBnZXRLaW5nTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9raW5nXCI7XG5cbmltcG9ydCB7XG4gIHBpZWNlSXNCbGFjayxcbiAgcGllY2VJc1doaXRlLFxuICBwaWVjZUlzRW1wdHksXG4gIHBpZWNlc0FyZVNhbWVDb2xvcixcbiAgcGllY2VDYW5UYWtlUGllY2Vcbn0gZnJvbSBcIi4vcGllY2VcIjtcblxuaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuL0JvYXJkXCI7XG5pbXBvcnQgeyBnZXRCaXNob3BNb3ZlcyB9IGZyb20gXCIuL21vdmVzL2Jpc2hvcFwiO1xuaW1wb3J0IHsgZ2V0UXVlZW5Nb3ZlcyB9IGZyb20gXCIuL21vdmVzL3F1ZWVuXCI7XG5pbXBvcnQgeyBnZXRSb29rTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9yb29rXCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgcG9zc2libGUgbW92ZXMgZm9yIGEgcGllY2Ugb24gYSBzcXVhcmVcbiAqIGluIGEgZ2FtZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmNvbnN0IGdldE1vdmVzRm9yUGllY2UgPSAoc3RhdGUsIHNxdWFyZSwgcGllY2UpID0+IHtcbiAgc3dpdGNoIChwaWVjZSkge1xuICAgIGNhc2UgXCJwXCI6XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIHJldHVybiBnZXRQYXduTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcIm5cIjpcbiAgICBjYXNlIFwiTlwiOlxuICAgICAgcmV0dXJuIGdldEtuaWdodE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJrXCI6XG4gICAgY2FzZSBcIktcIjpcbiAgICAgIHJldHVybiBnZXRLaW5nTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcImJcIjpcbiAgICBjYXNlIFwiQlwiOlxuICAgICAgcmV0dXJuIGdldEJpc2hvcE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJxXCI6XG4gICAgY2FzZSBcIlFcIjpcbiAgICAgIHJldHVybiBnZXRRdWVlbk1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJyXCI6XG4gICAgY2FzZSBcIlJcIjpcbiAgICAgIHJldHVybiBnZXRSb29rTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuLyoqXG4gKiBNb3ZlXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gTW92ZVxuICogQHByb3BlcnR5IHtTcXVhcmV9IGZyb21cbiAqIEBwcm9wZXJ0eSB7U3F1YXJlfSB0b1xuICogQHByb3BlcnR5IHtib29sZWFufSB0YWtlc1xuICogQHByb3BlcnR5IHtib29sZWFufSBwYXduTW92ZVxuICogQHByb3BlcnR5IHtib29sZWFufSB0YWtlc0tpbmdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY2FzdGxlc1xuICpcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtb3ZlIHRvIGhlbHAgY3JlYXRlIGEgUEdOIHN0ZXBcbiAqIEBwYXJhbSB7U3F1YXJlfSBmcm9tXG4gKiBAcGFyYW0ge1NxdWFyZX0gdG9cbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge01vdmV9XG4gKi9cbmV4cG9ydCBjb25zdCBNb3ZlID0gKGZyb20sIHRvLCBzdGF0ZSkgPT4gKHtcbiAgZnJvbSxcbiAgdG8sXG4gIHRha2VzOiBwaWVjZUNhblRha2VQaWVjZShcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKSxcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCB0bylcbiAgKSxcbiAgdGFrZXNLaW5nOiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCB0bykudG9Mb3dlckNhc2UoKSA9PT0gXCJrXCIsXG4gIHBhd25Nb3ZlOiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKS50b0xvd2VyQ2FzZSgpID09PSBcInBcIixcbiAgY2FzdGxlczpcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKS50b0xvd2VyQ2FzZSgpID09PSBcImtcIiAmJlxuICAgIE1hdGguYWJzKGZyb20uZmlsZSAtIHRvLmZpbGUpID09PSAyXG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc2VyaWVzIG9mIG1vdmVzIGEgcGllY2UgY2FuIG1ha2Ugb24gYSBib2FyZC5cbiAqIFdpbGwgbm90IGluY2x1ZGUgY2FzdGxlcyBvciBlbiBwYXNzYW50LCB0aG9zZSBhcmUgaGFuZGxlZFxuICogc2VwZXJhdGVseVxuICpcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldE1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBzdGF0ZS5ib2FyZDtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKGJvYXJkLCBzcXVhcmUpO1xuXG4gIGlmIChwaWVjZSA9PT0gXCIgXCIpIHJldHVybiBbXTtcblxuICAvLyBHZXQgYWxsIG1vdmVzIGZvciB0aGUgcGllY2Ugd2l0aG91dCB3b3JyeWluZyBhYm91dCBpbGxlZ2FsIG1vdmVzXG4gIHJldHVybiBnZXRNb3Zlc0ZvclBpZWNlKHN0YXRlLCBzcXVhcmUsIHBpZWNlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBlbXB0eVNxdWFyZUNvZGVzXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBzYWZlU3F1YXJlQ29kZXNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBjYXN0bGluZ1ByZXZlbnRlZCA9IChzdGF0ZSwgZW1wdHlTcXVhcmVDb2Rlcywgc2FmZVNxdWFyZUNvZGVzKSA9PiB7XG4gIGNvbnN0IGNsZWFyUGF0aCA9IGVtcHR5U3F1YXJlQ29kZXNcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29kZSlcbiAgICAubWFwKHNxID0+IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSlcbiAgICAuZXZlcnkocGllY2VJc0VtcHR5KTtcblxuICBpZiAoIWNsZWFyUGF0aCkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3QgYXR0YWNrQ2VjayA9IHN0YXRlLndoaXRlVG9Nb3ZlXG4gICAgPyBibGFja1BpZWNlQXR0YWNrc1NxdWFyZVxuICAgIDogd2hpdGVQaWVjZUF0dGFja3NTcXVhcmU7XG5cbiAgY29uc3QgdW5kZXJBdHRhY2sgPSBzYWZlU3F1YXJlQ29kZXNcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29kZSlcbiAgICAuc29tZShzcSA9PiBhdHRhY2tDZWNrKHN0YXRlLCBzcSkpO1xuXG4gIHJldHVybiB1bmRlckF0dGFjaztcbn07XG5cbmNvbnN0IGNhc3RsZU1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBvcHRzID0ge1xuICAgIEs6IHtcbiAgICAgIGxvbmc6IHtcbiAgICAgICAgcGF0aDogW1wiYjFcIiwgXCJjMVwiLCBcImQxXCJdLFxuICAgICAgICBzYWZlOiBbXCJhMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiXVxuICAgICAgfSxcbiAgICAgIHNob3J0OiB7XG4gICAgICAgIHBhdGg6IFtcImYxXCIsIFwiZzFcIl0sXG4gICAgICAgIHNhZmU6IFtcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImUxXCJdXG4gICAgICB9XG4gICAgfSxcbiAgICBrOiB7XG4gICAgICBsb25nOiB7XG4gICAgICAgIHBhdGg6IFtcImI4XCIsIFwiYzhcIiwgXCJkOFwiXSxcbiAgICAgICAgc2FmZTogW1wiYThcIiwgXCJjOFwiLCBcImQ4XCIsIFwiZThcIl1cbiAgICAgIH0sXG4gICAgICBzaG9ydDoge1xuICAgICAgICBwYXRoOiBbXCJmOFwiLCBcImc4XCJdLFxuICAgICAgICBzYWZlOiBbXCJmOFwiLCBcImc4XCIsIFwiaDhcIiwgXCJlOFwiXVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjYW5DYXN0bGVMb25nID0gcGllY2VJc0JsYWNrKHBpZWNlKVxuICAgID8gc3RhdGUuYmxhY2tDYW5DYXN0bGVMb25nXG4gICAgOiBzdGF0ZS53aGl0ZUNhbkNhc3RsZUxvbmc7XG5cbiAgY29uc3QgY2FuQ2FzdGxlU2hvcnQgPSBwaWVjZUlzQmxhY2socGllY2UpXG4gICAgPyBzdGF0ZS5ibGFja0NhbkNhc3RsZVNob3J0XG4gICAgOiBzdGF0ZS53aGl0ZUNhbkNhc3RsZVNob3J0O1xuXG4gIGNvbnN0IGxvbmdDYXN0bGVPcHRzID0gb3B0c1twaWVjZV0ubG9uZztcbiAgY29uc3Qgc2hvcnRDYXN0bGVPcHRzID0gb3B0c1twaWVjZV0uc2hvcnQ7XG5cbiAgaWYgKFxuICAgIGNhbkNhc3RsZUxvbmcgJiZcbiAgICAhY2FzdGxpbmdQcmV2ZW50ZWQoc3RhdGUsIGxvbmdDYXN0bGVPcHRzLnBhdGgsIGxvbmdDYXN0bGVPcHRzLnNhZmUpXG4gICkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBbMCwgLTJdKSwgc3RhdGUpKTtcbiAgfVxuXG4gIGlmIChcbiAgICBjYW5DYXN0bGVTaG9ydCAmJlxuICAgICFjYXN0bGluZ1ByZXZlbnRlZChzdGF0ZSwgc2hvcnRDYXN0bGVPcHRzLnBhdGgsIHNob3J0Q2FzdGxlT3B0cy5zYWZlKVxuICApIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgWzAsIDJdKSwgc3RhdGUpKTtcbiAgfVxuXG4gIHJldHVybiBtb3Zlcztcbn07XG5cbi8qKlxuICogR2V0cyBhIGxpc3Qgb2YgbGVnYWwgbW92ZXMgZm9yIHRoZSBwaWVjZSBvbiBhIHNxdWFyZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0TGVnYWxNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcblxuICBpZiAocGllY2VJc0JsYWNrKHBpZWNlKSAmJiAhc3RhdGUuYmxhY2tUb01vdmUpIHJldHVybiBbXTtcbiAgaWYgKHBpZWNlSXNXaGl0ZShwaWVjZSkgJiYgIXN0YXRlLndoaXRlVG9Nb3ZlKSByZXR1cm4gW107XG5cbiAgbGV0IG1vdmVzID0gZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSk7XG5cbiAgaWYgKHBpZWNlID09PSBcIktcIiB8fCBwaWVjZSA9PT0gXCJrXCIpIHtcbiAgICBtb3ZlcyA9IG1vdmVzLmNvbmNhdChjYXN0bGVNb3ZlcyhzdGF0ZSwgc3F1YXJlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXMuZmlsdGVyKG1vdmUgPT4gIW1vdmVQdXRzT3duS2luZ0luQ2hlY2soc3RhdGUsIG1vdmUpKTtcbn07XG5cbi8qKlxuICogR2V0cyBhIGxpc3Qgb2YgYWxsIGxlZ2FsIG1vdmVzIGZvciBhIHN0YXRlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEFsbExlZ2FsTW92ZXMgPSBzdGF0ZSA9PlxuICBTcXVhcmUuYWxsSW5Cb2FyZCgpLnJlZHVjZShcbiAgICAobW92ZXMsIHNxdWFyZSkgPT4gbW92ZXMuY29uY2F0KGdldExlZ2FsTW92ZXMoc3RhdGUsIHNxdWFyZSkpLFxuICAgIFtdXG4gICk7XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBtb3ZlUHV0c093bktpbmdJbkNoZWNrID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGNvbnN0IG1vdmVkUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuICBjb25zdCBuZXdTdGF0ZSA9IGFwcGx5TW92ZVRvR2FtZVN0YXRlKHN0YXRlLCBtb3ZlKTtcblxuICByZXR1cm4gcGllY2VJc0JsYWNrKG1vdmVkUGllY2UpXG4gICAgPyBibGFja0luQ2hlY2sobmV3U3RhdGUpXG4gICAgOiB3aGl0ZUluQ2hlY2sobmV3U3RhdGUpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IG1vdmVHaXZlc0NoZWNrID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGNvbnN0IG1vdmVkUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuICBjb25zdCBuZXdTdGF0ZSA9IGFwcGx5TW92ZVRvR2FtZVN0YXRlKHN0YXRlLCBtb3ZlKTtcblxuICByZXR1cm4gcGllY2VJc0JsYWNrKG1vdmVkUGllY2UpXG4gICAgPyB3aGl0ZUluQ2hlY2sobmV3U3RhdGUpXG4gICAgOiBibGFja0luQ2hlY2sobmV3U3RhdGUpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL01vdmVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBleHBsb3JlcyBhIGRpcmVjdGlvbiBvbiBhIGJvYXJkIHVudGlsIHRoZSBwaWVjZVxuICogaXMgb3V0IG9mIG1vdmVzXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGlyZWN0aW9uXG4gKiBAcGFyYW0ge1tudW1iZXJdfSBkZWx0YVxuICogQHBhcmFtIHtbTW92ZV19IHJlc3VsdHNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmNvbnN0IGdldE1vdmVzVW50aWxOb3RFbXB0eSA9IChcbiAgc3RhdGUsXG4gIHBpZWNlLFxuICBzcXVhcmUsXG4gIGRpcmVjdGlvbixcbiAgZGVsdGEgPSBbMCwgMF0sXG4gIHJlc3VsdHMgPSBbXVxuKSA9PiB7XG4gIGNvbnN0IG5ld0RlbHRhID0gW2RlbHRhWzBdICsgZGlyZWN0aW9uWzBdLCBkZWx0YVsxXSArIGRpcmVjdGlvblsxXV07XG5cbiAgY29uc3QgbmV4dFNxdWFyZSA9IFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBuZXdEZWx0YSk7XG5cbiAgLy8gRWRnZSBvZiBib2FyZCwgZW5kIG9mIG1vdmVcbiAgaWYgKCFuZXh0U3F1YXJlLmluQm91bmRzKSByZXR1cm4gcmVzdWx0cztcblxuICBjb25zdCB0b1BpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbmV4dFNxdWFyZSk7XG4gIGNvbnN0IGhhc1BpZWNlID0gdG9QaWVjZSAhPT0gXCIgXCI7XG4gIGNvbnN0IGhhc0VuZW15UGllY2UgPSBoYXNQaWVjZSAmJiAhcGllY2VzQXJlU2FtZUNvbG9yKHBpZWNlLCB0b1BpZWNlKTtcblxuICAvLyBPd24gcGllY2UsIGVuZCBvZiBtb3ZlXG4gIGlmIChoYXNQaWVjZSAmJiAhaGFzRW5lbXlQaWVjZSkgcmV0dXJuIHJlc3VsdHM7XG5cbiAgLy8gV2UgY2FuIG1ha2UgYSBtb3ZlIGZvciBzdXJlXG4gIGNvbnN0IG1vdmUgPSBNb3ZlKHNxdWFyZSwgbmV4dFNxdWFyZSwgc3RhdGUpO1xuXG4gIGlmIChoYXNQaWVjZSkgcmV0dXJuIHJlc3VsdHMuY29uY2F0KG1vdmUpO1xuXG4gIHJldHVybiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoXG4gICAgc3RhdGUsXG4gICAgcGllY2UsXG4gICAgc3F1YXJlLFxuICAgIGRpcmVjdGlvbixcbiAgICBuZXdEZWx0YSxcbiAgICByZXN1bHRzLmNvbmNhdChtb3ZlKVxuICApO1xufTtcblxuLyoqXG4gKiBHZXRzIGEgbGlzdCBvZiBtb3ZlcyBmb3IgYSBwaWVjZSBvbiBhIHNxdWFyZSBiYXNlZCBvbiBhIHNldCBvZlxuICogZGlyZWN0aW9uc1xuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge1tbbnVtYmVyXV19IGRpcmVjdGlvbnNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXREaXJlY3Rpb25hbE1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIGRpcmVjdGlvbnMpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuICByZXR1cm4gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoc3RhdGUsIHBpZWNlLCBzcXVhcmUsIGQpKVxuICAgIC5yZWR1Y2UoKHhzLCB4KSA9PiB4cy5jb25jYXQoeCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2RpcmVjdGlvbkJhc2VkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFN0YXJ0UG9zaXRpb24sIG1vdmVQaWVjZUluQm9hcmQsIGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgTW92ZSwgZ2V0TW92ZXMgfSBmcm9tIFwiLi9Nb3Zlc1wiO1xuaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBwaWVjZUlzQmxhY2ssIHBpZWNlSXNXaGl0ZSB9IGZyb20gXCIuL3BpZWNlXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuL1NxdWFyZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaGVzcyBib2FyZCBkdXJpbmcgYSBnYW1lXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBHYW1lU3RhdGVcbiAqIEBwcm9wZXJ0eSB7W1tzdHJpbmddXX0gYm9hcmRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVUb01vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tUb01vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVDYW5DYXN0bGVTaG9ydFxuICogQHByb3BlcnR5IHtib29sZWFufSB3aGl0ZUNhbkNhc3RsZUxvbmdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tDYW5DYXN0bGVTaG9ydFxuICogQHByb3BlcnR5IHtib29sZWFufSBibGFja0NhbkNhc3RsZUxvbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nP30gZW5QYXNzYW50IC0gUG9zaXRpb24gYmVoaW5kIGEgcGF3biB0aGF0IGp1c3QgbWFkZSBhIDIgc3F1YXJlIGFkdmFuY2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoYWxmTW92ZXMgLSBIYWxmIG1vdmVzIHNpbmNlIGxhc3QgY2FwdHVyZSBvciBwYXduXG4gKiBAcHJvcGVydHkge251bWJlcn0gbW92ZU5yIC0gVG90YWwgbW92ZXMgaW4gZ2FtZS4gU3RhcnRzIGF0IDEsIGluY3JlbWVudCBwZXIgYmxhY2sgbW92ZVxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgR2FtZVN0YXRlXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIC0gQSBsaXN0IG9mIHJvd3MgY29udGFpbmluZyBwaWVjZSBjb2Rlc1xuICogQHBhcmFtIHtzdHJpbmd9IHRvTW92ZSAtIFwid1wiIGZvciB3aGl0ZSwgXCJiXCIgZm9yIGJsYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FzdGxlT3B0aW9ucyAtIEFueSBjb21iaW5hdGlvbiBvZiBcIktRa3FcIiBmb3Igd2hpdGUvYmxhY2sga2luZy9xdWVlbiBzaWRlIGNhc3RsaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5QYXNzYW50U3F1YXJlIC0gUG9zaXRpb24gYmVoaW5kIGEgcGF3biB0aGF0IGp1c3QgbWFkZSBhIDIgc3F1YXJlIGFkdmFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gaGFsZk1vdmVzIC0gSGFsZiBtb3ZlcyBzaW5jZSBsYXN0IGNhcHR1cmUgb3IgcGF3biBhZHZhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGZ1bGxNb3ZlcyAtIFRvdGFsIG1vdmVzIGluIGdhbWUuIFN0YXJ0cyBhdCAxLCBpbmNyZW1lbnQgcGVyIGJsYWNrIG1vdmVcbiAqIEByZXR1cm5zIHtHYW1lU3RhdGV9XG4gKi9cbmNvbnN0IEdhbWVTdGF0ZSA9IChcbiAgYm9hcmQsXG4gIHRvTW92ZSA9IFwid1wiLFxuICBjYXN0bGVPcHRpb25zID0gXCJLUWtxXCIsXG4gIGVuUGFzc2FudFNxdWFyZSA9IFwiLVwiLFxuICBoYWxmTW92ZXMgPSAwLFxuICBmdWxsTW92ZXMgPSAxXG4pID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgYm9hcmQ6IGJvYXJkIHx8IFN0YXJ0UG9zaXRpb24oKSxcbiAgICAgIC8vIFNpZGUgdG8gbW92ZVxuICAgICAgd2hpdGVUb01vdmU6IHRvTW92ZSA9PT0gXCJ3XCIsXG4gICAgICBibGFja1RvTW92ZTogdG9Nb3ZlID09PSBcImJcIixcblxuICAgICAgLy8gRW4gcGFzc2FudFxuICAgICAgZW5QYXNzYW50OiBlblBhc3NhbnRTcXVhcmUgPT09IFwiLVwiID8gbnVsbCA6IGVuUGFzc2FudFNxdWFyZSxcbiAgICAgIC8vIE1vdmUgbnVtYmVyc1xuICAgICAgaGFsZk1vdmVzOiAraGFsZk1vdmVzLFxuICAgICAgbW92ZU5yOiArZnVsbE1vdmVzXG4gICAgfSxcbiAgICBjYXN0bGVPcHRpb25zRnJvbVN0cmluZyhjYXN0bGVPcHRpb25zKVxuICApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FzdGxlU3RyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCBjYXN0bGVPcHRpb25zRnJvbVN0cmluZyA9IGNhc3RsZVN0ciA9PiAoe1xuICB3aGl0ZUNhbkNhc3RsZVNob3J0OiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwiS1wiKSxcbiAgd2hpdGVDYW5DYXN0bGVMb25nOiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwiUVwiKSxcbiAgYmxhY2tDYW5DYXN0bGVTaG9ydDogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcImtcIiksXG4gIGJsYWNrQ2FuQ2FzdGxlTG9uZzogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcInFcIilcbn0pO1xuXG5jb25zdCBjYXN0bGVTdHJGcm9tT3B0aW9ucyA9ICh7XG4gIHdoaXRlQ2FuQ2FzdGxlU2hvcnQsXG4gIHdoaXRlQ2FuQ2FzdGxlTG9uZyxcbiAgYmxhY2tDYW5DYXN0bGVTaG9ydCxcbiAgYmxhY2tDYW5DYXN0bGVMb25nXG59KSA9PlxuICBbXG4gICAgW1wiS1wiLCB3aGl0ZUNhbkNhc3RsZVNob3J0XSxcbiAgICBbXCJRXCIsIHdoaXRlQ2FuQ2FzdGxlTG9uZ10sXG4gICAgW1wia1wiLCBibGFja0NhbkNhc3RsZVNob3J0XSxcbiAgICBbXCJxXCIsIGJsYWNrQ2FuQ2FzdGxlTG9uZ11cbiAgXVxuICAgIC5maWx0ZXIoKFtjLCBwcmVkXSkgPT4gcHJlZClcbiAgICAubWFwKChbYywgcHJlZF0pID0+IGMpXG4gICAgLmpvaW4oXCJcIik7XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtzdHJpbmc/fVxuICovXG5jb25zdCBjYXN0bGVPcHRpb25zRGlmZiA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBsZXQgcHJldk9wdGlvbnMgPSBjYXN0bGVTdHJGcm9tT3B0aW9ucyhzdGF0ZSk7XG5cbiAgaWYgKCFwcmV2T3B0aW9ucykgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuXG4gIHN3aXRjaCAocGllY2UpIHtcbiAgICBjYXNlIFwia1wiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UoXCJrXCIsIFwiXCIpLnJlcGxhY2UoXCJxXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJyXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShtb3ZlLmZyb20uZmlsZSA9PT0gMCA/IFwicVwiIDogXCJrXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJLXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShcIktcIiwgXCJcIikucmVwbGFjZShcIlFcIiwgXCJcIik7XG4gICAgY2FzZSBcIlJcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKG1vdmUuZnJvbS5maWxlID09PSAwID8gXCJRXCIgOiBcIktcIiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gcHJldk9wdGlvbnM7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge0dhbWVTdGF0ZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5TW92ZVRvR2FtZVN0YXRlID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGxldCBib2FyZCA9IG1vdmVQaWVjZUluQm9hcmQoc3RhdGUuYm9hcmQsIG1vdmUuZnJvbSwgbW92ZS50byk7XG5cbiAgaWYgKG1vdmUuY2FzdGxlcykge1xuICAgIC8vIE1vdmUgdGhlIHJvb2sgYXMgd2VsbFxuICAgIGNvbnN0IHF1ZWVuU2lkZSA9IG1vdmUudG8uZmlsZSA9PT0gMjsgLy8gXCJjXCJcbiAgICBjb25zdCByZWxGcm9tID0gcXVlZW5TaWRlID8gWzAsIC0yXSA6IFswLCAxXTtcbiAgICBjb25zdCByZWxUbyA9IHF1ZWVuU2lkZSA/IFswLCAxXSA6IFswLCAtMV07XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibXVzdCBtb3ZlIHJvb2sgZnJvbVwiLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxGcm9tKS5jb2RlLFxuICAgICAgXCJ0b1wiLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxUbykuY29kZVxuICAgICk7XG5cbiAgICBib2FyZCA9IG1vdmVQaWVjZUluQm9hcmQoXG4gICAgICBib2FyZCxcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsRnJvbSksXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbFRvKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gR2FtZVN0YXRlKFxuICAgIGJvYXJkLFxuICAgIHN0YXRlLndoaXRlVG9Nb3ZlID8gXCJiXCIgOiBcIndcIixcbiAgICBjYXN0bGVPcHRpb25zRGlmZihzdGF0ZSwgbW92ZSksXG4gICAgbW92ZS5pc1Bhd25Nb3ZlICYmIG1vdmUudG8ucm93IC0gbW92ZS5mcm9tLnJvdyA9PT0gMiwgLy8gVE9ETzogKFNpbW9uKSBnZXQgZW4gcGFzc2FudCBzcXVhcmVcbiAgICBzdGF0ZS5oYWxmTW92ZXMgKyAxLFxuICAgIHN0YXRlLm1vdmVOciArIChzdGF0ZS53aGl0ZVRvTW92ZSA/IDEgOiAwKVxuICApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQ2hlY2sgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpLnNvbWUoc3F1YXJlID0+XG4gICAgZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSkuc29tZShtb3ZlID0+IG1vdmUudGFrZXNLaW5nKVxuICApO1xufTtcblxuLy8gVE9ETzogKFNpbW9uKSBEUllcbi8vIE5vdGU6IChTaW1vbikgSGF2aW5nIHRvIHJlY2FsY3VsYXRlIGFsbCBtb3ZlcyBmb3IgYSBjb2xvciBldmVyeSB0aW1lIG9uZVxuLy8gICAgICAgICAgICAgICBvZiB0aGVzZSBtZXRob2RzIGlzIGNhbGxlZCBpcyB2ZXJ5IGluZWZmaWNpZW50LiBQcm9iYWJseVxuLy8gICAgICAgICAgICAgICBiZXR0ZXIgdG8gc3RvcmUgcG9zc2libGUgbW92ZXMgd2l0aCBhIGdhbWUgc3RhdGVcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVJbkNoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc0JsYWNrKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3F1YXJlID0+IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZykpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYmxhY2tJbkNoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc1doaXRlKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3F1YXJlID0+IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZykpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb25lIG9mIHRoZSBibGFjayBwaWVjZXMgYXR0YWNrcyBhIHNxdWFyZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGJsYWNrUGllY2VBdHRhY2tzU3F1YXJlID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNCbGFjayhnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxID0+IGdldE1vdmVzKHN0YXRlLCBzcSkuc29tZShtb3ZlID0+IG1vdmUudG8uY29kZSA9PT0gc3F1YXJlLmNvZGUpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9uZSBvZiB0aGUgd2hpdGUgcGllY2VzIGF0dGFja3MgYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZVBpZWNlQXR0YWNrc1NxdWFyZSA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzV2hpdGUoZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3EpLnNvbWUobW92ZSA9PiBtb3ZlLnRvLmNvZGUgPT09IHNxdWFyZS5jb2RlKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9HYW1lU3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7W1tudW1iZXJdXSByZWxhdGl2ZXMgLSBTcXVhcmUgbG9jYXRpb25zIFtkUm93LCBkRmlsZV0gcmVsYXRpdmUgdG8gdGhpcyBzcXVhcmV9XG4gKiBAcmV0dXJucyB7W01vdmVzXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNxdWFyZU1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIHJlbGF0aXZlcykgPT4ge1xuICBjb25zdCB0aGlzUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuXG4gIGNvbnN0IHRvU3F1YXJlcyA9IHJlbGF0aXZlc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLmZpbHRlcihzID0+IHMuaW5Cb3VuZHMpXG4gICAgLm1hcChzID0+ICh7IHNxdWFyZTogcywgcGllY2U6IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHMpIH0pKVxuICAgIC8vIE9ubHkgZW1wdHkgc3F1YXJlcyBvciBzcXVhcmVzIHdpdGggZW5lbXkgcGllY2VzXG4gICAgLmZpbHRlcih0byA9PiB0by5waWVjZSA9PT0gXCIgXCIgfHwgIXBpZWNlc0FyZVNhbWVDb2xvcih0aGlzUGllY2UsIHRvLnBpZWNlKSk7XG5cbiAgcmV0dXJuIHRvU3F1YXJlcy5tYXAodG8gPT4gTW92ZShzcXVhcmUsIHRvLnNxdWFyZSwgc3RhdGUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9zcXVhcmVCYXNlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0RGlyZWN0aW9uYWxNb3ZlcyB9IGZyb20gXCIuL2RpcmVjdGlvbkJhc2VkXCI7XG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QmlzaG9wTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0RGlyZWN0aW9uYWxNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDFdLFxuICAgIFstMSwgMV0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzEsIC0xXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9iaXNob3AuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJvb2tNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXREaXJlY3Rpb25hbE1vdmVzKHN0YXRlLCBzcXVhcmUsIFtbMSwgMF0sIFstMSwgMF0sIFswLCAtMV0sIFswLCAxXV0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3Jvb2suanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHRyaW0gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IEdhbWVTdGF0ZSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcblxuLyogQSByZWd1bGFyIGNoZXNzIGdhbWUncyBzdGFydGluZyBwb3NpdGlvbiBpbiBGRU4gbm90YXRpb24gKi9cbmNvbnN0IFNUQVJUX1BPU0lUSU9OID1cbiAgXCJybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMVwiO1xuXG4vKipcbiAqIFNwbGl0cyB1cCBhIGZlbiBzdHJpbmcgaW4gdG8gcGFydHMgZm9yIHJvd3MsIHNpZGUgdG8gbW92ZSwgXG4gKiBjYXN0bGUgb3B0aW9ucywgZW4gcGFzc2FudCwgaGFsZiBtb3ZlcyBhbmQgZnVsbCBtb3Zlc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVuIFxuICogQHJldHVybnMge1tzdHJpbmddfVxuICovXG5jb25zdCBmZW5QYXJ0cyA9IGZlbiA9PiBmZW4uc3BsaXQoL1xccysvZyk7XG5cbi8qKlxuICogKFJlY3Vyc2l2ZWx5KSBjcmVhdGUgYSBmZW4gcm93IGNvZGUgZnJvbSBhIGxpc3Qgb2YgcGllY2VcbiAqIGNvZGVzLCBpbiB3aGljaCBlbXB0eSBzcXVhcmVzIGFyZSBcIiBcIlxuICogXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBwaWVjZXMgXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Jlc3VsdD1cIlwiXSBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW1wdGllcz0wXSBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3QgcGllY2VDb2Rlc1RvRmVuUm93ID0gKHBpZWNlcywgcmVzdWx0ID0gXCJcIiwgZW1wdGllcyA9IDApID0+XG4gIHBpZWNlcy5sZW5ndGggPT09IDBcbiAgICA/IHJlc3VsdCArIChlbXB0aWVzIHx8IFwiXCIpXG4gICAgOiBwaWVjZXNbMF0gPT09IFwiIFwiXG4gICAgICA/IHBpZWNlQ29kZXNUb0ZlblJvdyhwaWVjZXMuc2xpY2UoMSksIHJlc3VsdCwgZW1wdGllcyArIDEpXG4gICAgICA6IHBpZWNlQ29kZXNUb0ZlblJvdyhcbiAgICAgICAgICBwaWVjZXMuc2xpY2UoMSksXG4gICAgICAgICAgcmVzdWx0ICsgKGVtcHRpZXMgfHwgXCJcIikgKyBwaWVjZXNbMF0sXG4gICAgICAgICAgMFxuICAgICAgICApO1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgYSBmZW4gcm93IGNvZGUgKHBhcnQgYmV0d2VlbiAvLi4uLykgdG8gYSBsaXN0IG9mIHBpZWNlcyxcbiAqIGluIHdoaWNoIGVtcHR5IHNxdWFyZXMgYXJlIFwiIFwiXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZW5Sb3cgXG4gKiBAcmV0dXJucyBbc3RyaW5nXVxuICovXG5jb25zdCBmZW5Sb3dUb1BpZWNlQ29kZXMgPSBmZW5Sb3cgPT5cbiAgZmVuUm93XG4gICAgLnNwbGl0KFwiXCIpXG4gICAgLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MuY29uY2F0KCtwID4gMCA/IEFycmF5KCtwKS5maWxsKFwiIFwiKSA6IHApLCBbXSk7XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgRkVOIHN0cmluZyBpbiB0byBhIGdhbWUgc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gXG4gKiBAcmV0dXJucyB7R2FtZVN0YXRlfVxuICovXG5jb25zdCBmZW5Ub0dhbWVTdGF0ZSA9IGZlbiA9PiB7XG4gIGNvbnN0IFtyb3dzLCB0b01vdmUsIGNhc3RsZXMsIGVuUGFzc2FudCwgaGFsZk1vdmVzLCBmdWxsTW92ZXNdID0gZmVuUGFydHMoXG4gICAgZmVuXG4gICk7XG5cbiAgY29uc3QgYm9hcmQgPSByb3dzXG4gICAgLnNwbGl0KFwiL1wiKVxuICAgIC5tYXAodHJpbSlcbiAgICAubWFwKGZlblJvd1RvUGllY2VDb2Rlcyk7XG5cbiAgcmV0dXJuIEdhbWVTdGF0ZShib2FyZCwgdG9Nb3ZlLCBjYXN0bGVzLCBlblBhc3NhbnQsIGhhbGZNb3ZlcywgZnVsbE1vdmVzKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBGRU4gc3RyaW5nIGZyb20gYSBHYW1lU3RhdGVcbiAqIFxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgZ2FtZVN0YXRlVG9GZW4gPSBzdGF0ZSA9PiB7XG4gIGNvbnN0IHJvd3MgPSBzdGF0ZS5ib2FyZC5tYXAocCA9PiBwaWVjZUNvZGVzVG9GZW5Sb3cocCkpO1xuXG4gIHJldHVybiBbXG4gICAgcm93cy5qb2luKFwiL1wiKSxcbiAgICBzdGF0ZS53aGl0ZVRvTW92ZSA/IFwid1wiIDogXCJiXCIsXG4gICAgW1xuICAgICAgc3RhdGUud2hpdGVDYW5DYXN0bGVTaG9ydCA/IFwiS1wiIDogXCJcIixcbiAgICAgIHN0YXRlLndoaXRlQ2FuQ2FzdGxlTG9uZyA/IFwiUVwiIDogXCJcIixcbiAgICAgIHN0YXRlLmJsYWNrQ2FuQ2FzdGxlU2hvcnQgPyBcImtcIiA6IFwiXCIsXG4gICAgICBzdGF0ZS5ibGFja0NhbkNhc3RsZUxvbmcgPyBcInFcIiA6IFwiXCJcbiAgICBdLmpvaW4oXCJcIikgfHwgXCItXCIsXG4gICAgc3RhdGUuZW5QYXNzYW50IHx8IFwiLVwiLFxuICAgIHN0YXRlLmhhbGZNb3ZlcyxcbiAgICBzdGF0ZS5tb3ZlTnJcbiAgXS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmVuVG9HYW1lU3RhdGUsXG4gIGdhbWVTdGF0ZVRvRmVuLFxuICBTVEFSVF9QT1NJVElPTlxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0ZFTi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuLy4uL0JvYXJkXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuaW1wb3J0IHsgTW92ZSB9IGZyb20gXCIuLy4uL01vdmVzXCI7XG5cbmltcG9ydCB7IHBpZWNlSXNCbGFjaywgcGllY2VJc1doaXRlLCBwaWVjZUlzRW1wdHkgfSBmcm9tIFwiLi8uLi9waWVjZVwiO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIHBvc3NpYmxlIG1vdmVzIGZvciBhIHNxdWFyZSB0aGF0IGhvbGRzIGEgcGF3blxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQYXduTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBib2FyZCA9IHN0YXRlLmJvYXJkO1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHNxdWFyZSk7XG4gIGNvbnN0IGlzQmxhY2sgPSBwaWVjZUlzQmxhY2socGllY2UpO1xuXG4gIGNvbnN0IGNhblRha2UgPSAoeyBzcXVhcmUsIHBpZWNlIH0pID0+XG4gICAgLy8gVGhlcmUncyBwaWVjZSBpbmZvXG4gICAgcGllY2UgJiZcbiAgICAvLyBUaGUgc3F1YXJlIGlzIG9uIHRoZSBib2FyZFxuICAgIHNxdWFyZS5pbkJvdW5kcyAmJlxuICAgIC8vIFRoZXJlJ3MgYSBwaWVjZSBvZiB0aGUgb3Bwb3NpdGUgY29sb3IgT1JcbiAgICAvLyBpdCdzIHRoZSBzdGF0ZSdzIGVuIHBhc3NhbnQgc3F1YXJlXG4gICAgKChpc0JsYWNrID8gcGllY2VJc1doaXRlKHBpZWNlKSA6IHBpZWNlSXNCbGFjayhwaWVjZSkpIHx8XG4gICAgICBzdGF0ZS5lblBhc3NhbnQgPT09IHNxdWFyZS5jb2RlKTtcblxuICBjb25zdCBjYW5Nb3ZlID0gKHsgc3F1YXJlLCBwaWVjZSB9KSA9PiBzcXVhcmUuaW5Cb3VuZHMgJiYgcGllY2VJc0VtcHR5KHBpZWNlKTtcblxuICBjb25zdCBpc1N0YXJ0UG9zID0gaXNCbGFjayA/IHNxdWFyZS5yb3cgPT09IDEgOiBzcXVhcmUucm93ID09PSA2O1xuXG4gIGNvbnN0IGRpcmVjdGlvbnMgPSBbXG4gICAgaXNCbGFjayA/IFsxLCAwXSA6IFstMSwgMF0sIC8vIEZpcnN0IHN0ZXBcbiAgICBpc0JsYWNrID8gWzIsIDBdIDogWy0yLCAwXSwgLy8gU2Vjb25kIHN0ZXBcbiAgICBpc0JsYWNrID8gWzEsIC0xXSA6IFstMSwgLTFdLCAvLyBUYWtlcyBsZWZ0XG4gICAgaXNCbGFjayA/IFsxLCAxXSA6IFstMSwgMV0gLy8gVGFrZXMgcmlnaHRcbiAgXTtcblxuICBjb25zdCBwaWVjZXNBdFZhbGlkU3F1YXJlcyA9IGRpcmVjdGlvbnNcbiAgICAubWFwKGQgPT4gU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIGQpKVxuICAgIC5tYXAocyA9PiAoe1xuICAgICAgcGllY2U6IHMuaW5Cb3VuZHMgPyBnZXRQaWVjZUF0U3F1YXJlKGJvYXJkLCBzKSA6IG51bGwsXG4gICAgICBzcXVhcmU6IHNcbiAgICB9KSk7XG5cbiAgY29uc3QgbW92ZXMgPSBbXTtcbiAgY29uc3QgW2ZpcnN0U3RlcCwgc2Vjb25kU3RlcCwgdGFrZXNMZWZ0LCB0YWtlc1JpZ2h0XSA9IHBpZWNlc0F0VmFsaWRTcXVhcmVzO1xuXG4gIGlmIChjYW5Nb3ZlKGZpcnN0U3RlcCkpIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBmaXJzdFN0ZXAuc3F1YXJlLCBzdGF0ZSkpO1xuXG4gICAgaWYgKGlzU3RhcnRQb3MgJiYgY2FuTW92ZShzZWNvbmRTdGVwKSkge1xuICAgICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgc2Vjb25kU3RlcC5zcXVhcmUsIHN0YXRlKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNhblRha2UodGFrZXNMZWZ0KSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIHRha2VzTGVmdC5zcXVhcmUsIHN0YXRlKSk7XG4gIH1cblxuICBpZiAoY2FuVGFrZSh0YWtlc1JpZ2h0KSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIHRha2VzUmlnaHQuc3F1YXJlLCBzdGF0ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3Bhd24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldFNxdWFyZU1vdmVzIH0gZnJvbSBcIi4vc3F1YXJlQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHsqfSBzdGF0ZSBcbiAqIEBwYXJhbSB7Kn0gc3F1YXJlIFxuICovXG5leHBvcnQgY29uc3QgZ2V0S25pZ2h0TW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0U3F1YXJlTW92ZXMoc3RhdGUsIHNxdWFyZSwgW1xuICAgIFsxLCAyXSxcbiAgICBbMSwgLTJdLFxuICAgIFstMSwgMl0sXG4gICAgWy0xLCAtMl0sXG4gICAgWzIsIC0xXSxcbiAgICBbMiwgMV0sXG4gICAgWy0yLCAtMV0sXG4gICAgWy0yLCAxXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9rbmlnaHQuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldFNxdWFyZU1vdmVzIH0gZnJvbSBcIi4vc3F1YXJlQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLaW5nTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICAvLyBUT0RPOiAoU2ltb24pIENhc3RsaW5nXG4gIHJldHVybiBnZXRTcXVhcmVNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDBdLFxuICAgIFsxLCAxXSxcbiAgICBbMCwgMV0sXG4gICAgWy0xLCAxXSxcbiAgICBbLTEsIDBdLFxuICAgIFstMSwgLTFdLFxuICAgIFswLCAtMV0sXG4gICAgWzEsIC0xXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9raW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbmltcG9ydCB7IGdldEJpc2hvcE1vdmVzIH0gZnJvbSBcIi4vYmlzaG9wXCI7XG5pbXBvcnQgeyBnZXRSb29rTW92ZXMgfSBmcm9tIFwiLi9yb29rXCI7XG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlZW5Nb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXRCaXNob3BNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5jb25jYXQoZ2V0Um9va01vdmVzKHN0YXRlLCBzcXVhcmUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9xdWVlbi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==