<script setup lang="ts">
import { ref, reactive } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({items: {type: Array<String>, default: [], required: true}})
const emit = defineEmits(['updateValue'])
const activeItems = reactive(new Set())

function updateActiveItems(idx: Number) {
    activeItems.has(idx) ? activeItems.delete(idx) : activeItems.add(idx)
    emit('updateValue', activeItems)
}
</script>

<template>
    <button v-for="(item, idx) in props.items" @click="updateActiveItems(idx)" class="border border-c-outline px-4 py-2 rounded-lg" :class="activeItems.has(idx) ? 'bg-c-primary hover:bg-c-primary/80' : 'bg-transparent'" >
        {{ item }}
    </button>
</template>
