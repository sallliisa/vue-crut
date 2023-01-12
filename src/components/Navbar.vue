<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import {ref} from 'vue'
import Button from '@/components/Button.vue';
import IconNavbarControl from './icons/IconNavbarControl.vue';
import { useNavbarStore } from '@/stores/navbar';


const logoutText = ref(false)
</script>

<template>
    <div v-if="$route.name != 'Login'" class="flex flex-col sticky top-0 items-center py-8 px-4 gap-4 h-screen w-64 bg-c-background border-r border-c-outline">
        <div @click="useNavbarStore().toggle()" class="flex flex-row justify-end w-full"><button><IconNavbarControl class="fill-white w-8 h-8 flex lg:hidden" :active="useNavbarStore().state"/></button></div>
        <div class="flex flex-col gap-2 items-center">
            <button @click="logoutText = !logoutText" class="flex flex-col items-center justify-center w-full px-4 py-2 bg-black/50 cursor-pointer hover:bg-black/30 rounded-full">
                <div>{{ useUserStore().user.fullname }}</div>
            </button>
            <Button @click="useUserStore().logOut()" class="bg-red-500 hover:bg-red-800 px-4 py-2 rounded-lg" v-if="logoutText">Log out</Button>
        </div>
    </div>
</template>