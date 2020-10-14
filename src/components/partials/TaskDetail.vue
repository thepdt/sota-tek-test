<template>
  <q-form ref="taskDetailForm" class="">
    <q-input
      v-model="task.name"
      outlined
      color="black"
      dense
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
      placeholder="Add new task ..."
    />
    <div>
      <div class="field-label q-mb-sm text-weight-medium">
        Description
      </div>
      <q-input
        v-model="task.description"
        dense
        outlined
        color="black"
        type="textarea"
        lazy-rules
        :rules="[]"
      />
    </div>
    <div class="row">
      <div class="col-6 q-pr-md">
        <div class="field-label q-mb-sm">
          Due Date
        </div>
        <q-select
          v-model="task.dueDate"
          emit-value
          map-options
          option-value="value"
          option-label="label"
          :options="[{ value: task.dueDate, label: task.dueDate }]"
          hide-dropdown-icon
          popup-content-class="hide-popup"
          dense
          outlined
          color="black"
          mask="date"
          :rules="dateRules"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date mask="DD MMM YYYY" v-model="task.dueDate" />
              </q-popup-proxy>
            </q-icon>
          </template>
          <div
            class="absolute full-width full-height"
            @click="() => $refs.qDateProxy.show()"
          ></div>
        </q-select>
      </div>
      <div class="col-6 q-pl-md">
        <div class="field-label q-mb-sm">
          Piority
        </div>
        <q-select
          v-model="task.piority"
          emit-value
          map-options
          option-value="value"
          option-label="label"
          :options="taskPiority"
          dense
          outlined
          color="black"
        />
      </div>
    </div>
    <q-btn
      color="positive"
      class="full-width q-mt-xl"
      :label="taskInfo.id ? 'Update' : 'Add'"
      no-caps
      unelevated
      @click="submitForm"
    />
  </q-form>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Watch } from 'vue-property-decorator';
import { TaskInterface } from '@Types/pages/Task';
import TaskPiority from 'src/mock-data/taskPiority';
import moment from 'moment';

@Component({
  components: {}
})
export default class TaskDetail extends Vue {
  $refs!: { taskDetailForm: HTMLFormElement };

  @Prop({ required: true }) taskInfo!: TaskInterface;

  public taskPiority = TaskPiority;
  public dateRules: any[] = [
    (val: any) =>
      val == '' ||
      moment(val, 'DD MMM YYYY', true).isValid() ||
      'Invalid date format',
    (val: any) =>
      moment(val).isAfter(moment().subtract(1, 'd')) ||
      'Please select a future date'
  ];
  public task: TaskInterface = JSON.parse(JSON.stringify(this.taskInfo));
  @Watch('taskInfo', { immediate: true })
  updateProp(value: TaskInterface) {
    console.log('updtae 2');

    this.task = JSON.parse(JSON.stringify(value));
  }

  submitForm() {
    this.$refs.taskDetailForm.validate().then(async (success: boolean) => {
      if (success) {
        this.$emit('submit', this.task);
      }
    });
  }

  reset() {
    this.$refs.taskDetailForm.resetValidation();
  }
}
</script>
<style lang="scss">
.hide-popup {
  display: none;
}
</style>
