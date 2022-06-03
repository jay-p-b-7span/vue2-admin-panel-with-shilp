import PulseLoader from "@/components/PulseLoader";
import Vue from "vue";
const pulseLoaderClass = Vue.extend(PulseLoader);

let pulseLoaderInstance;

function isElementVisible(value) {
  if (value.isVisible) return true;
  return false;
}

function makeInstanceOfComponent(props = null) {
  if (props) return new pulseLoaderClass({ propsData: props });
  else return new pulseLoaderClass();
}

function unmountPulseLoader() {
  let pulseLoader = document.getElementById("pulse-loader");
  if (pulseLoader) {
    pulseLoader.remove();
    element.style.display = "block";
  }
}
function bindElement(element, value, modifiers) {
  const toShowElement = isElementVisible(value);
  if (toShowElement) {
    if (value.color) {
      pulseLoaderInstance = makeInstanceOfComponent({ color: value.color });
    } else pulseLoaderInstance = makeInstanceOfComponent();

    pulseLoaderInstance.$mount();

    element.parentElement.appendChild(pulseLoaderInstance.$el);
    element.style.display = "none";
  } else unmountPulseLoader();
}

export const pulseLoader = {
  // next tick is necessary inorder to get dom fully available after mount or else we get parent element null

  bind: (el, { value, modifiers }, vnode) => {
    vnode.context.$nextTick(() => {
      bindElement(el, value, modifiers);
    });
  },
  update: (el, { value, modifiers }, vnode) => {
    vnode.context.$nextTick(() => {
      bindElement(el, value, modifiers);
    });
  },
};
