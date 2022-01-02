<template>
    <div class="content">
        <a href="http://pubhtml5.com/">http://pubhtml5.com/</a>
    </div>
</template>

<script>
export default {
    async created() {
        window.open('http://pubhtml5.com/', '_blank')
        this.$router.push({ name: 'Dashboard' })
    },
}
</script>
