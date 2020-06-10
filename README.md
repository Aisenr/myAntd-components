# 更新日志
## v2.4.0
- 添加了GeoMap组件
- 地图相关组件更改参数格式
  - 经纬度以数组的形式传递

## v2.4.1
- 地图相关组件比例更改到11级（1:500）

## v2.4.2
- 地图选点（SelectPoint），选区域（SelectArea），选路线（SelectRoute），展示地理对象（GeoMap）组件比例改到15级

## v2.4.3
- 添加展现时间区间功能DateFormat.RangeFormat
- 去掉DateFormat组件默认自带的多余部分以省略号形式展现功能
- 去掉ParseCode组件默认自带的多余部分以省略号形式展现功能
- 优化Ellipsis组件样式
- 修改ListTable组件
  - 不带render函数时，默认多余部分以省略号形式展示
  - render函数返回字符串时，多余部分以省略号形式展示，返回非字符串时多余部分直接隐藏

## v2.4.4
- 修改ListTable组件中序号是NAN的Bug

## v2.4.5
- 修改ParseCode组件返回null的问题

## v2.4.6
- 修改DetailGroup组件bug（v2.4.5更改有误）

## v2.4.7
- 修改地图相关组件初始化参数为null或undefined报错问题

## v2.4.8
- GeoMap组件添加显示位置点功能

## v2.4.9
- 解决GeoMap组件中心点显示不准确的问题

## v2.4.10
- 解决GeoMap组件模态框二次查看地图串位问题

## v2.4.11
- 解决SlideShow组件一张图片是显示不出来的bug

## v2.4.12-beta.1
- 修改短信验证码，form无法获取bug
- 修改地理位置获取组件取消按钮报错，位置搜索无效bug
- 修改SelectArea组件在form中无法获取结果的问题
- 修改SelectPoint组件在form中无法获取结果的问题
- 修改SelectRoute组件在form中无法获取结果的问题

## v2.4.12-beta.6
- 修改月份选择bug

## v2.4.12-beta.8
- 修改OverallDetails样式

## v2.4.12-beta.9
- 区域选择、路线选择、点选择支持GeoJson格式

## v2.4.12-beta.10
- 所有地图组件支持GeoJson格式

## v2.4.12-beta.11
- 修改选择区域组件返回值结构

## v2.4.12-beta.12
- 添加限制，选择区域至少三个点

## v2.5.0
- 删除RouteMap组件

## v2.5.1
- 修改PositionShow组件中location为空时报错的bug

## v2.5.2-beta.2
- 修改地图选择组件中的bug（返回的不是关机标准）

## v2.5.2-beta.3
- 修改表单组件校验不能传送方法的问题

## v2.5.2-beta.4
- 优化位置选择组件


## v2.5.2-beta.5
- 优化时间区间选择组件

## v2.5.2
- 正是发布

## v2.5.3-beta.1
- 添加附件上传功能

## v2.5.3-beta.10
- 修改短信验证码组件bug（去掉输入框点击事件）

## v2.5.3-beta.16
- 修改PictureList组件数据格式，与FileUpload组件相同

## v2.5.3-beta.17
- 修改PictureList组件中标识有uid换成url

## v2.5.3-beta.18
- 修改position-input-box组件bug

## v2.5.3-beta.20
- 添加FileList组件
- 修改FileUpload组件中属性 fileList改成value
- 修改FileUpload组件中描述输入框换行问题

## v2.5.3-beta.21
- 修改FileList样式

## v2.5.3-beta.22
- DatePicker转换时间戳时清空时，分，秒，毫秒，月选择还要清空日期。

## v2.6.0
- v2.5.3 beta版转换成正式版
- 修改MonthPick不能清空bug

## v2.6.1-beta.1
- AreaSelect组件添加regionRestrict属性

## v2.6.1-beta.2
- 修改FileList中单位换算

## v2.6.1-beta.3
- 修改FileUpLoad中描述输入框样式bug

## v2.6.1-beta.5
- SmsVerificationCode组件click事件支持Promise对象的返回值（新增功能，支持原返回值）

## v2.6.1-beta.16
- 修改PositionInputBox组件bug
- 修改文件上传组件描叙不能回显问题

## v2.6.1-beta.17
- 优化PictureList组件样式

## v2.6.1-beta.25
- 区域选择组件oneLevel模式添加清空功能

## v2.6.1-beta.26
- 级联地区选择组件优化（click、hover）

## v2.6.1-beta.2
- 地区选择changeOnSelect属性可自定义

## v2.6.4
- 选着月份组件添加默认提示信息（MonthPicker）

## v2.6.5-beta.1
- 修改上传组件bug，修改numberFormat组件传0时的bug

## v2.6.5-beta.2
- 上传组件添加进度条

## v2.6.5-beta.3
- 添加上传中组件个数对外属性

## v2.6.5-beta.4
- 修改组件销毁时bug

## v2.6.5-beta.13
- 图片上传组件，上传中图片计数

## v2.6.5-beta.26
- 修改位置选择组件bug

## v2.6.5
- 地圖組件升級

## v2.6.6-beta.6
- 修改PositionShow组件的中心点不变bug

## v2.6.6-beta.7
- 修改DateFormat组件非法参数bug

## v2.6.6
- 添加海量点组件

## v2.6.7-beta.1
- 修改地图中心点不准确 bug

## v2.6.7-beta.2
- 修改Marker不销毁问题

## v2.6.7-beta.3
- 修改位置选择组件中信息提示框bug

## v2.6.7-beta.4
- SelectAreaNew, SelectPointNew, SelectRouteNew组件升级完毕

## v2.6.7-beta.6
- 优化PictureList组件，添加imageSize属性，控制图片大小
- ['sm', 'md', 'lg']

## v2.6.7-beta.8
- 优化FormGroup样式
- 在父组件传递form时，layout属性依然适用

## v2.6.7-beta.9
- Map.Boundary组件添加fitView属性[true, false],默认为true；
- true：适应窗口, false：不自动适应

## v2.6.7-beta.10
- 优化PictureList组件样式，图片居中

## v2.6.7-beta.12
- 优化ParseCode组件，支持自定义区域

## v2.6.7-beta.13
- 优化AreaSelect组件，支持自定义区域

## v2.6.8
- SelectRoute组件添加起止点图标
- startAndEndPosition: true, 显示起止点图标

## v2.6.9
- 添加ContextMenu組件

## v2.6.10-beta.1
- 組件ContextMenu對外坐標結構

## v2.6.10-beta.2
- 优化图片上传数据结构url支持String类型和对象
- 修改accept属性bug

## v2.6.10-beta.4
- 海量点组件添加onClick事件

## v2.6.10
- 去掉setTimeOut,PositionInputBox纠偏，InfoWindow重复构建问题，antd升级RankList优化Boundary点击事件

## v2.6.11
- 添加高德地图地址转标转换方法

## v2.6.12
- 修改位置选择组件中坐标转换bug

## v2.6.13-beta.4
- 优化Map组件的zoom设置

## v2.6.13
- 添加轨迹组件 Track

## v2.6.14-beta.3
- 修改PositionInputBoxNew标记点显示bug与AutocompleteSearch报错bug

## v2.6.14-beta.4
- 修改上传组件样式

## v2.6.14
- 修改PositionShow组件在geo格式下path不传报错问题

## v2.6.15
- 添加Map.getRegionalCoordinates方法，查询区域中心信息
- 参数传区域code

## v2.6.16
- 修改地图热力图初始化bug

## v2.6.17
- 去掉百度地图

## v2.6.18-beta.2
- 添加百度地图中计算路线距离方法
- Map.getDistance(points);
- 单位（米）

## v2.6.18-beta.3
- 添加高德地图中计算路线距离方法
- MapNew.getDistance(points);
- 单位（米）
