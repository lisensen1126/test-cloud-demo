<template>
    <div class="percent-wp" :style="{width: width + 'px', height: height + 'px'}">
        <el-progress 
          type="circle" 
          :width="width" 
          :height="height" 
          :percentage="value" 
          :color="color" 
          :stroke-width="strokeWidth"
          :foramt="format"
          :show-text="false"
        />
        <div class="percentage-value">
            <span class="value">{{ value }}</span>
            <span v-if="unit" class="unit"> {{ unit }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [Number, String],
            default: 110
        },
        height: {
            type: [Number, String],
            default: 110
        },
        value: {
            type: [Number, String],
            default: 0
        },
        color: {
            type: String,
            default: '#3385FF'
        },
        strokeWidth: {
            type: [Number, String],
            default: 10
        },
        unit: {
            type: String,
            default: '个'
        }
    },

    computed: {
        format() {
            return '2个'
        }
    }
}
</script>

<style scoped>
.percent-wp {
    position: relative;
    margin: auto;
}
.percent-wp .percentage-value {
    position: absolute;
    display: flex;
    align-items: baseline;
    justify-content: center;
    left: 50%;
    top: 50%;
    width: 100%;
    padding: 0 15px;
    transform: translate(-50%, -50%);
}
.percent-wp .percentage-value .value {
    display: inline-block;
    height: 100%;
    font-family: 'ArialMT', 'Arial', sans-serif;
    font-size: 33px;
    color: #202D40;
    overflow-x: scroll;
}
.percent-wp .percentage-value .unit {
    width: 18px;
    height: 100%;
    font-size: 14px;
    color: #939EB0;
    padding-left: 5px;
}
</style>