<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          v-model="expDate"
          :items="expDateList"
          placeholder="請選擇日期"
          label="實驗日期"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="expCl"
          :items="expClList"
          :disabled="!expDate"
          placeholder="請選擇鏡片"
          label="實驗鏡片"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="expPressure"
          :items="expPressureList"
          :disabled="!expDate && !expCl"
          placeholder="請選擇水壓"
          label="實驗水壓"
        />
      </v-col>
      <v-col class="d-flex align-baseline">
        <v-select
          v-model="expTrial"
          :items="expTrialList"
          :disabled="!expDate && !expCl && !expPressure"
          placeholder="請選擇次數"
          label="實驗次數"
        />
        <v-btn
          color="primary"
          class="ml-4"
          :disabled="!expDate || !expCl || !expPressure || !expTrial"
          :loading="isLoading"
          @click="getExperimentByCondition"
        >
          搜尋
        </v-btn>
      </v-col>
    </v-row>
    <div
      v-if="targetExperiment"
      class="d-flex justify-center align-center text-h4"
    >
      {{ targetExperiment.customize_id }}
      <v-switch
        class="ml-4"
        v-model="isAutoUpdate"
        inset
        label="自動更新"
      ></v-switch>
    </div>
    <v-row v-if="targetExperiment">
      <v-col>
        <LineChart
          :is-loading="isChartDataLoading"
          :time-data="TimeData"
          :benta-data="BentaData"
          :merra-data="MerraData"
          :image-data="ImageData"
          :benta-mov-avg-data="BentaMovAvgData"
          :merra-mov-avg-data="MerraMovAvgData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getAllExperimentDate,
  getAllClByDate,
  getAllPressureByDateAndCl,
  getAllTrialByDateAndClAndPressure,
  getExperimentByCondition,
  getResultsByExpCustomizetId
} from '@/api/experiments';
import LineChart from '@/charts/LineChart.vue';

export default {
  name: 'Home',

  components: {
    LineChart
  },

  data() {
    return {
      expDate: null,
      expDateList: [],
      expCl: null,
      expClList: [],
      expPressure: null,
      expPressureList: [],
      expTrial: null,
      expTrialList: [],
      targetExperiment: null,
      isLoading: false,
      isChartDataLoading: true,
      TimeData: [],
      BentaData: [],
      MerraData: [],
      ImageData: [],
      timer: null,
      isAutoUpdate: false,
      BentaMovAvgData: [],
      MerraMovAvgData: []
    };
  },

  async mounted() {
    await this.getAllExperimentDate();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  watch: {
    expDate() {
      this.expCl = null;
      this.expPressure = null;
      this.expTrial = null;
      this.getAllClByDate();
    },
    expCl(v) {
      if (v !== null) {
        this.expPressure = null;
        this.expTrial = null;
        this.getAllPressureByDateAndCl();
      }
    },
    expPressure(v) {
      if (v !== null) {
        this.getAllTrialByDateAndClAndPressure();
      }
    },
    isAutoUpdate(v) {
      if (v) {
        this.timer = setInterval(async () => {
          if (this.targetExperiment) {
            await this.getResultsByExpCustomizetId();
          }
        }, 5000);
      } else {
        clearInterval(this.timer);
      }
    }
  },

  methods: {
    async getAllExperimentDate() {
      const dates = await getAllExperimentDate();
      this.expDateList = dates.map(({ date }) => {
        return {
          value: date,
          text: `${this.$moment(date).format('YYYY-MM-DD')}`
        };
      });
    },

    async getAllClByDate() {
      const cls = await getAllClByDate(this.expDate);
      this.expClList = cls.map((cls) => {
        return {
          value: cls.cl_name,
          text: cls.cl_name
        };
      });
    },

    async getAllPressureByDateAndCl() {
      const presures = await getAllPressureByDateAndCl(
        this.expDate,
        this.expCl
      );
      this.expPressureList = presures.map(({ pressure }) => {
        return {
          value: pressure,
          text: pressure
        };
      });
    },

    async getAllTrialByDateAndClAndPressure() {
      const trials = await getAllTrialByDateAndClAndPressure(
        this.expDate,
        this.expCl,
        this.expPressure
      );
      this.expTrialList = trials.map(({ trial }) => {
        return {
          value: trial,
          text: trial
        };
      });
    },

    async getExperimentByCondition() {
      this.isAutoUpdate = false;
      this.isLoading = true;
      this.targetExperiment = null;
      try {
        this.targetExperiment = await getExperimentByCondition(
          this.expDate,
          this.expCl,
          this.expPressure,
          this.expTrial
        );
        await this.getResultsByExpCustomizetId();
        this.isLoading = false;
        this.$toast.success('搜尋成功');
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.$toast.error(error.message);
      }
    },

    async getResultsByExpCustomizetId() {
      this.isChartDataLoading = true;
      this.TimeData = [];
      this.BentaData = [];
      this.MerraData = [];
      this.ImageData = [];
      this.BentaMovAvgData = [];
      this.MerraMovAvgData = [];
      const expResult = await getResultsByExpCustomizetId(
        this.targetExperiment.customize_id
      );
      expResult.map((data) => {
        const { time, benta, merra, image_url, benta_mov_avg, merra_mov_avg } =
          data;
        const formatTime = this.$moment(time, 'X').format(
          'YYYY-MM-DD HH:mm:ss'
        );
        this.TimeData.push(formatTime);
        this.BentaData.push([formatTime, this.roundToDecimal(5, benta)]);
        this.MerraData.push([formatTime, this.roundToDecimal(5, merra)]);
        this.ImageData.push(image_url);
        this.BentaMovAvgData.push([
          formatTime,
          this.roundToDecimal(5, benta_mov_avg)
        ]);
        this.MerraMovAvgData.push([
          formatTime,
          this.roundToDecimal(5, merra_mov_avg)
        ]);
      });
      this.isChartDataLoading = false;
    },

    roundToDecimal(digit, num) {
      return +(Math.round(num + `e+${digit}`) + `e-${digit}`);
    }
  }
};
</script>
