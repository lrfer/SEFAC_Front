import { Routes } from '@angular/router';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { AlunoComponent } from './aluno/aluno.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';



export const appRoutes: Routes = [
    {
        path: '', component: MenuComponent,
        children: [
            { path: 'home', component: HomeComponent },

            {
                path: 'aluno', component: AlunoComponent,
                children: [
                    { path: '', component: AlunoListComponent },
                    { path: 'new', component: AlunoFormComponent },
                    { path: 'edit/:id', component: AlunoFormComponent }
                ]
            },
            { path: 'pageNotFound', component: PageNotFoundComponent}
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
];
