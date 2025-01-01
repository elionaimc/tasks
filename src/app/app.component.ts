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
import { Task } from './shared/task.dto';
import { ConfirmDelete } from './shared/confirm-delete.decorator';
import { setAppInjector } from './app.config';
import { CustomDatePipe } from './shared/custom-date.pipe';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateDialogComponent } from './shared/components/create-dialog/create-dialog.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EditDialogComponent } from './shared/components/edit-dialog/edit-dialog.component';

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
    MatSlideToggleModule,
    NgIf
  ],
  providers: [
    CustomDatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  destroyed = new Subject<void>();
  isSmallScreen = false;
  dialog = inject(Dialog);
  showPending = true;
  showFinished = true;

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

  @ConfirmDelete('Certeza que deseja excluir')
  deleteTask(idx: number): void {
    this.taskService.delete(idx);
  }

  editStatusTask(idx: number): void {
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
