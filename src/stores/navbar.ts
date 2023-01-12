import { ref, computed } from "vue";
import { defineStore } from "pinia";

const state = ref(true)

export const useNavbarStore = defineStore("navbar", () => {
  function enable() {
    state.value = true
  }

  function disable() {
    state.value = false
  }

  function toggle() {
    state.value = !state.value
  }

  return { state, enable, disable, toggle };
});
