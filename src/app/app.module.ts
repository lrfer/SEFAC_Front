import { appRoutes } from './routes';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';


import { MenuComponent } from './shared/layout/menu/menu.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';

import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadAllModules, RouterModule } from '@angular/router';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DateAdapter, MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';

import { PaginatorI18n } from './shared/util/PaginatorI18n';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ModalDialogComponent } from './shared/layout/modal/modal-dialog/modal-dialog.component';
import { ModalConfirmDialogComponent } from './shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { ModalFormComponent } from './shared/layout/modal/modal-form/modal-form.component';
import { ModalDialogConfirmWarningsComponent } from './shared/layout/modal/modal-dialog-confirm-warnings/modal-dialog-confirm-warnings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoWarningsComponent } from './shared/layout/info-warnings/info-warnings.component';
import { LoaderInterceptor } from './auth/loader.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { LoaderService } from './shared/services/loader.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { ExecucaoAtividadeComponent } from './execucao-atividade/execucao-atividade.component';
import { ExecucaoAtividadeFormComponent } from './execucao-atividade/execucao-atividade-form/execucao-atividade-form.component';
import { ExecucaoAtividadeListComponent } from './execucao-atividade/execucao-atividade-list/execucao-atividade-list.component';
import { PortalModule } from '@angular/cdk/portal';
import { DialogModule } from '@angular/cdk/dialog';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localePt);

const modulesMaterialDesign = [
  MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MenuComponent,
    AlunoComponent,
    AlunoListComponent,
    ModalFormComponent,
    AlunoFormComponent,
    ModalFormComponent,
    ModalDialogConfirmWarningsComponent,
    ModalDialogComponent,
    ModalConfirmDialogComponent,
    InfoWarningsComponent,
    ExecucaoAtividadeComponent,
    ExecucaoAtividadeFormComponent,
    ExecucaoAtividadeListComponent

  ],
  imports: [
    BrowserModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy : PreloadAllModules}),

    AppRoutingModule,
    modulesMaterialDesign,

    HttpClientModule,
    DialogModule,
    ToastModule,
    PortalModule,
    FlexLayoutModule,
    MatSelectModule,
  ],
  exports: [
    modulesMaterialDesign,
    RouterModule,
    TranslateModule

  ],
  providers: [
    AuthGuard,
    LoaderService,
    AuthenticationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  entryComponents: [
    ModalDialogComponent,
    ModalConfirmDialogComponent,
    ModalFormComponent,
    ModalDialogConfirmWarningsComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
