<template>
    <el-card class="card-content" v-if="isShow">
        <el-button-group v-if="isShowChangeButton">
            <el-tooltip
                v-if="leftButtonEnable"
                class="item"
                effect="dark"
                :content="leftTip"
                placement="left"
            >
                <el-button plain :class="{ active: leftActive }" @click="changeTab('left')">{{
                    leftContent
                }}</el-button>
            </el-tooltip>

            <el-tooltip
                v-if="middleButtonEnable"
                class="item"
                effect="dark"
                :content="middleTip"
                placement="top"
            >
                <el-button plain :class="{ active: middleActive }" @click="changeTab('middle')">{{
                    middleContent
                }}</el-button>
            </el-tooltip>

            <el-tooltip
                v-if="rightButtonEnable"
                class="item"
                effect="dark"
                :content="rightTip"
                placement="right"
            >
                <el-button plain :class="{ active: rightActive }" @click="changeTab('right')">
                    {{ rightContent }}
                </el-button>
            </el-tooltip>
        </el-button-group>

        <template v-slot:header>
            <slot name="header"></slot>
        </template>
        <slot></slot>
    </el-card>
</template>

<script>
export default {
    name: 'MsTabButton',
    data() {
        return {
            isShow: true,
            showApiList: false,
            showTestCaseList: false,
            showDocList: true,
        };
    },
    props: {
        activeDom: String,
        isShowChangeButton: {
            type: Boolean,
            default: true,
        },
        leftButtonEnable: {
            type: Boolean,
            default: true,
        },
        middleButtonEnable: {
            type: Boolean,
            default: true,
        },
        rightButtonEnable: {
            type: Boolean,
            default: true,
        },
        leftContent: {
            type: String,
            default: 'left',
        },
        middleContent: {
            type: String,
            default: 'middle',
        },
        rightContent: {
            type: String,
            default: 'right',
        },
        leftTip: {
            type: String,
            default: 'left',
        },
        middleTip: {
            type: String,
            default: 'middle',
        },
        rightTip: {
            type: String,
            default: 'right',
        },
    },
    computed: {
        leftActive() {
            return this.activeDom === 'left';
        },
        middleActive() {
            return this.activeDom === 'middle';
        },
        rightActive() {
            return this.activeDom === 'right';
        },
    },
    methods: {
        changeTab(tabType) {
            this.$emit('update:activeDom', tabType);
        },
    },
};
</script>

<style scoped>
.active {
    background-color: #ffffff !important;
    border-radius: 3px !important;
}
.active:hover {
    color: #606266;
}
.case-button {
    border-left: solid 1px var(--primary_color);
}

.item {
    border: none;
    color: #3c4757;
    background-color: #eee;
    padding: 4px 8px !important;
    /* border: solid 1px var(--primary_color); */
}
.card-content /deep/ .el-button-group {
    padding: 3px 5px;
    background-color: #eee;
    border-radius: 3px;
}
.item:hover {
    color: #606266;
}
</style>
