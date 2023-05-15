import { Routes } from '@angular/router';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { ExecucaoAtividadeComponent } from './execucao-atividade/execucao-atividade.component';
import { ExecucaoAtividadeFormComponent } from './execucao-atividade/execucao-atividade-form/execucao-atividade-form.component';
import { ExecucaoAtividadeListComponent } from './execucao-atividade/execucao-atividade-list/execucao-atividade-list.component';



export const appRoutes: Routes = [
    {
        path: '',component:MenuComponent, canActivate: [AuthGuard],
        children: [
            {path:'',component: MenuComponent},
            { path: 'home', component: HomeComponent },
            {
                path: 'aluno', component: AlunoComponent,
                children: [
                    { path: '', component: AlunoListComponent },
                    { path: 'new', component: AlunoFormComponent },
                    { path: 'edit/:id', component: AlunoFormComponent }
                ]
            },
            {

              path: 'execucao-atividade', component: ExecucaoAtividadeComponent,
              children: [
                { path: '', component: ExecucaoAtividadeListComponent },
                { path: 'new', component: ExecucaoAtividadeFormComponent },
                { path: 'edit/:id', component: ExecucaoAtividadeFormComponent }
              ]
            },
            { path: 'pageNotFound', component: PageNotFoundComponent }
        ]
    },
    { path: 'login', component: LoginComponent }
];
