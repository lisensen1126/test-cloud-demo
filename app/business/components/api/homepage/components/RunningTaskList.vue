<template>
  <el-card class="table-card" v-loading="result.loading">
    <template v-slot:header>
      <span class="title">
        {{$t('api_test.home_page.running_task_list.title')}}
      </span>
    </template>
    <el-table border :data="tableData" class="adjust-table table-content" height="300px"
    :header-cell-style="{background:'#F7F8FA',color:'#94A0B2'}">
      <el-table-column width="100" prop="index"  :label="$t('api_test.home_page.running_task_list.table_coloum.index')" show-overflow-tooltip/>
      <el-table-column prop="name"  :label="$t('commons.name')" >
        <template v-slot:default="{row}">
          <!-- 若为只读用户不可点击之后跳转-->
          <span v-if="isReadOnly">
            {{ row.name }}
          </span>
          <el-link v-else type="info" @click="redirect(row)">
            {{ row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="taskType"  :label="$t('api_test.home_page.running_task_list.table_coloum.task_type')" show-overflow-tooltip>
        <template v-slot:default="scope">
          <ms-tag v-if="scope.row.taskGroup == 'API_SCENARIO_TEST'" type="success" effect="plain" :content="$t('api_test.home_page.running_task_list.scenario_schedule')"/>
          <ms-tag v-if="scope.row.taskGroup == 'TEST_PLAN_TEST'" type="warning" effect="plain" :content="$t('api_test.home_page.running_task_list.test_plan_schedule')"/>
          <ms-tag v-if="scope.row.taskGroup == 'SWAGGER_IMPORT'" type="danger" effect="plain" :content="$t('api_test.home_page.running_task_list.swagger_schedule')"/>
        </template>
      </el-table-column>
      <el-table-column  prop="rule"  :label="$t('api_test.home_page.running_task_list.table_coloum.run_rule')" show-overflow-tooltip/>
      <el-table-column :label="$t('api_test.home_page.running_task_list.table_coloum.task_status')">
        <template v-slot:default="scope">
          <div>
            <el-switch
              :disabled="isReadOnly"
              v-model="scope.row.taskStatus"
              class="captcha-img"
              @change="closeTaskConfirm(scope.row)"
            ></el-switch>
          </div>
        </template>


      </el-table-column>
      <el-table-column width="150" :label="$t('api_test.home_page.running_task_list.table_coloum.next_execution_time')">
        <template v-slot:default="scope">
          <span>{{ scope.row.nextExecutionTime | timestampFormatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="creator"  :label="$t('api_test.home_page.running_task_list.table_coloum.create_user')" show-overflow-tooltip/>
      <el-table-column width="100" :label="$t('api_test.home_page.running_task_list.table_coloum.update_time')">
        <template v-slot:default="scope">
          <span>{{ scope.row.updateTime | timestampFormatDate }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import {checkoutTestManagerOrTestUser} from "@/common/js/utils";
import MsTag from "@/business/components/common/components/MsTag";
export default {
  name: "MsRunningTaskList",
  components: {
    MsTag
  },
  props: {
    callFrom: String,
  },
  data() {
    return {
      value: '100',
      result: {},
      tableData: [],
      visible: false,
      loading: false
    }
  },

  computed:{
    isReadOnly(){
      return !checkoutTestManagerOrTestUser();
    },
    projectId() {
      return this.$store.state.projectId
    },
  },

  methods: {
    search() {
      if (this.projectId) {
        this.result = this.$get("/api/runningTask/"+ this.projectId +"/"+this.callFrom, response => {
          // console.log('运行中的定时任务',response)
          this.tableData = response.data;
        });
      }
    },

    closeTaskConfirm(row){
      let flag = row.taskStatus;
      row.taskStatus = !flag; //保持switch点击前的状态
      this.$confirm(this.$t('api_test.home_page.running_task_list.confirm.close_title'), this.$t('commons.prompt'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: 'warning'
      }).then(() => {
        this.updateTask(row);
      }).catch(() => {
      });
    },

    updateTask(taskRow){

      this.result = this.$post('/api/schedule/updateEnableByPrimyKey', taskRow, response => {
        this.search();
      });
    },
    redirect(param){
      if(param.taskGroup === 'TEST_PLAN_TEST'){
        this.$emit('redirectPage','testPlanEdit','', param.scenarioId);
      }else if(param.taskGroup === 'API_SCENARIO_TEST') {
        this.$emit('redirectPage','scenario','scenario', 'edit:'+param.scenarioId);
      }
    }
  },

  created() {
    this.search();
  },
  activated() {
    this.search();
  },
  handleStatus(scope) {
    console.log(scope.row.userId)
  }
  }
</script>

<style scoped>

.el-table {
  cursor:pointer;
}
.el-card /deep/ .el-card__header {
  border-bottom: 1px solid #e6e6e6;
  /* margin-bottom:15px; */
}

</style>
