<template>
  <div class="animate-pulse">
    <div class="p-4 divide-y">
      <div
        v-for="i in 20"
        :key="`shimmer-${i}`"
        class="flex mx-2 py-2 g-2 flex--fit"
      >
        <p class="w-24 bg-grey-lighter h-8 rounded"></p>
        <p class="w-96 bg-grey-lighter h-8 rounded"></p>
        <p class="w-48 bg-grey-lighter h-8 rounded"></p>
        <p class="w-36 bg-grey-lighter h-8 rounded"></p>
        <p class="flex-grow bg-grey-lighter h-8 rounded"></p>
      </div>
    </div>
  </div>
</template>
