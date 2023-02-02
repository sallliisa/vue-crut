<script setup lang="ts">
</script>

<template>
    <RouterLink to="/playground/one"><button>One</button></RouterLink>
    <RouterLink to="/playground/two"><button>Two</button></RouterLink>
    <div class="flex flex-col">
        <div>nested:</div>
        <RouterView/>
    </div>
</template>