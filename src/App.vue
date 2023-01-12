<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import TitleBar from "@/components/TitleBar.vue"
import { useNavbarStore } from "./stores/navbar";
</script>

<template>
  <head>
    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
    <meta name='color-scheme' content='only light' />
    <link rel='icon' href='/favicon.ico' />
    <link
      href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
      rel='stylesheet'
    />
  </head>
  <div class="fixed">
    <Navbar :class="useNavbarStore().state ? 'animate__slideOutLeft' : 'fixed animate__slideInLeft'" class="animate__animated animate__faster"/>
  </div>
  <div class="flex flex-row w-full">
    <div class="flex w-full justify-center">
      <div class="flex flex-col max-w-[768px] px-8 py-8 gap-8">
        <TitleBar/>
        <RouterView/>
      </div>
    </div>
  </div>
</template>

