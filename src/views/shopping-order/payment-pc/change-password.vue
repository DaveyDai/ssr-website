<template>
  <div class='change-content' v-loading='isLoading'>
    <h2>Forget Your Password? </h2>
    <div class="form-part">
      <el-form v-if="active == 0" :model="ruleForm1" :rules="rules1" ref="ruleForm1" class="demo-ruleForm">
        <el-form-item label="Enter Your Email" prop="email">
          <el-input v-model="ruleForm1.email"></el-input>
        </el-form-item>
        <div class='btnNextWrap'>
          <el-button class='btnNext bg-gradient' type="primary" @click="submitForm1('ruleForm1')">Next</el-button>
        </div>
      </el-form>
      <el-form v-if="active == 1" :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm" autocomplete="off">
        <el-form-item label="New Password" prop="newPassword">
          <el-input v-if='isPassword' type='password' autocomplete="off" v-model="ruleForm2.newPassword" placeholder="Please enter a new password" >
            <!-- Please enter a new password -->
            <span slot="append" class='iconfont icon-yincang' @click='isPassword = false' ></span>
          </el-input>
          <el-input v-else v-model="ruleForm2.newPassword" placeholder="Please enter a new password" >
            <span slot="append" class='iconfont icon-xianshi' @click='isPassword = true' ></span>
          </el-input>
        </el-form-item>
        <el-form-item label="Vertification Code" prop="verificationCode" autocomplete="off">
          <div class='vertifyCode'>
            <el-input autocomplete="off" v-model="ruleForm2.verificationCode" placeholder="please enter verification code">
              
            </el-input>
            <div class="btnWrap bg-gradient" v-if='!isLeaveNoTime'>
              <el-button  class="btn-border w170">{{leaveTimeText}}</el-button>
            </div>
            <el-button style='border: none;' v-if='isLeaveNoTime' class='btnWrap bg-gradient' type="primary" @click="resendCode()">ReSend</el-button>
          </div>
          <p class='notice'>*Enter verification code from your email</p>
        </el-form-item>
        <div class='btnNextWrap'>
          <el-button class='btnNext bg-gradient' type="primary" @click="submitForm2('ruleForm2')">Next</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        leaveTime: 300,
        leaveTimeNum: 300,
        leaveTimeText: '',
        isLeaveNoTime: false,
        isLoading: false,
        isPassword: true,
        ruleForm1: {
          email: ''
        },
        rules1: {
          email: [
            { required: true, message: 'Please enter email address', trigger: 'blur' },
            { type: 'email', message: 'Please enter email address', trigger: 'blur' }
          ]
        },
        ruleForm2: {
          newPassword: '',
          verificationCode: ''
        },
        rules2: {
          newPassword: [
            { required: true, message: 'Please enter the new password', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: 'Validate code must be entered.', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      async resendCode() {
        await this.getVertifyCode();
      },
      submitForm1(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            await this.getVertifyCode();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm2(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            await this.modifyPassword()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      modifyPassword() {
        this.isLoading = true;
        let obj = { 
          api: 'modifyPassword', 
          data: {
            email: this.ruleForm1.email, 
            passWord: this.ruleForm2.newPassword, 
            code: this.ruleForm2.verificationCode
            }
          };
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.ruleForm1.email = ''
          this.active = 0;
          this.$message({
            type: 'success',
            message: 'You\'ve changed your password.'
          })
          this.$emit('change-success')
        }).catch(error => {
          this.$message.error(error);
          this.isLoading = false;
        });
      },
      getVertifyCode (){
        this.isLoading = true;
        let existUser = false
        this.isLogin(this.ruleForm1.email).then((data) => {
          if (data === 'msg.user.info.exist') {
            existUser = true
          }
          let obj = { api: 'verify', data: { 
            email: this.ruleForm1.email, 
            existUser: existUser 
          }};
          this.$store.dispatch('fetchAllList', obj).then(json => {
            this.isLoading = false;
            this.active = 1;
            this.$message({
              message: 'We have sent the validation code to your email.',
              type: 'success'
            });
            this.leaveTimeHander();
            setTimeout( ()=> {
              this.ValidateCode = '';
              this.ruleForm2.newPassword = '';
              this.ruleForm2.verificationCode = '';
              this.newPassword = '';
            }, 500);
          }).catch(error => {
            this.isLoading = false;
          });
        })
      },
      async isLogin(email) {
        return this.$store.dispatch('fetchGetAll', {
          api: 'isExist',
          data: {
            email: email
          }
        })
      },
      setLeaveTime () {
        if (this.leaveTime === 0) {
          clearInterval(this.leaveTimeId);
          this.isLeaveNoTime = true;
        } else {
          this.leaveTime--;
          this.leaveTimeText = this.leaveTime + 'S';
        }
      },
      leaveTimeHander () {
        this.leaveTime = this.leaveTimeNum;
        this.leaveTimeText = this.leaveTime + 'S';
        this.leaveTimeId = setInterval(this.setLeaveTime, 1000);
      },
      resendValidateCode () {
        if (this.isLeaveNoTime === false) {
          return;
        }

        this.leaveTimeHander();
        this.isLoading = true;

        let obj = { api: 'restPassword', data: {email: this.emailAddressVal}};
        this.$store.dispatch('fetchAllList', obj).then(json => {
          this.isLoading = false;
          this.$message({
            message: '发送成功',
            type: 'success'
          });
        }).catch(error => {
          this.$message.error(error);
          this.isLoading = false;
        });
      },
    }
  }
</script>
<style lang='less' scoped>
.change-content{
  font-family: SFCompactDisplay-Regular;
  font-size: 16px;
  color: #666666;
  padding: 26px 32px;
  h2{
    font-family: SFCompactDisplay-Thin, Arial, Helvetica, sans-serif;
    font-size: 40px;
    color: #666666;
    font-weight: normal;
    text-align: center;
    margin-bottom: 50px;
  }
  .vertifyCode{
    display:flex;
    flex-direction: row;
    width: 100%;
    .notice{
      font-family: SFCompactDisplay-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 14px;
      margin-top: 4px;
    }
    .btnWrap{
      border-radius: 20px;
      width: 180px;
      height: 40px;
      padding: 1px;
      margin-left: 16px;
      box-sizing: border-box;
      .btn-border {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border: 0;
        background-color: white;
        position: relative;
        font-family: SFCompactDisplay-Regular;
        font-size: 18px;
        color: #13BED3;
        text-align: center;
        display: block;
        padding: 0px;
        line-height: 38px;
        &:hover{
          background-color: white;
        }
      }
    }
  }
  
  .btnNextWrap{
    text-align: center;
    margin-top: 30px;
    .btnNext {
      font-family: 'SFCompactDisplay-Regular';
      font-size: 20px;
      width: 180px;
      height: 44px;
      border-radius: 22px;
      font-family: SFCompactDisplay-Regular;
      color: #FFFFFF;
      text-align: center;
      border: 0;
    }
    p{
      font-family: SFCompactDisplay-Regular;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
<style lang='less'>
.change-content{
  .el-form-item{
    margin-bottom: 16px;
  }
  .el-form-item__label{
    font-family: SFCompactDisplay-Regular;
    font-size: 16px;
    color: #666666;
    line-height: 19px;
    margin-bottom: 8px;
  }
}
.demo-ruleForm{
  .el-input-group{
    position: relative;
    .el-input-group__append{
      position: absolute;
      right: 32px;
      top: 9px;
      padding: 0;
      border: 0;
      cursor: pointer;
      .iconfont{
        font-size: 22px;
      }
    }
  }
}
</style>