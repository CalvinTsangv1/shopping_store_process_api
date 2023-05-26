import {CanActivate, ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {isJWT} from "class-validator";
import {Reflector} from "@nestjs/core";
import {JwtModel} from "../model/jwt.model";

/**
 * A guard checking whether the request has an access token and the string is a valid JWT token(without token validation)
 */
@Injectable()
export class AuthorizationGuard implements CanActivate {
    private readonly logger = new Logger(AuthorizationGuard.name);

    constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublicController = this.reflector.get<boolean>('isPublic', context.getClass());
        const isPublicMethod = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublicController || isPublicMethod) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        if (request && request.headers && request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
            const jwt = request.headers.authorization.replace('Bearer ', '')
            if (isJWT(jwt)) {
                console.log(<JwtModel>this.jwtService.decode(jwt));
                request.currentUser = <JwtModel>this.jwtService.decode(jwt);
                return true;
            }
        }
        return false;
    }
}
