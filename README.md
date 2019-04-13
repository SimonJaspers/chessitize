# chessitize
---

A tool to digitize chess games based on a picture-per-move. The project’s (provisional) name comes from:

> **digitize** `/ˈdɪdʒɪtʌɪz//`
>
> &nbsp;&nbsp;verb
>
> &nbsp;&nbsp;&nbsp;&nbsp;*convert (pictures or sound) into a digital form that can be processed by a computer.*

Because it’s digitizing a physical game.

> **chess** `/tʃɛs/`
>
> &nbsp;&nbsp;noun
> 
> &nbsp;&nbsp;&nbsp;&nbsp;*mental torture* – Garry Kasparov

Because the game is chess.

> **chastise** `/tʃaˈstʌɪz/`
>
> &nbsp;&nbsp;verb
>
> &nbsp;&nbsp;&nbsp;&nbsp;*rebuke or reprimand severely.*

Because the digitized game and its analysis helps you realize how bad you really are at this game...

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
 2. ~~Create logic to extract potential moves from two photos:~~
 
```
 (photoOfChessBoardBefore, photoOfChessBoardAfter) -> [ { move, likeliness } ]
```
 3. ~~Create logic to go from a [FEN Code](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) to a list of possible moves:~~

```
   FEN -> [ possibleMove ]
```

 4. ~~Create logic for:~~

``` 
   (initialFEN, [ { move, likeliness } ], [ possibleMove ]) -> nextFEN
```
 5. Implement a probability tree to deal with multiple valid candidate moves. Each path to a final possible game state has a summed probability score. Once a path gets below a threshold, it can be removed from the tree. This will allow us to "correct" mistakes made earlier. E.g.: if we're not sure if `a3` or `a4` was played by white, but we see black play `bxa4`, we can confirm `a4` as the most likely move.

## Development tools
 - Run `npm install` to get started
 - Run `npm test` to run tests *once* (try to remember to do this before pushing...)
 - Run `npm run test:w` to automatically compile test bundles and run tests.
 - Run `build` to compile main javascript bundle
 - Run `scss` to compile scss files
 - Run `npm start` to start a local server
 
## The web UI
![chessitize UI](https://github.com/SimonJaspers/chessitize/blob/master/ChessitizeUI.gif)

In the web UI, you can upload a set of pictures and analyze the game. Note that the order of the pictures can get a bit buggy. Make sure the pictures in the folder are sorted alphabetically...
 
## Example Picture Set
You can use [this picture set](https://drive.google.com/drive/folders/1mpYWX-ZhJFkkVNh0HMidfy0dE3Km0pcN) for testing purposes. It's based on a game between Byrne and Fischer (check out the [annotated version](http://www.chessgames.com/perl/chessgame?gid=1008419&wm=b023%3Fq%24q&kpage=18)).

In the real game, white resigns on move 22. The picture set includes a fictive ending based on Fischer's own comments. The PGN (move 22, 23, 24 and 25 weren't played in the real game):

> ```
> 1. d4 Nf6 2. c4 g6 3. g3 c6 4. Bg2 d5
> 5. cxd5 cxd5 6. Nc3 Bg7 7. e3 O-O 8. Nge2 Nc6
> 9. O-O b6 10. b3 Ba6 11. Ba3 Re8 12. Qd2 e5
> 13. dxe5 Nxe5 14. Rfd1 Nd3 15. Qc2 Nxf2 16. Kxf2 Ng4+
> 17. Kg1 Nxe3 18. Qd2 Nxg2 19. Kxg2 d4 20. Nxd4 Bb7+
> 21. Kf1 Qd7 22.Qf2 Qh3+ 23.Kg1 Re1+ 24.Rxe1 Bxd4 25.Qxd4 Qg2#
> ```
