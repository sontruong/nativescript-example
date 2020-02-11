import { Injectable } from "@angular/core";

import { ToDo } from "./todo";

@Injectable({
    providedIn: "root"
})
export class TodoService {

    private items = new Array<ToDo>(
        { id: 3, title: "Lấy chuối cho nhà máy", role: "Defender", createdOn: "2019/07/31", createdByEmp: {id: 2, name: "CEO"}, status: 'PENDING', content: `<p>Đến địa chỉ 256 Hoàng Văn Thụ lấy 100kg chuối và mang về nhà máy</p><p>Liên hệ chị HỒng, sdt: 0976342423423423432</p>`},
        { id: 4, title: "Gặp khách hàng A", role: "Midfielder", createdOn: "", createdByEmp: {id: 1, name: "Phạm Thanh Bình"} , content: `<p>Đến địa chỉ 256 Hoàng Văn Thụ lấy 100kg chuối và mang về nhà máy</p><p>Liên hệ chị HỒng, sdt: 0976342423423423432</p>`, status: 'STARTED'},
        { id: 5, title: "Giao hồ sơ", role: "Midfielder", createdOn: "2019/07/31", createdByEmp: {id: 1, name: "Hoàng Văn Hải"} , content: `<p>Đến địa chỉ 256 Hoàng Văn Thụ lấy 100kg chuối và mang về nhà máy</p><p>Liên hệ chị HỒng, sdt: 0976342423423423432</p>`, status: 'COMPLETED'},
        { id: 6, title: "Giao hồ sơ", role: "Midfielder", createdOn: "2019/07/31", createdByEmp: {id: 1, name: "Hoàng Văn Hải"} , content: `<p>Đến địa chỉ 256 Hoàng Văn Thụ lấy 100kg chuối và mang về nhà máy</p><p>Liên hệ chị HỒng, sdt: 0976342423423423432</p>`, status: 'NEED'},
    );

    getItems(): Array<ToDo> {
        return this.items;
    }

    getItem(id: number): ToDo {
        return this.items.filter((item) => item.id === id)[0];
    }
}
