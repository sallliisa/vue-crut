<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
import TitleBar from "@/components/TitleBar.vue"
import { useNavbarStore } from "./stores/navbar";
import {useScreenStore} from "@/stores/screen"
import { useUserStore } from "./stores/user";
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
  <div class="fixed" :class="useNavbarStore().state ? 'pointer-events-none' : ''">
    <Navbar :class="useNavbarStore().state ? 'hidden' : 'fixed'" class=""/>
  </div>
  <div class="flex flex-row min-w-0 w-full">
    <div class="flex min-w-0 w-full justify-center">
      <div class="flex flex-col min-w-0 w-[768px] px-8 py-8 gap-8">
        <TitleBar/>
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      navbarControl: false,
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
      switch (true) {
        case this.windowWidth < 640:
          useScreenStore().set(0)
          break
        case this.windowWidth < 768:
          useScreenStore().set(1)
          break
        case this.windowWidth < 1024:
          useScreenStore().set(2)
          break
        case this.windowWidth < 1280:
          useScreenStore().set(3)
          break
        case this.windowWidth < 1536:
          useScreenStore().set(4)
          break
        default:
          useScreenStore().set(5)
          break
      }
    },
  },
}
</script>