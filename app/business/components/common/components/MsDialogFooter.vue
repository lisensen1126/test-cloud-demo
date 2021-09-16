<template>
    <div class="dialog-footer" style="text-align:right">
        <div>
            <el-button size="mini" @click="cancel">{{$t('commons.cancel')}}</el-button>
            <el-button
                size="mini"
                type="primary"
                @click="confirm"
                @keydown.enter.native.prevent
            >{{$t('commons.confirm')}}</el-button>
            <el-button
                size="mini"
                type="primary"
                v-if="isShow"
                @click="saveAsEdit"
                @keydown.enter.native.prevent
            >{{title}}</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MsDialogFooter',
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        title: String,
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            this.$emit('confirm');
        },
        saveAsEdit() {
            this.$emit('saveAsEdit');
        },
    },
};
</script>

<style scoped>
.dialog-footer {
    overflow: hidden;
}
.el-button:active {
    border-color: #202d40;
}
.el-button:hover {
    background-color: #f5f7fa;
    border: 1px solid #dadfe6;
    color: #606266;
}
.el-button:focus {
    border-color: #dcdfe6;
}
.el-button--primary:active {
    background-color: #606c80;
}
.el-button--primary:hover {
    background-color: #606c80;
    border: 1px solid #606c80;
    color: #fff;
}
</style>
