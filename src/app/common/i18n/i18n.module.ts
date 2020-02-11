import { NgModule, ModuleWithProviders } from '@angular/core';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppUser } from '../../common/objs';
import { Utils } from '../../common/Utils';

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { LocalStorageService } from '../local-storage.service';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@NgModule({
	imports: [
		NativeScriptModule,
		NativeScriptHttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			},
			// missingTranslationHandler: { provide: MissingTranslationHandler, useClass: PtMissingTranslationHandler }
		})
    ],
	declarations: [],
	exports: [TranslateModule],
	providers: [
		Utils
	]
})
export class I18NModule {
	public appUser: AppUser;
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: I18NModule
		};
	}

    constructor(protected translate: TranslateService, protected utils: Utils, protected storageService: LocalStorageService) {
		this.appUser = this.storageService.get('userInfo');
		let currentLang: string = 'en';
		if (this.utils.isNNull(this.appUser) && this.utils.isNNull(this.appUser.user)  && this.utils.isNNull(this.appUser.user.defaultLanguage)) {
			currentLang = this.appUser.user.defaultLanguage;
		}
		let langs: Array<string> = ['en', 'vi'];
		translate.addLangs(langs);
		translate.setDefaultLang(currentLang);
		translate.use(currentLang);
	}
}

export class MessageObj {
    key: string;
    value: string;
}
