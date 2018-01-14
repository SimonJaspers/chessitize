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

const edgePixelCountDiff = (ctxBefore, ctxAfter) => {
  // Note: (Simon) The board has to be square
  const squareSize = ctxBefore.canvas.width / 8;
  const THRESHOLD = 20;

  const changes = __WEBPACK_IMPORTED_MODULE_0__Square__["a" /* default */].allInBoard().map(square => {
    const before = getImageDataForSquare(square, squareSize, ctxBefore);
    const after = getImageDataForSquare(square, squareSize, ctxAfter);

    const gsBefore = rgbaToGreyScaleValues(before.data);
    const gsAfter = rgbaToGreyScaleValues(after.data);

    const edgesBefore = gsBefore.map((v, i, all) =>
      edgeValue(THRESHOLD, squareSize, all, i)
    );

    const edgesAfter = gsAfter.map((v, i, all) =>
      edgeValue(THRESHOLD, squareSize, all, i)
    );

    edgesBefore.forEach((v, i) => {
      if (v === 0) return;
      i *= 4;
      before.data[i + 0] = 255;
      before.data[i + 1] = 0;
      before.data[i + 2] = 0;
    });

    const debugCvs = document.createElement("canvas");
    debugCvs.width = debugCvs.height = squareSize;
    debugCvs.getContext("2d").putImageData(before, 0, 0);

    return {
      square,
      before,
      after,
      difference: totalDiff(edgesBefore, edgesAfter),
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

  this.lastChanges = ko.observableArray([]).extend({ rateLimit: 40 });

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
  init: (el, va) =>
    ko.computed(() => ko.unwrap(va()).forEach(e => el.appendChild(e)))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWM3NjUxNDliOGQ3OTAwN2VlY2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NxdWFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9waWVjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWVTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvZGlyZWN0aW9uQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlSGFuZGxpbmcvc3F1YXJlQ2hhbmdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvc3F1YXJlQmFzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2Jpc2hvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvcm9vay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWFnZUhhbmRsaW5nL3BlcnNwZWN0aXZlVHJhbnNmb3JtLmpzIiwid2VicGFjazovLy8uL3NyYy9GRU4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL3Bhd24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vdmVzL2tuaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMva2luZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW92ZXMvcXVlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7O0FDbEI4QjtBQUNMO0FBQ0Y7QUFDdkI7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUEiLCJmaWxlIjoiLi9saWIvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVjNzY1MTQ5YjhkNzkwMDdlZWNlIiwiaW1wb3J0IHsgcmFuZ2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCByb3dPcmRlciA9IFwiODc2NTQzMjFcIjtcbmNvbnN0IGZpbGVPcmRlciA9IFwiYWJjZGVmZ2hcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3F1YXJlIGluIGEgY2hlc3MgYm9hcmQgd2l0aG91dCBpdHMgY29udGVudHNcbiAqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTcXVhcmVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByb3dcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaWxlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY29kZSAtIE5hbWUgb2YgdGhlIHNxdWFyZVxuICogQHByb3BlcnR5IHtbbnVtYmVyXX0gY29vcmQgLSByb3cgYW5kIGZpbGUgbnJzIGluIGFycmF5XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGluQm91bmRzIC0gaXMgdGhpcyBhIGxlZ2FsIHNxdWFyZVxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgc3F1YXJlIGJ5IHJvdyBhbmQgZmlsZSBuci5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gcm93TnJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmaWxlTnJcbiAqIEByZXR1cm5zIHtTcXVhcmV9XG4gKi9cbmNvbnN0IFNxdWFyZSA9IChyb3dOciwgZmlsZU5yKSA9PiAoe1xuICByb3c6IHJvd05yLFxuICBmaWxlOiBmaWxlTnIsXG4gIGluZGV4OiByb3dOciAqIDggKyBmaWxlTnIsXG4gIGNvZGU6IGAke2ZpbGVPcmRlcltmaWxlTnJdfSR7cm93T3JkZXJbcm93TnJdfWAsXG4gIGNvb3JkOiBbcm93TnIsIGZpbGVOcl0sXG4gIGluQm91bmRzOiByb3dOciA+PSAwICYmIHJvd05yIDw9IDcgJiYgZmlsZU5yID49IDAgJiYgZmlsZU5yIDw9IDdcbn0pO1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3F1YXJlIGZvciBhIHNxdWFyZSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLmZyb21Db2RlID0gY29kZSA9PlxuICBTcXVhcmUocm93T3JkZXIuaW5kZXhPZihjb2RlWzFdKSwgZmlsZU9yZGVyLmluZGV4T2YoY29kZVswXSkpO1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3F1YXJlIGZvciBhIGNvb3JkaW5hdGUgYXJyYXlcbiAqIEBwYXJhbSB7W251bWJlcl19IGNvb3JkcyAtIFtyb3dOciwgZmlsZU5yXVxuICovXG5TcXVhcmUuZnJvbUNvb3JkID0gKFtyb3dOciwgZmlsZU5yXSkgPT4gU3F1YXJlKHJvd05yLCBmaWxlTnIpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc3F1YXJlIGJhc2VkIG9uIGFuIG9sZCBzcXVhcmUgYW5kIGEgZGVsdGFcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIC0gVGhlIHJlZmVyZW5jZSBzcXVhcmVcbiAqIEBwYXJhbSB7W251bWJlcl19IGRlbHRhIC0gVGhlIGRSb3cgYW5kIGRGaWxlIHRvIHRyYW5zbGF0ZVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLnJlbGF0aXZlRnJvbSA9ICh7IHJvdywgZmlsZSB9LCBbZFJvdywgZEZpbGVdKSA9PlxuICBTcXVhcmUocm93ICsgZFJvdywgZmlsZSArIGRGaWxlKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3F1YXJlIGZvciBhbiBpbmRleCBzdGFydGluZyBsZWZ0IHRvIHJpZ2h0LCB0b3AgdG8gYm90dG9tXG4gKiBAcGFyYW0ge051bWJlcn0gaVxuICogQHJldHVybnMge1NxdWFyZX1cbiAqL1xuU3F1YXJlLmZyb21JbmRleCA9IGkgPT4gU3F1YXJlKE1hdGguZmxvb3IoaSAvIDgpLCBpICUgOCk7XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBhbGwgdGhlIHNxdWFyZXMgaW4gYSBjaGVzcyBib2FyZFxuICogQHJldHVybnMge1tTcXVhcmVdfVxuICovXG5TcXVhcmUuYWxsSW5Cb2FyZCA9ICgpID0+XG4gIHJhbmdlKDY0KVxuICAgIC5tYXAoaSA9PiBbTWF0aC5mbG9vcihpIC8gOCksIGkgJSA4XSlcbiAgICAubWFwKFNxdWFyZS5mcm9tQ29vcmQpO1xuXG5leHBvcnQgZGVmYXVsdCBTcXVhcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9TcXVhcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBSZXR1cm5zIGEgYm9hcmQgdGhhdCBob2xkcyBhIGRlZmF1bHQgc3RhcnQgcG9zaXRpb25cbiAqIEByZXR1cm5zIHtbW3N0cmluZ11dfVxuICovXG5leHBvcnQgY29uc3QgU3RhcnRQb3NpdGlvbiA9ICgpID0+IFtcbiAgW1wiclwiLCBcIm5cIiwgXCJiXCIsIFwicVwiLCBcImtcIiwgXCJiXCIsIFwiblwiLCBcInJcIl0sXG4gIFtcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCIsIFwicFwiLCBcInBcIiwgXCJwXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIl0sXG4gIFtcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCJdLFxuICBbXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiLCBcIiBcIiwgXCIgXCIsIFwiIFwiXSxcbiAgW1wiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIiwgXCJQXCIsIFwiUFwiLCBcIlBcIl0sXG4gIFtcIlJcIiwgXCJOXCIsIFwiQlwiLCBcIlFcIiwgXCJLXCIsIFwiQlwiLCBcIk5cIiwgXCJSXCJdXG5dO1xuXG5jb25zdCBjbG9uZSA9IGJvYXJkID0+IGJvYXJkLnNsaWNlKDApLm1hcChyb3cgPT4gcm93LnNsaWNlKDApKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwaWVjZSAoXCIgXCIgaWYgZW1wdHkpIGF0IGEgcG9zaXRpb24gaW4gYSBib2FyZFxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UGllY2VBdFNxdWFyZSA9IChib2FyZCwgc3F1YXJlKSA9PlxuICBib2FyZFtzcXVhcmUucm93XVtzcXVhcmUuZmlsZV07XG5cbi8qKlxuICogU2V0cyB0aGUgc3F1YXJlIGluIGEgYm9hcmQgdG8gYSAocGllY2UvZW1wdHkpIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7W1tzdHJpbmddXX0gYm9hcmQgXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlIFxuICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIFxuICovXG5jb25zdCBzZXRTcXVhcmVTdHJpbmcgPSAoYm9hcmQsIHNxdWFyZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgbmV3Qm9hcmQgPSBjbG9uZShib2FyZCk7XG4gIG5ld0JvYXJkW3NxdWFyZS5yb3ddW3NxdWFyZS5maWxlXSA9IHZhbHVlO1xuICByZXR1cm4gbmV3Qm9hcmQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgcGllY2UgaW4gd2hpY2ggdGhlIGZyb21TcXVhcmUgaXMgZW1wdHksIGFuZFxuICogdGhlIHRvU3F1YXJlIGhhcyB0aGUgbW92ZWQgcGllY2UuIE5vdGU6IHRoaXMgZnVuY3Rpb24gZG9lc1xuICogbm90IHBlcmZvcm0gYW55IHZhbGlkaXR5IGNoZWNrc1xuICogXG4gKiBAcGFyYW0ge1tbc3RyaW5nXV19IGJvYXJkIFxuICogQHBhcmFtIHtTcXVhcmV9IGZyb21TcXVhcmUgXG4gKiBAcGFyYW0ge1NxdWFyZX0gdG9TcXVhcmUgXG4gKiBAcmV0dXJucyB7W1tzdHJpbmddXX1cbiAqL1xuZXhwb3J0IGNvbnN0IG1vdmVQaWVjZUluQm9hcmQgPSAoYm9hcmQsIGZyb21TcXVhcmUsIHRvU3F1YXJlKSA9PlxuICBzZXRTcXVhcmVTdHJpbmcoXG4gICAgc2V0U3F1YXJlU3RyaW5nKGJvYXJkLCBmcm9tU3F1YXJlLCBcIiBcIiksIC8vIEJvYXJkIHdpdGhvdXQgZnJvbVNxdWFyZVxuICAgIHRvU3F1YXJlLFxuICAgIGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIGZyb21TcXVhcmUpIC8vIEdldCB2YWx1ZSBmcm9tIG9sZCBzcXVhcmVcbiAgKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0JvYXJkLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBHYW1lU3RhdGUsIHtcbiAgYXBwbHlNb3ZlVG9HYW1lU3RhdGUsXG4gIHdoaXRlSW5DaGVjayxcbiAgYmxhY2tJbkNoZWNrLFxuICBibGFja1BpZWNlQXR0YWNrc1NxdWFyZSxcbiAgd2hpdGVQaWVjZUF0dGFja3NTcXVhcmVcbn0gZnJvbSBcIi4vR2FtZVN0YXRlXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuL1NxdWFyZVwiO1xuXG5pbXBvcnQgeyBnZXRQYXduTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9wYXduXCI7XG5pbXBvcnQgeyBnZXRLbmlnaHRNb3ZlcyB9IGZyb20gXCIuL21vdmVzL2tuaWdodFwiO1xuaW1wb3J0IHsgZ2V0S2luZ01vdmVzIH0gZnJvbSBcIi4vbW92ZXMva2luZ1wiO1xuXG5pbXBvcnQge1xuICBwaWVjZUlzQmxhY2ssXG4gIHBpZWNlSXNXaGl0ZSxcbiAgcGllY2VJc0VtcHR5LFxuICBwaWVjZXNBcmVTYW1lQ29sb3IsXG4gIHBpZWNlQ2FuVGFrZVBpZWNlXG59IGZyb20gXCIuL3BpZWNlXCI7XG5cbmltcG9ydCB7IGdldFBpZWNlQXRTcXVhcmUgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgZ2V0QmlzaG9wTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9iaXNob3BcIjtcbmltcG9ydCB7IGdldFF1ZWVuTW92ZXMgfSBmcm9tIFwiLi9tb3Zlcy9xdWVlblwiO1xuaW1wb3J0IHsgZ2V0Um9va01vdmVzIH0gZnJvbSBcIi4vbW92ZXMvcm9va1wiO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIHBvc3NpYmxlIG1vdmVzIGZvciBhIHBpZWNlIG9uIGEgc3F1YXJlXG4gKiBpbiBhIGdhbWVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5jb25zdCBnZXRNb3Zlc0ZvclBpZWNlID0gKHN0YXRlLCBzcXVhcmUsIHBpZWNlKSA9PiB7XG4gIHN3aXRjaCAocGllY2UpIHtcbiAgICBjYXNlIFwicFwiOlxuICAgIGNhc2UgXCJQXCI6XG4gICAgICByZXR1cm4gZ2V0UGF3bk1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJuXCI6XG4gICAgY2FzZSBcIk5cIjpcbiAgICAgIHJldHVybiBnZXRLbmlnaHRNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwia1wiOlxuICAgIGNhc2UgXCJLXCI6XG4gICAgICByZXR1cm4gZ2V0S2luZ01vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGNhc2UgXCJiXCI6XG4gICAgY2FzZSBcIkJcIjpcbiAgICAgIHJldHVybiBnZXRCaXNob3BNb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwicVwiOlxuICAgIGNhc2UgXCJRXCI6XG4gICAgICByZXR1cm4gZ2V0UXVlZW5Nb3ZlcyhzdGF0ZSwgc3F1YXJlKTtcbiAgICBjYXNlIFwiclwiOlxuICAgIGNhc2UgXCJSXCI6XG4gICAgICByZXR1cm4gZ2V0Um9va01vdmVzKHN0YXRlLCBzcXVhcmUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gW107XG4gIH1cbn07XG5cbi8qKlxuICogTW92ZVxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE1vdmVcbiAqIEBwcm9wZXJ0eSB7U3F1YXJlfSBmcm9tXG4gKiBAcHJvcGVydHkge1NxdWFyZX0gdG9cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdGFrZXNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcGF3bk1vdmVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdGFrZXNLaW5nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGNhc3RsZXNcbiAqXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgbW92ZSB0byBoZWxwIGNyZWF0ZSBhIFBHTiBzdGVwXG4gKiBAcGFyYW0ge1NxdWFyZX0gZnJvbVxuICogQHBhcmFtIHtTcXVhcmV9IHRvXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEByZXR1cm5zIHtNb3ZlfVxuICovXG5leHBvcnQgY29uc3QgTW92ZSA9IChmcm9tLCB0bywgc3RhdGUpID0+ICh7XG4gIGZyb20sXG4gIHRvLFxuICB0YWtlczogcGllY2VDYW5UYWtlUGllY2UoXG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSksXG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgdG8pXG4gICksXG4gIHRha2VzS2luZzogZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgdG8pLnRvTG93ZXJDYXNlKCkgPT09IFwia1wiLFxuICBwYXduTW92ZTogZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSkudG9Mb3dlckNhc2UoKSA9PT0gXCJwXCIsXG4gIGNhc3RsZXM6XG4gICAgZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgZnJvbSkudG9Mb3dlckNhc2UoKSA9PT0gXCJrXCIgJiZcbiAgICBNYXRoLmFicyhmcm9tLmZpbGUgLSB0by5maWxlKSA9PT0gMlxufSk7XG5cbi8qKlxuICogUmV0dXJucyBhIHNlcmllcyBvZiBtb3ZlcyBhIHBpZWNlIGNhbiBtYWtlIG9uIGEgYm9hcmQuXG4gKiBXaWxsIG5vdCBpbmNsdWRlIGNhc3RsZXMgb3IgZW4gcGFzc2FudCwgdGhvc2UgYXJlIGhhbmRsZWRcbiAqIHNlcGVyYXRlbHlcbiAqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gc3RhdGUuYm9hcmQ7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShib2FyZCwgc3F1YXJlKTtcblxuICBpZiAocGllY2UgPT09IFwiIFwiKSByZXR1cm4gW107XG5cbiAgLy8gR2V0IGFsbCBtb3ZlcyBmb3IgdGhlIHBpZWNlIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgaWxsZWdhbCBtb3Zlc1xuICByZXR1cm4gZ2V0TW92ZXNGb3JQaWVjZShzdGF0ZSwgc3F1YXJlLCBwaWVjZSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtbc3RyaW5nXX0gZW1wdHlTcXVhcmVDb2Rlc1xuICogQHBhcmFtIHtbc3RyaW5nXX0gc2FmZVNxdWFyZUNvZGVzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgY2FzdGxpbmdQcmV2ZW50ZWQgPSAoc3RhdGUsIGVtcHR5U3F1YXJlQ29kZXMsIHNhZmVTcXVhcmVDb2RlcykgPT4ge1xuICBjb25zdCBjbGVhclBhdGggPSBlbXB0eVNxdWFyZUNvZGVzXG4gICAgLm1hcChTcXVhcmUuZnJvbUNvZGUpXG4gICAgLm1hcChzcSA9PiBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpXG4gICAgLmV2ZXJ5KHBpZWNlSXNFbXB0eSk7XG5cbiAgaWYgKCFjbGVhclBhdGgpIHJldHVybiB0cnVlO1xuXG4gIGNvbnN0IGF0dGFja0NlY2sgPSBzdGF0ZS53aGl0ZVRvTW92ZVxuICAgID8gYmxhY2tQaWVjZUF0dGFja3NTcXVhcmVcbiAgICA6IHdoaXRlUGllY2VBdHRhY2tzU3F1YXJlO1xuXG4gIGNvbnN0IHVuZGVyQXR0YWNrID0gc2FmZVNxdWFyZUNvZGVzXG4gICAgLm1hcChTcXVhcmUuZnJvbUNvZGUpXG4gICAgLnNvbWUoc3EgPT4gYXR0YWNrQ2VjayhzdGF0ZSwgc3EpKTtcblxuICByZXR1cm4gdW5kZXJBdHRhY2s7XG59O1xuXG5jb25zdCBjYXN0bGVNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3F1YXJlKTtcbiAgY29uc3QgbW92ZXMgPSBbXTtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBLOiB7XG4gICAgICBsb25nOiB7XG4gICAgICAgIHBhdGg6IFtcImIxXCIsIFwiYzFcIiwgXCJkMVwiXSxcbiAgICAgICAgc2FmZTogW1wiYTFcIiwgXCJjMVwiLCBcImQxXCIsIFwiZTFcIl1cbiAgICAgIH0sXG4gICAgICBzaG9ydDoge1xuICAgICAgICBwYXRoOiBbXCJmMVwiLCBcImcxXCJdLFxuICAgICAgICBzYWZlOiBbXCJmMVwiLCBcImcxXCIsIFwiaDFcIiwgXCJlMVwiXVxuICAgICAgfVxuICAgIH0sXG4gICAgazoge1xuICAgICAgbG9uZzoge1xuICAgICAgICBwYXRoOiBbXCJiOFwiLCBcImM4XCIsIFwiZDhcIl0sXG4gICAgICAgIHNhZmU6IFtcImE4XCIsIFwiYzhcIiwgXCJkOFwiLCBcImU4XCJdXG4gICAgICB9LFxuICAgICAgc2hvcnQ6IHtcbiAgICAgICAgcGF0aDogW1wiZjhcIiwgXCJnOFwiXSxcbiAgICAgICAgc2FmZTogW1wiZjhcIiwgXCJnOFwiLCBcImg4XCIsIFwiZThcIl1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2FuQ2FzdGxlTG9uZyA9IHBpZWNlSXNCbGFjayhwaWVjZSlcbiAgICA/IHN0YXRlLmJsYWNrQ2FuQ2FzdGxlTG9uZ1xuICAgIDogc3RhdGUud2hpdGVDYW5DYXN0bGVMb25nO1xuXG4gIGNvbnN0IGNhbkNhc3RsZVNob3J0ID0gcGllY2VJc0JsYWNrKHBpZWNlKVxuICAgID8gc3RhdGUuYmxhY2tDYW5DYXN0bGVTaG9ydFxuICAgIDogc3RhdGUud2hpdGVDYW5DYXN0bGVTaG9ydDtcblxuICBjb25zdCBsb25nQ2FzdGxlT3B0cyA9IG9wdHNbcGllY2VdLmxvbmc7XG4gIGNvbnN0IHNob3J0Q2FzdGxlT3B0cyA9IG9wdHNbcGllY2VdLnNob3J0O1xuXG4gIGlmIChcbiAgICBjYW5DYXN0bGVMb25nICYmXG4gICAgIWNhc3RsaW5nUHJldmVudGVkKHN0YXRlLCBsb25nQ2FzdGxlT3B0cy5wYXRoLCBsb25nQ2FzdGxlT3B0cy5zYWZlKVxuICApIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgWzAsIC0yXSksIHN0YXRlKSk7XG4gIH1cblxuICBpZiAoXG4gICAgY2FuQ2FzdGxlU2hvcnQgJiZcbiAgICAhY2FzdGxpbmdQcmV2ZW50ZWQoc3RhdGUsIHNob3J0Q2FzdGxlT3B0cy5wYXRoLCBzaG9ydENhc3RsZU9wdHMuc2FmZSlcbiAgKSB7XG4gICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIFswLCAyXSksIHN0YXRlKSk7XG4gIH1cblxuICByZXR1cm4gbW92ZXM7XG59O1xuXG4vKipcbiAqIEdldHMgYSBsaXN0IG9mIGxlZ2FsIG1vdmVzIGZvciB0aGUgcGllY2Ugb24gYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge1tNb3ZlXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldExlZ2FsTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxdWFyZSk7XG5cbiAgaWYgKHBpZWNlSXNCbGFjayhwaWVjZSkgJiYgIXN0YXRlLmJsYWNrVG9Nb3ZlKSByZXR1cm4gW107XG4gIGlmIChwaWVjZUlzV2hpdGUocGllY2UpICYmICFzdGF0ZS53aGl0ZVRvTW92ZSkgcmV0dXJuIFtdO1xuXG4gIGxldCBtb3ZlcyA9IGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpO1xuXG4gIGlmIChwaWVjZSA9PT0gXCJLXCIgfHwgcGllY2UgPT09IFwia1wiKSB7XG4gICAgbW92ZXMgPSBtb3Zlcy5jb25jYXQoY2FzdGxlTW92ZXMoc3RhdGUsIHNxdWFyZSkpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzLmZpbHRlcihtb3ZlID0+ICFtb3ZlUHV0c093bktpbmdJbkNoZWNrKHN0YXRlLCBtb3ZlKSk7XG59O1xuXG4vKipcbiAqIEdldHMgYSBsaXN0IG9mIGFsbCBsZWdhbCBtb3ZlcyBmb3IgYSBzdGF0ZVxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRBbGxMZWdhbE1vdmVzID0gc3RhdGUgPT5cbiAgU3F1YXJlLmFsbEluQm9hcmQoKS5yZWR1Y2UoXG4gICAgKG1vdmVzLCBzcXVhcmUpID0+IG1vdmVzLmNvbmNhdChnZXRMZWdhbE1vdmVzKHN0YXRlLCBzcXVhcmUpKSxcbiAgICBbXVxuICApO1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgbW92ZVB1dHNPd25LaW5nSW5DaGVjayA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBjb25zdCBtb3ZlZFBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcbiAgY29uc3QgbmV3U3RhdGUgPSBhcHBseU1vdmVUb0dhbWVTdGF0ZShzdGF0ZSwgbW92ZSk7XG5cbiAgcmV0dXJuIHBpZWNlSXNCbGFjayhtb3ZlZFBpZWNlKVxuICAgID8gYmxhY2tJbkNoZWNrKG5ld1N0YXRlKVxuICAgIDogd2hpdGVJbkNoZWNrKG5ld1N0YXRlKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBtb3ZlR2l2ZXNDaGVjayA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBjb25zdCBtb3ZlZFBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcbiAgY29uc3QgbmV3U3RhdGUgPSBhcHBseU1vdmVUb0dhbWVTdGF0ZShzdGF0ZSwgbW92ZSk7XG5cbiAgcmV0dXJuIHBpZWNlSXNCbGFjayhtb3ZlZFBpZWNlKVxuICAgID8gd2hpdGVJbkNoZWNrKG5ld1N0YXRlKVxuICAgIDogYmxhY2tJbkNoZWNrKG5ld1N0YXRlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Nb3Zlcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUlzRW1wdHkgPSBwaWVjZSA9PiBwaWVjZSA9PT0gXCIgXCI7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNXaGl0ZSA9IHBpZWNlID0+XG4gICEhcGllY2UgJiYgIXBpZWNlSXNFbXB0eShwaWVjZSkgJiYgcGllY2UudG9VcHBlckNhc2UoKSA9PT0gcGllY2U7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlSXNCbGFjayA9IHBpZWNlID0+XG4gICEhcGllY2UgJiYgIXBpZWNlSXNFbXB0eShwaWVjZSkgJiYgcGllY2UudG9Mb3dlckNhc2UoKSA9PT0gcGllY2U7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHAxXG4gKiBAcGFyYW0ge3N0cmluZ30gcDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VzQXJlU2FtZUNvbG9yID0gKHAxLCBwMikgPT5cbiAgKHBpZWNlSXNXaGl0ZShwMSkgJiYgcGllY2VJc1doaXRlKHAyKSkgfHxcbiAgKHBpZWNlSXNCbGFjayhwMSkgJiYgcGllY2VJc0JsYWNrKHAyKSk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHAxXG4gKiBAcGFyYW0ge3N0cmluZ30gcDJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgcGllY2VDYW5UYWtlUGllY2UgPSAocDEsIHAyKSA9PlxuICAocGllY2VJc1doaXRlKHAxKSAmJiBwaWVjZUlzQmxhY2socDIpKSB8fFxuICAocGllY2VJc0JsYWNrKHAxKSAmJiBwaWVjZUlzV2hpdGUocDIpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BpZWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVHJpbSBhIHN0cmluZyB1c2luZyBuYXRpdmUgdHJpbVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHRyaW0gPSBzdHIgPT4gc3RyLnRyaW0oKTtcblxuLyoqXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc09iamVjdCA9IHggPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuXG4vKipcbiAqIE1hcHMgYXJyYXlzIG9yIG9iamVjdHNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGYgLSBhIC0+IGJcbiAqIEBwYXJhbSB7Kn0gZnVuY3RvclxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBtYXAgPSAoZiwgZnVuY3RvcikgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmdW5jdG9yKSB8fCB0eXBlb2YgZi5tYXAgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZnVuY3Rvci5tYXAoZik7XG5cbiAgaWYgKGlzT2JqZWN0KGZ1bmN0b3IpKVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhmdW5jdG9yKS5yZWR1Y2UoXG4gICAgICAobywgW2ssIHZdKSA9PiBPYmplY3QuYXNzaWduKG8sIHsgW2tdOiBmKHYpIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiBmdW5jdG9yO1xufTtcblxuLyoqXG4gKiBGaWx0ZXJzIGFycmF5cyBvciBvYmplY3RzLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJlZCAtIEZpbHRlciBmdW5jdGlvbiBvZiB4IC0+IGJvb2xcbiAqIEBwYXJhbSB7Kn0gZmlsdGVyYWJsZVxuICogQHJldHVybnMgeyp9XG4gKi9cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAocHJlZCwgZmlsdGVyYWJsZSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJhYmxlKSB8fCB0eXBlb2YgZmlsdGVyYWJsZS5maWx0ZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICByZXR1cm4gZmlsdGVyYWJsZS5maWx0ZXIocHJlZCk7XG5cbiAgaWYgKGlzT2JqZWN0KGZpbHRlcmFibGUpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGZpbHRlcmFibGUpLnJlZHVjZShcbiAgICAgIChvLCBbaywgdl0pID0+IE9iamVjdC5hc3NpZ24obywgcHJlZCh2KSA/IHsgW2tdOiB2IH0gOiB7fSksXG4gICAgICB7fVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyYWJsZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmFuZ2Ugb2YgbnVtYmVycywgc3RhcnRpbmcgYXQgMVxuICogQHBhcmFtIHtudW1iZXJ9IG4gLSBUaGUgbGVuZ3RoL2VuZCBvZiB0aGUgcmFuZ2VcbiAqIEByZXR1cm5zIHtbbnVtYmVyXX1cbiAqL1xuZXhwb3J0IGNvbnN0IHJhbmdlID0gbiA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBuIH0sIChfLCBpKSA9PiBpKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgY29tYmluYXRpb25zIG9mIHR3byBhcnJheXNcbiAqIEBwYXJhbSB7WypdfSB4c1xuICogQHBhcmFtIHtbKl19IHlzXG4gKiBAcmV0dXJucyB7W1sqXV19XG4gKi9cbmV4cG9ydCBjb25zdCB4UHJvZCA9ICh4cywgeXMpID0+XG4gIHhzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KHlzLm1hcCh5ID0+IFt4LCB5XSkpLCBbXSk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHByb3AgPSBrZXkgPT4gb2JqID0+IG9ialtrZXldO1xuXG4vKipcbiAqIENvbXBvc2UgMlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZ1xuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG5leHBvcnQgY29uc3QgY29tcG9zZSA9IChmLCBnKSA9PiB4ID0+IGYoZyh4KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTdGFydFBvc2l0aW9uLCBtb3ZlUGllY2VJbkJvYXJkLCBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUsIGdldE1vdmVzIH0gZnJvbSBcIi4vTW92ZXNcIjtcbmltcG9ydCB7IGNvbXBvc2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgcGllY2VJc0JsYWNrLCBwaWVjZUlzV2hpdGUgfSBmcm9tIFwiLi9waWVjZVwiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY2hlc3MgYm9hcmQgZHVyaW5nIGEgZ2FtZVxuICogQHR5cGVkZWYge09iamVjdH0gR2FtZVN0YXRlXG4gKiBAcHJvcGVydHkge1tbc3RyaW5nXV19IGJvYXJkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdoaXRlVG9Nb3ZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJsYWNrVG9Nb3ZlXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHdoaXRlQ2FuQ2FzdGxlU2hvcnRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gd2hpdGVDYW5DYXN0bGVMb25nXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGJsYWNrQ2FuQ2FzdGxlU2hvcnRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmxhY2tDYW5DYXN0bGVMb25nXG4gKiBAcHJvcGVydHkge3N0cmluZz99IGVuUGFzc2FudCAtIFBvc2l0aW9uIGJlaGluZCBhIHBhd24gdGhhdCBqdXN0IG1hZGUgYSAyIHNxdWFyZSBhZHZhbmNlXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGFsZk1vdmVzIC0gSGFsZiBtb3ZlcyBzaW5jZSBsYXN0IGNhcHR1cmUgb3IgcGF3blxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1vdmVOciAtIFRvdGFsIG1vdmVzIGluIGdhbWUuIFN0YXJ0cyBhdCAxLCBpbmNyZW1lbnQgcGVyIGJsYWNrIG1vdmVcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIEdhbWVTdGF0ZVxuICogQHBhcmFtIHtbW3N0cmluZ11dfSBib2FyZCAtIEEgbGlzdCBvZiByb3dzIGNvbnRhaW5pbmcgcGllY2UgY29kZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b01vdmUgLSBcIndcIiBmb3Igd2hpdGUsIFwiYlwiIGZvciBibGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGNhc3RsZU9wdGlvbnMgLSBBbnkgY29tYmluYXRpb24gb2YgXCJLUWtxXCIgZm9yIHdoaXRlL2JsYWNrIGtpbmcvcXVlZW4gc2lkZSBjYXN0bGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IGVuUGFzc2FudFNxdWFyZSAtIFBvc2l0aW9uIGJlaGluZCBhIHBhd24gdGhhdCBqdXN0IG1hZGUgYSAyIHNxdWFyZSBhZHZhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGhhbGZNb3ZlcyAtIEhhbGYgbW92ZXMgc2luY2UgbGFzdCBjYXB0dXJlIG9yIHBhd24gYWR2YW5jZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBmdWxsTW92ZXMgLSBUb3RhbCBtb3ZlcyBpbiBnYW1lLiBTdGFydHMgYXQgMSwgaW5jcmVtZW50IHBlciBibGFjayBtb3ZlXG4gKiBAcmV0dXJucyB7R2FtZVN0YXRlfVxuICovXG5jb25zdCBHYW1lU3RhdGUgPSAoXG4gIGJvYXJkLFxuICB0b01vdmUgPSBcIndcIixcbiAgY2FzdGxlT3B0aW9ucyA9IFwiS1FrcVwiLFxuICBlblBhc3NhbnRTcXVhcmUgPSBcIi1cIixcbiAgaGFsZk1vdmVzID0gMCxcbiAgZnVsbE1vdmVzID0gMVxuKSA9PiB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIGJvYXJkOiBib2FyZCB8fCBTdGFydFBvc2l0aW9uKCksXG4gICAgICAvLyBTaWRlIHRvIG1vdmVcbiAgICAgIHdoaXRlVG9Nb3ZlOiB0b01vdmUgPT09IFwid1wiLFxuICAgICAgYmxhY2tUb01vdmU6IHRvTW92ZSA9PT0gXCJiXCIsXG5cbiAgICAgIC8vIEVuIHBhc3NhbnRcbiAgICAgIGVuUGFzc2FudDogZW5QYXNzYW50U3F1YXJlID09PSBcIi1cIiA/IG51bGwgOiBlblBhc3NhbnRTcXVhcmUsXG4gICAgICAvLyBNb3ZlIG51bWJlcnNcbiAgICAgIGhhbGZNb3ZlczogK2hhbGZNb3ZlcyxcbiAgICAgIG1vdmVOcjogK2Z1bGxNb3Zlc1xuICAgIH0sXG4gICAgY2FzdGxlT3B0aW9uc0Zyb21TdHJpbmcoY2FzdGxlT3B0aW9ucylcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGNhc3RsZVN0clxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgY2FzdGxlT3B0aW9uc0Zyb21TdHJpbmcgPSBjYXN0bGVTdHIgPT4gKHtcbiAgd2hpdGVDYW5DYXN0bGVTaG9ydDogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcIktcIiksXG4gIHdoaXRlQ2FuQ2FzdGxlTG9uZzogY2FzdGxlU3RyICYmIGNhc3RsZVN0ci5pbmNsdWRlcyhcIlFcIiksXG4gIGJsYWNrQ2FuQ2FzdGxlU2hvcnQ6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJrXCIpLFxuICBibGFja0NhbkNhc3RsZUxvbmc6IGNhc3RsZVN0ciAmJiBjYXN0bGVTdHIuaW5jbHVkZXMoXCJxXCIpXG59KTtcblxuY29uc3QgY2FzdGxlU3RyRnJvbU9wdGlvbnMgPSAoe1xuICB3aGl0ZUNhbkNhc3RsZVNob3J0LFxuICB3aGl0ZUNhbkNhc3RsZUxvbmcsXG4gIGJsYWNrQ2FuQ2FzdGxlU2hvcnQsXG4gIGJsYWNrQ2FuQ2FzdGxlTG9uZ1xufSkgPT5cbiAgW1xuICAgIFtcIktcIiwgd2hpdGVDYW5DYXN0bGVTaG9ydF0sXG4gICAgW1wiUVwiLCB3aGl0ZUNhbkNhc3RsZUxvbmddLFxuICAgIFtcImtcIiwgYmxhY2tDYW5DYXN0bGVTaG9ydF0sXG4gICAgW1wicVwiLCBibGFja0NhbkNhc3RsZUxvbmddXG4gIF1cbiAgICAuZmlsdGVyKChbYywgcHJlZF0pID0+IHByZWQpXG4gICAgLm1hcCgoW2MsIHByZWRdKSA9PiBjKVxuICAgIC5qb2luKFwiXCIpO1xuXG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtNb3ZlfSBtb3ZlXG4gKiBAcmV0dXJucyB7c3RyaW5nP31cbiAqL1xuY29uc3QgY2FzdGxlT3B0aW9uc0RpZmYgPSAoc3RhdGUsIG1vdmUpID0+IHtcbiAgbGV0IHByZXZPcHRpb25zID0gY2FzdGxlU3RyRnJvbU9wdGlvbnMoc3RhdGUpO1xuXG4gIGlmICghcHJldk9wdGlvbnMpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbW92ZS5mcm9tKTtcblxuICBzd2l0Y2ggKHBpZWNlKSB7XG4gICAgY2FzZSBcImtcIjpcbiAgICAgIHJldHVybiBwcmV2T3B0aW9ucy5yZXBsYWNlKFwia1wiLCBcIlwiKS5yZXBsYWNlKFwicVwiLCBcIlwiKTtcbiAgICBjYXNlIFwiclwiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UobW92ZS5mcm9tLmZpbGUgPT09IDAgPyBcInFcIiA6IFwia1wiLCBcIlwiKTtcbiAgICBjYXNlIFwiS1wiOlxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zLnJlcGxhY2UoXCJLXCIsIFwiXCIpLnJlcGxhY2UoXCJRXCIsIFwiXCIpO1xuICAgIGNhc2UgXCJSXCI6XG4gICAgICByZXR1cm4gcHJldk9wdGlvbnMucmVwbGFjZShtb3ZlLmZyb20uZmlsZSA9PT0gMCA/IFwiUVwiIDogXCJLXCIsIFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHByZXZPcHRpb25zO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge01vdmV9IG1vdmVcbiAqIEByZXR1cm5zIHtHYW1lU3RhdGV9XG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseU1vdmVUb0dhbWVTdGF0ZSA9IChzdGF0ZSwgbW92ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBtb3ZlUGllY2VJbkJvYXJkKHN0YXRlLmJvYXJkLCBtb3ZlLmZyb20sIG1vdmUudG8pO1xuXG4gIGlmIChtb3ZlLmNhc3RsZXMpIHtcbiAgICAvLyBNb3ZlIHRoZSByb29rIGFzIHdlbGxcbiAgICBjb25zdCBxdWVlblNpZGUgPSBtb3ZlLnRvLmZpbGUgPT09IDI7IC8vIFwiY1wiXG4gICAgY29uc3QgcmVsRnJvbSA9IHF1ZWVuU2lkZSA/IFswLCAtMl0gOiBbMCwgMV07XG4gICAgY29uc3QgcmVsVG8gPSBxdWVlblNpZGUgPyBbMCwgMV0gOiBbMCwgLTFdO1xuXG4gICAgY29uc29sZS5sb2coXG4gICAgICBcIm11c3QgbW92ZSByb29rIGZyb21cIixcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsRnJvbSkuY29kZSxcbiAgICAgIFwidG9cIixcbiAgICAgIFNxdWFyZS5yZWxhdGl2ZUZyb20obW92ZS50bywgcmVsVG8pLmNvZGVcbiAgICApO1xuXG4gICAgYm9hcmQgPSBtb3ZlUGllY2VJbkJvYXJkKFxuICAgICAgYm9hcmQsXG4gICAgICBTcXVhcmUucmVsYXRpdmVGcm9tKG1vdmUudG8sIHJlbEZyb20pLFxuICAgICAgU3F1YXJlLnJlbGF0aXZlRnJvbShtb3ZlLnRvLCByZWxUbylcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIEdhbWVTdGF0ZShcbiAgICBib2FyZCxcbiAgICBzdGF0ZS53aGl0ZVRvTW92ZSA/IFwiYlwiIDogXCJ3XCIsXG4gICAgY2FzdGxlT3B0aW9uc0RpZmYoc3RhdGUsIG1vdmUpLFxuICAgIG1vdmUuaXNQYXduTW92ZSAmJiBtb3ZlLnRvLnJvdyAtIG1vdmUuZnJvbS5yb3cgPT09IDIsIC8vIFRPRE86IChTaW1vbikgZ2V0IGVuIHBhc3NhbnQgc3F1YXJlXG4gICAgc3RhdGUuaGFsZk1vdmVzICsgMSxcbiAgICBzdGF0ZS5tb3ZlTnIgKyAoc3RhdGUud2hpdGVUb01vdmUgPyAxIDogMClcbiAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0NoZWNrID0gc3RhdGUgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKS5zb21lKHNxdWFyZSA9PlxuICAgIGdldE1vdmVzKHN0YXRlLCBzcXVhcmUpLnNvbWUobW92ZSA9PiBtb3ZlLnRha2VzS2luZylcbiAgKTtcbn07XG5cbi8vIFRPRE86IChTaW1vbikgRFJZXG4vLyBOb3RlOiAoU2ltb24pIEhhdmluZyB0byByZWNhbGN1bGF0ZSBhbGwgbW92ZXMgZm9yIGEgY29sb3IgZXZlcnkgdGltZSBvbmVcbi8vICAgICAgICAgICAgICAgb2YgdGhlc2UgbWV0aG9kcyBpcyBjYWxsZWQgaXMgdmVyeSBpbmVmZmljaWVudC4gUHJvYmFibHlcbi8vICAgICAgICAgICAgICAgYmV0dGVyIHRvIHN0b3JlIHBvc3NpYmxlIG1vdmVzIHdpdGggYSBnYW1lIHN0YXRlXG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHdoaXRlSW5DaGVjayA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNCbGFjayhnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxdWFyZSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5zb21lKG1vdmUgPT4gbW92ZS50YWtlc0tpbmcpKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGJsYWNrSW5DaGVjayA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIFNxdWFyZS5hbGxJbkJvYXJkKClcbiAgICAuZmlsdGVyKHNxID0+IHBpZWNlSXNXaGl0ZShnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcSkpKVxuICAgIC5zb21lKHNxdWFyZSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5zb21lKG1vdmUgPT4gbW92ZS50YWtlc0tpbmcpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9uZSBvZiB0aGUgYmxhY2sgcGllY2VzIGF0dGFja3MgYSBzcXVhcmVcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBibGFja1BpZWNlQXR0YWNrc1NxdWFyZSA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBTcXVhcmUuYWxsSW5Cb2FyZCgpXG4gICAgLmZpbHRlcihzcSA9PiBwaWVjZUlzQmxhY2soZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgc3EpKSlcbiAgICAuc29tZShzcSA9PiBnZXRNb3ZlcyhzdGF0ZSwgc3EpLnNvbWUobW92ZSA9PiBtb3ZlLnRvLmNvZGUgPT09IHNxdWFyZS5jb2RlKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvbmUgb2YgdGhlIHdoaXRlIHBpZWNlcyBhdHRhY2tzIGEgc3F1YXJlXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3Qgd2hpdGVQaWVjZUF0dGFja3NTcXVhcmUgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gU3F1YXJlLmFsbEluQm9hcmQoKVxuICAgIC5maWx0ZXIoc3EgPT4gcGllY2VJc1doaXRlKGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHNxKSkpXG4gICAgLnNvbWUoc3EgPT4gZ2V0TW92ZXMoc3RhdGUsIHNxKS5zb21lKG1vdmUgPT4gbW92ZS50by5jb2RlID09PSBzcXVhcmUuY29kZSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZVN0YXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvR2FtZVN0YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBSZWN1cnNpdmVseSBleHBsb3JlcyBhIGRpcmVjdGlvbiBvbiBhIGJvYXJkIHVudGlsIHRoZSBwaWVjZVxuICogaXMgb3V0IG9mIG1vdmVzXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZVxuICogQHBhcmFtIHtbbnVtYmVyXX0gZGlyZWN0aW9uXG4gKiBAcGFyYW0ge1tudW1iZXJdfSBkZWx0YVxuICogQHBhcmFtIHtbTW92ZV19IHJlc3VsdHNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmNvbnN0IGdldE1vdmVzVW50aWxOb3RFbXB0eSA9IChcbiAgc3RhdGUsXG4gIHBpZWNlLFxuICBzcXVhcmUsXG4gIGRpcmVjdGlvbixcbiAgZGVsdGEgPSBbMCwgMF0sXG4gIHJlc3VsdHMgPSBbXVxuKSA9PiB7XG4gIGNvbnN0IG5ld0RlbHRhID0gW2RlbHRhWzBdICsgZGlyZWN0aW9uWzBdLCBkZWx0YVsxXSArIGRpcmVjdGlvblsxXV07XG5cbiAgY29uc3QgbmV4dFNxdWFyZSA9IFNxdWFyZS5yZWxhdGl2ZUZyb20oc3F1YXJlLCBuZXdEZWx0YSk7XG5cbiAgLy8gRWRnZSBvZiBib2FyZCwgZW5kIG9mIG1vdmVcbiAgaWYgKCFuZXh0U3F1YXJlLmluQm91bmRzKSByZXR1cm4gcmVzdWx0cztcblxuICBjb25zdCB0b1BpZWNlID0gZ2V0UGllY2VBdFNxdWFyZShzdGF0ZS5ib2FyZCwgbmV4dFNxdWFyZSk7XG4gIGNvbnN0IGhhc1BpZWNlID0gdG9QaWVjZSAhPT0gXCIgXCI7XG4gIGNvbnN0IGhhc0VuZW15UGllY2UgPSBoYXNQaWVjZSAmJiAhcGllY2VzQXJlU2FtZUNvbG9yKHBpZWNlLCB0b1BpZWNlKTtcblxuICAvLyBPd24gcGllY2UsIGVuZCBvZiBtb3ZlXG4gIGlmIChoYXNQaWVjZSAmJiAhaGFzRW5lbXlQaWVjZSkgcmV0dXJuIHJlc3VsdHM7XG5cbiAgLy8gV2UgY2FuIG1ha2UgYSBtb3ZlIGZvciBzdXJlXG4gIGNvbnN0IG1vdmUgPSBNb3ZlKHNxdWFyZSwgbmV4dFNxdWFyZSwgc3RhdGUpO1xuXG4gIGlmIChoYXNQaWVjZSkgcmV0dXJuIHJlc3VsdHMuY29uY2F0KG1vdmUpO1xuXG4gIHJldHVybiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoXG4gICAgc3RhdGUsXG4gICAgcGllY2UsXG4gICAgc3F1YXJlLFxuICAgIGRpcmVjdGlvbixcbiAgICBuZXdEZWx0YSxcbiAgICByZXN1bHRzLmNvbmNhdChtb3ZlKVxuICApO1xufTtcblxuLyoqXG4gKiBHZXRzIGEgbGlzdCBvZiBtb3ZlcyBmb3IgYSBwaWVjZSBvbiBhIHNxdWFyZSBiYXNlZCBvbiBhIHNldCBvZlxuICogZGlyZWN0aW9uc1xuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge1tbbnVtYmVyXV19IGRpcmVjdGlvbnNcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXREaXJlY3Rpb25hbE1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIGRpcmVjdGlvbnMpID0+IHtcbiAgY29uc3QgcGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuICByZXR1cm4gZGlyZWN0aW9uc1xuICAgIC5tYXAoZCA9PiBnZXRNb3Zlc1VudGlsTm90RW1wdHkoc3RhdGUsIHBpZWNlLCBzcXVhcmUsIGQpKVxuICAgIC5yZWR1Y2UoKHhzLCB4KSA9PiB4cy5jb25jYXQoeCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2RpcmVjdGlvbkJhc2VkLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBTcXVhcmUgZnJvbSBcIi4vLi4vU3F1YXJlXCI7XG5pbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuLy4uL3V0aWxzXCI7XG5cbi8vIE5vdGU6IChTaW1vbikgSWYgd2Ugd2FudCB0byB0ZXN0IHRoaXMsIHdlIG1pZ2h0IHdhbnQgdG8gdXNlOlxuLy8gICAgICAgICAgICAgICBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9nZXQtaW1hZ2UtZGF0YVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gYm9hcmRDdHhcbiAqL1xuY29uc3QgZ2V0SW1hZ2VEYXRhRm9yU3F1YXJlID0gKHNxdWFyZSwgc3F1YXJlU2l6ZSwgYm9hcmRDdHgpID0+XG4gIGJvYXJkQ3R4LmdldEltYWdlRGF0YShcbiAgICBzcXVhcmUuZmlsZSAqIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlLnJvdyAqIHNxdWFyZVNpemUsXG4gICAgc3F1YXJlU2l6ZSxcbiAgICBzcXVhcmVTaXplXG4gICk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcXVhcmVTaXplXG4gKiBAcGFyYW0ge051bWJlcn0gY3V0T2ZmIEJldHdlZW4gMCBhbmQgMVxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGJvYXJkQ3R4XG4gKiBAcmV0dXJucyB7SW1hZ2VEYXRhfVxuICovXG5jb25zdCBnZXRDZW50ZXJJbWFnZURhdGFGb3JTcXVhcmUgPSAoc3F1YXJlLCBzcXVhcmVTaXplLCBjdXRPZmYsIGJvYXJkQ3R4KSA9PlxuICBib2FyZEN0eC5nZXRJbWFnZURhdGEoXG4gICAgc3F1YXJlLmZpbGUgKiBzcXVhcmVTaXplICsgc3F1YXJlU2l6ZSAqIGN1dE9mZixcbiAgICBzcXVhcmUucm93ICogc3F1YXJlU2l6ZSArIHNxdWFyZVNpemUgKiBjdXRPZmYsXG4gICAgc3F1YXJlU2l6ZSAtIDIgKiBjdXRPZmYgKiBzcXVhcmVTaXplLFxuICAgIHNxdWFyZVNpemUgLSAyICogY3V0T2ZmICogc3F1YXJlU2l6ZVxuICApO1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFic29sdXRlIGRpZmZlcmVuY2UgYmV0d2VlbiB0d28gYXJyYXlzIGJ5IHN1bW1pbmcgZXZlcnkgaW5kZXhcbiAqIEBwYXJhbSB7W051bWJlcl19IGFycjFcbiAqIEBwYXJhbSBbTnVtYmVyXX0gYXJyMlxuICogQHJldHVybnMgTnVtYmVyXG4gKi9cbmNvbnN0IHRvdGFsRGlmZiA9IChhcnIxLCBhcnIyKSA9PiB7XG4gIGNvbnN0IGwgPSBNYXRoLm1heChhcnIxLmxlbmd0aCwgYXJyMi5sZW5ndGgpO1xuICBsZXQgZCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBkICs9IE1hdGguYWJzKChhcnIxW2ldIHx8IDApIC0gKGFycjJbaV0gfHwgMCkpO1xuICB9XG5cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QmVmb3JlXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY3R4QWZ0ZXJcbiAqL1xuY29uc3QgY2VudGVyQWJzUGl4ZWxEaWZmID0gKGN0eEJlZm9yZSwgY3R4QWZ0ZXIpID0+IHtcbiAgLy8gTm90ZTogKFNpbW9uKSBUaGUgYm9hcmQgaGFzIHRvIGJlIHNxdWFyZVxuICBjb25zdCBzcXVhcmVTaXplID0gY3R4QmVmb3JlLmNhbnZhcy53aWR0aCAvIDg7XG5cbiAgY29uc3QgY2hhbmdlcyA9IFNxdWFyZS5hbGxJbkJvYXJkKCkubWFwKHNxdWFyZSA9PiB7XG4gICAgY29uc3QgYmVmb3JlID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIDAuMjUsXG4gICAgICBjdHhCZWZvcmVcbiAgICApO1xuICAgIGNvbnN0IGFmdGVyID0gZ2V0Q2VudGVySW1hZ2VEYXRhRm9yU3F1YXJlKFxuICAgICAgc3F1YXJlLFxuICAgICAgc3F1YXJlU2l6ZSxcbiAgICAgIDAuMjUsXG4gICAgICBjdHhBZnRlclxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3F1YXJlLFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgICBkaWZmZXJlbmNlOiB0b3RhbERpZmYoYmVmb3JlLmRhdGEsIGFmdGVyLmRhdGEpXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoYW5nZXM7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgZ3JleSBzY2FsZSB2YWx1ZXMgKDAgLSAyNTUpIGlnbm9yaW5nIHRoZVxuICogYWxwaGEgY2hhbm5lbFxuICogQHBhcmFtIHtbTnVtYmVyXX0gcmdiYVZhbHVlc1xuICogQHJldHVybnMge1tOdW1iZXJdfVxuICovXG5jb25zdCByZ2JhVG9HcmV5U2NhbGVWYWx1ZXMgPSByZ2JhVmFsdWVzID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZ2JhVmFsdWVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgcmVzdWx0LnB1c2goXG4gICAgICBNYXRoLmZsb29yKChyZ2JhVmFsdWVzW2ldICsgcmdiYVZhbHVlc1tpICsgMV0gKyByZ2JhVmFsdWVzW2kgKyAyXSkgLyAzKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHRocmVzaG9sZFxuICogQHBhcmFtIHtOdW1iZXJ9IHB4UGVyUm93XG4gKiBAcGFyYW0ge1tOdW1iZXJdfSBncmV5U2NhbGVEYXRhXG4gKiBAcGFyYW0ge051bWJlcn0gcHhOclxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuY29uc3QgZWRnZVZhbHVlID0gKHRocmVzaG9sZCwgcHhQZXJSb3csIGdyZXlTY2FsZURhdGEsIHB4TnIpID0+IHtcbiAgY29uc3Qgcm93U2l6ZSA9IHB4UGVyUm93O1xuICBsZXQgcmVzdWx0ID0gMDtcblxuICBjb25zdCB0b3AgPSBncmV5U2NhbGVEYXRhW3B4TnIgLSByb3dTaXplXTtcbiAgY29uc3QgYm90dG9tID0gZ3JleVNjYWxlRGF0YVtweE5yICsgcm93U2l6ZV07XG4gIGNvbnN0IGxlZnQgPSBncmV5U2NhbGVEYXRhW3B4TnIgLSAxXTtcbiAgY29uc3QgcmlnaHQgPSBncmV5U2NhbGVEYXRhW3B4TnIgKyAxXTtcblxuICAvLyBQaXhlbHMgb24gZWRnZSBvZiBjYW52YXNcbiAgaWYgKFxuICAgIHRvcCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgYm90dG9tID09PSB1bmRlZmluZWQgfHxcbiAgICBsZWZ0ID09PSB1bmRlZmluZWQgfHxcbiAgICByaWdodCA9PT0gdW5kZWZpbmVkXG4gIClcbiAgICByZXR1cm4gMDtcblxuICBjb25zdCB2ID0gZ3JleVNjYWxlRGF0YVtweE5yXTtcbiAgaWYgKE1hdGguYWJzKHYgLSB0b3ApID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcbiAgaWYgKE1hdGguYWJzKHYgLSBib3R0b20pID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcbiAgaWYgKE1hdGguYWJzKHYgLSBsZWZ0KSA+IHRocmVzaG9sZCkgcmVzdWx0ICs9IDE7XG4gIGlmIChNYXRoLmFicyh2IC0gcmlnaHQpID4gdGhyZXNob2xkKSByZXN1bHQgKz0gMTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZWRnZVBpeGVsQ291bnREaWZmID0gKGN0eEJlZm9yZSwgY3R4QWZ0ZXIpID0+IHtcbiAgLy8gTm90ZTogKFNpbW9uKSBUaGUgYm9hcmQgaGFzIHRvIGJlIHNxdWFyZVxuICBjb25zdCBzcXVhcmVTaXplID0gY3R4QmVmb3JlLmNhbnZhcy53aWR0aCAvIDg7XG4gIGNvbnN0IFRIUkVTSE9MRCA9IDIwO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBTcXVhcmUuYWxsSW5Cb2FyZCgpLm1hcChzcXVhcmUgPT4ge1xuICAgIGNvbnN0IGJlZm9yZSA9IGdldEltYWdlRGF0YUZvclNxdWFyZShzcXVhcmUsIHNxdWFyZVNpemUsIGN0eEJlZm9yZSk7XG4gICAgY29uc3QgYWZ0ZXIgPSBnZXRJbWFnZURhdGFGb3JTcXVhcmUoc3F1YXJlLCBzcXVhcmVTaXplLCBjdHhBZnRlcik7XG5cbiAgICBjb25zdCBnc0JlZm9yZSA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhiZWZvcmUuZGF0YSk7XG4gICAgY29uc3QgZ3NBZnRlciA9IHJnYmFUb0dyZXlTY2FsZVZhbHVlcyhhZnRlci5kYXRhKTtcblxuICAgIGNvbnN0IGVkZ2VzQmVmb3JlID0gZ3NCZWZvcmUubWFwKCh2LCBpLCBhbGwpID0+XG4gICAgICBlZGdlVmFsdWUoVEhSRVNIT0xELCBzcXVhcmVTaXplLCBhbGwsIGkpXG4gICAgKTtcblxuICAgIGNvbnN0IGVkZ2VzQWZ0ZXIgPSBnc0FmdGVyLm1hcCgodiwgaSwgYWxsKSA9PlxuICAgICAgZWRnZVZhbHVlKFRIUkVTSE9MRCwgc3F1YXJlU2l6ZSwgYWxsLCBpKVxuICAgICk7XG5cbiAgICBlZGdlc0JlZm9yZS5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICBpZiAodiA9PT0gMCkgcmV0dXJuO1xuICAgICAgaSAqPSA0O1xuICAgICAgYmVmb3JlLmRhdGFbaSArIDBdID0gMjU1O1xuICAgICAgYmVmb3JlLmRhdGFbaSArIDFdID0gMDtcbiAgICAgIGJlZm9yZS5kYXRhW2kgKyAyXSA9IDA7XG4gICAgfSk7XG5cbiAgICBjb25zdCBkZWJ1Z0N2cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgZGVidWdDdnMud2lkdGggPSBkZWJ1Z0N2cy5oZWlnaHQgPSBzcXVhcmVTaXplO1xuICAgIGRlYnVnQ3ZzLmdldENvbnRleHQoXCIyZFwiKS5wdXRJbWFnZURhdGEoYmVmb3JlLCAwLCAwKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzcXVhcmUsXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcixcbiAgICAgIGRpZmZlcmVuY2U6IHRvdGFsRGlmZihlZGdlc0JlZm9yZSwgZWRnZXNBZnRlciksXG4gICAgICBkZWJ1Z0N2c1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzO1xufTtcblxuLy9leHBvcnQgY29uc3Qgc3F1YXJlQ2hhbmdlcyA9IGNlbnRlckFic1BpeGVsRGlmZjtcbmV4cG9ydCBjb25zdCBzcXVhcmVDaGFuZ2VzID0gZWRnZVBpeGVsQ291bnREaWZmO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VIYW5kbGluZy9zcXVhcmVDaGFuZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHBpZWNlc0FyZVNhbWVDb2xvciB9IGZyb20gXCIuLy4uL3BpZWNlXCI7XG5pbXBvcnQgeyBnZXRQaWVjZUF0U3F1YXJlIH0gZnJvbSBcIi4vLi4vQm9hcmRcIjtcbmltcG9ydCB7IE1vdmUgfSBmcm9tIFwiLi8uLi9Nb3Zlc1wiO1xuaW1wb3J0IFNxdWFyZSBmcm9tIFwiLi8uLi9TcXVhcmVcIjtcblxuLyoqXG4gKiBAcGFyYW0ge0dhbWVTdGF0ZX0gc3RhdGVcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmVcbiAqIEBwYXJhbSB7W1tudW1iZXJdXSByZWxhdGl2ZXMgLSBTcXVhcmUgbG9jYXRpb25zIFtkUm93LCBkRmlsZV0gcmVsYXRpdmUgdG8gdGhpcyBzcXVhcmV9XG4gKiBAcmV0dXJucyB7W01vdmVzXX1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFNxdWFyZU1vdmVzID0gKHN0YXRlLCBzcXVhcmUsIHJlbGF0aXZlcykgPT4ge1xuICBjb25zdCB0aGlzUGllY2UgPSBnZXRQaWVjZUF0U3F1YXJlKHN0YXRlLmJvYXJkLCBzcXVhcmUpO1xuXG4gIGNvbnN0IHRvU3F1YXJlcyA9IHJlbGF0aXZlc1xuICAgIC5tYXAoZCA9PiBTcXVhcmUucmVsYXRpdmVGcm9tKHNxdWFyZSwgZCkpXG4gICAgLmZpbHRlcihzID0+IHMuaW5Cb3VuZHMpXG4gICAgLm1hcChzID0+ICh7IHNxdWFyZTogcywgcGllY2U6IGdldFBpZWNlQXRTcXVhcmUoc3RhdGUuYm9hcmQsIHMpIH0pKVxuICAgIC8vIE9ubHkgZW1wdHkgc3F1YXJlcyBvciBzcXVhcmVzIHdpdGggZW5lbXkgcGllY2VzXG4gICAgLmZpbHRlcih0byA9PiB0by5waWVjZSA9PT0gXCIgXCIgfHwgIXBpZWNlc0FyZVNhbWVDb2xvcih0aGlzUGllY2UsIHRvLnBpZWNlKSk7XG5cbiAgcmV0dXJuIHRvU3F1YXJlcy5tYXAodG8gPT4gTW92ZShzcXVhcmUsIHRvLnNxdWFyZSwgc3RhdGUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9zcXVhcmVCYXNlZC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRCaXNob3BNb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXREaXJlY3Rpb25hbE1vdmVzKHN0YXRlLCBzcXVhcmUsIFtcbiAgICBbMSwgMV0sXG4gICAgWy0xLCAxXSxcbiAgICBbLTEsIC0xXSxcbiAgICBbMSwgLTFdXG4gIF0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL2Jpc2hvcC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSb29rTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0RGlyZWN0aW9uYWxNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbWzEsIDBdLCBbLTEsIDBdLCBbMCwgLTFdLCBbMCwgMV1dKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9yb29rLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzcXVhcmVDaGFuZ2VzIH0gZnJvbSBcIi4vaW1hZ2VIYW5kbGluZy9zcXVhcmVDaGFuZ2VzXCI7XG5pbXBvcnQgeyBjcm9wIH0gZnJvbSBcIi4vaW1hZ2VIYW5kbGluZy9jcm9wXCI7XG5pbXBvcnQgeyBwZXJzcGVjdGl2ZVRyYW5zZm9ybSB9IGZyb20gXCIuL2ltYWdlSGFuZGxpbmcvcGVyc3BlY3RpdmVUcmFuc2Zvcm1cIjtcblxuaW1wb3J0IEZFTiBmcm9tIFwiLi9GRU5cIjtcbmltcG9ydCB7IGdldEFsbExlZ2FsTW92ZXMgfSBmcm9tIFwiLi9Nb3Zlc1wiO1xuaW1wb3J0IEdhbWVTdGF0ZSwgeyBhcHBseU1vdmVUb0dhbWVTdGF0ZSB9IGZyb20gXCIuL0dhbWVTdGF0ZVwiO1xuXG5jb25zdCBCb2FyZEltYWdlID0gKGltZ0ZpbGUsIHRyYW5zZm9ybUZyb20pID0+IHtcbiAgY29uc3QgZm91clBvaW50cyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG5cbiAgLy8gV3JpdGUgZnJvbSBwb2ludHMgdG8gdHJhbnNmb3JtRnJvbSBldmVyeSA0dGggaXRlbVxuICBmb3VyUG9pbnRzLnN1YnNjcmliZShwb2ludHMgPT4ge1xuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSA0KSB7XG4gICAgICB0cmFuc2Zvcm1Gcm9tKHBvaW50cyk7XG4gICAgICBmb3VyUG9pbnRzKFtdKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IG15Q3JvcCA9IGtvLm9ic2VydmFibGUoKTtcbiAgY29uc3QgY3JvcERhdGFVUkwgPSBrby5wdXJlQ29tcHV0ZWQoXG4gICAgKCkgPT4gKG15Q3JvcCgpID8gbXlDcm9wKCkudG9EYXRhVVJMKCkgOiBudWxsKVxuICApO1xuXG4gIC8vIExpbmsgYSB2aXJ0dWFsIGltZ1xuICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICBjb25zdCByZWRyYXcgPSB0cmFuc2Zvcm0gPT4ge1xuICAgIGNyb3AocGVyc3BlY3RpdmVUcmFuc2Zvcm0odHJhbnNmb3JtLCBpbWcpLCBteUNyb3ApO1xuICB9O1xuXG4gIHRyYW5zZm9ybUZyb20uc3Vic2NyaWJlKHJlZHJhdyk7XG5cbiAgLy8gTG9hZCBpbml0aWFsIGltYWdlXG4gIGltZy5vbmxvYWQgPSAoKSA9PiByZWRyYXcodHJhbnNmb3JtRnJvbSgpKTtcbiAgaW1nLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoaW1nRmlsZSk7XG5cbiAgY29uc3QgZ2FtZVN0YXRlID0ga28ub2JzZXJ2YWJsZShHYW1lU3RhdGUoKSk7XG4gIGNvbnN0IGJvYXJkID0ga28ucHVyZUNvbXB1dGVkKCgpID0+IGdhbWVTdGF0ZSgpLmJvYXJkKTtcblxuICByZXR1cm4ge1xuICAgIGdhbWVTdGF0ZSxcbiAgICBib2FyZCxcbiAgICBpbWFnZVZpc2libGU6IGtvLm9ic2VydmFibGUoZmFsc2UpLFxuICAgIG9yaWdpbmFsOiBpbWcuc3JjLFxuICAgIGNyb3A6IGNyb3BEYXRhVVJMLFxuICAgIGNyb3BDdnM6IG15Q3JvcCxcbiAgICBtb3ZlUmF0aW5nOiBrby5vYnNlcnZhYmxlQXJyYXkoW10pLFxuICAgIG9uQ2xpY2s6IChkLCBlKSA9PiB7XG4gICAgICBjb25zdCBiYm94ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBmb3VyUG9pbnRzLnB1c2goe1xuICAgICAgICB4OiBlLmNsaWVudFggLSBiYm94LngsXG4gICAgICAgIHk6IGUuY2xpZW50WSAtIGJib3gueVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcblxuY29uc3QgQXBwID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHRyYW5zZm9ybUZyb20gPSBrby5vYnNlcnZhYmxlQXJyYXkoW1xuICAgIHsgeDogMTIwLCB5OiA0NSB9LFxuICAgIHsgeDogNDAzLCB5OiA0MyB9LFxuICAgIHsgeDogMzk0LCB5OiAzMjUgfSxcbiAgICB7IHg6IDEyNSwgeTogMzIzIH1cbiAgXSk7XG5cbiAgdGhpcy50b2dnbGVJbWFnZXMgPSAoKSA9PiB7XG4gICAgdGhpcy5pbWFnZXMoKS5mb3JFYWNoKGJpID0+IGJpLmltYWdlVmlzaWJsZSghYmkuaW1hZ2VWaXNpYmxlKCkpKTtcbiAgfTtcblxuICB0aGlzLmltYWdlcyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XG4gIHRoaXMub25OZXdGaWxlcyA9IChkLCBlKSA9PiB7XG4gICAgdGhpcy5pbWFnZXMoXG4gICAgICBBcnJheS5mcm9tKGUudGFyZ2V0LmZpbGVzKS5tYXAoaW1nID0+IEJvYXJkSW1hZ2UoaW1nLCB0cmFuc2Zvcm1Gcm9tKSlcbiAgICApO1xuICB9O1xuXG4gIHRoaXMubGFzdENoYW5nZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pLmV4dGVuZCh7IHJhdGVMaW1pdDogNDAgfSk7XG5cbiAgY29uc3QgZ2V0QmVzdEd1ZXNzID0gKGltZ0JlZm9yZSwgaW1nQWZ0ZXIpID0+IHtcbiAgICBjb25zdCBjdHhCZWZvcmUgPSBpbWdCZWZvcmUuY3JvcEN2cygpLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjb25zdCBjdHhBZnRlciA9IGltZ0FmdGVyLmNyb3BDdnMoKS5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gc3F1YXJlQ2hhbmdlcyhjdHhCZWZvcmUsIGN0eEFmdGVyKTtcbiAgICB0aGlzLmxhc3RDaGFuZ2VzKGNoYW5nZXMubWFwKGMgPT4gYy5kZWJ1Z0N2cykpO1xuXG4gICAgY29uc3QgZ2FtZVN0YXRlQmVmb3JlID0gaW1nQmVmb3JlLmdhbWVTdGF0ZSgpO1xuICAgIGNvbnN0IGFsbG93ZWRNb3ZlcyA9IGdldEFsbExlZ2FsTW92ZXMoZ2FtZVN0YXRlQmVmb3JlKTtcblxuICAgIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBhbGxvd2VkTW92ZXNcbiAgICAgIC5tYXAobW92ZSA9PiB7XG4gICAgICAgIGNvbnN0IGZyb21TcXVhcmVDaGFuZ2UgPSBjaGFuZ2VzW21vdmUuZnJvbS5pbmRleF0uZGlmZmVyZW5jZTtcbiAgICAgICAgY29uc3QgdG9TcXVhcmVDaGFuZ2UgPSBjaGFuZ2VzW21vdmUudG8uaW5kZXhdLmRpZmZlcmVuY2U7XG5cbiAgICAgICAgLy8gTm90ZTogKFNpbW9uKSBUaGUgXCJmcm9tXCIgc3F1YXJlIGlzIGFsd2F5cyBlbXB0eSBhZnRlciBhIG1vdmVcbiAgICAgICAgLy8gICAgICAgICAgICAgICBUaGVyZWZvcmUsIGl0J3MgZXhwZWN0ZWQgdG8gc2hvdyBhIGxhcmdlIGRpZmZcbiAgICAgICAgLy8gICAgICAgICAgICAgICBtYWtpbmcgaXQgZWFzaWVyIHRvIHJlY29nbmlzZS5cblxuICAgICAgICBjb25zdCB0b3RhbENoYW5nZSA9IE1hdGgucm91bmQoMS41ICogZnJvbVNxdWFyZUNoYW5nZSArIHRvU3F1YXJlQ2hhbmdlKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vdmUsXG4gICAgICAgICAgZnJvbVNxdWFyZUNoYW5nZSxcbiAgICAgICAgICB0b1NxdWFyZUNoYW5nZSxcbiAgICAgICAgICB0b3RhbENoYW5nZSxcbiAgICAgICAgICBmcm9tOiBtb3ZlLmZyb20uY29kZSxcbiAgICAgICAgICB0bzogbW92ZS50by5jb2RlXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLnNvcnQoKHAxLCBwMikgPT4gcDIudG90YWxDaGFuZ2UgLSBwMS50b3RhbENoYW5nZSk7XG5cbiAgICByZXR1cm4gcG9zc2liaWxpdGllcztcbiAgfTtcblxuICB0aGlzLmFuYWx5emUgPSAoKSA9PiB7XG4gICAgY29uc3QgcGFpcnMgPSB0aGlzLmltYWdlcygpLnJlZHVjZSgocGFpcnMsIGltZywgaSwgaW1ncykgPT4ge1xuICAgICAgaWYgKGltZ3NbaSArIDFdKSBwYWlycy5wdXNoKFtpbWcsIGltZ3NbaSArIDFdXSk7XG4gICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSwgW10pO1xuXG4gICAgdGhpcy5pbWFnZXMoKS5mb3JFYWNoKChpbWcsIGkpID0+IHtcbiAgICAgIC8vIExhc3QgYm9hcmRcbiAgICAgIGlmICghcGFpcnNbaV0pIHJldHVybjtcblxuICAgICAgY29uc3QgYmVmb3JlID0gcGFpcnNbaV1bMF07XG4gICAgICBjb25zdCBhZnRlciA9IHBhaXJzW2ldWzFdO1xuXG4gICAgICBjb25zdCBtb3ZlcyA9IGdldEJlc3RHdWVzcyhiZWZvcmUsIGFmdGVyKTtcbiAgICAgIGNvbnN0IG1vdmUgPSBtb3Zlc1swXS5tb3ZlO1xuICAgICAgYWZ0ZXIubW92ZVJhdGluZyhtb3Zlcyk7XG4gICAgICBhZnRlci5nYW1lU3RhdGUoYXBwbHlNb3ZlVG9HYW1lU3RhdGUoYmVmb3JlLmdhbWVTdGF0ZSgpLCBtb3ZlKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5vdmVybGF5ID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG59O1xuXG5rby5iaW5kaW5nSGFuZGxlcnMucGxhY2VBbGwgPSB7XG4gIGluaXQ6IChlbCwgdmEpID0+XG4gICAga28uY29tcHV0ZWQoKCkgPT4ga28udW53cmFwKHZhKCkpLmZvckVhY2goZSA9PiBlbC5hcHBlbmRDaGlsZChlKSkpXG59O1xuXG5rby5hcHBseUJpbmRpbmdzKG5ldyBBcHAoKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBwYXJhbSB7RGF0YVVSTH0gZGF0YVVSTFxuICogQHBhcmFtIHtrby5vYnNlcnZhYmxlfSB3cml0ZVRvXG4gKiBAcmV0dXJucyB7a28ub2JzZXJ2YWJsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyb3AgPSAoZGF0YVVSTCwgd3JpdGVUbykgPT4ge1xuICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgY29uc3QgY3ZzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgY3ZzLndpZHRoID0gMjU2O1xuICBjdnMuaGVpZ2h0ID0gMjU2O1xuICBjb25zdCBjdHggPSBjdnMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgIHdyaXRlVG8oY3ZzKTtcbiAgfTtcbiAgaW1nLnNyYyA9IGRhdGFVUkw7XG5cbiAgcmV0dXJuIHdyaXRlVG87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VIYW5kbGluZy9jcm9wLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBwb2ludFJlZHVjZXIgPSAoYWNjLCB7IHgsIHkgfSkgPT4gYWNjLmNvbmNhdCh4LCB5KTtcblxuLyoqXG4gKiBAcGFyYW0ge1t7eCwgeX1dfSByZWZQb2ludHNcbiAqIEBwYXJhbSB7SW1hZ2V9IGltZ1xuICogQHJldHVybnMge0RhdGFVUkx9XG4gKi9cbmV4cG9ydCBjb25zdCBwZXJzcGVjdGl2ZVRyYW5zZm9ybSA9IChyZWZQb2ludHMsIGltZykgPT4ge1xuICBjb25zdCBjdnMgPSBmeC5jYW52YXMoKTtcblxuICBjb25zdCBmcm9tID0gcmVmUG9pbnRzLnJlZHVjZShwb2ludFJlZHVjZXIsIFtdKTtcbiAgY29uc3QgdG8gPSBbMCwgMjU2LCAwLCAwLCAyNTYsIDAsIDI1NiwgMjU2XTtcblxuICByZXR1cm4gY3ZzXG4gICAgLmRyYXcoY3ZzLnRleHR1cmUoaW1nKSlcbiAgICAucGVyc3BlY3RpdmUoZnJvbSwgdG8pXG4gICAgLnVwZGF0ZSgpXG4gICAgLnRvRGF0YVVSTCgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlSGFuZGxpbmcvcGVyc3BlY3RpdmVUcmFuc2Zvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHRyaW0gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IEdhbWVTdGF0ZSBmcm9tIFwiLi9HYW1lU3RhdGVcIjtcblxuLyogQSByZWd1bGFyIGNoZXNzIGdhbWUncyBzdGFydGluZyBwb3NpdGlvbiBpbiBGRU4gbm90YXRpb24gKi9cbmNvbnN0IFNUQVJUX1BPU0lUSU9OID1cbiAgXCJybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SIHcgS1FrcSAtIDAgMVwiO1xuXG4vKipcbiAqIFNwbGl0cyB1cCBhIGZlbiBzdHJpbmcgaW4gdG8gcGFydHMgZm9yIHJvd3MsIHNpZGUgdG8gbW92ZSwgXG4gKiBjYXN0bGUgb3B0aW9ucywgZW4gcGFzc2FudCwgaGFsZiBtb3ZlcyBhbmQgZnVsbCBtb3Zlc1xuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gZmVuIFxuICogQHJldHVybnMge1tzdHJpbmddfVxuICovXG5jb25zdCBmZW5QYXJ0cyA9IGZlbiA9PiBmZW4uc3BsaXQoL1xccysvZyk7XG5cbi8qKlxuICogKFJlY3Vyc2l2ZWx5KSBjcmVhdGUgYSBmZW4gcm93IGNvZGUgZnJvbSBhIGxpc3Qgb2YgcGllY2VcbiAqIGNvZGVzLCBpbiB3aGljaCBlbXB0eSBzcXVhcmVzIGFyZSBcIiBcIlxuICogXG4gKiBAcGFyYW0ge1tzdHJpbmddfSBwaWVjZXMgXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Jlc3VsdD1cIlwiXSBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW1wdGllcz0wXSBcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3QgcGllY2VDb2Rlc1RvRmVuUm93ID0gKHBpZWNlcywgcmVzdWx0ID0gXCJcIiwgZW1wdGllcyA9IDApID0+XG4gIHBpZWNlcy5sZW5ndGggPT09IDBcbiAgICA/IHJlc3VsdCArIChlbXB0aWVzIHx8IFwiXCIpXG4gICAgOiBwaWVjZXNbMF0gPT09IFwiIFwiXG4gICAgICA/IHBpZWNlQ29kZXNUb0ZlblJvdyhwaWVjZXMuc2xpY2UoMSksIHJlc3VsdCwgZW1wdGllcyArIDEpXG4gICAgICA6IHBpZWNlQ29kZXNUb0ZlblJvdyhcbiAgICAgICAgICBwaWVjZXMuc2xpY2UoMSksXG4gICAgICAgICAgcmVzdWx0ICsgKGVtcHRpZXMgfHwgXCJcIikgKyBwaWVjZXNbMF0sXG4gICAgICAgICAgMFxuICAgICAgICApO1xuXG4vKipcbiAqIFRyYW5zbGF0ZXMgYSBmZW4gcm93IGNvZGUgKHBhcnQgYmV0d2VlbiAvLi4uLykgdG8gYSBsaXN0IG9mIHBpZWNlcyxcbiAqIGluIHdoaWNoIGVtcHR5IHNxdWFyZXMgYXJlIFwiIFwiXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZW5Sb3cgXG4gKiBAcmV0dXJucyBbc3RyaW5nXVxuICovXG5jb25zdCBmZW5Sb3dUb1BpZWNlQ29kZXMgPSBmZW5Sb3cgPT5cbiAgZmVuUm93XG4gICAgLnNwbGl0KFwiXCIpXG4gICAgLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MuY29uY2F0KCtwID4gMCA/IEFycmF5KCtwKS5maWxsKFwiIFwiKSA6IHApLCBbXSk7XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgRkVOIHN0cmluZyBpbiB0byBhIGdhbWUgc3RhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gXG4gKiBAcmV0dXJucyB7R2FtZVN0YXRlfVxuICovXG5jb25zdCBmZW5Ub0dhbWVTdGF0ZSA9IGZlbiA9PiB7XG4gIGNvbnN0IFtyb3dzLCB0b01vdmUsIGNhc3RsZXMsIGVuUGFzc2FudCwgaGFsZk1vdmVzLCBmdWxsTW92ZXNdID0gZmVuUGFydHMoXG4gICAgZmVuXG4gICk7XG5cbiAgY29uc3QgYm9hcmQgPSByb3dzXG4gICAgLnNwbGl0KFwiL1wiKVxuICAgIC5tYXAodHJpbSlcbiAgICAubWFwKGZlblJvd1RvUGllY2VDb2Rlcyk7XG5cbiAgcmV0dXJuIEdhbWVTdGF0ZShib2FyZCwgdG9Nb3ZlLCBjYXN0bGVzLCBlblBhc3NhbnQsIGhhbGZNb3ZlcywgZnVsbE1vdmVzKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBGRU4gc3RyaW5nIGZyb20gYSBHYW1lU3RhdGVcbiAqIFxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgZ2FtZVN0YXRlVG9GZW4gPSBzdGF0ZSA9PiB7XG4gIGNvbnN0IHJvd3MgPSBzdGF0ZS5ib2FyZC5tYXAocCA9PiBwaWVjZUNvZGVzVG9GZW5Sb3cocCkpO1xuXG4gIHJldHVybiBbXG4gICAgcm93cy5qb2luKFwiL1wiKSxcbiAgICBzdGF0ZS53aGl0ZVRvTW92ZSA/IFwid1wiIDogXCJiXCIsXG4gICAgW1xuICAgICAgc3RhdGUud2hpdGVDYW5DYXN0bGVTaG9ydCA/IFwiS1wiIDogXCJcIixcbiAgICAgIHN0YXRlLndoaXRlQ2FuQ2FzdGxlTG9uZyA/IFwiUVwiIDogXCJcIixcbiAgICAgIHN0YXRlLmJsYWNrQ2FuQ2FzdGxlU2hvcnQgPyBcImtcIiA6IFwiXCIsXG4gICAgICBzdGF0ZS5ibGFja0NhbkNhc3RsZUxvbmcgPyBcInFcIiA6IFwiXCJcbiAgICBdLmpvaW4oXCJcIikgfHwgXCItXCIsXG4gICAgc3RhdGUuZW5QYXNzYW50IHx8IFwiLVwiLFxuICAgIHN0YXRlLmhhbGZNb3ZlcyxcbiAgICBzdGF0ZS5tb3ZlTnJcbiAgXS5qb2luKFwiIFwiKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmVuVG9HYW1lU3RhdGUsXG4gIGdhbWVTdGF0ZVRvRmVuLFxuICBTVEFSVF9QT1NJVElPTlxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0ZFTi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0UGllY2VBdFNxdWFyZSB9IGZyb20gXCIuLy4uL0JvYXJkXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCIuLy4uL1NxdWFyZVwiO1xuaW1wb3J0IHsgTW92ZSB9IGZyb20gXCIuLy4uL01vdmVzXCI7XG5cbmltcG9ydCB7IHBpZWNlSXNCbGFjaywgcGllY2VJc1doaXRlLCBwaWVjZUlzRW1wdHkgfSBmcm9tIFwiLi8uLi9waWVjZVwiO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIHBvc3NpYmxlIG1vdmVzIGZvciBhIHNxdWFyZSB0aGF0IGhvbGRzIGEgcGF3blxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlXG4gKiBAcGFyYW0ge1NxdWFyZX0gc3F1YXJlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRQYXduTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICBjb25zdCBib2FyZCA9IHN0YXRlLmJvYXJkO1xuICBjb25zdCBwaWVjZSA9IGdldFBpZWNlQXRTcXVhcmUoYm9hcmQsIHNxdWFyZSk7XG4gIGNvbnN0IGlzQmxhY2sgPSBwaWVjZUlzQmxhY2socGllY2UpO1xuXG4gIGNvbnN0IGNhblRha2UgPSAoeyBzcXVhcmUsIHBpZWNlIH0pID0+XG4gICAgLy8gVGhlcmUncyBwaWVjZSBpbmZvXG4gICAgcGllY2UgJiZcbiAgICAvLyBUaGUgc3F1YXJlIGlzIG9uIHRoZSBib2FyZFxuICAgIHNxdWFyZS5pbkJvdW5kcyAmJlxuICAgIC8vIFRoZXJlJ3MgYSBwaWVjZSBvZiB0aGUgb3Bwb3NpdGUgY29sb3IgT1JcbiAgICAvLyBpdCdzIHRoZSBzdGF0ZSdzIGVuIHBhc3NhbnQgc3F1YXJlXG4gICAgKChpc0JsYWNrID8gcGllY2VJc1doaXRlKHBpZWNlKSA6IHBpZWNlSXNCbGFjayhwaWVjZSkpIHx8XG4gICAgICBzdGF0ZS5lblBhc3NhbnQgPT09IHNxdWFyZS5jb2RlKTtcblxuICBjb25zdCBjYW5Nb3ZlID0gKHsgc3F1YXJlLCBwaWVjZSB9KSA9PiBzcXVhcmUuaW5Cb3VuZHMgJiYgcGllY2VJc0VtcHR5KHBpZWNlKTtcblxuICBjb25zdCBpc1N0YXJ0UG9zID0gaXNCbGFjayA/IHNxdWFyZS5yb3cgPT09IDEgOiBzcXVhcmUucm93ID09PSA2O1xuXG4gIGNvbnN0IGRpcmVjdGlvbnMgPSBbXG4gICAgaXNCbGFjayA/IFsxLCAwXSA6IFstMSwgMF0sIC8vIEZpcnN0IHN0ZXBcbiAgICBpc0JsYWNrID8gWzIsIDBdIDogWy0yLCAwXSwgLy8gU2Vjb25kIHN0ZXBcbiAgICBpc0JsYWNrID8gWzEsIC0xXSA6IFstMSwgLTFdLCAvLyBUYWtlcyBsZWZ0XG4gICAgaXNCbGFjayA/IFsxLCAxXSA6IFstMSwgMV0gLy8gVGFrZXMgcmlnaHRcbiAgXTtcblxuICBjb25zdCBwaWVjZXNBdFZhbGlkU3F1YXJlcyA9IGRpcmVjdGlvbnNcbiAgICAubWFwKGQgPT4gU3F1YXJlLnJlbGF0aXZlRnJvbShzcXVhcmUsIGQpKVxuICAgIC5tYXAocyA9PiAoe1xuICAgICAgcGllY2U6IHMuaW5Cb3VuZHMgPyBnZXRQaWVjZUF0U3F1YXJlKGJvYXJkLCBzKSA6IG51bGwsXG4gICAgICBzcXVhcmU6IHNcbiAgICB9KSk7XG5cbiAgY29uc3QgbW92ZXMgPSBbXTtcbiAgY29uc3QgW2ZpcnN0U3RlcCwgc2Vjb25kU3RlcCwgdGFrZXNMZWZ0LCB0YWtlc1JpZ2h0XSA9IHBpZWNlc0F0VmFsaWRTcXVhcmVzO1xuXG4gIGlmIChjYW5Nb3ZlKGZpcnN0U3RlcCkpIHtcbiAgICBtb3Zlcy5wdXNoKE1vdmUoc3F1YXJlLCBmaXJzdFN0ZXAuc3F1YXJlLCBzdGF0ZSkpO1xuXG4gICAgaWYgKGlzU3RhcnRQb3MgJiYgY2FuTW92ZShzZWNvbmRTdGVwKSkge1xuICAgICAgbW92ZXMucHVzaChNb3ZlKHNxdWFyZSwgc2Vjb25kU3RlcC5zcXVhcmUsIHN0YXRlKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNhblRha2UodGFrZXNMZWZ0KSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIHRha2VzTGVmdC5zcXVhcmUsIHN0YXRlKSk7XG4gIH1cblxuICBpZiAoY2FuVGFrZSh0YWtlc1JpZ2h0KSkge1xuICAgIG1vdmVzLnB1c2goTW92ZShzcXVhcmUsIHRha2VzUmlnaHQuc3F1YXJlLCBzdGF0ZSkpO1xuICB9XG5cbiAgcmV0dXJuIG1vdmVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21vdmVzL3Bhd24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldFNxdWFyZU1vdmVzIH0gZnJvbSBcIi4vc3F1YXJlQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHsqfSBzdGF0ZSBcbiAqIEBwYXJhbSB7Kn0gc3F1YXJlIFxuICovXG5leHBvcnQgY29uc3QgZ2V0S25pZ2h0TW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICByZXR1cm4gZ2V0U3F1YXJlTW92ZXMoc3RhdGUsIHNxdWFyZSwgW1xuICAgIFsxLCAyXSxcbiAgICBbMSwgLTJdLFxuICAgIFstMSwgMl0sXG4gICAgWy0xLCAtMl0sXG4gICAgWzIsIC0xXSxcbiAgICBbMiwgMV0sXG4gICAgWy0yLCAtMV0sXG4gICAgWy0yLCAxXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9rbmlnaHQuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGdldFNxdWFyZU1vdmVzIH0gZnJvbSBcIi4vc3F1YXJlQmFzZWRcIjtcbi8qKlxuICogQHBhcmFtIHtHYW1lU3RhdGV9IHN0YXRlIFxuICogQHBhcmFtIHtTcXVhcmV9IHNxdWFyZSBcbiAqIEByZXR1cm5zIHtbTW92ZV19XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRLaW5nTW92ZXMgPSAoc3RhdGUsIHNxdWFyZSkgPT4ge1xuICAvLyBUT0RPOiAoU2ltb24pIENhc3RsaW5nXG4gIHJldHVybiBnZXRTcXVhcmVNb3ZlcyhzdGF0ZSwgc3F1YXJlLCBbXG4gICAgWzEsIDBdLFxuICAgIFsxLCAxXSxcbiAgICBbMCwgMV0sXG4gICAgWy0xLCAxXSxcbiAgICBbLTEsIDBdLFxuICAgIFstMSwgLTFdLFxuICAgIFswLCAtMV0sXG4gICAgWzEsIC0xXVxuICBdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9raW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXREaXJlY3Rpb25hbE1vdmVzIH0gZnJvbSBcIi4vZGlyZWN0aW9uQmFzZWRcIjtcbmltcG9ydCB7IGdldEJpc2hvcE1vdmVzIH0gZnJvbSBcIi4vYmlzaG9wXCI7XG5pbXBvcnQgeyBnZXRSb29rTW92ZXMgfSBmcm9tIFwiLi9yb29rXCI7XG4vKipcbiAqIEBwYXJhbSB7R2FtZVN0YXRlfSBzdGF0ZSBcbiAqIEBwYXJhbSB7U3F1YXJlfSBzcXVhcmUgXG4gKiBAcmV0dXJucyB7W01vdmVdfVxuICovXG5leHBvcnQgY29uc3QgZ2V0UXVlZW5Nb3ZlcyA9IChzdGF0ZSwgc3F1YXJlKSA9PiB7XG4gIHJldHVybiBnZXRCaXNob3BNb3ZlcyhzdGF0ZSwgc3F1YXJlKS5jb25jYXQoZ2V0Um9va01vdmVzKHN0YXRlLCBzcXVhcmUpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tb3Zlcy9xdWVlbi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==