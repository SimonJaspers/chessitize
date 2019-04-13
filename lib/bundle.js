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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);


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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Square__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moves_pawn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__moves_knight__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__moves_king__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__piece__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__moves_bishop__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__moves_queen__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__moves_rook__ = __webpack_require__(9);














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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__piece__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Square__ = __webpack_require__(0);






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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Square__ = __webpack_require__(0);





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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__piece__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Square__ = __webpack_require__(0);





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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(6);

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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(6);

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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageHandling_squareChanges__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageHandling_crop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageHandling_perspectiveTransform__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameState__ = __webpack_require__(5);






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

  const gameState = ko.observable(Object(__WEBPACK_IMPORTED_MODULE_4__GameState__["d" /* default */])());
  const board = ko.pureComputed(() => gameState().board);
  const selectedMove = ko.observable(null);

  // A list of 64 canvases showing pixel edges
  const debugOverlay = ko.observableArray([]);
  const visibleDebugOverlay = ko.pureComputed(
    () => {
      if (!selectedMove()) return debugOverlay();
   
      const { move: { from, to } } = selectedMove();
      return debugOverlay()
        .map((cvs, i) => i === from.index || i === to.index
          ? cvs
          : null
        );
    }
  );

  return {
    gameState,
    board,
    imageVisible: ko.observable(false),
    original: img.src,
    crop: cropDataURL,
    cropCvs: myCrop,
    moveRating: ko.observableArray([]),
    onClick: (d, e) => {
      const bbox = e.target.getBoundingClientRect();
      fourPoints.push({
        x: e.clientX - bbox.x,
        y: e.clientY - bbox.y
      });
    },
    selectMove: move => {
      if (selectedMove() === move) {
        selectedMove(null);
      } else {
        selectedMove(move);
      }
    },
    selectedMove,
    debugOverlay,
    visibleDebugOverlay
  };
};

const App = function() {
  const transformFrom = ko.observableArray([
    { x: 120, y: 45 },
    { x: 403, y: 43 },
    { x: 394, y: 325 },
    { x: 125, y: 323 }
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

  this.lastLastChanges = ko.observable([]);
  this.lastChanges = ko.observableArray([]);
  this.lastChanges.subscribe(this.lastLastChanges, null, "beforeChange");

  const getBestGuess = (imgBefore, imgAfter) => {
    const ctxBefore = imgBefore.cropCvs().getContext("2d");
    const ctxAfter = imgAfter.cropCvs().getContext("2d");

    const changes = Object(__WEBPACK_IMPORTED_MODULE_0__imageHandling_squareChanges__["a" /* squareChanges */])(ctxBefore, ctxAfter);
    // Side effect: store debug overlay
    this.lastChanges(changes.map(c => c.debugOverlay));

    const gameStateBefore = imgBefore.gameState();
    const allowedMoves = Object(__WEBPACK_IMPORTED_MODULE_3__Moves__["b" /* getAllLegalMoves */])(gameStateBefore);

    const possibilities = allowedMoves
      .map(move => {
        const fromSquareChange = changes[move.from.index].difference;
        const toSquareChange = changes[move.to.index].difference;

        // Note: (Simon) The "from" square is always empty after a move
        //               Therefore, it's expected to show a large diff
        //               making it easier to recognise.

        const totalChange = Math.round(1.5 * fromSquareChange + toSquareChange);

        return {
          move,
          fromSquareChange,
          toSquareChange,
          totalChange,
          from: move.from.code,
          to: move.to.code
        };
      })
      .sort((p1, p2) => p2.totalChange - p1.totalChange);

    return possibilities;
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

      const moves = getBestGuess(before, after);
      const move = moves[0].move;
      after.debugOverlay(this.lastChanges());
      after.moveRating(moves);
      after.selectedMove(moves[0]);
      after.gameState(Object(__WEBPACK_IMPORTED_MODULE_4__GameState__["a" /* applyMoveToGameState */])(before.gameState(), move));
    });
  };

  this.overlay = ko.observable(false);
  this.showEdges = ko.observable(true);
};

ko.bindingHandlers.placeAll = {
  init: (el, va) => {
    ko.computed(() => {
      el.innerHTML = "";
      const innerEls = ko.unwrap(va()) || [];
      innerEls.forEach((e, i) => {
        if (e) { // Allow for gaps
          Object.assign(e.style, {
            position: "absolute",
            top: `${Math.floor(i / 8) * 32 + 2}px`,
            left: `${i % 8 * 32 + 2}px`
          })
          el.appendChild(e);
        }
      });
    });
  }
};

ko.applyBindings(new App());


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Square__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(4);



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

  const changes = __WEBPACK_IMPORTED_MODULE_0__Square__["a" /* default */].allInBoard().map(square => {
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

  const changes = __WEBPACK_IMPORTED_MODULE_0__Square__["a" /* default */].allInBoard().map(square => {
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
const squareChanges = edgePixelCountDiff;
/* harmony export (immutable) */ __webpack_exports__["a"] = squareChanges;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @param {DataURL} dataURL
 * @param {ko.observable} writeTo
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
/* 13 */
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
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Square__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__piece__ = __webpack_require__(3);






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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(7);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(7);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directionBased__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bishop__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(9);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWQ3ODliZjEzNzIyOWY4MTc3Y2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9waWVjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvZGlyZWN0aW9uQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3NxdWFyZUJhc2VkLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9iaXNob3AuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3Jvb2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9wYXduLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9rbmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2tpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3F1ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDL002QjtBQUNGO0FBQ1o7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsV0FBVztBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QUNsRTZCO0FBQ0Y7QUFDWjtBQUNmOztBQUVBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixXQUFXO0FBQ1gsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkdBQXFEO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ3RCOEI7QUFDOUI7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7QUNiOEI7QUFDOUI7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDUndCO0FBQ1Q7QUFDZ0I7QUFDSjtBQUNlOztBQUUxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsUUFBUSxXQUFXLEVBQUU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUssZ0JBQWdCO0FBQ3JCLEtBQUssZ0JBQWdCO0FBQ3JCLEtBQUssaUJBQWlCO0FBQ3RCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0MscUJBQXFCLGVBQWU7QUFDcEMsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUMxTEE7QUFDZ0I7O0FBRWhCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLHlCQUF5QjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLHlCQUF5QjtBQUNwQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyx5QkFBeUI7QUFDcEMsV0FBVyx5QkFBeUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7O0FDL05BO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsY0FBYztBQUN6QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7QUNuQkEsNEJBQTRCLE9BQU87O0FBRW5DO0FBQ0EsV0FBVyxFQUFFLEtBQUssRUFBRTtBQUNwQixXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUNsQjJCO0FBQzNCO0FBQ2U7O0FBRW9DOztBQUVuRDtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsZ0JBQWdCOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ2hFeUI7QUFDekI7QUFDQSxXQUFXLEVBQUU7QUFDYixXQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ2hCeUI7QUFDekI7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7QUNsQjhCO0FBQ0w7QUFDRjtBQUN2QjtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiIuL2xpYi9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWQ3ODliZjEzNzIyOWY4MTc3Y2UiLCJpbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHJvd09yZGVyID0gXCI4NzY1NDMyMVwiO1xuY29uc3QgZmlsZU9yZGVyID0gXCJhYmNkZWZnaFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzcXVhcmUgaW4gYSBjaGVzcyBib2FyZCB3aXRob3V0IGl0cyBjb250ZW50c1xuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNxdWFyZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IHJvd1xuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpbGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb2RlIC0gTmFtZSBvZiB0aGUgc3F1YXJlXG4gKiBAcHJvcGVydHkge1tudW1iZXJdfSBjb29yZCAtIHJvdyBhbmQgZmlsZSBucnMgaW4gYXJyYXlcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaW5Cb3VuZHMgLSBpcyB0aGlzIGEgbGVnYWwgc3F1YXJlXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBzcXVhcmUgYnkgcm93IGFuZCBmaWxlIG5yLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3dOclxuICogQHBhcmFtIHtudW1iZXJ9IGZpbGVOclxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuY29uc3QgU3F1YXJlID0gKHJvd05yLCBmaWxlTnIpID0+ICh7XG4gIHJvdzogcm93TnIsXG4gIGZpbGU6IGZpbGVOcixcbiAgaW5kZXg6IHJvd05yICogOCArIGZpbGVOcixcbiAgY29kZTogYCR7ZmlsZU9yZGVyW2ZpbGVOcl19JHtyb3dPcmRlcltyb3dOcl19YCxcbiAgY29vcmQ6IFtyb3dOciwgZmlsZU5yXSxcbiAgaW5Cb3VuZHM6IHJvd05yID49IDAgJiYgcm93TnIgPD0gNyAmJiBmaWxlTnIgPj0gMCAmJiBmaWxlTnIgPD0gN1xufSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgc3F1YXJlIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUNvZGUgPSBjb2RlID0+XG4gIFNxdWFyZShyb3dPcmRlci5pbmRleE9mKGNvZGVbMV0pLCBmaWxlT3JkZXIuaW5kZXhPZihjb2RlWzBdKSk7XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcXVhcmUgZm9yIGEgY29vcmRpbmF0ZSBhcnJheVxuICogQHBhcmFtIHtbbnVtYmVyXX0gY29vcmRzIC0gW3Jvd05yLCBmaWxlTnJdXG4gKi9cblNxdWFyZS5mcm9tQ29vcmQgPSAoW3Jvd05yLCBmaWxlTnJdKSA9PiBTcXVhcmUocm93TnIsIGZpbGVOcik7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBzcXVhcmUgYmFzZWQgb24gYW4gb2xkIHNxdWFyZSBhbmQgYSBkZWx0YVxuICpcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgLSBUaGUgcmVmZXJlbmNlIHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGVsdGEgLSBUaGUgZFJvdyBhbmQgZEZpbGUgdG8gdHJhbnNsYXRlXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUucmVsYXRpdmVGcm9tID0gKHsgcm93LCBmaWxlIH0sIFtkUm93LCBkRmlsZV0pID0+XG4gIFNxdWFyZShyb3cgKyBkUm93LCBmaWxlICsgZEZpbGUpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzcXVhcmUgZm9yIGFuIGluZGV4IHN0YXJ0aW5nIGxlZnQgdG8gcmlnaHQsIHRvcCB0byBib3R0b21cbiAqIEBwYXJhbSB7TnVtYmVyfSBpXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5TcXVhcmUuZnJvbUluZGV4ID0gaSA9PiBTcXVhcmUoTWF0aC5mbG9vcihpIC8gOCksIGkgJSA4KTtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCB0aGUgc3F1YXJlcyBpbiBhIGNoZXNzIGJvYXJkXG4gKiBAcmV0dXJucyB7W1NxdWFyZV19XG4gKi9cblNxdWFyZS5hbGxJbkJvYXJkID0gKCkgPT5cbiAgcmFuZ2UoNjQpXG4gICAgLm1hcChpID0+IFtNYXRoLmZsb29yKGkgLyA4KSwgaSAlIDhdKVxuICAgIC5tYXAoU3F1YXJlLmZyb21Db29yZCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNxdWFyZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1NxdWFyZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFJldHVybnMgYSBib2FyZCB0aGF0IGhvbGRzIGEgZGVmYXVsdCBzdGFydCBwb3NpdGlvblxuICogQHJldHVybnMge1tbc3RyaW5nXV19XG4gKi9cbmV4cG9ydCBjb25zdCBTdGFydFBvc2l0aW9uID0gKCkgPT4gW1xuICBbXCJyXCIsIFwiblwiLCBcImJcIiwgXCJxXCIsIFwia1wiLCBcImJcIiwgXCJuXCIsIFwiclwiXSxcbiAgW1wicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiXSxcbiAgW1wiUlwiLCBcIk5cIiwgXCJCXCIsIFwiUVwiLCBcIktcIiwgXCJCXCIsIFwiTlwiLCBcIlJcIl1cbl07XG5cbmNvbnN0IGNsb25lID0gYm9hcmQgPT4gYm9hcmQuc2xpY2UoMCkubWFwKHJvdyA9PiByb3cuc2xpY2UoMCkpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHBpZWNlIChcIiBcIiBpZiBlbXB0eSkgYXQgYSBwb3NpdGlvbiBpbiBhIGJvYXJkXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQaWVjZUF0U3F1YXJlID0gKGJvYXJkLCBzcXVhcmUpID0+XG4gIGJvYXJkW3NxdWFyZS5yb3ddW3NxdWFyZS5maWxlXTtcblxuLyoqXG4gKiBTZXRzIHRoZSBzcXVhcmUgaW4gYSBib2FyZCB0byBhIChwaWVjZS9lbXB0eSkgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgXG4gKi9cbmNvbnN0IHNldFNxdWFyZVN0cmluZyA9IChib2FyZCwgc3F1YXJlLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBuZXdCb2FyZCA9IGNsb25lKGJvYXJkKTtcbiAgbmV3Qm9hcmRbc3F1YXJlLnJvd11bc3F1YXJlLmZpbGVdID0gdmFsdWU7XG4gIHJldHVybiBuZXdCb2FyZDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBwaWVjZSBpbiB3aGljaCB0aGUgZnJvbVNxdWFyZSBpcyBlbXB0eSwgYW5kXG4gKiB0aGUgdG9TcXVhcmUgaGFzIHRoZSBtb3ZlZCBwaWVjZS4gTm90ZTogdGhpcyBmdW5jdGlvbiBkb2VzXG4gKiBub3QgcGVyZm9ybSBhbnkgdmFsaWRpdHkgY2hlY2tzXG4gKiBcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgXG4gKiBAcGFyYW0ge1NxdWFyZX0gZnJvbVNxdWFyZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSB0b1NxdWFyZSBcbiAqIEByZXR1cm5zIHtbW3N0cmluZ11dfVxuICovXG5leHBvcnQgY29uc3QgbW92ZVBpZWNlSW5Cb2FyZCA9IChib2FyZCwgZnJvbVNxdWFyZSwgdG9TcXVhcmUpID0+XG4gIHNldFNxdWFyZVN0cmluZyhcbiAgICBzZXRTcXVhcmVTdHJpbmcoYm9hcmQsIGZyb21TcXVhcmUsIFwiIFwiKSwgLy8gQm9hcmQgd2l0aG91dCBmcm9tU3F1YXJlXG4gICAgdG9TcXVhcmUsXG4gICAgZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgZnJvbVNxdWFyZSkgLy8gR2V0IHZhbHVlIGZyb20gb2xkIHNxdWFyZVxuICApO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQm9hcmQuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEdhbWVTdGF0ZSwge1xuICBhcHBseU1vdmVUb0dhbWVTdGF0ZSxcbiAgd2hpdGVJbkNoZWNrLFxuICBibGFja0luQ2hlY2ssXG4gIGJsYWNrUGllY2VBdHRhY2tzU3F1YXJlLFxuICB3aGl0ZVBpZWNlQXR0YWNrc1NxdWFyZVxufSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vU3F1YXJlXCI7XG5cbmltcG9ydCB7IGdldFBhd25Nb3ZlcyB9IGZyb20gXCIuL21vdmVzL3Bhd25cIjtcbmltcG9ydCB7IGdldEtuaWdodE1vdmVzIH0gZnJvbSBcIi4vbW92ZXMva25pZ2h0XCI7XG5pbXBvcnQgeyBnZXRLaW5nTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9raW5nXCI7XG5cbmltcG9ydCB7XG4gIHBpZWNlSXNCbGFjayxcbiAgcGllY2VJc1doaXRlLFxuICBwaWVjZUlzRW1wdHksXG4gIHBpZWNlc0FyZVNhbWVDb2xvcixcbiAgcGllY2VDYW5UYWtlUGllY2Vcbn0gZnJvbSBcIi4vcGllY2VcIjtcblxuaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuL0JvYXJkXCI7XG5pbXBvcnQgeyBnZXRCaXNob3BNb3ZlcyB9IGZyb20gXCIuL21vdmVzL2Jpc2hvcFwiO1xuaW1wb3J0IHsgZ2V0UXVlZW5Nb3ZlcyB9IGZyb20gXCIuL21vdmVzL3F1ZWVuXCI7XG5pbXBvcnQgeyBnZXRSb29rTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9yb29rXCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgcG9zc2libGUgbW92ZXMgZm9yIGEgcGllY2Ugb24gYSBzcXVhcmVcbiAqIGluIGEgZ2FtZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmNvbnN0IGdldE1vdmVzRm9yUGllY2UgPSAoc3RhdGUsIHNxdWFyZSwgcGllY2UpID0+IHtcbiAgc3dpdGNoIChwaWVjZSkge1xuICAgIGNhc2UgXCJwXCI6XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIHJldHVybiBnZXRQYXduTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcIm5cIjpcbiAgICBjYXNlIFwiTlwiOlxuICAgICAgcmV0dXJuIGdldEtuaWdodE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJrXCI6XG4gICAgY2FzZSBcIktcIjpcbiAgICAgIHJldHVybiBnZXRLaW5nTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcImJcIjpcbiAgICBjYXNlIFwiQlwiOlxuICAgICAgcmV0dXJuIGdldEJpc2hvcE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJxXCI6XG4gICAgY2FzZSBcIlFcIjpcbiAgICAgIHJldHVybiBnZXRRdWVlbk1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJyXCI6XG4gICAgY2FzZSBcIlJcIjpcbiAgICAgIHJldHVybiBnZXRSb29rTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuLyoqXG4gKiBNb3ZlXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gTW92ZVxuICogQHByb3BlcnR5IHtTcXVhcmV9IGZyb21cbiAqIEBwcm9wZXJ0eSB7U3F1YXJlfSB0b1xuICogQHByb3BlcnR5IHtib29sZWFufSB0YWtlc1xuICogQHByb3BlcnR5IHtib29sZWFufSBwYXduTW92ZVxuICogQHByb3BlcnR5IHtib29sZWFufSB0YWtlc0tpbmdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY2FzdGxlc1xuICpcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtb3ZlIHRvIGhlbHAgY3JlYXRlIGEgUEdOIHN0ZXBcbiAqIEBwYXJhbSB7U3F1YXJlfSBmcm9tXG4gKiBAcGFyYW0ge1NxdWFyZX0gdG9cbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge01vdmV9XG4gKi9cbmV4cG9ydCBjb25zdCBNb3ZlID0gKGZyb20sIHRvLCBzdGF0ZSkgPT4gKHtcbiAgZnJvbSxcbiAgdG8sXG4gIHRha2VzOiBwaWVjZUNhblRha2VQaWVjZShcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKSxcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCB0bylcbiAgKSxcbiAgdGFrZXNLaW5nOiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCB0bykudG9Mb3dlckNhc2UoKSA9PT0gXCJrXCIsXG4gIHBhd25Nb3ZlOiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKS50b0xvd2VyQ2FzZSgpID09PSBcInBcIixcbiAgY2FzdGxlczpcbiAgICBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBmcm9tKS50b0xvd2VyQ2FzZSgpID09PSBcImtcIiAmJlxuICAgIE1hdGguYWJzKGZyb20uZmlsZSAtIHRvLmZpbGUpID09PSAyXG59KTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc2VyaWVzIG9mIG1vdmVzIGEgcGllY2UgY2FuIG1ha2Ugb24gYSBib2FyZC5cbiAqIFdpbGwgbm90IGluY2x1ZGUgY2FzdGxlcyBvciBlbiBwYXNzYW50LCB0aG9zZSBhcmUgaGFuZGxlZFxuICogc2VwZXJhdGVseVxuICpcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldE1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBzdGF0ZS5ib2FyZDtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKGJvYXJkLCBzcXVhcmUpO1xuXG4gIGlmIChwaWVjZSA9PT0gXCIgXCIpIHJldHVybiBbXTtcblxuICAvLyBHZXQgYWxsIG1vdmVzIGZvciB0aGUgcGllY2Ugd2l0aG91dCB3b3JyeWluZyBhYm91dCBpbGxlZ2FsIG1vdmVzXG4gIHJldHVybiBnZXRNb3Zlc0ZvclBpZWNlKHN0YXRlLCBzcXVhcmUsIHBpZWNlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBlbXB0eVNxdWFyZUNvZGVzXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBzYWZlU3F1YXJlQ29kZXNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBjYXN0bGluZ1ByZXZlbnRlZCA9IChzdGF0ZSwgZW1wdHlTcXVhcmVDb2Rlcywgc2FmZVNxdWFyZUNvZGVzKSA9PiB7XG4gIGNvbnN0IGNsZWFyUGF0aCA9IGVtcHR5U3F1YXJlQ29kZXNcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29kZSlcbiAgICAubWFwKHNxID0+IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSlcbiAgICAuZXZlcnkocGllY2VJc0VtcHR5KTtcblxuICBpZiAoIWNsZWFyUGF0aCkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3QgYXR0YWNrQ2VjayA9IHN0YXRlLndoaXRlVG9Nb3ZlXG4gICAgPyBibGFja1BpZWNlQXR0YWNrc1NxdWFyZVxuICAgIDogd2hpdGVQaWVjZUF0dGFja3NTcXVhcmU7XG5cbiAgY29uc3QgdW5kZXJBdHRhY2sgPSBzYWZlU3F1YXJlQ29kZXNcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29kZSlcbiAgICAuc29tZShzcSA9PiBhdHRhY2tDZWNrKHN0YXRlLCBzcSkpO1xuXG4gIHJldHVybiB1bmRlckF0dGFjaztcbn07XG5cbmNvbnN0IGNhc3RsZU1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBvcHRzID0ge1xuICAgIEs6IHtcbiAgICAgIGxvbmc6IHtcbiAgICAgICAgcGF0aDogW1wiYjFcIiwgXCJjMVwiLCBcImQxXCJdLFxuICAgICAgICBzYWZlOiBbXCJhMVwiLCBcImMxXCIsIFwiZDFcIiwgXCJlMVwiXVxuICAgICAgfSxcbiAgICAgIHNob3J0OiB7XG4gICAgICAgIHBhdGg6IFtcImYxXCIsIFwiZzFcIl0sXG4gICAgICAgIHNhZmU6IFtcImYxXCIsIFwiZzFcIiwgXCJoMVwiLCBcImUxXCJdXG4gICAgICB9XG4gICAgfSxcbiAgICBrOiB7XG4gICAgICBsb25nOiB7XG4gICAgICAgIHBhdGg6IFtcImI4XCIsIFwiYzhcIiwgXCJkOFwiXSxcbiAgICAgICAgc2FmZTogW1wiYThcIiwgXCJjOFwiLCBcImQ4XCIsIFwiZThcIl1cbiAgICAgIH0sXG4gICAgICBzaG9ydDoge1xuICAgICAgICBwYXRoOiBbXCJmOFwiLCBcImc4XCJdLFxuICAgICAgICBzYWZlOiBbXCJmOFwiLCBcImc4XCIsIFwiaDhcIiwgXCJlOFwiXVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjYW5DYXN0bGVMb25nID0gcGllY2VJc0JsYWNrKHBpZWNlKVxuICAgID8gc3RhdGUuYmxhY2tDYW5DYXN0bGVMb25nXG4gICAgOiBzdGF0ZS53aGl0ZUNhbkNhc3RsZUxvbmc7XG5cbiAgY29uc3QgY2FuQ2FzdGxlU2hvcnQgPSBwaWVjZUlzQmxhY2socGllY2UpXG4gICAgPyBzdGF0ZS5ibGFja0NhbkNhc3RsZVNob3J0XG4gICAgOiBzdGF0ZS53aGl0ZUNhbkNhc3RsZVNob3J0O1xuXG4gIGNvbnN0IGxvbmdDYXN0bGVPcHRzID0gb3B0c1twaWVjZV0ubG9uZztcbiAgY29uc3Qgc2hvcnRDYXN0bGVPcHRzID0gb3B0c1twaWVjZV0uc2hvcnQ7XG5cbiAgaWYgKFxuICAgIGNhbkNhc3RsZUxvbmcgJiZcbiAgICAhY2FzdGxpbmdQcmV2ZW50ZWQoc3RhdGUsIGxvbmdDYXN0bGVPcHRzLnBhdGgsIGxvbmdDYXN0bGVPcHRzLnNhZmUpXG4gICkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBbMCwgLTJdKSwgc3RhdGUpKTtcbiAgfVxuXG4gIGlmIChcbiAgICBjYW5DYXN0bGVTaG9ydCAmJlxuICAgICFjYXN0bGluZ1ByZXZlbnRlZChzdGF0ZSwgc2hvcnRDYXN0bGVPcHRzLnBhdGgsIHNob3J0Q2FzdGxlT3B0cy5zYWZlKVxuICApIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgWzAsIDJdKSwgc3RhdGUpKTtcbiAgfVxuXG4gIHJldHVybiBtb3Zlcztcbn07XG5cbi8qKlxuICogR2V0cyBhIGxpc3Qgb2YgbGVnYWwgbW92ZXMgZm9yIHRoZSBwaWVjZSBvbiBhIHNxdWFyZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0TGVnYWxNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcblxuICBpZiAocGllY2VJc0JsYWNrKHBpZWNlKSAmJiAhc3RhdGUuYmxhY2tUb01vdmUpIHJldHVybiBbXTtcbiAgaWYgKHBpZWNlSXNXaGl0ZShwaWVjZSkgJiYgIXN0YXRlLndoaXRlVG9Nb3ZlKSByZXR1cm4gW107XG5cbiAgbGV0IG1vdmVzID0gZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSk7XG5cbiAgaWYgKHBpZWNlID09PSBcIktcIiB8fCBwaWVjZSA9PT0gXCJrXCIpIHtcbiAgICBtb3ZlcyA9IG1vdmVzLmNvbmNhdChjYXN0bGVNb3ZlcyhzdGF0ZSwgc3F1YXJlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXMuZmlsdGVyKG1vdmUgPT4gIW1vdmVQdXRzT3duS2luZ0luQ2hlY2soc3RhdGUsIG1vdmUpKTtcbn07XG5cbi8qKlxuICogR2V0cyBhIGxpc3Qgb2YgYWxsIGxlZ2FsIG1vdmVzIGZvciBhIHN0YXRlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEFsbExlZ2FsTW92ZXMgPSBzdGF0ZSA9PlxuICBTcXVhcmUuYWxsSW5Cb2FyZCgpLnJlZHVjZShcbiAgICAobW92ZXMsIHNxdWFyZSkgPT4gbW92ZXMuY29uY2F0KGdldExlZ2FsTW92ZXMoc3RhdGUsIHNxdWFyZSkpLFxuICAgIFtdXG4gICk7XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBtb3ZlUHV0c093bktpbmdJbkNoZWNrID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGNvbnN0IG1vdmVkUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuICBjb25zdCBuZXdTdGF0ZSA9IGFwcGx5TW92ZVRvR2FtZVN0YXRlKHN0YXRlLCBtb3ZlKTtcblxuICByZXR1cm4gcGllY2VJc0JsYWNrKG1vdmVkUGllY2UpXG4gICAgPyBibGFja0luQ2hlY2sobmV3U3RhdGUpXG4gICAgOiB3aGl0ZUluQ2hlY2sobmV3U3RhdGUpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IG1vdmVHaXZlc0NoZWNrID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGNvbnN0IG1vdmVkUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuICBjb25zdCBuZXdTdGF0ZSA9IGFwcGx5TW92ZVRvR2FtZVN0YXRlKHN0YXRlLCBtb3ZlKTtcblxuICByZXR1cm4gcGllY2VJc0JsYWNrKG1vdmVkUGllY2UpXG4gICAgPyB3aGl0ZUluQ2hlY2sobmV3U3RhdGUpXG4gICAgOiBibGFja0luQ2hlY2sobmV3U3RhdGUpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL01vdmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNFbXB0eSA9IHBpZWNlID0+IHBpZWNlID09PSBcIiBcIjtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VJc1doaXRlID0gcGllY2UgPT5cbiAgISFwaWVjZSAmJiAhcGllY2VJc0VtcHR5KHBpZWNlKSAmJiBwaWVjZS50b1VwcGVyQ2FzZSgpID09PSBwaWVjZTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VJc0JsYWNrID0gcGllY2UgPT5cbiAgISFwaWVjZSAmJiAhcGllY2VJc0VtcHR5KHBpZWNlKSAmJiBwaWVjZS50b0xvd2VyQ2FzZSgpID09PSBwaWVjZTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcDFcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZXNBcmVTYW1lQ29sb3IgPSAocDEsIHAyKSA9PlxuICAocGllY2VJc1doaXRlKHAxKSAmJiBwaWVjZUlzV2hpdGUocDIpKSB8fFxuICAocGllY2VJc0JsYWNrKHAxKSAmJiBwaWVjZUlzQmxhY2socDIpKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcDFcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUNhblRha2VQaWVjZSA9IChwMSwgcDIpID0+XG4gIChwaWVjZUlzV2hpdGUocDEpICYmIHBpZWNlSXNCbGFjayhwMikpIHx8XG4gIChwaWVjZUlzQmxhY2socDEpICYmIHBpZWNlSXNXaGl0ZShwMikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGllY2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBUcmltIGEgc3RyaW5nIHVzaW5nIG5hdGl2ZSB0cmltXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgdHJpbSA9IHN0ciA9PiBzdHIudHJpbSgpO1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0geCA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG5cbi8qKlxuICogTWFwcyBhcnJheXMgb3Igb2JqZWN0c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gZiAtIGEgLT4gYlxuICogQHBhcmFtIHsqfSBmdW5jdG9yXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcCA9IChmLCBmdW5jdG9yKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0b3IpIHx8IHR5cGVvZiBmLm1hcCA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHJldHVybiBmdW5jdG9yLm1hcChmKTtcblxuICBpZiAoaXNPYmplY3QoZnVuY3RvcikpXG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGZ1bmN0b3IpLnJlZHVjZShcbiAgICAgIChvLCBbaywgdl0pID0+IE9iamVjdC5hc3NpZ24obywgeyBba106IGYodikgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgcmV0dXJuIGZ1bmN0b3I7XG59O1xuXG4vKipcbiAqIEZpbHRlcnMgYXJyYXlzIG9yIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkIC0gRmlsdGVyIGZ1bmN0aW9uIG9mIHggLT4gYm9vbFxuICogQHBhcmFtIHsqfSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZXhwb3J0IGNvbnN0IGZpbHRlciA9IChwcmVkLCBmaWx0ZXJhYmxlKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcmFibGUpIHx8IHR5cGVvZiBmaWx0ZXJhYmxlLmZpbHRlciA9PT0gXCJmdW5jdGlvblwiKVxuICAgIHJldHVybiBmaWx0ZXJhYmxlLmZpbHRlcihwcmVkKTtcblxuICBpZiAoaXNPYmplY3QoZmlsdGVyYWJsZSkpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZmlsdGVyYWJsZSkucmVkdWNlKFxuICAgICAgKG8sIFtrLCB2XSkgPT4gT2JqZWN0LmFzc2lnbihvLCBwcmVkKHYpID8geyBba106IHYgfSA6IHt9KSxcbiAgICAgIHt9XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJhYmxlO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSByYW5nZSBvZiBudW1iZXJzLCBzdGFydGluZyBhdCAxXG4gKiBAcGFyYW0ge251bWJlcn0gbiAtIFRoZSBsZW5ndGgvZW5kIG9mIHRoZSByYW5nZVxuICogQHJldHVybnMge1tudW1iZXJdfVxuICovXG5leHBvcnQgY29uc3QgcmFuZ2UgPSBuID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IG4gfSwgKF8sIGkpID0+IGkpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBjb21iaW5hdGlvbnMgb2YgdHdvIGFycmF5c1xuICogQHBhcmFtIHtbKl19IHhzXG4gKiBAcGFyYW0ge1sqXX0geXNcbiAqIEByZXR1cm5zIHtbWypdXX1cbiAqL1xuZXhwb3J0IGNvbnN0IHhQcm9kID0gKHhzLCB5cykgPT5cbiAgeHMucmVkdWNlKChhY2MsIHgpID0+IGFjYy5jb25jYXQoeXMubWFwKHkgPT4gW3gsIHldKSksIFtdKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgcHJvcCA9IGtleSA9PiBvYmogPT4gb2JqW2tleV07XG5cbi8qKlxuICogQ29tcG9zZSAyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBnXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBjb21wb3NlID0gKGYsIGcpID0+IHggPT4gZihnKHgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFN0YXJ0UG9zaXRpb24sIG1vdmVQaWVjZUluQm9hcmQsIGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgTW92ZSwgZ2V0TW92ZXMgfSBmcm9tIFwiLi9Nb3Zlc1wiO1xuaW1wb3J0IHsgY29tcG9zZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBwaWVjZUlzQmxhY2ssIHBpZWNlSXNXaGl0ZSB9IGZyb20gXCIuL3BpZWNlXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuL1NxdWFyZVwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjaGVzcyBib2FyZCBkdXJpbmcgYSBnYW1lXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBHYW1lU3RhdGVcbiAqIEBwcm9wZXJ0eSB7W1tzdHJpbmddXX0gYm9hcmRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVUb01vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tUb01vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVDYW5DYXN0bGVTaG9ydFxuICogQHByb3BlcnR5IHtib29sZWFufSB3aGl0ZUNhbkNhc3RsZUxvbmdcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tDYW5DYXN0bGVTaG9ydFxuICogQHByb3BlcnR5IHtib29sZWFufSBibGFja0NhbkNhc3RsZUxvbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nP30gZW5QYXNzYW50IC0gUG9zaXRpb24gYmVoaW5kIGEgcGF3biB0aGF0IGp1c3QgbWFkZSBhIDIgc3F1YXJlIGFkdmFuY2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoYWxmTW92ZXMgLSBIYWxmIG1vdmVzIHNpbmNlIGxhc3QgY2FwdHVyZSBvciBwYXduXG4gKiBAcHJvcGVydHkge251bWJlcn0gbW92ZU5yIC0gVG90YWwgbW92ZXMgaW4gZ2FtZS4gU3RhcnRzIGF0IDEsIGluY3JlbWVudCBwZXIgYmxhY2sgbW92ZVxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgR2FtZVN0YXRlXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIC0gQSBsaXN0IG9mIHJvd3MgY29udGFpbmluZyBwaWVjZSBjb2Rlc1xuICogQHBhcmFtIHtzdHJpbmd9IHRvTW92ZSAtIFwid1wiIGZvciB3aGl0ZSwgXCJiXCIgZm9yIGJsYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FzdGxlT3B0aW9ucyAtIEFueSBjb21iaW5hdGlvbiBvZiBcIktRa3FcIiBmb3Igd2hpdGUvYmxhY2sga2luZy9xdWVlbiBzaWRlIGNhc3RsaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5QYXNzYW50U3F1YXJlIC0gUG9zaXRpb24gYmVoaW5kIGEgcGF3biB0aGF0IGp1c3QgbWFkZSBhIDIgc3F1YXJlIGFkdmFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gaGFsZk1vdmVzIC0gSGFsZiBtb3ZlcyBzaW5jZSBsYXN0IGNhcHR1cmUgb3IgcGF3biBhZHZhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGZ1bGxNb3ZlcyAtIFRvdGFsIG1vdmVzIGluIGdhbWUuIFN0YXJ0cyBhdCAxLCBpbmNyZW1lbnQgcGVyIGJsYWNrIG1vdmVcbiAqIEByZXR1cm5zIHtHYW1lU3RhdGV9XG4gKi9cbmNvbnN0IEdhbWVTdGF0ZSA9IChcbiAgYm9hcmQsXG4gIHRvTW92ZSA9IFwid1wiLFxuICBjYXN0bGVPcHRpb25zID0gXCJLUWtxXCIsXG4gIGVuUGFzc2FudFNxdWFyZSA9IFwiLVwiLFxuICBoYWxmTW92ZXMgPSAwLFxuICBmdWxsTW92ZXMgPSAxXG4pID0+IHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgYm9hcmQ6IGJvYXJkIHx8IFN0YXJ0UG9zaXRpb24oKSxcbiAgICAgIC8vIFNpZGUgdG8gbW92ZVxuICAgICAgd2hpdGVUb01vdmU6IHRvTW92ZSA9PT0gXCJ3XCIsXG4gICAgICBibGFja1RvTW92ZTogdG9Nb3ZlID09PSBcImJcIixcblxuICAgICAgLy8gRW4gcGFzc2FudFxuICAgICAgZW5QYXNzYW50OiBlblBhc3NhbnRTcXVhcmUgPT09IFwiLVwiID8gbnVsbCA6IGVuUGFzc2FudFNxdWFyZSxcbiAgICAgIC8vIE1vdmUgbnVtYmVyc1xuICAgICAgaGFsZk1vdmVzOiAraGFsZk1vdmVzLFxuICAgICAgbW92ZU5yOiArZnVsbE1vdmVzXG4gICAgfSxcbiAgICBjYXN0bGVPcHRpb25zRnJvbVN0cmluZyhjYXN0bGVPcHRpb25zKVxuICApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FzdGxlU3RyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCBjYXN0bGVPcHRpb25zRnJvbVN0cmluZyA9IGNhc3RsZVN0ciA9PiAoe1xuICB3aGl0ZUNhbkNhc3RsZVNob3J0OiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwiS1wiKSxcbiAgd2hpdGVDYW5DYXN0bGVMb25nOiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwiUVwiKSxcbiAgYmxhY2tDYW5DYXN0bGVTaG9ydDogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcImtcIiksXG4gIGJsYWNrQ2FuQ2FzdGxlTG9uZzogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcInFcIilcbn0pO1xuXG5jb25zdCBjYXN0bGVTdHJGcm9tT3B0aW9ucyA9ICh7XG4gIHdoaXRlQ2FuQ2FzdGxlU2hvcnQsXG4gIHdoaXRlQ2FuQ2FzdGxlTG9uZyxcbiAgYmxhY2tDYW5DYXN0bGVTaG9ydCxcbiAgYmxhY2tDYW5DYXN0bGVMb25nXG59KSA9PlxuICBbXG4gICAgW1wiS1wiLCB3aGl0ZUNhbkNhc3RsZVNob3J0XSxcbiAgICBbXCJRXCIsIHdoaXRlQ2FuQ2FzdGxlTG9uZ10sXG4gICAgW1wia1wiLCBibGFja0NhbkNhc3RsZVNob3J0XSxcbiAgICBbXCJxXCIsIGJsYWNrQ2FuQ2FzdGxlTG9uZ11cbiAgXVxuICAgIC5maWx0ZXIoKFtjLCBwcmVkXSkgPT4gcHJlZClcbiAgICAubWFwKChbYywgcHJlZF0pID0+IGMpXG4gICAgLmpvaW4oXCJcIik7XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtzdHJpbmc/fVxuICovXG5jb25zdCBjYXN0bGVPcHRpb25zRGlmZiA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBsZXQgcHJldk9wdGlvbnMgPSBjYXN0bGVTdHJGcm9tT3B0aW9ucyhzdGF0ZSk7XG5cbiAgaWYgKCFwcmV2T3B0aW9ucykgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20pO1xuXG4gIHN3aXRjaCAocGllY2UpIHtcbiAgICBjYXNlIFwia1wiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UoXCJrXCIsIFwiXCIpLnJlcGxhY2UoXCJxXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJyXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShtb3ZlLmZyb20uZmlsZSA9PT0gMCA/IFwicVwiIDogXCJrXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJLXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShcIktcIiwgXCJcIikucmVwbGFjZShcIlFcIiwgXCJcIik7XG4gICAgY2FzZSBcIlJcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKG1vdmUuZnJvbS5maWxlID09PSAwID8gXCJRXCIgOiBcIktcIiwgXCJcIik7XG4gIH1cblxuICByZXR1cm4gcHJldk9wdGlvbnM7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge0dhbWVTdGF0ZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5TW92ZVRvR2FtZVN0YXRlID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGxldCBib2FyZCA9IG1vdmVQaWVjZUluQm9hcmQoc3RhdGUuYm9hcmQsIG1vdmUuZnJvbSwgbW92ZS50byk7XG5cbiAgaWYgKG1vdmUuY2FzdGxlcykge1xuICAgIC8vIE1vdmUgdGhlIHJvb2sgYXMgd2VsbFxuICAgIGNvbnN0IHF1ZWVuU2lkZSA9IG1vdmUudG8uZmlsZSA9PT0gMjsgLy8gXCJjXCJcbiAgICBjb25zdCByZWxGcm9tID0gcXVlZW5TaWRlID8gWzAsIC0yXSA6IFswLCAxXTtcbiAgICBjb25zdCByZWxUbyA9IHF1ZWVuU2lkZSA/IFswLCAxXSA6IFswLCAtMV07XG5cbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwibXVzdCBtb3ZlIHJvb2sgZnJvbVwiLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxGcm9tKS5jb2RlLFxuICAgICAgXCJ0b1wiLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxUbykuY29kZVxuICAgICk7XG5cbiAgICBib2FyZCA9IG1vdmVQaWVjZUluQm9hcmQoXG4gICAgICBib2FyZCxcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsRnJvbSksXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbFRvKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gR2FtZVN0YXRlKFxuICAgIGJvYXJkLFxuICAgIHN0YXRlLndoaXRlVG9Nb3ZlID8gXCJiXCIgOiBcIndcIixcbiAgICBjYXN0bGVPcHRpb25zRGlmZihzdGF0ZSwgbW92ZSksXG4gICAgbW92ZS5pc1Bhd25Nb3ZlICYmIG1vdmUudG8ucm93IC0gbW92ZS5mcm9tLnJvdyA9PT0gMiwgLy8gVE9ETzogKFNpbW9uKSBnZXQgZW4gcGFzc2FudCBzcXVhcmVcbiAgICBzdGF0ZS5oYWxmTW92ZXMgKyAxLFxuICAgIHN0YXRlLm1vdmVOciArIChzdGF0ZS53aGl0ZVRvTW92ZSA/IDEgOiAwKVxuICApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQ2hlY2sgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpLnNvbWUoc3F1YXJlID0+XG4gICAgZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSkuc29tZShtb3ZlID0+IG1vdmUudGFrZXNLaW5nKVxuICApO1xufTtcblxuLy8gVE9ETzogKFNpbW9uKSBEUllcbi8vIE5vdGU6IChTaW1vbikgSGF2aW5nIHRvIHJlY2FsY3VsYXRlIGFsbCBtb3ZlcyBmb3IgYSBjb2xvciBldmVyeSB0aW1lIG9uZVxuLy8gICAgICAgICAgICAgICBvZiB0aGVzZSBtZXRob2RzIGlzIGNhbGxlZCBpcyB2ZXJ5IGluZWZmaWNpZW50LiBQcm9iYWJseVxuLy8gICAgICAgICAgICAgICBiZXR0ZXIgdG8gc3RvcmUgcG9zc2libGUgbW92ZXMgd2l0aCBhIGdhbWUgc3RhdGVcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVJbkNoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc0JsYWNrKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3F1YXJlID0+IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZykpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYmxhY2tJbkNoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc1doaXRlKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3F1YXJlID0+IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZykpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb25lIG9mIHRoZSBibGFjayBwaWVjZXMgYXR0YWNrcyBhIHNxdWFyZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGJsYWNrUGllY2VBdHRhY2tzU3F1YXJlID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNCbGFjayhnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxID0+IGdldE1vdmVzKHN0YXRlLCBzcSkuc29tZShtb3ZlID0+IG1vdmUudG8uY29kZSA9PT0gc3F1YXJlLmNvZGUpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9uZSBvZiB0aGUgd2hpdGUgcGllY2VzIGF0dGFja3MgYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZVBpZWNlQXR0YWNrc1NxdWFyZSA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzV2hpdGUoZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3EpLnNvbWUobW92ZSA9PiBtb3ZlLnRvLmNvZGUgPT09IHNxdWFyZS5jb2RlKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lU3RhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9HYW1lU3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgcGllY2VzQXJlU2FtZUNvbG9yIH0gZnJvbSBcIi4vLi4vcGllY2VcIjtcbmltcG9ydCB7IGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi8uLi9Cb2FyZFwiO1xuaW1wb3J0IHsgTW92ZSB9IGZyb20gXCIuLy4uL01vdmVzXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGV4cGxvcmVzIGEgZGlyZWN0aW9uIG9uIGEgYm9hcmQgdW50aWwgdGhlIHBpZWNlXG4gKiBpcyBvdXQgb2YgbW92ZXNcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge1tudW1iZXJdfSBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7W251bWJlcl19IGRlbHRhXG4gKiBAcGFyYW0ge1tNb3ZlXX0gcmVzdWx0c1xuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuY29uc3QgZ2V0TW92ZXNVbnRpbE5vdEVtcHR5ID0gKFxuICBzdGF0ZSxcbiAgcGllY2UsXG4gIHNxdWFyZSxcbiAgZGlyZWN0aW9uLFxuICBkZWx0YSA9IFswLCAwXSxcbiAgcmVzdWx0cyA9IFtdXG4pID0+IHtcbiAgY29uc3QgbmV3RGVsdGEgPSBbZGVsdGFbMF0gKyBkaXJlY3Rpb25bMF0sIGRlbHRhWzFdICsgZGlyZWN0aW9uWzFdXTtcblxuICBjb25zdCBuZXh0U3F1YXJlID0gU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIG5ld0RlbHRhKTtcblxuICAvLyBFZGdlIG9mIGJvYXJkLCBlbmQgb2YgbW92ZVxuICBpZiAoIW5leHRTcXVhcmUuaW5Cb3VuZHMpIHJldHVybiByZXN1bHRzO1xuXG4gIGNvbnN0IHRvUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBuZXh0U3F1YXJlKTtcbiAgY29uc3QgaGFzUGllY2UgPSB0b1BpZWNlICE9PSBcIiBcIjtcbiAgY29uc3QgaGFzRW5lbXlQaWVjZSA9IGhhc1BpZWNlICYmICFwaWVjZXNBcmVTYW1lQ29sb3IocGllY2UsIHRvUGllY2UpO1xuXG4gIC8vIE93biBwaWVjZSwgZW5kIG9mIG1vdmVcbiAgaWYgKGhhc1BpZWNlICYmICFoYXNFbmVteVBpZWNlKSByZXR1cm4gcmVzdWx0cztcblxuICAvLyBXZSBjYW4gbWFrZSBhIG1vdmUgZm9yIHN1cmVcbiAgY29uc3QgbW92ZSA9IE1vdmUoc3F1YXJlLCBuZXh0U3F1YXJlLCBzdGF0ZSk7XG5cbiAgaWYgKGhhc1BpZWNlKSByZXR1cm4gcmVzdWx0cy5jb25jYXQobW92ZSk7XG5cbiAgcmV0dXJuIGdldE1vdmVzVW50aWxOb3RFbXB0eShcbiAgICBzdGF0ZSxcbiAgICBwaWVjZSxcbiAgICBzcXVhcmUsXG4gICAgZGlyZWN0aW9uLFxuICAgIG5ld0RlbHRhLFxuICAgIHJlc3VsdHMuY29uY2F0KG1vdmUpXG4gICk7XG59O1xuXG4vKipcbiAqIEdldHMgYSBsaXN0IG9mIG1vdmVzIGZvciBhIHBpZWNlIG9uIGEgc3F1YXJlIGJhc2VkIG9uIGEgc2V0IG9mXG4gKiBkaXJlY3Rpb25zXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7W1tudW1iZXJdXX0gZGlyZWN0aW9uc1xuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERpcmVjdGlvbmFsTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSwgZGlyZWN0aW9ucykgPT4ge1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxdWFyZSk7XG4gIHJldHVybiBkaXJlY3Rpb25zXG4gICAgLm1hcChkID0+IGdldE1vdmVzVW50aWxOb3RFbXB0eShzdGF0ZSwgcGllY2UsIHNxdWFyZSwgZCkpXG4gICAgLnJlZHVjZSgoeHMsIHgpID0+IHhzLmNvbmNhdCh4KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvZGlyZWN0aW9uQmFzZWQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgcGllY2VzQXJlU2FtZUNvbG9yIH0gZnJvbSBcIi4vLi4vcGllY2VcIjtcbmltcG9ydCB7IGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi8uLi9Cb2FyZFwiO1xuaW1wb3J0IHsgTW92ZSB9IGZyb20gXCIuLy4uL01vdmVzXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtbW251bWJlcl1dIHJlbGF0aXZlcyAtIFNxdWFyZSBsb2NhdGlvbnMgW2RSb3csIGRGaWxlXSByZWxhdGl2ZSB0byB0aGlzIHNxdWFyZX1cbiAqIEByZXR1cm5zIHtbTW92ZXNdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0U3F1YXJlTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSwgcmVsYXRpdmVzKSA9PiB7XG4gIGNvbnN0IHRoaXNQaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxdWFyZSk7XG5cbiAgY29uc3QgdG9TcXVhcmVzID0gcmVsYXRpdmVzXG4gICAgLm1hcChkID0+IFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBkKSlcbiAgICAuZmlsdGVyKHMgPT4gcy5pbkJvdW5kcylcbiAgICAubWFwKHMgPT4gKHsgc3F1YXJlOiBzLCBwaWVjZTogZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgcykgfSkpXG4gICAgLy8gT25seSBlbXB0eSBzcXVhcmVzIG9yIHNxdWFyZXMgd2l0aCBlbmVteSBwaWVjZXNcbiAgICAuZmlsdGVyKHRvID0+IHRvLnBpZWNlID09PSBcIiBcIiB8fCAhcGllY2VzQXJlU2FtZUNvbG9yKHRoaXNQaWVjZSwgdG8ucGllY2UpKTtcblxuICByZXR1cm4gdG9TcXVhcmVzLm1hcCh0byA9PiBNb3ZlKHNxdWFyZSwgdG8uc3F1YXJlLCBzdGF0ZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3NxdWFyZUJhc2VkLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEJpc2hvcE1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIGdldERpcmVjdGlvbmFsTW92ZXMoc3RhdGUsIHNxdWFyZSwgW1xuICAgIFsxLCAxXSxcbiAgICBbLTEsIDFdLFxuICAgIFstMSwgLTFdLFxuICAgIFsxLCAtMV1cbiAgXSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvYmlzaG9wLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJvb2tNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXREaXJlY3Rpb25hbE1vdmVzKHN0YXRlLCBzcXVhcmUsIFtbMSwgMF0sIFstMSwgMF0sIFswLCAtMV0sIFswLCAxXV0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3Jvb2suanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc3F1YXJlQ2hhbmdlcyB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlc1wiO1xuaW1wb3J0IHsgY3JvcCB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvY3JvcFwiO1xuaW1wb3J0IHsgcGVyc3BlY3RpdmVUcmFuc2Zvcm0gfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtXCI7XG5pbXBvcnQgeyBnZXRBbGxMZWdhbE1vdmVzIH0gZnJvbSBcIi4vTW92ZXNcIjtcbmltcG9ydCBHYW1lU3RhdGUsIHsgYXBwbHlNb3ZlVG9HYW1lU3RhdGUgfSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcblxuY29uc3QgQm9hcmRJbWFnZSA9IChpbWdGaWxlLCB0cmFuc2Zvcm1Gcm9tKSA9PiB7XG4gIGNvbnN0IGZvdXJQb2ludHMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gIC8vIFdyaXRlIGZyb20gcG9pbnRzIHRvIHRyYW5zZm9ybUZyb20gZXZlcnkgNHRoIGl0ZW1cbiAgZm91clBvaW50cy5zdWJzY3JpYmUocG9pbnRzID0+IHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdHJhbnNmb3JtRnJvbShwb2ludHMpO1xuICAgICAgZm91clBvaW50cyhbXSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBteUNyb3AgPSBrby5vYnNlcnZhYmxlKCk7XG4gIGNvbnN0IGNyb3BEYXRhVVJMID0ga28ucHVyZUNvbXB1dGVkKFxuICAgICgpID0+IChteUNyb3AoKSA/IG15Q3JvcCgpLnRvRGF0YVVSTCgpIDogbnVsbClcbiAgKTtcblxuICAvLyBMaW5rIGEgdmlydHVhbCBpbWdcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgY29uc3QgcmVkcmF3ID0gdHJhbnNmb3JtID0+IHtcbiAgICBjcm9wKHBlcnNwZWN0aXZlVHJhbnNmb3JtKHRyYW5zZm9ybSwgaW1nKSwgbXlDcm9wKTtcbiAgfTtcblxuICB0cmFuc2Zvcm1Gcm9tLnN1YnNjcmliZShyZWRyYXcpO1xuXG4gIC8vIExvYWQgaW5pdGlhbCBpbWFnZVxuICBpbWcub25sb2FkID0gKCkgPT4gcmVkcmF3KHRyYW5zZm9ybUZyb20oKSk7XG4gIGltZy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGltZ0ZpbGUpO1xuXG4gIGNvbnN0IGdhbWVTdGF0ZSA9IGtvLm9ic2VydmFibGUoR2FtZVN0YXRlKCkpO1xuICBjb25zdCBib2FyZCA9IGtvLnB1cmVDb21wdXRlZCgoKSA9PiBnYW1lU3RhdGUoKS5ib2FyZCk7XG4gIGNvbnN0IHNlbGVjdGVkTW92ZSA9IGtvLm9ic2VydmFibGUobnVsbCk7XG5cbiAgLy8gQSBsaXN0IG9mIDY0IGNhbnZhc2VzIHNob3dpbmcgcGl4ZWwgZWRnZXNcbiAgY29uc3QgZGVidWdPdmVybGF5ID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgY29uc3QgdmlzaWJsZURlYnVnT3ZlcmxheSA9IGtvLnB1cmVDb21wdXRlZChcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoIXNlbGVjdGVkTW92ZSgpKSByZXR1cm4gZGVidWdPdmVybGF5KCk7XG4gICBcbiAgICAgIGNvbnN0IHsgbW92ZTogeyBmcm9tLCB0byB9IH0gPSBzZWxlY3RlZE1vdmUoKTtcbiAgICAgIHJldHVybiBkZWJ1Z092ZXJsYXkoKVxuICAgICAgICAubWFwKChjdnMsIGkpID0+IGkgPT09IGZyb20uaW5kZXggfHwgaSA9PT0gdG8uaW5kZXhcbiAgICAgICAgICA/IGN2c1xuICAgICAgICAgIDogbnVsbFxuICAgICAgICApO1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVTdGF0ZSxcbiAgICBib2FyZCxcbiAgICBpbWFnZVZpc2libGU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgIG9yaWdpbmFsOiBpbWcuc3JjLFxuICAgIGNyb3A6IGNyb3BEYXRhVVJMLFxuICAgIGNyb3BDdnM6IG15Q3JvcCxcbiAgICBtb3ZlUmF0aW5nOiBrby5vYnNlcnZhYmxlQXJyYXkoW10pLFxuICAgIG9uQ2xpY2s6IChkLCBlKSA9PiB7XG4gICAgICBjb25zdCBiYm94ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBmb3VyUG9pbnRzLnB1c2goe1xuICAgICAgICB4OiBlLmNsaWVudFggLSBiYm94LngsXG4gICAgICAgIHk6IGUuY2xpZW50WSAtIGJib3gueVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZWxlY3RNb3ZlOiBtb3ZlID0+IHtcbiAgICAgIGlmIChzZWxlY3RlZE1vdmUoKSA9PT0gbW92ZSkge1xuICAgICAgICBzZWxlY3RlZE1vdmUobnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZE1vdmUobW92ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZWxlY3RlZE1vdmUsXG4gICAgZGVidWdPdmVybGF5LFxuICAgIHZpc2libGVEZWJ1Z092ZXJsYXlcbiAgfTtcbn07XG5cbmNvbnN0IEFwcCA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0cmFuc2Zvcm1Gcm9tID0ga28ub2JzZXJ2YWJsZUFycmF5KFtcbiAgICB7IHg6IDEyMCwgeTogNDUgfSxcbiAgICB7IHg6IDQwMywgeTogNDMgfSxcbiAgICB7IHg6IDM5NCwgeTogMzI1IH0sXG4gICAgeyB4OiAxMjUsIHk6IDMyMyB9XG4gIF0pO1xuXG4gIHRoaXMudG9nZ2xlSW1hZ2VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW1hZ2VzKCkuZm9yRWFjaChiaSA9PiBiaS5pbWFnZVZpc2libGUoIWJpLmltYWdlVmlzaWJsZSgpKSk7XG4gIH07XG5cbiAgdGhpcy5pbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuICB0aGlzLm9uTmV3RmlsZXMgPSAoZCwgZSkgPT4ge1xuICAgIHRoaXMuaW1hZ2VzKFxuICAgICAgQXJyYXkuZnJvbShlLnRhcmdldC5maWxlcykubWFwKGltZyA9PiBCb2FyZEltYWdlKGltZywgdHJhbnNmb3JtRnJvbSkpXG4gICAgKTtcbiAgfTtcblxuICB0aGlzLmxhc3RMYXN0Q2hhbmdlcyA9IGtvLm9ic2VydmFibGUoW10pO1xuICB0aGlzLmxhc3RDaGFuZ2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgdGhpcy5sYXN0Q2hhbmdlcy5zdWJzY3JpYmUodGhpcy5sYXN0TGFzdENoYW5nZXMsIG51bGwsIFwiYmVmb3JlQ2hhbmdlXCIpO1xuXG4gIGNvbnN0IGdldEJlc3RHdWVzcyA9IChpbWdCZWZvcmUsIGltZ0FmdGVyKSA9PiB7XG4gICAgY29uc3QgY3R4QmVmb3JlID0gaW1nQmVmb3JlLmNyb3BDdnMoKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgY3R4QWZ0ZXIgPSBpbWdBZnRlci5jcm9wQ3ZzKCkuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IHNxdWFyZUNoYW5nZXMoY3R4QmVmb3JlLCBjdHhBZnRlcik7XG4gICAgLy8gU2lkZSBlZmZlY3Q6IHN0b3JlIGRlYnVnIG92ZXJsYXlcbiAgICB0aGlzLmxhc3RDaGFuZ2VzKGNoYW5nZXMubWFwKGMgPT4gYy5kZWJ1Z092ZXJsYXkpKTtcblxuICAgIGNvbnN0IGdhbWVTdGF0ZUJlZm9yZSA9IGltZ0JlZm9yZS5nYW1lU3RhdGUoKTtcbiAgICBjb25zdCBhbGxvd2VkTW92ZXMgPSBnZXRBbGxMZWdhbE1vdmVzKGdhbWVTdGF0ZUJlZm9yZSk7XG5cbiAgICBjb25zdCBwb3NzaWJpbGl0aWVzID0gYWxsb3dlZE1vdmVzXG4gICAgICAubWFwKG1vdmUgPT4ge1xuICAgICAgICBjb25zdCBmcm9tU3F1YXJlQ2hhbmdlID0gY2hhbmdlc1ttb3ZlLmZyb20uaW5kZXhdLmRpZmZlcmVuY2U7XG4gICAgICAgIGNvbnN0IHRvU3F1YXJlQ2hhbmdlID0gY2hhbmdlc1ttb3ZlLnRvLmluZGV4XS5kaWZmZXJlbmNlO1xuXG4gICAgICAgIC8vIE5vdGU6IChTaW1vbikgVGhlIFwiZnJvbVwiIHNxdWFyZSBpcyBhbHdheXMgZW1wdHkgYWZ0ZXIgYSBtb3ZlXG4gICAgICAgIC8vICAgICAgICAgICAgICAgVGhlcmVmb3JlLCBpdCdzIGV4cGVjdGVkIHRvIHNob3cgYSBsYXJnZSBkaWZmXG4gICAgICAgIC8vICAgICAgICAgICAgICAgbWFraW5nIGl0IGVhc2llciB0byByZWNvZ25pc2UuXG5cbiAgICAgICAgY29uc3QgdG90YWxDaGFuZ2UgPSBNYXRoLnJvdW5kKDEuNSAqIGZyb21TcXVhcmVDaGFuZ2UgKyB0b1NxdWFyZUNoYW5nZSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb3ZlLFxuICAgICAgICAgIGZyb21TcXVhcmVDaGFuZ2UsXG4gICAgICAgICAgdG9TcXVhcmVDaGFuZ2UsXG4gICAgICAgICAgdG90YWxDaGFuZ2UsXG4gICAgICAgICAgZnJvbTogbW92ZS5mcm9tLmNvZGUsXG4gICAgICAgICAgdG86IG1vdmUudG8uY29kZVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5zb3J0KChwMSwgcDIpID0+IHAyLnRvdGFsQ2hhbmdlIC0gcDEudG90YWxDaGFuZ2UpO1xuXG4gICAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG4gIH07XG5cbiAgdGhpcy5hbmFseXplID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhaXJzID0gdGhpcy5pbWFnZXMoKS5yZWR1Y2UoKHBhaXJzLCBpbWcsIGksIGltZ3MpID0+IHtcbiAgICAgIGlmIChpbWdzW2kgKyAxXSkgcGFpcnMucHVzaChbaW1nLCBpbWdzW2kgKyAxXV0pO1xuICAgICAgcmV0dXJuIHBhaXJzO1xuICAgIH0sIFtdKTtcblxuICAgIHRoaXMuaW1hZ2VzKCkuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XG4gICAgICAvLyBMYXN0IGJvYXJkXG4gICAgICBpZiAoIXBhaXJzW2ldKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGJlZm9yZSA9IHBhaXJzW2ldWzBdO1xuICAgICAgY29uc3QgYWZ0ZXIgPSBwYWlyc1tpXVsxXTtcblxuICAgICAgY29uc3QgbW92ZXMgPSBnZXRCZXN0R3Vlc3MoYmVmb3JlLCBhZnRlcik7XG4gICAgICBjb25zdCBtb3ZlID0gbW92ZXNbMF0ubW92ZTtcbiAgICAgIGFmdGVyLmRlYnVnT3ZlcmxheSh0aGlzLmxhc3RDaGFuZ2VzKCkpO1xuICAgICAgYWZ0ZXIubW92ZVJhdGluZyhtb3Zlcyk7XG4gICAgICBhZnRlci5zZWxlY3RlZE1vdmUobW92ZXNbMF0pO1xuICAgICAgYWZ0ZXIuZ2FtZVN0YXRlKGFwcGx5TW92ZVRvR2FtZVN0YXRlKGJlZm9yZS5nYW1lU3RhdGUoKSwgbW92ZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub3ZlcmxheSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICB0aGlzLnNob3dFZGdlcyA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMucGxhY2VBbGwgPSB7XG4gIGluaXQ6IChlbCwgdmEpID0+IHtcbiAgICBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICBlbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29uc3QgaW5uZXJFbHMgPSBrby51bndyYXAodmEoKSkgfHwgW107XG4gICAgICBpbm5lckVscy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgIGlmIChlKSB7IC8vIEFsbG93IGZvciBnYXBzXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihlLnN0eWxlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgdG9wOiBgJHtNYXRoLmZsb29yKGkgLyA4KSAqIDMyICsgMn1weGAsXG4gICAgICAgICAgICBsZWZ0OiBgJHtpICUgOCAqIDMyICsgMn1weGBcbiAgICAgICAgICB9KVxuICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwKCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcbmltcG9ydCB7IHJhbmdlIH0gZnJvbSBcIi4vLi4vdXRpbHNcIjtcblxuY29uc3Qgc3VtID0gKHgsIHkpID0+IHggKyB5O1xuXG4vLyBOb3RlOiAoU2ltb24pIElmIHdlIHdhbnQgdG8gdGVzdCB0aGlzLCB3ZSBtaWdodCB3YW50IHRvIHVzZTpcbi8vICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZ2V0LWltYWdlLWRhdGFcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKi9cbmNvbnN0IGdldEltYWdlRGF0YUZvclNxdWFyZSA9IChzcXVhcmUsIHNxdWFyZVNpemUsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZS5yb3cgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge051bWJlcn0gc3F1YXJlU2l6ZVxuICogQHBhcmFtIHtOdW1iZXJ9IGN1dE9mZiBCZXR3ZWVuIDAgYW5kIDFcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBib2FyZEN0eFxuICogQHJldHVybnMge0ltYWdlRGF0YX1cbiAqL1xuY29uc3QgZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlID0gKHNxdWFyZSwgc3F1YXJlU2l6ZSwgY3V0T2ZmLCBib2FyZEN0eCkgPT5cbiAgYm9hcmRDdHguZ2V0SW1hZ2VEYXRhKFxuICAgIHNxdWFyZS5maWxlICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgKiBjdXRPZmYsXG4gICAgc3F1YXJlLnJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplICogY3V0T2ZmLFxuICAgIHNxdWFyZVNpemUgLSAyICogY3V0T2ZmICogc3F1YXJlU2l6ZSxcbiAgICBzcXVhcmVTaXplIC0gMiAqIGN1dE9mZiAqIHNxdWFyZVNpemVcbiAgKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhYnNvbHV0ZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGFycmF5cyBieSBzdW1taW5nIGV2ZXJ5IGluZGV4XG4gKiBAcGFyYW0ge1tOdW1iZXJdfSBhcnIxXG4gKiBAcGFyYW0gW051bWJlcl19IGFycjJcbiAqIEByZXR1cm5zIE51bWJlclxuICovXG5jb25zdCB0b3RhbERpZmYgPSAoYXJyMSwgYXJyMikgPT4ge1xuICBjb25zdCBsID0gTWF0aC5tYXgoYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgbGV0IGQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgZCArPSBNYXRoLmFicygoYXJyMVtpXSB8fCAwKSAtIChhcnIyW2ldIHx8IDApKTtcbiAgfVxuXG4gIHJldHVybiBkO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eEJlZm9yZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eEFmdGVyXG4gKi9cbmNvbnN0IGNlbnRlckFic1BpeGVsRGlmZiA9IChjdHhCZWZvcmUsIGN0eEFmdGVyKSA9PiB7XG4gIC8vIE5vdGU6IChTaW1vbikgVGhlIGJvYXJkIGhhcyB0byBiZSBzcXVhcmVcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGN0eEJlZm9yZS5jYW52YXMud2lkdGggLyA4O1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBTcXVhcmUuYWxsSW5Cb2FyZCgpLm1hcChzcXVhcmUgPT4ge1xuICAgIGNvbnN0IGJlZm9yZSA9IGdldENlbnRlckltYWdlRGF0YUZvclNxdWFyZShcbiAgICAgIHNxdWFyZSxcbiAgICAgIHNxdWFyZVNpemUsXG4gICAgICAwLjI1LFxuICAgICAgY3R4QmVmb3JlXG4gICAgKTtcbiAgICBjb25zdCBhZnRlciA9IGdldENlbnRlckltYWdlRGF0YUZvclNxdWFyZShcbiAgICAgIHNxdWFyZSxcbiAgICAgIHNxdWFyZVNpemUsXG4gICAgICAwLjI1LFxuICAgICAgY3R4QWZ0ZXJcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogdG90YWxEaWZmKGJlZm9yZS5kYXRhLCBhZnRlci5kYXRhKVxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGdyZXkgc2NhbGUgdmFsdWVzICgwIC0gMjU1KSBpZ25vcmluZyB0aGVcbiAqIGFscGhhIGNoYW5uZWxcbiAqIEBwYXJhbSB7W051bWJlcl19IHJnYmFWYWx1ZXNcbiAqIEByZXR1cm5zIHtbTnVtYmVyXX1cbiAqL1xuY29uc3QgcmdiYVRvR3JleVNjYWxlVmFsdWVzID0gcmdiYVZhbHVlcyA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmdiYVZhbHVlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgIHJlc3VsdC5wdXNoKFxuICAgICAgTWF0aC5mbG9vcigocmdiYVZhbHVlc1tpXSArIHJnYmFWYWx1ZXNbaSArIDFdICsgcmdiYVZhbHVlc1tpICsgMl0pIC8gMylcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aHJlc2hvbGRcbiAqIEBwYXJhbSB7TnVtYmVyfSBweFBlclJvd1xuICogQHBhcmFtIHtbTnVtYmVyXX0gZ3JleVNjYWxlRGF0YVxuICogQHBhcmFtIHtOdW1iZXJ9IHB4TnJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmNvbnN0IGVkZ2VWYWx1ZSA9ICh0aHJlc2hvbGQsIHB4UGVyUm93LCBncmV5U2NhbGVEYXRhLCBweE5yKSA9PiB7XG4gIGNvbnN0IHJvd1NpemUgPSBweFBlclJvdztcbiAgbGV0IHJlc3VsdCA9IDA7XG5cbiAgY29uc3QgdG9wID0gZ3JleVNjYWxlRGF0YVtweE5yIC0gcm93U2l6ZV07XG4gIGNvbnN0IGJvdHRvbSA9IGdyZXlTY2FsZURhdGFbcHhOciArIHJvd1NpemVdO1xuICBjb25zdCBsZWZ0ID0gZ3JleVNjYWxlRGF0YVtweE5yIC0gMV07XG4gIGNvbnN0IHJpZ2h0ID0gZ3JleVNjYWxlRGF0YVtweE5yICsgMV07XG5cbiAgLy8gUGl4ZWxzIG9uIGVkZ2Ugb2YgY2FudmFzXG4gIGlmIChcbiAgICB0b3AgPT09IHVuZGVmaW5lZCB8fFxuICAgIGJvdHRvbSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgbGVmdCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgcmlnaHQgPT09IHVuZGVmaW5lZFxuICApXG4gICAgcmV0dXJuIDA7XG5cbiAgY29uc3QgdiA9IGdyZXlTY2FsZURhdGFbcHhOcl07XG4gIGlmIChNYXRoLmFicyh2IC0gdG9wKSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gYm90dG9tKSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gbGVmdCkgPiB0aHJlc2hvbGQpIHJlc3VsdCArPSAxO1xuICBpZiAoTWF0aC5hYnModiAtIHJpZ2h0KSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmNvbnN0IHN1bURpZmYgPSAoYXJyMSwgYXJyMikgPT4gTWF0aC5hYnMoYXJyMS5yZWR1Y2Uoc3VtKSAtIGFycjIucmVkdWNlKHN1bSkpO1xuXG5jb25zdCBlZGdlUGl4ZWxDb3VudERpZmYgPSAoY3R4QmVmb3JlLCBjdHhBZnRlcikgPT4ge1xuICAvLyBOb3RlOiAoU2ltb24pIFRoZSBib2FyZCBoYXMgdG8gYmUgc3F1YXJlXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBjdHhCZWZvcmUuY2FudmFzLndpZHRoIC8gODtcbiAgY29uc3QgUEFERElORyA9IDAuMDYyNTsgLy8gSGFzIHRvIHJlc3VsdCBpbiByb3VuZCBuciFcbiAgY29uc3QgaW5uZXJTcXVhcmVTaXplID0gc3F1YXJlU2l6ZSAtIDIgKiBQQURESU5HICogc3F1YXJlU2l6ZTtcbiAgY29uc3QgVEhSRVNIT0xEID0gMTU7XG5cbiAgY29uc3QgY2hhbmdlcyA9IFNxdWFyZS5hbGxJbkJvYXJkKCkubWFwKHNxdWFyZSA9PiB7XG4gICAgY29uc3QgYmVmb3JlID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIFBBRERJTkcsXG4gICAgICBjdHhCZWZvcmVcbiAgICApO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIFBBRERJTkcsXG4gICAgICBjdHhBZnRlclxuICAgICk7XG5cbiAgICBjb25zdCBnc0JlZm9yZSA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhiZWZvcmUuZGF0YSk7XG4gICAgY29uc3QgZ3NBZnRlciA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhhZnRlci5kYXRhKTtcblxuICAgIGNvbnN0IGVkZ2VzQmVmb3JlID0gZ3NCZWZvcmUubWFwKCh2LCBpLCBhbGwpID0+XG4gICAgICBlZGdlVmFsdWUoVEhSRVNIT0xELCBpbm5lclNxdWFyZVNpemUsIGFsbCwgaSlcbiAgICApO1xuXG4gICAgY29uc3QgZWRnZXNBZnRlciA9IGdzQWZ0ZXIubWFwKCh2LCBpLCBhbGwpID0+XG4gICAgICBlZGdlVmFsdWUoVEhSRVNIT0xELCBpbm5lclNxdWFyZVNpemUsIGFsbCwgaSlcbiAgICApO1xuXG4gICAgY29uc3QgZGVidWdPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBkZWJ1Z092ZXJsYXkud2lkdGggPSBkZWJ1Z092ZXJsYXkuaGVpZ2h0ID0gaW5uZXJTcXVhcmVTaXplO1xuXG4gICAgY29uc3Qgb3ZlcmxheUltYWdlZGF0YSA9IG5ldyBJbWFnZURhdGEoXG4gICAgICBuZXcgVWludDhDbGFtcGVkQXJyYXkoYmVmb3JlLndpZHRoICogYmVmb3JlLmhlaWdodCAqIDQpLFxuICAgICAgYmVmb3JlLndpZHRoLFxuICAgICAgYmVmb3JlLmhlaWdodFxuICAgICk7XG4gICAgXG4gICAgZWRnZXNCZWZvcmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgaWYgKHYgPT09IDApIHJldHVybjtcbiAgICAgIGkgKj0gNDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMF0gPSAyNTU7XG4gICAgICBvdmVybGF5SW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gMDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMl0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IDI1NTtcbiAgICB9KTtcblxuICAgIGVkZ2VzQWZ0ZXIuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgaWYgKHYgPT09IDApIHJldHVybjtcbiAgICAgIGkgKj0gNDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMF0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAxXSA9IDI1NTtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMl0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IDI1NTtcbiAgICB9KTtcblxuICAgIGRlYnVnT3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIikucHV0SW1hZ2VEYXRhKG92ZXJsYXlJbWFnZWRhdGEsIDAsIDApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogc3VtRGlmZihlZGdlc0JlZm9yZSwgZWRnZXNBZnRlciksXG4gICAgICBkZWJ1Z092ZXJsYXlcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcztcbn07XG5cbi8vZXhwb3J0IGNvbnN0IHNxdWFyZUNoYW5nZXMgPSBjZW50ZXJBYnNQaXhlbERpZmY7XG5leHBvcnQgY29uc3Qgc3F1YXJlQ2hhbmdlcyA9IGVkZ2VQaXhlbENvdW50RGlmZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAcGFyYW0ge0RhdGFVUkx9IGRhdGFVUkxcbiAqIEBwYXJhbSB7a28ub2JzZXJ2YWJsZX0gd3JpdGVUb1xuICogQHJldHVybnMge2tvLm9ic2VydmFibGV9XG4gKi9cbmV4cG9ydCBjb25zdCBjcm9wID0gKGRhdGFVUkwsIHdyaXRlVG8pID0+IHtcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gIGNvbnN0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGN2cy53aWR0aCA9IDI1NjtcbiAgY3ZzLmhlaWdodCA9IDI1NjtcbiAgY29uc3QgY3R4ID0gY3ZzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICB3cml0ZVRvKGN2cyk7XG4gIH07XG4gIGltZy5zcmMgPSBkYXRhVVJMO1xuXG4gIHJldHVybiB3cml0ZVRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvY3JvcC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgcG9pbnRSZWR1Y2VyID0gKGFjYywgeyB4LCB5IH0pID0+IGFjYy5jb25jYXQoeCwgeSk7XG5cbi8qKlxuICogQHBhcmFtIHtbe3gsIHl9XX0gcmVmUG9pbnRzXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWdcbiAqIEByZXR1cm5zIHtEYXRhVVJMfVxuICovXG5leHBvcnQgY29uc3QgcGVyc3BlY3RpdmVUcmFuc2Zvcm0gPSAocmVmUG9pbnRzLCBpbWcpID0+IHtcbiAgY29uc3QgY3ZzID0gZnguY2FudmFzKCk7XG5cbiAgY29uc3QgZnJvbSA9IHJlZlBvaW50cy5yZWR1Y2UocG9pbnRSZWR1Y2VyLCBbXSk7XG4gIGNvbnN0IHRvID0gWzAsIDI1NiwgMCwgMCwgMjU2LCAwLCAyNTYsIDI1Nl07XG5cbiAgcmV0dXJuIGN2c1xuICAgIC5kcmF3KGN2cy50ZXh0dXJlKGltZykpXG4gICAgLnBlcnNwZWN0aXZlKGZyb20sIHRvKVxuICAgIC51cGRhdGUoKVxuICAgIC50b0RhdGFVUkwoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5pbXBvcnQgeyBNb3ZlIH0gZnJvbSBcIi4vLi4vTW92ZXNcIjtcblxuaW1wb3J0IHsgcGllY2VJc0JsYWNrLCBwaWVjZUlzV2hpdGUsIHBpZWNlSXNFbXB0eSB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgcG9zc2libGUgbW92ZXMgZm9yIGEgc3F1YXJlIHRoYXQgaG9sZHMgYSBwYXduXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFBhd25Nb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gc3RhdGUuYm9hcmQ7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgc3F1YXJlKTtcbiAgY29uc3QgaXNCbGFjayA9IHBpZWNlSXNCbGFjayhwaWVjZSk7XG5cbiAgY29uc3QgY2FuVGFrZSA9ICh7IHNxdWFyZSwgcGllY2UgfSkgPT5cbiAgICAvLyBUaGVyZSdzIHBpZWNlIGluZm9cbiAgICBwaWVjZSAmJlxuICAgIC8vIFRoZSBzcXVhcmUgaXMgb24gdGhlIGJvYXJkXG4gICAgc3F1YXJlLmluQm91bmRzICYmXG4gICAgLy8gVGhlcmUncyBhIHBpZWNlIG9mIHRoZSBvcHBvc2l0ZSBjb2xvciBPUlxuICAgIC8vIGl0J3MgdGhlIHN0YXRlJ3MgZW4gcGFzc2FudCBzcXVhcmVcbiAgICAoKGlzQmxhY2sgPyBwaWVjZUlzV2hpdGUocGllY2UpIDogcGllY2VJc0JsYWNrKHBpZWNlKSkgfHxcbiAgICAgIHN0YXRlLmVuUGFzc2FudCA9PT0gc3F1YXJlLmNvZGUpO1xuXG4gIGNvbnN0IGNhbk1vdmUgPSAoeyBzcXVhcmUsIHBpZWNlIH0pID0+IHNxdWFyZS5pbkJvdW5kcyAmJiBwaWVjZUlzRW1wdHkocGllY2UpO1xuXG4gIGNvbnN0IGlzU3RhcnRQb3MgPSBpc0JsYWNrID8gc3F1YXJlLnJvdyA9PT0gMSA6IHNxdWFyZS5yb3cgPT09IDY7XG5cbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICBpc0JsYWNrID8gWzEsIDBdIDogWy0xLCAwXSwgLy8gRmlyc3Qgc3RlcFxuICAgIGlzQmxhY2sgPyBbMiwgMF0gOiBbLTIsIDBdLCAvLyBTZWNvbmQgc3RlcFxuICAgIGlzQmxhY2sgPyBbMSwgLTFdIDogWy0xLCAtMV0sIC8vIFRha2VzIGxlZnRcbiAgICBpc0JsYWNrID8gWzEsIDFdIDogWy0xLCAxXSAvLyBUYWtlcyByaWdodFxuICBdO1xuXG4gIGNvbnN0IHBpZWNlc0F0VmFsaWRTcXVhcmVzID0gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLm1hcChzID0+ICh7XG4gICAgICBwaWVjZTogcy5pbkJvdW5kcyA/IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHMpIDogbnVsbCxcbiAgICAgIHNxdWFyZTogc1xuICAgIH0pKTtcblxuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBbZmlyc3RTdGVwLCBzZWNvbmRTdGVwLCB0YWtlc0xlZnQsIHRha2VzUmlnaHRdID0gcGllY2VzQXRWYWxpZFNxdWFyZXM7XG5cbiAgaWYgKGNhbk1vdmUoZmlyc3RTdGVwKSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIGZpcnN0U3RlcC5zcXVhcmUsIHN0YXRlKSk7XG5cbiAgICBpZiAoaXNTdGFydFBvcyAmJiBjYW5Nb3ZlKHNlY29uZFN0ZXApKSB7XG4gICAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBzZWNvbmRTdGVwLnNxdWFyZSwgc3RhdGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2FuVGFrZSh0YWtlc0xlZnQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNMZWZ0LnNxdWFyZSwgc3RhdGUpKTtcbiAgfVxuXG4gIGlmIChjYW5UYWtlKHRha2VzUmlnaHQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNSaWdodC5zcXVhcmUsIHN0YXRlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvcGF3bi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0geyp9IHN0YXRlIFxuICogQHBhcmFtIHsqfSBzcXVhcmUgXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLbmlnaHRNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXRTcXVhcmVNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDJdLFxuICAgIFsxLCAtMl0sXG4gICAgWy0xLCAyXSxcbiAgICBbLTEsIC0yXSxcbiAgICBbMiwgLTFdLFxuICAgIFsyLCAxXSxcbiAgICBbLTIsIC0xXSxcbiAgICBbLTIsIDFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tuaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEtpbmdNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIC8vIFRPRE86IChTaW1vbikgQ2FzdGxpbmdcbiAgcmV0dXJuIGdldFNxdWFyZU1vdmVzKHN0YXRlLCBzcXVhcmUsIFtcbiAgICBbMSwgMF0sXG4gICAgWzEsIDFdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsIDFdLFxuICAgIFstMSwgMF0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbMSwgLTFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuaW1wb3J0IHsgZ2V0QmlzaG9wTW92ZXMgfSBmcm9tIFwiLi9iaXNob3BcIjtcbmltcG9ydCB7IGdldFJvb2tNb3ZlcyB9IGZyb20gXCIuL3Jvb2tcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVlbk1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIGdldEJpc2hvcE1vdmVzKHN0YXRlLCBzcXVhcmUpLmNvbmNhdChnZXRSb29rTW92ZXMoc3RhdGUsIHNxdWFyZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3F1ZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9