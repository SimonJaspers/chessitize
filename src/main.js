import { squareChanges } from "./imageHandling/squareChanges";
import { crop } from "./imageHandling/crop";
import { perspectiveTransform } from "./imageHandling/perspectiveTransform";
import { getAllLegalMoves } from "./Moves";
import GameState, { applyMoveToGameState } from "./GameState";

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
    crop(perspectiveTransform(transform, img), myCrop);
  };

  transformFrom.subscribe(redraw);

  // Load initial image
  img.onload = () => redraw(transformFrom());
  img.src = URL.createObjectURL(imgFile);

  const gameState = ko.observable(GameState());
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

    const changes = squareChanges(ctxBefore, ctxAfter);
    // Side effect: store debug overlay
    this.lastChanges(changes.map(c => c.debugOverlay));

    const gameStateBefore = imgBefore.gameState();
    const allowedMoves = getAllLegalMoves(gameStateBefore);

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
      after.gameState(applyMoveToGameState(before.gameState(), move));
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
