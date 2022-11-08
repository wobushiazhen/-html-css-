<template>
  <div class="main">
    <div class="login">
      <h2>Iwei-admin</h2>
      <el-form ref="formRef" :rules="formRules" :model="formData">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input placeholder="账号" v-model="formData.adminName" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="formData.adminPassword" />
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
import { useRoute, useRouter } from "vue-router";
import {useUserInfoStore} from '@/store/userInfo.js'
export default {
  setup() {
    let formData = reactive({
      adminName: "",
      adminPassword: "",
    });
    //表单验证
    const formRules = reactive({
      username: [{ required: true, message: "请输入用户名",trigger:blur }],
      password: [{ required: true, message: "请输入密码",trigger:blur}],
    });

    let formRef = ref(null);

    //登录按钮
    const router=useRouter()
    const userInfo=useUserInfoStore();
    function onSubmit() {
        // formRef.value.validate();
        // todo  -发请求，添加token，先判读存在嘛
      if(formData.adminName=='admin'&&formData.adminPassword=='123456'){
          localStorage.setItem('token','aa')  //请求回来的token
          //往仓库存数据
          userInfo.adminName=formData.adminName;
          router.replace('/')
      }
    }
    return {
      formData,
      formRules,
      formRef,
      onSubmit,
      router
    };
  },
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  overflow: hidden;
  background: rgb(121, 121, 121);
}
.login {
  border-radius: 12px;
  padding: 25px 50px;
  width: 350px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgb(251, 251, 251);
  // width: ;
  h2 {
    text-align: center;
    font-weight: 900;
    font-size: 34px;
  }
}
.el-button {
  margin: 0 auto;
  width: 100%;
}
</style>

