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
          ><el-input
            ><el-button
              slot="append"
              icon="el-icon-search"
            ></el-button></el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary">添加用户</el-button></el-col
        >
      </el-row>
      <el-table>
        <template v-for="item in tableColumn">
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
          ></el-table-column>
        </template>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { tableColumn } from "../Config/usersConfig";
export default {
  data() {
    return {
      tableColumn: tableColumn, //table表头数据
      tableData: [],
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const { data } = await this.$http.post("users", {
        params: this.queryInfo,
      });
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 15px;
  .el-pagination {
    margin-top: 15px;
    margin-left: 1080px;
  }
}
</style>
