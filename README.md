# admin-iwei


## 安装项目依赖

```sh
npm install
```

### 运行

```sh
npm run dev
```

### 打包

```sh
npm run build
```

### 你还需要启动数据

```sh
npm install json-server
```

```sh
json-server db.json
```

### 功能完成情况
-   路由
    -   顶部进度条（NProgress）
-   登录
    -   登录验证
    -   本地保存用户数据
-   左侧菜单栏
    - 递归渲染路由
-   头部菜单
    - 面包屑
    - 全屏
    - 退出登录
-   首页
    -   echarts简单使用
-   用户管理
    - 数据渲染
    - 增删改查
        - 编辑操作的密码可复制
    - 分页器
-   权限管理
    -   角色权限 
        -   选择多个用户进行权限设置
    -   权限列表
        -   数据渲染
-   订单管理 （未完善）
-   商品管理
    -   商品列表
        -   数据渲染
        -   表头排序
        -   模糊搜索、删除
        -   分页器
    -   商品添加
        -   图片base64格式化
        -   省市区三级联动（element-china-area-data）
        -   添加功能实现
    -   商品分类
        -   使用了el-tabs（el-tab-pane）+请求
        -   数据渲染 （还有bug)
-   上传
    -   文件上传
        - 文件上传 el-upload
        - 文件打印 window.print
        - 文件下载 xlxs
-   404页面处理
### 简单总结
> 项目使用（技术栈和工具） vite、vue3、router@4、element-plus、pinia、echarts（简单引入）、和各种第三方组件。完成情况已经列在上面。总体来说小功能还是很多的。
