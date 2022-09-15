<template>
  <v-form ref="experimentForm" v-model="valid">
    <v-menu
      v-model="showDatePicker"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="formData.date"
          label="實驗時間"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker v-model="formData.date" @input="showDatePicker = false" />
    </v-menu>

    <v-text-field
      v-model="formData.pressure"
      :rules="[requireRule]"
      label="水壓"
      type="number"
      required
    />

    <v-text-field
      v-model="formData.trial"
      :rules="[requireRule]"
      label="實驗次數"
      type="number"
      required
    />

    <v-combobox
      v-model="formData.cl_name"
      :items="clsItems"
      :rules="[requireRule]"
      label="鏡片"
      required
    />

    <v-combobox
      v-model="formData.cornea"
      :items="corneaItems"
      :rules="[requireRule]"
      label="角膜"
      required
    />
  </v-form>
</template>

<script>
import { getAllCl, getAllCornea } from '@/api/experiments';
export default {
  props: {
    formData: {
      type: Object,
      default: function () {
        return {
          date: this.$moment().format('YYYY-MM-DD'),
          pressure: null,
          trial: null,
          cl_name: null,
          cornea: null
        };
      }
    }
  },

  data() {
    const requireRule = (v) => !!v || '此欄位為必填';
    return {
      valid: true,
      requireRule,
      clsItems: [],
      showDatePicker: false,
      corneaItems: []
    };
  },

  async mounted() {
    await this.getAllCls();
    await this.getAllCornea();
  },

  computed: {
    mutationData() {
      const { date, pressure, trial, cl_name, id, cornea } = this.formData;
      return {
        id,
        date,
        pressure: Number(pressure),
        trial: Number(trial),
        cl_name: cl_name.value || cl_name,
        cornea: cornea.value || cornea
      };
    }
  },

  watch: {
    valid(v) {
      this.$emit('valid', v);
    }
  },

  methods: {
    validate() {
      this.$refs.experimentForm.validate();
    },
    reset() {
      this.$refs.experimentForm.reset();
    },
    resetValidation() {
      this.$refs.experimentForm.resetValidation();
    },
    async getAllCls() {
      const cls = await getAllCl();
      this.clsItems = cls.map(({ cl_name }) => {
        return {
          text: cl_name,
          value: cl_name
        };
      });
    },

    async getAllCornea() {
      const corneas = await getAllCornea();
      this.corneaItems = corneas.map(({ cornea }) => {
        return {
          text: cornea,
          value: cornea
        };
      });
    }
  }
};
</script>
