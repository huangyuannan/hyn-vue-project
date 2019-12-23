<template>
  <div class="movies-index-box">
      <div class="movies-index-top">
          <div class="swiper-bg">
               <van-swipe class="swiper-box-bg"  ref="swiperBg">
                    <van-swipe-item v-for="(item,index) in moviesSwiper" :key="index">
                        <img :src="item.moviesImgUrl" alt="">
                    </van-swipe-item>
                </van-swipe>
          </div>
          <div class="swiper-box">
              <van-swipe   class="swiper-box-content" :autoplay="1000000" indicatior-color="white"  @change="CurrentSelect" >
                  <van-swipe-item v-for="(item,index) in moviesSwiper" :key="index" >
                      <img :src="item.moviesImgUrl" alt="">
                  </van-swipe-item>
              </van-swipe>
          </div>
      </div>
      <div class="movies-content-box">
          <div class="movies-info-list-box">
              <div class="movie-item" v-for="(item,index) in moviesList" :key="index"   @touchstart="touchstart($event,index)" @touchmove="touchmove($event,index)" @touchend="touchend" >
                <div class="movies-title">
                    <div>{{index + 4}}</div>
                    <div>电影名:</div>
                    <div class="movies-name">{{item.moviesName}}</div>
                </div>
                <div>评分:{{item.rating}}</div>
              </div>
          </div>
      </div>
     
  </div>
</template>

<script>
export default {
    data(){
        return{
           moviesSwiper : [],
           moviesList : [], 
           //touch事件所需变量
           touchObject : {
               startX : [] ,
               endX : [],
               transformValue : [] 
           },
           isTouchState : false,
        }
    },
    methods : {
        touchstart(event,index){   
            this.touchObject.startX[index] = event.touches[0].pageX;
            // event.changedTouches[0].startX = this.touchObject.startX;
            //每次开始拖动的时候先获取transform的值
            let str = event.currentTarget.style.transform;
            if(str !== '' ){
                this.touchObject.transformValue[index] = str.match(/-{0,1}\d+/);
            }else{
                this.touchObject.transformValue[index] = [];
                this.touchObject.transformValue[index][0] = 0;
            }
        },
        touchmove(event,index){
            this.touchObject.endX[index] = event.touches[0].pageX;
            var offsetLeft =  event.currentTarget.offsetLeft;
            let moveX = this.touchObject.endX[index] - this.touchObject.startX[index] - offsetLeft + parseInt(this.touchObject.transformValue[index][0]);
            event.currentTarget.style.cssText = "transition: all 0s;transform: translateX("+moveX+"px);"
        },
        touchend(event){
            // debugger;
        },
        CurrentSelect(index){
            this.$refs.swiperBg.swipeTo(index);
        },
        getMoviesList(){
            let _this = this;
            this.$axios.post('/index').then((res)=>{
                if(res.status === 200){
                    _this.moviesSwiper = res.data.slice(0,3);
                    _this.moviesList = res.data.slice(3);
                }
            })
        },
        initEvent(){
            document.addEventListener("touchstart", function (ev) {
                ev.preventDefault();
            });
        }
    },
    mounted(){
        this.getMoviesList();
        let ary = new Array(100000).fill(1);
         console.time()
        for(var i = 0 , toolTip; toolTip = ary[i++] ; ){
        //    console.log(toolTip);
        }
          console.timeEnd()
        console.time()
        for(var j = 0 ; j < ary.length ; j++){
           var toolTip2  = ary[j];
        //    console.log(toolTip2);
        }
          console.timeEnd()
        this.$nextTick(()=>{
            // let user = {
            //     id : 15959109427,
            //     name : 'SKALHYN',
            //     age : 10,
            //     balance : 2000
            // }
            // this.$store.commit('setUser',user);
            // let iUser = this.$store.state.user;
            // let isLogin = this.$store.state.isLogin;
            this.initEvent();
        })
    }
}
</script>

<style scoped lang="scss">
.movies-index-box{
    // height: 100%;
}
.movies-index-top{
    position: relative;
    height: vm(150);
    .swiper-bg {
        position:absolute;
        width:100%;
    }
    .swiper-box{
        padding: 0 vm(24);
        width:100%;
        box-sizing: border-box;  
    }   
    .swiper-box-content,.swiper-box-bg{
        width : 100%;
        height: vm(150);
    } 
    .swiper-box-bg img{
        width: 100%;
        height: vm(150);
        filter : blur(vm(50));
    }
}


.swiper-box-content,.swiper-box-bg{
    width : 100%;
    height: vm(150);
}
.swiper-box-content img{
    width: 100%;
    object-fit: cover;
}
.movies-info-list-box{
    width:100%;
    padding:0 vm(12);
    box-sizing: border-box;
    overflow-x:hidden;
}
.movie-item{
    width: 150%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.5rem;
    white-space: nowrap;
    transition: all .5s;
    transform: translateX(0);
}
.movies-title{
    display: flex;
    align-items: center;
}
</style>