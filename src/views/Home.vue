<template>

<div style="height: 100%;width: 100%;">
    <div class='main'>
        <router-view></router-view>
    </div>
    <div class='footer demo-avatar'>
        <router-link to='/map' class="item">
         <div class='el-icon-location'>
              <div class='bottomfont'>地图</div>
         </div>     
        </router-link>
        <router-link to='/number' class="item">
         <div class='el-icon-document-copy'>
             <div class='bottomfont special'>记录</div></div>
        </router-link>
        <router-link to='/about' class="item demo-avatar">
         <div class='el-icon-chat-dot-round'><div class='bottomfont'>消息</div></div>  
        </router-link>
    </div>
</div>

</template>
<script>
     
    export default {
        name:'manager',
        data(){
          return{}
        },
        methods:{
            changeColor(){
            }
        },
        mounted(){
                  // this.$router.push('about')

        }
    }
</script>

<style scoped>
  .main{
      height: 1100px;
      width: 750px;
  }
  .footer{
        display: flex;
        background-color:#67C23A;
        height: 10%;       
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:center;
        position: fixed;
        z-index: 999999;
        bottom: 0;
        width:100%;
  }
  .item{
      width: 33.3333%;
      text-align:center;
      display:flex;
      justify-content:center;
      align-items:center;     
  }
  
  .bottom{
      font-size: 25px;
  }
  .bottomfont{
      font-size: 10px;
      text-align:center;
  }
  .special{
      margin-left: -25%
  }
  .changecolor{
      color:#19be6b;
  }
    </style>
