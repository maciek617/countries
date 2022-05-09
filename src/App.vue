<template>
  <HeaderView />
  <router-view />
</template>

<script>
import HeaderView from "@/components/HeaderView";
export default {
  components: { HeaderView },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --light_mode_text: hsl(200, 15%, 8%);
  --bg_white: hsl(0, 0%, 98%);
  --light_mode_elements: hsl(0, 0%, 100%);
}

#app {
  text-align: center;
  min-height: 100vh;
  font-family: "Nunito Sans", sans-serif;
  background-color: var(--bg_white);
}
</style>
