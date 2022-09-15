<template>
  <div>
    <v-row>
      <v-col>
        <v-chart
          class="chart"
          :option="option"
          @click="triggerClick"
          :loading="isLoading"
        />
      </v-col>
      <v-col class="ma-auto">
        <v-img :aspect-ratio="4 / 3" :src="ImageData[currentDataIndex]"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent
]);

export default {
  name: 'LineChart',
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  props: {
    TimeData: {
      type: Array
    },
    BentaData: {
      type: Array
    },
    MerraData: {
      type: Array
    },
    ImageData: {
      type: Array
    },
    BentaMovAvgData: {
      type: Array
    },
    MerraMovAvgData: {
      type: Array
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentDataIndex: 0
    };
  },

  computed: {
    option() {
      return {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['Benta', 'Merra', 'Benta_Mov_Avg', 'Merra_Mov_Avg']
        },
        dataZoom: [
          {
            start: 0,
            end: 100
          }
        ],
        xAxis: [
          {
            type: 'time',
            axisLabel: {
              formatter: (value) => {
                return this.$moment(value, 'x').format('HH:mm:ss');
              }
            },
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Benta',
            min: 0,
            max: 0.1
          },
          {
            type: 'value',
            name: 'Merra',
            min: 0,
            max: 10
          }
        ],
        series: [
          {
            name: 'Benta',
            type: 'line',
            data: this.BentaData
          },
          {
            name: 'Benta_Mov_Avg',
            type: 'line',
            data: this.BentaMovAvgData
          },
          {
            name: 'Merra',
            type: 'line',
            yAxisIndex: 1,
            data: this.MerraData
          },
          {
            name: 'Merra_Mov_Avg',
            type: 'line',
            yAxisIndex: 1,
            data: this.MerraMovAvgData
          }
        ]
      };
    }
  },

  watch: {
    ImageData() {
      this.currentDataIndex = this.ImageData.length - 1;
    }
  },

  methods: {
    triggerClick(param) {
      this.currentDataIndex = param.dataIndex;
    }
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
