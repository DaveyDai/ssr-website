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
              <div v-if="allowEdit" class="del">
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
                <el-input-number v-if="allowEdit" class='elNum24' size="mini" :min="1" :max="99" v-model="item.productQty">
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
    // 定义变量
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Must be entered.'));
        }
        var patt1 = new RegExp(/[^a-zA-Z]+$/);
        if (!patt1.test(value)) {
          return callback(new Error('Phone format is incorrect'));
        } else {
         callback();
        }
      }
      return {
        cartList: { productList: [] }
      }
    },
    // 引入组件
    props: {
      showNum: {
        type: Number
      },
      allowEdit: {
        type: Boolean,
        default: false
      }
    },
    beforeMount () {
      console.log(this.$utils)
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
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