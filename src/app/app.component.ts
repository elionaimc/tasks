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
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './shared/components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    CustomDatePipe
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
  readonly dialog = inject(MatDialog);

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

  createTask() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      minWidth: (this.isSmallScreen) ? '340px' : '790px',
      maxWidth: (this.isSmallScreen) ? '340px' : '790px',
      minHeight: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'created') this.taskService.loadTasks();
    });
  }

  editTask(task: Task, idx: number) {
    console.log(task)
    // todo
  }

  @ConfirmDelete('Certeza que deseja excluir')
  deleteTask(idx: number) {
    this.taskService.delete(idx);
  }

  editStatusTask(idx: number) {
    this.taskService.editStatus(idx);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
