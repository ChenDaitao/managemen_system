/*
 * @Date: 2022-11-13 22:32:24
 * @LastEditTime: 2022-11-19 20:52:55
 * @Description: server请求封装
 */
import Apis from "./index";

class User extends Apis {
  constructor() {
    super();
  }
  // login登录
  getLogin(data) {
    return this.post(`${this.baseUrl}/login`, data);
  }

  // 菜单
  getMenuList() {
    return this.get(`${this.baseUrl}/menus`);
  }
  // 用户列表
  getUserList(data) {
    return this.get(`${this.baseUrl}/users`, data);
  }

  // 添加用户
  getUserAdd(data) {
    return this.post(`${this.baseUrl}/users`, data);
  }

  // 切换用户状态
  getUserStatusChange(data) {
    return this.put(`${this.baseUrl}/users/${data.id}/state/${data.mg_state}`);
  }

  //   try {
  //     let res = await this.post("/login", data);
  //     console.log(res);
  //     return new Promise((resolve, reject) => {
  //       if (res.status === 200) {
  //         resolve(res.data);
  //       } else {
  //         reject(res);
  //       }
  //     });
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
export default new User();
