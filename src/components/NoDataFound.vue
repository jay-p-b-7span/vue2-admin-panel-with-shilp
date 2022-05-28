<template>
  <div class="text-center">
    <div class="error-page__icon-3">
      <div class="error-page__icon-2">
        <div class="error-page__icon-1">
          <div class="error-page__icon">
            <icon
              name="IconMdiFileDocumentMultiple"
              size="12"
              color="light"
              class
            />
          </div>
        </div>
      </div>
    </div>

    <span class="block text-lg mt-3 text-bold">No Data Found!</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.error-page__icon-3 {
  background-color: var(--color--primary--lightest);
}

.error-page__icon-2 {
  background-color: var(--color--primary--lighter);
}

.error-page__icon-1 {
  background-color: var(--color--primary--light);
}

.error-page__icon {
  border-radius: 50%;
  background-color: var(--color--primary);
  padding: 20px;
}

.error-page__icon-1,
.error-page__icon-2,
.error-page__icon-3 {
  padding: var(--space--2);
  border-radius: 50%;
  display: inline-block;
}
</style>
