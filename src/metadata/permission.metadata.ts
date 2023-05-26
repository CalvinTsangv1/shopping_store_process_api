import {SetMetadata} from '@nestjs/common';

export const PERMISSIONS = (...permission: string[]) => SetMetadata('PERMISSIONS', permission);