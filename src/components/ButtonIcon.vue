<script setup lang="ts">
const props = defineProps({active: {type: Boolean, required: false, default: false}});
</script>

<template>
    <button :class="props.active ? 'bg-c-primary hover:bg-c-primary/50' : 'bg-transparent hover:bg-black/25'" class="flex items-center cursor-pointer justify-center min-w-[48px] w-12 min-h-[48px] h-12 border border-c-outline rounded-full">
        <slot></slot>
    </button>
</template>