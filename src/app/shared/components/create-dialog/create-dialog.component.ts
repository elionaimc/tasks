import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';
import { merge } from 'rxjs';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-create-dialog',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss'
})
export class CreateDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  descriptionErrorMessage = signal('');
  titleErrorMessage = signal('');

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private taskService: TasksService
  ) {
    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage('title'));
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage('description'));
  }

  updateErrorMessage(value: string) {
    if (value === 'title') {
      if (this.title.hasError('required')) {
        this.titleErrorMessage.set('O título é obrigatório.');
      } else {
        this.titleErrorMessage.set('');
      }
    } else {
      if (this.description.hasError('required')) {
        this.descriptionErrorMessage.set('A descrição é obrigatória.');
      } else {
        this.descriptionErrorMessage.set('');
      }
    }
  }

  create() {
    this.taskService.create({
      title: this.title.value!,
      description: this.description.value!,
      created_at: new Date(),
      edited_at: new Date(),
      finished: false
    });
    this.dialogRef.close();
  }
}
