import "../css/about-project.css";
import "../../node_modules/@glidejs/glide/dist/css/glide.core.css";

import Glide from '@glidejs/glide';

const firstGlide = new Glide('.glide', {
  type: 'carousel',
  startAt: 'center',
  peek: 88,
  gap: 16,
  startAt: 1,
  perView: 4,
})
.mount()





