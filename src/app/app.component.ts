import { Component, Injector, OnDestroy, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TasksService } from './shared/services/tasks.service';
import { Task } from './shared/dtos/task.dto';
import { ConfirmDelete } from './shared/confirm-delete.decorator';
import { setAppInjector } from './app.config';
import { CustomDatePipe } from './shared/custom-date.pipe';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateDialogComponent } from './shared/components/create-dialog/create-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EditDialogComponent } from './shared/components/edit-dialog/edit-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomTitlePipe } from './shared/custom-title.pipe';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    DialogModule,
    CustomDatePipe,
    CustomTitlePipe,
    MatSlideToggleModule,
    NgIf,
    MatExpansionModule
  ],
  providers: [
    CustomDatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  destroyed = new Subject<void>();
  dialog = inject(Dialog);
  isSmallScreen = false;
  showPending = true;
  showFinished = true;
  states: boolean[] = [];
  
  constructor(
    public taskService: TasksService,
    private injector: Injector
  ) {
    inject(BreakpointObserver)
    .observe([ Breakpoints.XSmall, Breakpoints.Small ])
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    setAppInjector(this.injector);
  }

  changeState(idx: number, state: boolean) {
    this.states[idx] = state;
  }

  createTask(): void {
    this.dialog.open<string>(CreateDialogComponent, {
      minWidth: (this.isSmallScreen) ? '340px' : '790px',
      maxWidth: (this.isSmallScreen) ? '340px' : '790px',
      minHeight: '350px'
    });
  }

  editTask(task: Task, idx: number) {
    this.dialog.open<string>(EditDialogComponent, {
      minWidth: (this.isSmallScreen) ? '340px' : '790px',
      maxWidth: (this.isSmallScreen) ? '340px' : '790px',
      minHeight: '350px',
      data: { ...task, idx }
    });
  }

  @ConfirmDelete(
    'Quer mesmo excluir?',
    'Esta ação não poderá ser desfeita. Ao clicar em EXCLUIR, você confirma que deseja apagar todos os dados relacionados a esta tarefa.',
    [
      'delete_outline',
      'EXCLUIR'
    ]
  )
  deleteTask(idx: number): void {
    this.taskService.delete(idx);
  }

  editStatusTask(idx: number, e: Event): void {
    e.stopPropagation();
    this.taskService.editStatus(idx);
  }

  filter(idx: number) {
    return this.taskService.tasksSignal()![idx].finished ? this.showFinished : this.showPending;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
