# imageViewer
> This is no dependencies javascript plugin that help to view image better. and it can place in you code or deploy online.it is only 12k uncompressed.why i do it？what github's markdown link images can't show.you can change dns and turn on vpn to solve it.but it's client!it's not nice.So i solve it with an external image viewer.
## install
```
npm i @zgo/image-viewer
```
## usage-API

1. `imageViewer.load(options)`

```html
eg:
// {clientType: 1}
<link rel="stylesheet" href="imageviewer.min.css"> or 
// {clientType: 0}
<link rel="stylesheet" href="imageviewer.phone.min.css.css">
imageViewer.load(options);
//options -> {k:v} 
```
2. `imageViewer.pageTo(number)`
3. `imageViewer.openOrClose(boolean)`
4. `imageViewer.adapteScreen()`

## options

|key|type|range|default value|means|show|
|-|-|-|-|-|-|
|list|dom|-|null|ImageViewer can get image informations autoly,if you give dom what wrap all images that you want to load||
|images|array|-|null|image informations|[{src: '1.jpg', alt: 'image', width: number, height: number},...]|
|wrapper|dom|-|null|You can custom wrapper through changging some html of example||
|gutter|number|-|60|||
|clientType|number|0 or 1|1|0 is meaning phone and 1 is meaning PC||
|languge|string|'zh_CN' or 'en'|'zh_CN'|If you want to support more languges,you can use wrapper of options.||
|close|boolean|-|false|close||
|full|boolean|-|true|screen full||
|github|boolean|-|true|project origin||
|handlerNext|function|||||
|handlerPrev|function|||||
|handlerOriginalShap|function|||||
|handlerWidthAdapter|function|||||
|handlerHeightAdapter|function|||||
|unmount|function|||When wapper close,it executes||
|load|function|||when image is completed, it executes.every image executes just one time.||
|imagesIsNotOk|function|(images)=>void|(images)**=>**{throw new Error("can't get images")}|if images is not truthy,all events will not mount and button will not feedback!||
|modal|boolean||true|||
|||||||
## example wrapper
```js
{wrapper: ['phonehtml', '<div class="imageViewerBox">
  <div class="img_title">
    <span class="img_con">imageviewer</span>
    <span class="img_actions"><div class="img_icon icon_cycle"></div>
      <div class="img_action">
        <ul>
          <li><a class="img_full">full</a></li>
          <!-- <li><a class="img_close">close</a></li> -->
          <li><a href="https://github.com/zgoby/imageviewer">GitHub</a></li>
        </ul>
      </div>
    </span>
  </div>
  <div class="img_imgBox">
    <!-- <div class="img_position">
      <div class="img_size">
      </div>
    </div> -->
  </div>
  <div class="img_controlBox clearfix">
    <div class="img_page">
      <a class="img_item prev"></a>
      <span class="img_item img_pagebar"><span class="currentSize">1</span> / <span class="total">4</span></span>
      <a class="img_item next"></a>
    </div>
    <div class="img_scale">
      <a class="img_item originalShap"></a>
      <a class="img_item widthAdapter"></a>
      <a class="img_item heightAdapter"></a>
    </div>
  </div>
  <div class="img_loading">loading...</div>
</div>']}
```
## TODO
<!-- 1. Modal support -->
2. Mobile support
3. Life cycle function add
<!-- 4. Support customizable wrapper -->
5. Support customizable event adding
6. Support mouse drag and drop