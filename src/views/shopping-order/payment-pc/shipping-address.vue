<template>
  <div class="box-adderss" >
   <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="ruleForm.firstName"></el-input>
        </el-form-item>

        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="ruleForm.lastName"></el-input>
        </el-form-item>

        <el-form-item label="Country" prop="countryId">
          <el-select v-model="ruleForm.countryId" placeholder="please choose" style="width: 100%;">
            <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.countryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Notification Email" prop="email">
          <el-input v-model="ruleForm.email" :disabled="emailLock"></el-input>
        </el-form-item>

        <el-form-item label="State/Province/Region" prop="regionId">
          <el-select v-model="ruleForm.regionId" filterable placeholder="please choose" style="width: 100%;">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.regionName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="City/Town" prop="city">
          <el-input v-model="ruleForm.city"></el-input>
        </el-form-item>

        <el-form-item label="Address line 1" prop="address1" style="width: 98.4%">
          <el-input v-model="ruleForm.address1" ></el-input>
        </el-form-item>

        <el-form-item label="Address line 2" style="width: 98.4%">
          <el-input v-model="ruleForm.address2"></el-input>
        </el-form-item>

        <el-form-item label="Zip/Post Code" prop="postcode">
          <el-input v-model="ruleForm.postcode"></el-input>
        </el-form-item>

        <el-form-item label="Phone Number" prop="telephone">
          <el-input v-model="ruleForm.telephone" ></el-input>
        </el-form-item>
   </el-form>
   <div style="width: 100%;" class="btn-add">
     <vava-button class="bg-gradient btn-save" @click="saveAddress">Save</vava-button>
   </div>
  </div>
</template>
<script>
  export default {
    computed: {
      countryList () {
        return this.$store.state.saleCountry
      },
      payEmail () { // 邮箱
        return this.$store.state.shoppingCart.payEmail
      }
    },
    // 定义变量
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Must be entered.'));
        }
        console.log(value)
        var patt1 = new RegExp(/[^a-zA-Z]+$/);
        if (!patt1.test(value)) {
          console.log(1111);
          return callback(new Error('Phone format is incorrect'));
        } else {
         callback();
        }
      };
      return {
        regionList: [], // region下拉列表
        ruleForm: {
          active: 0,
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
            { required: true, message: 'Must be entered.', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          address1: [
            { required: true, message: 'Must be entered.', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Email address must be entered.', trigger: 'blur' },
            { type: 'email', message: 'Invalid email address.', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    // 引入组件
    props: {
      updateRess: {
        type: [String, Object],
        default: {
          firstName: '',
          lastName: '',
          countryId: '',
          id: ''
        }
      },
      emailLock: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      updateRess: {
        handler (from, to) {
          this.setRultForm(from);
        },
        deep: true
      }
    },
    created () {
      if (this.countryList.length === 0) this.selectShopCountryVo()
      // this.getCountry();
      // this.setRultForm();
      // 没有登录时候赋值给email
      this.ruleForm.email = this.payEmail
    },
    // 方法
    methods: {
      setRultForm () {
        if (this.updateRess === '') {
          this.ruleForm = {
            firstName: '',
            lastName: '',
            countryId: 1,
            regionId: '',
            city: '',
            active: 0,
            address1: '',
            address2: '',
            postcode: '',
            telephone: '',
            email: '',
            fax: '',
            country: '',
            region: '',
          }
        } else {
          this.ruleForm = this.updateRess;
        }
        
      },
      selectShopCountryVo () { // 获取国家列表
        this.$store.dispatch('postFetch', {api: 'selectShopCountryVo'}).then(data => {
          this.$store.commit('setSaleCountry', data)
        }).catch(error => {
          let messageStr = error.code === 'ECONNABORTED' ? 'The system is busy. Please try to refresh it.' : error && error.message || 'The system is busy. Please try to refresh it.'
          this.$message.error(messageStr)
        })
      },
      // getCountry () {
      //   let obj = {
      //     api: 'getAddressCountry',
      //     data: {}
      //   };
      //   this.$store.dispatch('FETCH_GET_ALL', obj).then(json => {
      //     this.countryList = json.payload.data
      //   });
      //   // 获取地区
      //   let regionObj = {
      //     api: 'getRegionbyCid',
      //     data: {
      //       countryId: 1
      //     }
      //   };
      //   this.$store.dispatch('FETCH_GET_ALL', regionObj).then(json => {
      //     // this.sitekey = json.siteKey;
      //     this.regionList = json.payload.data
      //   });
      // },
      saveAddress () { // 编辑地址点击保存地址
        this.$emit('newAddress', this.ruleForm)
        // this.$refs['ruleForm'].validate((valid) => {
        //   if (valid) {
        //     this.verify();
        //   } else {
        //     return false;
        //   }
        // });
      },
      async verify () {
        let ths = this;
        let regObj = this.regionList.find(function(x) { 
          if (x.id === ths.ruleForm.regionId) {
            return x;
          }
        })
        let countryObj = this.countryList.find(function(x) { 
          if (x.id === ths.ruleForm.countryId) {
            return x;
          }
        })
        ths.ruleForm.region = regObj.regionCode;
        ths.ruleForm.country = countryObj.countryCode;
        // 先效验地区和州
        let obj = {
          api: 'checkPostCode',
          data: {
            regionCode: this.ruleForm.region,
            zipCode: this.ruleForm.postcode,
            cityName: this.ruleForm.city
          }
        };
        let json = await this.$store.dispatch('FETCH_GET_ALL', obj);
        if (json.code !== 200) {
          this.$message(json.message) // 州市地址邮编不匹配提示
          return false;
        }
        this.$emit('newAddress', this.ruleForm)
        // 清空值
        this.updateRess = '';
        this.setRultForm();
      },
      cancel () {
        this.$emit('cancelAddress', true);
      }
    }
  }
</script>
<style lang='less' >
  .box-adderss {
    background: #FFFFFF;
    padding: 20px;
    .el-form-item{
      width: 48%;
      margin-right: 15px;
      margin-bottom: 6px;
      display: inline-block;
      &:nth-child(2n){
        margin-right: 0px;
      }
    }
    .btn-add {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      .btnWrap {
        padding: 1px;
        width: 180px;
        height: 40px;
        box-sizing: border-box;
        display: inline-block;
        border-radius: 24px;
        font-family: SFCompactDisplay-Regular;
        text-align: center;
        line-height: 36px;
        vertical-align: top;
        .btn-cancel {
          width: 100%;
          height: 38px;
          font-size: 16px;
          border-radius: 24px;
          border: 1px solid @base-color;
          color: @base-color;
          background-color: #fff;
        }
      }
      .btn-save {
        width: 180px;
        margin-left: 20px;
        border-radius: 24px;
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #FFFFFF;
        height: 40px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
</style>
