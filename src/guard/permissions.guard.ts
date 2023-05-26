import {CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";

/**
 * A guard will check for the user roles
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
    private readonly logger = new Logger(PermissionsGuard.name);

    constructor(private readonly reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const permissions = this.reflector.getAllAndMerge<string[]>('Pemrissions', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!permissions || permissions.length == 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const userRole: string = request?.currentUser?.role ?? null;

        return (userRole && permissions.includes(userRole))
    }
}
