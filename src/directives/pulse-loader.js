import PulseLoader from "@/components/PulseLoader";
import Vue from "vue";
const pulseLoaderClass = Vue.extend(PulseLoader);

let pulseLoaderInstance;

function bindElement(element, value, modifiers) {
  if (value.isVisible) {
    if (value.color) {
      pulseLoaderInstance = new pulseLoaderClass({
        propsData: {
          color: value.color,
        },
      });
    } else {
      pulseLoaderInstance = new pulseLoaderClass();
    }

    pulseLoaderInstance.$mount();

    element.parentElement.appendChild(pulseLoaderInstance.$el);
    element.style.display = "none";
  } else {
    let pulseLoader = document.getElementById("pulse-loader");
    if (pulseLoader) {
      pulseLoader.remove();
      element.style.display = "block";
    }
  }
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
