# login-register.html 文档说明

## 一、基础信息

| 项目         | 说明                                                                 |
|--------------|----------------------------------------------------------------------|
| 文件名称     | login-register.html                                                  |
| 核心功能     | 包含登录、注册双页面的静态结构，支持页面切换、基础表单输入与验证，无样式和交互逻辑，供后续开发扩展。 |
| 技术栈       | 纯 HTML5，采用语义化标签和模块化结构，便于 CSS 美化、JS 交互开发及后端对接。                   |


## 二、HTML 结构解析

### 1. 文档声明与头部（head）
- 声明为 HTML5 文档，设置字符编码为 UTF-8
- 配置 `viewport` 标签适配移动端显示
- 页面标题：`软工集市 - 登录`
- 预留 CSS 引入位置（可通过 `<link>` 标签引入外部样式，或通过 `<style>` 标签编写内部样式）


### 2. 主体内容（body）

#### （1）登录页面容器（`id="login-page"`）
- **Logo 区域**（`class="logo-container"`）：通过 `<h1>` 标签显示 “软工集市” 标识，作为页面核心主题
- **登录表单**（`id="login-form"`）：包裹账号、密码输入项及登录按钮，核心元素如下：
  - 账号输入组（`class="form-group"`）：
    - 输入框：`id="login-username"`，`type="text"`（接收文本输入），`name="username"`（后端接收字段名）
  - 密码输入组（`class="form-group"`）：
    - 输入框：`id="login-password"`，`type="password"`（隐藏输入内容），`name="password"`（后端接收字段名）
  - 登录按钮：`class="form-button"`，用于触发表单提交
  - 注册链接：`class="register-link"`，通过锚点链接（`href="#register-page"`）实现跳转到注册页面


#### （2）注册页面容器（`id="register-page"`）
- **标题区域**（`class="register-title"`）：通过 `<h2>` 标签显示 “账号注册” 标题
- **注册表单**（`id="register-form"`）：包含账号/邮箱、密码、确认密码输入项及注册按钮，核心元素如下：
  - 账号/邮箱输入组：
    - 输入框：`type="email"`（自动验证邮箱格式），`name="registerUsername"`（后端接收字段名），含辅助提示文字
  - 密码输入组：
    - 输入框：`minlength="6"`（限制密码最小长度为 6），`name="registerPassword"`（后端接收字段名）
  - 确认密码输入组：
    - 输入框：同密码输入规则（`minlength="6"`），`name="confirmPassword"`（后端接收字段名），含 “两次密码需一致” 提示
  - 注册按钮：用于触发表单提交
  - 返回登录链接：`class="login-link"`，通过锚点链接（`href="#login-page"`）实现跳转回登录页面


#### （3）页脚（footer）
- 采用语义化 `<footer>` 标签
- 显示版权信息：`© 2024 软工集市 版权所有`


## 三、各角色开发关键信息

### 1. CSS 开发者
- **布局核心**：双页面容器（`#login-page`、`#register-page`）默认通过 `display` 属性控制显示/隐藏（建议初始状态：显示 `#login-page`，隐藏 `#register-page`）
- **样式定位标识**：
  - 通用类：`.form-group`（统一控制表单输入组的间距、布局）、`.form-button`（控制按钮的外观、间距）
  - 独有序号：`#login-form`（登录表单整体样式）、`#register-form`（注册表单整体样式）、`.logo-container`（Logo 样式）、`.register-title`（注册页标题样式）
- **可定制点**：输入框、按钮、标签（`<label>`）、提示文字（`<span>`）的外观，页面容器的居中布局、背景样式等


### 2. JS 开发者
- **交互触发点**：
  - 页面切换：注册链接（`.register-link a`）、返回登录链接（`.login-link a`）的点击事件
  - 表单提交：`#login-form`、`#register-form` 的 `submit` 事件（需先阻止默认提交行为，再对接后端接口）
- **核心操作元素**：
  - 页面容器：`#login-page`、`#register-page`（通过控制 `display` 实现页面切换）
  - 表单与输入框：通过表单 `id`、输入框 `id`（如 `#login-username`、`#register-password`）获取输入值，实现二次验证（如确认密码一致性）
- **基础验证**：HTML 自带验证规则（`required` 必选、`minlength` 最小长度、`type="email"` 邮箱格式），可基于此扩展自定义提示逻辑


### 3. 后端开发者
- **表单提交配置**：
  - 为 `<form>` 标签添加 `action` 属性（如 `action="/api/login"`），指定后端接口地址
  - 为 `<form>` 标签添加 `method` 属性（如 `method="post"`），定义数据提交方式
- **接收数据字段**：
  - 登录表单：`username`（账号）、`password`（密码）
  - 注册表单：`registerUsername`（账号/邮箱）、`registerPassword`（密码）、`confirmPassword`（确认密码）
- **验证补充**：前端验证可被绕过，后端需二次验证（如密码长度、邮箱格式合法性、两次密码一致性）


## 四、注意事项
- 双页面通过锚点链接关联，纯锚点仅实现定位，需配合 CSS/JS 控制 `display` 属性实现 “切换显示” 效果（隐藏原页面、显示目标页面）
- 所有输入框的 `name` 属性为后端接收数据的唯一标识，不可随意修改
- `<label>` 与输入框通过 `for` 和 `id` 关联（`for` 值需与 `id` 完全一致），点击 `<label>` 可聚焦对应输入框，请勿破坏此关联逻辑
