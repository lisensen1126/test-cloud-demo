<template>
    <div> 
        <!-- id="menu-bar" -->
        <!-- <ms-table-header
            :is-tester-permission="true"
            :condition.sync="condition"
            @search="search"
            :setupButton="true"
            :title="$t('api_test.title')"
            :show-create="false"
        /> -->
    </div>
</template>

<script>
import { LIST_CHANGE, PerformanceEvent } from '@/business/components/common/head/ListEvent';
import { getCurrentProjectID, getCurrentUserId, getCurrentWorkspaceId } from '@/common/js/utils';
// 页面头部
import MsTableHeader from '../../common/components/MsTableHeader';
import { REPORT_CONFIGS } from '../../common/components/search/search-components';

export default {
    name: 'PerformanceHeaderMenus',
    components: {
        MsTableHeader,
    },
    data() {
        return {
            condition: {
                components: REPORT_CONFIGS,
            },
            testRecent: {
                title: this.$t('load_test.recent'),
                url: '/performance/recent/5',
                condition: {
                    workspaceId: getCurrentWorkspaceId(),
                    projectId: getCurrentProjectID(),
                    userId: getCurrentUserId(),
                },
                index(item) {
                    return '/performance/test/edit/' + item.id;
                },
                router(item) {},
            },
            reportRecent: {
                title: this.$t('report.recent'),
                url: '/performance/report/recent/5',
                condition: {
                    workspaceId: getCurrentWorkspaceId(),
                    projectId: getCurrentProjectID(),
                    userId: getCurrentUserId(),
                },
                showTime: true,
                index(item) {
                    return '/performance/report/view/' + item.id;
                },
                router(item) {},
            },
            currentProject: '',
        };
    },
    methods: {
        registerEvents() {
            PerformanceEvent.$on(LIST_CHANGE, () => {
                this.$refs?.testRecent?.recent();
                this.$refs?.reportRecent?.recent();
            });
        },
    },
    mounted() {
        this.registerEvents();
    },
    beforeDestroy() {
        PerformanceEvent.$off(LIST_CHANGE);
    },
};
</script>

<style scoped>
.el-divider--horizontal {
    margin: 0;
}

.el-menu.el-menu--horizontal {
    border-bottom: none;
}

#menu-bar {
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
}
</style>
