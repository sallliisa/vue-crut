<script setup lang="ts">
const props = defineProps({active: {type: Boolean, default: false}})
</script>

<template>
<svg v-if="props.active" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="#286DF1" stroke-width="2"/>
    <circle cx="12" cy="12" r="6" fill="#286DF1"/>
</svg>
<svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="11" stroke="#3C4043" stroke-width="2"/>
</svg>
</template>