<template>
  <v-dialog
    :value="value"
    scrollable
    persistent
    :overlay="false"
    max-width="900"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title class="pos-r">
        上傳資料
        <v-spacer></v-spacer>
        <v-btn color="Secondary" fab x-small class="b-rad-12" @click="close">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="mt-4">
        <v-select
          v-model="targetExperiment"
          :items="experimentList"
          :rules="[requireRule]"
          label="匯入實驗"
          required
        />
        <UploadExcelComponent
          v-show="targetExperiment"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        />
        <v-data-table
          v-if="tableHeader.length"
          :headers="tableHeader"
          :items="tableData"
          :items-per-page="10"
          class="elevation-1 my-4"
        />
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn @click="close">取消</v-btn>
        <v-btn
          :disabled="!tableData.length > 0"
          color="primary"
          @click="handleUpload"
          :loading="isLoading"
        >
          上傳
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UploadExcelComponent from '@/components/excel/UploadExcel';
import { getAllExperiments, uploadExperimentResults } from '@/api/experiments';

export default {
  components: { UploadExcelComponent },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const requireRule = (v) => !!v || '此欄位為必填';
    return {
      targetExperiment: null,
      experimentList: [],
      requireRule,
      tableHeader: [],
      tableData: [],
      isLoading: false
    };
  },

  async mounted() {
    await this.getAllExperiments();
  },

  watch: {
    value(v) {
      v ? this.init() : this.reset();
    }
  },

  methods: {
    async init() {
      this.$set(this, 'localData', { ...this.passData });
      await this.getAllExperiments();
    },
    reset() {
      this.$set(this, 'tableHeader', []);
      this.$set(this, 'tableData', []);
    },
    close() {
      this.$emit('close');
    },
    async getAllExperiments() {
      const experiments = await getAllExperiments();
      this.experimentList = experiments.map(({ customize_id }) => {
        return {
          value: customize_id,
          text: customize_id
        };
      });
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$toast.warning('Please do not upload files larger than 1m in size.');
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableHeader = header.map((header) => {
        return {
          text: String(header),
          align: 'start',
          sortable: false,
          value: String(header)
        };
      });
      this.tableData = results;
    },
    async handleUpload() {
      try {
        this.isLoading = true;
        await uploadExperimentResults(this.targetExperiment, this.tableData);
        this.$toast.success('上傳成功');
        this.close();
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        this.$toast.error(error.message);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
