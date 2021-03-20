<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img
        src="https://ncstatic.clewm.net/rsrc/2020/1016/02/4757e4910cb527fc040d019a93ded74f.png?x-oss-process=image/resize,w_750/format,gif/sharpen,100/quality,Q_80/interlace,1/auto-orient,1"
        alt=""
      />
      <h2 class="title">商品库存管理系统 后台</h2>
    </div>
    <form action="">
      <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登陆">
          <div class="item">
            <a-input size="large" placeholder="账户" v-model:value="loginForm.account">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large" placeholder="密码" v-model:value="loginForm.password" >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </div>

          <div class="item">
            <a href="javascript:;" @click="forgetPassword">忘记密码</a>
          </div>

          <div class="item">
            <a-button size="large" type="primary" @click="login">登陆</a-button>
          </div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input size="large" v-model:value="regForm.account" placeholder="用户名">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password size="large" v-model:value="regForm.password" placeholder="密码" >
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </div>

          <div class="item">
            <a-input size="large" placeholder="邀请码" v-model:value="regForm.inviteCode" >
              <template #prefix>
                <MessageOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-button size="large" @click="register" type="primary">注册</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    </form>
  </div>
</template>

<script src='./index.jsx'>
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
