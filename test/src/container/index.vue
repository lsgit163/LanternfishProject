
<script>
import { Axios } from '../jwt_login/AxiosPlugin'
import TextsComponent from '../components/text.vue'
export default {
  name: 'Index',
  data(){
    return {
      res:[]
    }
  },
  components:{
    TextsComponent
  },
  methods:{

  },
  mounted(){
    Axios.get('https://todo.lanternfish.ai/user/todo')
    .then(data => {
      console.log(error);
    })
    .catch(error => {
      console.log(error);
      this.res = error.data
    })
  },
  render(){
    return (
      <div class="index">
        {
          this.res ?
          <TextsComponent data={this.res}/>
          :<div>正在加载...</div>
        }
      </div>
    )
  },
}
</script>

<style scoped>

</style>
