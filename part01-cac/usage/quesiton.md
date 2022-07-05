### 分析一下目录
#### 什么类型的文件都放在什么文件夹内
  源码都放在src文件夹内
  关于一些api使用案例放在example文件夹内
  scripts文件夹不是很清楚用途
  打包之后的文件存放在dist文件夹内
  .github文件夹不是很清楚
#### 一般都会有几个文件夹
  emmm 没有实现和了解过源码库，猜想应该是三个主要文件夹吧，一个用来放源码，一个用来存放打包之后的文件，一个用来存放一些示例操作文件，源码文件又可能细分其他的文件夹（例如:utils文件夹等等）
### .editorconfig是干嘛的
  学习链接：https://wenku.baidu.com/view/41719a00be64783e0912a21614791711cc7979ad.html
  https://www.jianshu.com/p/104766ccfa8b
  概要：
    1、editorconfig帮助开发人员在不同的编辑器和ide之间定义和维护一致的编码样式
    2、editorconfig项目由用于定义编码样式的文件格式和一组文本编辑器插件组成，这些插件使编辑器能够读取文件格式并遵循定义的样式。
    【个人理解】通俗的理解就是这个一个样式定义文件，编辑器需要安装某个插件，插件会对该文件进行读取，然后格式化文件样式使其保持一致。感觉有点像.prettierrc
    3、配置项
      配置包括需要匹配的文件类型，缩进风格、缩进空格数、结尾换行符等等
    4、vscode中的插件
      EditorConfig for VS Code
### .gitattributes是干嘛的
    学习链接:https://blog.csdn.net/taiyangdao/article/details/78484623
    https://zhuanlan.zhihu.com/p/108266134
    概要：
      1、gitattributes文件以行为单位设置一个路径下所有文件的属性
      2、一个属性可能有4种状态
        设置text
        不设置 -text
        设置值 text=string
        未声明，通常不出现该属性即可，若需要覆盖其他文件也可以写成!text
      3、一个git库可以有多个gitattributes文件
      4、所有git库可以设置统一的gitattributes文件
      5、可定义的相关属性
