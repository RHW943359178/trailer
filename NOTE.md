# nuxt 启动提示

## 在navigator操作样式时，使用router-link内置的样式会更加方便
# 示例

  <ul>
    <router-link v-for="item in navigators" :key="item.id" active-class="active" tag="li" exact :to="item.url">{{ item.label }}</router-link>
  </ul>

# active-class="active"： 为你设置的active样式
# exact：避免点击的时候会出现多个激活状态
# tag：这个是能将router-link绑定的样式作用于外部的标签，通常和<li>标签一起用
#  tag="li"：已经在内部实现了li标签，无需在ul标签中再嵌套li标签