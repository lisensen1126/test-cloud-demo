<template>
  <el-col :span="3" class="ms-left-cell">
    <el-button class="ms-left-buttion" size="small" @click="addPre">+ {{$t('api_test.definition.request.pre_script')}}</el-button>
    <br/>
    <el-button class="ms-left-buttion" size="small" @click="addPost">+ {{$t('api_test.definition.request.post_script')}}</el-button>
    <br/>
    <el-button class="ms-left-buttion" size="small" @click="addAssertions">+ {{$t('api_test.definition.request.assertions_rule')}}</el-button>
    <br/>
    <el-button class="ms-left-buttion" size="small" @click="addExtract">+ {{$t('api_test.definition.request.extract_param')}}</el-button>
  </el-col>
</template>

<script>
    import {createComponent} from "../../jmeter/components";
    import {Assertions, Extract} from "../../../model/ApiTestModel";

    export default {
      name: "ApiDefinitionStepButton",
      props: {
        request: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      methods: {
        addPre() {
          let jsr223PreProcessor = createComponent("JSR223PreProcessor");
          if (!this.request.hashTree) {
            this.request.hashTree = [];
          }
          this.request.hashTree.push(jsr223PreProcessor);
        },
        addPost() {
          let jsr223PostProcessor = createComponent("JSR223PostProcessor");
          if (!this.request.hashTree) {
            this.request.hashTree = [];
          }
          this.request.hashTree.push(jsr223PostProcessor);
        },
        addAssertions() {
          let assertions = new Assertions();
          if (!this.request.hashTree) {
            this.request.hashTree = [];
          }
          this.request.hashTree.push(assertions);
        },
        addExtract() {
          let jsonPostProcessor = new Extract();
          if (!this.request.hashTree) {
            this.request.hashTree = [];
          }
          this.request.hashTree.push(jsonPostProcessor);
        },
      }
    }
</script>

<style scoped>

  .ms-left-cell .el-button {
    font-weight: 600;
  }
  .ms-left-cell .el-button:nth-of-type(1) {
    color: #0757CD;
    background-color: #DDEBFF;
    border: #0757CD;
  }

  .ms-left-cell .el-button:nth-of-type(2) {
    color: #F09E3E;
    background-color: #FFE9CF;
    border: #F09E3E;
  }

  .ms-left-cell .el-button:nth-of-type(3) {
    color: #3EAF8B;
    background-color: #DAFDE0;
    border: #DAFDE0;
  }

  .ms-left-cell .el-button:nth-of-type(4) {
    color: #656AF9;
    background-color: #E8E8FF;
    border: #E8E8FF;
  }

  .ms-left-buttion {
    margin: 0 0px 5px 30px;
  }

</style>
