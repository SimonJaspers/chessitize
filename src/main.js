import { squareChanges } from "./imageHandling/squareChanges";

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

/**
 * @param {DataURL} dataURL
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
    writeTo(cvs.toDataURL());
  };
  img.src = dataURL;

  return writeTo;
};

const BoardImage = imgFile => {
  const transformFrom = ko.observableArray([
    { x: 0, y: 256 },
    { x: 0, y: 0 },
    { x: 256, y: 0 },
    { x: 256, y: 256 }
  ]);
  const fourPoints = ko.observableArray([]);
  // Write from points to transformFrom every 4th item
  fourPoints.subscribe(points => {
    if (points.length === 4) {
      transformFrom(points);
      fourPoints([]);
    }
  });

  const myCrop = ko.observable();
  // Link a virtual img
  const img = new Image();

  const redraw = transform => {
    crop(perspectiveTransform(transform, img), myCrop);
  };

  transformFrom.subscribe(redraw);

  // Load initial image
  img.onload = () => redraw(transformFrom());
  img.src = URL.createObjectURL(imgFile);

  return {
    original: img.src,
    crop: myCrop,
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
