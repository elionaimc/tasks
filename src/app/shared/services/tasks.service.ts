import { Injectable, signal } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, catchError, from, take } from 'rxjs';
import { Task } from '../task.dto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksSignal = signal<Task[] | null>([]);
  DB = 'TasksDB';

  constructor(
    private storageService: StorageService
  ) {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasksSignal.set(JSON.parse((await this.storageService.get(this.DB)).value!));
    if (this.tasksSignal() === null) {
      this.tasksSignal.set([
        {
          title: 'Nova Task',
          description: 'Descrição da nova task',
          created_at: new Date(),
          edited_at: new Date(),
          finished: false
        },
        {
          title: 'Task finalizada',
          description: 'O status desta task é finalizada por default.',
          created_at: new Date(),
          edited_at: new Date(),
          finished: true
        }
      ])
    }
    this.storageService.save(this.DB, JSON.stringify(this.tasksSignal()));
  }

  create(task: Task) {
    this.tasksSignal()!.push(task);
    this.storageService.save(this.DB, JSON.stringify(this.tasksSignal()));
  }

  edit(task: Task, idx: number) {
    let tasks = this.tasksSignal()!;
    tasks[idx] = task;
    this.tasksSignal.set(tasks);
    this.storageService.save(this.DB, JSON.stringify(this.tasksSignal()));
  }

  delete(idx: number) {
    this.tasksSignal()!.splice(idx, 1);
    this.storageService.save(this.DB, JSON.stringify(this.tasksSignal()));
  }

  editStatus(idx: number) {
    let edited = this.tasksSignal()!;
    edited[idx].finished = !edited[idx].finished;
    edited[idx].edited_at = new Date();
    this.tasksSignal.set(edited);
    this.storageService.save(this.DB, JSON.stringify(this.tasksSignal()));
  }
}
