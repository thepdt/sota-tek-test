import { LocalStorage } from 'quasar';

import { ITask } from '@Types/modules/task';
import { sortTaskByDate } from 'src/boot/utils';

const state: ITask = {
  taskList: LocalStorage.getItem('task_list')
    ? sortTaskByDate(LocalStorage.getItem('task_list'))
    : []
};

export default state;
