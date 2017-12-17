import { squareChanges } from "./imageHandling/squareChanges";

const BoardImage = imgFile => {
  const cvs = fx.canvas();

  let transformFrom = [0, 256, 0, 0, 256, 0, 256, 256];
  const transformTo = [0, 256, 0, 0, 256, 0, 256, 256];

  const fourPoints = ko.observableArray([]);
  fourPoints.subscribe(points => {
    if (points.length === 4) {
      transformFrom = points.reduce((acc, { x, y }) => acc.concat(x, y), []);
      redraw();
      fourPoints([]);
    }
  });

  // The returned image data url
  const dataUrl = ko.observable("");

  // Link a virtual img
  const img = new Image();

  const redraw = () => {
    const texture = cvs.texture(img);

    // Draw & Transform
    cvs
      .draw(texture)
      .perspective(transformFrom, transformTo)
      .update();

    // Crop
    const sqImage = new Image();
    sqImage.onload = () => {
      const sqCvs = document.createElement("canvas");
      sqCvs.width = sqCvs.height = 256;
      const sqCtx = sqCvs.getContext("2d");
      sqCtx.drawImage(sqImage, 0, 0);

      // Write transformed image
      dataUrl(sqCvs.toDataURL());
    };

    sqImage.src = cvs.toDataURL();
  };

  // Load initial image
  img.onload = redraw;
  img.src = URL.createObjectURL(imgFile);

  return {
    original: img.src,
    crop: dataUrl,
    onClick: (d, e) => {
      const bbox = e.target.getBoundingClientRect();
      fourPoints.push({
        x: e.clientX - bbox.x,
        y: e.clientY - bbox.y
      });
    }
  };
};

const images = ko.observableArray([]);

const onNewFiles = (d, e) => {
  images(Array.from(e.target.files).map(BoardImage));
};

ko.applyBindings({ onNewFiles, images });
