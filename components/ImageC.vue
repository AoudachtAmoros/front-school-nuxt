<template>
    <img :src="data.src" :alt="data.alt" class="object-cover">
</template>

<script>
export default {
  name: 'ImageC',
  props: ['data'],
}
</script>

<style scoped>
img{
  width: 100%;
  height: 100%;
}
</style>
