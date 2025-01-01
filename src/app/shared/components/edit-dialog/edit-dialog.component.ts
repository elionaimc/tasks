import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { CustomDatePipe } from '../../custom-date.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    CustomDatePipe
  ],
  providers: [
      CustomDatePipe
    ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  descriptionErrorMessage = signal('');
  titleErrorMessage = signal('');
  finished = false;
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject(DIALOG_DATA);

  constructor(
    private taskService: TasksService
  ) {
    this.title.setValue(this.data.title);
    this.description.setValue(this.data.description);
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

  edit() {
    this.taskService.edit({
      title: this.title.value!,
      description: this.description.value!,
      created_at: this.data.created_at,
      edited_at: new Date(),
      finished: this.finished
    }, this.data.idx);
    this.dialogRef.close();
  }
}
