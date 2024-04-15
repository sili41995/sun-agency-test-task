import getContentGeometry from './getContentGeometry';
import refs from './refs';

function onResizeWindow() {
  const { innerHeight } = window;
  const { height } = getContentGeometry(refs.map);
  const gap = Number.parseFloat(refs.map.style.top) + height - innerHeight;

  if (gap <= 0) {
    const { top } = getContentGeometry(refs.map);
    refs.map.style.top = `${top - gap}px`;
  }
}

export default onResizeWindow;
