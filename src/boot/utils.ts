import { TaskInterface } from '@Types/pages/Task';
import { Notify } from 'quasar';

export function showSuccess(message: string, classes: any = '') {
  Notify.create({
    classes,
    message,
    color: 'positive',
    position: 'top',
    icon: 'done'
  });
}

export function showError(message: string, classes: any = '') {
  Notify.create({
    classes,
    message,
    color: 'negative',
    position: 'top',
    icon: 'report_problem'
  });
}

export function sortTaskByDate(taskList: TaskInterface[]) {
  return taskList.sort((a: TaskInterface, b: TaskInterface) => {
    return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
  });
}
