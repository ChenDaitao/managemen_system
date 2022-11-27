<!--
 * @Date: 2022-11-19 21:25:17
 * @LastEditTime: 2022-11-26 22:39:46
 * @Description: 权限管理--权限管理
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item></el-breadcrumb
    >
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import User from "@/api/server";
export default {
  name: "RightCmp",
  data() {
    return {
      rightsList: [],
    };
  },
  created() {
    this.getRightListAll();
  },
  methods: {
    // 获取权限
    async getRightListAll() {
      const {
        data: { data, meta },
      } = await User.getRightList();
      if (meta.status !== 200) {
        return this.$$message.error(meta.msg);
      }
      this.rightsList = data;
    },
  },
};
</script>

<style lang="scss"></style>
