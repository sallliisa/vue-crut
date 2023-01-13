<script setup lang="ts">
import { ref } from 'vue';
import IconMinus from './icons/IconMinus.vue';
import IconPlus from './icons/IconPlus.vue';

const props = defineProps({placeholder: {type: String, default: ''}, value: {type: String, default: '', required: false}})
const emit = defineEmits(['updateValue'])

const value = ref(props.value)

const updateValue = (val: string) => {
    value.value = val
    emit('updateValue', val)
}
</script>

<template>
    <div class="flex w-full px-4 py-2 border items-center border-c-outline rounded-full">
        <div class="flex flex-row gap-2 items-stretch w-full">
            <button @click="(value as any) > 0 ? (value as any)-- : null; emit('updateValue', value)">
                <IconMinus class="fill-white"/>
            </button>
            <slot></slot>
            <input
            class="focus:outline-none outline-none w-full text-sm bg-transparent"
            type="number"
            min="0"
            :value=value @input="(e) => updateValue((e.target as HTMLInputElement).value)"
            :placeholder=props.placeholder
            >
            <button @click="(value as any)++; emit('updateValue', value)">
                <IconPlus class="fill-white"/>
            </button>
        </div>
    </div>
</template>