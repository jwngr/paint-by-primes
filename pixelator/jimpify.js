var Jimp = require('jimp');

Jimp.read(process.argv[2], (err, lenna) => {
  if (err) throw err;
  lenna
    .rgba(false)
    .background(0xffffffff)
    // .resize(256, 256) // resize
    .quality(100) // set JPEG quality
    // .greyscale() // set greyscale
    .pixelate(4) // set greyscale
    // .normalize()
    .write('../images/jimified.jpg'); // save
});
