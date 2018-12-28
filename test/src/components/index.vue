<template>
  <div class="components">
      <h2>{{ pageName }}</h2>
      <div>
        <p>用户名：<input type="text"  value="" ref='usernames'></p>
        <p>用户密码：<input type="password"  value="" ref='passwords'></p>
        <p v-show="isShow">确认密码：<input type="password"  value="" ref='surepasswords'></p>
        <button type="submit" name="button" @click='getUserInfo'>登录</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Components',
  data () {
    return {
    }
  },
  props:{
    pageName:{
      type:String,
      required:true
    },
    isShow:{
      type:[Boolean,String],
      required:true
    }
  },
  computed:{
    result(){
      return this.isShow
    }
  },
  methods:{
    getUserInfo(){
      var userName = this.$refs.usernames.value;
      var passWord = this.$refs.passwords.value;
      var surePasswords = this.$refs.surepasswords.value;
      var obj = {
        username:userName,
        password:passWord,
        surepasswords:surePasswords
      }
      this.$emit('sendSelf',obj)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.components{
   background: linear-gradient(skyblue,lightgreen);
}
.components div p{
  text-align: center;
}
.components div p:first-child{
  margin-left: 15px;
}
.components div{
  width: 50%;
  padding: 10px 0;
  margin: 0 auto;
  background-color: skyblue;
}
</style>
