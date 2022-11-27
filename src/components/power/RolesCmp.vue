<!--
 * @Date: 2022-11-19 21:40:05
 * @LastEditTime: 2022-11-27 22:51:49
 * @Description: 权限管理--权限列表
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item></el-breadcrumb
    >
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col><el-button type="primary">添加角色</el-button></el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table border stripe :data="roleList">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item, index1) in scope.row.children"
              :key="item.id"
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']"
            >
              <!-- 第一层 -->
              <el-col :span="5"
                ><el-tag
                  closable
                  @close="handleRemoveRightTips(scope.row, item.id)"
                  >{{ item.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i
              ></el-col>
              <!-- 第二层 -->
              <el-col :span="19">
                <el-row
                  v-for="(subitem, index2) in item.children"
                  :key="subitem.id"
                  :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']"
                  ><el-col :span="6"
                    ><el-tag
                      type="success"
                      closable
                      @close="handleRemoveRight(scope.row, subitem.id)"
                      >{{ subitem.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i
                  ></el-col>
                  <!-- 第三层 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      v-for="insubitem in subitem.children"
                      :key="insubitem.id"
                      @close="
                        handleRemoveRightTipsTips(scope.row, insubitem.id)
                      "
                      >{{ insubitem.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="setRightShow(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 Dialog  -->
    <el-dialog title="分配权限" :visible.sync="setRightShowDialog" width="50%">
      <el-tree
        ref="treeRef"
        :data="rigthList"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defKeys"
      ></el-tree>

      <span slot="footer">
        <el-button @click="setRightDialogClosed">取 消</el-button>
        <el-button type="primary" @click="setRightDialogConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import User from "@/api/server";
export default {
  name: "RolesCmp",
  data() {
    return {
      roleList: [],
      rigthList: [],
      setRightShowDialog: false,
      defKeys: [],
      roleId: "", //所分配权限的角色Id
      defaultProps: { label: "authName", children: "children" },
    };
  },
  created() {
    this.getRolesListAll();
  },
  methods: {
    // 获取权限
    async getRolesListAll() {
      const {
        data: { data, meta },
      } = await User.getRolesList();
      if (meta.status !== 200) {
        return this.$$message.error(meta.msg);
      }
      this.roleList = data;
    },
    //删除权限
    handleRemoveRightTipsTips(role, rightId) {
      this.$confirm("此操作将永久删除权限，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.getgetRightRemove(role, rightId);
        })
        .catch((err) => {
          this.$message.info(err);
        });
    },
    async getgetRightRemove(role, rightId) {
      try {
        const {
          data: {
            meta: { status, msg },
            data,
          },
        } = await User.getRightRemove(role.id, rightId);
        if (status !== 200) {
          this.$message.error(msg);
        } else {
          role.children = data; // NOTE:更新页面数据
          this.$message.success(msg);
        }
      } catch (err) {
        return err;
      }
    },
    // 分配权限
    async setRightShow(row) {
      try {
        this.roleId = row.id;
        const {
          data: { meta, data },
        } = await User.getRightTree();
        if (meta.status === 200) {
          this.rigthList = data;
          this.getLeafKeys(row, this.defKeys);
          this.setRightShowDialog = true;
        } else {
          this.$message.error(meta.msg);
        }
      } catch (err) {
        return err;
      }
    },
    //获取角色下所有三级权限ID
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => {
        this.getLeafKeys(item, arr);
      });
    },
    //关闭分配权限
    setRightDialogClosed() {
      this.defKeys = [];
      this.setRightShowDialog = false;
    },
    // 确定分配权限
    async setRightDialogConfirm() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.toString();
      const {
        data: { meta },
      } = await User.getRightsSet(this.roleId, { rids: idStr });
      if (meta.status !== 200) this.$message.error(meta.msg);
      else {
        this.getRolesListAll();
        this.$message.success(meta.msg);
        this.setRightShowDialog = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  margin-left: 40px;
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
