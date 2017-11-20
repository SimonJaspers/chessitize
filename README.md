# chessitize
---

A tool to digitize chess games based on a picture-per-move. The project’s (provisional) name comes from:

> **digitize** `/ˈdɪdʒɪtʌɪz//`
>
> &nbsp;&nbsp;verb
>
> &nbsp;&nbsp;&nbsp;&nbsp;*convert (pictures or sound) into a digital form that can be processed by a computer.*
>
> &nbsp;

> **chess** `/tʃɛs/`
>
> &nbsp;&nbsp;noun
> 
> &nbsp;&nbsp;&nbsp;&nbsp;*mental torture* – Garry Kasparov
>
> &nbsp;

> **chastise** `/tʃaˈstʌɪz/`
>
> &nbsp;&nbsp;verb
>
> &nbsp;&nbsp;&nbsp;&nbsp;*rebuke or reprimand severely.*
> 
> &nbsp;

<sub>* we might need a more cheerful name...

---

## Approach

 - Load 2 top-view images of a chessboard
   - Assume first image is starting position
   - Assume second image has move made
 - Mark four corners of the board
 - Warp perspective in both images (using [glfx.js](http://evanw.github.io/glfx.js/) perspective warp) using reference points
 - Between the boards, check each square for changes (on pixel level)
 - Cross check list of *allowed* moves with pixel changes to find most likely move
 - Calculate new chess position and assign to second image
 - Repeat for next moves of game

## Initial goals

**Input** a set of top-view images taken from the same angle (one for every move), **output** a [PGN](https://en.wikipedia.org/wiki/Portable_Game_Notation) of the game to archive/analyze.

## Stretch goals

Create a Raspberry Pi chess clock with a camera attachment. When a player hits the clock, the camera takes a picture and stores the new game state. When a game finishes, the clock uploads the game to the players’ [lichess](https://lichess.org/) or [chess.com](https://www.chess.com) profile for further analysis.

## Other ideas

 - Implement a game mode that allows you to play versus the computer on a regular board.
 - ...


## Challenges

 - Image analysis: top-down views with consistent lighting are easy. Lower the camera angle, move it between shots, partially obscure the view or dimm the lights and stuff gets significantly harder...
 - Some chess rules are a bit tricky to implement (namely: *en passant*, castling, three-fold repetition & the fifty-move rule, promotion)

## TODO

 1. ~~Configure build tools & tests~~ 😪
 2. Create logic to extract potential moves from two photos:
 
```
 (photoOfChessBoardBefore, photoOfChessBoardAfter) -> [ { move, likeliness } ]
```
 3. Create logic to go from a [FEN Code](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) to a list of possible moves:

```
   FEN -> [ possibleMove ]
```

 4. Create logic for:

``` 
   (initialFEN, [ { move, likeliness } ], [ possibleMove ]) -> nextFEN
```

## Development tools
 - Run `npm install` to get started
 - Run `npm test` to run tests *once* (try to remember to do this before pushing...)
 - Run `npm run test:w` to automatically compile test bundles and run tests.
 - Run `build` to compile main javascript bundle
 - Run `scss` to compile scss files. (Make sure to `gem install sass` first)
 - Run `npm start` to start a local server (Make sure to `npm install -g http-server` first)