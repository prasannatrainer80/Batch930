import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';

export const routes: Routes = [
    {path:'',component:MenuComponent},
    {path:'menu',component:MenuComponent, children:[
        {path:'first',component:FirstComponent, outlet:'sonix'},
        {path:'second',component:SecondComponent,outlet : 'sonix'},
        {path:'third',component:ThirdComponent,outlet : 'sonix'},
        // {path:'name',component:Men,outlet : 'dizer'},
        // {path:'calc',component:CalculationComponent,outlet : 'dizer'}
    ]}
];
