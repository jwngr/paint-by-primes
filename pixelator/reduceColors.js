var fs = require('fs'),
  {createCanvas, Image} = require('canvas'),
  RgbQuant = require('rgbquant');
const termImg = require('term-img');
const Color = require('color');

var imgPath = process.argv[2],
  img,
  can,
  ctx,
  q,
  pal,
  out;

function getColorArray(__context) {
  let imageData = __context.getImageData(0, 0, 5, (img.height / img.width) * 1);

  let colorArray = [];

  if (!imageData) {
    return colorArray;
  }

  let data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    // let a = data[i + 3] / 255;
    let a = 1;

    let rgba = `rgba(${[r, g, b, a].join(',')})`;

    // console.log(rgba);

    if (a === 0) {
      colorArray.push('transparent');
    } else {
      let color = new Color(rgba);
      let invert = false;
      let hue = false;
      let hueRotate = false;
      let sat = false;
      // handle color modification
      if (invert === true) {
        color = color.negate();
      }
      if (typeof hue === 'number') {
        color = color.hue(hue);
      }
      if (typeof hueRotate === 'number') {
        color = color.rotate(hueRotate);
      }
      if (typeof sat === 'number') {
        color = color.saturate(sat);
      }
      let hsla = color.hsl().string();
      colorArray.push(hsla);
    }
  }

  return colorArray;
}

fs.readFile(imgPath, function(err, data) {
  if (err) {
    console.log('ERROR:', err);
  } else {
    img = new Image();
    img.src = data;

    canvas = createCanvas(img.width, img.height);
    context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    console.log(getColorArray(context));

    // q = new RgbQuant({colors: 4, method: 2, initColors: 4096, minHueCols: 0});
    // q.sample(canvas);
    // pal = q.palette(true);
    // out = q.reduce(canvas);

    // console.log(out);

    // base64Data = out.toDataURL().substr(out.toDataURL().indexOf(',') + 1);
    // const canvasData = Buffer.from(base64Data, 'base64');

    // termImg(canvasData, {
    //   width: options.row,
    //   fallback: () => {
    //     console.error('Oops!Not supported here!');
    //     process.exit(1);
    //   },
    // });

    // const base64Data = out.toDataURL().substr(out.toDataURL().indexOf(',') + 1);
    // const canvasData = Buffer.from(base64Data, 'base64');

    // termImg(canvasData, {
    //   width: img.row,
    //   fallback: () => {
    //     console.error('Oops!Not supported here!');
    //     process.exit(1);
    //   },
    // });
  }
});
