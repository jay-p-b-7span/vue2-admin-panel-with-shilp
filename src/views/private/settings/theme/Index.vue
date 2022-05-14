<template>
  <s-layout full-height :left-classlist="['br-lightest']" left-size="200px">
    <template #left>
      <div class="p-3">
        <sub-nav>
          <s-nav-item
            label="Colors"
            icon="IconMdiPaletteOutline"
            :to="{ name: 'color' }"
          />
          <s-nav-item label="Fonts" icon="IconMdiFormatFont" />
        </sub-nav>
      </div>
    </template>
    <template #default>
      <router-view />
    </template>
  </s-layout>
</template>

<script>
export default {};
</script>

<style></style>
