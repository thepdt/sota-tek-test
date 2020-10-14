import { TaskInterface } from '@Types/pages/Task';
import { GetterTree } from 'vuex';
import { IRootState } from '@Types/store';
import { ITask } from '@Types/modules/task';

const getters: GetterTree<ITask, IRootState> = {
  getTaskList: (state): TaskInterface[] => {
    const taskList = [...state.taskList];
    return taskList.sort((a: TaskInterface, b: TaskInterface) => {
      return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
    });
  }
};

export default getters;
