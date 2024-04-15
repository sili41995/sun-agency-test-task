import getContentGeometry from './getContentGeometry';

function getPositionProps({ element, offsetY, offsetX, clientX, clientY }) {
  const { innerWidth, innerHeight } = window;
  const { height, width } = getContentGeometry(element);
  const leftPosition = clientX - offsetX;
  const topPosition = clientY - offsetY;
  const shouldUpdatePositionTop =
    innerHeight - topPosition < height && topPosition <= 0;
  const shouldUpdatePositionLeft =
    innerWidth - leftPosition < width && leftPosition <= 0;

  return {
    shouldUpdatePositionTop,
    shouldUpdatePositionLeft,
    leftPosition,
    topPosition,
  };
}

export default getPositionProps;
