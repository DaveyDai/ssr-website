<template>
  <div class="shopping">
    <div class="slide-left">
      <!-- 列表 -->
      <div class="list">
        <div class="item" v-for="(item, key) in cartList.productList" :key="key">
          <a v-if="allowEdit" class="productImg"  :alt="item.productName">
            <img :src="item.skuProductMainUrl" :alt="item.productName" class="box-img" >
          </a>
          <a v-else class="productImg"  :alt="item.productName">
            <img :src="item.skuProductMainUrl" :alt="item.productName" class="box-img" >
          </a>
          <div class="box-info">
            <div class="namePart">
              <a v-if="allowEdit"  alt="item.productName">
                <span class="name twoLine">{{ item.productName }}</span>
              </a>
              <a v-else alt="item.productName">
                <span class="name twoLine">{{ item.productName }}</span>
              </a>
              <div v-if="allowEdit" class="del" @click="delItem(item)">
                <i class="el-icon-delete"></i>
              </div>
            </div>
            
            <div class='colorPart'>
              <span class="color">Color: {{ item.colourCode }}</span>
            </div>
            <div class="price-quantity">
              <p class="pricePart">
                <span>${{ item.sellPrice.toFixed(2) }}</span>
                <del v-if="item.listingPrice">${{ item.listingPrice.toFixed(2) }}</del>
              </p>
              <div class="quantity">
                <el-input-number v-if="allowEdit" class='elNum24' size="mini" :min="1" :max="99" v-model="item.productQty" @change="changeQty(item)">
                </el-input-number>
                <span v-else>X{{item.totalQtyOrdered}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-right">
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      isLogin () {
        if (this.userList && this.userList.accountId) {
          return true;
        }
        return false
      }
    },
    // watch: {
    //   cartList: {
    //     handler: function (val, oldVal) {
    //       this.$emit('cartListChange', val)
    //     },
    //     deep: true
    //   }
    // },
    // 定义变量
    data () {
      return {
        url: '',
        dialogTableVisible: false,
        showBtn: false,
        unfold: true, // 默认折叠
        showNumCopy: 0, // 保存原始显示的购物车条数
        colorList: [],
        cartList: {productList: []},
        countryList: [], // 国家下拉列表
        regionList: [], // region下拉列表
        ruleForm: {
          active: false,
          firstName: '',
          lastName: '',
          countryId: 1,
          regionId: '',
          city: '',
          address1: '',
          address2: '',
          postcode: '',
          telephone: '',
          email: '',
          fax: '',
          country: '',
          region: '',
        },
        rules: {
          firstName: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          lastName: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          regionId: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          countryId: [
            { required: true, message: 'You must enter your country .', trigger:'blur' }
          ],
          postcode: [
            { required: true, message: 'Must be entered.', trigger:'blur' }
          ],
          city: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: 'Must be entered.', trigger: 'blur'},
            { validator: checkPhone, trigger: 'blur' }
          ],
          address1: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Email address must be entered.', trigger: 'blur' },
            { type: 'email', message: 'Invalid email address.', trigger: ['blur', 'change'] }
          ]
        },
        isLoading: false,
        emailLock: false
      }
    },
    // 引入组件
    props: {
      showNum: {
        type: Number
      },
      allowEdit: {
        type: Boolean,
        default: true
      }
    },
    created() {
      // if (this.colorList.length < 1) {
      //   await this.getColors()
      // }
    },
    mounted () {
      // await this.$store.dispatch('fetchIsLogin');
      // this.showNumCopy = this.showNum || this.cartList.productList.length
      // this.showBtn = this.cartList.productList.length > this.showNumCopy
    },
    beforeMount () {
      console.log(this.$utils)
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
    },
    filters: {
      // pc 分类图片
      colorName: function (cid, arr) {
        // this.getColors
        if (arr && arr.length > 0) {
          let obj = arr.filter(function (el) {
            return el.colorId === cid
          });
          return obj[0].colorName;
        }
      }
    },
    // 方法
    methods: {
      /**
       * 获取颜色列表
       */
      async getColors() {
				const colorList = await this.$store.dispatch('fetchGetAll', {
					api: 'colors',
					data: {}
				})
				this.colorList = colorList
			},
      // 展开
      unfoldOperate() {
        this.unfold = false
        this.showNumCopy = this.cartList.productList.length
      },
      // 折叠
      foldOperate() {
        this.unfold = true
        this.showNumCopy = this.showNum
      },
      /**
       * [changeQty 更新数量]
       * @author luke 2018-12-07
       */
      changeQty (item) {
        // 是否登录
        if (this.isLogin) {
          this.updateLoginCart();
        } else {
          // 没有登录的情况
          this.unloginCart();
        }
        // 追加seo 代码
        this.$seoFn.removeShopCart(item, 1);
      },
      /**
       * [delItem 删除商品]
       * @author luke 2018-12-07
       */
      async delItem (item) {
        // this.$common.delArray(this.cartList.productList, item);
        this.$seoFn.removeShopCart(item, item.productQty);
        // 更新购物车
        if (this.isLogin) {
          item.productQty = 0;
          await this.updateLoginCart();
          this.$common.delArray(this.cartList.productList, item);
        } else {
          this.$common.delArray(this.cartList.productList, item);
          // 没有登录的情况
          this.unloginCart();
        }
      },
      /**
       * [unloginCart 没有登录购物车更新数据]
       * @author luke 2018-12-07
       */
      unloginCart () {
        let arrCart = this.cartList;
        // 总体价格
        let totalPrice = 0;
        // 清空商品数量
        arrCart.totalNum = 0;
        for (let i = 0; i < arrCart.productList.length; i++) {
          let ths = arrCart.productList[i];
          // 设置总价格
          if (ths.productQty > 1) {
            totalPrice += ths.price * ths.productQty;
          } else {
            totalPrice += ths.price;
          }
          // 设置数量
          arrCart.totalNum += Number(ths.productQty);
        }
        arrCart.totalAmount = totalPrice.toFixed(2);
        localStorage.setItem('shoppingCarts', JSON.stringify(arrCart));
      },
      /**
       * [updateLoginCart 更新购物车]
       * @author luke 2018-12-07
       */
      async updateLoginCart () {
        let pList = this.cartList.productList;
        let newArr = [];
        for (var i = 0; i < pList.length; i++) {
          let ths = pList[i];
          newArr.push({
            pid: ths.productId,
            num: ths.productQty,
            colorId: ths.colorId,
            sku: ths.sku,
            model: ths.model
          })
        }
       
        let obj = {
          countryId: 1,
          brand: this.brand,
          lang: this.lang,
          items: newArr
        };
        await this.$store.dispatch('UPDATE_CART_LIST', obj).then(async (json) => {
          console.log(json);
          await this.$emit('refreshCart', true);
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
      },
      refreshCart () {
        this.$emit('refreshCart', true);
      }
    }
  }
</script>
<style lang='less' scoped>
  .shopping {
    display: flex;
    flex-wrap: wrap;
    min-height: 140px;
    padding: 0;
    background-color: white;
    .slide-left{
      width: 100%;
      .list {
        .item{
          display: flex;
          padding: 18px 22px;
          border-bottom: 1px solid #EEEEEE;
          .box-img {
            width: 104px;
            height: 104px;
          }
          .box-info {
            flex-grow: 1;
            padding: 5px 0 0 15px;
            .namePart{
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-start;
              .name{
                width: 80%;
                font-family: SFCompactDisplay-Medium;
                font-size: 14px;
                color: #333333;
              }
              .del {
                margin: 12px 4px 0px 20px;
                color: #666666;
                cursor: pointer;
                i {
                  font-size: 12px;
                  color: #c3c3c3;
                }
              }
            }
            .colorPart{
              font-family: SFCompactDisplay-Regular;
              font-size: 12px;
              color: #999999;
              margin: 4px 0 20px;
            }
            .price-quantity{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              .pricePart{
                span{
                  font-family: SFCompactDisplay-Regular;
                  font-size: 14px;
                  color: #333333;
                  margin-right: 4px;
                }
                del{
                  font-family: SFCompactDisplay-Regular;
                  font-size: 10px;
                  color: #999999;
                  margin-left: 4px;
                }
              }
              .quantity {
                font-size: 12px;
                color: #333;
              }
            }
          }
          
          .total{
            height: 120px;
            line-height: 120px;
            margin: 0px 10px;
            font-size: 16px;
            color: #666666;
            width: 130px;
            text-align: center;
            display: inline-block;
          }
        }
        .operateShow{
          font-family: SFCompactDisplay-Regular;
          font-size: 14px;
          color: #13BED3;
          text-align: center;
          line-height: 40px;
          height: 40px;
          background-color: white;
        }
      }
    }
    .slide-right{
      background: #FFFFFF;
      .detail{
        padding: 20px;
        border-bottom: 1px solid #EEEEEE;
        .item{
          display: flex;
          line-height: 20px;
          label {
            width: 30%;
            text-align: left;
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #666666;
          }
          p{
            width: 70%;
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #333333;
            text-align: right;
          }
        }
      }
    }
  }
</style>