<!--
 * @Date: 2022-09-07 22:40:22
 * @LastEditTime: 2022-11-27 23:11:20
 * @Description: 
-->
<!-- eslint-disable vue/valid-v-for -->

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-input v-model="queryInfo.query" @clear="getUserList" clearable
            ><el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="addDialog = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <el-table :data="tableData">
        <template v-for="item in tableColumn">
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
          ></el-table-column>
        </template>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="statusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="editOperation(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
              circle
            ></el-button>
            <!-- 分配角色按钮 添加消息提示 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                circle
                @click="assignUserInfoRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.query.pagenum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- AddUser Dialog -->
    <el-dialog title="添加用户" :visible.sync="addDialog" width="30%">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" show-password>
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号 " prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- Edit Dialog -->
    <el-dialog
      title="修改用户"
      :visible.sync="eidtDialog"
      width="30%"
      @close="editDialogClose"
    >
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
        ><el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号 " prop="mobile">
          <el-input v-model="editForm.mobile"></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eidtDialog = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色 Dialog -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogShow" width="50%">
      <div>
        <p>当前用户：{{ userInfo.username }}</p>
        <p>当前角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableColumn } from "../Config/usersConfig";
import User from "@/api/server";
export default {
  data() {
    // var checkMoblie = (rule, value, callback) => {
    //   // 验证手机号的正则表达式
    //   const regMoblie =
    //     /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //   if (regMoblie.test(value)) {
    //     return callback();
    //   }
    //   callback(new Error("请输入合法的手机号"));
    // };
    return {
      tableColumn: tableColumn, //table表头数据
      tableData: [],
      queryInfo: {
        query: "",
        pagenum: 1, // 当前页数
        pagesize: 10, // 每页显示总数
      },
      total: 0, //分页显示总数
      /* editDialog */
      eidtDialog: false,
      eidtUserId: "",
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      /* addDialog */
      addDialog: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      }, //添加用户表单

      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "用户名的长度在3-5个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6-15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          // { validator: checkEmail, trigger: 'blur' },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: ["blur", "change"],
          },
        ],
      }, //校验规则
      setRoleDialogShow: false,
      userInfo: {},
      roleList: [], // 所有角色的数据列表
      selectedRoleId: "", //已选中的角色Id
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /* 处理分页 */
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getUserList();
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getUserList();
    },
    /* 获取table数据 */
    async getUserList() {
      const {
        data: {
          meta: { status, msg },
          data: { total, users },
        },
      } = await User.getUserList(this.queryInfo);
      if (status == 200) {
        this.total = total;
        this.tableData = users;
      } else {
        this.$message.error(msg);
      }
    },
    /* 添加用户处理 */
    cancelAdd() {
      this.addDialog = false;
      this.$refs.addFormRef.resetFields();
    },
    confirmAdd() {
      this.$refs.addFormRef
        .validate()
        .then(async () => {
          const {
            data: { meta },
          } = await User.getUserAdd(this.addForm);
          if (meta.status == 201) {
            this.$message.success(meta.msg);
            this.getUserList();
            this.addDialog = false;
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch((err) => err);
    },
    /* 切换用户状态 */
    async statusChange(row) {
      const {
        data: { meta },
      } = await User.getUserStatusChange(row);
      if (meta.status == 200) {
        this.$message.success(meta.msg);
      } else {
        this.$message.error(meta.msg);
      }
    },
    /* 操作---编辑 */
    editOperation(row) {
      this.eidtDialog = true;
      this.eidtUserId = row.id;
    },
    // 修改用户对话框的关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    // 校验用户修改信息
    editUserInfo() {
      this.$refs.editFormRef
        .validate()
        .then(async () => {
          const {
            data: {
              meta: { status, msg },
            },
          } = await User.getUserInfoEdit(this.eidtUserId, this.editForm);
          if (status == 200) {
            this.$message.success(msg);
            this.getUserList();
          } else {
            this.$message.error(msg);
          }
          this.eidtDialog = false;
        })
        .catch((err) => err);
    },
    /* 删除用户 */
    removeUserById(id) {
      this.$confirm("此操作可永久删除该用户，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const {
            data: {
              meta: { status, msg },
            },
          } = await User.getUserInfoDelete(id);
          if (status == 200) {
            this.$message.success(msg);
            this.getUserList();
          } else this.$message.error(msg);
        })
        .catch((error) => this.$message.info(error)); //此catch 点击取消就会触发 用来提示用户取消操作
    },
    /* 分配用户角色*/
    assignUserInfoRole(userInfo) {
      this.userInfo = userInfo;
      this.getRolesListAll();
      this.setRoleDialogShow = true;
    },
    //获取所有角色列表
    async getRolesListAll() {
      const {
        data: { data, meta },
      } = await User.getRolesList();
      if (meta.status !== 200) {
        return this.$$message.error(meta.msg);
      }
      this.roleList = data;
    },
    //确认分配角色
    async setRoleConfirm() {
      if (!this.selectedRoleId) {
        return this.$message.warning("请选择一个角色！");
      }
      const {
        data: { meta },
      } = await User.getUserroleAssign(this.userInfo.id, {
        rid: this.selectedRoleId,
      });
      if (meta.status !== 200) {
        return this.$message.err(meta.msg);
      }
      this.$message.success(meta.msg);
      this.getUserList();
      this.setRoleDialogShow = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
