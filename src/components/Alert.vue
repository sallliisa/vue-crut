<script setup lang="ts">
const props = defineProps({sentiment: {type: Boolean, required: true}})
</script>

<template>
    <div class="bg-red-500 rounded-lg px-8 py-4" :class="sentiment ? 'bg-green-500' : 'bg-red-500'"><slot></slot></div>
</template>