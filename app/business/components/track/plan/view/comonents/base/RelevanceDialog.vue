<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        @close="close"
        width="75%"
        v-loading="result.loading"
        :close-on-click-modal="true"
        :modal-append-to-body="modalAppendBody"
        :append-to-body="appendBody"
        :destroy-on-close="true"
        :modal="showModal"
        :top="top"
    >
        <el-container class="main-content">
            <el-aside class="tree-aside" width="250px">
                <slot name="aside"></slot>
            </el-aside>

            <el-container>
                <el-main class="case-content">
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>

        <template v-slot:footer>
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script>
// import MsDialogFooter from '../../../../../common/components/MsDialogFooter';
// import SelectMenu from '../../../../common/SelectMenu';

export default {
    name: 'RelevanceDialog',
    components: {
        // SelectMenu,
        // MsDialogFooter,
    },
    data() {
        return {
            result: {},
            dialogVisible: false,
        };
    },
    props: {
        title: String,
        top: {
            type: String,
            default: '50px'
        },
        appendBody: {
            type: Boolean,
            default: false
        },
        modalAppendBody: {
            type: Boolean,
            default: false
        },
        showModal: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        open() {
            this.dialogVisible = true;
        },
        close() {
            console.log('执行关闭方法');

            this.dialogVisible = false;
        },
    },
};
</script>

<style scoped>
.el-dialog {
    min-height: 600px;
}

.tree-aside {
    max-height: 600px;
}

.el-dialog >>> .el-dialog__body {
    padding: 10px 20px;
}
</style>
