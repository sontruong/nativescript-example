import { Component } from "@angular/core";
import {map} from 'rxjs/operators';
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import {HereMarker, Here} from "nativescript-here";
import { Page } from "tns-core-modules/ui/page/page";

import { Base } from "~/app/common/base";
import { OneUserService } from "~/app/common/one.user.service";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OneSolConfig } from "../config/app.config";

import { RegionAddress } from "../erpshared/region/region.address";
import { HttpRequestService } from "../common/http.request.service";
import { HEREMAP_GEO_GET } from "../config/app.api";
import { HereMapObj } from "../common/objs";

@Component({
    selector: "app-heremap",
    moduleId: module.id,
    templateUrl: "./heremap.html"
})
export class HeremapComponent extends Base {

    address: RegionAddress[];
    herMap: any;
    startpointLatitude: number;
    startpointLongitude: number;
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, protected page: Page, private translate: TranslateService, 
        private route: ActivatedRoute, router: Router, private http: HttpRequestService) { 
        super(userService, storageService, utils, page);
        enableLocationRequest(true);
    }

    ngAfterContentChecked() {
        
    }
    ngAfterViewInit() {
        this.address = this.localStorge.get(OneSolConfig.pAddress);
    }

    public onMapReady(event: any) {
        if (this.utils.isArrNull(this.address)) {
            this.address = this.localStorge.get(OneSolConfig.pAddress);
        }
        const map = event.object;
        for (let obj of this.address) {
            if (this.utils.isNull(obj.latitude) || this.utils.isNull(obj.longitude)) {
                this.getGeo(obj, map);
                continue;
            }
            map.addMarkers(<HereMarker[]>[{
                        id: obj.id,
                        latitude: obj.latitude,
                        longitude: obj.longitude,
                        title: obj.fullAddress,
                        description: obj.fullAddress,
                        draggable: true,
                        onTap: (marker) => {
                            const updatedMarker = Object.assign({}, marker, {
                                selected: !marker.selected
                            });
                            map.updateMarker(updatedMarker);
                        }
                    }]);
        }
    }

    getGeo(obj: RegionAddress, map: any) {
        if (this.utils.isNull(obj) || this.utils.isNull(obj.fullAddress)) {
            return;
        }
        let text = this.utils.encodeURL(obj.fullAddress);
        this.http.get(HEREMAP_GEO_GET.apiEndpoint + text).subscribe(data => {
            let tmp: any = data;
            let hPoint: HereMapObj = tmp._body;
            if (this.utils.isNull(hPoint) || this.utils.isNull(hPoint.Response.View) || this.utils.isArrNull(hPoint.Response.View)) {
                return;
            }
            for (let view of hPoint.Response.View) {
                if (this.utils.isArrNull(view.Result)) {
                    continue;
                }
                let objs: any[] = view.Result;
                for (let p of objs) {
                    if (this.utils.isNull(p) || this.utils.isNull(p.Location) || this.utils.isNull(p.Location.DisplayPosition) || this.utils.isNull(p.Location.DisplayPosition.Latitude) || this.utils.isNull(p.Location.DisplayPosition.Longitude)) {
                        continue;
                    }
                    let position = p.Location.DisplayPosition;
                    console.log('---data: ' + JSON.stringify(position));
                    map.addMarkers(<HereMarker[]>[{
                        id: obj.id,
                        latitude: position.Latitude,
                        longitude: position.Longitude,
                        title: obj.fullAddress,
                        description: "test",
                        draggable: true,
                        onTap: (marker) => {
                            const updatedMarker = Object.assign({}, marker, {
                                selected: !marker.selected
                            });
                            map.updateMarker(updatedMarker);
                        }
                    }]);     
                }
            }
            
        });
    }

    getLocaltion() {
        isEnabled().then(function (isLocationEnabled) {
            let message = "Location services are not available";
            if (isLocationEnabled) {
                message = "Location services are available";
                getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    timeout: 5000
                 })
                .then(location => {
                    console.log("Location received: " + location);
                    this.startpointLatitude = location.latitude;
                    this.startpointLongitude = location.longitude;
                }).catch(error => {
                    console.log("Location error received: " + error);
                    alert("Location error received: " + error);
                });
            }
            this.utils.showToast(this.translate, message);
        }, function (e) {
            console.log("Location error received: " + (e.message || e));
        });
    }

    ngOnDestroy() {
        this.localStorge.save(OneSolConfig.pAddress, undefined);
    }

}