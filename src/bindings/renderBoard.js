const td = txt => {
  const d = document.createElement("td");
  d.innerText = txt;
  return d;
};

const pieceCharacters = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  " ": " "
};

ko.bindingHandlers.renderBoard = {
  init: (el, va) => {
    el.classList.add("Board");

    ko.computed(() => {
      const rows = ko.unwrap(va());
      ko.utils.emptyDomNode(el);

      rows.forEach(row => {
        const r = document.createElement("tr");

        row.forEach(piece => {
          r.appendChild(td(pieceCharacters[piece]));
        });

        el.appendChild(r);
      });
    });
  }
};
