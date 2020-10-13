<template>
  <q-layout view="lHh Lpr lFf" class="tasks-page">
    <q-drawer
      v-model="isShowSidebar"
      side="left"
      class="add-task-box"
      persistent
      show-if-above
      bordered
      :width="500"
      :breakpoint="1000"
    >
      <add-task />
    </q-drawer>
    <q-page-container style="padding-top: 0">
      <q-page class="full-height">
        <task-list />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: {
    AddTask: () => import('@Components/pages/tasks/AddTask.vue'),
    TaskList: () => import('@Components/pages/tasks/TaskList.vue')
  }
})
export default class Tasks extends Vue {
  public isShowSidebar: boolean = true;
}
</script>
