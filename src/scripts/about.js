import "../css/about.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.min.css";
// import "../../node_modules/@glidejs/glide/dist/css/glide.theme.min.css";

import Glide from '@glidejs/glide';

new Glide('.glide', {
  type: 'carousel',
  startAt: 'center',
  peek: 80,
  width: 1200,
  slideWidth: 400,
  gap: 16,
  startAt: 1,
  perView: 3,
}).mount()




