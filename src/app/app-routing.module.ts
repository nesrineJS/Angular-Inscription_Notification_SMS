import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { TermesComponent } from './termes/termes.component';
import { PolitiquesComponent } from './politiques/politiques.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ServicesComponent } from './services/services.component';
import { LinkComponent } from './link/link.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

const routes: Routes = [
    { path: '', component: FormsComponent },
    { path: 'inscription', component: FormsComponent },
    { path: 'termes', component: TermesComponent },
    { path: 'confidentialite', component: PolitiquesComponent },
    {path: 'confirmation', component: ConfirmationComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'c', component: LinkComponent},
    {path: 'c/:msg', component: LinkComponent},
    {path: '404', component: NotFoundComponentComponent},
    {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
