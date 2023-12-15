我假定您已安装`>=Nodejs18.17`,`docker`,`pnpm`。

```bash
# clone 项目
git clone https://github.com/qinnin6666/learn.git
```

```bash
# 执行docker命令，创建postgres数据库
docker compose up dev-db -d

# postgres 数据库信息:
#   address: localhost
#   port: 5434
#   user: postgres
#   password: 123
#   database: postgres

# 安装npm包
pnpm i

# 迁移数据库结构
pnpm run db-push

# 查看数据库内容
pnpm run db-studio

# 打开项目
pnpm dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000) 就可以看到内容了。

