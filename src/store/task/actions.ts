import { ActionTree } from 'vuex';
import { TASK as taskTypes } from '../mutation_types';
import { ITask } from '@Types/modules/task';
import { TaskInterface } from '@Types/pages/task';
import { IRootState } from '@Types/store';
import { showError, showSuccess } from 'src/boot/utils';

const actions: ActionTree<ITask, IRootState> = {
  addTask({ commit }, task: TaskInterface) {
    try {
      commit(taskTypes.ADD_TASK, task);
      showSuccess('Add task success!');
    } catch (error) {
      showError('Add task failed!');
    }
  },

  removeTask({ commit }, taskId: string) {
    try {
      commit(taskTypes.REMOVE_TASK, taskId);
      showSuccess('Remove task success!');
    } catch (error) {
      showError('Remove task failed!');
    }
  },

  removeMultiTask({ commit }, taskIdList: string[]) {
    try {
      commit(taskTypes.REMOVE_MULTI_TASK, taskIdList);
      showSuccess('Remove tasks success!');
    } catch (error) {
      showError('Remove tasks failed!');
    }
  },

  updateTask({ commit }, targetTask: TaskInterface) {
    try {
      commit(taskTypes.UPDATE_TASK, targetTask);
      showSuccess('Update task success!');
    } catch (error) {
      showError('Update task failed!');
    }
  }
};

export default actions;
