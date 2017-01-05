
### 父子组件通信问题

在父组件中使用子组件<goodslist :periodid="current_p"></goodslist>， 设置了period绑定 current_p
current_p设置的初始值为0，实际上是通过 created 函数绑定了 ajax请求得到的值。
但是子组件依赖 periodid 来请求数据，所以初始值为0的话，在生命周期函数created里使用的是初始化的0作为请求参数。
且父组件即使通过ajax请求改变了current_p绑定的periodid的值，也无法触发子组件的created函数里的ajax请求。
当然，这里应该不会再次出发created函数，但是created函数的初始值无法使用父组件beforeCreate的设置的Current_p的值。
** 解决方案：在父组件使用子组件的时候，添加了v-if判断当前current_p的值是否合法，合法的情况下才初始化子组件，这样就不会是current_p的值出错了 **

### es6 module 使用了严格模式

正常模式下，Javascript语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域。
正常模式下，eval语句的作用域，取决于它处于**全局作用域，还是处于函数作用域**。严格模式下，**eval语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于eval内部**。