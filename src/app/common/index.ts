import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import { OneUserService } from './one.user.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [
    OneUserService
  ],
})
export class OCommonModule {}
