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
import { UserRoleModelTs } from '../../../models/user-role.model';
import { UserRoleService } from '../../../services/user-role.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-role-admin',
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
  templateUrl: './user-role-admin.component.html',
  styleUrl: './user-role-admin.component.css',
})
export class UserRoleAdminComponent {
  dataSource: MatTableDataSource<UserRoleModelTs>;
  columnsDefinitions = [
    { def: 'id_user', label: 'id_user', hide: false },
    { def: 'id_role', label: 'id_role', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalItems: number = 0; // Total de elementos en el backend
  pageSize: number = 10; // Tamaño de página inicial
  pageIndex: number = 0; // Índice de página inicial

  constructor(
    private _service: UserRoleService,
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

  createTable(data: UserRoleModelTs[]) {
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
