<template>
  <div class="main">
    <div class="login">
      <h2>Iwei-admin</h2>
      <el-form ref="formRef" :rules="formRules" :model="formData">
        <!-- 账号 -->
        <el-form-item prop="adminName">
          <el-input placeholder="账号" v-model="formData.adminName" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="formData.password" />
        </el-form-item>
        <!-- 登录按钮  @click="onSubmit" -->
        <el-form-item>
          <el-button @click="onSubmit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script >
// import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";

import { login } from "@/api/login.js";
//持久化
import { useRoute, useRouter } from "vue-router";
import { useUserInfoStore } from "@/store/userInfo.js";
export default {
  setup() {
    let formData = reactive({
      adminName: "",
      password: "",
    });
    //表单验证
    const formRules = reactive({
      adminName: [{ required: true, message: "请输入用户名" }],
      password: [{ required: true, message: "请输入密码" }],
    });

    let formRef = ref(null);

    //登录按钮
    const router = useRouter();
    const userInfo = useUserInfoStore();
    function onSubmit() {
      formRef.value?.validate();
      login(formData)
        .then((res) => {
          console.log(res.data.adminName);
          if (res.data.length) {
            localStorage.setItem("token", "aa"); //请求回来的token
            //往仓库存数据
            // userInfo.adminName = formData.adminName;
            localStorage.setItem("adminName",formData.adminName)
            router.replace("/");
            ElMessage({
              showClose: true,
              message: `登录成功，欢迎您，${formData.adminName}`,
              type: "success",
            });
          } else {
            ElMessage({
              showClose: true,
              message: "账号密码有误",
              type: "error",
            })
          }
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: "登录失败",
            type: "error",
          });
        });
      // if(formData.adminName=='admin'&&formData.adminPassword=='123456'){
      //     localStorage.setItem('token','aa')  //请求回来的token
      //     //往仓库存数据
      //     userInfo.adminName=formData.adminName;
      //     router.replace('/')
      // }
    }
    return {
      formData,
      formRules,
      formRef,
      onSubmit,
      router,
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  overflow: hidden;
  background: rgba(207, 207, 207, 0.725);
}

.login {
  border-radius: 12px;
  padding: 25px 50px;
  width: 310px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgb(251, 251, 251);

  // width: ;
  h2 {
    line-height: 60px;
    text-align: center;
    font-size: 34px;
  }
}

.el-button {
  margin: 0 auto;
  width: 395px;
}
</style>

