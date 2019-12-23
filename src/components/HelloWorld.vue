<template>
  <div class="hello-box">
    <div class="movies-box">
      <div class="movies-item-box" v-for="(item,index) in movies" :key="index">
        <img :src="item.coverImg" alt="">
        <div class="movie-name">{{item.titleName}}</div>
        <div class="movie-rate">{{item.rateValue}}</div>
      </div>
      <input class="upload-file-box" type="file" name="file"  multiple = "multiple"   @change="uploadFile">
      <input class="upload-file-box2" type="file" name="file"  multiple = "multiple"   @change="showFile">
      <div class="download-btn" @click="downLoadImg">下载</div>
     
    </div>
    <div class="test-class"></div>
  </div>
</template>

<script lang="js">
import jm  from '../assets/js/api/cryptp-js.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      movies : [],
    }
  },
  methods :{
    getMsg(){
      this.$axios.post('/api/page/index/124',{}).then((res)=>{

      })
    },
    uploadFile(event){
      debugger;
      let filesList = [];
      let formData = new FormData();
      var files = event.target.files;
      for(let i = 0 ; i < files.length ; i ++){
          formData.append('files' , files[i]);
          // filesList.push(formData);
      }
     
      this.$axios.post('/api/page/index/uploadfile',formData).then((res)=>{
      }).catch((err)=>{
      })
      
    },
    testAsync(){
      return new Promise((resolve,reject)=>{
        let nums = 0;
       
         setTimeout(() => {
            for(let i = 0 ; i < 20000 ; i ++ ){
              nums += i ;
              
            }
            // return nums
            console.log(nums);
             resolve(nums);
            
         }, 3000);
      }
       )
    },
    async useSync(){
      let nums = await  this.testAsync();
      
      console.log('123');
    },
    showFile(event){
      let reader = new FileReader();
      let preview = document.getElementById('test-id');
      let _this = this;
      reader.onload = function(){
        console.time()
        // preview.src = reader.result;
        debugger;
        preview.src =  _this.dataURLtoFile(reader.result,'123');
        console.timeEnd();
      }
      if(event.target.files[0]){
        reader.readAsDataURL(event.target.files[0]);
      }
    },
     dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime}); 
    },
    // jm(){
    //    DES加密function encryptByDES(message, key) {
    //         var keyHex = CryptoJS.enc.Utf8.parse(key);  
    //       var encrypted = CryptoJS.DES.encrypt(message, keyHex, {        mode: CryptoJS.mode.ECB,        padding: CryptoJS.pad.Pkcs7    });    return encrypted.toString();}
    // },
    downLoadImg(){
      let src = "https://img.ciyuanmh.com/ksmall/images/ef36565b-aa1a-4d05-876e-cbe4aeb31724.jpg@75Q";
      let image = new Image();
      let img = document.querySelector("#test-id");
      let div = document.querySelector(".test-class");
      image.src = src;
      image.setAttribute("crossOrigin","anonymous");
      image.onload = function(){
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image,0,0,image.width,image.height);
        let url = canvas.toDataURL("image/png");//得到图片的base64编码数据
        // debugger;
        div.style.backgroundImage = url;
        console.log(url);
            // debugger;
        // img.src = url
    
        // let mw = window.btoa(url);
        // let jmmv = window.atob(mw);
        // let mw = jm.encrypt(url,'123');
        // let jmmw = jm.decrypt(mw.value,mw.key);
        

      };
    },
    testZ(){
      debugger;
      console.log(a);
      console.log(b);
      var a = 1;
      let b = 2;
    }
  },
  mounted(){
    debugger;
    console.log(process.env.NODE_ENV)
    // this.getMsg();
    // this.downLoadImg();
    // this.useSync();
    this.testZ();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
$base_vm : 375;
@function vm($px){
  @return $px/$base_vm * 100vw;
}
.test-class{
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width:vm(200);
  height: vm(200);
}
.movies-box{
  display: flex;
  flex-wrap: wrap;
}
.movies-item-box{
  display: flex;
  flex-direction: column;
}
.movies-item-box{
  margin-right: .2rem;
  margin-bottom:.2rem;
}
.movies-item-box>img{
  height:3.2rem;
  width:30%;
}
.upload-file-box{
  width:100px;
  height: 45px;
}
.download-btn{
  width:vm(100);
  height: vm(50);
  background-color:deepskyblue;
  border-radius: vm(20);
  text-align: center;
  line-height: vm(50);
}
</style>
