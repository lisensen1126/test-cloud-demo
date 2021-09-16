<template>
    <el-col>
        <track-header-menus />
        <div>
            <transition mode="out-in">
                <router-view :baseUrl="baseUrl" />
            </transition>
        </div>
    </el-col>
</template>

<script>
import TrackHeaderMenus from './head/TrackHeaderMenus';

export default {
    name: 'TrackHome',
    components: { TrackHeaderMenus },
    data() {
        return {
            baseUrl: 'track',
        };
    },
    activated() {
        this.$refs.table.doLayout();
    },
};
</script>

<style>
.node-tree {
    margin: 3%;
}
</style>

<style scoped></style>
