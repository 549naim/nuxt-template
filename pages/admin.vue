<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: "adminauth",
});

</script>

<style lang="scss" scoped></style>