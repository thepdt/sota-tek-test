<template>
  <section class="add-task-component">
    <div class="text-center title">
      New Task
    </div>
    <task-detail ref="taskDetail" :taskInfo.sync="task" />
    <q-btn
      color="positive"
      class="full-width q-mt-xl"
      label="Add"
      no-caps
      unelevated
      @click="addTask"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Task, { TaskInterface } from '@Types/pages/Task';

@Component({
  components: {
    TaskDetail: () => import('@Components/partials/TaskDetail.vue')
  }
})
export default class AddTask extends Vue {
  $refs!: {
    taskDetail: HTMLFormElement;
  };
  public task: TaskInterface = new Task();

  addTask() {
    this.$refs.taskDetail.submitForm().then(async (success: boolean) => {
      if (success) console.log(this.task);
    });
  }
}
</script>
