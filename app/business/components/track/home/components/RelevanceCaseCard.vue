<template>
    <el-card class="table-card" v-loading="result.loading" body-style="padding:10px;">
        <div slot="header">
            <span class="title">
                {{ $t('test_track.case.associateCount') }}
            </span>
        </div>

        <el-container>
            <el-aside width="120px">
                <div class="data-picture">
                    <percentage-circle :value="relevanceCountData.allRelevanceCaseCount" />
                </div>
                <!-- <el-progress type="circle" :width="100" :height="100" :percentage="relevanceCountData.allRelevanceCaseCount" color="#358AFE" :stroke-width="10"></el-progress> -->
                <!-- <div class="main-number-show">
          <span class="count-number">
            {{relevanceCountData.allRelevanceCaseCount}}
          </span>
          <span style="color: #6C317C;">
            {{$t('api_test.home_page.unit_of_measurement')}}
          </span>
        </div> -->
            </el-aside>
            <el-main style="padding-left: 0px;padding-right: 0px;">
                <div style="width: 300px;margin:0 auto">
                    <el-row align="center">
                        <el-col
                            :span="6"
                            style="width:90px;padding: 5px;border-right-style: solid;border-right-width: 1px;border-right-color: #ECEEF4;"
                        >
                            <p>{{ $t('api_test.home_page.interfaceCase') }}</p>
                            <div class="count-info-div">{{ relevanceCountData.apiCaseCount }}</div>
                        </el-col>
                        <el-col
                            :span="6"
                            style="width:90px;padding: 5px;border-right-style: solid;border-right-width: 1px;border-right-color: #ECEEF4;"
                        >
                            <p>{{ $t('api_test.home_page.scenarioCase') }}</p>
                            <div class="count-info-div">
                                {{ relevanceCountData.scenarioCaseCount }}
                            </div>
                        </el-col>
                        <el-col :span="6" style="width:90px;padding: 5px;">
                            <p>{{ $t('api_test.home_page.performanceCase') }}</p>
                            <div class="count-info-div">
                                {{ relevanceCountData.performanceCaseCount }}
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>

        <el-container class="detail-container">
            <el-header style="height:20px;padding: 0px;margin-bottom: 10px;">
                <el-row>
                    <el-col>
                        {{ $t('api_test.home_page.api_details_card.this_week_add') }}
                        <el-link
                            type="info"
                            @click="redirectPage('thisWeekRelevanceCount')"
                            target="_blank"
                            style="color: #000000"
                            >{{ relevanceCountData.thisWeekAddedCount }}
                        </el-link>
                        {{ $t('api_test.home_page.unit_of_measurement') }}
                    </el-col>
                </el-row>
            </el-header>
            <el-main style="padding: 5px;margin-top: 10px">
                <el-container>
                    <el-aside
                        width="60%"
                        class="count-number-show"
                        style="margin-bottom: 0px;margin-top: 0px"
                    >
                        <el-container style="overflow:auto">
                            <el-aside style="width:auto">
                                {{ $t('api_test.home_page.coverage') }}:
                            </el-aside>
                            <el-main
                                style="min-width:120px;flex:none;padding: 0px 0px 0px 0px; line-height: 100px; text-align: left;margin-left: 10px;"
                            >
                                <span class="count-number">
                                    {{ relevanceCountData.coverageRage }}
                                    <el-tooltip placement="top" class="info-tool-tip">
                                        <div slot="content">
                                            {{ $t('api_test.home_page.formula.testplan_coverage') }}
                                        </div>
                                        <el-button
                                            icon="el-icon-info"
                                            style="padding:0px;border: 0px"
                                        ></el-button>
                                    </el-tooltip>
                                </span>
                            </el-main>
                        </el-container>
                    </el-aside>
                    <el-main style="padding: 5px">
                        <el-card
                            class="no-shadow-card"
                            body-style="padding-left:5px;padding-right:5px;background:#F7F8FA;"
                        >
                            <main>
                                <el-row>
                                    <el-col>
                                        <div class="review-main">
                                            <div class="review-color-red"></div>
                                            <span class="default-property">
                                                {{ $t('api_test.home_page.notcovered') }}
                                                {{ '\xa0\xa0' }}
                                                <el-link
                                                    type="info"
                                                    @click="redirectPage('uncoverage')"
                                                    target="_blank"
                                                    style="color: #000000"
                                                >
                                                    {{ relevanceCountData.uncoverageCount }}
                                                </el-link>
                                            </span>
                                        </div>
                                    </el-col>
                                    <el-col style="margin-top: 5px;">
                                        <div class="review-main">
                                            <div class="review-color-green"></div>
                                            <span class="main-property">
                                                {{ $t('api_test.home_page.covered') }}
                                                {{ '\xa0\xa0' }}
                                                <el-link
                                                    type="info"
                                                    @click="redirectPage('coverage')"
                                                    target="_blank"
                                                    style="color: #000000"
                                                >
                                                    {{ relevanceCountData.coverageCount }}
                                                </el-link>
                                            </span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </main>
                        </el-card>
                    </el-main>
                </el-container>
            </el-main>
        </el-container>
    </el-card>
</template>

<script>
import percentageCircle from '@/business/components/common/percentage-circle/percent';
export default {
    name: 'RelevanceCaseCard',
    components: {
        percentageCircle,
    },
    props: {
        relevanceCountData: {},
    },
    data() {
        return {
            result: {},
        };
    },
    methods: {
        redirectPage(clickType) {
            this.$emit('redirectPage', 'case', 'case', clickType);
        },
    },
};
</script>

<style scoped>
.table-card {
    overflow: auto;
}
.el-aside {
    line-height: 100px;
    text-align: center;
}
.count-number {
    font-family: 'ArialMT', 'Arial', sans-serif;
    font-size: 33px;
    color: #358afe;
    position: relative;
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
/* .detail-container{
  margin-top: 30px
} */
.no-shadow-card {
    -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1);
}
.default-property {
    font-size: 12px;
}
.main-property {
    color: #f39021;
    font-size: 12px;
}

.el-card /deep/ .el-card__header {
    border-bottom: 0px solid #ebeef5;
}

.count-info-div {
    margin: 3px;
}
.count-info-div >>> p {
    font-size: 10px;
}
.info-tool-tip {
    position: absolute;
    top: 0;
    right: -10px;
}
.text-color-blue {
    color: #358afe;
}
.review-main {
    display: flex;
    align-items: center;
}
.review-main > div {
    width: 6px;
    height: 5px;
    border-radius: 50%;
    margin-right: 5px;
}
.review-color-red {
    background: #e41f24;
}
.review-color-green {
    background: #74cc32;
}
.percentage-color {
    color: #358afe;
    font-size: 18px;
    font-weight: bold;
}
.detail-container {
    margin-top: 30px;
}
</style>
