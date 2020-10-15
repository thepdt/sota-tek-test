import { MutationTree } from 'vuex';
import { LocalStorage } from 'quasar';
import { TASK as taskTypes } from '../mutation_types';
import { TaskInterface } from '@Types/pages/Task';
import { ITask } from '@Types/modules/task';
import { sortTaskByDate } from 'src/boot/utils';

const mutations: MutationTree<ITask> = {
  [taskTypes.ADD_TASK](state, task: TaskInterface) {
    state.taskList = sortTaskByDate([...state.taskList, task]);
    LocalStorage.set('task_list', state.taskList);
  },

  [taskTypes.REMOVE_TASK](state, taskId: string) {
    state.taskList = sortTaskByDate(
      state.taskList.filter(task => task.id !== taskId)
    );
    LocalStorage.set('task_list', state.taskList);
  },

  [taskTypes.REMOVE_MULTI_TASK](state, taskIdList: string[]) {
    state.taskList = sortTaskByDate(
      state.taskList.filter(task => !taskIdList.includes(task.id))
    );
    LocalStorage.set('task_list', state.taskList);
  },

  [taskTypes.UPDATE_TASK](state, targetTask: TaskInterface) {
    const index = state.taskList.findIndex(task => task.id === targetTask.id);
    state.taskList[index] = targetTask;
    state.taskList = sortTaskByDate(state.taskList);
    LocalStorage.set('task_list', state.taskList);
  }
};

export default mutations;
