<template>
    <span>
        <slot name="front"></slot>
        <ms-table-operator-button
            :isTesterPermission="isTesterPermission"
            :tip="tip1"
            :tooltipDisabled="tooltipDisabled"
            v-bind="{ ...editOptions }"
            @exec="editClick"
            @click.stop="editClickStop"
        />
        <slot name="middle"></slot>
        <ms-table-operator-button
            :isTesterPermission="isTesterPermission"
            :tip="tip2"
            :tooltipDisabled="tooltipDisabled"
            v-bind="{ ...delOptions }"
            @exec="deleteClick"
            @click.stop="deleteClickStop"
        />
        <slot name="behind"></slot>
    </span>
</template>

<script>
import MsTableOperatorButton from "./MsTableOperatorButton";
export default {
  name: "MsTableOperator",
  components: { MsTableOperatorButton },
  props: {
    tip1: {
      type: String,
      default() {
        return this.$t('commons.edit');
      }
    },
    tip2: {
      type: String,
      default() {
        return this.$t('commons.delete');
      }
    },
    isTesterPermission: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: ''
    },
    tooltipDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editOptions() {
      return this.btnType === 'text'
        ? { type: 'text' }
        : { icon: 'el-icon-edit' }
    },
    delOptions() {
      return this.btnType === 'text'
        ? { type: 'text', btnStyle: { color: '#E41F24' } }
        : { icon: 'el-icon-delete', type: 'danger' }
    }
  },
  methods: {
    editClick() {
      this.$emit('editClick');
    },
    editClickStop() {
      this.$emit('editClickStop');
    },
    deleteClick() {
      this.$emit('deleteClick');
    },
    deleteClickStop() {
      this.$emit('deleteClickStop');
    }
  }
}
</script>

<style scoped>
</style>
