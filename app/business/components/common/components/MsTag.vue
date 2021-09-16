<template>
    <el-tooltip placement="top" v-if="showTooltip">
        <div slot="content">{{ content }}</div>
        <el-tag
            :type="type"
            v-bind="{...options}"
            :color="color"
            size="mini"
            :style="{ color: textColor }"
            >{{ content }}</el-tag
        >
    </el-tooltip>
    <el-tag
        v-else
        :type="type"
        v-bind="{...options}"
        :color="color"
        size="mini"
        :style="{ 'color': textColor, 'border-color': color }"
    >
        {{ content }}
    </el-tag>
</template>

<script>
export default {
    name: 'MsTag',
    props: {
        type: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: '',
        },
        textColor: {
            type: String,
            default: '',
        },
        content: {
            type: String,
        },
        effect: {
            type: String,
            default: '',
        },
        showTooltip: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        options() {
            return this.effect ? { effect: this.effect } : {}
        }
    }
};
</script>

<style scoped>

</style>
