import moment from 'moment';

export interface TaskInterface {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  piority: number;
}

export default class Task implements TaskInterface {
  public id: string;
  public name: string;
  public description: string;
  public dueDate: string;
  public piority: number;

  constructor(
    task: TaskInterface = {
      id: '',
      name: '',
      description: '',
      dueDate: moment().format('DD MMM YYYY'),
      piority: 1
    }
  ) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.piority = task.piority;
  }
}
