import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialogData } from '../dialogs/dialog/delte.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private componentDialog: any;

  constructor(private readonly dialog: MatDialog) {}

  setComponentDialog(component: any): void {
    this.componentDialog = component;
  }

  async openDialog(data?: ConfirmDialogData): Promise<boolean | undefined> {
    const dialogRef = this.dialog.open(this.componentDialog, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data,
    });

    return firstValueFrom(dialogRef.afterClosed());
  }
}
