<template>
  <div class="after-sales">
    <img class="after-sales-banner" src="/static/website-imgages/support/After Sales Banner.jpg">
    <div class="after-sales-content">
      <vava-collapse-item>
        <span slot="titleContent" class="after-sales-content-title">RMA INSTRUCTIONS</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <div class="after-sales-li">
          <h5>Authorized Returns:</h5>
          <p>Most returns must be authorized by contacting the seller in order to obtain an official Return Merchandise Authorization (RMA). Authorization does not guarantee credit or exchange. We will issue an exchange or credit upon receipt of the return package. All returned products must be in resalable condition, including, but not limited to; all components, manuals, registration cards, and original undamaged packaging. In addition, the following restrictions normally apply:Credit cannot be issued for any AC Adapter or Battery that is missing any components or was modified by the user. Some returned parts may incur a restocking fee. Only ship back the VAVA parts that you purchased from our authorized resellers. We cannot guarantee that any other materials will be returned to you if/when we ship you an exchange.</p>
          <h5>Unauthorized Returns: </h5>
          <p>An unauthorized return is defined as any package returned to VAVA without the proper return authorization code on the shipping label. Unauthorized returns may include packages refused during a delivery attempt. Unauthorized returns received by VAVA may be refused at the warehouse and returned to the sender. In this case, you may be held responsible for the cost of shipping back thepackage. This cost will be deducted from the total credit due or a charge to the credit card or PayPal account, if a refund has already been issued.</p>
          <h5>Process for Returning Merchandise</h5>
          <p><span>1. Obtain a Return Merchandise Authorization (RMA) Number:</span> All returns must have an RMA number for processing. Contact your reseller or email VAVA for assistance. RMA’s are validfor thirty (30) days from the date of issue. <span>2. Write the RMA number on the shipping label on the outside of the package.</span> RMA numbers should be clearly displayed on the return shipping label of any package being returned to VAVA. Do not write the RMA number on the actual box. Packages without an RMA number on the return shipping label may not be accepted by our warehouse. <span>3. Repack in original packaging</span> All contents in the original package must be received, including, but not limited to; all components, manuals, and registration cards. Place the packaged product in a protective outer box. We must receive all original products in order to process your return or exchange. VAVA is not responsible for products that are damaged due to poor packaging, defaced packaging, or lost shipments.</p>
        </div>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="after-sales-content-title">VAVA WARRANTY COVERAGE</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <div class="after-sales-li">
          <p>During the product’s warranty period, if the original manufacture of the material or workmanship of the product is deemed to be defective, VAVA will (at its sole option) replace the product at no charge with the same or comparable product. Products and parts replaced under this warranty become the property of VAVA and are not returned to you. If products and/or parts service are required after the warranty period expires, you must pay all labor and parts charges. Warranty coverage terminates if you sell or otherwise transfer the product. What does the VAVA Warranty not cover?</p>
          <h5>This warranty does not cover:</h5>
          <p>Improper Use or Installation</p>
          <p>Cosmetic damage</p>
          <p>Damage due to acts of nature or God. For example; lightning strikes, tornadoes and the like</p>
          <p>Accidents</p>
          <p>Misuse</p>
          <p>Abuse</p>
          <p>Negligence</p>
          <p>Commercial use</p>
          <p>Modifications to any part of the Product, including the antenna</p>
          <h5>This warranty also does not cover:</h5>
          <p>Connection to an incorrect voltage supply</p>
          <p>Attempted repair by anyone other than an authorized facility</p>
          <p> VAVA shall not be liable for any incidental or consequential damages for the breach of any express or implied warranty on this product, including, but not limited to; lost data, loss of use of your product, lost business or lost profits. VAVA makes no other express warranties with respect to the product, all express and implied warranties for the product, including, but not limited to; any implied warranties of and conditions of merchantability and fitness for a particular purpose, are limited in duration to the warranty period set forth above and no warranties, whether express or implied, will apply after the warranty period. Some states, provinces and jurisdictions do not allow limitations on how long an implied warranty lasts, so the above limitation may not apply to you. This warranty gives you specific legal rights, and you may also have other rights, which vary from state to state or province to province.</p>
        </div>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="after-sales-content-title">CONTACT VAVA</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <div class="after-sales-li">
          <p>For customer service please contact: support@VAVA.com</p>
          <p>VAVA is a registered trademark in some countries. All other products and brand names are trademarks of their respective owners</p>
        </div>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="after-sales-content-title">SUPPORT</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <div class="after-sales-li">
          <p>At VAVA.com, we strive to provide the best customer service and support for our customers! We make regular improvements to our site in hopes of providing you with the best and most efficient online shopping experience possible. If you have any inquiries, questions, or concerns about our products or services, please feel free to contact us. Moreover, we always appreciate suggestions for update and improvement from you as this is a gauge to measure our success.</p>
        </div>
      </vava-collapse-item>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .after-sales{
    width: 100%;
    .after-sales-banner{
      width: 100%;
      min-height: 30vw;
    }
    .after-sales-content{
      width: 100%;
      padding: 10.4vw 15.6vw;
      .vava-collapse-item{
        border-top: 0.052vw solid #DDDDDD;
        .vava-collapse-item-title{
          height: 6.77vw;
          min-height: 50px;
          justify-content: center;
          .after-sales-content-title{
            color: @base-font-color;
            font-size: 1.927vw;
            text-align: center;
            line-height: 1.5;
          }
          .collapse-title-right{
            right: 0;
            .icon-right-slide{
              font-size: 1.6vw;
              color: @base-font-color;
            }
          }
        }
        .vava-collapse-item-content{
          padding: 0 10px;
          .after-sales-li{
            padding-bottom: 2vw;
            font-size: 1.56vw;
            line-height: 1.5;
            h5{color: @base-icon-color;font-family: 'avenir-next-demi';margin-top: 1.5vw;}
            p{
              color: #B1B1B1;
              span{
                display: block;
                font-family: 'avenir-next-demi';
                color: @base-icon-color;
              }
            }
          }
        }

      }
      .vava-collapse-item:last-child{border-bottom: 0.052vw solid #DDDDDD;}
    }
  }
  @media (max-width: 1450px) {
    .after-sales{
      .after-sales-content{
        padding: 10.4vw 10vw;
      }
    }
  }
  @media (max-width: 800px) {
    .after-sales{
      .after-sales-content{
        padding: 10.4vw 10vw;
        .vava-collapse-item{
          border-width: 1px;
          .vava-collapse-item-title{
            .after-sales-content-title{font-size: 15px;}
            .collapse-title-right .icon-right-slide{font-size: 13px;}
          }
          .vava-collapse-item-content .after-sales-li{font-size: 12.5px;}
        }
        .vava-collapse-item:last-child{border-width: 1px;}
      }
    }
  }
  @media (max-width: 600px) {
    .after-sales{
      .after-sales-content{
        padding: 10.4vw 20px;
        .vava-collapse-item{
          border-width: 1px;
          .vava-collapse-item-title .after-sales-content-title{font-size:12px;}
          .vava-collapse-item-content .after-sales-li{font-size: 12px;}
        }
      }
    }
  }
  @media (max-width: 500px) {
    .after-sales{
      .after-sales-content{
        padding: 10.4vw 15px;
        .vava-collapse-item{
          .vava-collapse-item-title .after-sales-content-title{font-size:11px;}
          .vava-collapse-item-content .after-sales-li{font-size: 10px;}
        }
      }
    }
  }
  @media (max-width: 375px) {
    .after-sales{
      .after-sales-content{
        padding: 10.4vw 8px;
        .vava-collapse-item .vava-collapse-item-title .after-sales-content-title{font-size: 9px;}
      }
    }
  }
</style>
