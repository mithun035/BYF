import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private cookie: CookieService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookie.get('token');
        if(token){
            request = request.clone({
                url: request.url,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //console.log(request);
            return next.handle(request);
        }
        else
            return next.handle(request);
    }
}