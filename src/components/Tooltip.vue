<script setup lang="ts">
import {ref} from "vue";
import { vElementHover } from "@vueuse/components";

const isHovered = ref(false)
function onHover(state: boolean) {
    isHovered.value = state
}
</script>

<template>
    <div class="relative">
        <div class="w-fit" v-element-hover="onHover">
            <slot  name="hoverable"></slot>
        </div>
        <div v-if="isHovered" class="absolute min-w-max mt-2 text-sm gap-2 bg-white border border-rbs-grey/20 rounded-md p-2">
                <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Tooltip",
}
</script>