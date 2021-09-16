<template>
    <div></div>
</template>

<script>
// import MsRecentList from '../../common/head/RecentList';
// import MsShowAll from '../../common/head/ShowAll';
// import MsCreateButton from '../../common/head/CreateButton';
// import MsCreateTest from '../../common/head/CreateTest';
import { ApiEvent, LIST_CHANGE } from '@/business/components/common/head/ListEvent';
import { mapGetters } from 'vuex';

export default {
    name: 'MsApiHeaderMenus',
    components: {},
    data() {
        return {
            testRecent: {
                title: this.$t('load_test.recent'),
                url: '/api/recent/5',
                index: function(item) {
                    return '/api/test/edit/' + item.id;
                },
                router: function(item) {
                    return { path: '/api/test/edit', query: { id: item.id } };
                },
            },
            reportRecent: {
                title: this.$t('report.recent'),
                showTime: true,
                url: '/api/report/recent/5',
                index: function(item) {
                    return '/api/report/view/' + item.id;
                },
            },
            isProjectActivation: true,
            isRouterAlive: true,
            apiTestProjectPath: '',
            currentProject: '',
        };
    },
    computed: {
        ...mapGetters(['isNewVersion', 'isOldVersion']),
    },
    methods: {
        registerEvents() {
            ApiEvent.$on(LIST_CHANGE, () => {
                this.$refs.testRecent.recent();
                this.$refs.reportRecent.recent();
            });
        },
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        },
    },
    mounted() {
        this.registerEvents();
    },
    beforeDestroy() {
        ApiEvent.$off(LIST_CHANGE);
    },
};
</script>

<style scoped>
#menu-bar {
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
}

.menu-divider {
    margin: 0;
}

.blank_item {
    display: none;
}

.deactivation >>> .el-submenu__title {
    border-bottom: white !important;
}
</style>
