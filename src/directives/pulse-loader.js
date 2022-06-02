function bindElement(element, value, modifiers) {
  let div = document.createElement("div");
  div.innerHTML =
    '<div class="loader-container">\
  <div\
    class="loader-child first-child pulse-loader--primary w-4 h-4"\
  ></div>\
  <div\
    class="loader-child second-child pulse-loader--primary w-4 h-4"\
  ></div>\
  <div\
    class="loader-child third-child pulse-loader--primary w-4 h-4"\
  ></div>\
\
  <div\
    class="loader-child fourth-child pulse-loader--primary w-4 h-4"\
  ></div>\
</div>';
  if (value) {
    element.parentElement.appendChild(div);
    element.style.display = "none";
  } else {
    element.parentElement.removeChild(div);
    element.style.display = "block";
  }
}

export const pulseLoader = {
  // next tick is necessary inorder to get dom fully available after mount or else we get parent element null
  bind: (el, { value, modifiers }, vnode) => {
    vnode.context.$nextTick(() => {
      bindElement(el, value, modifiers);
    });
  },
  update: (el, { value, modifiers }) => {
    bindElement(el, value, modifiers);
  },
};
