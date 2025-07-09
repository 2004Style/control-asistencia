import {  Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  body: string;
  id: string | null;
}

@Component({
  selector: 'app-delte',
  imports: [MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './delte.component.html',
  styleUrl: './delte.component.css',
})
export class DelteComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DelteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onOk(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
