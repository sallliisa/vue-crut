<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import TitleBar from "@/components/TitleBar.vue"
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
  <div class="flex flex-row w-full">
    <Navbar/>
    <div class="flex flex-col w-full px-32 py-8 gap-8">
      <TitleBar/>
      <RouterView/>
    </div>
  </div>
</template>

