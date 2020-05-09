export function zoom(node, scale = 1.3) {
  node.style.transition = ".3s";

  function zoomIn() {
    node.style.transform = `scale(${scale})`;
  }

  function zoomOut() {
    node.style.transform = "scale(1)";
  }

  node.addEventListener("mouseenter", zoomIn);
  node.addEventListener("mouseleave", zoomOut);

  return {
    destroy() {
      node.removeEventListener("mouseenter", zoomIn);
      node.removeEventListener("mouseleave", zoomOut);
    }
  };
}
