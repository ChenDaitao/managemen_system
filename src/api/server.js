/*
 * @Date: 2022-11-13 22:32:24
 * @LastEditTime: 2022-11-27 22:37:49
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

  /* ****** 用户管理 ************* */
  // 用户列表
  getUserList(data) {
    return this.get(`${this.baseUrl}/users`, data);
  }

  // 添加用户
  getUserAdd(data) {
    return this.post(`${this.baseUrl}/users`, data);
  }
  // 修改用户
  getUserInfoEdit(id, data) {
    return this.put(`${this.baseUrl}/users/${id}`, data);
  }
  //删除用户
  getUserInfoDelete(id) {
    return this.delete(`${this.baseUrl}/users/${id}`);
  }
  // 分配用户角色
  getUserroleAssign(id, data) {
    return this.put(`${this.baseUrl}/users/${id}/role`, data);
  }
  // 切换用户状态
  getUserStatusChange(data) {
    return this.put(`${this.baseUrl}/users/${data.id}/state/${data.mg_state}`);
  }

  /* ****** 权限管理 ************* */

  // 获取所有菜单权限
  getRightList() {
    return this.get(`${this.baseUrl}/rights/list`);
  }

  // 获取角色列表
  getRolesList() {
    return this.get(`${this.baseUrl}/roles`);
  }
  // 删除权限
  getRightRemove(roleId, rightId) {
    return this.delete(`${this.baseUrl}/roles/${roleId}/rights/${rightId}`);
  }

  //获取树形菜单权限
  getRightTree() {
    return this.get(`${this.baseUrl}/rights/tree`);
  }
  // 分配权限
  getRightsSet(roleId, data) {
    return this.post(`${this.baseUrl}/roles/${roleId}/rights`, data);
  }
  //
  //   try {
  //     let res = await this.post("/login", data);
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
