<template>
    <div class="content">
        เพิ่มเติมเอกสารที่เกี่ยวข้องได้ที่
        <a href="http://pubhtml5.com/" target="_blank">http://pubhtml5.com/</a>
    </div>
</template>

<script>
export default {
    async created() {
        window.open('http://pubhtml5.com/', '_blank')
    },
}
</script>
