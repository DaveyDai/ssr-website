<template>
  <div class="box-adderss" >
    <div class="title">
      <i @click='goBack' class="el-icon-arrow-left expand"></i>
      <span v-if="isEdit"> Edit Address</span>
      <span v-else>Add Address</span>
    </div>
    <div class="formRegion">
      <el-form :model="ruleForm" label-position="top" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="firstName">
          <el-input placeholder="First Name" v-model="ruleForm.firstName"></el-input>
        </el-form-item>

        <el-form-item prop="lastName">
          <el-input placeholder="Last Name" v-model="ruleForm.lastName"></el-input>
        </el-form-item>

        <el-form-item prop="countryId">
          <div class="selectWrap">
            <select v-model="ruleForm.countryId" placeholder="Country">
              <option v-for="item in countryList"
                :key="item.id"
                :selected="item.id === ruleForm.countryId"
                :value="item.id">
                {{item.countryName}}
              </option>
            </select>
            <i class="el-icon-arrow-down"></i>
          </div>
        </el-form-item>

        <el-form-item prop="email">
          <el-input placeholder="Notification Email" v-model="ruleForm.email" :disabled="emailLock"></el-input>
        </el-form-item>

        <el-form-item prop="regionId">
          <div class="selectWrap">
            <select v-model="ruleForm.regionId">
              <option value="">State/Province/Region</option>
              <option v-for="item in regionList"
                :key="item.id"
                :selected="item.id === ruleForm.regionId"
                :value="item.id">
                {{item.regionName}}
              </option>
            </select>
            <i class="el-icon-arrow-down"></i>
          </div>
        </el-form-item>

        <el-form-item prop="city">
          <el-input placeholder="City/Town" v-model="ruleForm.city"></el-input>
        </el-form-item>

        <el-form-item prop="address1">
          <el-input placeholder="Address line 1" v-model="ruleForm.address1" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="Address line 2" v-model="ruleForm.address2"></el-input>
        </el-form-item>

        <el-form-item prop="postcode">
          <el-input placeholder="Zip/Post Code" v-model="ruleForm.postcode"></el-input>
        </el-form-item>

        <el-form-item prop="telephone" style="margin-bottom: 0;">
          <el-input placeholder="Phone Number" v-model="ruleForm.telephone" ></el-input>
        </el-form-item>

        <el-form-item prop="active" v-if="isLogin">
          <el-checkbox v-model="ruleForm.active">Use as default address</el-checkbox>
        </el-form-item>

        <el-form-item>
          <div class="btn-add">
            <!-- <div class="btnWrap bg-gradient">
              <el-button class="btn-cancel" @click="cancel">Cancel</el-button>
            </div> -->
            <el-button class="bg-gradient btn-save" @click="saveAddress">Save
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'userList'
      ]),
      isLogin () {
        if (this.userList && this.userList.accountId !== undefined) {
          return true;
        }
        return false
      },
      isEdit() {
        return this.updateRess && this.updateRess.id && this.updateRess.id > -1
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
      };
      return {
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
      updateRess: {
        type: [String, Object],
        default: {
          firstName: '',
          lastName: '',
          countryId: '',
          id: ''
        }
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
    async mounted () {
      // await this.$store.dispatch('fetchIsLogin');
      // // 没有登录时候赋值给email
      // this.getCountry();
      // this.setRultForm();
    },
    // 方法
    methods: {
      setRultForm () {
        let currentEmail = this.isLogin ? this.userList.email : this.$route.query.email
        if (JSON.stringify(this.updateRess) === '{}' || this.updateRess === '') {
          this.ruleForm = {
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
            email: currentEmail,
            fax: '',
            country: '',
            region: '',
          }
        } else {
          const json = JSON.parse(JSON.stringify(this.updateRess))
          json.active = json.active ? true : false
          json.email = currentEmail
          this.ruleForm = json;
        }
        if (!this.isLogin) {
          this.emailLock = true
        }
      },
      getCountry () {
        let obj = {
          api: 'getAddressCountry',
          data: {}
        };
        this.$store.dispatch('FETCH_GET_ALL', obj).then(json => {
          this.countryList = json.payload.data
        });
        // 获取地区
        let regionObj = {
          api: 'getRegionbyCid',
          data: {
            countryId: 1
          }
        };
        this.$store.dispatch('FETCH_GET_ALL', regionObj).then(json => {
          // this.sitekey = json.siteKey;
          this.regionList = json.payload.data
        });
      },
      /**
       * [saveAddress 保存地址]
       * @author luke 2018-12-12
       */
      saveAddress () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.verify();
            // 跳转支付页面
            // 没有登录直接折叠
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * [verify 效验地址]
       * @author luke 2018-12-19
       * @return {[type]} [description]
       */
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
          this.$vueOnToast.pop('info', json.message)
          return false;
        }

        const jsonD = JSON.parse(JSON.stringify(this.ruleForm))
        jsonD.active = jsonD.active ? 1 : 0
        this.$emit('newAddress', jsonD);
        // 清空值
        this.updateRess = {};
        this.setRultForm();
      },
      cancel () {
        this.$emit('cancelAddress', true);
      },// 您的城市和州不匹配
      goBack() {
        this.$router.go(-1)
      }
    },
    components: {
    }
  }
</script>
<style lang='less' scoped>
  .box-adderss {
    background: #FFFFFF;
    padding-top: 44px;
    .title{
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      position: relative;
      text-align: center;
      margin-bottom: 10px;
      font-family: SFCompactDisplay-Regular;
      font-size: 16px;
      color: #333333;
      text-align: center;
      i{
        position: absolute;
        left: 15px;
        top: 13px;
        font-size: 18px;
      }
    }
    .formRegion{
      padding: 0 15px;
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
          border: 0;
          color: #13BED3;
          background-color: #fff;
        }
      }
      .btn-save {
        width: 180px;
        border-radius: 24px;
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
      }
    }
  }
  
</style>
<style lang="less">
.box-adderss{
  .el-form-item{
    width: 100%;
    margin-bottom: 16px;
    display: inline-block;
    &:nth-child(2n){
      margin-right: 0px;
    }
  }
  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
}
  
</style>
