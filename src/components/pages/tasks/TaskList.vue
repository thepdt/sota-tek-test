<template>
  <section class="task-list-component">
    <div class="text-center title">
      To Do List
    </div>
    <q-input
      v-model="searchText"
      outlined
      color="black"
      dense
      placeholder="Search ..."
      debounce="300"
      @input="search"
    >
      <template v-slot:append>
        <template v-if="searchText !== ''">
          <q-icon
            name="cancel"
            @click.stop="clearSearchText"
            class="cursor-pointer"
            color="orange"
          />
        </template>
        <q-icon name="search" />
      </template>
    </q-input>
    <div class="task-list">
      <q-card
        v-for="task in taskList"
        :key="task.id"
        :class="['task-card', { active: taskSelected.id === task.id }]"
        flat
        bordered
      >
        <q-card-section class="card-header flex">
          <q-checkbox v-model="bulkSelected" :val="task.id" color="primary" />
          <div class="task-name">{{ task.name }}</div>
          <q-space />
          <q-btn
            color="primary"
            label="Detail"
            no-caps
            unelevated
            dense
            class="action-btn q-mr-md"
            @click="showDetail(task)"
          />
          <q-btn
            color="negative"
            label="Remove"
            no-caps
            unelevated
            dense
            class="action-btn"
            @click="submintRemoveTask(task.id)"
          />
        </q-card-section>

        <q-slide-transition>
          <div v-show="taskSelected.id === task.id">
            <q-separator />
            <q-card-section class="q-pa-lg">
              <task-detail
                ref="taskDetail"
                :taskInfo="task"
                @submit="submitUpdateTask"
              />
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import Task, { TaskInterface } from '@Types/pages/Task';

@Component({
  components: {
    TaskDetail: () => import('@Components/partials/TaskDetail.vue')
  }
})
export default class TaskList extends Vue {
  @State(state => state.task.taskList) taskList!: TaskInterface[];
  @Action('task/removeTask') removeTask!: Function;
  @Action('task/updateTask') updateTask!: Function;

  public searchText: string = '';
  public bulkSelected: string[] = [];
  public taskSelected: TaskInterface = new Task();

  public submitUpdateTask(task: TaskInterface) {
    this.updateTask(task);
    this.taskSelected = new Task();
  }

  public submintRemoveTask(taskId: string) {
    this.$q
      .dialog({
        title: 'Remove task?',
        message: 'Your task will be deleted permanently.',
        ok: {
          label: 'Yes',
          unelevated: true,
          color: 'primary'
        },
        cancel: {
          unelevated: true,
          color: 'negative'
        }
      })
      .onOk(() => {
        this.removeTask(taskId);
      });
  }

  public search() {
    console.log(this.searchText);
  }

  public clearSearchText() {
    this.searchText = '';
  }

  public showDetail(task: TaskInterface) {
    if (this.taskSelected.id === task.id) {
      this.taskSelected = new Task();
    } else this.taskSelected = task;
  }
}
</script>
