<template>
  <header>
    <router-link to="/">
      <h1>Where in the world?</h1>
    </router-link>
    <div class="toggle_mode" @click="changeMode">
      <div class="dark" v-if="!toggleMode">
        <i class="fa-solid fa-moon"></i>
        <span>Dark mode</span>
      </div>
      <div class="light" v-else>
        <i class="fa-solid fa-sun"></i>
        <span>Light mode</span>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderView",
  setup() {
    const toggleMode = ref(false);

    const changeMode = () => {
      if (toggleMode.value) {
        document.documentElement.style.setProperty(
          "--bg_white",
          "hsl(0, 0%, 98%)"
        );
        document.documentElement.style.setProperty(
          "--light_mode_elements",
          "hsl(0, 0%, 100%)"
        );
        document.documentElement.style.setProperty(
          "--light_mode_text",
          "hsl(200, 15%, 8%)"
        );
      } else {
        document.documentElement.style.setProperty(
          "--bg_white",
          "hsl(207, 26%, 17%)"
        );
        document.documentElement.style.setProperty(
          "--light_mode_elements",
          "hsl(209, 23%, 22%)"
        );
        document.documentElement.style.setProperty(
          "--light_mode_text",
          "hsl(0, 0%, 100%)"
        );
      }
      toggleMode.value = !toggleMode.value;
    };
    return { toggleMode, changeMode };
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--light_mode_elements);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  color: var(--light_mode_text);

  h1 {
    font-size: 1.1em;
  }

  .toggle_mode {
    cursor: pointer;
    i {
      margin: 0 16px;
    }
  }
  a {
    text-decoration: none;
    color: var(--light_mode_text);
  }
}

@media screen and (min-width: 768px) {
  header {
    padding: 20px;

    h1 {
      font-size: 2em;
    }
  }
}
</style>
