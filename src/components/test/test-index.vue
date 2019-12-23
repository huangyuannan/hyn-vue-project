<template>
  <div @click="addValue">
      {{showNums}}
  </div>
</template>

<script>
export default {
    data(){
        return{
           nums : 0,
           showNums : 0,
        }
    },
    methods : {
        isChange(){

        },
        addValue(){
            this.nums += 1000 ;
        }
    },
    watch : {
         nums(newVaule,oldVaule){
            let _this = this;
            // debugger;
            //运行次数
            let changeValue = newVaule - oldVaule;
            //总用时间
            let totalWatiTime = 10*1000; //10s  10 / 10
            //每次运行的时间
            let perRunTime = totalWatiTime/changeValue;   
            //开始等待时间1s
            let initWatiTime = 1000;

            for(let k = 0 ; k < changeValue ; k++){
                initWatiTime += perRunTime;
                (function(k,watiTime){
                    setTimeout(()=>{
                        _this.showNums = oldVaule
                    },watiTime)
                }(k,initWatiTime))
            }
         }
    },
    mounted(){
        let sg = 10000;
        this.nums =0;
        // while()
    }
}
</script>

<style>

</style>