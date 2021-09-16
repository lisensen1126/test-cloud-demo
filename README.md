# 通知中心和项目列表微前端

此项目为通知中心和项目列表微前端项目

# 开发模式启动方式

### 进入 `coding-dev` 项目的 docker 开发环境

```
 cd enterprise/docker
```

### 编辑 .env 文件

```
vim .env
```

### 增加 .env 文件 COMPOSE_FILE 配置

```
COMPOSE_FILE= // 新增 docker-compose.admin.yml:docker-compose.micro-frontend.yml 配置
```

### 修改或者增加 .env 文件环境变量

```
MICRO_FRONTEND_API=http://127.0.0.1:5050/api/frontend  // 地址可以自由定制
```

### 使用 mockoon 或者其他 api mook 工具配置 `http://127.0.0.1:5050/api/frontend` 内容

可以使用 [mockoon](https://mockoon.com/) 作为 `http://127.0.0.1:5050/api/frontend` mock 工具（也可以选择在线工具 [mocky](https://www.mocky.io/)），复制 `https://assets.codehub.cn/micro-frontend/config/config.coding.production.json` 中的内容，
如下格式修改或者新增模块：

```json
[
    {
        "name": "projects",
        "description": "导航",
        "match": "^\/user\/(notifications|projects)",
        "changelog": "PRODUCT：layout\nCOMMIT：5776c544e3a1d60047e090ad65025cf5a4d872f7\nCI：https://codingcorp.coding.net/p/micro-frontend/ci/job/139073/build/28/pipeline\n",
        "commitId": "5776c544e3a1d60047e090ad65025cf5a4d872f7",
        "changeAt": "2020-02-13 16:55:45.0",
        "css": ["http://127.0.0.1:5058/projects.css"],
        "js": [
            "http://127.0.0.1:5058/uikit~projects.js",
            "http://127.0.0.1:5058/vendors~projects.js",
            "http://127.0.0.1:5058/projects.js"
        ],
        "prefix": ["http://127.0.0.1:5058/"]
    }
    //... 其他微前端应用配置
]
```

字段解释:

|        字段 | 解释                                                  |
| ----------: | :---------------------------------------------------- |
|        name | 产品名，为微前端配置的唯一标识                        |
| description | 产品描述                                              |
|       match | 匹配路由（支持正则表达式）                            |
|   changelog | 变更记录                                              |
|    commitId | 提交记录                                              |
|    changeAt | 变更时间                                              |
|         css | css 文件地址                                          |
|          js | 文件地址                                              |
|      prefix | 静态文件前缀，主要用于 css 等异步加载的静态文件的卸载 |

### 启动 docker 服务

```
./docker-up.sh start
```

### 启动微前端服务

开发模式：

```
HOST=0.0.0.0 PORT=5058 PUBLIC_PATH=http://127.0.0.1:5058/ yarn run dev
```

生产模式：

可以使用 `serve` 等工具直接静态代理构建后的目录。

```
HOST=0.0.0.0 PORT=5058 PUBLIC_PATH=http://127.0.0.1:5058/ yarn run build && serve -l 5058 dist
```

注意：

开发模式和生产模式构建出的 entry 文件不一样，具体请查看 webpack 日志，会显示构建后的 entry 文件。

### 查看效果

访问页面查看效果，如果是微前端页面（需要开启微前端 Exp），控制台会有`[Micro Frontend Framework]`前缀的日志输出。可以直接在浏览器控制台执行如下命令开启微前端 Exp:

```
document.cookie="code=micro%3Dtrue%2C08005302"
```

# 生产模式发布

### 微前端配置管理服务新增服务模块

联系运维新增微前端服务模块

### 使用 CI 发布配置到微前端配置管理服务

webpack 使用 `@micro-frontend/micro-frontend-deploy-plugin` 插件将构建好的 asset 内容发布到微前端配置管理服务和 CDN 上。

### 通知运维发布到 CDN

运维可通过微前端配置管理服务发布配置到 CDN

# 开发构建环境变量说明

所有环境变量见：`./script/env.js` 文件

以下是构建/开发环境变量：

|           环境变量 | 说明                                                  |
| -----------------: | :---------------------------------------------------- |
|           NODE_ENV | 环境（开发环境：development，生产环境：production）   |
|               HOST | 本服务地址，如（8080）                                |
|               PORT | 本服务端，如(0.0.0.0)                                 |
|          SOCK_HOST | webpack dev socket 地址，如(0.0.0.0)                  |
|          SOCK_PORT | webpack dev socket 端口，如(5000)                     |
|        PUBLIC_PATH | webpack 静态资源公开地址                              |
|         CDN_ENABLE | 是否开启 CDN 上传，仅支持腾讯云 cos                   |
|      CDN_SECRET_ID | 腾讯云 cos secretId                                   |
|     CDN_SECRET_KEY | 腾讯云 cos secretKey                                  |
|         CDN_BUCKET | 腾讯云 cos 存储通                                     |
|         CDN_REGION | 腾讯云 cos 存储区域                                   |
|       CDN_BASE_DIR | 腾讯云 cos 基本目录                                   |
|    CDN_PROJECT_DIR | 腾讯云 cos 项目目录，如需要指定目录上传，可以指定这个 |
| CDN_SKIP_DUPLICATE | 是否跳过重复文件                                      |
|          CDN_RETRY | 是否开启重试机制                                      |
|  CDN_CACHE_CONTROL | cdn 文件缓存头信息                                    |
|       GIT_REVISION | git 版本号                                            |
|          LOG_LEVEL | 日志级别                                              |
|                DEV | 是否开发模式                                          |
| CMF_DEPLOY_MESSAGE | 发布到微前端配置的构建描述                            |

---

# 业务环境变量说明

以下是业务环境变量（后续有可能使用配置中心来处理）：

|      环境变量 | 说明                   |
| ------------: | :--------------------- |
|         OWNER | 默认所有者（私有部署） |
| PRIVATE_CLOUD | 是否私有云版本         |
|      API_HOST | API 地址               |
