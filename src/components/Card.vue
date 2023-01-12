<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col min-w-0 gap-8 p-8 bg-c-background border border-c-outline rounded-lg">
            <slot name="header"></slot>
        <div class="flex flex-col gap-4">
            <slot></slot>
        </div>
    </div>
</template>