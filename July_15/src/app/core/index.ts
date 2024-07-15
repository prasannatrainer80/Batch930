export * from './core.module';

// services
export { CommonService } from './service/common.service';
export { APICallService } from './service/apicall.service';
export { AuthService } from './service/auth.service';
export { DirectionService } from './service/direction.service';
export { LanguageService } from './service/language.service';
export { RightSidebarService } from './service/rightsidebar.service';
export { PlatformService } from './service/platform.service';

// models
export { Page } from './models/page';
export { PageInfo } from './models/pageinfo';
export { User } from './models/user';
export { Role } from './models/role';
export { Permission } from './models/permission';
export { InConfiguration } from './models/config.interface';

// master base

export { MasterBase } from './base/master-base';
export { MasterService } from './base/master.service'