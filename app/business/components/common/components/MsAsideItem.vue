<template>
    <ms-aside-container :enable-aside-hidden="false" :width="width + 'px'">
        <div class="title-bar" :style="{ height: titleBarHeight + 'px' }">
            <slot name="title">
                <span :style="{ 'line-height': titleBarHeight - 10 + 'px' }" class="title-left">
                    {{ title }}
                </span>
                <span :style="{ 'line-height': titleBarHeight - 10 + 'px' }" class="title-right">
                    <i class="el-icon-plus" @click="addFuc" />
                </span>
            </slot>
        </div>
        <slot name="content">
            <div
                :style="{ height: itemBarHeight + 'px' }"
                v-for="(item, index) in data"
                :key="index"
                class="item-bar"
                @click="itemSelected(index, item)"
                :class="{ 'item-selected': index == selectIndex }"
            >
                <input
                    class="item-input"
                    :style="{
                        height: itemBarHeight - 12 + 'px',
                        'line-height': itemBarHeight - 12 + 'px',
                        width: width - 90 + 'px',
                    }"
                    v-model="item.name"
                    :placeholder="$t('commons.input_content')"
                />
                <div class="item-right" :style="{ 'line-height': itemBarHeight - 10 + 'px' }">
                    <i
                        v-for="(operator, operatorIndex) in itemOperators"
                        :key="operatorIndex"
                        :class="operator.icon"
                        @click.stop="operator.func(item, index)"
                    />
                </div>
            </div>
        </slot>
    </ms-aside-container>
</template>

<script>
import MsAsideContainer from "./MsAsideContainer";

export default {
  name: "MsAsideItem",
  components: { MsAsideContainer },
  data() {
    return {
      selectIndex: -1
    }
  },
  props: {
    width: {
      type: Number,
      default: 200
    },
    titleBarHeight: {
      type: Number,
      default: 40
    },
    itemBarHeight: {
      type: Number,
      default: 35
    },
    title: String,
    data: Array,
    deleteFuc: Function,
    addFuc: Function,
    itemOperators: {
      type: Array,
      default() {
        return [
          {
            icon: 'el-icon-delete',
            func: this.deleteFuc
          }
        ];
      }
    },
    enableAsideHidden: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    itemSelected(index, item) {
      this.selectIndex = index;
      this.$emit('itemSelected', item);
    }
  }
}
</script>

<style scoped>
@import './css/MsAsideItem.css';
</style>
