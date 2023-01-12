<script setup lang="ts">
import IconNavbarControl from './icons/IconNavbarControl.vue';
import { useNavbarStore } from '@/stores/navbar';
</script>

<template>
    <div class="flex flex-row items-center gap-4">
        <button v-if="$route.name != 'Login'" @click="useNavbarStore().toggle()"><IconNavbarControl class="fill-white w-8 h-8" :active="useNavbarStore().state"/></button>
        <h1 class="font-bold text-3xl">{{ $route.name }}</h1>
    </div>
</template>