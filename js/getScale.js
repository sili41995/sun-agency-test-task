import getContentGeometry from './getContentGeometry';
import refs from './refs';

function getScale() {
  const { innerWidth } = window;
  const { width } = getContentGeometry(refs.map);
  const scale = innerWidth / width;

  return scale;
}

export default getScale;
