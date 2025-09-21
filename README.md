软工集市登录注册页面 HTML 文档说明
一、基础信息
文件名称：login-register.html
核心功能：包含登录、注册双页面的静态结构，支持页面切换、基础表单输入与验证，无样式和交互逻辑，供后续开发扩展。
技术栈：纯 HTML5，采用语义化标签和模块化结构，便于 CSS 美化、JS 交互开发及后端对接。


二、HTML 结构解析
1. 文档声明与头部（head）
声明为 HTML5 文档，设置字符编码为 UTF-8，适配移动端显示（viewport 标签）。
页面标题为 “软工集市 - 登录”，预留 CSS 引入位置（<link>标签或<style>标签可在此添加）。
2. 主体内容（body）
（1）登录页面容器（id="login-page"）
Logo 区域（class="logo-container"）：含<h1>标签显示 “软工集市” 标识，作为页面核心主题。
登录表单（id="login-form"）：包裹账号、密码输入及登录按钮，核心元素：
账号输入组（class="form-group"）：<label>关联输入框（id="login-username"），type="text"接收文本，name="username"为提交字段名。
密码输入组（class="form-group"）：<label>关联输入框（id="login-password"），type="password"隐藏输入内容，name="password"为提交字段名。
登录按钮（class="form-button"）：<button type="submit">触发表单提交。
注册链接（class="register-link"）：锚点链接（href="#register-page"），用于切换到注册页面。
（2）注册页面容器（id="register-page"）
标题区域（class="register-title"）：<h2>显示 “账号注册” 标题。
注册表单（id="register-form"）：含账号 / 邮箱、密码、确认密码输入及注册按钮，核心元素：
账号 / 邮箱输入组：type="email"自动验证邮箱格式，name="registerUsername"为提交字段名，含<small>辅助提示文字。
密码输入组：minlength="6"限制密码长度，name="registerPassword"为提交字段名。
确认密码输入组：同密码输入规则，name="confirmPassword"为提交字段名，含<small>提示 “两次密码需一致”。
注册按钮：<button type="submit">触发表单提交。
返回登录链接（class="login-link"）：锚点链接（href="#login-page"），用于切换回登录页面。
（3）页脚（footer）
显示版权信息 “© 2024 软工集市 版权所有”，采用语义化<footer>标签。


三、各角色开发关键信息
1. CSS 开发者
布局核心：双页面容器（#login-page、#register-page）默认可通过display控制显示 / 隐藏（建议初始显示 #login-page，隐藏 #register-page）。
样式定位标识：
通用类：.form-group（表单输入组，统一控制间距 / 布局）、.form-button（按钮容器，控制按钮样式）。
独有序号：#login-form、#register-form（表单整体样式）、.logo-container（Logo 样式）、.register-title（注册页标题样式）。
可定制点：输入框、按钮、标签、提示文字（<small>）的外观，以及页面容器的居中、背景等布局样式。
2. JS 开发者
交互触发点：
页面切换：注册链接（.register-link a）、返回登录链接（.login-link a）的点击事件。
表单提交：#login-form、#register-form 的 submit 事件（需阻止默认提交行为后对接接口）。
核心操作元素：
页面容器：#login-page、#register-page（控制显示 / 隐藏实现切换）。
表单与输入框：表单 id、输入框 id（如 #login-username、#register-password），用于获取输入值、做二次验证（如确认密码一致性）。
基础验证：HTML 自带required（必填）、minlength（密码长度）、type="email"（邮箱格式）验证，可基于此扩展自定义提示。
3. 后端开发者
表单提交配置：需为<form>添加action属性（如 action="/api/login"），指定数据提交的后端接口地址；可添加method属性（如 method="post"）定义提交方式。
接收数据字段：
登录表单：username（账号）、password（密码）。
注册表单：registerUsername（账号 / 邮箱）、registerPassword（密码）、confirmPassword（确认密码）。
验证补充：前端验证可被绕过，后端需二次验证（如密码长度、邮箱格式、两次密码一致性）。
四、注意事项
双页面通过锚点链接关联，需配合 CSS/JS 实现 “切换显示” 效果（纯锚点仅定位，不隐藏原页面）。
所有输入框均带name属性，为后端接收数据的唯一标识，不可随意修改。
<label>与输入框通过for和id关联，点击标签可聚焦输入框，请勿破坏此关联（id 与 for 值需一致）。