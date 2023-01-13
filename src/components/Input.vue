<script setup lang="ts">
import { ref } from 'vue';

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
            <div>
                <slot></slot>
            </div>
            <input
            class="focus:outline-none outline-none w-full text-sm bg-transparent"
            :value=value @input="(e) => updateValue((e.target as HTMLInputElement).value)"
            :placeholder=props.placeholder
            >
        </div>
    </div>
</template>