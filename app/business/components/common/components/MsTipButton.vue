<template>

  <el-tooltip 
    :content="tip"
    placement="bottom"
    :enterable="false"
    :effect="effect"
    :disabled="tooltipDisabled"
  >
    <el-button 
      @click="exec()"
      @click.stop="clickStop"
      @keydown.enter.native.prevent
      v-bind="{...options}"
      :disabled="disabled"
      :size="size"
      :style="btnStyle"
    >
      <template v-if="tip && type === 'text'">
        {{ tip }}
      </template>
    </el-button>
  </el-tooltip>

</template>

<script>
    export default {
      name: "MsTipButton",
      props: {
        tip: String,
        icon: {
          type: String,
          default: ''
        },
        type: {
          type: String,
          default: null
        },
        effect: {
          type: String,
          default: 'dark'
        },
        size: {
          type: String,
          default: 'mini'
        },
        disabled: {
          type: Boolean,
          default: false
        },
        tooltipDisabled: {
          type: Boolean,
          default: false
        },
        // 按钮形状
        shapes: {
          type: Object,
          default: () => ({ circle: true })
        },
        // 按钮样式
        btnStyle: {
          type: Object,
          default: () => ({})
        }
      },
      computed: {
        options() {
          return this.type === 'text' && this.tip
            ? {
              type: 'text'
            }
            : {
              icon: this.icon,
              type: this.type,
              ...this.shapes
            }
        }
      },
      methods: {
        exec() {
          this.$emit('click');
        },
        clickStop() {
          this.$emit('clickStop');
        }
      }
    }
</script>

<style scoped>

</style>
