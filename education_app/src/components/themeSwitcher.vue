<template>
  <div>
    <label class="switchTheme">
      <input type="checkbox" v-model="darkMode" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
    };
  },
  mounted() {
    // TODO if user have on settings change it
    const htmlElement = document.documentElement;
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      htmlElement.setAttribute("theme", "dark");
      this.darkMode = true;
    } else {
      htmlElement.setAttribute("theme", "light");
      this.darkMode = false;
    }
  },
  watch: {
    darkMode: function() {
      const htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlElement.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlElement.setAttribute("theme", "light");
      }
    },
  },
};
</script>
