function getContentGeometry(element) {
  const { height, width, left, top } = element.getBoundingClientRect();

  return { height, width, left, top };
}

export default getContentGeometry;
