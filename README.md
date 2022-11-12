# admin-iwei


## 安装项目依赖

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 功能完成情况
-   路由
    -   顶部进度条
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
    - 分页器
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
        -   数据渲染 （还有bug）