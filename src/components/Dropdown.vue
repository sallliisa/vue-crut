<script setup lang="ts">
import IconChevronDown from './icons/IconChevronDown.vue'
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
        <button @click.stop="dropdown = !dropdown" class="w-full flex flex-row gap-2 items-center justify-between border border-c-outline/75 hover:border-c-outline/100 px-[12px] py-[6px] rounded-[4px]">
            <h1 class="text-sm">{{ items[activeItem] }}</h1>
            <IconChevronDown class="mr-[-5px] fill-white" />
        </button>
        <div v-if="dropdown" v-on-click-outside.bubble="dropdownHandler" class="w-full z-50 absolute mt-2 gap-2 bg-c-background border border-c-outline rounded-md p-2">
            <div>
                <div 
                href="#"
                class="cursor-pointer hover:bg-black/25 rounded-md p-2 text-sm"
                v-for="(item, idx)
                in items" @click="[setActiveItem(idx), dropdown = !dropdown,]">{{ item }}
                </div>
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
        setActiveItem(itemIdx: number) {
            this.activeItem = itemIdx;
            this.$emit("activeItemChange", this.activeItem);
        }
    },
    emits: ["activeItemChange"],
    components: { IconChevronDown }
}
</script>