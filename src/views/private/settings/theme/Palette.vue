<template>
  <s-field :label="name" class="my-4">
    <div class="flex items-center mt-1 flex--fit flex--nowrap">
      <div
        class="w-10 h-10 rounded-md relative cursor-pointer flex justify-center items-center text-white"
        :style="{ backgroundColor: shade500 }"
      >
        <!-- <SIcon class="block w-4 h-4" name="vmdi-eyedropper" /> -->
        <input
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          type="color"
          v-model="shade500"
        />
      </div>
      <div class="palette">
        <div
          v-for="shade in shortedShades"
          :style="{ backgroundColor: palette[shade] }"
          :key="shade"
        ></div>
      </div>
    </div>
  </s-field>
</template>

<script>
const Color = require("color");
export default {
  props: {
    name: String,
    value: Object,
  },

  data() {
    return {
      color: null,
    };
  },

  computed: {
    shortedShades() {
      return Object.keys(this.value).sort((a, b) => {
        return a - b;
      });
    },

    shade500: {
      get() {
        return this.color || this.value["500"];
      },
      set(value) {
        this.color = value;
        this.$emit("input", this.palette);
      },
    },

    palette() {
      if (!this.color) return this.value;

      const shades = [];
      const master = this.shade500;
      const color = Color(master);
      const hsl = color.hsl();
      const h = hsl.color[0];
      const s = hsl.color[1];
      const l = hsl.color[2];
      const lighterStep = (100 - l) / 5 - 1;
      const darkerStep = l / 4 - 6;

      //Light
      for (var i = 5; i > 0; i--) {
        const lightL = l + i * lighterStep;
        let lightColor = Color.hsl(h, s, lightL);
        shades.push(lightColor.hex());
      }

      //Default
      const defaultColor = Color.hsl(h, s, l);
      shades.push(defaultColor.hex());

      //Dark
      for (var j = 1; j <= 4; j++) {
        const darkL = l - j * darkerStep;
        let darkColor = Color.hsl(h, s, darkL);
        shades.push(darkColor.hex());
      }

      const palette = {};
      shades.forEach((color, index) => {
        if (index == 0) {
          palette["50"] = color;
        } else {
          palette[`${index}00`] = color;
        }
      });

      return palette;
    },
  },
};
</script>

<style lang="scss">
.palette {
  display: grid;
  border-radius: 6px;
  overflow: hidden;
  margin-left: auto;
  grid-template-columns: repeat(10, 28px);
  grid-template-rows: 40px;
}
</style>
