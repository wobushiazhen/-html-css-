<template>
  <div class="goods-add">
    <el-form :model="formDate" label-position="right">
      <el-form-item label="商品名称">
        <el-input v-model="formDate.title" />
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select v-model="formDate.categore" placeholder="商品类别">
          <el-option label="服装" value="0" />
          <el-option label="家电" value="1" />
          <el-option label="母婴" value="2" />
          <el-option label="家居日用" value="3" />
          <el-option label="化妆品" value="4" />
          <el-option label="文体" value="5" />
          <el-option label="数码" value="6" />
          <el-option label="鞋包" value="7" />
          <el-option label="汽车挂件" value="8" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload class="avatar-uploader" :show-file-list="false" :http-request="onChange">
          <img v-if="formDate.img" :src="formDate.img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="formDate.price" />
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="formDate.count" />
      </el-form-item>
      <el-form-item label="发货地区">
        <el-cascader :options="options" v-model="selectedOptions" @change="addressChange">
        </el-cascader>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onaddGoods">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup>
import { reactive, ref } from "vue";
import { addGoods } from "@/api/goods.js";
import { regionData, CodeToText } from "element-china-area-data";

//表单数据
const formDate = ref({
  img: "",
  title: "",
  price: null,
  categore: null,
  count: null,
  area: "",
});
// 照片处理
const imageUrl = ref("");

function onChange(options) {
  const file = options.file;
  const typeRight = ["image/png", "image/jpg", "image/jpeg"].includes(
    file.type
  );
  const sizeRight = file.size / 1024 / 1024 < 2;
  if (!typeRight || !sizeRight) {
    ElMessage.error("校验不通过，请检查文件类型与大小");
    return false;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    imageUrl.value = fileReader.result;
    formDate.value.img = fileReader.result;
  };
  return false;
}

const options = ref(regionData);

//城市绑定
const selectedOptions = ["", "", ""];

function addressChange(arr) {
  let addressText =
    CodeToText[arr[0]] + CodeToText[arr[1]] + CodeToText[arr[2]];
  formDate.value.area = addressText;
}
function onaddGoods() {
  //校验
  addGoods(formDate.value)
    .then((res) => {
        ElMessage({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: "添加失败",
        type: "error",
      });
    }).finally(()=>{
      formDate.value.img=""
      formDate.value.title=""
      formDate.value.price=null
      formDate.value.categore=null
      formDate.value.count=null
    })
}
</script>

<style setup>
.goods-add {
  /* width: 100%; */
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.el-form {
  width: 450px;
}

.avatar-uploader {
  display: flex;
  justify-content: space-around;

  /* flex-direction: ; */
}

.avatar-uploader .avatar {
  width: 158px;
  height: 158px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: rgb(9, 167, 202);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 158px;
  height: 158px;
  text-align: center;
}
</style>