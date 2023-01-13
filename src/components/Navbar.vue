<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import {ref} from 'vue'
import Button from '@/components/Button.vue';
import IconNavbarControl from './icons/IconNavbarControl.vue';
import { useNavbarStore } from '@/stores/navbar';
import IconUserCircle from './icons/IconUserCircle.vue'
import NavbarItem from './NavbarItem.vue'
import IconManage from './icons/IconManage.vue';
import IconDashboard from './icons/IconDashboard.vue'
import IconCylinder from './icons/IconCylinder.vue';


const logoutText = ref(false)
</script>

<template>
    <div v-if="$route.name != 'Login'" class="flex flex-col sticky top-0 items-center py-8 px-8 gap-4 h-screen w-72 bg-c-background border-r border-c-outline">
        <div @click="useNavbarStore().toggle()" class="flex flex-row justify-end w-full"><button><IconNavbarControl class="fill-white w-8 h-8 flex xl:hidden" :active="useNavbarStore().state"/></button></div>
        <div class="flex flex-col gap-2 w-full items-center h-[96px]">
            <button @click="logoutText = !logoutText" class="flex flex-row gap-4 items-center w-full px-4 py-2 bg-black/50 cursor-pointer hover:bg-black/30 rounded-full">
                <IconUserCircle class="fill-white"/>
                <div class="flex flex-col items-start">
                    <div class="text-sm">{{ useUserStore().user.fullname }}</div>
                    <div class="text-xs text-c-faded">{{ useUserStore().user.fullname }}</div>
                </div>
            </button>
            <Button @click="useUserStore().logOut()" class="bg-red-500 hover:bg-red-800 w-full px-4 py-2 rounded-full" v-if="logoutText">Log out</Button>
        </div>
        <div class="flex flex-col gap-2 w-full">
            <RouterLink to="/">
                <NavbarItem :active="$route.name == 'Dashboard'">
                    <IconDashboard/>
                    <div class="text-md">Dashboard</div>
                </NavbarItem>
            </RouterLink>
            <RouterLink to="/products">
                <NavbarItem :active="$route.name == 'Products'">
                    <IconManage/>
                    <div class="text-md">Products</div>
                </NavbarItem>
            </RouterLink>
            <RouterLink to="/uoms">
                <NavbarItem :active="$route.name == 'UOMs'">
                    <IconCylinder/>
                    <div class="text-md">UOMs</div>
                </NavbarItem>
            </RouterLink>
        </div>
    </div>
</template>