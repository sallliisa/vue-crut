<script setup lang="ts">
const props = defineProps({active: {type: Boolean, required: false, default: false}})
</script>

<template>
    <button class="flex flex-row items-start gap-4 px-4 py-3 rounded-full fill-white w-full" :class="active ? 'bg-c-primary font-bold' : 'bg-transparent font-normal hover:bg-c-primary/20'">
        <slot></slot>
    </button>
</template>