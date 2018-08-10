<template>
    <div class="kb-container">
        <div class="kb-input-wrapper" ref="inputWrapper">
    <span>VIN码</span>
    <div class="kb-input-contaner" @click="showKb">
     <p class="input" v-show="vinArr.length>0||kbShow">{{vinArr.join('')}}</p>
     <p class="placeholder" v-show="vinArr.length==0&&!kbShow">请输入17位车架号（必填）</p>
    <p class="pointer" v-show="kbShow"></p>
    </div>
 <div class="cl-wrapper">
     <img src="./images/close.png" @click="imgClear" >
     <span>({{vinArr.length}}/17)</span>
 </div>
        </div>

<div class="kb-wrapper" v-show="kbShow" ref="kbWrapper">
<div v-for="arr in keyList" class="kb-row">
<div 
 :class="['kb-item',{'kb-item-disabled':v.disabled}]"
 :style="(v.width ? `width:${v.width/40}em;`:'')+`font-size:${fontSize}px;`" 
 v-for="v in arr" 
 @touchstart="itemTouchStart"
 @touchend="itemTouchEnd(v.value,v.disabled)"
 >
 <img  v-if="v.icon" :src="v.icon" >
 <template v-else>
{{v.value}}
 </template>
 </div>
</div>

</div>
</div>

</template>

<script>
const AC_TIME = 200;
import deleteImg from "./images/delete.png";
export default {
  name: "vinKeyboard",
  data() {
    return {
      kbShow: false,
      vinArr: [],
      keyList: [
        [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 },
          { value: 6 },
          { value: 7 },
          { value: 8 },
          { value: 9 },
          { value: 0 }
        ],
        [
          { value: "Q", disabled: true },
          { value: "W" },
          { value: "E" },
          { value: "R" },
          { value: "T" },
          { value: "Y" },
          { value: "U" },
          { value: "I", disabled: true },
          { value: "O", disabled: true },
          { value: "P"}
        ],
        [
          { value: "A" },
          { value: "S" },
          { value: "D" },
          { value: "F" },
          { value: "G" },
          { value: "H" },
          { value: "J" },
          { value: "K" },
          { value: "del", icon: deleteImg }
        ],
        [
          { value: "", width: 108 },
          { value: "Z" },
          { value: "X" },
          { value: "C" },
          { value: "V" },
          { value: "B" },
          { value: "N" },
          { value: "M" },
          { value: "确定", width: 108 }
        ]
      ],
      fontSize: 40,
      len: 17
    };
  },

  methods: {
    inputFocus: function() {
      document.activeElement.blur();
    },
    imgClear: function() {
      this.$data.vinArr = [];
    },
    focusHandle: function(e) {
      e.preventDefault();
      this.$data.kbShow = true;
    },
    inputHandle: function(e) {
      console.log(e);
      e.preventDefault();
    },
    showKb:function(){
      this.$data.kbShow = true;
    },
  
    itemTouchStart: function(e) {
      var target = e.target;
      target.classList.add("item-active");
    },
    itemTouchEnd: function(v, disabled) {
      if (disabled) return;

      var { vinArr, len } = this.$data,
        target = event.target;

      setTimeout(() => {
        target.classList.remove("item-active");
      }, AC_TIME);

      if (v == "del") {
        this.$data.vinArr.splice(vinArr.length - 1, 1);
        return;
      }
      if (v == "确定") {
        this.$emit("ok", vinArr.join(""));
        return;
      }
      if (vinArr.length >= len) return;
      this.$data.vinArr.push(v);
    },
    genFontsize: function() {
      let fz = 40,
        w = 750;
      let cw =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.$data.fontSize = fz * cw / w * 1.0;
    },
    closeHandle:function(e){
        var target=e.target,
        op=target.offsetParent,
        {inputWrapper,kbWrapper}=this.$refs;
       if([inputWrapper,kbWrapper].indexOf(target)>-1||[inputWrapper,kbWrapper].indexOf(op)>-1){
           console.log('c');
           return;
       }

       this.$data.kbShow=false;



    }
  },

  mounted() {
    this.genFontsize();
    document.documentElement.addEventListener('touchstart',this.closeHandle);

  },
  destroyed() {
      document.documentElement.removeEventListener("touchstart",this.closeHandle);
  }
};
</script>

<style scoped>
.kb-container {
  font-size: 15px;
}

div {
  box-sizing: border-box;
  color: #333;
}
p {
  margin: 0;
}
.kb-input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.kb-input-wrapper .kb-input-contaner {
  flex: 1;
  margin: 0 6px 0 10px;
  border: none;
  outline: none;
}
.kb-input-contaner {
  display: flex;
  align-items: center;
}

.placeholder {
  color: #999;
  margin-left: 2px;
}
.pointer {
  height: 18px;
  border-right: 1px solid #333;
  animation: pointer 1s infinite alternate both running;
}

.cl-wrapper {
  font-size: 13px;
  color: #999;
}
.cl-wrapper img {
  height: 14px;
  margin-right: 4px;
  vertical-align: middle;
}
.cl-wrapper span {
  vertical-align: middle;
}

.kb-wrapper {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  background: white;
  padding: 15px 4px 5px;
  width: 100%;
  border-top: 1px solid #ddd;
}

.kb-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-active {
  background-color: #efefef;
}

.kb-item {
  width: 1.75em;
  height: 2.15em;
  line-height: 2.15em;
  border-radius: 0.3em;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 40px;
}
.kb-item-disabled {
  color: rgb(179, 179, 179);
  background-color: #e5e5e5;
}
.kb-item img {
  width: 1.223em;
  height: 0.79em;
}
@keyframes pointer {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>


