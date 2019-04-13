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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTZmYWU0ZDkzODA1Yjg3MTNkZTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9waWVjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvZGlyZWN0aW9uQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3NxdWFyZUJhc2VkLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9iaXNob3AuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3Jvb2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9wYXduLmpzIiwid2VicGFjazovLy8uL3NyYy9tb3Zlcy9rbmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2tpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3F1ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDL002QjtBQUNGO0FBQ1o7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsV0FBVztBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QUNs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VyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUEiLCJmaWxlIjoiLi9saWIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU2ZmFlNGQ5MzgwNWI4NzEzZGU1IiwiaW1wb3J0IHsgcmFuZ2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCByb3dPcmRlciA9IFwiODc2NTQzMjFcIjtcbmNvbnN0IGZpbGVPcmRlciA9IFwiYWJjZGVmZ2hcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3F1YXJlIGluIGEgY2hlc3MgYm9hcmQgd2l0aG91dCBpdHMgY29udGVudHNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTcXVhcmVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaWxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29kZSAtIE5hbWUgb2YgdGhlIHNxdWFyZVxuICogQHByb3BlcnR5IHtbbnVtYmVyXX0gY29vcmQgLSByb3cgYW5kIGZpbGUgbnJzIGluIGFycmF5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluQm91bmRzIC0gaXMgdGhpcyBhIGxlZ2FsIHNxdWFyZVxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgc3F1YXJlIGJ5IHJvdyBhbmQgZmlsZSBuci5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gcm93TnJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWxlTnJcbiAqIEByZXR1cm5zIHtTcXVhcmV9XG4gKi9cbmNvbnN0IFNxdWFyZSA9IChyb3dOciwgZmlsZU5yKSA9PiAoe1xuICByb3c6IHJvd05yLFxuICBmaWxlOiBmaWxlTnIsXG4gIGluZGV4OiByb3dOciAqIDggKyBmaWxlTnIsXG4gIGNvZGU6IGAke2ZpbGVPcmRlcltmaWxlTnJdfSR7cm93T3JkZXJbcm93TnJdfWAsXG4gIGNvb3JkOiBbcm93TnIsIGZpbGVOcl0sXG4gIGluQm91bmRzOiByb3dOciA+PSAwICYmIHJvd05yIDw9IDcgJiYgZmlsZU5yID49IDAgJiYgZmlsZU5yIDw9IDdcbn0pO1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3F1YXJlIGZvciBhIHNxdWFyZSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLmZyb21Db2RlID0gY29kZSA9PlxuICBTcXVhcmUocm93T3JkZXIuaW5kZXhPZihjb2RlWzFdKSwgZmlsZU9yZGVyLmluZGV4T2YoY29kZVswXSkpO1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3F1YXJlIGZvciBhIGNvb3JkaW5hdGUgYXJyYXlcbiAqIEBwYXJhbSB7W251bWJlcl19IGNvb3JkcyAtIFtyb3dOciwgZmlsZU5yXVxuICovXG5TcXVhcmUuZnJvbUNvb3JkID0gKFtyb3dOciwgZmlsZU5yXSkgPT4gU3F1YXJlKHJvd05yLCBmaWxlTnIpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3F1YXJlIGJhc2VkIG9uIGFuIG9sZCBzcXVhcmUgYW5kIGEgZGVsdGFcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIC0gVGhlIHJlZmVyZW5jZSBzcXVhcmVcbiAqIEBwYXJhbSB7W251bWJlcl19IGRlbHRhIC0gVGhlIGRSb3cgYW5kIGRGaWxlIHRvIHRyYW5zbGF0ZVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLnJlbGF0aXZlRnJvbSA9ICh7IHJvdywgZmlsZSB9LCBbZFJvdywgZEZpbGVdKSA9PlxuICBTcXVhcmUocm93ICsgZFJvdywgZmlsZSArIGRGaWxlKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3F1YXJlIGZvciBhbiBpbmRleCBzdGFydGluZyBsZWZ0IHRvIHJpZ2h0LCB0b3AgdG8gYm90dG9tXG4gKiBAcGFyYW0ge051bWJlcn0gaVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLmZyb21JbmRleCA9IGkgPT4gU3F1YXJlKE1hdGguZmxvb3IoaSAvIDgpLCBpICUgOCk7XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBhbGwgdGhlIHNxdWFyZXMgaW4gYSBjaGVzcyBib2FyZFxuICogQHJldHVybnMge1tTcXVhcmVdfVxuICovXG5TcXVhcmUuYWxsSW5Cb2FyZCA9ICgpID0+XG4gIHJhbmdlKDY0KVxuICAgIC5tYXAoaSA9PiBbTWF0aC5mbG9vcihpIC8gOCksIGkgJSA4XSlcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29vcmQpO1xuXG5leHBvcnQgZGVmYXVsdCBTcXVhcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9TcXVhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSZXR1cm5zIGEgYm9hcmQgdGhhdCBob2xkcyBhIGRlZmF1bHQgc3RhcnQgcG9zaXRpb25cbiAqIEByZXR1cm5zIHtbW3N0cmluZ11dfVxuICovXG5leHBvcnQgY29uc3QgU3RhcnRQb3NpdGlvbiA9ICgpID0+IFtcbiAgW1wiclwiLCBcIm5cIiwgXCJiXCIsIFwicVwiLCBcImtcIiwgXCJiXCIsIFwiblwiLCBcInJcIl0sXG4gIFtcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIl0sXG4gIFtcIlJcIiwgXCJOXCIsIFwiQlwiLCBcIlFcIiwgXCJLXCIsIFwiQlwiLCBcIk5cIiwgXCJSXCJdXG5dO1xuXG5jb25zdCBjbG9uZSA9IGJvYXJkID0+IGJvYXJkLnNsaWNlKDApLm1hcChyb3cgPT4gcm93LnNsaWNlKDApKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwaWVjZSAoXCIgXCIgaWYgZW1wdHkpIGF0IGEgcG9zaXRpb24gaW4gYSBib2FyZFxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UGllY2VBdFNxdWFyZSA9IChib2FyZCwgc3F1YXJlKSA9PlxuICBib2FyZFtzcXVhcmUucm93XVtzcXVhcmUuZmlsZV07XG5cbi8qKlxuICogU2V0cyB0aGUgc3F1YXJlIGluIGEgYm9hcmQgdG8gYSAocGllY2UvZW1wdHkpIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICovXG5jb25zdCBzZXRTcXVhcmVTdHJpbmcgPSAoYm9hcmQsIHNxdWFyZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbmV3Qm9hcmQgPSBjbG9uZShib2FyZCk7XG4gIG5ld0JvYXJkW3NxdWFyZS5yb3ddW3NxdWFyZS5maWxlXSA9IHZhbHVlO1xuICByZXR1cm4gbmV3Qm9hcmQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgcGllY2UgaW4gd2hpY2ggdGhlIGZyb21TcXVhcmUgaXMgZW1wdHksIGFuZFxuICogdGhlIHRvU3F1YXJlIGhhcyB0aGUgbW92ZWQgcGllY2UuIE5vdGU6IHRoaXMgZnVuY3Rpb24gZG9lc1xuICogbm90IHBlcmZvcm0gYW55IHZhbGlkaXR5IGNoZWNrc1xuICogXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIFxuICogQHBhcmFtIHtTcXVhcmV9IGZyb21TcXVhcmUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gdG9TcXVhcmUgXG4gKiBAcmV0dXJucyB7W1tzdHJpbmddXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG1vdmVQaWVjZUluQm9hcmQgPSAoYm9hcmQsIGZyb21TcXVhcmUsIHRvU3F1YXJlKSA9PlxuICBzZXRTcXVhcmVTdHJpbmcoXG4gICAgc2V0U3F1YXJlU3RyaW5nKGJvYXJkLCBmcm9tU3F1YXJlLCBcIiBcIiksIC8vIEJvYXJkIHdpdGhvdXQgZnJvbVNxdWFyZVxuICAgIHRvU3F1YXJlLFxuICAgIGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIGZyb21TcXVhcmUpIC8vIEdldCB2YWx1ZSBmcm9tIG9sZCBzcXVhcmVcbiAgKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0JvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBHYW1lU3RhdGUsIHtcbiAgYXBwbHlNb3ZlVG9HYW1lU3RhdGUsXG4gIHdoaXRlSW5DaGVjayxcbiAgYmxhY2tJbkNoZWNrLFxuICBibGFja1BpZWNlQXR0YWNrc1NxdWFyZSxcbiAgd2hpdGVQaWVjZUF0dGFja3NTcXVhcmVcbn0gZnJvbSBcIi4vR2FtZVN0YXRlXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuL1NxdWFyZVwiO1xuXG5pbXBvcnQgeyBnZXRQYXduTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9wYXduXCI7XG5pbXBvcnQgeyBnZXRLbmlnaHRNb3ZlcyB9IGZyb20gXCIuL21vdmVzL2tuaWdodFwiO1xuaW1wb3J0IHsgZ2V0S2luZ01vdmVzIH0gZnJvbSBcIi4vbW92ZXMva2luZ1wiO1xuXG5pbXBvcnQge1xuICBwaWVjZUlzQmxhY2ssXG4gIHBpZWNlSXNXaGl0ZSxcbiAgcGllY2VJc0VtcHR5LFxuICBwaWVjZXNBcmVTYW1lQ29sb3IsXG4gIHBpZWNlQ2FuVGFrZVBpZWNlXG59IGZyb20gXCIuL3BpZWNlXCI7XG5cbmltcG9ydCB7IGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgZ2V0QmlzaG9wTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9iaXNob3BcIjtcbmltcG9ydCB7IGdldFF1ZWVuTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9xdWVlblwiO1xuaW1wb3J0IHsgZ2V0Um9va01vdmVzIH0gZnJvbSBcIi4vbW92ZXMvcm9va1wiO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIHBvc3NpYmxlIG1vdmVzIGZvciBhIHBpZWNlIG9uIGEgc3F1YXJlXG4gKiBpbiBhIGdhbWVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5jb25zdCBnZXRNb3Zlc0ZvclBpZWNlID0gKHN0YXRlLCBzcXVhcmUsIHBpZWNlKSA9PiB7XG4gIHN3aXRjaCAocGllY2UpIHtcbiAgICBjYXNlIFwicFwiOlxuICAgIGNhc2UgXCJQXCI6XG4gICAgICByZXR1cm4gZ2V0UGF3bk1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJuXCI6XG4gICAgY2FzZSBcIk5cIjpcbiAgICAgIHJldHVybiBnZXRLbmlnaHRNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwia1wiOlxuICAgIGNhc2UgXCJLXCI6XG4gICAgICByZXR1cm4gZ2V0S2luZ01vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJiXCI6XG4gICAgY2FzZSBcIkJcIjpcbiAgICAgIHJldHVybiBnZXRCaXNob3BNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwicVwiOlxuICAgIGNhc2UgXCJRXCI6XG4gICAgICByZXR1cm4gZ2V0UXVlZW5Nb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwiclwiOlxuICAgIGNhc2UgXCJSXCI6XG4gICAgICByZXR1cm4gZ2V0Um9va01vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn07XG5cbi8qKlxuICogTW92ZVxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1vdmVcbiAqIEBwcm9wZXJ0eSB7U3F1YXJlfSBmcm9tXG4gKiBAcHJvcGVydHkge1NxdWFyZX0gdG9cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdGFrZXNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcGF3bk1vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdGFrZXNLaW5nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGNhc3RsZXNcbiAqXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbW92ZSB0byBoZWxwIGNyZWF0ZSBhIFBHTiBzdGVwXG4gKiBAcGFyYW0ge1NxdWFyZX0gZnJvbVxuICogQHBhcmFtIHtTcXVhcmV9IHRvXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtNb3ZlfVxuICovXG5leHBvcnQgY29uc3QgTW92ZSA9IChmcm9tLCB0bywgc3RhdGUpID0+ICh7XG4gIGZyb20sXG4gIHRvLFxuICB0YWtlczogcGllY2VDYW5UYWtlUGllY2UoXG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSksXG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgdG8pXG4gICksXG4gIHRha2VzS2luZzogZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgdG8pLnRvTG93ZXJDYXNlKCkgPT09IFwia1wiLFxuICBwYXduTW92ZTogZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSkudG9Mb3dlckNhc2UoKSA9PT0gXCJwXCIsXG4gIGNhc3RsZXM6XG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSkudG9Mb3dlckNhc2UoKSA9PT0gXCJrXCIgJiZcbiAgICBNYXRoLmFicyhmcm9tLmZpbGUgLSB0by5maWxlKSA9PT0gMlxufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIHNlcmllcyBvZiBtb3ZlcyBhIHBpZWNlIGNhbiBtYWtlIG9uIGEgYm9hcmQuXG4gKiBXaWxsIG5vdCBpbmNsdWRlIGNhc3RsZXMgb3IgZW4gcGFzc2FudCwgdGhvc2UgYXJlIGhhbmRsZWRcbiAqIHNlcGVyYXRlbHlcbiAqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gc3RhdGUuYm9hcmQ7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgc3F1YXJlKTtcblxuICBpZiAocGllY2UgPT09IFwiIFwiKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGFsbCBtb3ZlcyBmb3IgdGhlIHBpZWNlIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgaWxsZWdhbCBtb3Zlc1xuICByZXR1cm4gZ2V0TW92ZXNGb3JQaWVjZShzdGF0ZSwgc3F1YXJlLCBwaWVjZSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtbc3RyaW5nXX0gZW1wdHlTcXVhcmVDb2Rlc1xuICogQHBhcmFtIHtbc3RyaW5nXX0gc2FmZVNxdWFyZUNvZGVzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgY2FzdGxpbmdQcmV2ZW50ZWQgPSAoc3RhdGUsIGVtcHR5U3F1YXJlQ29kZXMsIHNhZmVTcXVhcmVDb2RlcykgPT4ge1xuICBjb25zdCBjbGVhclBhdGggPSBlbXB0eVNxdWFyZUNvZGVzXG4gICAgLm1hcChTcXVhcmUuZnJvbUNvZGUpXG4gICAgLm1hcChzcSA9PiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpXG4gICAgLmV2ZXJ5KHBpZWNlSXNFbXB0eSk7XG5cbiAgaWYgKCFjbGVhclBhdGgpIHJldHVybiB0cnVlO1xuXG4gIGNvbnN0IGF0dGFja0NlY2sgPSBzdGF0ZS53aGl0ZVRvTW92ZVxuICAgID8gYmxhY2tQaWVjZUF0dGFja3NTcXVhcmVcbiAgICA6IHdoaXRlUGllY2VBdHRhY2tzU3F1YXJlO1xuXG4gIGNvbnN0IHVuZGVyQXR0YWNrID0gc2FmZVNxdWFyZUNvZGVzXG4gICAgLm1hcChTcXVhcmUuZnJvbUNvZGUpXG4gICAgLnNvbWUoc3EgPT4gYXR0YWNrQ2VjayhzdGF0ZSwgc3EpKTtcblxuICByZXR1cm4gdW5kZXJBdHRhY2s7XG59O1xuXG5jb25zdCBjYXN0bGVNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcbiAgY29uc3QgbW92ZXMgPSBbXTtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBLOiB7XG4gICAgICBsb25nOiB7XG4gICAgICAgIHBhdGg6IFtcImIxXCIsIFwiYzFcIiwgXCJkMVwiXSxcbiAgICAgICAgc2FmZTogW1wiYTFcIiwgXCJjMVwiLCBcImQxXCIsIFwiZTFcIl1cbiAgICAgIH0sXG4gICAgICBzaG9ydDoge1xuICAgICAgICBwYXRoOiBbXCJmMVwiLCBcImcxXCJdLFxuICAgICAgICBzYWZlOiBbXCJmMVwiLCBcImcxXCIsIFwiaDFcIiwgXCJlMVwiXVxuICAgICAgfVxuICAgIH0sXG4gICAgazoge1xuICAgICAgbG9uZzoge1xuICAgICAgICBwYXRoOiBbXCJiOFwiLCBcImM4XCIsIFwiZDhcIl0sXG4gICAgICAgIHNhZmU6IFtcImE4XCIsIFwiYzhcIiwgXCJkOFwiLCBcImU4XCJdXG4gICAgICB9LFxuICAgICAgc2hvcnQ6IHtcbiAgICAgICAgcGF0aDogW1wiZjhcIiwgXCJnOFwiXSxcbiAgICAgICAgc2FmZTogW1wiZjhcIiwgXCJnOFwiLCBcImg4XCIsIFwiZThcIl1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2FuQ2FzdGxlTG9uZyA9IHBpZWNlSXNCbGFjayhwaWVjZSlcbiAgICA/IHN0YXRlLmJsYWNrQ2FuQ2FzdGxlTG9uZ1xuICAgIDogc3RhdGUud2hpdGVDYW5DYXN0bGVMb25nO1xuXG4gIGNvbnN0IGNhbkNhc3RsZVNob3J0ID0gcGllY2VJc0JsYWNrKHBpZWNlKVxuICAgID8gc3RhdGUuYmxhY2tDYW5DYXN0bGVTaG9ydFxuICAgIDogc3RhdGUud2hpdGVDYW5DYXN0bGVTaG9ydDtcblxuICBjb25zdCBsb25nQ2FzdGxlT3B0cyA9IG9wdHNbcGllY2VdLmxvbmc7XG4gIGNvbnN0IHNob3J0Q2FzdGxlT3B0cyA9IG9wdHNbcGllY2VdLnNob3J0O1xuXG4gIGlmIChcbiAgICBjYW5DYXN0bGVMb25nICYmXG4gICAgIWNhc3RsaW5nUHJldmVudGVkKHN0YXRlLCBsb25nQ2FzdGxlT3B0cy5wYXRoLCBsb25nQ2FzdGxlT3B0cy5zYWZlKVxuICApIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgWzAsIC0yXSksIHN0YXRlKSk7XG4gIH1cblxuICBpZiAoXG4gICAgY2FuQ2FzdGxlU2hvcnQgJiZcbiAgICAhY2FzdGxpbmdQcmV2ZW50ZWQoc3RhdGUsIHNob3J0Q2FzdGxlT3B0cy5wYXRoLCBzaG9ydENhc3RsZU9wdHMuc2FmZSlcbiAgKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIFswLCAyXSksIHN0YXRlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXM7XG59O1xuXG4vKipcbiAqIEdldHMgYSBsaXN0IG9mIGxlZ2FsIG1vdmVzIGZvciB0aGUgcGllY2Ugb24gYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldExlZ2FsTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxdWFyZSk7XG5cbiAgaWYgKHBpZWNlSXNCbGFjayhwaWVjZSkgJiYgIXN0YXRlLmJsYWNrVG9Nb3ZlKSByZXR1cm4gW107XG4gIGlmIChwaWVjZUlzV2hpdGUocGllY2UpICYmICFzdGF0ZS53aGl0ZVRvTW92ZSkgcmV0dXJuIFtdO1xuXG4gIGxldCBtb3ZlcyA9IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuXG4gIGlmIChwaWVjZSA9PT0gXCJLXCIgfHwgcGllY2UgPT09IFwia1wiKSB7XG4gICAgbW92ZXMgPSBtb3Zlcy5jb25jYXQoY2FzdGxlTW92ZXMoc3RhdGUsIHNxdWFyZSkpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzLmZpbHRlcihtb3ZlID0+ICFtb3ZlUHV0c093bktpbmdJbkNoZWNrKHN0YXRlLCBtb3ZlKSk7XG59O1xuXG4vKipcbiAqIEdldHMgYSBsaXN0IG9mIGFsbCBsZWdhbCBtb3ZlcyBmb3IgYSBzdGF0ZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBbGxMZWdhbE1vdmVzID0gc3RhdGUgPT5cbiAgU3F1YXJlLmFsbEluQm9hcmQoKS5yZWR1Y2UoXG4gICAgKG1vdmVzLCBzcXVhcmUpID0+IG1vdmVzLmNvbmNhdChnZXRMZWdhbE1vdmVzKHN0YXRlLCBzcXVhcmUpKSxcbiAgICBbXVxuICApO1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgbW92ZVB1dHNPd25LaW5nSW5DaGVjayA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBjb25zdCBtb3ZlZFBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcbiAgY29uc3QgbmV3U3RhdGUgPSBhcHBseU1vdmVUb0dhbWVTdGF0ZShzdGF0ZSwgbW92ZSk7XG5cbiAgcmV0dXJuIHBpZWNlSXNCbGFjayhtb3ZlZFBpZWNlKVxuICAgID8gYmxhY2tJbkNoZWNrKG5ld1N0YXRlKVxuICAgIDogd2hpdGVJbkNoZWNrKG5ld1N0YXRlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBtb3ZlR2l2ZXNDaGVjayA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBjb25zdCBtb3ZlZFBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcbiAgY29uc3QgbmV3U3RhdGUgPSBhcHBseU1vdmVUb0dhbWVTdGF0ZShzdGF0ZSwgbW92ZSk7XG5cbiAgcmV0dXJuIHBpZWNlSXNCbGFjayhtb3ZlZFBpZWNlKVxuICAgID8gd2hpdGVJbkNoZWNrKG5ld1N0YXRlKVxuICAgIDogYmxhY2tJbkNoZWNrKG5ld1N0YXRlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Nb3Zlcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUlzRW1wdHkgPSBwaWVjZSA9PiBwaWVjZSA9PT0gXCIgXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNXaGl0ZSA9IHBpZWNlID0+XG4gICEhcGllY2UgJiYgIXBpZWNlSXNFbXB0eShwaWVjZSkgJiYgcGllY2UudG9VcHBlckNhc2UoKSA9PT0gcGllY2U7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNCbGFjayA9IHBpZWNlID0+XG4gICEhcGllY2UgJiYgIXBpZWNlSXNFbXB0eShwaWVjZSkgJiYgcGllY2UudG9Mb3dlckNhc2UoKSA9PT0gcGllY2U7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHAxXG4gKiBAcGFyYW0ge3N0cmluZ30gcDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VzQXJlU2FtZUNvbG9yID0gKHAxLCBwMikgPT5cbiAgKHBpZWNlSXNXaGl0ZShwMSkgJiYgcGllY2VJc1doaXRlKHAyKSkgfHxcbiAgKHBpZWNlSXNCbGFjayhwMSkgJiYgcGllY2VJc0JsYWNrKHAyKSk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHAxXG4gKiBAcGFyYW0ge3N0cmluZ30gcDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VDYW5UYWtlUGllY2UgPSAocDEsIHAyKSA9PlxuICAocGllY2VJc1doaXRlKHAxKSAmJiBwaWVjZUlzQmxhY2socDIpKSB8fFxuICAocGllY2VJc0JsYWNrKHAxKSAmJiBwaWVjZUlzV2hpdGUocDIpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BpZWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVHJpbSBhIHN0cmluZyB1c2luZyBuYXRpdmUgdHJpbVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHRyaW0gPSBzdHIgPT4gc3RyLnRyaW0oKTtcblxuLyoqXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc09iamVjdCA9IHggPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuXG4vKipcbiAqIE1hcHMgYXJyYXlzIG9yIG9iamVjdHNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGYgLSBhIC0+IGJcbiAqIEBwYXJhbSB7Kn0gZnVuY3RvclxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSAoZiwgZnVuY3RvcikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdG9yKSB8fCB0eXBlb2YgZi5tYXAgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZnVuY3Rvci5tYXAoZik7XG5cbiAgaWYgKGlzT2JqZWN0KGZ1bmN0b3IpKVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhmdW5jdG9yKS5yZWR1Y2UoXG4gICAgICAobywgW2ssIHZdKSA9PiBPYmplY3QuYXNzaWduKG8sIHsgW2tdOiBmKHYpIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiBmdW5jdG9yO1xufTtcblxuLyoqXG4gKiBGaWx0ZXJzIGFycmF5cyBvciBvYmplY3RzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZCAtIEZpbHRlciBmdW5jdGlvbiBvZiB4IC0+IGJvb2xcbiAqIEBwYXJhbSB7Kn0gZmlsdGVyYWJsZVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAocHJlZCwgZmlsdGVyYWJsZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJhYmxlKSB8fCB0eXBlb2YgZmlsdGVyYWJsZS5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZmlsdGVyYWJsZS5maWx0ZXIocHJlZCk7XG5cbiAgaWYgKGlzT2JqZWN0KGZpbHRlcmFibGUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGZpbHRlcmFibGUpLnJlZHVjZShcbiAgICAgIChvLCBbaywgdl0pID0+IE9iamVjdC5hc3NpZ24obywgcHJlZCh2KSA/IHsgW2tdOiB2IH0gOiB7fSksXG4gICAgICB7fVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyYWJsZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmFuZ2Ugb2YgbnVtYmVycywgc3RhcnRpbmcgYXQgMVxuICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbGVuZ3RoL2VuZCBvZiB0aGUgcmFuZ2VcbiAqIEByZXR1cm5zIHtbbnVtYmVyXX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJhbmdlID0gbiA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBuIH0sIChfLCBpKSA9PiBpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgY29tYmluYXRpb25zIG9mIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7WypdfSB4c1xuICogQHBhcmFtIHtbKl19IHlzXG4gKiBAcmV0dXJucyB7W1sqXV19XG4gKi9cbmV4cG9ydCBjb25zdCB4UHJvZCA9ICh4cywgeXMpID0+XG4gIHhzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KHlzLm1hcCh5ID0+IFt4LCB5XSkpLCBbXSk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHByb3AgPSBrZXkgPT4gb2JqID0+IG9ialtrZXldO1xuXG4vKipcbiAqIENvbXBvc2UgMlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZ1xuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9IChmLCBnKSA9PiB4ID0+IGYoZyh4KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTdGFydFBvc2l0aW9uLCBtb3ZlUGllY2VJbkJvYXJkLCBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUsIGdldE1vdmVzIH0gZnJvbSBcIi4vTW92ZXNcIjtcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgcGllY2VJc0JsYWNrLCBwaWVjZUlzV2hpdGUgfSBmcm9tIFwiLi9waWVjZVwiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlc3MgYm9hcmQgZHVyaW5nIGEgZ2FtZVxuICogQHR5cGVkZWYge09iamVjdH0gR2FtZVN0YXRlXG4gKiBAcHJvcGVydHkge1tbc3RyaW5nXV19IGJvYXJkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdoaXRlVG9Nb3ZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJsYWNrVG9Nb3ZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdoaXRlQ2FuQ2FzdGxlU2hvcnRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVDYW5DYXN0bGVMb25nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJsYWNrQ2FuQ2FzdGxlU2hvcnRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tDYW5DYXN0bGVMb25nXG4gKiBAcHJvcGVydHkge3N0cmluZz99IGVuUGFzc2FudCAtIFBvc2l0aW9uIGJlaGluZCBhIHBhd24gdGhhdCBqdXN0IG1hZGUgYSAyIHNxdWFyZSBhZHZhbmNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGFsZk1vdmVzIC0gSGFsZiBtb3ZlcyBzaW5jZSBsYXN0IGNhcHR1cmUgb3IgcGF3blxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1vdmVOciAtIFRvdGFsIG1vdmVzIGluIGdhbWUuIFN0YXJ0cyBhdCAxLCBpbmNyZW1lbnQgcGVyIGJsYWNrIG1vdmVcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIEdhbWVTdGF0ZVxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCAtIEEgbGlzdCBvZiByb3dzIGNvbnRhaW5pbmcgcGllY2UgY29kZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b01vdmUgLSBcIndcIiBmb3Igd2hpdGUsIFwiYlwiIGZvciBibGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGNhc3RsZU9wdGlvbnMgLSBBbnkgY29tYmluYXRpb24gb2YgXCJLUWtxXCIgZm9yIHdoaXRlL2JsYWNrIGtpbmcvcXVlZW4gc2lkZSBjYXN0bGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IGVuUGFzc2FudFNxdWFyZSAtIFBvc2l0aW9uIGJlaGluZCBhIHBhd24gdGhhdCBqdXN0IG1hZGUgYSAyIHNxdWFyZSBhZHZhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGhhbGZNb3ZlcyAtIEhhbGYgbW92ZXMgc2luY2UgbGFzdCBjYXB0dXJlIG9yIHBhd24gYWR2YW5jZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBmdWxsTW92ZXMgLSBUb3RhbCBtb3ZlcyBpbiBnYW1lLiBTdGFydHMgYXQgMSwgaW5jcmVtZW50IHBlciBibGFjayBtb3ZlXG4gKiBAcmV0dXJucyB7R2FtZVN0YXRlfVxuICovXG5jb25zdCBHYW1lU3RhdGUgPSAoXG4gIGJvYXJkLFxuICB0b01vdmUgPSBcIndcIixcbiAgY2FzdGxlT3B0aW9ucyA9IFwiS1FrcVwiLFxuICBlblBhc3NhbnRTcXVhcmUgPSBcIi1cIixcbiAgaGFsZk1vdmVzID0gMCxcbiAgZnVsbE1vdmVzID0gMVxuKSA9PiB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIGJvYXJkOiBib2FyZCB8fCBTdGFydFBvc2l0aW9uKCksXG4gICAgICAvLyBTaWRlIHRvIG1vdmVcbiAgICAgIHdoaXRlVG9Nb3ZlOiB0b01vdmUgPT09IFwid1wiLFxuICAgICAgYmxhY2tUb01vdmU6IHRvTW92ZSA9PT0gXCJiXCIsXG5cbiAgICAgIC8vIEVuIHBhc3NhbnRcbiAgICAgIGVuUGFzc2FudDogZW5QYXNzYW50U3F1YXJlID09PSBcIi1cIiA/IG51bGwgOiBlblBhc3NhbnRTcXVhcmUsXG4gICAgICAvLyBNb3ZlIG51bWJlcnNcbiAgICAgIGhhbGZNb3ZlczogK2hhbGZNb3ZlcyxcbiAgICAgIG1vdmVOcjogK2Z1bGxNb3Zlc1xuICAgIH0sXG4gICAgY2FzdGxlT3B0aW9uc0Zyb21TdHJpbmcoY2FzdGxlT3B0aW9ucylcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhc3RsZVN0clxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgY2FzdGxlT3B0aW9uc0Zyb21TdHJpbmcgPSBjYXN0bGVTdHIgPT4gKHtcbiAgd2hpdGVDYW5DYXN0bGVTaG9ydDogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcIktcIiksXG4gIHdoaXRlQ2FuQ2FzdGxlTG9uZzogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcIlFcIiksXG4gIGJsYWNrQ2FuQ2FzdGxlU2hvcnQ6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJrXCIpLFxuICBibGFja0NhbkNhc3RsZUxvbmc6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJxXCIpXG59KTtcblxuY29uc3QgY2FzdGxlU3RyRnJvbU9wdGlvbnMgPSAoe1xuICB3aGl0ZUNhbkNhc3RsZVNob3J0LFxuICB3aGl0ZUNhbkNhc3RsZUxvbmcsXG4gIGJsYWNrQ2FuQ2FzdGxlU2hvcnQsXG4gIGJsYWNrQ2FuQ2FzdGxlTG9uZ1xufSkgPT5cbiAgW1xuICAgIFtcIktcIiwgd2hpdGVDYW5DYXN0bGVTaG9ydF0sXG4gICAgW1wiUVwiLCB3aGl0ZUNhbkNhc3RsZUxvbmddLFxuICAgIFtcImtcIiwgYmxhY2tDYW5DYXN0bGVTaG9ydF0sXG4gICAgW1wicVwiLCBibGFja0NhbkNhc3RsZUxvbmddXG4gIF1cbiAgICAuZmlsdGVyKChbYywgcHJlZF0pID0+IHByZWQpXG4gICAgLm1hcCgoW2MsIHByZWRdKSA9PiBjKVxuICAgIC5qb2luKFwiXCIpO1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7c3RyaW5nP31cbiAqL1xuY29uc3QgY2FzdGxlT3B0aW9uc0RpZmYgPSAoc3RhdGUsIG1vdmUpID0+IHtcbiAgbGV0IHByZXZPcHRpb25zID0gY2FzdGxlU3RyRnJvbU9wdGlvbnMoc3RhdGUpO1xuXG4gIGlmICghcHJldk9wdGlvbnMpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcblxuICBzd2l0Y2ggKHBpZWNlKSB7XG4gICAgY2FzZSBcImtcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKFwia1wiLCBcIlwiKS5yZXBsYWNlKFwicVwiLCBcIlwiKTtcbiAgICBjYXNlIFwiclwiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UobW92ZS5mcm9tLmZpbGUgPT09IDAgPyBcInFcIiA6IFwia1wiLCBcIlwiKTtcbiAgICBjYXNlIFwiS1wiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UoXCJLXCIsIFwiXCIpLnJlcGxhY2UoXCJRXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJSXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShtb3ZlLmZyb20uZmlsZSA9PT0gMCA/IFwiUVwiIDogXCJLXCIsIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHByZXZPcHRpb25zO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtHYW1lU3RhdGV9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseU1vdmVUb0dhbWVTdGF0ZSA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBtb3ZlUGllY2VJbkJvYXJkKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20sIG1vdmUudG8pO1xuXG4gIGlmIChtb3ZlLmNhc3RsZXMpIHtcbiAgICAvLyBNb3ZlIHRoZSByb29rIGFzIHdlbGxcbiAgICBjb25zdCBxdWVlblNpZGUgPSBtb3ZlLnRvLmZpbGUgPT09IDI7IC8vIFwiY1wiXG4gICAgY29uc3QgcmVsRnJvbSA9IHF1ZWVuU2lkZSA/IFswLCAtMl0gOiBbMCwgMV07XG4gICAgY29uc3QgcmVsVG8gPSBxdWVlblNpZGUgPyBbMCwgMV0gOiBbMCwgLTFdO1xuXG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIm11c3QgbW92ZSByb29rIGZyb21cIixcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsRnJvbSkuY29kZSxcbiAgICAgIFwidG9cIixcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsVG8pLmNvZGVcbiAgICApO1xuXG4gICAgYm9hcmQgPSBtb3ZlUGllY2VJbkJvYXJkKFxuICAgICAgYm9hcmQsXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbEZyb20pLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxUbylcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIEdhbWVTdGF0ZShcbiAgICBib2FyZCxcbiAgICBzdGF0ZS53aGl0ZVRvTW92ZSA/IFwiYlwiIDogXCJ3XCIsXG4gICAgY2FzdGxlT3B0aW9uc0RpZmYoc3RhdGUsIG1vdmUpLFxuICAgIG1vdmUuaXNQYXduTW92ZSAmJiBtb3ZlLnRvLnJvdyAtIG1vdmUuZnJvbS5yb3cgPT09IDIsIC8vIFRPRE86IChTaW1vbikgZ2V0IGVuIHBhc3NhbnQgc3F1YXJlXG4gICAgc3RhdGUuaGFsZk1vdmVzICsgMSxcbiAgICBzdGF0ZS5tb3ZlTnIgKyAoc3RhdGUud2hpdGVUb01vdmUgPyAxIDogMClcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0NoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKS5zb21lKHNxdWFyZSA9PlxuICAgIGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZylcbiAgKTtcbn07XG5cbi8vIFRPRE86IChTaW1vbikgRFJZXG4vLyBOb3RlOiAoU2ltb24pIEhhdmluZyB0byByZWNhbGN1bGF0ZSBhbGwgbW92ZXMgZm9yIGEgY29sb3IgZXZlcnkgdGltZSBvbmVcbi8vICAgICAgICAgICAgICAgb2YgdGhlc2UgbWV0aG9kcyBpcyBjYWxsZWQgaXMgdmVyeSBpbmVmZmljaWVudC4gUHJvYmFibHlcbi8vICAgICAgICAgICAgICAgYmV0dGVyIHRvIHN0b3JlIHBvc3NpYmxlIG1vdmVzIHdpdGggYSBnYW1lIHN0YXRlXG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdoaXRlSW5DaGVjayA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNCbGFjayhnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxdWFyZSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5zb21lKG1vdmUgPT4gbW92ZS50YWtlc0tpbmcpKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGJsYWNrSW5DaGVjayA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNXaGl0ZShnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxdWFyZSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5zb21lKG1vdmUgPT4gbW92ZS50YWtlc0tpbmcpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9uZSBvZiB0aGUgYmxhY2sgcGllY2VzIGF0dGFja3MgYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBibGFja1BpZWNlQXR0YWNrc1NxdWFyZSA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzQmxhY2soZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3EpLnNvbWUobW92ZSA9PiBtb3ZlLnRvLmNvZGUgPT09IHNxdWFyZS5jb2RlKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvbmUgb2YgdGhlIHdoaXRlIHBpZWNlcyBhdHRhY2tzIGEgc3F1YXJlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVQaWVjZUF0dGFja3NTcXVhcmUgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc1doaXRlKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3EgPT4gZ2V0TW92ZXMoc3RhdGUsIHNxKS5zb21lKG1vdmUgPT4gbW92ZS50by5jb2RlID09PSBzcXVhcmUuY29kZSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0YXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvR2FtZVN0YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBleHBsb3JlcyBhIGRpcmVjdGlvbiBvbiBhIGJvYXJkIHVudGlsIHRoZSBwaWVjZVxuICogaXMgb3V0IG9mIG1vdmVzXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGlyZWN0aW9uXG4gKiBAcGFyYW0ge1tudW1iZXJdfSBkZWx0YVxuICogQHBhcmFtIHtbTW92ZV19IHJlc3VsdHNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmNvbnN0IGdldE1vdmVzVW50aWxOb3RFbXB0eSA9IChcbiAgc3RhdGUsXG4gIHBpZWNlLFxuICBzcXVhcmUsXG4gIGRpcmVjdGlvbixcbiAgZGVsdGEgPSBbMCwgMF0sXG4gIHJlc3VsdHMgPSBbXVxuKSA9PiB7XG4gIGNvbnN0IG5ld0RlbHRhID0gW2RlbHRhWzBdICsgZGlyZWN0aW9uWzBdLCBkZWx0YVsxXSArIGRpcmVjdGlvblsxXV07XG5cbiAgY29uc3QgbmV4dFNxdWFyZSA9IFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBuZXdEZWx0YSk7XG5cbiAgLy8gRWRnZSBvZiBib2FyZCwgZW5kIG9mIG1vdmVcbiAgaWYgKCFuZXh0U3F1YXJlLmluQm91bmRzKSByZXR1cm4gcmVzdWx0cztcblxuICBjb25zdCB0b1BpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbmV4dFNxdWFyZSk7XG4gIGNvbnN0IGhhc1BpZWNlID0gdG9QaWVjZSAhPT0gXCIgXCI7XG4gIGNvbnN0IGhhc0VuZW15UGllY2UgPSBoYXNQaWVjZSAmJiAhcGllY2VzQXJlU2FtZUNvbG9yKHBpZWNlLCB0b1BpZWNlKTtcblxuICAvLyBPd24gcGllY2UsIGVuZCBvZiBtb3ZlXG4gIGlmIChoYXNQaWVjZSAmJiAhaGFzRW5lbXlQaWVjZSkgcmV0dXJuIHJlc3VsdHM7XG5cbiAgLy8gV2UgY2FuIG1ha2UgYSBtb3ZlIGZvciBzdXJlXG4gIGNvbnN0IG1vdmUgPSBNb3ZlKHNxdWFyZSwgbmV4dFNxdWFyZSwgc3RhdGUpO1xuXG4gIGlmIChoYXNQaWVjZSkgcmV0dXJuIHJlc3VsdHMuY29uY2F0KG1vdmUpO1xuXG4gIHJldHVybiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoXG4gICAgc3RhdGUsXG4gICAgcGllY2UsXG4gICAgc3F1YXJlLFxuICAgIGRpcmVjdGlvbixcbiAgICBuZXdEZWx0YSxcbiAgICByZXN1bHRzLmNvbmNhdChtb3ZlKVxuICApO1xufTtcblxuLyoqXG4gKiBHZXRzIGEgbGlzdCBvZiBtb3ZlcyBmb3IgYSBwaWVjZSBvbiBhIHNxdWFyZSBiYXNlZCBvbiBhIHNldCBvZlxuICogZGlyZWN0aW9uc1xuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge1tbbnVtYmVyXV19IGRpcmVjdGlvbnNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXREaXJlY3Rpb25hbE1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIGRpcmVjdGlvbnMpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuICByZXR1cm4gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoc3RhdGUsIHBpZWNlLCBzcXVhcmUsIGQpKVxuICAgIC5yZWR1Y2UoKHhzLCB4KSA9PiB4cy5jb25jYXQoeCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2RpcmVjdGlvbkJhc2VkLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7W1tudW1iZXJdXSByZWxhdGl2ZXMgLSBTcXVhcmUgbG9jYXRpb25zIFtkUm93LCBkRmlsZV0gcmVsYXRpdmUgdG8gdGhpcyBzcXVhcmV9XG4gKiBAcmV0dXJucyB7W01vdmVzXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNxdWFyZU1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIHJlbGF0aXZlcykgPT4ge1xuICBjb25zdCB0aGlzUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuXG4gIGNvbnN0IHRvU3F1YXJlcyA9IHJlbGF0aXZlc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLmZpbHRlcihzID0+IHMuaW5Cb3VuZHMpXG4gICAgLm1hcChzID0+ICh7IHNxdWFyZTogcywgcGllY2U6IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHMpIH0pKVxuICAgIC8vIE9ubHkgZW1wdHkgc3F1YXJlcyBvciBzcXVhcmVzIHdpdGggZW5lbXkgcGllY2VzXG4gICAgLmZpbHRlcih0byA9PiB0by5waWVjZSA9PT0gXCIgXCIgfHwgIXBpZWNlc0FyZVNhbWVDb2xvcih0aGlzUGllY2UsIHRvLnBpZWNlKSk7XG5cbiAgcmV0dXJuIHRvU3F1YXJlcy5tYXAodG8gPT4gTW92ZShzcXVhcmUsIHRvLnNxdWFyZSwgc3RhdGUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9zcXVhcmVCYXNlZC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCaXNob3BNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXREaXJlY3Rpb25hbE1vdmVzKHN0YXRlLCBzcXVhcmUsIFtcbiAgICBbMSwgMV0sXG4gICAgWy0xLCAxXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgLTFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2Jpc2hvcC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSb29rTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0RGlyZWN0aW9uYWxNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbWzEsIDBdLCBbLTEsIDBdLCBbMCwgLTFdLCBbMCwgMV1dKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9yb29rLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNxdWFyZUNoYW5nZXMgfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL3NxdWFyZUNoYW5nZXNcIjtcbmltcG9ydCB7IGNyb3AgfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL2Nyb3BcIjtcbmltcG9ydCB7IHBlcnNwZWN0aXZlVHJhbnNmb3JtIH0gZnJvbSBcIi4vaW1hZ2VIYW5kbGluZy9wZXJzcGVjdGl2ZVRyYW5zZm9ybVwiO1xuaW1wb3J0IHsgZ2V0QWxsTGVnYWxNb3ZlcyB9IGZyb20gXCIuL01vdmVzXCI7XG5pbXBvcnQgR2FtZVN0YXRlLCB7IGFwcGx5TW92ZVRvR2FtZVN0YXRlIH0gZnJvbSBcIi4vR2FtZVN0YXRlXCI7XG5cbmNvbnN0IEJvYXJkSW1hZ2UgPSAoaW1nRmlsZSwgdHJhbnNmb3JtRnJvbSkgPT4ge1xuICBjb25zdCBmb3VyUG9pbnRzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcblxuICAvLyBXcml0ZSBmcm9tIHBvaW50cyB0byB0cmFuc2Zvcm1Gcm9tIGV2ZXJ5IDR0aCBpdGVtXG4gIGZvdXJQb2ludHMuc3Vic2NyaWJlKHBvaW50cyA9PiB7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHRyYW5zZm9ybUZyb20ocG9pbnRzKTtcbiAgICAgIGZvdXJQb2ludHMoW10pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbXlDcm9wID0ga28ub2JzZXJ2YWJsZSgpO1xuICBjb25zdCBjcm9wRGF0YVVSTCA9IGtvLnB1cmVDb21wdXRlZChcbiAgICAoKSA9PiAobXlDcm9wKCkgPyBteUNyb3AoKS50b0RhdGFVUkwoKSA6IG51bGwpXG4gICk7XG5cbiAgLy8gTGluayBhIHZpcnR1YWwgaW1nXG4gIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gIGNvbnN0IHJlZHJhdyA9IHRyYW5zZm9ybSA9PiB7XG4gICAgY3JvcChwZXJzcGVjdGl2ZVRyYW5zZm9ybSh0cmFuc2Zvcm0sIGltZyksIG15Q3JvcCk7XG4gIH07XG5cbiAgdHJhbnNmb3JtRnJvbS5zdWJzY3JpYmUocmVkcmF3KTtcblxuICAvLyBMb2FkIGluaXRpYWwgaW1hZ2VcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHJlZHJhdyh0cmFuc2Zvcm1Gcm9tKCkpO1xuICBpbWcuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChpbWdGaWxlKTtcblxuICBjb25zdCBnYW1lU3RhdGUgPSBrby5vYnNlcnZhYmxlKEdhbWVTdGF0ZSgpKTtcbiAgY29uc3QgYm9hcmQgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4gZ2FtZVN0YXRlKCkuYm9hcmQpO1xuICBjb25zdCBzZWxlY3RlZE1vdmUgPSBrby5vYnNlcnZhYmxlKG51bGwpO1xuXG4gIC8vIEEgbGlzdCBvZiA2NCBjYW52YXNlcyBzaG93aW5nIHBpeGVsIGVkZ2VzXG4gIGNvbnN0IGRlYnVnT3ZlcmxheSA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG4gIGNvbnN0IHZpc2libGVEZWJ1Z092ZXJsYXkgPSBrby5wdXJlQ29tcHV0ZWQoXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKCFzZWxlY3RlZE1vdmUoKSkgcmV0dXJuIGRlYnVnT3ZlcmxheSgpO1xuICAgXG4gICAgICBjb25zdCB7IG1vdmU6IHsgZnJvbSwgdG8gfSB9ID0gc2VsZWN0ZWRNb3ZlKCk7XG4gICAgICByZXR1cm4gZGVidWdPdmVybGF5KClcbiAgICAgICAgLm1hcCgoY3ZzLCBpKSA9PiBpID09PSBmcm9tLmluZGV4IHx8IGkgPT09IHRvLmluZGV4XG4gICAgICAgICAgPyBjdnNcbiAgICAgICAgICA6IG51bGxcbiAgICAgICAgKTtcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lU3RhdGUsXG4gICAgYm9hcmQsXG4gICAgaW1hZ2VWaXNpYmxlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICBvcmlnaW5hbDogaW1nLnNyYyxcbiAgICBjcm9wOiBjcm9wRGF0YVVSTCxcbiAgICBjcm9wQ3ZzOiBteUNyb3AsXG4gICAgbW92ZVJhdGluZzoga28ub2JzZXJ2YWJsZUFycmF5KFtdKSxcbiAgICBvbkNsaWNrOiAoZCwgZSkgPT4ge1xuICAgICAgY29uc3QgYmJveCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZm91clBvaW50cy5wdXNoKHtcbiAgICAgICAgeDogZS5jbGllbnRYIC0gYmJveC54LFxuICAgICAgICB5OiBlLmNsaWVudFkgLSBiYm94LnlcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2VsZWN0TW92ZTogbW92ZSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRNb3ZlKCkgPT09IG1vdmUpIHtcbiAgICAgICAgc2VsZWN0ZWRNb3ZlKG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZWN0ZWRNb3ZlKG1vdmUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VsZWN0ZWRNb3ZlLFxuICAgIGRlYnVnT3ZlcmxheSxcbiAgICB2aXNpYmxlRGVidWdPdmVybGF5XG4gIH07XG59O1xuXG5jb25zdCBBcHAgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgdHJhbnNmb3JtRnJvbSA9IGtvLm9ic2VydmFibGVBcnJheShbXG4gICAgeyB4OiAxMjAsIHk6IDQ1IH0sXG4gICAgeyB4OiA0MDMsIHk6IDQzIH0sXG4gICAgeyB4OiAzOTQsIHk6IDMyNSB9LFxuICAgIHsgeDogMTI1LCB5OiAzMjMgfVxuICBdKTtcblxuICB0aGlzLnRvZ2dsZUltYWdlcyA9ICgpID0+IHtcbiAgICB0aGlzLmltYWdlcygpLmZvckVhY2goYmkgPT4gYmkuaW1hZ2VWaXNpYmxlKCFiaS5pbWFnZVZpc2libGUoKSkpO1xuICB9O1xuXG4gIHRoaXMuaW1hZ2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgdGhpcy5vbk5ld0ZpbGVzID0gKGQsIGUpID0+IHtcbiAgICB0aGlzLmltYWdlcyhcbiAgICAgIEFycmF5LmZyb20oZS50YXJnZXQuZmlsZXMpLm1hcChpbWcgPT4gQm9hcmRJbWFnZShpbWcsIHRyYW5zZm9ybUZyb20pKVxuICAgICk7XG4gIH07XG5cbiAgdGhpcy5sYXN0TGFzdENoYW5nZXMgPSBrby5vYnNlcnZhYmxlKFtdKTtcbiAgdGhpcy5sYXN0Q2hhbmdlcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG4gIHRoaXMubGFzdENoYW5nZXMuc3Vic2NyaWJlKHRoaXMubGFzdExhc3RDaGFuZ2VzLCBudWxsLCBcImJlZm9yZUNoYW5nZVwiKTtcblxuICBjb25zdCBnZXRCZXN0R3Vlc3MgPSAoaW1nQmVmb3JlLCBpbWdBZnRlcikgPT4ge1xuICAgIGNvbnN0IGN0eEJlZm9yZSA9IGltZ0JlZm9yZS5jcm9wQ3ZzKCkuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNvbnN0IGN0eEFmdGVyID0gaW1nQWZ0ZXIuY3JvcEN2cygpLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBzcXVhcmVDaGFuZ2VzKGN0eEJlZm9yZSwgY3R4QWZ0ZXIpO1xuICAgIC8vIFNpZGUgZWZmZWN0OiBzdG9yZSBkZWJ1ZyBvdmVybGF5XG4gICAgdGhpcy5sYXN0Q2hhbmdlcyhjaGFuZ2VzLm1hcChjID0+IGMuZGVidWdPdmVybGF5KSk7XG5cbiAgICBjb25zdCBnYW1lU3RhdGVCZWZvcmUgPSBpbWdCZWZvcmUuZ2FtZVN0YXRlKCk7XG4gICAgY29uc3QgYWxsb3dlZE1vdmVzID0gZ2V0QWxsTGVnYWxNb3ZlcyhnYW1lU3RhdGVCZWZvcmUpO1xuXG4gICAgY29uc3QgcG9zc2liaWxpdGllcyA9IGFsbG93ZWRNb3Zlc1xuICAgICAgLm1hcChtb3ZlID0+IHtcbiAgICAgICAgY29uc3QgZnJvbVNxdWFyZUNoYW5nZSA9IGNoYW5nZXNbbW92ZS5mcm9tLmluZGV4XS5kaWZmZXJlbmNlO1xuICAgICAgICBjb25zdCB0b1NxdWFyZUNoYW5nZSA9IGNoYW5nZXNbbW92ZS50by5pbmRleF0uZGlmZmVyZW5jZTtcblxuICAgICAgICAvLyBOb3RlOiAoU2ltb24pIFRoZSBcImZyb21cIiBzcXVhcmUgaXMgYWx3YXlzIGVtcHR5IGFmdGVyIGEgbW92ZVxuICAgICAgICAvLyAgICAgICAgICAgICAgIFRoZXJlZm9yZSwgaXQncyBleHBlY3RlZCB0byBzaG93IGEgbGFyZ2UgZGlmZlxuICAgICAgICAvLyAgICAgICAgICAgICAgIG1ha2luZyBpdCBlYXNpZXIgdG8gcmVjb2duaXNlLlxuXG4gICAgICAgIGNvbnN0IHRvdGFsQ2hhbmdlID0gTWF0aC5yb3VuZCgxLjUgKiBmcm9tU3F1YXJlQ2hhbmdlICsgdG9TcXVhcmVDaGFuZ2UpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbW92ZSxcbiAgICAgICAgICBmcm9tU3F1YXJlQ2hhbmdlLFxuICAgICAgICAgIHRvU3F1YXJlQ2hhbmdlLFxuICAgICAgICAgIHRvdGFsQ2hhbmdlLFxuICAgICAgICAgIGZyb206IG1vdmUuZnJvbS5jb2RlLFxuICAgICAgICAgIHRvOiBtb3ZlLnRvLmNvZGVcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuc29ydCgocDEsIHAyKSA9PiBwMi50b3RhbENoYW5nZSAtIHAxLnRvdGFsQ2hhbmdlKTtcblxuICAgIHJldHVybiBwb3NzaWJpbGl0aWVzO1xuICB9O1xuXG4gIHRoaXMuYW5hbHl6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBwYWlycyA9IHRoaXMuaW1hZ2VzKCkucmVkdWNlKChwYWlycywgaW1nLCBpLCBpbWdzKSA9PiB7XG4gICAgICBpZiAoaW1nc1tpICsgMV0pIHBhaXJzLnB1c2goW2ltZywgaW1nc1tpICsgMV1dKTtcbiAgICAgIHJldHVybiBwYWlycztcbiAgICB9LCBbXSk7XG5cbiAgICB0aGlzLmltYWdlcygpLmZvckVhY2goKGltZywgaSkgPT4ge1xuICAgICAgLy8gTGFzdCBib2FyZFxuICAgICAgaWYgKCFwYWlyc1tpXSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBiZWZvcmUgPSBwYWlyc1tpXVswXTtcbiAgICAgIGNvbnN0IGFmdGVyID0gcGFpcnNbaV1bMV07XG5cbiAgICAgIGNvbnN0IG1vdmVzID0gZ2V0QmVzdEd1ZXNzKGJlZm9yZSwgYWZ0ZXIpO1xuICAgICAgY29uc3QgbW92ZSA9IG1vdmVzWzBdLm1vdmU7XG4gICAgICBhZnRlci5kZWJ1Z092ZXJsYXkodGhpcy5sYXN0Q2hhbmdlcygpKTtcbiAgICAgIGFmdGVyLm1vdmVSYXRpbmcobW92ZXMpO1xuICAgICAgYWZ0ZXIuZ2FtZVN0YXRlKGFwcGx5TW92ZVRvR2FtZVN0YXRlKGJlZm9yZS5nYW1lU3RhdGUoKSwgbW92ZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub3ZlcmxheSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICB0aGlzLnNob3dFZGdlcyA9IGtvLm9ic2VydmFibGUodHJ1ZSk7XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMucGxhY2VBbGwgPSB7XG4gIGluaXQ6IChlbCwgdmEpID0+IHtcbiAgICBrby5jb21wdXRlZCgoKSA9PiB7XG4gICAgICBlbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgY29uc3QgaW5uZXJFbHMgPSBrby51bndyYXAodmEoKSkgfHwgW107XG4gICAgICBpbm5lckVscy5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgICAgIGlmIChlKSB7IC8vIEFsbG93IGZvciBnYXBzXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihlLnN0eWxlLCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgdG9wOiBgJHtNYXRoLmZsb29yKGkgLyA4KSAqIDMyICsgMn1weGAsXG4gICAgICAgICAgICBsZWZ0OiBgJHtpICUgOCAqIDMyICsgMn1weGBcbiAgICAgICAgICB9KVxuICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxua28uYXBwbHlCaW5kaW5ncyhuZXcgQXBwKCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcbmltcG9ydCB7IHJhbmdlIH0gZnJvbSBcIi4vLi4vdXRpbHNcIjtcblxuY29uc3Qgc3VtID0gKHgsIHkpID0+IHggKyB5O1xuXG4vLyBOb3RlOiAoU2ltb24pIElmIHdlIHdhbnQgdG8gdGVzdCB0aGlzLCB3ZSBtaWdodCB3YW50IHRvIHVzZTpcbi8vICAgICAgICAgICAgICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZ2V0LWltYWdlLWRhdGFcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKi9cbmNvbnN0IGdldEltYWdlRGF0YUZvclNxdWFyZSA9IChzcXVhcmUsIHNxdWFyZVNpemUsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZS5yb3cgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge051bWJlcn0gc3F1YXJlU2l6ZVxuICogQHBhcmFtIHtOdW1iZXJ9IGN1dE9mZiBCZXR3ZWVuIDAgYW5kIDFcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBib2FyZEN0eFxuICogQHJldHVybnMge0ltYWdlRGF0YX1cbiAqL1xuY29uc3QgZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlID0gKHNxdWFyZSwgc3F1YXJlU2l6ZSwgY3V0T2ZmLCBib2FyZEN0eCkgPT5cbiAgYm9hcmRDdHguZ2V0SW1hZ2VEYXRhKFxuICAgIHNxdWFyZS5maWxlICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgKiBjdXRPZmYsXG4gICAgc3F1YXJlLnJvdyAqIHNxdWFyZVNpemUgKyBzcXVhcmVTaXplICogY3V0T2ZmLFxuICAgIHNxdWFyZVNpemUgLSAyICogY3V0T2ZmICogc3F1YXJlU2l6ZSxcbiAgICBzcXVhcmVTaXplIC0gMiAqIGN1dE9mZiAqIHNxdWFyZVNpemVcbiAgKTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhYnNvbHV0ZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIGFycmF5cyBieSBzdW1taW5nIGV2ZXJ5IGluZGV4XG4gKiBAcGFyYW0ge1tOdW1iZXJdfSBhcnIxXG4gKiBAcGFyYW0gW051bWJlcl19IGFycjJcbiAqIEByZXR1cm5zIE51bWJlclxuICovXG5jb25zdCB0b3RhbERpZmYgPSAoYXJyMSwgYXJyMikgPT4ge1xuICBjb25zdCBsID0gTWF0aC5tYXgoYXJyMS5sZW5ndGgsIGFycjIubGVuZ3RoKTtcbiAgbGV0IGQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgZCArPSBNYXRoLmFicygoYXJyMVtpXSB8fCAwKSAtIChhcnIyW2ldIHx8IDApKTtcbiAgfVxuXG4gIHJldHVybiBkO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eEJlZm9yZVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGN0eEFmdGVyXG4gKi9cbmNvbnN0IGNlbnRlckFic1BpeGVsRGlmZiA9IChjdHhCZWZvcmUsIGN0eEFmdGVyKSA9PiB7XG4gIC8vIE5vdGU6IChTaW1vbikgVGhlIGJvYXJkIGhhcyB0byBiZSBzcXVhcmVcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGN0eEJlZm9yZS5jYW52YXMud2lkdGggLyA4O1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBTcXVhcmUuYWxsSW5Cb2FyZCgpLm1hcChzcXVhcmUgPT4ge1xuICAgIGNvbnN0IGJlZm9yZSA9IGdldENlbnRlckltYWdlRGF0YUZvclNxdWFyZShcbiAgICAgIHNxdWFyZSxcbiAgICAgIHNxdWFyZVNpemUsXG4gICAgICAwLjI1LFxuICAgICAgY3R4QmVmb3JlXG4gICAgKTtcbiAgICBjb25zdCBhZnRlciA9IGdldENlbnRlckltYWdlRGF0YUZvclNxdWFyZShcbiAgICAgIHNxdWFyZSxcbiAgICAgIHNxdWFyZVNpemUsXG4gICAgICAwLjI1LFxuICAgICAgY3R4QWZ0ZXJcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogdG90YWxEaWZmKGJlZm9yZS5kYXRhLCBhZnRlci5kYXRhKVxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGdyZXkgc2NhbGUgdmFsdWVzICgwIC0gMjU1KSBpZ25vcmluZyB0aGVcbiAqIGFscGhhIGNoYW5uZWxcbiAqIEBwYXJhbSB7W051bWJlcl19IHJnYmFWYWx1ZXNcbiAqIEByZXR1cm5zIHtbTnVtYmVyXX1cbiAqL1xuY29uc3QgcmdiYVRvR3JleVNjYWxlVmFsdWVzID0gcmdiYVZhbHVlcyA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmdiYVZhbHVlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgIHJlc3VsdC5wdXNoKFxuICAgICAgTWF0aC5mbG9vcigocmdiYVZhbHVlc1tpXSArIHJnYmFWYWx1ZXNbaSArIDFdICsgcmdiYVZhbHVlc1tpICsgMl0pIC8gMylcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aHJlc2hvbGRcbiAqIEBwYXJhbSB7TnVtYmVyfSBweFBlclJvd1xuICogQHBhcmFtIHtbTnVtYmVyXX0gZ3JleVNjYWxlRGF0YVxuICogQHBhcmFtIHtOdW1iZXJ9IHB4TnJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmNvbnN0IGVkZ2VWYWx1ZSA9ICh0aHJlc2hvbGQsIHB4UGVyUm93LCBncmV5U2NhbGVEYXRhLCBweE5yKSA9PiB7XG4gIGNvbnN0IHJvd1NpemUgPSBweFBlclJvdztcbiAgbGV0IHJlc3VsdCA9IDA7XG5cbiAgY29uc3QgdG9wID0gZ3JleVNjYWxlRGF0YVtweE5yIC0gcm93U2l6ZV07XG4gIGNvbnN0IGJvdHRvbSA9IGdyZXlTY2FsZURhdGFbcHhOciArIHJvd1NpemVdO1xuICBjb25zdCBsZWZ0ID0gZ3JleVNjYWxlRGF0YVtweE5yIC0gMV07XG4gIGNvbnN0IHJpZ2h0ID0gZ3JleVNjYWxlRGF0YVtweE5yICsgMV07XG5cbiAgLy8gUGl4ZWxzIG9uIGVkZ2Ugb2YgY2FudmFzXG4gIGlmIChcbiAgICB0b3AgPT09IHVuZGVmaW5lZCB8fFxuICAgIGJvdHRvbSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgbGVmdCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgcmlnaHQgPT09IHVuZGVmaW5lZFxuICApXG4gICAgcmV0dXJuIDA7XG5cbiAgY29uc3QgdiA9IGdyZXlTY2FsZURhdGFbcHhOcl07XG4gIGlmIChNYXRoLmFicyh2IC0gdG9wKSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gYm90dG9tKSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gbGVmdCkgPiB0aHJlc2hvbGQpIHJlc3VsdCArPSAxO1xuICBpZiAoTWF0aC5hYnModiAtIHJpZ2h0KSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmNvbnN0IHN1bURpZmYgPSAoYXJyMSwgYXJyMikgPT4gTWF0aC5hYnMoYXJyMS5yZWR1Y2Uoc3VtKSAtIGFycjIucmVkdWNlKHN1bSkpO1xuXG5jb25zdCBlZGdlUGl4ZWxDb3VudERpZmYgPSAoY3R4QmVmb3JlLCBjdHhBZnRlcikgPT4ge1xuICAvLyBOb3RlOiAoU2ltb24pIFRoZSBib2FyZCBoYXMgdG8gYmUgc3F1YXJlXG4gIGNvbnN0IHNxdWFyZVNpemUgPSBjdHhCZWZvcmUuY2FudmFzLndpZHRoIC8gODtcbiAgY29uc3QgUEFERElORyA9IDAuMDYyNTsgLy8gSGFzIHRvIHJlc3VsdCBpbiByb3VuZCBuciFcbiAgY29uc3QgaW5uZXJTcXVhcmVTaXplID0gc3F1YXJlU2l6ZSAtIDIgKiBQQURESU5HICogc3F1YXJlU2l6ZTtcbiAgY29uc3QgVEhSRVNIT0xEID0gMTU7XG5cbiAgY29uc3QgY2hhbmdlcyA9IFNxdWFyZS5hbGxJbkJvYXJkKCkubWFwKHNxdWFyZSA9PiB7XG4gICAgY29uc3QgYmVmb3JlID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIFBBRERJTkcsXG4gICAgICBjdHhCZWZvcmVcbiAgICApO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIFBBRERJTkcsXG4gICAgICBjdHhBZnRlclxuICAgICk7XG5cbiAgICBjb25zdCBnc0JlZm9yZSA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhiZWZvcmUuZGF0YSk7XG4gICAgY29uc3QgZ3NBZnRlciA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhhZnRlci5kYXRhKTtcblxuICAgIGNvbnN0IGVkZ2VzQmVmb3JlID0gZ3NCZWZvcmUubWFwKCh2LCBpLCBhbGwpID0+XG4gICAgICBlZGdlVmFsdWUoVEhSRVNIT0xELCBpbm5lclNxdWFyZVNpemUsIGFsbCwgaSlcbiAgICApO1xuXG4gICAgY29uc3QgZWRnZXNBZnRlciA9IGdzQWZ0ZXIubWFwKCh2LCBpLCBhbGwpID0+XG4gICAgICBlZGdlVmFsdWUoVEhSRVNIT0xELCBpbm5lclNxdWFyZVNpemUsIGFsbCwgaSlcbiAgICApO1xuXG4gICAgY29uc3QgZGVidWdPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBkZWJ1Z092ZXJsYXkud2lkdGggPSBkZWJ1Z092ZXJsYXkuaGVpZ2h0ID0gaW5uZXJTcXVhcmVTaXplO1xuXG4gICAgY29uc3Qgb3ZlcmxheUltYWdlZGF0YSA9IG5ldyBJbWFnZURhdGEoXG4gICAgICBuZXcgVWludDhDbGFtcGVkQXJyYXkoYmVmb3JlLndpZHRoICogYmVmb3JlLmhlaWdodCAqIDQpLFxuICAgICAgYmVmb3JlLndpZHRoLFxuICAgICAgYmVmb3JlLmhlaWdodFxuICAgICk7XG4gICAgXG4gICAgZWRnZXNCZWZvcmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgaWYgKHYgPT09IDApIHJldHVybjtcbiAgICAgIGkgKj0gNDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMF0gPSAyNTU7XG4gICAgICBvdmVybGF5SW1hZ2VkYXRhLmRhdGFbaSArIDFdID0gMDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMl0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IDI1NTtcbiAgICB9KTtcblxuICAgIGVkZ2VzQWZ0ZXIuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgaWYgKHYgPT09IDApIHJldHVybjtcbiAgICAgIGkgKj0gNDtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMF0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAxXSA9IDI1NTtcbiAgICAgIG92ZXJsYXlJbWFnZWRhdGEuZGF0YVtpICsgMl0gPSAwO1xuICAgICAgb3ZlcmxheUltYWdlZGF0YS5kYXRhW2kgKyAzXSA9IDI1NTtcbiAgICB9KTtcblxuICAgIGRlYnVnT3ZlcmxheS5nZXRDb250ZXh0KFwiMmRcIikucHV0SW1hZ2VEYXRhKG92ZXJsYXlJbWFnZWRhdGEsIDAsIDApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNxdWFyZSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICAgZGlmZmVyZW5jZTogc3VtRGlmZihlZGdlc0JlZm9yZSwgZWRnZXNBZnRlciksXG4gICAgICBkZWJ1Z092ZXJsYXlcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcztcbn07XG5cbi8vZXhwb3J0IGNvbnN0IHNxdWFyZUNoYW5nZXMgPSBjZW50ZXJBYnNQaXhlbERpZmY7XG5leHBvcnQgY29uc3Qgc3F1YXJlQ2hhbmdlcyA9IGVkZ2VQaXhlbENvdW50RGlmZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAcGFyYW0ge0RhdGFVUkx9IGRhdGFVUkxcbiAqIEBwYXJhbSB7a28ub2JzZXJ2YWJsZX0gd3JpdGVUb1xuICogQHJldHVybnMge2tvLm9ic2VydmFibGV9XG4gKi9cbmV4cG9ydCBjb25zdCBjcm9wID0gKGRhdGFVUkwsIHdyaXRlVG8pID0+IHtcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gIGNvbnN0IGN2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGN2cy53aWR0aCA9IDI1NjtcbiAgY3ZzLmhlaWdodCA9IDI1NjtcbiAgY29uc3QgY3R4ID0gY3ZzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICB3cml0ZVRvKGN2cyk7XG4gIH07XG4gIGltZy5zcmMgPSBkYXRhVVJMO1xuXG4gIHJldHVybiB3cml0ZVRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvY3JvcC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgcG9pbnRSZWR1Y2VyID0gKGFjYywgeyB4LCB5IH0pID0+IGFjYy5jb25jYXQoeCwgeSk7XG5cbi8qKlxuICogQHBhcmFtIHtbe3gsIHl9XX0gcmVmUG9pbnRzXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWdcbiAqIEByZXR1cm5zIHtEYXRhVVJMfVxuICovXG5leHBvcnQgY29uc3QgcGVyc3BlY3RpdmVUcmFuc2Zvcm0gPSAocmVmUG9pbnRzLCBpbWcpID0+IHtcbiAgY29uc3QgY3ZzID0gZnguY2FudmFzKCk7XG5cbiAgY29uc3QgZnJvbSA9IHJlZlBvaW50cy5yZWR1Y2UocG9pbnRSZWR1Y2VyLCBbXSk7XG4gIGNvbnN0IHRvID0gWzAsIDI1NiwgMCwgMCwgMjU2LCAwLCAyNTYsIDI1Nl07XG5cbiAgcmV0dXJuIGN2c1xuICAgIC5kcmF3KGN2cy50ZXh0dXJlKGltZykpXG4gICAgLnBlcnNwZWN0aXZlKGZyb20sIHRvKVxuICAgIC51cGRhdGUoKVxuICAgIC50b0RhdGFVUkwoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5pbXBvcnQgeyBNb3ZlIH0gZnJvbSBcIi4vLi4vTW92ZXNcIjtcblxuaW1wb3J0IHsgcGllY2VJc0JsYWNrLCBwaWVjZUlzV2hpdGUsIHBpZWNlSXNFbXB0eSB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgcG9zc2libGUgbW92ZXMgZm9yIGEgc3F1YXJlIHRoYXQgaG9sZHMgYSBwYXduXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFBhd25Nb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gc3RhdGUuYm9hcmQ7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgc3F1YXJlKTtcbiAgY29uc3QgaXNCbGFjayA9IHBpZWNlSXNCbGFjayhwaWVjZSk7XG5cbiAgY29uc3QgY2FuVGFrZSA9ICh7IHNxdWFyZSwgcGllY2UgfSkgPT5cbiAgICAvLyBUaGVyZSdzIHBpZWNlIGluZm9cbiAgICBwaWVjZSAmJlxuICAgIC8vIFRoZSBzcXVhcmUgaXMgb24gdGhlIGJvYXJkXG4gICAgc3F1YXJlLmluQm91bmRzICYmXG4gICAgLy8gVGhlcmUncyBhIHBpZWNlIG9mIHRoZSBvcHBvc2l0ZSBjb2xvciBPUlxuICAgIC8vIGl0J3MgdGhlIHN0YXRlJ3MgZW4gcGFzc2FudCBzcXVhcmVcbiAgICAoKGlzQmxhY2sgPyBwaWVjZUlzV2hpdGUocGllY2UpIDogcGllY2VJc0JsYWNrKHBpZWNlKSkgfHxcbiAgICAgIHN0YXRlLmVuUGFzc2FudCA9PT0gc3F1YXJlLmNvZGUpO1xuXG4gIGNvbnN0IGNhbk1vdmUgPSAoeyBzcXVhcmUsIHBpZWNlIH0pID0+IHNxdWFyZS5pbkJvdW5kcyAmJiBwaWVjZUlzRW1wdHkocGllY2UpO1xuXG4gIGNvbnN0IGlzU3RhcnRQb3MgPSBpc0JsYWNrID8gc3F1YXJlLnJvdyA9PT0gMSA6IHNxdWFyZS5yb3cgPT09IDY7XG5cbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICBpc0JsYWNrID8gWzEsIDBdIDogWy0xLCAwXSwgLy8gRmlyc3Qgc3RlcFxuICAgIGlzQmxhY2sgPyBbMiwgMF0gOiBbLTIsIDBdLCAvLyBTZWNvbmQgc3RlcFxuICAgIGlzQmxhY2sgPyBbMSwgLTFdIDogWy0xLCAtMV0sIC8vIFRha2VzIGxlZnRcbiAgICBpc0JsYWNrID8gWzEsIDFdIDogWy0xLCAxXSAvLyBUYWtlcyByaWdodFxuICBdO1xuXG4gIGNvbnN0IHBpZWNlc0F0VmFsaWRTcXVhcmVzID0gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLm1hcChzID0+ICh7XG4gICAgICBwaWVjZTogcy5pbkJvdW5kcyA/IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHMpIDogbnVsbCxcbiAgICAgIHNxdWFyZTogc1xuICAgIH0pKTtcblxuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBbZmlyc3RTdGVwLCBzZWNvbmRTdGVwLCB0YWtlc0xlZnQsIHRha2VzUmlnaHRdID0gcGllY2VzQXRWYWxpZFNxdWFyZXM7XG5cbiAgaWYgKGNhbk1vdmUoZmlyc3RTdGVwKSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIGZpcnN0U3RlcC5zcXVhcmUsIHN0YXRlKSk7XG5cbiAgICBpZiAoaXNTdGFydFBvcyAmJiBjYW5Nb3ZlKHNlY29uZFN0ZXApKSB7XG4gICAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBzZWNvbmRTdGVwLnNxdWFyZSwgc3RhdGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2FuVGFrZSh0YWtlc0xlZnQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNMZWZ0LnNxdWFyZSwgc3RhdGUpKTtcbiAgfVxuXG4gIGlmIChjYW5UYWtlKHRha2VzUmlnaHQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNSaWdodC5zcXVhcmUsIHN0YXRlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvcGF3bi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0geyp9IHN0YXRlIFxuICogQHBhcmFtIHsqfSBzcXVhcmUgXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLbmlnaHRNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXRTcXVhcmVNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDJdLFxuICAgIFsxLCAtMl0sXG4gICAgWy0xLCAyXSxcbiAgICBbLTEsIC0yXSxcbiAgICBbMiwgLTFdLFxuICAgIFsyLCAxXSxcbiAgICBbLTIsIC0xXSxcbiAgICBbLTIsIDFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tuaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEtpbmdNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIC8vIFRPRE86IChTaW1vbikgQ2FzdGxpbmdcbiAgcmV0dXJuIGdldFNxdWFyZU1vdmVzKHN0YXRlLCBzcXVhcmUsIFtcbiAgICBbMSwgMF0sXG4gICAgWzEsIDFdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsIDFdLFxuICAgIFstMSwgMF0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbMSwgLTFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuaW1wb3J0IHsgZ2V0QmlzaG9wTW92ZXMgfSBmcm9tIFwiLi9iaXNob3BcIjtcbmltcG9ydCB7IGdldFJvb2tNb3ZlcyB9IGZyb20gXCIuL3Jvb2tcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVlbk1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIGdldEJpc2hvcE1vdmVzKHN0YXRlLCBzcXVhcmUpLmNvbmNhdChnZXRSb29rTW92ZXMoc3RhdGUsIHNxdWFyZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3F1ZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9