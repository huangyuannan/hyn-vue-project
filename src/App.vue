<template>
  <div id="app">
    <router-view/>
    <div :class="['float-login-register-box',isShowLogin?'float-login-register-box-show':'']" >
        <div class="login-float">
          <van-icon name="user-o" />
          <div>login</div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isShowLogin : false
    }
  },
  methods : {
    initEvent(){
      let app = document.querySelector('#app');
      let loginDom = document.querySelector('.float-login-register-box');
      let width = app.clientWidth * 0.2;
      let scrollTop = 0 ;
      let _this = this;
      let isScroll = false;
      app.addEventListener('scroll',function(event){
          scrollTop = event.currentTarget.scrollTop;
             if((scrollTop > width) && _this.$store.state.isLogin === false){
              _this.isShowLogin = true;
            }else{
                _this.isShowLogin = false;
            }
      })
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.initEvent();
    })
  }
}
</script>
<style lang="scss">
$base_vm : 375;
@function vm($px){
  @return $px/$base_vm * 100vw;
}
#app{
  position: relative;
  height: 100vh;
  width:100vw;
  overflow-y:auto;
  overflow-x:hidden;
}
.float-login-register-box{
  position:fixed;
  bottom:vm(50);
  right:vm(20);
  transition : all 1 s;
  opacity: 0;
  transform: translate(150%,150%) scale(.1,.1) rotateZ(0deg);
}
.float-login-register-box-show{
  opacity: 1;
  transform: translate(0%,0%) scale(1,1) rotateZ(3600deg);
}
.login-float{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items : center;
  background-color:rgb(0, 153, 255);
  border-radius: 50%;
  height: vm(50);
  width:vm(50);
}
@keyframes bounceIn {
	0%,100%,20%,40%,60%,80% {
	-webkit-transition-timing-function:cubic-bezier(0.215,.61,.355,1);
	transition-timing-function:cubic-bezier(0.215,.61,.355,1)
}
0% {
	opacity:0;
	transform:translate(100%,100%)  scale3d(0.2,0.2,0.2)
}
20% {
  opacity: 0.2;
	// -webkit-transform:scale3d(1.1,1.1,1.1);
	transform:translate(80%,80%) 
}
40% {
   opacity: 0.4;
	// -webkit-transform:scale3d(.9,.9,.9);
	transform:translate(60%,60%)
}
60% {
	opacity:0.6;
	// -webkit-transform:scale3d(1.03,1.03,1.03);
	transform:translate(40%,40%)
}
80% {
   opacity: 0.8;
	// -webkit-transform:scale3d(.97,.97,.97);
	transform:translate(20%,20%) 
}
100% {
	opacity:1;
	transform:translate(0%,0%) scale3d(1,1,1)
}
}
.bounceIn {
	-webkit-animation-name:bounceIn;
	animation-name:bounceIn;
	-webkit-animation-duration:.75s;
	animation-duration:.75s
}

@keyframes bounceOut {
  0%,100%,20%,40%,60%,80% {
    -webkit-transition-timing-function:cubic-bezier(0.215,.61,.355,1);
    transition-timing-function:cubic-bezier(0.215,.61,.355,1)
  }
  0% {
    -webkit-transform:scale3d(.9,.9,.9);
    transform:translate(0%,0%) scale3d(.9,.9,.9)
  }
	20% {
	-webkit-transform:scale3d(.9,.9,.9);
	transform:translate(20%,20%) scale3d(.9,.9,.9)
}
  40%{
	opacity:1;
	-webkit-transform:scale3d(1.1,1.1,1.1);
	transform:translate(40%,40%) scale3d(1.1,1.1,1.1)
}
  60%{
	opacity:1;
	-webkit-transform:scale3d(1.1,1.1,1.1);
	transform:translate(60%,60%) scale3d(1.1,1.1,1.1)
}
  80%{
	opacity:1;
	-webkit-transform:scale3d(1.1,1.1,1.1);
	transform:translate(80%,80%) scale3d(1.1,1.1,1.1)
}
100% {
	opacity:0;
	-webkit-transform:scale3d(.3,.3,.3);
	transform:translate(100%,100%) scale3d(.3,.3,.3);
   display:none;
}
}
.bounceOut {
	-webkit-animation-name:bounceOut;
	animation-name:bounceOut;
	-webkit-animation-duration:.75s;
	animation-duration:.75s;
}
</style>
