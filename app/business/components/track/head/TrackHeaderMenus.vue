<template>
    <div id="menu-bar" v-if="isRouterAlive"></div>
</template>
<script>
import { LIST_CHANGE, TrackEvent } from '@/business/components/common/head/ListEvent';

export default {
    name: 'TrackHeaderMenus',
    data() {
        return {
            testPlanViewPath: '',
            isRouterAlive: true,
            testCaseEditPath: '',
            testCaseReviewEditPath: '',
            testCaseProjectPath: '',
            isProjectActivation: true,
            currentProject: '',
            caseRecent: {
                title: this.$t('test_track.recent_case'),
                url: '/test/case/recent/5',
                index: function(item) {
                    return '/track/case/edit/' + item.id;
                },
                router: function(item) {},
            },
            reviewRecent: {
                title: this.$t('test_track.recent_review'),
                url: '/test/case/review/recent/5',
                index: function(item) {
                    return '/track/review/view/' + item.id;
                },
                router: function(item) {},
            },
            planRecent: {
                title: this.$t('test_track.recent_plan'),
                url:
                    this.$store.state.projectId === ''
                        ? '/test/plan/recent/5/' + undefined
                        : '/test/plan/recent/5/' + this.$store.state.projectId,
                index: function(item) {
                    return '/track/plan/view/' + item.id;
                },
                router: function(item) {},
            },
        };
    },
    watch: {
        $route(to) {
            this.init();
        },
    },
    mounted() {
        this.init();
        this.registerEvents();
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
        init() {
            let path = this.$route.path;
            if (path.indexOf('/track/plan/view') >= 0) {
                this.testPlanViewPath = path;
                this.reload();
            }
            if (path.indexOf('/track/case/edit') >= 0) {
                this.testCaseEditPath = path;
                this.reload();
            }
            if (path.indexOf('/track/review/view') >= 0) {
                this.testCaseReviewEditPath = path;
                this.reload();
            }
        },
        registerEvents() {
            TrackEvent.$on(LIST_CHANGE, () => {
                this.$refs.planRecent.recent();
                // this.$refs.caseRecent.recent();
            });
        },
    },
    beforeDestroy() {
        TrackEvent.$off(LIST_CHANGE);
    },
};
</script>

<style scoped>
.el-divider--horizontal {
    margin: 0;
}

#menu-bar {
    /* border-bottom: 1px solid #e6e6e6; */
    /* background-color: #fff; */
}

.blank_item {
    display: none;
}

.el-divider--horizontal {
    margin: 0;
}

.deactivation >>> .el-submenu__title {
    border-bottom: white !important;
}

/*.project-change {*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*  color: inherit;*/
/*  margin-left: 20px;*/
/*}*/
</style>
