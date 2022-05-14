<template>
  <s-layout full-height :left-classlist="['br-lightest']" left-size="200px">
    <template #left>
      <div class="p-3">
        <sub-nav>
          <s-nav-item label="Contact" icon="IconMdiWhatsapp" />
          <s-nav-item label="Domain" icon="IconMdiWeb" />
          <s-nav-item
            label="Theme"
            icon="IconMdiPaletteOutline"
            :to="{ name: 'theme' }"
          />
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
