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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__moves_bishop__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__moves_queen__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__moves_rook__ = __webpack_require__(10);














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

    const debugCvs = document.createElement("canvas");
    debugCvs.width = debugCvs.height = innerSquareSize;

    const imageDataCopy = new ImageData(
      new Uint8ClampedArray(before.data),
      before.width,
      before.height
    );

    edgesBefore.forEach((v, i) => {
      if (v === 0) return;
      i *= 4;
      imageDataCopy.data[i + 0] = 255;
      imageDataCopy.data[i + 1] = 0;
      imageDataCopy.data[i + 2] = 0;
    });

    edgesAfter.forEach((v, i) => {
      if (v === 0) return;
      i *= 4;
      imageDataCopy.data[i + 0] = 0;
      imageDataCopy.data[i + 1] = 255;
      imageDataCopy.data[i + 2] = 0;
    });

    debugCvs.getContext("2d").putImageData(imageDataCopy, 0, 0);

    return {
      square,
      before,
      after,
      difference: sumDiff(edgesBefore, edgesAfter),
      debugCvs
    };
  });

  return changes;
};

//export const squareChanges = centerAbsPixelDiff;
const squareChanges = edgePixelCountDiff;
/* harmony export (immutable) */ __webpack_exports__["a"] = squareChanges;



/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageHandling_squareChanges__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imageHandling_crop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageHandling_perspectiveTransform__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FEN__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Moves__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GameState__ = __webpack_require__(5);








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
    }
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
    this.lastChanges(changes.map(c => c.debugCvs));

    const gameStateBefore = imgBefore.gameState();
    const allowedMoves = Object(__WEBPACK_IMPORTED_MODULE_4__Moves__["b" /* getAllLegalMoves */])(gameStateBefore);

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
      after.moveRating(moves);
      after.gameState(Object(__WEBPACK_IMPORTED_MODULE_5__GameState__["a" /* applyMoveToGameState */])(before.gameState(), move));
    });
  };

  this.overlay = ko.observable(false);
};

ko.bindingHandlers.placeAll = {
  init: (el, va) => {
    ko.computed(() => {
      el.innerHTML = "";
      const innerEls = ko.unwrap(va());
      innerEls.forEach((e, i) => {
        if (i % 8 === 0) el.appendChild(document.createElement("br"));
        el.appendChild(e);
      });
    });
  }
};

ko.applyBindings(new App());


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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GameState__ = __webpack_require__(5);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(8);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squareBased__ = __webpack_require__(8);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bishop__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rook__ = __webpack_require__(10);



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzM0ODhiMDA0NWY2N2Y1OGFmYjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9waWVjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvZGlyZWN0aW9uQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvc3F1YXJlQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2Jpc2hvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvcm9vay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9GRU4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3Bhd24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2tuaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMva2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvcXVlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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Ozs7O0FDaEV5QjtBQUN6QjtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDaEJ5QjtBQUN6QjtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLE9BQU87QUFDbEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOzs7Ozs7Ozs7OztBQ2xCOEI7QUFDTDtBQUNGO0FBQ3ZCO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBIiwiZmlsZSI6Ii4vbGliL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MzQ4OGIwMDQ1ZjY3ZjU4YWZiOCIsImltcG9ydCB7IHJhbmdlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3Qgcm93T3JkZXIgPSBcIjg3NjU0MzIxXCI7XG5jb25zdCBmaWxlT3JkZXIgPSBcImFiY2RlZmdoXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNxdWFyZSBpbiBhIGNoZXNzIGJvYXJkIHdpdGhvdXQgaXRzIGNvbnRlbnRzXG4gKlxuICogQHR5cGVkZWYge09iamVjdH0gU3F1YXJlXG4gKiBAcHJvcGVydHkge251bWJlcn0gcm93XG4gKiBAcHJvcGVydHkge251bWJlcn0gZmlsZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNvZGUgLSBOYW1lIG9mIHRoZSBzcXVhcmVcbiAqIEBwcm9wZXJ0eSB7W251bWJlcl19IGNvb3JkIC0gcm93IGFuZCBmaWxlIG5ycyBpbiBhcnJheVxuICogQHByb3BlcnR5IHtib29sZWFufSBpbkJvdW5kcyAtIGlzIHRoaXMgYSBsZWdhbCBzcXVhcmVcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIHNxdWFyZSBieSByb3cgYW5kIGZpbGUgbnIuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHJvd05yXG4gKiBAcGFyYW0ge251bWJlcn0gZmlsZU5yXG4gKiBAcmV0dXJucyB7U3F1YXJlfVxuICovXG5jb25zdCBTcXVhcmUgPSAocm93TnIsIGZpbGVOcikgPT4gKHtcbiAgcm93OiByb3dOcixcbiAgZmlsZTogZmlsZU5yLFxuICBpbmRleDogcm93TnIgKiA4ICsgZmlsZU5yLFxuICBjb2RlOiBgJHtmaWxlT3JkZXJbZmlsZU5yXX0ke3Jvd09yZGVyW3Jvd05yXX1gLFxuICBjb29yZDogW3Jvd05yLCBmaWxlTnJdLFxuICBpbkJvdW5kczogcm93TnIgPj0gMCAmJiByb3dOciA8PSA3ICYmIGZpbGVOciA+PSAwICYmIGZpbGVOciA8PSA3XG59KTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIHNxdWFyZSBmb3IgYSBzcXVhcmUgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGVcbiAqIEByZXR1cm5zIHtTcXVhcmV9XG4gKi9cblNxdWFyZS5mcm9tQ29kZSA9IGNvZGUgPT5cbiAgU3F1YXJlKHJvd09yZGVyLmluZGV4T2YoY29kZVsxXSksIGZpbGVPcmRlci5pbmRleE9mKGNvZGVbMF0pKTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIHNxdWFyZSBmb3IgYSBjb29yZGluYXRlIGFycmF5XG4gKiBAcGFyYW0ge1tudW1iZXJdfSBjb29yZHMgLSBbcm93TnIsIGZpbGVOcl1cbiAqL1xuU3F1YXJlLmZyb21Db29yZCA9IChbcm93TnIsIGZpbGVOcl0pID0+IFNxdWFyZShyb3dOciwgZmlsZU5yKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHNxdWFyZSBiYXNlZCBvbiBhbiBvbGQgc3F1YXJlIGFuZCBhIGRlbHRhXG4gKlxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSAtIFRoZSByZWZlcmVuY2Ugc3F1YXJlXG4gKiBAcGFyYW0ge1tudW1iZXJdfSBkZWx0YSAtIFRoZSBkUm93IGFuZCBkRmlsZSB0byB0cmFuc2xhdGVcbiAqIEByZXR1cm5zIHtTcXVhcmV9XG4gKi9cblNxdWFyZS5yZWxhdGl2ZUZyb20gPSAoeyByb3csIGZpbGUgfSwgW2RSb3csIGRGaWxlXSkgPT5cbiAgU3F1YXJlKHJvdyArIGRSb3csIGZpbGUgKyBkRmlsZSk7XG5cbi8qKlxuICogUmV0dXJucyBhIHNxdWFyZSBmb3IgYW4gaW5kZXggc3RhcnRpbmcgbGVmdCB0byByaWdodCwgdG9wIHRvIGJvdHRvbVxuICogQHBhcmFtIHtOdW1iZXJ9IGlcbiAqIEByZXR1cm5zIHtTcXVhcmV9XG4gKi9cblNxdWFyZS5mcm9tSW5kZXggPSBpID0+IFNxdWFyZShNYXRoLmZsb29yKGkgLyA4KSwgaSAlIDgpO1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYWxsIHRoZSBzcXVhcmVzIGluIGEgY2hlc3MgYm9hcmRcbiAqIEByZXR1cm5zIHtbU3F1YXJlXX1cbiAqL1xuU3F1YXJlLmFsbEluQm9hcmQgPSAoKSA9PlxuICByYW5nZSg2NClcbiAgICAubWFwKGkgPT4gW01hdGguZmxvb3IoaSAvIDgpLCBpICUgOF0pXG4gICAgLm1hcChTcXVhcmUuZnJvbUNvb3JkKTtcblxuZXhwb3J0IGRlZmF1bHQgU3F1YXJlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvU3F1YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUmV0dXJucyBhIGJvYXJkIHRoYXQgaG9sZHMgYSBkZWZhdWx0IHN0YXJ0IHBvc2l0aW9uXG4gKiBAcmV0dXJucyB7W1tzdHJpbmddXX1cbiAqL1xuZXhwb3J0IGNvbnN0IFN0YXJ0UG9zaXRpb24gPSAoKSA9PiBbXG4gIFtcInJcIiwgXCJuXCIsIFwiYlwiLCBcInFcIiwgXCJrXCIsIFwiYlwiLCBcIm5cIiwgXCJyXCJdLFxuICBbXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCJdLFxuICBbXCJSXCIsIFwiTlwiLCBcIkJcIiwgXCJRXCIsIFwiS1wiLCBcIkJcIiwgXCJOXCIsIFwiUlwiXVxuXTtcblxuY29uc3QgY2xvbmUgPSBib2FyZCA9PiBib2FyZC5zbGljZSgwKS5tYXAocm93ID0+IHJvdy5zbGljZSgwKSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcGllY2UgKFwiIFwiIGlmIGVtcHR5KSBhdCBhIHBvc2l0aW9uIGluIGEgYm9hcmRcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFBpZWNlQXRTcXVhcmUgPSAoYm9hcmQsIHNxdWFyZSkgPT5cbiAgYm9hcmRbc3F1YXJlLnJvd11bc3F1YXJlLmZpbGVdO1xuXG4vKipcbiAqIFNldHMgdGhlIHNxdWFyZSBpbiBhIGJvYXJkIHRvIGEgKHBpZWNlL2VtcHR5KSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSBcbiAqL1xuY29uc3Qgc2V0U3F1YXJlU3RyaW5nID0gKGJvYXJkLCBzcXVhcmUsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IG5ld0JvYXJkID0gY2xvbmUoYm9hcmQpO1xuICBuZXdCb2FyZFtzcXVhcmUucm93XVtzcXVhcmUuZmlsZV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG5ld0JvYXJkO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHBpZWNlIGluIHdoaWNoIHRoZSBmcm9tU3F1YXJlIGlzIGVtcHR5LCBhbmRcbiAqIHRoZSB0b1NxdWFyZSBoYXMgdGhlIG1vdmVkIHBpZWNlLiBOb3RlOiB0aGlzIGZ1bmN0aW9uIGRvZXNcbiAqIG5vdCBwZXJmb3JtIGFueSB2YWxpZGl0eSBjaGVja3NcbiAqIFxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCBcbiAqIEBwYXJhbSB7U3F1YXJlfSBmcm9tU3F1YXJlIFxuICogQHBhcmFtIHtTcXVhcmV9IHRvU3F1YXJlIFxuICogQHJldHVybnMge1tbc3RyaW5nXV19XG4gKi9cbmV4cG9ydCBjb25zdCBtb3ZlUGllY2VJbkJvYXJkID0gKGJvYXJkLCBmcm9tU3F1YXJlLCB0b1NxdWFyZSkgPT5cbiAgc2V0U3F1YXJlU3RyaW5nKFxuICAgIHNldFNxdWFyZVN0cmluZyhib2FyZCwgZnJvbVNxdWFyZSwgXCIgXCIpLCAvLyBCb2FyZCB3aXRob3V0IGZyb21TcXVhcmVcbiAgICB0b1NxdWFyZSxcbiAgICBnZXRQaWVjZUF0U3F1YXJlKGJvYXJkLCBmcm9tU3F1YXJlKSAvLyBHZXQgdmFsdWUgZnJvbSBvbGQgc3F1YXJlXG4gICk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Cb2FyZC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgR2FtZVN0YXRlLCB7XG4gIGFwcGx5TW92ZVRvR2FtZVN0YXRlLFxuICB3aGl0ZUluQ2hlY2ssXG4gIGJsYWNrSW5DaGVjayxcbiAgYmxhY2tQaWVjZUF0dGFja3NTcXVhcmUsXG4gIHdoaXRlUGllY2VBdHRhY2tzU3F1YXJlXG59IGZyb20gXCIuL0dhbWVTdGF0ZVwiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9TcXVhcmVcIjtcblxuaW1wb3J0IHsgZ2V0UGF3bk1vdmVzIH0gZnJvbSBcIi4vbW92ZXMvcGF3blwiO1xuaW1wb3J0IHsgZ2V0S25pZ2h0TW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9rbmlnaHRcIjtcbmltcG9ydCB7IGdldEtpbmdNb3ZlcyB9IGZyb20gXCIuL21vdmVzL2tpbmdcIjtcblxuaW1wb3J0IHtcbiAgcGllY2VJc0JsYWNrLFxuICBwaWVjZUlzV2hpdGUsXG4gIHBpZWNlSXNFbXB0eSxcbiAgcGllY2VzQXJlU2FtZUNvbG9yLFxuICBwaWVjZUNhblRha2VQaWVjZVxufSBmcm9tIFwiLi9waWVjZVwiO1xuXG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vQm9hcmRcIjtcbmltcG9ydCB7IGdldEJpc2hvcE1vdmVzIH0gZnJvbSBcIi4vbW92ZXMvYmlzaG9wXCI7XG5pbXBvcnQgeyBnZXRRdWVlbk1vdmVzIH0gZnJvbSBcIi4vbW92ZXMvcXVlZW5cIjtcbmltcG9ydCB7IGdldFJvb2tNb3ZlcyB9IGZyb20gXCIuL21vdmVzL3Jvb2tcIjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBwb3NzaWJsZSBtb3ZlcyBmb3IgYSBwaWVjZSBvbiBhIHNxdWFyZVxuICogaW4gYSBnYW1lXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuY29uc3QgZ2V0TW92ZXNGb3JQaWVjZSA9IChzdGF0ZSwgc3F1YXJlLCBwaWVjZSkgPT4ge1xuICBzd2l0Y2ggKHBpZWNlKSB7XG4gICAgY2FzZSBcInBcIjpcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgcmV0dXJuIGdldFBhd25Nb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwiblwiOlxuICAgIGNhc2UgXCJOXCI6XG4gICAgICByZXR1cm4gZ2V0S25pZ2h0TW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcImtcIjpcbiAgICBjYXNlIFwiS1wiOlxuICAgICAgcmV0dXJuIGdldEtpbmdNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwiYlwiOlxuICAgIGNhc2UgXCJCXCI6XG4gICAgICByZXR1cm4gZ2V0QmlzaG9wTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcInFcIjpcbiAgICBjYXNlIFwiUVwiOlxuICAgICAgcmV0dXJuIGdldFF1ZWVuTW92ZXMoc3RhdGUsIHNxdWFyZSk7XG4gICAgY2FzZSBcInJcIjpcbiAgICBjYXNlIFwiUlwiOlxuICAgICAgcmV0dXJuIGdldFJvb2tNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG4vKipcbiAqIE1vdmVcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNb3ZlXG4gKiBAcHJvcGVydHkge1NxdWFyZX0gZnJvbVxuICogQHByb3BlcnR5IHtTcXVhcmV9IHRvXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHRha2VzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHBhd25Nb3ZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHRha2VzS2luZ1xuICogQHByb3BlcnR5IHtib29sZWFufSBjYXN0bGVzXG4gKlxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG1vdmUgdG8gaGVscCBjcmVhdGUgYSBQR04gc3RlcFxuICogQHBhcmFtIHtTcXVhcmV9IGZyb21cbiAqIEBwYXJhbSB7U3F1YXJlfSB0b1xuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7TW92ZX1cbiAqL1xuZXhwb3J0IGNvbnN0IE1vdmUgPSAoZnJvbSwgdG8sIHN0YXRlKSA9PiAoe1xuICBmcm9tLFxuICB0byxcbiAgdGFrZXM6IHBpZWNlQ2FuVGFrZVBpZWNlKFxuICAgIGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIGZyb20pLFxuICAgIGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHRvKVxuICApLFxuICB0YWtlc0tpbmc6IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHRvKS50b0xvd2VyQ2FzZSgpID09PSBcImtcIixcbiAgcGF3bk1vdmU6IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIGZyb20pLnRvTG93ZXJDYXNlKCkgPT09IFwicFwiLFxuICBjYXN0bGVzOlxuICAgIGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIGZyb20pLnRvTG93ZXJDYXNlKCkgPT09IFwia1wiICYmXG4gICAgTWF0aC5hYnMoZnJvbS5maWxlIC0gdG8uZmlsZSkgPT09IDJcbn0pO1xuXG4vKipcbiAqIFJldHVybnMgYSBzZXJpZXMgb2YgbW92ZXMgYSBwaWVjZSBjYW4gbWFrZSBvbiBhIGJvYXJkLlxuICogV2lsbCBub3QgaW5jbHVkZSBjYXN0bGVzIG9yIGVuIHBhc3NhbnQsIHRob3NlIGFyZSBoYW5kbGVkXG4gKiBzZXBlcmF0ZWx5XG4gKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0TW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBib2FyZCA9IHN0YXRlLmJvYXJkO1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHNxdWFyZSk7XG5cbiAgaWYgKHBpZWNlID09PSBcIiBcIikgcmV0dXJuIFtdO1xuXG4gIC8vIEdldCBhbGwgbW92ZXMgZm9yIHRoZSBwaWVjZSB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IGlsbGVnYWwgbW92ZXNcbiAgcmV0dXJuIGdldE1vdmVzRm9yUGllY2Uoc3RhdGUsIHNxdWFyZSwgcGllY2UpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7W3N0cmluZ119IGVtcHR5U3F1YXJlQ29kZXNcbiAqIEBwYXJhbSB7W3N0cmluZ119IHNhZmVTcXVhcmVDb2Rlc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGNhc3RsaW5nUHJldmVudGVkID0gKHN0YXRlLCBlbXB0eVNxdWFyZUNvZGVzLCBzYWZlU3F1YXJlQ29kZXMpID0+IHtcbiAgY29uc3QgY2xlYXJQYXRoID0gZW1wdHlTcXVhcmVDb2Rlc1xuICAgIC5tYXAoU3F1YXJlLmZyb21Db2RlKVxuICAgIC5tYXAoc3EgPT4gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKVxuICAgIC5ldmVyeShwaWVjZUlzRW1wdHkpO1xuXG4gIGlmICghY2xlYXJQYXRoKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBhdHRhY2tDZWNrID0gc3RhdGUud2hpdGVUb01vdmVcbiAgICA/IGJsYWNrUGllY2VBdHRhY2tzU3F1YXJlXG4gICAgOiB3aGl0ZVBpZWNlQXR0YWNrc1NxdWFyZTtcblxuICBjb25zdCB1bmRlckF0dGFjayA9IHNhZmVTcXVhcmVDb2Rlc1xuICAgIC5tYXAoU3F1YXJlLmZyb21Db2RlKVxuICAgIC5zb21lKHNxID0+IGF0dGFja0NlY2soc3RhdGUsIHNxKSk7XG5cbiAgcmV0dXJuIHVuZGVyQXR0YWNrO1xufTtcblxuY29uc3QgY2FzdGxlTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxdWFyZSk7XG4gIGNvbnN0IG1vdmVzID0gW107XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgSzoge1xuICAgICAgbG9uZzoge1xuICAgICAgICBwYXRoOiBbXCJiMVwiLCBcImMxXCIsIFwiZDFcIl0sXG4gICAgICAgIHNhZmU6IFtcImExXCIsIFwiYzFcIiwgXCJkMVwiLCBcImUxXCJdXG4gICAgICB9LFxuICAgICAgc2hvcnQ6IHtcbiAgICAgICAgcGF0aDogW1wiZjFcIiwgXCJnMVwiXSxcbiAgICAgICAgc2FmZTogW1wiZjFcIiwgXCJnMVwiLCBcImgxXCIsIFwiZTFcIl1cbiAgICAgIH1cbiAgICB9LFxuICAgIGs6IHtcbiAgICAgIGxvbmc6IHtcbiAgICAgICAgcGF0aDogW1wiYjhcIiwgXCJjOFwiLCBcImQ4XCJdLFxuICAgICAgICBzYWZlOiBbXCJhOFwiLCBcImM4XCIsIFwiZDhcIiwgXCJlOFwiXVxuICAgICAgfSxcbiAgICAgIHNob3J0OiB7XG4gICAgICAgIHBhdGg6IFtcImY4XCIsIFwiZzhcIl0sXG4gICAgICAgIHNhZmU6IFtcImY4XCIsIFwiZzhcIiwgXCJoOFwiLCBcImU4XCJdXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNhbkNhc3RsZUxvbmcgPSBwaWVjZUlzQmxhY2socGllY2UpXG4gICAgPyBzdGF0ZS5ibGFja0NhbkNhc3RsZUxvbmdcbiAgICA6IHN0YXRlLndoaXRlQ2FuQ2FzdGxlTG9uZztcblxuICBjb25zdCBjYW5DYXN0bGVTaG9ydCA9IHBpZWNlSXNCbGFjayhwaWVjZSlcbiAgICA/IHN0YXRlLmJsYWNrQ2FuQ2FzdGxlU2hvcnRcbiAgICA6IHN0YXRlLndoaXRlQ2FuQ2FzdGxlU2hvcnQ7XG5cbiAgY29uc3QgbG9uZ0Nhc3RsZU9wdHMgPSBvcHRzW3BpZWNlXS5sb25nO1xuICBjb25zdCBzaG9ydENhc3RsZU9wdHMgPSBvcHRzW3BpZWNlXS5zaG9ydDtcblxuICBpZiAoXG4gICAgY2FuQ2FzdGxlTG9uZyAmJlxuICAgICFjYXN0bGluZ1ByZXZlbnRlZChzdGF0ZSwgbG9uZ0Nhc3RsZU9wdHMucGF0aCwgbG9uZ0Nhc3RsZU9wdHMuc2FmZSlcbiAgKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIFswLCAtMl0pLCBzdGF0ZSkpO1xuICB9XG5cbiAgaWYgKFxuICAgIGNhbkNhc3RsZVNob3J0ICYmXG4gICAgIWNhc3RsaW5nUHJldmVudGVkKHN0YXRlLCBzaG9ydENhc3RsZU9wdHMucGF0aCwgc2hvcnRDYXN0bGVPcHRzLnNhZmUpXG4gICkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBbMCwgMl0pLCBzdGF0ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzO1xufTtcblxuLyoqXG4gKiBHZXRzIGEgbGlzdCBvZiBsZWdhbCBtb3ZlcyBmb3IgdGhlIHBpZWNlIG9uIGEgc3F1YXJlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRMZWdhbE1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuXG4gIGlmIChwaWVjZUlzQmxhY2socGllY2UpICYmICFzdGF0ZS5ibGFja1RvTW92ZSkgcmV0dXJuIFtdO1xuICBpZiAocGllY2VJc1doaXRlKHBpZWNlKSAmJiAhc3RhdGUud2hpdGVUb01vdmUpIHJldHVybiBbXTtcblxuICBsZXQgbW92ZXMgPSBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcblxuICBpZiAocGllY2UgPT09IFwiS1wiIHx8IHBpZWNlID09PSBcImtcIikge1xuICAgIG1vdmVzID0gbW92ZXMuY29uY2F0KGNhc3RsZU1vdmVzKHN0YXRlLCBzcXVhcmUpKTtcbiAgfVxuXG4gIHJldHVybiBtb3Zlcy5maWx0ZXIobW92ZSA9PiAhbW92ZVB1dHNPd25LaW5nSW5DaGVjayhzdGF0ZSwgbW92ZSkpO1xufTtcblxuLyoqXG4gKiBHZXRzIGEgbGlzdCBvZiBhbGwgbGVnYWwgbW92ZXMgZm9yIGEgc3RhdGVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICovXG5leHBvcnQgY29uc3QgZ2V0QWxsTGVnYWxNb3ZlcyA9IHN0YXRlID0+XG4gIFNxdWFyZS5hbGxJbkJvYXJkKCkucmVkdWNlKFxuICAgIChtb3Zlcywgc3F1YXJlKSA9PiBtb3Zlcy5jb25jYXQoZ2V0TGVnYWxNb3ZlcyhzdGF0ZSwgc3F1YXJlKSksXG4gICAgW11cbiAgKTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IG1vdmVQdXRzT3duS2luZ0luQ2hlY2sgPSAoc3RhdGUsIG1vdmUpID0+IHtcbiAgY29uc3QgbW92ZWRQaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIG1vdmUuZnJvbSk7XG4gIGNvbnN0IG5ld1N0YXRlID0gYXBwbHlNb3ZlVG9HYW1lU3RhdGUoc3RhdGUsIG1vdmUpO1xuXG4gIHJldHVybiBwaWVjZUlzQmxhY2sobW92ZWRQaWVjZSlcbiAgICA/IGJsYWNrSW5DaGVjayhuZXdTdGF0ZSlcbiAgICA6IHdoaXRlSW5DaGVjayhuZXdTdGF0ZSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgbW92ZUdpdmVzQ2hlY2sgPSAoc3RhdGUsIG1vdmUpID0+IHtcbiAgY29uc3QgbW92ZWRQaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIG1vdmUuZnJvbSk7XG4gIGNvbnN0IG5ld1N0YXRlID0gYXBwbHlNb3ZlVG9HYW1lU3RhdGUoc3RhdGUsIG1vdmUpO1xuXG4gIHJldHVybiBwaWVjZUlzQmxhY2sobW92ZWRQaWVjZSlcbiAgICA/IHdoaXRlSW5DaGVjayhuZXdTdGF0ZSlcbiAgICA6IGJsYWNrSW5DaGVjayhuZXdTdGF0ZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTW92ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VJc0VtcHR5ID0gcGllY2UgPT4gcGllY2UgPT09IFwiIFwiO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUlzV2hpdGUgPSBwaWVjZSA9PlxuICAhIXBpZWNlICYmICFwaWVjZUlzRW1wdHkocGllY2UpICYmIHBpZWNlLnRvVXBwZXJDYXNlKCkgPT09IHBpZWNlO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUlzQmxhY2sgPSBwaWVjZSA9PlxuICAhIXBpZWNlICYmICFwaWVjZUlzRW1wdHkocGllY2UpICYmIHBpZWNlLnRvTG93ZXJDYXNlKCkgPT09IHBpZWNlO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMVxuICogQHBhcmFtIHtzdHJpbmd9IHAyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlc0FyZVNhbWVDb2xvciA9IChwMSwgcDIpID0+XG4gIChwaWVjZUlzV2hpdGUocDEpICYmIHBpZWNlSXNXaGl0ZShwMikpIHx8XG4gIChwaWVjZUlzQmxhY2socDEpICYmIHBpZWNlSXNCbGFjayhwMikpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwMVxuICogQHBhcmFtIHtzdHJpbmd9IHAyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlQ2FuVGFrZVBpZWNlID0gKHAxLCBwMikgPT5cbiAgKHBpZWNlSXNXaGl0ZShwMSkgJiYgcGllY2VJc0JsYWNrKHAyKSkgfHxcbiAgKHBpZWNlSXNCbGFjayhwMSkgJiYgcGllY2VJc1doaXRlKHAyKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9waWVjZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRyaW0gYSBzdHJpbmcgdXNpbmcgbmF0aXZlIHRyaW1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCB0cmltID0gc3RyID0+IHN0ci50cmltKCk7XG5cbi8qKlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNPYmplY3QgPSB4ID0+IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcblxuLyoqXG4gKiBNYXBzIGFycmF5cyBvciBvYmplY3RzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmIC0gYSAtPiBiXG4gKiBAcGFyYW0geyp9IGZ1bmN0b3JcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgY29uc3QgbWFwID0gKGYsIGZ1bmN0b3IpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZnVuY3RvcikgfHwgdHlwZW9mIGYubWFwID09PSBcImZ1bmN0aW9uXCIpXG4gICAgcmV0dXJuIGZ1bmN0b3IubWFwKGYpO1xuXG4gIGlmIChpc09iamVjdChmdW5jdG9yKSlcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZnVuY3RvcikucmVkdWNlKFxuICAgICAgKG8sIFtrLCB2XSkgPT4gT2JqZWN0LmFzc2lnbihvLCB7IFtrXTogZih2KSB9KSxcbiAgICAgIHt9XG4gICAgKTtcblxuICByZXR1cm4gZnVuY3Rvcjtcbn07XG5cbi8qKlxuICogRmlsdGVycyBhcnJheXMgb3Igb2JqZWN0cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWQgLSBGaWx0ZXIgZnVuY3Rpb24gb2YgeCAtPiBib29sXG4gKiBAcGFyYW0geyp9IGZpbHRlcmFibGVcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgY29uc3QgZmlsdGVyID0gKHByZWQsIGZpbHRlcmFibGUpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyYWJsZSkgfHwgdHlwZW9mIGZpbHRlcmFibGUuZmlsdGVyID09PSBcImZ1bmN0aW9uXCIpXG4gICAgcmV0dXJuIGZpbHRlcmFibGUuZmlsdGVyKHByZWQpO1xuXG4gIGlmIChpc09iamVjdChmaWx0ZXJhYmxlKSkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhmaWx0ZXJhYmxlKS5yZWR1Y2UoXG4gICAgICAobywgW2ssIHZdKSA9PiBPYmplY3QuYXNzaWduKG8sIHByZWQodikgPyB7IFtrXTogdiB9IDoge30pLFxuICAgICAge31cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmFibGU7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIHJhbmdlIG9mIG51bWJlcnMsIHN0YXJ0aW5nIGF0IDFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIC0gVGhlIGxlbmd0aC9lbmQgb2YgdGhlIHJhbmdlXG4gKiBAcmV0dXJucyB7W251bWJlcl19XG4gKi9cbmV4cG9ydCBjb25zdCByYW5nZSA9IG4gPT4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbiB9LCAoXywgaSkgPT4gaSk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIGNvbWJpbmF0aW9ucyBvZiB0d28gYXJyYXlzXG4gKiBAcGFyYW0ge1sqXX0geHNcbiAqIEBwYXJhbSB7WypdfSB5c1xuICogQHJldHVybnMge1tbKl1dfVxuICovXG5leHBvcnQgY29uc3QgeFByb2QgPSAoeHMsIHlzKSA9PlxuICB4cy5yZWR1Y2UoKGFjYywgeCkgPT4gYWNjLmNvbmNhdCh5cy5tYXAoeSA9PiBbeCwgeV0pKSwgW10pO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbmV4cG9ydCBjb25zdCBwcm9wID0ga2V5ID0+IG9iaiA9PiBvYmpba2V5XTtcblxuLyoqXG4gKiBDb21wb3NlIDJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGdcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXBvc2UgPSAoZiwgZykgPT4geCA9PiBmKGcoeCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU3RhcnRQb3NpdGlvbiwgbW92ZVBpZWNlSW5Cb2FyZCwgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuL0JvYXJkXCI7XG5pbXBvcnQgeyBNb3ZlLCBnZXRNb3ZlcyB9IGZyb20gXCIuL01vdmVzXCI7XG5pbXBvcnQgeyBjb21wb3NlIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IHBpZWNlSXNCbGFjaywgcGllY2VJc1doaXRlIH0gZnJvbSBcIi4vcGllY2VcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vU3F1YXJlXCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNoZXNzIGJvYXJkIGR1cmluZyBhIGdhbWVcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEdhbWVTdGF0ZVxuICogQHByb3BlcnR5IHtbW3N0cmluZ11dfSBib2FyZFxuICogQHByb3BlcnR5IHtib29sZWFufSB3aGl0ZVRvTW92ZVxuICogQHByb3BlcnR5IHtib29sZWFufSBibGFja1RvTW92ZVxuICogQHByb3BlcnR5IHtib29sZWFufSB3aGl0ZUNhbkNhc3RsZVNob3J0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdoaXRlQ2FuQ2FzdGxlTG9uZ1xuICogQHByb3BlcnR5IHtib29sZWFufSBibGFja0NhbkNhc3RsZVNob3J0XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJsYWNrQ2FuQ2FzdGxlTG9uZ1xuICogQHByb3BlcnR5IHtzdHJpbmc/fSBlblBhc3NhbnQgLSBQb3NpdGlvbiBiZWhpbmQgYSBwYXduIHRoYXQganVzdCBtYWRlIGEgMiBzcXVhcmUgYWR2YW5jZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhhbGZNb3ZlcyAtIEhhbGYgbW92ZXMgc2luY2UgbGFzdCBjYXB0dXJlIG9yIHBhd25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtb3ZlTnIgLSBUb3RhbCBtb3ZlcyBpbiBnYW1lLiBTdGFydHMgYXQgMSwgaW5jcmVtZW50IHBlciBibGFjayBtb3ZlXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBHYW1lU3RhdGVcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgLSBBIGxpc3Qgb2Ygcm93cyBjb250YWluaW5nIHBpZWNlIGNvZGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9Nb3ZlIC0gXCJ3XCIgZm9yIHdoaXRlLCBcImJcIiBmb3IgYmxhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXN0bGVPcHRpb25zIC0gQW55IGNvbWJpbmF0aW9uIG9mIFwiS1FrcVwiIGZvciB3aGl0ZS9ibGFjayBraW5nL3F1ZWVuIHNpZGUgY2FzdGxpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBlblBhc3NhbnRTcXVhcmUgLSBQb3NpdGlvbiBiZWhpbmQgYSBwYXduIHRoYXQganVzdCBtYWRlIGEgMiBzcXVhcmUgYWR2YW5jZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBoYWxmTW92ZXMgLSBIYWxmIG1vdmVzIHNpbmNlIGxhc3QgY2FwdHVyZSBvciBwYXduIGFkdmFuY2VcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gZnVsbE1vdmVzIC0gVG90YWwgbW92ZXMgaW4gZ2FtZS4gU3RhcnRzIGF0IDEsIGluY3JlbWVudCBwZXIgYmxhY2sgbW92ZVxuICogQHJldHVybnMge0dhbWVTdGF0ZX1cbiAqL1xuY29uc3QgR2FtZVN0YXRlID0gKFxuICBib2FyZCxcbiAgdG9Nb3ZlID0gXCJ3XCIsXG4gIGNhc3RsZU9wdGlvbnMgPSBcIktRa3FcIixcbiAgZW5QYXNzYW50U3F1YXJlID0gXCItXCIsXG4gIGhhbGZNb3ZlcyA9IDAsXG4gIGZ1bGxNb3ZlcyA9IDFcbikgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBib2FyZDogYm9hcmQgfHwgU3RhcnRQb3NpdGlvbigpLFxuICAgICAgLy8gU2lkZSB0byBtb3ZlXG4gICAgICB3aGl0ZVRvTW92ZTogdG9Nb3ZlID09PSBcIndcIixcbiAgICAgIGJsYWNrVG9Nb3ZlOiB0b01vdmUgPT09IFwiYlwiLFxuXG4gICAgICAvLyBFbiBwYXNzYW50XG4gICAgICBlblBhc3NhbnQ6IGVuUGFzc2FudFNxdWFyZSA9PT0gXCItXCIgPyBudWxsIDogZW5QYXNzYW50U3F1YXJlLFxuICAgICAgLy8gTW92ZSBudW1iZXJzXG4gICAgICBoYWxmTW92ZXM6ICtoYWxmTW92ZXMsXG4gICAgICBtb3ZlTnI6ICtmdWxsTW92ZXNcbiAgICB9LFxuICAgIGNhc3RsZU9wdGlvbnNGcm9tU3RyaW5nKGNhc3RsZU9wdGlvbnMpXG4gICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBjYXN0bGVTdHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNhc3RsZU9wdGlvbnNGcm9tU3RyaW5nID0gY2FzdGxlU3RyID0+ICh7XG4gIHdoaXRlQ2FuQ2FzdGxlU2hvcnQ6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJLXCIpLFxuICB3aGl0ZUNhbkNhc3RsZUxvbmc6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJRXCIpLFxuICBibGFja0NhbkNhc3RsZVNob3J0OiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwia1wiKSxcbiAgYmxhY2tDYW5DYXN0bGVMb25nOiBjYXN0bGVTdHIgJiYgY2FzdGxlU3RyLmluY2x1ZGVzKFwicVwiKVxufSk7XG5cbmNvbnN0IGNhc3RsZVN0ckZyb21PcHRpb25zID0gKHtcbiAgd2hpdGVDYW5DYXN0bGVTaG9ydCxcbiAgd2hpdGVDYW5DYXN0bGVMb25nLFxuICBibGFja0NhbkNhc3RsZVNob3J0LFxuICBibGFja0NhbkNhc3RsZUxvbmdcbn0pID0+XG4gIFtcbiAgICBbXCJLXCIsIHdoaXRlQ2FuQ2FzdGxlU2hvcnRdLFxuICAgIFtcIlFcIiwgd2hpdGVDYW5DYXN0bGVMb25nXSxcbiAgICBbXCJrXCIsIGJsYWNrQ2FuQ2FzdGxlU2hvcnRdLFxuICAgIFtcInFcIiwgYmxhY2tDYW5DYXN0bGVMb25nXVxuICBdXG4gICAgLmZpbHRlcigoW2MsIHByZWRdKSA9PiBwcmVkKVxuICAgIC5tYXAoKFtjLCBwcmVkXSkgPT4gYylcbiAgICAuam9pbihcIlwiKTtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7TW92ZX0gbW92ZVxuICogQHJldHVybnMge3N0cmluZz99XG4gKi9cbmNvbnN0IGNhc3RsZU9wdGlvbnNEaWZmID0gKHN0YXRlLCBtb3ZlKSA9PiB7XG4gIGxldCBwcmV2T3B0aW9ucyA9IGNhc3RsZVN0ckZyb21PcHRpb25zKHN0YXRlKTtcblxuICBpZiAoIXByZXZPcHRpb25zKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIG1vdmUuZnJvbSk7XG5cbiAgc3dpdGNoIChwaWVjZSkge1xuICAgIGNhc2UgXCJrXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShcImtcIiwgXCJcIikucmVwbGFjZShcInFcIiwgXCJcIik7XG4gICAgY2FzZSBcInJcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKG1vdmUuZnJvbS5maWxlID09PSAwID8gXCJxXCIgOiBcImtcIiwgXCJcIik7XG4gICAgY2FzZSBcIktcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKFwiS1wiLCBcIlwiKS5yZXBsYWNlKFwiUVwiLCBcIlwiKTtcbiAgICBjYXNlIFwiUlwiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UobW92ZS5mcm9tLmZpbGUgPT09IDAgPyBcIlFcIiA6IFwiS1wiLCBcIlwiKTtcbiAgfVxuXG4gIHJldHVybiBwcmV2T3B0aW9ucztcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7R2FtZVN0YXRlfVxuICovXG5leHBvcnQgY29uc3QgYXBwbHlNb3ZlVG9HYW1lU3RhdGUgPSAoc3RhdGUsIG1vdmUpID0+IHtcbiAgbGV0IGJvYXJkID0gbW92ZVBpZWNlSW5Cb2FyZChzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tLCBtb3ZlLnRvKTtcblxuICBpZiAobW92ZS5jYXN0bGVzKSB7XG4gICAgLy8gTW92ZSB0aGUgcm9vayBhcyB3ZWxsXG4gICAgY29uc3QgcXVlZW5TaWRlID0gbW92ZS50by5maWxlID09PSAyOyAvLyBcImNcIlxuICAgIGNvbnN0IHJlbEZyb20gPSBxdWVlblNpZGUgPyBbMCwgLTJdIDogWzAsIDFdO1xuICAgIGNvbnN0IHJlbFRvID0gcXVlZW5TaWRlID8gWzAsIDFdIDogWzAsIC0xXTtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJtdXN0IG1vdmUgcm9vayBmcm9tXCIsXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbEZyb20pLmNvZGUsXG4gICAgICBcInRvXCIsXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbFRvKS5jb2RlXG4gICAgKTtcblxuICAgIGJvYXJkID0gbW92ZVBpZWNlSW5Cb2FyZChcbiAgICAgIGJvYXJkLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxGcm9tKSxcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsVG8pXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBHYW1lU3RhdGUoXG4gICAgYm9hcmQsXG4gICAgc3RhdGUud2hpdGVUb01vdmUgPyBcImJcIiA6IFwid1wiLFxuICAgIGNhc3RsZU9wdGlvbnNEaWZmKHN0YXRlLCBtb3ZlKSxcbiAgICBtb3ZlLmlzUGF3bk1vdmUgJiYgbW92ZS50by5yb3cgLSBtb3ZlLmZyb20ucm93ID09PSAyLCAvLyBUT0RPOiAoU2ltb24pIGdldCBlbiBwYXNzYW50IHNxdWFyZVxuICAgIHN0YXRlLmhhbGZNb3ZlcyArIDEsXG4gICAgc3RhdGUubW92ZU5yICsgKHN0YXRlLndoaXRlVG9Nb3ZlID8gMSA6IDApXG4gICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNDaGVjayA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKCkuc29tZShzcXVhcmUgPT5cbiAgICBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5zb21lKG1vdmUgPT4gbW92ZS50YWtlc0tpbmcpXG4gICk7XG59O1xuXG4vLyBUT0RPOiAoU2ltb24pIERSWVxuLy8gTm90ZTogKFNpbW9uKSBIYXZpbmcgdG8gcmVjYWxjdWxhdGUgYWxsIG1vdmVzIGZvciBhIGNvbG9yIGV2ZXJ5IHRpbWUgb25lXG4vLyAgICAgICAgICAgICAgIG9mIHRoZXNlIG1ldGhvZHMgaXMgY2FsbGVkIGlzIHZlcnkgaW5lZmZpY2llbnQuIFByb2JhYmx5XG4vLyAgICAgICAgICAgICAgIGJldHRlciB0byBzdG9yZSBwb3NzaWJsZSBtb3ZlcyB3aXRoIGEgZ2FtZSBzdGF0ZVxuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCB3aGl0ZUluQ2hlY2sgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzQmxhY2soZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcXVhcmUgPT4gZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSkuc29tZShtb3ZlID0+IG1vdmUudGFrZXNLaW5nKSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBibGFja0luQ2hlY2sgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzV2hpdGUoZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcXVhcmUgPT4gZ2V0TW92ZXMoc3RhdGUsIHNxdWFyZSkuc29tZShtb3ZlID0+IG1vdmUudGFrZXNLaW5nKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvbmUgb2YgdGhlIGJsYWNrIHBpZWNlcyBhdHRhY2tzIGEgc3F1YXJlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgYmxhY2tQaWVjZUF0dGFja3NTcXVhcmUgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc0JsYWNrKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3EgPT4gZ2V0TW92ZXMoc3RhdGUsIHNxKS5zb21lKG1vdmUgPT4gbW92ZS50by5jb2RlID09PSBzcXVhcmUuY29kZSkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgb25lIG9mIHRoZSB3aGl0ZSBwaWVjZXMgYXR0YWNrcyBhIHNxdWFyZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdoaXRlUGllY2VBdHRhY2tzU3F1YXJlID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNXaGl0ZShnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxID0+IGdldE1vdmVzKHN0YXRlLCBzcSkuc29tZShtb3ZlID0+IG1vdmUudG8uY29kZSA9PT0gc3F1YXJlLmNvZGUpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTdGF0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0dhbWVTdGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBwaWVjZXNBcmVTYW1lQ29sb3IgfSBmcm9tIFwiLi8uLi9waWVjZVwiO1xuaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuLy4uL0JvYXJkXCI7XG5pbXBvcnQgeyBNb3ZlIH0gZnJvbSBcIi4vLi4vTW92ZXNcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgZXhwbG9yZXMgYSBkaXJlY3Rpb24gb24gYSBib2FyZCB1bnRpbCB0aGUgcGllY2VcbiAqIGlzIG91dCBvZiBtb3Zlc1xuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGllY2VcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7W251bWJlcl19IGRpcmVjdGlvblxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGVsdGFcbiAqIEBwYXJhbSB7W01vdmVdfSByZXN1bHRzXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5jb25zdCBnZXRNb3Zlc1VudGlsTm90RW1wdHkgPSAoXG4gIHN0YXRlLFxuICBwaWVjZSxcbiAgc3F1YXJlLFxuICBkaXJlY3Rpb24sXG4gIGRlbHRhID0gWzAsIDBdLFxuICByZXN1bHRzID0gW11cbikgPT4ge1xuICBjb25zdCBuZXdEZWx0YSA9IFtkZWx0YVswXSArIGRpcmVjdGlvblswXSwgZGVsdGFbMV0gKyBkaXJlY3Rpb25bMV1dO1xuXG4gIGNvbnN0IG5leHRTcXVhcmUgPSBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgbmV3RGVsdGEpO1xuXG4gIC8vIEVkZ2Ugb2YgYm9hcmQsIGVuZCBvZiBtb3ZlXG4gIGlmICghbmV4dFNxdWFyZS5pbkJvdW5kcykgcmV0dXJuIHJlc3VsdHM7XG5cbiAgY29uc3QgdG9QaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIG5leHRTcXVhcmUpO1xuICBjb25zdCBoYXNQaWVjZSA9IHRvUGllY2UgIT09IFwiIFwiO1xuICBjb25zdCBoYXNFbmVteVBpZWNlID0gaGFzUGllY2UgJiYgIXBpZWNlc0FyZVNhbWVDb2xvcihwaWVjZSwgdG9QaWVjZSk7XG5cbiAgLy8gT3duIHBpZWNlLCBlbmQgb2YgbW92ZVxuICBpZiAoaGFzUGllY2UgJiYgIWhhc0VuZW15UGllY2UpIHJldHVybiByZXN1bHRzO1xuXG4gIC8vIFdlIGNhbiBtYWtlIGEgbW92ZSBmb3Igc3VyZVxuICBjb25zdCBtb3ZlID0gTW92ZShzcXVhcmUsIG5leHRTcXVhcmUsIHN0YXRlKTtcblxuICBpZiAoaGFzUGllY2UpIHJldHVybiByZXN1bHRzLmNvbmNhdChtb3ZlKTtcblxuICByZXR1cm4gZ2V0TW92ZXNVbnRpbE5vdEVtcHR5KFxuICAgIHN0YXRlLFxuICAgIHBpZWNlLFxuICAgIHNxdWFyZSxcbiAgICBkaXJlY3Rpb24sXG4gICAgbmV3RGVsdGEsXG4gICAgcmVzdWx0cy5jb25jYXQobW92ZSlcbiAgKTtcbn07XG5cbi8qKlxuICogR2V0cyBhIGxpc3Qgb2YgbW92ZXMgZm9yIGEgcGllY2Ugb24gYSBzcXVhcmUgYmFzZWQgb24gYSBzZXQgb2ZcbiAqIGRpcmVjdGlvbnNcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtbW251bWJlcl1dfSBkaXJlY3Rpb25zXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RGlyZWN0aW9uYWxNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlLCBkaXJlY3Rpb25zKSA9PiB7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcbiAgcmV0dXJuIGRpcmVjdGlvbnNcbiAgICAubWFwKGQgPT4gZ2V0TW92ZXNVbnRpbE5vdEVtcHR5KHN0YXRlLCBwaWVjZSwgc3F1YXJlLCBkKSlcbiAgICAucmVkdWNlKCh4cywgeCkgPT4geHMuY29uY2F0KHgpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9kaXJlY3Rpb25CYXNlZC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuaW1wb3J0IHsgcmFuZ2UgfSBmcm9tIFwiLi8uLi91dGlsc1wiO1xuXG5jb25zdCBzdW0gPSAoeCwgeSkgPT4geCArIHk7XG5cbi8vIE5vdGU6IChTaW1vbikgSWYgd2Ugd2FudCB0byB0ZXN0IHRoaXMsIHdlIG1pZ2h0IHdhbnQgdG8gdXNlOlxuLy8gICAgICAgICAgICAgICBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9nZXQtaW1hZ2UtZGF0YVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gYm9hcmRDdHhcbiAqL1xuY29uc3QgZ2V0SW1hZ2VEYXRhRm9yU3F1YXJlID0gKHNxdWFyZSwgc3F1YXJlU2l6ZSwgYm9hcmRDdHgpID0+XG4gIGJvYXJkQ3R4LmdldEltYWdlRGF0YShcbiAgICBzcXVhcmUuZmlsZSAqIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlLnJvdyAqIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZSxcbiAgICBzcXVhcmVTaXplXG4gICk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcXVhcmVTaXplXG4gKiBAcGFyYW0ge051bWJlcn0gY3V0T2ZmIEJldHdlZW4gMCBhbmQgMVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKiBAcmV0dXJucyB7SW1hZ2VEYXRhfVxuICovXG5jb25zdCBnZXRDZW50ZXJJbWFnZURhdGFGb3JTcXVhcmUgPSAoc3F1YXJlLCBzcXVhcmVTaXplLCBjdXRPZmYsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAqIGN1dE9mZixcbiAgICBzcXVhcmUucm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgKiBjdXRPZmYsXG4gICAgc3F1YXJlU2l6ZSAtIDIgKiBjdXRPZmYgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUgLSAyICogY3V0T2ZmICogc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFic29sdXRlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gYXJyYXlzIGJ5IHN1bW1pbmcgZXZlcnkgaW5kZXhcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSBbTnVtYmVyXX0gYXJyMlxuICogQHJldHVybnMgTnVtYmVyXG4gKi9cbmNvbnN0IHRvdGFsRGlmZiA9IChhcnIxLCBhcnIyKSA9PiB7XG4gIGNvbnN0IGwgPSBNYXRoLm1heChhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBsZXQgZCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBkICs9IE1hdGguYWJzKChhcnIxW2ldIHx8IDApIC0gKGFycjJbaV0gfHwgMCkpO1xuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QmVmb3JlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QWZ0ZXJcbiAqL1xuY29uc3QgY2VudGVyQWJzUGl4ZWxEaWZmID0gKGN0eEJlZm9yZSwgY3R4QWZ0ZXIpID0+IHtcbiAgLy8gTm90ZTogKFNpbW9uKSBUaGUgYm9hcmQgaGFzIHRvIGJlIHNxdWFyZVxuICBjb25zdCBzcXVhcmVTaXplID0gY3R4QmVmb3JlLmNhbnZhcy53aWR0aCAvIDg7XG5cbiAgY29uc3QgY2hhbmdlcyA9IFNxdWFyZS5hbGxJbkJvYXJkKCkubWFwKHNxdWFyZSA9PiB7XG4gICAgY29uc3QgYmVmb3JlID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIDAuMjUsXG4gICAgICBjdHhCZWZvcmVcbiAgICApO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIDAuMjUsXG4gICAgICBjdHhBZnRlclxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3F1YXJlLFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgICBkaWZmZXJlbmNlOiB0b3RhbERpZmYoYmVmb3JlLmRhdGEsIGFmdGVyLmRhdGEpXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgZ3JleSBzY2FsZSB2YWx1ZXMgKDAgLSAyNTUpIGlnbm9yaW5nIHRoZVxuICogYWxwaGEgY2hhbm5lbFxuICogQHBhcmFtIHtbTnVtYmVyXX0gcmdiYVZhbHVlc1xuICogQHJldHVybnMge1tOdW1iZXJdfVxuICovXG5jb25zdCByZ2JhVG9HcmV5U2NhbGVWYWx1ZXMgPSByZ2JhVmFsdWVzID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZ2JhVmFsdWVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgcmVzdWx0LnB1c2goXG4gICAgICBNYXRoLmZsb29yKChyZ2JhVmFsdWVzW2ldICsgcmdiYVZhbHVlc1tpICsgMV0gKyByZ2JhVmFsdWVzW2kgKyAyXSkgLyAzKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHRocmVzaG9sZFxuICogQHBhcmFtIHtOdW1iZXJ9IHB4UGVyUm93XG4gKiBAcGFyYW0ge1tOdW1iZXJdfSBncmV5U2NhbGVEYXRhXG4gKiBAcGFyYW0ge051bWJlcn0gcHhOclxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuY29uc3QgZWRnZVZhbHVlID0gKHRocmVzaG9sZCwgcHhQZXJSb3csIGdyZXlTY2FsZURhdGEsIHB4TnIpID0+IHtcbiAgY29uc3Qgcm93U2l6ZSA9IHB4UGVyUm93O1xuICBsZXQgcmVzdWx0ID0gMDtcblxuICBjb25zdCB0b3AgPSBncmV5U2NhbGVEYXRhW3B4TnIgLSByb3dTaXplXTtcbiAgY29uc3QgYm90dG9tID0gZ3JleVNjYWxlRGF0YVtweE5yICsgcm93U2l6ZV07XG4gIGNvbnN0IGxlZnQgPSBncmV5U2NhbGVEYXRhW3B4TnIgLSAxXTtcbiAgY29uc3QgcmlnaHQgPSBncmV5U2NhbGVEYXRhW3B4TnIgKyAxXTtcblxuICAvLyBQaXhlbHMgb24gZWRnZSBvZiBjYW52YXNcbiAgaWYgKFxuICAgIHRvcCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgYm90dG9tID09PSB1bmRlZmluZWQgfHxcbiAgICBsZWZ0ID09PSB1bmRlZmluZWQgfHxcbiAgICByaWdodCA9PT0gdW5kZWZpbmVkXG4gIClcbiAgICByZXR1cm4gMDtcblxuICBjb25zdCB2ID0gZ3JleVNjYWxlRGF0YVtweE5yXTtcbiAgaWYgKE1hdGguYWJzKHYgLSB0b3ApID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcbiAgaWYgKE1hdGguYWJzKHYgLSBib3R0b20pID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcbiAgaWYgKE1hdGguYWJzKHYgLSBsZWZ0KSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gcmlnaHQpID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtbTnVtYmVyXX0gYXJyMVxuICogQHBhcmFtIHtbTnVtYmVyXX0gYXJyMlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuY29uc3Qgc3VtRGlmZiA9IChhcnIxLCBhcnIyKSA9PiBNYXRoLmFicyhhcnIxLnJlZHVjZShzdW0pIC0gYXJyMi5yZWR1Y2Uoc3VtKSk7XG5cbmNvbnN0IGVkZ2VQaXhlbENvdW50RGlmZiA9IChjdHhCZWZvcmUsIGN0eEFmdGVyKSA9PiB7XG4gIC8vIE5vdGU6IChTaW1vbikgVGhlIGJvYXJkIGhhcyB0byBiZSBzcXVhcmVcbiAgY29uc3Qgc3F1YXJlU2l6ZSA9IGN0eEJlZm9yZS5jYW52YXMud2lkdGggLyA4O1xuICBjb25zdCBQQURESU5HID0gMC4wNjI1OyAvLyBIYXMgdG8gcmVzdWx0IGluIHJvdW5kIG5yIVxuICBjb25zdCBpbm5lclNxdWFyZVNpemUgPSBzcXVhcmVTaXplIC0gMiAqIFBBRERJTkcgKiBzcXVhcmVTaXplO1xuICBjb25zdCBUSFJFU0hPTEQgPSAxNTtcblxuICBjb25zdCBjaGFuZ2VzID0gU3F1YXJlLmFsbEluQm9hcmQoKS5tYXAoc3F1YXJlID0+IHtcbiAgICBjb25zdCBiZWZvcmUgPSBnZXRDZW50ZXJJbWFnZURhdGFGb3JTcXVhcmUoXG4gICAgICBzcXVhcmUsXG4gICAgICBzcXVhcmVTaXplLFxuICAgICAgUEFERElORyxcbiAgICAgIGN0eEJlZm9yZVxuICAgICk7XG4gICAgY29uc3QgYWZ0ZXIgPSBnZXRDZW50ZXJJbWFnZURhdGFGb3JTcXVhcmUoXG4gICAgICBzcXVhcmUsXG4gICAgICBzcXVhcmVTaXplLFxuICAgICAgUEFERElORyxcbiAgICAgIGN0eEFmdGVyXG4gICAgKTtcblxuICAgIGNvbnN0IGdzQmVmb3JlID0gcmdiYVRvR3JleVNjYWxlVmFsdWVzKGJlZm9yZS5kYXRhKTtcbiAgICBjb25zdCBnc0FmdGVyID0gcmdiYVRvR3JleVNjYWxlVmFsdWVzKGFmdGVyLmRhdGEpO1xuXG4gICAgY29uc3QgZWRnZXNCZWZvcmUgPSBnc0JlZm9yZS5tYXAoKHYsIGksIGFsbCkgPT5cbiAgICAgIGVkZ2VWYWx1ZShUSFJFU0hPTEQsIGlubmVyU3F1YXJlU2l6ZSwgYWxsLCBpKVxuICAgICk7XG5cbiAgICBjb25zdCBlZGdlc0FmdGVyID0gZ3NBZnRlci5tYXAoKHYsIGksIGFsbCkgPT5cbiAgICAgIGVkZ2VWYWx1ZShUSFJFU0hPTEQsIGlubmVyU3F1YXJlU2l6ZSwgYWxsLCBpKVxuICAgICk7XG5cbiAgICBjb25zdCBkZWJ1Z0N2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgZGVidWdDdnMud2lkdGggPSBkZWJ1Z0N2cy5oZWlnaHQgPSBpbm5lclNxdWFyZVNpemU7XG5cbiAgICBjb25zdCBpbWFnZURhdGFDb3B5ID0gbmV3IEltYWdlRGF0YShcbiAgICAgIG5ldyBVaW50OENsYW1wZWRBcnJheShiZWZvcmUuZGF0YSksXG4gICAgICBiZWZvcmUud2lkdGgsXG4gICAgICBiZWZvcmUuaGVpZ2h0XG4gICAgKTtcblxuICAgIGVkZ2VzQmVmb3JlLmZvckVhY2goKHYsIGkpID0+IHtcbiAgICAgIGlmICh2ID09PSAwKSByZXR1cm47XG4gICAgICBpICo9IDQ7XG4gICAgICBpbWFnZURhdGFDb3B5LmRhdGFbaSArIDBdID0gMjU1O1xuICAgICAgaW1hZ2VEYXRhQ29weS5kYXRhW2kgKyAxXSA9IDA7XG4gICAgICBpbWFnZURhdGFDb3B5LmRhdGFbaSArIDJdID0gMDtcbiAgICB9KTtcblxuICAgIGVkZ2VzQWZ0ZXIuZm9yRWFjaCgodiwgaSkgPT4ge1xuICAgICAgaWYgKHYgPT09IDApIHJldHVybjtcbiAgICAgIGkgKj0gNDtcbiAgICAgIGltYWdlRGF0YUNvcHkuZGF0YVtpICsgMF0gPSAwO1xuICAgICAgaW1hZ2VEYXRhQ29weS5kYXRhW2kgKyAxXSA9IDI1NTtcbiAgICAgIGltYWdlRGF0YUNvcHkuZGF0YVtpICsgMl0gPSAwO1xuICAgIH0pO1xuXG4gICAgZGVidWdDdnMuZ2V0Q29udGV4dChcIjJkXCIpLnB1dEltYWdlRGF0YShpbWFnZURhdGFDb3B5LCAwLCAwKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzcXVhcmUsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcixcbiAgICAgIGRpZmZlcmVuY2U6IHN1bURpZmYoZWRnZXNCZWZvcmUsIGVkZ2VzQWZ0ZXIpLFxuICAgICAgZGVidWdDdnNcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gY2hhbmdlcztcbn07XG5cbi8vZXhwb3J0IGNvbnN0IHNxdWFyZUNoYW5nZXMgPSBjZW50ZXJBYnNQaXhlbERpZmY7XG5leHBvcnQgY29uc3Qgc3F1YXJlQ2hhbmdlcyA9IGVkZ2VQaXhlbENvdW50RGlmZjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBwaWVjZXNBcmVTYW1lQ29sb3IgfSBmcm9tIFwiLi8uLi9waWVjZVwiO1xuaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuLy4uL0JvYXJkXCI7XG5pbXBvcnQgeyBNb3ZlIH0gZnJvbSBcIi4vLi4vTW92ZXNcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge1tbbnVtYmVyXV0gcmVsYXRpdmVzIC0gU3F1YXJlIGxvY2F0aW9ucyBbZFJvdywgZEZpbGVdIHJlbGF0aXZlIHRvIHRoaXMgc3F1YXJlfVxuICogQHJldHVybnMge1tNb3Zlc119XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTcXVhcmVNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlLCByZWxhdGl2ZXMpID0+IHtcbiAgY29uc3QgdGhpc1BpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcblxuICBjb25zdCB0b1NxdWFyZXMgPSByZWxhdGl2ZXNcbiAgICAubWFwKGQgPT4gU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIGQpKVxuICAgIC5maWx0ZXIocyA9PiBzLmluQm91bmRzKVxuICAgIC5tYXAocyA9PiAoeyBzcXVhcmU6IHMsIHBpZWNlOiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzKSB9KSlcbiAgICAvLyBPbmx5IGVtcHR5IHNxdWFyZXMgb3Igc3F1YXJlcyB3aXRoIGVuZW15IHBpZWNlc1xuICAgIC5maWx0ZXIodG8gPT4gdG8ucGllY2UgPT09IFwiIFwiIHx8ICFwaWVjZXNBcmVTYW1lQ29sb3IodGhpc1BpZWNlLCB0by5waWVjZSkpO1xuXG4gIHJldHVybiB0b1NxdWFyZXMubWFwKHRvID0+IE1vdmUoc3F1YXJlLCB0by5zcXVhcmUsIHN0YXRlKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvc3F1YXJlQmFzZWQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0RGlyZWN0aW9uYWxNb3ZlcyB9IGZyb20gXCIuL2RpcmVjdGlvbkJhc2VkXCI7XG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0QmlzaG9wTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0RGlyZWN0aW9uYWxNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDFdLFxuICAgIFstMSwgMV0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzEsIC0xXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9iaXNob3AuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0RGlyZWN0aW9uYWxNb3ZlcyB9IGZyb20gXCIuL2RpcmVjdGlvbkJhc2VkXCI7XG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0Um9va01vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIGdldERpcmVjdGlvbmFsTW92ZXMoc3RhdGUsIHNxdWFyZSwgW1sxLCAwXSwgWy0xLCAwXSwgWzAsIC0xXSwgWzAsIDFdXSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvcm9vay5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgc3F1YXJlQ2hhbmdlcyB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlc1wiO1xuaW1wb3J0IHsgY3JvcCB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvY3JvcFwiO1xuaW1wb3J0IHsgcGVyc3BlY3RpdmVUcmFuc2Zvcm0gfSBmcm9tIFwiLi9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtXCI7XG5cbmltcG9ydCBGRU4gZnJvbSBcIi4vRkVOXCI7XG5pbXBvcnQgeyBnZXRBbGxMZWdhbE1vdmVzIH0gZnJvbSBcIi4vTW92ZXNcIjtcbmltcG9ydCBHYW1lU3RhdGUsIHsgYXBwbHlNb3ZlVG9HYW1lU3RhdGUgfSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcblxuY29uc3QgQm9hcmRJbWFnZSA9IChpbWdGaWxlLCB0cmFuc2Zvcm1Gcm9tKSA9PiB7XG4gIGNvbnN0IGZvdXJQb2ludHMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuXG4gIC8vIFdyaXRlIGZyb20gcG9pbnRzIHRvIHRyYW5zZm9ybUZyb20gZXZlcnkgNHRoIGl0ZW1cbiAgZm91clBvaW50cy5zdWJzY3JpYmUocG9pbnRzID0+IHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdHJhbnNmb3JtRnJvbShwb2ludHMpO1xuICAgICAgZm91clBvaW50cyhbXSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBteUNyb3AgPSBrby5vYnNlcnZhYmxlKCk7XG4gIGNvbnN0IGNyb3BEYXRhVVJMID0ga28ucHVyZUNvbXB1dGVkKFxuICAgICgpID0+IChteUNyb3AoKSA/IG15Q3JvcCgpLnRvRGF0YVVSTCgpIDogbnVsbClcbiAgKTtcblxuICAvLyBMaW5rIGEgdmlydHVhbCBpbWdcbiAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgY29uc3QgcmVkcmF3ID0gdHJhbnNmb3JtID0+IHtcbiAgICBjcm9wKHBlcnNwZWN0aXZlVHJhbnNmb3JtKHRyYW5zZm9ybSwgaW1nKSwgbXlDcm9wKTtcbiAgfTtcblxuICB0cmFuc2Zvcm1Gcm9tLnN1YnNjcmliZShyZWRyYXcpO1xuXG4gIC8vIExvYWQgaW5pdGlhbCBpbWFnZVxuICBpbWcub25sb2FkID0gKCkgPT4gcmVkcmF3KHRyYW5zZm9ybUZyb20oKSk7XG4gIGltZy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGltZ0ZpbGUpO1xuXG4gIGNvbnN0IGdhbWVTdGF0ZSA9IGtvLm9ic2VydmFibGUoR2FtZVN0YXRlKCkpO1xuICBjb25zdCBib2FyZCA9IGtvLnB1cmVDb21wdXRlZCgoKSA9PiBnYW1lU3RhdGUoKS5ib2FyZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBnYW1lU3RhdGUsXG4gICAgYm9hcmQsXG4gICAgaW1hZ2VWaXNpYmxlOiBrby5vYnNlcnZhYmxlKGZhbHNlKSxcbiAgICBvcmlnaW5hbDogaW1nLnNyYyxcbiAgICBjcm9wOiBjcm9wRGF0YVVSTCxcbiAgICBjcm9wQ3ZzOiBteUNyb3AsXG4gICAgbW92ZVJhdGluZzoga28ub2JzZXJ2YWJsZUFycmF5KFtdKSxcbiAgICBvbkNsaWNrOiAoZCwgZSkgPT4ge1xuICAgICAgY29uc3QgYmJveCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgZm91clBvaW50cy5wdXNoKHtcbiAgICAgICAgeDogZS5jbGllbnRYIC0gYmJveC54LFxuICAgICAgICB5OiBlLmNsaWVudFkgLSBiYm94LnlcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IEFwcCA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0cmFuc2Zvcm1Gcm9tID0ga28ub2JzZXJ2YWJsZUFycmF5KFtcbiAgICB7IHg6IDEyMCwgeTogNDUgfSxcbiAgICB7IHg6IDQwMywgeTogNDMgfSxcbiAgICB7IHg6IDM5NCwgeTogMzI1IH0sXG4gICAgeyB4OiAxMjUsIHk6IDMyMyB9XG4gIF0pO1xuXG4gIHRoaXMudG9nZ2xlSW1hZ2VzID0gKCkgPT4ge1xuICAgIHRoaXMuaW1hZ2VzKCkuZm9yRWFjaChiaSA9PiBiaS5pbWFnZVZpc2libGUoIWJpLmltYWdlVmlzaWJsZSgpKSk7XG4gIH07XG5cbiAgdGhpcy5pbWFnZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xuICB0aGlzLm9uTmV3RmlsZXMgPSAoZCwgZSkgPT4ge1xuICAgIHRoaXMuaW1hZ2VzKFxuICAgICAgQXJyYXkuZnJvbShlLnRhcmdldC5maWxlcykubWFwKGltZyA9PiBCb2FyZEltYWdlKGltZywgdHJhbnNmb3JtRnJvbSkpXG4gICAgKTtcbiAgfTtcblxuICB0aGlzLmxhc3RMYXN0Q2hhbmdlcyA9IGtvLm9ic2VydmFibGUoW10pO1xuICB0aGlzLmxhc3RDaGFuZ2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KFtdKTtcbiAgdGhpcy5sYXN0Q2hhbmdlcy5zdWJzY3JpYmUodGhpcy5sYXN0TGFzdENoYW5nZXMsIG51bGwsIFwiYmVmb3JlQ2hhbmdlXCIpO1xuXG4gIGNvbnN0IGdldEJlc3RHdWVzcyA9IChpbWdCZWZvcmUsIGltZ0FmdGVyKSA9PiB7XG4gICAgY29uc3QgY3R4QmVmb3JlID0gaW1nQmVmb3JlLmNyb3BDdnMoKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY29uc3QgY3R4QWZ0ZXIgPSBpbWdBZnRlci5jcm9wQ3ZzKCkuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IHNxdWFyZUNoYW5nZXMoY3R4QmVmb3JlLCBjdHhBZnRlcik7XG4gICAgdGhpcy5sYXN0Q2hhbmdlcyhjaGFuZ2VzLm1hcChjID0+IGMuZGVidWdDdnMpKTtcblxuICAgIGNvbnN0IGdhbWVTdGF0ZUJlZm9yZSA9IGltZ0JlZm9yZS5nYW1lU3RhdGUoKTtcbiAgICBjb25zdCBhbGxvd2VkTW92ZXMgPSBnZXRBbGxMZWdhbE1vdmVzKGdhbWVTdGF0ZUJlZm9yZSk7XG5cbiAgICBjb25zdCBwb3NzaWJpbGl0aWVzID0gYWxsb3dlZE1vdmVzXG4gICAgICAubWFwKG1vdmUgPT4ge1xuICAgICAgICBjb25zdCBmcm9tU3F1YXJlQ2hhbmdlID0gY2hhbmdlc1ttb3ZlLmZyb20uaW5kZXhdLmRpZmZlcmVuY2U7XG4gICAgICAgIGNvbnN0IHRvU3F1YXJlQ2hhbmdlID0gY2hhbmdlc1ttb3ZlLnRvLmluZGV4XS5kaWZmZXJlbmNlO1xuXG4gICAgICAgIC8vIE5vdGU6IChTaW1vbikgVGhlIFwiZnJvbVwiIHNxdWFyZSBpcyBhbHdheXMgZW1wdHkgYWZ0ZXIgYSBtb3ZlXG4gICAgICAgIC8vICAgICAgICAgICAgICAgVGhlcmVmb3JlLCBpdCdzIGV4cGVjdGVkIHRvIHNob3cgYSBsYXJnZSBkaWZmXG4gICAgICAgIC8vICAgICAgICAgICAgICAgbWFraW5nIGl0IGVhc2llciB0byByZWNvZ25pc2UuXG5cbiAgICAgICAgY29uc3QgdG90YWxDaGFuZ2UgPSBNYXRoLnJvdW5kKDEuNSAqIGZyb21TcXVhcmVDaGFuZ2UgKyB0b1NxdWFyZUNoYW5nZSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb3ZlLFxuICAgICAgICAgIGZyb21TcXVhcmVDaGFuZ2UsXG4gICAgICAgICAgdG9TcXVhcmVDaGFuZ2UsXG4gICAgICAgICAgdG90YWxDaGFuZ2UsXG4gICAgICAgICAgZnJvbTogbW92ZS5mcm9tLmNvZGUsXG4gICAgICAgICAgdG86IG1vdmUudG8uY29kZVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICAgIC5zb3J0KChwMSwgcDIpID0+IHAyLnRvdGFsQ2hhbmdlIC0gcDEudG90YWxDaGFuZ2UpO1xuXG4gICAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG4gIH07XG5cbiAgdGhpcy5hbmFseXplID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhaXJzID0gdGhpcy5pbWFnZXMoKS5yZWR1Y2UoKHBhaXJzLCBpbWcsIGksIGltZ3MpID0+IHtcbiAgICAgIGlmIChpbWdzW2kgKyAxXSkgcGFpcnMucHVzaChbaW1nLCBpbWdzW2kgKyAxXV0pO1xuICAgICAgcmV0dXJuIHBhaXJzO1xuICAgIH0sIFtdKTtcblxuICAgIHRoaXMuaW1hZ2VzKCkuZm9yRWFjaCgoaW1nLCBpKSA9PiB7XG4gICAgICAvLyBMYXN0IGJvYXJkXG4gICAgICBpZiAoIXBhaXJzW2ldKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGJlZm9yZSA9IHBhaXJzW2ldWzBdO1xuICAgICAgY29uc3QgYWZ0ZXIgPSBwYWlyc1tpXVsxXTtcblxuICAgICAgY29uc3QgbW92ZXMgPSBnZXRCZXN0R3Vlc3MoYmVmb3JlLCBhZnRlcik7XG4gICAgICBjb25zdCBtb3ZlID0gbW92ZXNbMF0ubW92ZTtcbiAgICAgIGFmdGVyLm1vdmVSYXRpbmcobW92ZXMpO1xuICAgICAgYWZ0ZXIuZ2FtZVN0YXRlKGFwcGx5TW92ZVRvR2FtZVN0YXRlKGJlZm9yZS5nYW1lU3RhdGUoKSwgbW92ZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMub3ZlcmxheSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xufTtcblxua28uYmluZGluZ0hhbmRsZXJzLnBsYWNlQWxsID0ge1xuICBpbml0OiAoZWwsIHZhKSA9PiB7XG4gICAga28uY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgZWwuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGNvbnN0IGlubmVyRWxzID0ga28udW53cmFwKHZhKCkpO1xuICAgICAgaW5uZXJFbHMuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgICAgICBpZiAoaSAlIDggPT09IDApIGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmtvLmFwcGx5QmluZGluZ3MobmV3IEFwcCgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQHBhcmFtIHtEYXRhVVJMfSBkYXRhVVJMXG4gKiBAcGFyYW0ge2tvLm9ic2VydmFibGV9IHdyaXRlVG9cbiAqIEByZXR1cm5zIHtrby5vYnNlcnZhYmxlfVxuICovXG5leHBvcnQgY29uc3QgY3JvcCA9IChkYXRhVVJMLCB3cml0ZVRvKSA9PiB7XG4gIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICBjb25zdCBjdnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICBjdnMud2lkdGggPSAyNTY7XG4gIGN2cy5oZWlnaHQgPSAyNTY7XG4gIGNvbnN0IGN0eCA9IGN2cy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgd3JpdGVUbyhjdnMpO1xuICB9O1xuICBpbWcuc3JjID0gZGF0YVVSTDtcblxuICByZXR1cm4gd3JpdGVUbztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbWFnZUhhbmRsaW5nL2Nyb3AuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IHBvaW50UmVkdWNlciA9IChhY2MsIHsgeCwgeSB9KSA9PiBhY2MuY29uY2F0KHgsIHkpO1xuXG4vKipcbiAqIEBwYXJhbSB7W3t4LCB5fV19IHJlZlBvaW50c1xuICogQHBhcmFtIHtJbWFnZX0gaW1nXG4gKiBAcmV0dXJucyB7RGF0YVVSTH1cbiAqL1xuZXhwb3J0IGNvbnN0IHBlcnNwZWN0aXZlVHJhbnNmb3JtID0gKHJlZlBvaW50cywgaW1nKSA9PiB7XG4gIGNvbnN0IGN2cyA9IGZ4LmNhbnZhcygpO1xuXG4gIGNvbnN0IGZyb20gPSByZWZQb2ludHMucmVkdWNlKHBvaW50UmVkdWNlciwgW10pO1xuICBjb25zdCB0byA9IFswLCAyNTYsIDAsIDAsIDI1NiwgMCwgMjU2LCAyNTZdO1xuXG4gIHJldHVybiBjdnNcbiAgICAuZHJhdyhjdnMudGV4dHVyZShpbWcpKVxuICAgIC5wZXJzcGVjdGl2ZShmcm9tLCB0bylcbiAgICAudXBkYXRlKClcbiAgICAudG9EYXRhVVJMKCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VIYW5kbGluZy9wZXJzcGVjdGl2ZVRyYW5zZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgdHJpbSB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgR2FtZVN0YXRlIGZyb20gXCIuL0dhbWVTdGF0ZVwiO1xuXG4vKiBBIHJlZ3VsYXIgY2hlc3MgZ2FtZSdzIHN0YXJ0aW5nIHBvc2l0aW9uIGluIEZFTiBub3RhdGlvbiAqL1xuY29uc3QgU1RBUlRfUE9TSVRJT04gPVxuICBcInJuYnFrYm5yL3BwcHBwcHBwLzgvOC84LzgvUFBQUFBQUFAvUk5CUUtCTlIgdyBLUWtxIC0gMCAxXCI7XG5cbi8qKlxuICogU3BsaXRzIHVwIGEgZmVuIHN0cmluZyBpbiB0byBwYXJ0cyBmb3Igcm93cywgc2lkZSB0byBtb3ZlLCBcbiAqIGNhc3RsZSBvcHRpb25zLCBlbiBwYXNzYW50LCBoYWxmIG1vdmVzIGFuZCBmdWxsIG1vdmVzXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gXG4gKiBAcmV0dXJucyB7W3N0cmluZ119XG4gKi9cbmNvbnN0IGZlblBhcnRzID0gZmVuID0+IGZlbi5zcGxpdCgvXFxzKy9nKTtcblxuLyoqXG4gKiAoUmVjdXJzaXZlbHkpIGNyZWF0ZSBhIGZlbiByb3cgY29kZSBmcm9tIGEgbGlzdCBvZiBwaWVjZVxuICogY29kZXMsIGluIHdoaWNoIGVtcHR5IHNxdWFyZXMgYXJlIFwiIFwiXG4gKiBcbiAqIEBwYXJhbSB7W3N0cmluZ119IHBpZWNlcyBcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcmVzdWx0PVwiXCJdIFxuICogQHBhcmFtIHtudW1iZXJ9IFtlbXB0aWVzPTBdIFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBwaWVjZUNvZGVzVG9GZW5Sb3cgPSAocGllY2VzLCByZXN1bHQgPSBcIlwiLCBlbXB0aWVzID0gMCkgPT5cbiAgcGllY2VzLmxlbmd0aCA9PT0gMFxuICAgID8gcmVzdWx0ICsgKGVtcHRpZXMgfHwgXCJcIilcbiAgICA6IHBpZWNlc1swXSA9PT0gXCIgXCJcbiAgICAgID8gcGllY2VDb2Rlc1RvRmVuUm93KHBpZWNlcy5zbGljZSgxKSwgcmVzdWx0LCBlbXB0aWVzICsgMSlcbiAgICAgIDogcGllY2VDb2Rlc1RvRmVuUm93KFxuICAgICAgICAgIHBpZWNlcy5zbGljZSgxKSxcbiAgICAgICAgICByZXN1bHQgKyAoZW1wdGllcyB8fCBcIlwiKSArIHBpZWNlc1swXSxcbiAgICAgICAgICAwXG4gICAgICAgICk7XG5cbi8qKlxuICogVHJhbnNsYXRlcyBhIGZlbiByb3cgY29kZSAocGFydCBiZXR3ZWVuIC8uLi4vKSB0byBhIGxpc3Qgb2YgcGllY2VzLFxuICogaW4gd2hpY2ggZW1wdHkgc3F1YXJlcyBhcmUgXCIgXCJcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGZlblJvdyBcbiAqIEByZXR1cm5zIFtzdHJpbmddXG4gKi9cbmNvbnN0IGZlblJvd1RvUGllY2VDb2RlcyA9IGZlblJvdyA9PlxuICBmZW5Sb3dcbiAgICAuc3BsaXQoXCJcIilcbiAgICAucmVkdWNlKChhY2MsIHApID0+IGFjYy5jb25jYXQoK3AgPiAwID8gQXJyYXkoK3ApLmZpbGwoXCIgXCIpIDogcCksIFtdKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBGRU4gc3RyaW5nIGluIHRvIGEgZ2FtZSBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGZlbiBcbiAqIEByZXR1cm5zIHtHYW1lU3RhdGV9XG4gKi9cbmNvbnN0IGZlblRvR2FtZVN0YXRlID0gZmVuID0+IHtcbiAgY29uc3QgW3Jvd3MsIHRvTW92ZSwgY2FzdGxlcywgZW5QYXNzYW50LCBoYWxmTW92ZXMsIGZ1bGxNb3Zlc10gPSBmZW5QYXJ0cyhcbiAgICBmZW5cbiAgKTtcblxuICBjb25zdCBib2FyZCA9IHJvd3NcbiAgICAuc3BsaXQoXCIvXCIpXG4gICAgLm1hcCh0cmltKVxuICAgIC5tYXAoZmVuUm93VG9QaWVjZUNvZGVzKTtcblxuICByZXR1cm4gR2FtZVN0YXRlKGJvYXJkLCB0b01vdmUsIGNhc3RsZXMsIGVuUGFzc2FudCwgaGFsZk1vdmVzLCBmdWxsTW92ZXMpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIEZFTiBzdHJpbmcgZnJvbSBhIEdhbWVTdGF0ZVxuICogXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBnYW1lU3RhdGVUb0ZlbiA9IHN0YXRlID0+IHtcbiAgY29uc3Qgcm93cyA9IHN0YXRlLmJvYXJkLm1hcChwID0+IHBpZWNlQ29kZXNUb0ZlblJvdyhwKSk7XG5cbiAgcmV0dXJuIFtcbiAgICByb3dzLmpvaW4oXCIvXCIpLFxuICAgIHN0YXRlLndoaXRlVG9Nb3ZlID8gXCJ3XCIgOiBcImJcIixcbiAgICBbXG4gICAgICBzdGF0ZS53aGl0ZUNhbkNhc3RsZVNob3J0ID8gXCJLXCIgOiBcIlwiLFxuICAgICAgc3RhdGUud2hpdGVDYW5DYXN0bGVMb25nID8gXCJRXCIgOiBcIlwiLFxuICAgICAgc3RhdGUuYmxhY2tDYW5DYXN0bGVTaG9ydCA/IFwia1wiIDogXCJcIixcbiAgICAgIHN0YXRlLmJsYWNrQ2FuQ2FzdGxlTG9uZyA/IFwicVwiIDogXCJcIlxuICAgIF0uam9pbihcIlwiKSB8fCBcIi1cIixcbiAgICBzdGF0ZS5lblBhc3NhbnQgfHwgXCItXCIsXG4gICAgc3RhdGUuaGFsZk1vdmVzLFxuICAgIHN0YXRlLm1vdmVOclxuICBdLmpvaW4oXCIgXCIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBmZW5Ub0dhbWVTdGF0ZSxcbiAgZ2FtZVN0YXRlVG9GZW4sXG4gIFNUQVJUX1BPU0lUSU9OXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvRkVOLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5pbXBvcnQgeyBNb3ZlIH0gZnJvbSBcIi4vLi4vTW92ZXNcIjtcblxuaW1wb3J0IHsgcGllY2VJc0JsYWNrLCBwaWVjZUlzV2hpdGUsIHBpZWNlSXNFbXB0eSB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5cbi8qKlxuICogUmV0dXJucyBhIGxpc3Qgb2YgcG9zc2libGUgbW92ZXMgZm9yIGEgc3F1YXJlIHRoYXQgaG9sZHMgYSBwYXduXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFBhd25Nb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gc3RhdGUuYm9hcmQ7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgc3F1YXJlKTtcbiAgY29uc3QgaXNCbGFjayA9IHBpZWNlSXNCbGFjayhwaWVjZSk7XG5cbiAgY29uc3QgY2FuVGFrZSA9ICh7IHNxdWFyZSwgcGllY2UgfSkgPT5cbiAgICAvLyBUaGVyZSdzIHBpZWNlIGluZm9cbiAgICBwaWVjZSAmJlxuICAgIC8vIFRoZSBzcXVhcmUgaXMgb24gdGhlIGJvYXJkXG4gICAgc3F1YXJlLmluQm91bmRzICYmXG4gICAgLy8gVGhlcmUncyBhIHBpZWNlIG9mIHRoZSBvcHBvc2l0ZSBjb2xvciBPUlxuICAgIC8vIGl0J3MgdGhlIHN0YXRlJ3MgZW4gcGFzc2FudCBzcXVhcmVcbiAgICAoKGlzQmxhY2sgPyBwaWVjZUlzV2hpdGUocGllY2UpIDogcGllY2VJc0JsYWNrKHBpZWNlKSkgfHxcbiAgICAgIHN0YXRlLmVuUGFzc2FudCA9PT0gc3F1YXJlLmNvZGUpO1xuXG4gIGNvbnN0IGNhbk1vdmUgPSAoeyBzcXVhcmUsIHBpZWNlIH0pID0+IHNxdWFyZS5pbkJvdW5kcyAmJiBwaWVjZUlzRW1wdHkocGllY2UpO1xuXG4gIGNvbnN0IGlzU3RhcnRQb3MgPSBpc0JsYWNrID8gc3F1YXJlLnJvdyA9PT0gMSA6IHNxdWFyZS5yb3cgPT09IDY7XG5cbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtcbiAgICBpc0JsYWNrID8gWzEsIDBdIDogWy0xLCAwXSwgLy8gRmlyc3Qgc3RlcFxuICAgIGlzQmxhY2sgPyBbMiwgMF0gOiBbLTIsIDBdLCAvLyBTZWNvbmQgc3RlcFxuICAgIGlzQmxhY2sgPyBbMSwgLTFdIDogWy0xLCAtMV0sIC8vIFRha2VzIGxlZnRcbiAgICBpc0JsYWNrID8gWzEsIDFdIDogWy0xLCAxXSAvLyBUYWtlcyByaWdodFxuICBdO1xuXG4gIGNvbnN0IHBpZWNlc0F0VmFsaWRTcXVhcmVzID0gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLm1hcChzID0+ICh7XG4gICAgICBwaWVjZTogcy5pbkJvdW5kcyA/IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHMpIDogbnVsbCxcbiAgICAgIHNxdWFyZTogc1xuICAgIH0pKTtcblxuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBbZmlyc3RTdGVwLCBzZWNvbmRTdGVwLCB0YWtlc0xlZnQsIHRha2VzUmlnaHRdID0gcGllY2VzQXRWYWxpZFNxdWFyZXM7XG5cbiAgaWYgKGNhbk1vdmUoZmlyc3RTdGVwKSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIGZpcnN0U3RlcC5zcXVhcmUsIHN0YXRlKSk7XG5cbiAgICBpZiAoaXNTdGFydFBvcyAmJiBjYW5Nb3ZlKHNlY29uZFN0ZXApKSB7XG4gICAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBzZWNvbmRTdGVwLnNxdWFyZSwgc3RhdGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2FuVGFrZSh0YWtlc0xlZnQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNMZWZ0LnNxdWFyZSwgc3RhdGUpKTtcbiAgfVxuXG4gIGlmIChjYW5UYWtlKHRha2VzUmlnaHQpKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgdGFrZXNSaWdodC5zcXVhcmUsIHN0YXRlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbW92ZXMvcGF3bi5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0geyp9IHN0YXRlIFxuICogQHBhcmFtIHsqfSBzcXVhcmUgXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLbmlnaHRNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXRTcXVhcmVNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDJdLFxuICAgIFsxLCAtMl0sXG4gICAgWy0xLCAyXSxcbiAgICBbLTEsIC0yXSxcbiAgICBbMiwgLTFdLFxuICAgIFsyLCAxXSxcbiAgICBbLTIsIC0xXSxcbiAgICBbLTIsIDFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tuaWdodC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0U3F1YXJlTW92ZXMgfSBmcm9tIFwiLi9zcXVhcmVCYXNlZFwiO1xuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldEtpbmdNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIC8vIFRPRE86IChTaW1vbikgQ2FzdGxpbmdcbiAgcmV0dXJuIGdldFNxdWFyZU1vdmVzKHN0YXRlLCBzcXVhcmUsIFtcbiAgICBbMSwgMF0sXG4gICAgWzEsIDFdLFxuICAgIFswLCAxXSxcbiAgICBbLTEsIDFdLFxuICAgIFstMSwgMF0sXG4gICAgWy0xLCAtMV0sXG4gICAgWzAsIC0xXSxcbiAgICBbMSwgLTFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2tpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldERpcmVjdGlvbmFsTW92ZXMgfSBmcm9tIFwiLi9kaXJlY3Rpb25CYXNlZFwiO1xuaW1wb3J0IHsgZ2V0QmlzaG9wTW92ZXMgfSBmcm9tIFwiLi9iaXNob3BcIjtcbmltcG9ydCB7IGdldFJvb2tNb3ZlcyB9IGZyb20gXCIuL3Jvb2tcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRRdWVlbk1vdmVzID0gKHN0YXRlLCBzcXVhcmUpID0+IHtcbiAgcmV0dXJuIGdldEJpc2hvcE1vdmVzKHN0YXRlLCBzcXVhcmUpLmNvbmNhdChnZXRSb29rTW92ZXMoc3RhdGUsIHNxdWFyZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3F1ZWVuLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9