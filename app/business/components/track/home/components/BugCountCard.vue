<template>
    <el-card class="table-card" v-loading="result.loading" body-style="padding:10px;">
        <div slot="header">
            <span class="title">
                {{ $t('test_track.遗留缺陷统计') }}
            </span>
        </div>
        <el-container>
            <el-aside width="200px" class="el-aside">
                <div class="data-picture">
                    <percentage-circle :value="bugTotalSize" />

                    <div>
                        {{ $t('test_track.占比') }}
                        <span class="rage">
                            {{ rage }}
                        </span>
                    </div>
                </div>
                <!-- <el-progress type="circle" :percentage="bugTotalSize" color="#3385FF" :stroke-width="10"></el-progress>
        <div>
            占比
            <span class="rage">
                {{rage}}
            </span>
          </div> -->
                <!-- <div class="main-number-show">
          <span class="count-number">
            {{ bugTotalSize }}
          </span>
          <span style="color: #6C317C;">
            {{ $t('api_test.home_page.unit_of_measurement') }}
          </span>
          <div>
            占比
            <span class="rage">
                {{rage}}
            </span>
          </div>
        </div> -->
            </el-aside>
            <el-table
                border
                :data="tableData"
                class="adjust-table table-content"
                height="300"
                :header-cell-style="{ background: '#F7F8FA', color: '#94A0B2' }"
            >
                <el-table-column
                    prop="index"
                    :label="$t('test_track.report.list.num')"
                    width="60"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="planName"
                    :label="$t('test_track.report.list.test_plan')"
                    width="130"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="createTime"
                    :label="$t('commons.create_time')"
                    width="180"
                    show-overflow-tooltip
                >
                    <template v-slot:default="scope">
                        <span>{{ scope.row.createTime | timestampFormatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    column-key="status"
                    :label="$t('test_track.plan.plan_status')"
                    width="100"
                    show-overflow-tooltip
                >
                    <template v-slot:default="scope">
                        <span @click.stop="clickt = 'stop'">
                            <plan-status-table-item :value="scope.row.status" />
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="caseSize"
                    :label="$t('test_track.report.list.caseCount')"
                    width="80"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="bugSize"
                    :label="$t('test_track.report.list.缺陷数')"
                    width="80"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="passRage"
                    :label="$t('test_track.report.list.通过率')"
                    width="80"
                    show-overflow-tooltip
                />
            </el-table>
        </el-container>
    </el-card>
</template>

<script>
import { getCurrentProjectID } from '@/common/js/utils';
import PlanStatusTableItem from '@/business/components/track/common/tableItems/plan/PlanStatusTableItem';
import percentageCircle from '@/business/components/common/percentage-circle/percent';

export default {
    name: 'BugCountCard',
    components: {
        PlanStatusTableItem,
        percentageCircle,
    },
    data() {
        return {
            tableData: [],
            result: {},
            bugTotalSize: 0,
            rage: '0%',
        };
    },
    methods: {
        init() {
            this.result = this.$get('/track/bug/count/' + getCurrentProjectID(), res => {
                let data = res.data;
                this.tableData = data.list;
                this.bugTotalSize = data.bugTotalSize;
                this.rage = data.rage;
            });
        },
    },
    created() {
        this.init();
    },
    activated() {
        this.init();
    },
};
</script>

<style scoped>
.el-card /deep/ .el-card__header {
    border-bottom: 0px solid #ebeef5;
}

.el-aside {
    line-height: 100px;
    text-align: center;
}

.count-number {
    font-family: 'ArialMT', 'Arial', sans-serif;
    font-size: 33px;
    color: var(--count_number);
}

.rage {
    font-family: 'ArialMT', 'Arial', sans-serif;
    font-size: 22px;
    /* color: var(--count_number); */
    color: #3385ff;
    font-weight: bold;
}

.main-number-show {
    width: 100px;
    height: 100px;
    border-style: solid;
    border-width: 7px;
    border-color: var(--count_number_shallow);
    border-radius: 50%;
}

.count-number-show {
    margin: 20px auto;
}

.el-card /deep/ .el-card__header {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 15px;
}
.el-aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
