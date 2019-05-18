<template>
  <div class="product-detail-buynow">
    <div class="buynow-product-img">
      <vava-img-swiper :swiper-data="buyProDetail.productSkuImages"></vava-img-swiper>
      <!-- <img src="/static/product-pages/ACCESSORY/Hub-VA-DK003/Rectangle 1.png" alt=""> -->
    </div>
    <div class="buynow-content">
      <h5 :title="buynowData.productName">{{buynowData.shortName}}</h5>
      <!-- <h5><div>VAVA INTELLIGENT&nbsp;</div><div>ROBOTIC VACUUM</div></h5> -->
      <p class="product-detail-price" v-if="buyProDetail.sellPrice">{{dicTreeList[buyProDetail.districtCode]}} {{buyProDetail.sellPrice | decimalDou}}</p>
      <!-- <p class="product-Out-of-stock" v-if="!buynowData.state">Out of Stock</p> -->
      <p class="product-detail-describe" v-if="buynowData.description" v-html="buynowData.description"></p>
      <div class="product-high-light">
        <ul><li v-for="(item, index) of buynowData.highLights" :key="index" v-html="item"></li></ul>
      </div>
      <div class="product-detail-color">
        <p v-show="activeColor">Color: {{activeColor}}</p>
        <div class="color-option">
          <li
            v-for="(item, index) of buynowData.productSkuDetailBos" :key="index"
            :class="{'active': colorIndex === index}"
            @click="handlColor(index)">
            <span :style="{'background': item.colourName}"></span>
          </li>
        </div>
      </div>
      <div class="buy-now-button">
        <vava-button class="product-buy-now" v-if="buyProDetail.asin" @click="buyNow">ADD TO CART</vava-button>
        <vava-button class="product-buy-now" v-if="buyProDetail.asin" @click="buyNowAZ" noActive>BUY ON AMAZON</vava-button>
      </div>
    </div>
    <el-dialog :visible.sync="addCartDialogVisible" center top="18vh" class="add-cart-dialog">
      <!-- 弹窗头部名称 -->
      <div slot="title" class="dialog-title" v-if="!selectCheckOut">
        <p class="self-title">Your Cart</p>
        <p class="self-subtitle">{{shoppingCart.totalNum || ''}} item<span v-if="shoppingCart.totalNum > 1">s</span> </p>
      </div>
      <!-- check out 头部 -->
      <div slot="title" class="dialog-title" v-else>
        <p class="self-title" @click="selectCheckOut = false"><i class="icon icon-right-slide"></i> Back</p>
      </div>
      <div class="shopCartWrap" :style="{'left': selectCheckOut ? '-100%' : '0'}">
        <div class="add-to-cart">
          <div class="add-to-cart-left">
            <div class="cart-item" v-for="(item, index) in shoppingCart.productList" :key="index">
              <div><img :src="item.skuProductMainUrl"></div>
              <div class="left-info">
                <p class="left-info-item1 twoLine">{{item.shortName}}</p>
                <div class="color-quantity">
                  <p class="left-info-item3">Color: <span>{{item.colourCode}}</span></p>
                  <p class="left-info-item4"><i class="el-icon-close"></i> <span>{{item.totalQtyOrdered}}</span></p>
                </div>
                <p class="left-info-item2"><span>{{currentUnit}}</span><span>{{item.sellPrice}}</span></p>
              </div>
            </div>
          </div>
          <div class="add-to-cart-right">
            <!-- <div class="right-head">
              <p class="right-head-item2">
                <span class="left">{{shoppingCart.totalNum || ''}} items </span>
              </p>
            </div> -->
            <div class="right-content">
              <p class="right-content-item1">
                <span class="left">Subtotal: </span>
                <span class="right"><span>{{(currentUnit + shoppingCart.totalAmount) || ''}}</span></span>
              </p>
              <p class="right-content-item2">
                <span class="left">Shipping: </span>
                <span class="right">$0.00</span>
              </p>
              <p class="right-content-item3">
                <span class="left">Pre-Tax total: </span>
                <span class="right"><span>{{(currentUnit + shoppingCart.totalAmount) || ''}}</span></span>
              </p>
              <div class="btnWrap">
                <vava-button class="btn40" noActive @click="viewAndBuyHandler('showCart')">View Cart</vava-button>
                <vava-button class="btn40" @click="viewAndBuyHandler">Check Out</vava-button>
              </div>
            </div>
          </div>
        </div>
        <div class="guestOrUser">
          <vava-button class='btn40' noActive @click.native="continueGo('account')">Continue with Account</vava-button>
          <p><span>or</span></p>
          <vava-button class='btn40' noActive @click.native="continueGo('guest')">Continue as Guest</vava-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VavaImgSwiper from '@/components/vava-swiper.vue'
  import { invokeGetShoppingCart, invokeShoppingCartAdd, invokeShoppingCartAddById } from '@/api/invoke.js'
  export default {
    components: { VavaImgSwiper },
    computed: {
      buynowData () {
        return this.$store.state.productDetail.buynow
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      },
      activeColor () {
        let proColor = this.$store.state.productDetail.buynow.productSkuDetailBos
        // let color = proColor&&proColor.length&&proColor[this.colorIndex].colourCode.split('_')[2] || ''
        // return color.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        return proColor[this.colorIndex].colourCode
      },
      shoppingCart () { // 所有购物车列表
        return this.$store.state.shoppingCart
      }
    },
    data () {
      return {
        colorIndex: 0,
        buyProDetail: {},
        addCartDialogVisible: false, // 是否显示添加购物车弹框(移动端)
        selectCheckOut: false, // 是否显示登陆或者游客购物(未登陆下移动端)
        currentUnit: '$', // 币别
        totalQtyOrdered: 1// 单个商品总数
      }
    },
    created () {
      this.buyProDetail = this.buynowData.productSkuDetailBos[this.colorIndex] // 获取颜色对应的sku详情
    },
    methods: {
      handlColor (index) { // 选择颜色
        this.colorIndex = index
        this.buyProDetail = this.buynowData.productSkuDetailBos[index] //  获取颜色对应的sku详情
      },
      buyNowAZ () { // 去亚马逊购买
        let url = 'https://www.amazon.com/gp/product/' +
        this.buyProDetail.asin + '?keywords=' + this.buynowData.amazonKeyword
        window.open(url)
      },
      buyNow () { // 添加购物车
        // this.addCartDialogVisible = true

        // 计算购物车单个商品的总数
        this.perProductNum(this.buyProDetail.id)
        // 已登陆情况下 直接添加购物车 否则 先申请购物车ID
        this.shoppingCartAdd()
      },
      // 添加购物车 (编辑购物车接口最好改一下 post请求不要用URL拼接参数)
      shoppingCartAdd () { 
        let editParam = {
          productSkuId: this.buyProDetail.id,
          totalQtyOrdered: this.totalQtyOrdered,
          source: this.$cookies.get('token') ? 1 : 3
        }
        this.$cookies.get('token') ? invokeShoppingCartAdd(this, editParam, () => {
          this.$utils.message('The goods have been added to the shopping cart. Please go to the shopping cart')
          invokeGetShoppingCart(this) // 获取购物车列表
        }) : invokeShoppingCartAddById (this, editParam, () => {
          invokeGetShoppingCart(this) // 获取购物车列表
        })
      },
      perProductNum (productSkuId) {
        if (this.$store.state.shoppingCart.productList && this.$store.state.shoppingCart.productList.length > 0) {
          for (let item of this.$store.state.shoppingCart.productList) {
            if ( item.productSkuId === productSkuId ) {
              this.totalQtyOrdered = item.totalQtyOrdered + 1
              return
            }
          }
        }
        this.totalQtyOrdered = 1
      },
      viewAndBuyHandler (type) { // 移动端显示购物车 或者 去结算
        if (type === 'showCart') { // 显示购物车
          this.$router.push('/shopping-cart')
        } else {
          // 已登陆直接到下单页面 未登陆让用户选择登陆或者游客购买
          this.$cookies.get('token') ? this.$router.push('/pay-m') : this.selectCheckOut = true
        }
      },
      continueGo (type) { // 移动端未登陆点击check out跳转到对应页面
        this.$router.push({path: '/shopping-customer-m', query: {type: type}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail-buynow{
    width: 100%;
    display: flex;
    padding: 6.25vw 12.5vw 10.4vw 12.5vw;
    background-color: #FFFFFF;
    .buynow-product-img{
      margin-right: 5.2vw;
      width: 37.5vw;
      min-width: 280px;
      flex-shrink: 0;
    }
    .buynow-content{
      line-height: 1.4;
      h5{
        // max-height: 11.25vw;
        line-height: 3.75vw;
        font-size: 3.125vw;
        margin-bottom: 1vw;
        font-weight: bold;
        color: #4B4B4B;
        font-family: 'avenir-next-demi';
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
        // text-overflow: ellipsis;
      }
      .product-detail-price{
        font-size: 2.08vw;
        color: @base-font-color;
        padding: 1vw 0;
      }
      .product-Out-of-stock{
        font-size: 1.56vw;
        color: @base-button-back;
        font-weight: bold;
        padding-bottom: 1vw;
      }
      .product-detail-describe{
        font-size: 1.56vw;
        color: @base-font-color;
        margin-bottom: 1vw;
        max-height: 30vw;
        overflow-y: auto;
        .scroll-style();
      }
      .product-high-light{
        max-height: 30vw;
        padding-left: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        .scroll-style();
        ul{
          list-style: disc;
          li{
            position: relative;
            list-style: disc;
            // list-style: inside;
            font-size: 1.04vw;
            color: @base-font-color;
            margin-bottom: 0.9vw;
            // font-family: 'avenir-next-demi';
            -webkit-overflow-scrolling: touch;
          }
        }
      }
      .product-detail-color{
        font-size: 1.56vw;
        color: @base-font-color;
        margin: 2vw 0;
        p{
          margin: 0.5vw 0;
        }
        .color-option{
          display: flex;
          flex-wrap: nowrap;
          li{
            width: 3.38vw;
            height: 3.38vw;
            min-width: 30px;
            min-height: 30px;
            border: 0.208vw solid #FFF;
            margin-right: 1vw;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: #f0f0f0;
            span{
              display: inline-block;
              width: 2.6vw;
              height: 2.6vw;
              min-width: 22px;
              min-height: 22px;
              box-shadow: rgba(0, 0, 0, 0.2) 0 0 1vw;
              border-radius: 50%;
            }
            transition: all 0.3s;
          }
          li.active{
            border-color: #C3C3C3;
            span{box-shadow: rgba(0, 0, 0, 0) 0 0 2vw;}
          }
        }
      }
      .buy-now-button{
        display: flex;
        flex-direction: column;
        .product-buy-now{
          margin-bottom: 2vw;
        }
      }
    }
		.add-cart-dialog .el-dialog--center{
      min-width: 300px;
      width: 90%;
      max-width: 600px;
	  	.el-dialog__body {
				overflow: hidden;
        margin: 0 16px 16px;
				padding: 0;
				.shopCartWrap{
					position: relative;
          display: flex;
          width: 200%;
          transition: all .3s ease-in-out;
          align-items: center;
					.add-to-cart {
						position: relative;
						width: 50%;
						.add-to-cart-left {
							max-height: 246px;
							overflow: auto;
							.cart-item {
								display: flex;
								// flex-wrap: wrap;
								padding: 7px 0;
								img {
									width: 80px;
									height: 80px;
								}
								.left-info {
									display: inline-block;
									vertical-align: top;
									margin-left: 12px;
									width: 100%;
									padding-top: 8px;
									.left-info-item1 {
										font-family: SFCompactDisplay-Medium;
										font-size: 12px;
										color: #333333;
										line-height: 14px;
									}
									.left-info-item2 {
									font-family: PingFangSC-Regular;
									font-size: 14px;
									color: #333333;
									margin-top: 8px;
									}
									.color-quantity{
										display: flex;
										flex-direction: row;
										justify-content: space-between;
										align-items: center;
										font-family: SFCompactDisplay-Regular;
										font-size: 12px;
										.left-info-item3 {
											color: #999999;
										}
										.left-info-item4 {
											color: #333333;
											.el-icon-close{
												color: #666666;
											}
										}
									}

								}
							}
							.cart-item  + .cart-item {
								border-top: 1px solid #EEEEEE;
							}
						}
						.add-to-cart-right {
							border-top: 1px solid #EEEEEE;
							.right-head {
								overflow: hidden;
								padding-bottom: 10px;
								border-bottom: 1px solid #F5F5F5;
								margin-bottom: 14px;
								.right-head-item1 {
									font-family: MyriadPro-Semibold;
									color: #333333;
									font-size: 16px;
									padding-bottom: 8px;
								}
								.left {
									float: left;
								}
								.right {
									float: right;
								}
							}
							.right-content {
								padding: 7px 0 17px;
								.right-content-item1, .right-content-item2, .right-content-item3{
									display: flex;
									flex-direction: row;
									justify-content: space-between;
									align-items: center;
									font-size: 14px;
									line-height: 16px;
									color: #666;
									.left{
										width: 90px;
										text-align: right;
									}
									.right{
										color: #666;
									}
								}
								p + p{
									margin-top: 4px;
								}
								.right-content-item3 {
									font-family: 'avenir-next-demi';
                  color: #333333;
									.right{
										color: #333333;
									}
								}
								.btnWrap{
									padding-top: 40px;
									display:flex;
									justify-content: space-between;
                  .btn40{
                    width: 45%;
                    min-width: 125px;
                    min-height: 35px;
                    padding: 0 15px;
                  }
								}
							}
						}
					}
					.guestOrUser{
            padding-top: 10px;
            padding-bottom: 16px;
            width: 50%;
            text-align: center;
            p{
              border-top: 1px solid #EEEEEE;
              position: relative;
              margin: 18px 0;
              span{
                display: block;
                width: 32px;
                font-family: SFCompactDisplay-Regular;
                font-size: 14px;
                color: #999999;
                background-color: white;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                padding-left: 10px;
              }
            }
            .btn40{
              width: 90%;
            }
          }
				}

	  	}
	  }
  }
  @media (max-width: 1200px) {
    .product-detail-buynow .buynow-content .product-high-light ul li{font-size: 13px;}
  }
  @media (max-width: 920px) {
    .product-detail-buynow{
      padding: 6.25vw 5vw 10.4vw 5vw;
      .buynow-product-img{
        margin-right: 4.5vw;
      }
      .buynow-content{
        .product-detail-price{
          font-size: 19px
        }
        .product-Out-of-stock, .product-detail-describe{
          font-size: 14.3px;
        }
        .product-high-light{
          max-height: 275px;
          ul li{
            font-size: 13px;
          }
        }
        .product-detail-color p{
          font-size: 14.3px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    .product-detail-buynow{
      flex-direction: column;
      padding: 0 5vw;
      .buynow-product-img{
        margin-right: 0;
        margin-bottom: 25px;
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .buynow-content{
        h5{
          max-height: none;
          line-height: 1.3;
          font-size: 17px;display: flex;
        }
        .product-high-light{
          max-height: fit-content;
          ul li{font-size: 12px;}
        }
        .product-detail-color{
          padding: 20px 0;
        }
        .buy-now-button{
          margin-bottom: 30px;
          .product-buy-now{
            padding: 0 18px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
