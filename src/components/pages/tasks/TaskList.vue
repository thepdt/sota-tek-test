<template>
  <section class="task-list-component">
    <q-btn
      v-if="!showSidebar"
      color="primary"
      icon="menu"
      unelevated
      dense
      flat
      class="absolute-top-left"
      @click="showSidebar = true"
    />
    <div class="header">
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
    </div>
    <div v-if="!taskList.length" class="no-item text-center">
      There is no task. Please create a new one!
    </div>
    <div v-else-if="!searchResult.length" class="no-item text-center">
      No results found for query "{{ searchText }}"
    </div>
    <div v-else class="task-list">
      <q-card
        v-for="task in searchResult"
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
            @click="submitRemoveTask(task.id)"
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

    <div v-if="bulkSelected.length" class="bulk-action-box flex">
      Bulk Action:
      <q-space />
      <q-btn
        color="primary"
        label="Done"
        no-caps
        unelevated
        dense
        class="action-btn q-mr-lg"
      />
      <q-btn
        color="negative"
        label="Remove"
        no-caps
        unelevated
        dense
        class="action-btn q-mr-lg"
        @click="submitRemoveMultiTasks"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch, PropSync } from 'vue-property-decorator';
import { Getter, Action, State } from 'vuex-class';
import Task, { TaskInterface } from '@Types/pages/Task';

@Component({
  components: {
    TaskDetail: () => import('@Components/partials/TaskDetail.vue')
  }
})
export default class TaskList extends Vue {
  @PropSync('isShowSidebar') showSidebar!: boolean;
  @State(state => state.task.taskList) taskList!: TaskInterface[];
  @Action('task/removeTask') removeTask!: Function;
  @Action('task/removeMultiTask') removeMultiTask!: Function;
  @Action('task/updateTask') updateTask!: Function;

  public searchResult: TaskInterface[] = [];
  public searchText: string = '';
  public bulkSelected: string[] = [];
  public taskSelected: TaskInterface = new Task();

  @Watch('taskList', { immediate: true })
  updateTaskList(val: TaskInterface[]) {
    this.searchResult = JSON.parse(JSON.stringify(val));
  }

  public submitUpdateTask(task: TaskInterface) {
    this.updateTask(task);
    this.taskSelected = new Task();
  }

  public submitRemoveTask(taskId: string) {
    this.$q
      .dialog({
        title: 'Remove task',
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
        this.bulkSelected = this.bulkSelected.filter(task => task !== taskId);
      });
  }

  public submitRemoveMultiTasks() {
    this.$q
      .dialog({
        title: 'Remove tasks',
        message: 'Your tasks will be deleted permanently.',
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
        this.removeMultiTask(this.bulkSelected);
        this.bulkSelected = [];
      });
  }

  public search() {
    if (this.searchText === '') {
      this.searchResult = JSON.parse(JSON.stringify(this.taskList));
    } else {
      const needle = this.searchText.toLowerCase();
      this.searchResult = this.taskList.filter(task =>
        task.name.toLowerCase().includes(needle)
      );
    }
  }

  public clearSearchText() {
    this.searchText = '';
    this.search();
  }

  public showDetail(task: TaskInterface) {
    if (this.taskSelected.id === task.id) {
      this.taskSelected = new Task();
    } else this.taskSelected = task;
  }
}
</script>
