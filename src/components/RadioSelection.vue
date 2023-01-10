<script setup lang="ts">
import IconRadio from './icons/IconRadio.vue';
import { ref } from 'vue';
import Group from './Group.vue';
const props = defineProps({items: {type: Array, required: true}});
const emit = defineEmits(['activeItemChange']);
const activeItem = ref(0);
const setActiveItem = (itemIdx: number) => {
    activeItem.value = itemIdx;
    emit('activeItemChange', activeItem.value);
};
</script>

<template>
    <Group v-for="(item, idx) in props.items">
        <button @click="setActiveItem(idx)" class="flex flex-row gap-2 items-center">
            <IconRadio :key="idx" :active="activeItem === idx" />
            <h1 class="text-sm">{{ item }}</h1>
        </button>
    </Group>
</template>