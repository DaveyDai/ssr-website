import VavaInput from '@/components/vava-input.vue'
import VavaButton from '@/components/vava-button.vue'
import VavaEmailInput from '@/components/vava-email-input.vue'
import VavaCollapseItem from '@/components/vava-collapse-item.vue'
import VavaSubscribe from '@/components/vava-subscribe.vue'
import Checkbox from '@/components/checkbox.vue'
import SingleCheck from '@/components/single-check.vue'
import VavaSelect from '@/components/vava-select.vue'

VavaInput.install = function(Vue) { // 输入框
  Vue.component(VavaInput.name, VavaInput)
}
VavaButton.install = function(Vue) { // 按钮
  Vue.component(VavaButton.name, VavaButton)
}
VavaEmailInput.install = function(Vue) { // 邮箱订阅
  Vue.component(VavaEmailInput.name, VavaEmailInput)
}
VavaCollapseItem.install = function(Vue) { // 折叠板
  Vue.component(VavaCollapseItem.name, VavaCollapseItem)
}
VavaSubscribe.install = function(Vue) { // 订阅面板
  Vue.component(VavaSubscribe.name, VavaSubscribe)
}
Checkbox.install = function(Vue) { // 复选框
  Vue.component(Checkbox.name, Checkbox)
}
SingleCheck.install = function(Vue) { // 单选选框
  Vue.component(SingleCheck.name, SingleCheck)
}
VavaSelect.install = function(Vue) { // 下拉选择框
  Vue.component(VavaSelect.name, VavaSelect)
}

export default [
  VavaInput,
  VavaButton,
  VavaEmailInput,
  VavaCollapseItem,
  VavaSubscribe,
  Checkbox,
  SingleCheck,
  VavaSelect
]