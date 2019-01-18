import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';

import { UserlistComponent } from './user/userlist/userlist.component';
import { VipComponent } from './user/vip/vip.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { EdituserComponent } from './user/edituser/edituser.component';


const routes: Routes = [{
    path: 'home',
    component: HomeComponent,
    // children:[   /*配置子路由*/
    // ]
  },
   {
    path: 'shop',
    component: ShopComponent

  },
  {
    path: 'product',
    component: ProductComponent

  },
  {
    path: 'user',
    component: UserComponent,
    children : [   /*配置子路由*/
      {
        path: 'list',
        component: UserlistComponent
      },
      {
        path: 'vip',
        component: VipComponent
      }
      ,
      {
        path: 'add',
        component: AdduserComponent
      }
      ,
      {
        path: 'edit',
        component: EdituserComponent
      }, {
        path: '**',  /*任意的路由*/
        // component:HomeComponent
        redirectTo: 'list'
      }
    ]

  },
  {
    path: 'news',
    component: NewsComponent

  }
  , {  /*匹配不到路由的时候加载的组件*/
    path: '**',  /*任意的路由*/
    // component:HomeComponent
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
