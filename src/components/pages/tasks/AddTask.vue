<template>
  <section class="add-task-component">
    <q-btn
      color="black"
      icon="close"
      rounded
      unelevated
      flat
      dense
      class="absolute-top-right"
      @click="showSidebar = false"
    />
    <div class="text-center title">
      New Task
    </div>
    <task-detail ref="taskDetail" :taskInfo="task" @submit="submitAddTask" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
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
  @PropSync('isShowSidebar') showSidebar!: boolean;
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
