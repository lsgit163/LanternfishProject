<template>
  <div>
    <div class="">
      <button type="button" @click='SelectHandler'>全选</button>
      <button type="button" @click='unSelectHandler'>取消</button>
      <button type="button" @click='delHandler'>删除</button>
      <button type="button" @click='putHandler'>修改</button>
      <div class="put-content">
        <input type="text" name="" value=""ref='addText'>
        <button type="button" @click='addHandler'>添加</button>
      </div>
    </div>
    <ul class="texts-component">
      <li v-for="(item, index) in data"  :key="index">
        <input type="checkbox" :id="index" ref='test'>
        <label :for="index">{{ item.title }}</label>
        <input type="text" name="" value="" ref='putText' class="put" @focus='toCheck'>
      </li>
    </ul>
  </div>
</template>
<script>
import { Axios } from '../jwt_login/AxiosPlugin'
export default {
  name: 'TextsComponent',
  data(){
    return {
    }
  },
  methods:{
    //选中输入框自动勾选checkbox
    toCheck(event){
      event.path[1].childNodes[0].checked = true;
    },
    unSelectHandler(event){
      var checkedArr = this.$refs.test;
      for (var i = 0; i < checkedArr.length; i++){
        checkedArr[i].checked = false
      }
    },
    SelectHandler(event){
      var checkedArr = this.$refs.test;
      for (var i = 0; i < checkedArr.length; i++){
        checkedArr[i].checked = true
      }
    },
    addHandler(event){
      let params = {title:this.$refs.addText.value};
      //正则判断titl是否符合规范
      if (this.re(params.title)){
        this.AddRequest('https://todo.lanternfish.ai/todo',params);
        alert('添加成功!');
      }
    },
    delHandler(event){
      var checkedArr = this.$refs.test;
      console.log(checkedArr);
      var param = {};
      let idArr = [];
      for (var i = 0; i < checkedArr.length; i++) {
        if (checkedArr[i].checked){
          param[i] = checkedArr[i].parentNode.outerText;
          idArr.push(this.data[i].id);
        }
      }
      for (var k=0; k<idArr.length; k++){
        this.DelRequest(`https://todo.lanternfish.ai/todo/${idArr[k]}`,param)
      }
      alert('删除成功!');
    },
    putHandler(event){
      var checkedArr = this.$refs.test;
      var putText = this.$refs.putText;
      let paramArr = [];
      let idArr = [];
      for (var i = 0; i < checkedArr.length; i++) {
        if (checkedArr[i].checked){
          let param = {};
          param.title = putText[i].value
          paramArr.push(param);
          idArr.push(this.data[i].id);
        }
      }
      for (var k=0; k<idArr.length; k++){
        if (this.re(paramArr[k].title)){
         this.PutRequest(`https://todo.lanternfish.ai/todo/${idArr[k]}`,paramArr[k]);
        }
      }
      alert('修改成功!');
    },
    //正则
    re(par){
      if (par.trim().length > 0){
       return  /^([^\u4e00-\u9fa5a-zA-Z0-9]|[\u4E00-\u9FA5]|[\w\d]){1,10}$/ig.test(par);
     }else{
       alert('输入内容不能为空')
     }
    },
    //添加网络请求
    AddRequest(url,par){
      Axios.post(url,par)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
    },
    //DEL网络请求
     DelRequest(url,param){
      Axios.delete(url,{params:param})
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
    },
    //修改请求
    PutRequest(url,param){
      Axios.put(url,param)
      .then(data => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      })
    },
  },
  props:{
    data:{
      type:Array,
      default:function (){
        return []
      }
    }
  },
}
</script>

<style scoped>
.texts-component{
  width: 100%;
}
.texts-component li{
  list-style: none;
  width: 100%;
  text-align: left;
  padding:30px 0;
}

.texts-component li label{
  text-align: left;
}
.texts-component button{
  text-align: left;
}
/*pc端*/
@media screen and (min-width: 992px) {
  .put-content{
    display: inline-block;
  }
  .texts-component li{
    background-color: lightgreen;
  }
  .texts-component li:nth-child(2n){
    background:skyblue;
  }
}
/*ipad端*/
@media screen and (max-width: 991px) and (min-width: 768px) {
  .put-content{
    display: inline-block;
  }
  .texts-component li{
    background-color: yellow;
  }
  .texts-component li:nth-child(2n){
    background:pink;
  }
}
/*移动端*/
@media screen and (max-width:767px) {
  *{
    margin:0;
    padding:0;
  }
  .texts-component li{
    background-color: red;
  }
  .texts-component li:nth-child(2n){
    background:orange;
  }
  .put-content{
    display: block;
    padding: 10px;
  }
}

</style>
