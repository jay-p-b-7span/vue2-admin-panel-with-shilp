import PulseLoader from "@/components/PulseLoader";
import Vue from "vue";
const pulseLoaderClass = Vue.extend(PulseLoader);

let pulseLoaderInstance;
let propItems = {};
function checkLoaderVisibility(value) {
  if (value == true) return true;
  else if (value.isVisible) return true;
  return false;
}

function makeInstanceOfComponent(props = null) {
  if (props) return new pulseLoaderClass({ propsData: props });
  else return new pulseLoaderClass();
}

function mountLoaderAndAppendToDom(element) {
  pulseLoaderInstance.$mount();
  element.parentElement.appendChild(pulseLoaderInstance.$el);
}

function unmountPulseLoader(element) {
  let pulseLoader = document.getElementById("pulse-loader");
  if (pulseLoader) {
    pulseLoader.remove();
    element.style.display = "block";
  }
}

function applyOverlay(element) {
  element.classList.add("relative", "overlay", "overlay--light");
}

function removeOverlay(element) {
  element.classList.remove("overlay", "overlay--light");
}

function propGenerator(value) {
  if (value.color) propItems["color"] = value.color;

  if (value.size) propItems["size"] = value.size;
}

function bindElement(element, value, modifiers) {
  if (value == true) {
    applyOverlay(element);
    pulseLoaderInstance = makeInstanceOfComponent();
    mountLoaderAndAppendToDom(element);
  } else if (value == false) {
    removeOverlay(element);
    unmountPulseLoader(element);
  } else {
    // Else Value is JSON OBject with Cusomization
    const isLoaderVisible = checkLoaderVisibility(value);
    if (isLoaderVisible) {
      propGenerator(value);

      if (value.overlay) applyOverlay(element);

      pulseLoaderInstance = makeInstanceOfComponent(propItems);

      mountLoaderAndAppendToDom(element);
    } else {
      if (value.overlay) removeOverlay(element);
      unmountPulseLoader(element);
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
