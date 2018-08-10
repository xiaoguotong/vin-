import vinKeyboard from './vin-keyboard.vue' // 导入组件
const keyboard = {
    install(Vue, options) {
        Vue.component(vinKeyboard.name, vinKeyboard) // vuePayKeyboard.name 组件的name属性
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(keyboard);
}
export default keyboard // 导出..