import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { CommonService } from './service/common.service';
import { APICallService } from './service/apicall.service';
import { AuthService } from './service/auth.service';
import { PlatformService } from './service/platform.service';
import { DirectionService } from './service/direction.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CommonService, APICallService, RightSidebarService, AuthGuard, AuthService, PlatformService, DirectionService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
