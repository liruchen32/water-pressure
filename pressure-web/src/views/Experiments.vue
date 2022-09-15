<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-h4 my-2">實驗</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end">
          <v-btn class="mx-2" color="primary" @click="handleAction('add')">
            新增
          </v-btn>
          <v-btn class="mx-2" color="secondary" @click="handleAction('upload')">
            上傳 Excel
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                v-for="action in item.actions"
                :key="action.action"
                :disabled="action.disable"
                :color="action.color"
                class="mr-3"
                @click="handleAction(action.action, item)"
              >
                {{ action.text }}
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="showingAddDialog"
      :overlay="false"
      persistent
      max-width="900"
    >
      <v-card>
        <v-card-title class="pos-r">
          新增實驗
          <v-spacer></v-spacer>
          <v-btn
            color="Secondary"
            fab
            x-small
            class="b-rad-12"
            @click="showingForm = null"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="mt-4">
          <ExperimentForm
            ref="addForm"
            @valid="checkIsFormValid"
            :form-data="passFormData"
          ></ExperimentForm>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="showingForm = null">取消</v-btn>
          <v-btn
            color="primary"
            @click="handleSubmit('add')"
            :disabled="!isFormValid"
          >
            新增
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showingModifyDialog"
      :overlay="false"
      persistent
      max-width="900"
    >
      <v-card>
        <v-card-title class="pos-r">
          編輯實驗
          <v-spacer></v-spacer>
          <v-btn
            color="Secondary"
            fab
            x-small
            class="b-rad-12"
            @click="showingForm = null"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="mt-4">
          <ExperimentForm
            ref="modifyForm"
            @valid="checkIsFormValid"
            :form-data="passFormData"
          ></ExperimentForm>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="showingForm = null">取消</v-btn>
          <v-btn
            color="primary"
            @click="handleSubmit('modify')"
            :disabled="!isFormValid"
          >
            儲存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UploadResultExcelDialog
      :value="showingUploadDialog"
      @close="showingForm = null"
    />
  </div>
</template>

<script>
import ExperimentForm from '@/components/experiments/ExperimentForm';
import UploadResultExcelDialog from '@/components/experiments/UploadResultExcelDialog';
import {
  getAllExperiments,
  addExperiment,
  modifyExperiment
} from '@/api/experiments';

export default {
  name: 'Experiments',

  components: { UploadResultExcelDialog, ExperimentForm },

  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        {
          text: '自訂 ID',
          align: 'start',
          sortable: false,
          value: 'customize_id'
        },
        {
          text: '實驗時間',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        {
          text: '水壓',
          align: 'start',
          sortable: false,
          value: 'pressure'
        },
        {
          text: '實驗次數',
          align: 'start',
          sortable: false,
          value: 'trial'
        },
        {
          text: '鏡片',
          align: 'start',
          sortable: false,
          value: 'cl_name'
        },
        {
          text: '角膜',
          align: 'start',
          sortable: false,
          divider: true,
          value: 'cornea'
        },
        {
          text: '操作',
          align: 'start',
          sortable: false,
          value: 'actions'
        }
      ],
      items: [],
      showingForm: null,
      isFormValid: true,
      defaultFormData: {
        date: this.$moment().format('YYYY-MM-DD'),
        pressure: null,
        trial: null,
        cl_name: null,
        cornea: null
      },
      passFormData: null
    };
  },

  async mounted() {
    await this.fetchData();
  },

  computed: {
    showingAddDialog() {
      return this.showingForm === 'add';
    },
    showingUploadDialog() {
      return this.showingForm === 'upload';
    },
    showingModifyDialog() {
      return this.showingForm === 'modify';
    }
  },

  methods: {
    async fetchData() {
      const result = await getAllExperiments();
      this.items = result.map((data) => {
        const { date } = data;
        const formatDate = this.$moment(date).format('YYYY-MM-DD');
        const actions = [
          {
            text: '編輯',
            action: 'modify'
          },
          {
            text: '刪除',
            action: 'remove',
            disable: true,
            color: 'error'
          }
        ];
        return {
          ...data,
          actions,
          date: formatDate
        };
      });
    },

    checkIsFormValid(v) {
      this.isFormValid = v;
    },

    handleAction(action, data = null) {
      this.showingForm = action;
      this.passFormData = { ...data } || { ...this.defaultFormData };
    },

    async handleSubmit(action) {
      switch (action) {
        case 'add': {
          const addForm = this.$refs['addForm'];
          try {
            const { mutationData } = addForm;
            const { date, pressure, trial, cl_name, cornea } = mutationData;
            mutationData.customize_id = `${date}_${cl_name}_${cornea}_${pressure}-${trial}`;
            await addExperiment(addForm.mutationData);
            addForm.reset();
            await this.fetchData();
            this.showingForm = null;
            this.$toast.success('新增成功');
          } catch (error) {
            console.error(error);
            this.$toast.error(error.message);
          }
          break;
        }
        case 'modify': {
          const modifyForm = this.$refs['modifyForm'];
          try {
            await modifyExperiment(modifyForm.mutationData);
            modifyForm.reset();
            await this.fetchData();
            this.showingForm = null;
            this.$toast.success('編輯成功');
          } catch (error) {
            console.error(error);
            this.$toast.error(error.message);
          }
          break;
        }
        default:
          break;
      }
    }
  }
};
</script>
