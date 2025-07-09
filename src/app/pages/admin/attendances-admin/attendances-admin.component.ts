import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../../services/dialog.service';
import { DelteComponent } from '../../../dialogs/dialog/delte.component';
import { switchMap } from 'rxjs';
import { AttendancesModelTs } from '../../../models/attendances.model';
import { AttendancesService } from '../../../services/attendances.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-attendances-admin',
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './attendances-admin.component.html',
  styleUrl: './attendances-admin.component.css',
})
export class AttendancesAdminComponent {
  dataSource: MatTableDataSource<AttendancesModelTs>;
  columnsDefinitions = [
    { def: 'idAttendance', label: 'idAttendance', hide: true },
    { def: 'date', label: 'date', hide: false },
    { def: 'entryTime', label: 'entryTime', hide: false },
    { def: 'isLate', label: 'isLate', hide: false },
    { def: 'isPresent', label: 'isPresent', hide: false },
    { def: 'classroomId', label: 'classroomId', hide: false },
    { def: 'idSchedule', label: 'idSchedule', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalItems: number = 0; // Total de elementos en el backend
  pageSize: number = 10; // Tamaño de página inicial
  pageIndex: number = 0; // Índice de página inicial

  constructor(
    private _service: AttendancesService,
    private _snackBar: MatSnackBar,
    private readonly dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);

    this._service.getMessageChange().subscribe((data) =>
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      })
    );
  }

  loadData(page: number, size: number): void {
    this._service.findAll('', page, size).subscribe((response: any) => {
      this.totalItems = response.totalElements; // Asegúrate de que el backend devuelva el total de elementos
      this.createTable(response.content); // `content` contiene los datos de la página actual
    });
  }

  createTable(data: AttendancesModelTs[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  async openDialog(id: number): Promise<void> {
    this.dialog.setComponentDialog(DelteComponent);

    const ok = await this.dialog.openDialog({
      title: 'Eliminar Libro',
      body: '¿Está seguro que desea eliminar este libro?',
      id: `con el id ${id}`,
    });

    if (ok) {
      this.delete(id);
    }
  }

  delete(id: number): void {
    this._service
      .delete(id)
      .pipe(
        switchMap(() =>
          this._service.findAll('', this.pageIndex, this.pageSize)
        )
      )
      .subscribe((response: any) => {
        this._service.setGenericChange(response.content);
        this._service.setMessageChange('DELETED!');
      });
  }
}
