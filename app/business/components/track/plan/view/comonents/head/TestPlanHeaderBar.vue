<template>
    <div class="test-plan-header-bar">
        <div class="header-info">
            <slot name="info"></slot>
        </div>
        <div class="menu-ul">
            <slot name="menu"></slot>
        </div>
    </div>
</template>

<script>
import SelectMenu from '../../../../common/SelectMenu';
export default {
    name: 'MsTestPlanHeaderBar',
    components: { SelectMenu },
    data() {
        return {};
    },
    props: {},
    methods: {},
};
</script>

<style scoped>
.test-plan-header-bar {
    height: 50px;
    background-color: #fff;
}

.header-info {
    height: 50px;
    width: 200px;
    line-height: 50px;
    vertical-align: top;
    display: inline-block;
}

.menu-ul {
    width: 500px;
    display: inline-block;
    margin-left: 10px;
}

.menu-ul >>> .el-menu-item {
    height: 51px !important;
}
</style>
