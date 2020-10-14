<template>
  <section class="add-task-component">
    <div class="text-center title">
      New Task
    </div>
    <task-detail ref="taskDetail" :taskInfo="task" @submit="submitAddTask" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Task, { TaskInterface } from '@Types/pages/Task';
import { uid } from 'quasar';

@Component({
  components: {
    TaskDetail: () => import('@Components/partials/TaskDetail.vue')
  }
})
export default class AddTask extends Vue {
  $refs!: {
    taskDetail: HTMLFormElement;
  };
  @Action('task/addTask') addTask!: Function;
  public task: TaskInterface = new Task();

  public submitAddTask(task: TaskInterface) {
    task.id = uid();
    this.addTask(task);
    this.task = new Task();
    this.$refs.taskDetail.reset();
  }
}
</script>
