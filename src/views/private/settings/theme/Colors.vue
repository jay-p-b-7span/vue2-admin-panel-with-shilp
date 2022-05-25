<template>
  <div class="color-parent-div">
    <page-header title="Colors.">
      <p>Customize the colors on your Admin panel</p>
      <p>
        Select the primary shade of your brand and palette will be generated
        automatically.
      </p>
    </page-header>

    <palette
      v-for="color in colorConfigs.brand"
      ref="color"
      :key="color.key"
      :name="color.value"
      v-model="colors[color.key]"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    var r = document.querySelector(":root");
    var rs = getComputedStyle(r);
  },
  watch: {
    "colors.primary"(newValue) {
      let r = document.querySelector(":root");

      // Light Shades
      r.style.setProperty("--color--primary", newValue[500]);
      r.style.setProperty("--color--primary--light", newValue[400]);
      r.style.setProperty("--color--primary--lighter", newValue[200]);
      r.style.setProperty("--color--primary--lightest", newValue[50]);

      // Dark Shades
      r.style.setProperty("--color--primary-dark", newValue[600]);
      r.style.setProperty("--color--primary--darker", newValue[800]);
      r.style.setProperty("--color--primary--darkest", newValue[900]);
    },
  },
  data() {
    return {
      colors: {
        primary: {
          lightest: "#EBEFFE",
          lighter: "#ACBCFE",
          light: "#637DFE",
          default: "#304FFE",
          dark: "#233BDA",
          darker: "#182BB6",
          darkest: "#091379",
        },
        secondary: {
          lightest: "#fff3e0",
          lighter: "#ffe0b2",
          light: "#ffb74d",
          default: "#ff9800",
          dark: "#fb8c00",
          darker: "#ef6c00",
          darkest: "#e65100",
        },
      },
      colorConfigs: {
        brand: [
          {
            key: "primary",
            value: "Primary Color",
          },
          {
            key: "secondary",
            value: "Secondary Color",
          },
        ],
      },
    };
  },
  components: {
    PageHeader: require("@/components/form/PageHeader.vue").default,
    Palette: require("./Palette").default,
  },
};
</script>

<style>
.color-parent-div {
  padding: 20px;
  max-width: 400px;
  width: 100;
}
</style>
