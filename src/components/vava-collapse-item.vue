<template>
	<div class="vava-collapse-item">
	  <div class="vava-collapse-item-title" @click="titleClickCallback">
      <slot name="leftIcon"></slot><slot name="titleContent"></slot>
      <span class="collapse-title-right" :class="{'title-right-show': itemIsShow}"><slot name="rightIcon"></slot></span>
    </div>
	  <transition
      v-on:before-enter="itemHidden"
      v-on:enter="itemShow"
      v-on:after-enter="itemShow"
      v-on:before-leave="itemShow"
      v-on:leave="itemHidden"
      v-on:after-leave="itemHidden"
    ><ul v-show="itemIsShow" class="vava-collapse-item-content"><slot></slot></ul></transition>
	</div>
</template>

<script>
  export default {
    name: 'VavaCollapseItem',
    componentName: 'VavaCollapseItem',
  	props: {
  		title: String,
  		titleClick: Function
  	},
    data () {
      return {
        itemIsShow: false
      }
    },
    mounted () {
    },
    methods: {
      titleClickCallback () {
        typeof this.titleClick === 'function' ? this.titleClick() : this.itemIsShow = !this.itemIsShow
      },
      itemHidden (el) {
        el.className = el.className + ' collapse-transition'
        el.style.height = '0'
      },
      itemShow (el) {
        el.style.height = el.scrollHeight + 'px'
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-collapse-item{
    width: 100%;
    border-top: 1px solid #FFF;
    .vava-collapse-item-title{
		width: 100%;
    	height: 60px;
    	color: #FFF;
    	font-size: 15px;
    	display: flex;
    	align-items: center;
    	position: relative;
      cursor: pointer;
      .collapse-title-right{
        position: absolute;
        right: 20px;
        font-size: 12px;
        transition: .35s all ease-out;
        .icon{color: #FFF;}
      }
      .title-right-show{
        transform: rotateZ(90deg);
      }
    }
    .vava-collapse-item-content{
      overflow: hidden;
      padding: 0 20px;
      li{
        font-size: 15px;
        color: #e2e2e2;
        line-height: 35px;
        cursor: pointer;
      }
      li:last-child{
        margin-bottom: 20px;
      }
      // li:hover{
      //   color: #FFF;
      //   background-color: #140f25;
      //   opacity: .5;
      // }
    }
    .collapse-transition{
      transition: .3s height ease-out;
    }
  }
  @media (max-width: 800px) {
    .vava-collapse-item{
      .vava-collapse-item-title{
        height: 60px;
        font-size: 15px;
        .collapse-title-right{
          right: 20px;
          font-size: 12px;
        }
      }
      .vava-collapse-item-content{
        padding: 0 20px;
        li{
          font-size: 13px;
          line-height: 35px;
        }
        li:last-child{
          margin-bottom: 20px;
        }
      }
    }
  }
	// .item-fade-enter-active{
  //   animation: item-animation .5s;
  // }
  // .item-fade-leave-active{
	//   animation: item-animation .5s reverse;
	// }
  // @keyframes item-animation {
  //   0% {
  //     // height: 0;
  //     // transform: translateY(-100%);
  //   }
  //   100% {
  //     // height: '';
  //     // transform: translateY(0);
  //   }
  // }

</style>
