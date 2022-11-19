<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/images/logo.png" alt="" />
        <span>西瓜世界</span>
      </div>
      <el-button type="info" @click="layout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toogleButton">|||</div>
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!--  unique-opened 菜单每次只打开一个 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 子级菜单链接改造为 子级路由链接：点击二级菜单的时候，就会根据菜单的index属性进行路由跳转 -->
            <el-menu-item
              v-for="subitem in item.children"
              :index="`/${subitem.path}`"
              :key="subitem.id"
              @click="saveNavState(subitem)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import User from "@/api/server";

export default {
  data() {
    return {
      menuList: [], //左侧菜单栏数据
      iconsObj: {
        125: "el-icon-s-custom",
        103: "el-icon-s-check",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing",
      }, //菜单图标
      isCollapse: false, //菜单展开控制
      activePath: "", //路由链接高亮显示
    };
  },
  created() {
    this.getMenuListData();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    /* 退出 */
    layout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toogleButton() {
      this.isCollapse = !this.isCollapse;
    },
    /* 获取左侧菜单栏数据 */
    async getMenuListData() {
      const {
        data: { data, meta },
      } = await User.getMenuList();
      if (meta.status == 200) {
        this.menuList = data;
      } else {
        console.log(meta.msg);
      }
    },
    /* 保存链接激活高亮显示状态 */
    saveNavState(item) {
      // console.log(activePath.path, "activePath");
      const activePath = `/${item.path}`;
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    div {
      display: flex;
      align-items: center;
      img {
        width: 110px;
        height: 50px;
      }
      span {
        margin-left: 15px;
      }
    }
  }
  .el-container {
    .el-aside {
      background-color: #333744;
      /* 展开按键 */
      .toggle-button {
        text-align: center;
        font-size: 10px;
        line-height: 24px;
        letter-spacing: 0.3em; //文字之间的间隔
        color: rgb(144, 147, 153);
        background-color: #4a5064;
        cursor: pointer;
      }
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}
</style>
