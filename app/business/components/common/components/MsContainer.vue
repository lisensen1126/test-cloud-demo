<template>
    <el-container class="ms-container">
        <slot></slot>
    </el-container>
</template>

<script>
export default {
    name: 'MsContainer',
};
</script>

<style scoped>
.ms-container >>> span.title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
}
</style>
