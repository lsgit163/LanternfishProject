<template>
  <div class="">
    <PageComponents pageName='备忘录管理系统-登录页' :isShow='false' @sendSelf='getUserInfo'/>
  </div>
</template>

<script>
import PageComponents from '../components'
export default {
  name: 'Login',
  data () {
    return {
      token:''
    }
  },
  components:{
    PageComponents
  },
  methods:{
    getUserInfo(res){
      this.checkUser(res)
    },
    //表单验证
    checkUser(obj) {
      if (obj.username.length>0){
        //用户名合格，判断用户密码
        let password = obj.password;
        if (password.length > 0){
          // this.getUserInfo(obj);
          this.onLogin(obj);
          this.$router.push('index');
        }else{
          alert('用户名或密码不符合规范')
        }
      }else{
        alert('用户名或密码不符合规范')
      }
    },
    //网络请求
    getUserInfo(obj){
      this.$axios.post('https://todo.lanternfish.ai/auth',{
        username:obj.username,
        password:obj.password
      })
    .then(data => {
        alert('登录成功！');
        localStorage.setItem('token',data.data.token);
        this.$router.push('index')
      })
    .catch(error => {
        console.log(error);
        alert('登录失败！');
      })
    }
  }
}
</script>

<style scoped>

</style>
