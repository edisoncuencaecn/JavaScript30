<template>
    <div>
     <p>now-playing</p>
     <br>
     <NuxtLink v-on:click="changeItemState(item)":to="`/`">
        <img src="/favicon.ico" class="h-8" alt="Home" />
     </NuxtLink>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>