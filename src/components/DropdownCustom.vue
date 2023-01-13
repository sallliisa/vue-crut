<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideHandler } from '@vueuse/core'
import { ref } from 'vue'

const dropdown = ref(false)
const dropdownHandler: OnClickOutsideHandler = (event) => {
  console.log(event)
  dropdown.value = false
}
</script>
<template>
    <div class="relative">
        <button @click.stop="dropdown = !dropdown">
            <slot></slot>
        </button>
        <div v-if="dropdown" v-on-click-outside.bubble="dropdownHandler" class="z-50 absolute min-w-max w-[100%] mt-8 gap-2 bg-transparent border border-rbs-grey/20 rounded-md p-2">
            <div
            href="#"
            class="cursor-pointer hover:bg-rbs-primary/20 rounded-md p-2 text-left"
            v-for="(item, idx)
            in items" @click="[setActiveItem(idx), dropdown = !dropdown]">{{ item }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Dropdown",
    props: {
        items: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            menuToggle: false,
            activeItem: 0
        };
    },
    methods: {
        toggleDropdown() {
            this.menuToggle = !this.menuToggle;
        },
        setActiveItem(itemIdx: number) {
            this.activeItem = itemIdx;
            this.$emit("activeItemChange", this.activeItem);
        }
    },
    emits: ["activeItemChange"],
}
</script>