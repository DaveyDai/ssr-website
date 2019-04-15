<template>
  <div class="vava-upload-file">
    <div class="file-show-item" v-for="(item, i) of fileList" :key="i">
      <div class="file-show-view" v-if="!!item">
        <div class="file-view-content">
          <img v-if="item.type === 0" :src="item.filePath" alt="">
          <div v-else class="view-type-name"><p>{{item.fileType.toUpperCase()}}</p><p class="type-name-p" :title="item.filesName">{{item.filesName}}</p></div>
        </div>
        <div class="icon icon-close" @click="deleteFile(i)"></div>
      </div>
      <div class="file-no-file" v-else>
        <div class="icon icon-close"></div><p>UPLOAD FILE</p>
        <input @change="handleChange($event, i)" class="va-upload-input" type="file" :accept="accept">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileList: [undefined, undefined, undefined, undefined, undefined],
        filesType: ['gif', 'jpeg', 'jpg', 'png', 'pdf', 'txt', 'zip'],
        accept: 'image/gif,image/jpeg,image/png,application/pdf,text/plain,application/zip'
      }
    },
    beforeMount () {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) this.accept = ''
    },
    methods: {
      handleChange (el, index) { // 选择文件
        if (el.target.files.length < 1) return
        let file = el.target.files[0]
        let fileTypeName = file.name.split('.')
        let fileType = fileTypeName[fileTypeName.length - 1].toLowerCase()
        if (this.filesType.indexOf(fileType) === -1) {
          this.$utils.message('We accept the following files</br>( GIF | JPEG | PNG | PDF | TXT | ZIP )')
          el.target.value = ''
          return
        }
        if (file.size / 1024 / 1024 > 10) {
          this.$utils.message('File size cannot be greater than 10MB')
          el.target.value = ''
          return
        }
        console.log('file size:', (file.size / 1024 / 1024) + 'MB')
        el.target.value = ''
        this.uploadFilePost(file.type.indexOf('image') === -1 ? 1 : 0, file, index, {fileType, filesName: file.name })
      },
      showUploadFile (data, index, type, fileData) { // 回显状态更改
        this.fileList[index] = Object.assign(data, { type }, fileData)
        this.fileList = Object.assign([], this.fileList)
      },
      deleteFile (index) { // 删除上传的文件
        this.fileList[index] = undefined
        this.fileList = Object.assign([], this.fileList)
      },
      uploadFilePost (type, file, index, fileData) { // 上传文件请求
        this.$bar.start()
        this.$store.dispatch('uploadFile', {type: 0, file: file}).then(data => {
          this.showUploadFile(data, index, type, fileData)
          this.$bar.finish()
        }).catch(error => {
          console.log(error)
          this.$bar.finish()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-upload-file{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .file-show-item{
      position: relative;
      width: 16.6vw;
      height: 16.6vw;
      min-width: 100px;
      min-height: 100px;
      border-radius: 1vw;
      background-image: url('data:image/png;base64,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');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 0.2vw;
      margin-bottom: 10px;
      padding: 2px;
      .file-no-file{
        width: 100%;
        height: 100%;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        .icon{
          font-size: 3.5vw;
          color: @base-button-back;
          margin-top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        p{
          font-size: 1.3vw;
          color: @base-button-back;
        }
        .va-upload-input{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 199;
          cursor: pointer;
          opacity: 0;
        }
      }
      .file-show-view{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;height: 100%;
        padding: 2px;
        .file-view-content{
          width: 100%;height: 100%;
          img{
            width: 100%;height: 100%;
            border-radius: 2vw;
          }
          .view-type-name{
            width: 100%;height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, .3);
            border-radius: 2vw;
            p{font-size: 3vw;color: @base-button-back;}
            p.type-name-p{
              white-space: nowrap;
              overflow: hidden;
              text-overflow:ellipsis;
              font-size: 1vw;
              max-width: 90%;
            }
          }
        }
        .icon{
          position: absolute;
          top: 1vw;
          right: 1vw;
          font-size: 1.2vw;
          color: @base-button-back;
          padding: 0.5vw;
          cursor: pointer;
          transition: all 0.3s;
          &:hover{font-size: 1.5vw;}
        }
      }
    }
  }
  @media (max-width: 920px) {
    .vava-upload-file{
      .file-show-item{
        border-radius: 10px;
        padding: 1px;
        .file-no-file{
          p{font-size: 12px;}
        }
        .file-show-view{
          padding: 2px;
          .file-view-content{
            img{
              border-radius: 10px;
            }
            .view-type-name{
              border-radius: 10px;
              p.type-name-p{font-size: 12px;}
            }
          }
          .icon{
            top: 10px;
            right: 10px;
            font-size: 13px;
            padding: 5px;
            &:hover{font-size: 13px;}
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .vava-upload-file{
      .file-show-item{
        .file-no-file{
          p{font-size: 11px;}
        }
        .file-show-view{
          .file-view-content{
            .view-type-name{
              border-radius: 10px;
              p{font-size: 18px;}
              p.type-name-p{font-size: 11px;}
            }
          }
          .icon{
            top: 7px;
            right: 7px;
          }
        }
      }
    }
  }
  @media (max-width: 460px) {
    .vava-upload-file{
      justify-content: space-around;
    }
  }
</style>

