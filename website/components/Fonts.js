const FontFaceObserver = require('fontfaceobserver');

const loadFont = (fontFamily, weights) => {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${fontFamily}:${weights.join(',')}`;
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const font = new FontFaceObserver(fontFamily);

  font.load().then(() => {
    document.documentElement.classList.add(fontFamily.toLowerCase().replace('+', ''));
  });
};

const Fonts = () => {
  loadFont('Raleway', [400, 700]);
  loadFont('Roboto+Mono', [400]);
};

export default Fonts;
