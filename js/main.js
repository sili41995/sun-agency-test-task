import getContentGeometry from './getContentGeometry';
import getPositionProps from './getPositionProps';
import getScale from './getScale';
import onResizeWindow from './onResizeWindow';
import refs from './refs';

let offsetX = 0;
let offsetY = 0;
let left = 0;
let top = -454;

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
window.addEventListener('resize', onResizeWindow);
refs.zoomBtn.addEventListener('click', onZoomBtnClick);
document.addEventListener('touchstart', onTouchstart);
document.addEventListener('touchend', onTouchend);

function onZoomBtnClick(e) {
  e.currentTarget.blur();
  const targetClass = 'active';
  refs.zoomBtn.classList.toggle(targetClass);
  refs.map.classList.add('map-position');

  const isActiveBtn = refs.zoomBtn.classList.contains(targetClass);
  const scale = getScale();

  if (isActiveBtn) {
    refs.map.style.top = '0px';
    refs.map.style.left = '0px';
    refs.mapContainer.style.transform = `scale(${scale})`;
  } else {
    refs.map.style.top = `${top}px`;
    refs.map.style.left = `${left}px`;
    refs.mapContainer.style.transform = 'scale(1)';
  }
}

function onMouseDown(e) {
  const { left, top } = getContentGeometry(refs.map);
  const { clientX, clientY } = e;

  refs.map.addEventListener('mousemove', onMouseMove);
  refs.map.style.cursor = 'grabbing';
  refs.map.classList.remove('map-position');
  offsetX = clientX - left;
  offsetY = clientY - top;
}

function onTouchstart(e) {
  const { left, top } = getContentGeometry(refs.map);
  const { clientX, clientY } = e.targetTouches[0];

  refs.map.addEventListener('touchmove', onTouchmove);
  refs.map.style.cursor = 'grabbing';
  refs.map.classList.remove('map-position');
  offsetX = clientX - left;
  offsetY = clientY - top;
}

function onMouseUp() {
  refs.map.removeEventListener('mousemove', onMouseMove);
  refs.map.style.cursor = 'auto';
}

function onTouchend() {
  refs.map.removeEventListener('touchmove', onMouseMove);
  refs.map.style.cursor = 'auto';
}

function onMouseMove(e) {
  const { clientX, clientY } = e;
  const {
    shouldUpdatePositionTop,
    shouldUpdatePositionLeft,
    leftPosition,
    topPosition,
  } = getPositionProps({
    element: refs.map,
    offsetY,
    offsetX,
    clientX,
    clientY,
  });

  if (shouldUpdatePositionLeft) {
    refs.map.style.left = `${leftPosition}px`;
    left = leftPosition;
  }

  if (shouldUpdatePositionTop) {
    refs.map.style.top = `${topPosition}px`;
    top = topPosition;
  }
}

function onTouchmove(e) {
  const { clientX, clientY } = e.targetTouches[0];
  const {
    shouldUpdatePositionTop,
    shouldUpdatePositionLeft,
    leftPosition,
    topPosition,
  } = getPositionProps({
    element: refs.map,
    offsetY,
    offsetX,
    clientX,
    clientY,
  });

  if (shouldUpdatePositionLeft) {
    refs.map.style.left = `${leftPosition}px`;
    left = leftPosition;
  }

  if (shouldUpdatePositionTop) {
    refs.map.style.top = `${topPosition}px`;
    top = topPosition;
  }
}
