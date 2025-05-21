<template>
  <LoadingView />
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>

<style scoped lang="scss">
@use "~/assets/css/variables.module.scss" as *;

main {
  padding-top: $header-height;
  min-height: 100vh;
  background-color: $background-color;
  color: $text-color;
}
</style>
