/*
  Quick tree implementation that could help in backtracking faulty game states.
  
  The idea; 
  Start with the initial game state, something like:
  
    const gameTree = Node(
      { 
        state: GameState(),
        probability: 0,
        imageData
      }
    );
   
  Once there's image data for a new move, spawn child states. E.g.:
  
    const updateGameTree = (curentNode, imageDataBefore, imageDataAfter) => {
      const currentState = currentNode.state;
      const possibleMoves = getAllLegalMoves(currentState);

      const ratedMoves = possibleMoves.map(
        move => ({
          diff: getPixelDiff(imageDataBefore, imagaDataAfter, move),
          move
        })
      );

      const possibleStates = ratedMoves
        .filter(moveRating => moveRating.diff > TRESHOLD)
        .map(moveRating => Node({
          state: applyMoveToGameState(moveRating.move, currentState),
          probability: moveRating.diff
        }));

      currentNode.children = possibleStates;
    };
    
    updateGameTree(gameTree);
  
 When the next image data comes in, we essentially do the same, except we now
 do it for every possible state (i.e. leaf node). 
 
     allLeafs(gameTree).forEach(node => {
       updateGameTree(node, lastKnownImageData, newImageData);
     });

 Additional notes:
  - We might want to be strict with the TRESHOLD, since this tree will quickly grow.
    With both players having 20 possibilities on their first move, the number of leaf nodes
    after the first turn will already be 400.
  - Certain node paths might end up at the same game state, which means their children will
    be equal as well. Not sure if it's worth the complexity to merge those...
  - Other than having the treshold on move probability, it's probably wise to delete parts
    of the tree that are unlikely to recover. This might happen naturally (if candidate moves
    are simply all below the treshold), but we could also remove leafs based on the total path
    probability (remove all paths < x% of the current top candidate) or a fixed maximum leaf count.
  - We could create a UI to manually mark a move's probability as 100%, removing all other paths.
*/

const Node = (value, children = []) => ({
  value,
  children
});

const allPaths = (node, path = [], paths = []) =>
  nodeIsLeaf(node)
    ? [...paths, path.concat(node.value)]
    : node.children.flatMap(n => allPaths(n, path.concat(node.value)));

const allLeafs = (node, leafs = []) => 
  nodeIsLeaf(node)
    ? leafs.concat(node)
    : node.children.flatMap(n => allLeafs(n, leafs));

const nodeIsLeaf = node => node.children.length === 0;
