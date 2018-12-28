<template>
  <PageComponents  pageName='备忘录管理系统-注册页' :isShow='true' @sendSelf='getSon'/>
</template>
<script>
import PageComponents from '../components'
export default {
  name: 'Register',
  data () {
    return {
    }
  },
  components:{
    PageComponents
  },
  methods:{
    //获取子组件表单信息
    getSon(res){
      this.checkUser(res);
    },
    //表单验证
    checkUser(obj) {
      if (obj.username.length>5 && obj.password.length<12){
        //用户名合格，判断用户密码
        let password = obj.password;
        if (password === obj.surepasswords && password.length > 8 && password.length < 20){
          this.getUserInfo(obj)
        }else{
          alert('密码不符合')
        }
      }else{
        console.log('用户名不能为空并且长度应该在5-12位');
      }
    },
    //网络请求
    getUserInfo(obj){
      var url = 'https://todo.lanternfish.ai/user';
      this.$axios.post(url,{
        username:obj.username,
        password:obj.password
      })
    .then(data => {
        console.log(data.data);
        alert('注册成功！');
        this.$router.push('login');
      })
    .catch(error => {
        console.log(error);
        alert('注册失败！请检查用户名或密码是否符合规范')
      })
    }
  },
}
</script>

<style scoped>

</style>
