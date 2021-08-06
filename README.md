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

## Goal
To improve the accuracy of chess board image recognition by inputting the images of all board states between the start position and the current state and applying the rules of chess.

## In short
After white's first move there are 20 possible game states. 

Input the image of the board at its start position, the image of the board after white's first move, and the 20 possible new game states.

Save for each game state a probability, where 1 means we are completely sure the game state is on the board and 0 means we know for sure it isn't.

After black's first move there are 400 possible game states.

Input the image after white's first move and the one after black's first move, return the 400 states and their probability.

We now have a tree leading to 400 game states (1 root node with 20 children witch 20 children each). Continuing in this fashion will grow the number of game states to about 9k, 200k, 5mil, 120mil... you get the point.

Rather that brute forcing things, we can trim leaves that do not meet a minimum probability threshold. We can sum or multiply branch probabilities, only investigating the top N most likely states all the way up to the end of the game.

## Numbers
Modern image recognition approaches can identify the state of a chessboard's square with an error rate of 0.23%. Chances of Such an algorithm correctly identifying the state of a chess board are (1-0.0023)^64 = 0.86 = 86%. Chances of the algorithm correctly parsing a 40 move game are 0.0008%.

This project's goal is to optimize parsing whole games from images.

Gut feeling expectation:
- Given a set of good resolution images from a top-down angle we can parse 85% of 40 move games correctly.

## What else?
Some ideas:
- Confirm result of final state (-1, 0 or 1) for added precision
- For high level games, use an engine, opening books or endgame tables to penalize weird moves or blunders. For example: if a player blunders a piece, and the other player does not take it, it's not very likely that the blunder move actually happened. Or, more abstract: If a game goes from 0.0 to +5.0 and after a half move back to 0.0, it renders whether the +5.0 move happened suspect.
- If a game continues after a possible checkmate or draw, that board position gets a P of 0.
- Starting point should be 1 image per board state from a somewhat fixed angle, without people in the way. (e.g. take a snapshot when a chess clock is pressed) But it would certainly be interesting to try and parse videos of chess tournaments. Those games usually come with a nice PGN, sometimes even with timestamps. We could even use hand movement (towards pieces or clock) to try and determine which frames represent a new turn.


## Links
- **Chess board recognition:**
	- GitHub: https://github.com/georg-wolflein/chesscog
	- Paper: https://www.researchgate.net/publication/352083627_Determining_Chess_Game_State_from_an_Image
- **Format for storing a single board state:**\
	Forsyth-Edwards Notation (FEN): https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
- **Format for storing a complete game state:**\
	Portable Game Notation (PGN): https://en.wikipedia.org/wiki/Portable_Game_Notation
- **JS chess engine**:\
	https://www.npmjs.com/package/chess
 
---
# In this repo: work on a Proof of Concept
 
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
