<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/images/avatar.jpeg" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        class="login_form"
        ref="login_formRef"
        :rules="login_formRules"
        :model="login_formInfo"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入登录名"
            v-model="login_formInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
            v-model="login_formInfo.password"
            @keyup.enter.native="loginIn"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="loginIn">登录</el-button>
          <el-button type="plain" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import User from "@/api/server";
export default {
  data() {
    return {
      login_formInfo: {
        username: "",
        password: "",
      },
      /*登录验证信息 */
      login_formRules: {
        username: [
          { require: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "请输入3~5字符长度的登录名",
            trigger: "blur",
          },
        ],
        password: [
          { require: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "请输入6~15字符长度的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /* 重置登录表单输入 */
    resetForm() {
      this.$refs.login_formRef.resetFields();
    },
    /* 登录验证 */
    loginIn() {
      if (
        this.login_formInfo.password == "" ||
        this.login_formInfo.username == ""
      ) {
        this.$message.warning("请输入用户登录信息");
      } else {
        this.$refs.login_formRef
          .validate()
          .then(async () => {
            const {
              data: { meta, data },
            } = await User.getLogin(this.login_formInfo);
            if (meta.status == "200") {
              this.$message.success(meta.msg);
              window.sessionStorage.setItem("token", data.token); //session临时会话 保存token
              this.$router.push("/home");
            } else {
              this.$message.error(meta.msg);
            }
          })
          .catch((err) => {
            return err;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #409eff;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 3px;
    /* 头像 */
    .avatar_box {
      height: 130px;
      width: 130px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    /* 登录表单 */
    .login_form {
      position: absolute;
      bottom: 0;
      padding: 0 20px;
      width: 90%;
      .btn {
        margin-left: 240px;
      }
    }
  }
}
</style>
