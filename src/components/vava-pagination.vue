<template>
  <div class="vava-pagination">
    <li :class="{'disabled': current == 1}" @click="setCurrent(current - 1)"><a class="pagination-frist" href="javascript:;"><span class="icon icon-right-slide"></span></a></li>
    <li :class="{'disabled': current == 1}" @click="setCurrent(1)"><a href="javascript:;"> FRIST </a></li>
    <li v-for="(p,index) in grouplist" :class="{'active': current == p.val}" :key="index" @click="setCurrent(p.val)">
      <a href="javascript:;"> {{ p.text }} </a>
    </li>
    <li :class="{'disabled': current == page}" @click="setCurrent(page)"><a href="javascript:;"> LAST </a></li>
    <li :class="{'disabled': current == page}" @click="setCurrent(current + 1)"><a href="javascript:;"><span class="icon icon-right-slide"></span></a></li>
  </div>
</template>

<script type="es6">
  export default{
    data(){
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      }
    }
  }
</script>

<style lang="less">
  .vava-pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    height: 1.97vw;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      float: left;
      color: #666;
      margin: 0 1vw;
      padding: 0 0.5vw;
      cursor: pointer;
      &:hover {
        a{color: @base-button-back;span.icon{color: @base-button-back;}}
      }
      a {
        display: block;
        text-align: center;
        font-size: 1.56vw;
        border-radius: 5px;
        text-decoration: none;
        color: #CBCBCB;
        transition: color .3s;
        span.icon{
          transition: color .3s;
          color: #CBCBCB;
          font-size: 1.56vw;
        }
      }
      a.pagination-frist{
        padding-top: 0.25vw;
        transform: rotate(180deg);
      }
    }
    .active {
      a{color: @base-button-back;}
    }
  }
  @media (max-width:800px){
    .vava-pagination li{
      margin: 0 5px;
      padding: 0 5px;
      a{
        font-size: 12px;
        span.icon{font-size: 12px;}
      }
      a.pagination-frist{
        padding-top: 3px;
      }
    }
  }
</style>