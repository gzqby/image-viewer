function getImageViewer() {
  const imageViewer = {
    // gutter is max value of what distance is image to image box
    // clientType is flag of client type: 0 is phone,1 is PC
    defaultOptions: {
      gutter: 60, clientType: 1,close: false, full: true, github: true, modal: false,
      modalStyle: {},
      imagesIsNotOk: ()=>{throw new Error("can't get images")},
      wrapper: [`<div>
      <div class="img_title">
        <span class="img_actions"><div class="img_icon icon_cycle"></div></span>
      </div>
      <div class="img_imgBox">
        <div class="img_sliceBox"></div>
      </div>
      <div class="img_controlBox clearfix">
        <span class="img_item img_pagebar"><span class="currentSize">0</span> / <span class="total">0</span></span>
        <span class="img_con">imageviewer</span>
      </div>
      <div class="img_loading"><svg viewBox="0 0 1024 1024" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" /></svg></div>
    </div>`,
    `<div>
          <div class="img_title">
            <span class="img_con">imageviewer</span>
            <span class="img_actions"><div class="img_icon icon_cycle"></div>
              <div class="img_action">
                <a class="img_full">全屏</a>
                <a class="img_close">关闭</a>
                <a class="img_github" href="https://github.com/zgoby/image-viewer">GitHub</a>
              </div>
            </span>
          </div>
          <div class="img_imgBox">
          </div>
          <div class="img_controlBox clearfix">
            <div class="img_page">
              <a class="img_item prev"><svg viewBox="0 0 1024 1024" focusable="false"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" /></svg></a>
              <span class="img_item img_pagebar"><span class="currentSize">0</span> / <span class="total">0</span></span>
              <a class="img_item next"><svg viewBox="0 0 1024 1024" focusable="false"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" /></svg></a>
            </div>
            <div class="img_scale">
              <a class="img_item originalShap"><svg viewBox="65 65 896 896" focusable="false"><path d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z" /></svg></a>
              <a class="img_item widthAdapter"><svg viewBox="65 65 896 896" focusable="false"><path d="M180 176h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zm724 0h-60c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8zM785.3 504.3L657.7 403.6a7.23 7.23 0 00-11.7 5.7V476H378v-62.8c0-6-7-9.4-11.7-5.7L238.7 508.3a7.14 7.14 0 000 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h268v62.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.8-2.9 3.8-8.5.2-11.4z" /></svg></a>
              <a class="img_item heightAdapter"><svg viewBox="65 65 896 896" focusable="false"><path d="M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z" /></svg></a>
            </div>
          </div>
          <div class="img_loading"><svg viewBox="0 0 1024 1024" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" /></svg></div>
        </div>`]
    },
    unEvents: [],
    currentSize: 0,
    images: [],
    doms: null,
    inserting: {},
    getDoms() {
      const cxtDom = this.cxtDom;
      const currentSize = cxtDom.querySelector('.currentSize');
      const total = cxtDom.querySelector('.total');
      const prev = cxtDom.querySelector('.prev');
      const next = cxtDom.querySelector('.next');
      const originalShap = cxtDom.querySelector('.originalShap');
      const heightAdapter = cxtDom.querySelector('.heightAdapter');
      const widthAdapter = cxtDom.querySelector('.widthAdapter');
      const title = cxtDom.querySelector('.img_con');
      const actions = cxtDom.querySelector('.img_actions');
      const imgBox = cxtDom.querySelector('.img_imgBox');
      const loading = cxtDom.querySelector('.img_loading');
      const closeIcon = cxtDom.querySelector('.img_close');
      const fullIcon = cxtDom.querySelector('.img_full');
      const controlBox = cxtDom.querySelector('.img_controlBox');
      return {cxtDom,currentSize,total,prev,next,originalShap,heightAdapter,widthAdapter,title,actions,imgBox,loading,closeIcon,fullIcon,controlBox};
    },
    styles(obj){
      let str="";
      for (let [k,v] of Object.entries(obj)) {
        str+=`${k}: ${v};`
      }
      return str;
    },

    wrapperGenerator(className){
      const { modal, wrapper, modalStyle, clientType } = this.options;
      let style;
      this.cxtDom = document.createElement('div');
      this.cxtDom.className=className;
      if(clientType===0) {
        // style
        this.classnames(this.cxtDom, 'img_modal', true);
        this.classnames(this.cxtDom, 'img_phone', true);
        this.options.close=true;
        this.options.gutter=0;
      }else{
        this.classnames(this.cxtDom, 'img_pc', true);
        style=this.styles(modalStyle);
      }
      this.cxtDom.innerHTML=wrapper instanceof Array ? wrapper[clientType] : wrapper;
      this.cxtDom.style=style;
      document.body.append(this.cxtDom);
    },
    load(options={}) {
      const {list, images} = options;
      const { modalStyle: dmo, ...otherDO } = this.defaultOptions;
      const { modalStyle={}, ...otherO } = options;
      this.options = {...otherDO, ...otherO, modalStyle: {...dmo, ...modalStyle}};
      if (!(images&&images instanceof Array)) {
        if (!list) {
          // create imageViewerBox
          throw new Error("There are not list or images");
        }
        this.getImgs(list, this.images);
      }else{
        this.images = images;
      }
      if (this.images.length<=0) {
        this.options.imagesIsNotOk(images);
        return;
      }
      this.wrapperGenerator('imageViewerBox');
      this.doms = this.getDoms();
      const {total, imgBox} = this.doms;
      this.length = this.images.length;
      total.innerHTML=this.length;
      let length = this.length;
      const box = imgBox.querySelector('.img_sliceBox') || imgBox;
      while(length){
        const img_position = document.createElement('div');
        img_position.className='img_position';
        img_position.innerHTML = '<div class="img_size"></div>';
        box.append(img_position);
        length--;
      }
      if(this.options.modal) {
        this.options.close=true;
        this.openOrClose(false);
        this.classnames(this.cxtDom, 'img_modal', true);
      }else{
        this.openOrClose(true);
      }
    },
    mount() {
      const {actions,imgBox,prev,next,originalShap,widthAdapter,heightAdapter,closeIcon,fullIcon,cxtDom,controlBox} = this.doms;
      const { close, full, github, clientType } = this.options;
      const that = this;
      this.pageTo();
      if(clientType===1) {
        this.classnames(controlBox, 'show', true);
        // const positions = imgBox.querySelectorAll('.img_position');
        // for (let index = 0; index < positions.length; index++) {
        //   const position = positions[index];
        //   console.log(position.firstChild.dataset.scale);
        // }
        if(full) {
          this.classnames(actions, '_full', true);
          const unSubFullEvent = this.on(fullIcon, 'click',function(event){
            event.preventDefault();
            that.screenFull(cxtDom);
          });
          this.unEvents.push(unSubFullEvent);
        }
        if(github) {
          this.classnames(actions, '_github', true);
        }
        if(close) {
          if(!(github&&full)){
            this.classnames(actions, 'only_close', true);
            const unSubCloseEvent = this.on(this.cxtDom.querySelector('.only_close'), 'click',function(event){
              event.preventDefault();
              that.openOrClose(false);
              that.unmount();
            });
            this.unEvents.push(unSubCloseEvent);
          }else{
            this.classnames(actions, '_close', true);
            const unSubCloseEvent = this.on(closeIcon, 'click',function(event){
              event.preventDefault();
              that.openOrClose(false);
              that.unmount();
            });
            this.unEvents.push(unSubCloseEvent);
          }
        }
        const unSubPrevEvent = this.on(prev, 'click',function(event){
          event.preventDefault();
          if(!that.hasClassName(this, 'notallow')){
            that.pageTo(that.safePage(that.currentSize-1));
          }
        });
        const unSubNextEvent = this.on(next, 'click',function(event){
          event.preventDefault();
          if(!that.hasClassName(this, 'notallow')){
            that.pageTo(that.safePage(that.currentSize+1));
          }
        });
        const unSubOriginalShapEvent = this.on(originalShap, 'click',function(event){
          if(!that.hasClassName(this, 'notallow') && !that.hasClassName(this, 'active') && that.inserting[that.currentSize]) {
            event.preventDefault();
            const sizeBox = imgBox.children[that.currentSize].firstChild;
            const img = sizeBox.firstChild;
            that.controlBoxAdapt(sizeBox, 0);
            that.sizeBoxAdapt(sizeBox, 1);
          }
        });
        const unSubWidthAdapterEvent = this.on(widthAdapter, 'click',function(event){
          if(!that.hasClassName(this, 'notallow') && !that.hasClassName(this, 'active') && that.inserting[that.currentSize]) {
            event.preventDefault();
            const sizeBox = imgBox.children[that.currentSize].firstChild;
            const img = sizeBox.firstChild;
            that.controlBoxAdapt(sizeBox, 1);
            that.sizeBoxAdapt(sizeBox, that.caclScale(imgBox.width, img.width));
          }
        });
        const unSubHeightAdapterEvent = this.on(heightAdapter, 'click',function(event){
          if(!that.hasClassName(this, 'notallow') && !that.hasClassName(this, 'active') && that.inserting[that.currentSize]) {
            event.preventDefault();
            const sizeBox = imgBox.children[that.currentSize].firstChild;
            const img = sizeBox.firstChild;
            that.controlBoxAdapt(sizeBox, 2);
            that.sizeBoxAdapt(sizeBox, that.caclScale(imgBox.height, img.height));
          }
        });
        this.unEvents.push(unSubPrevEvent, unSubNextEvent, unSubOriginalShapEvent, unSubWidthAdapterEvent, unSubHeightAdapterEvent);
      }else{
      }
    },
    adapteScreen(){
      if(this.inserting[this.currentSize]) {
        const sizeBox = imgBox.children[this.currentSize].firstChild;
        const img = sizeBox.firstChild;
        this.imgBoxResize();
        this.imgAdapt(img, sizeBox);
      }
    },
    screenFull(ele){
      if(ele.requestFullscreen){
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        return ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        return ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        return ele.msRequestFullscreen();
      };
    },
    on(dom, type, cb, options) {
      dom.addEventListener(type,cb,options);
      return () => {dom.removeEventListener(type,cb,options);}
    },
    unmount(){
      for (let index = 0; index < this.unEvents.length; index++) {
        const unSubEvent = this.unEvents[index];
        unSubEvent();
      }
      this.currentSize = 0;
    },
    safePage(number){
      if(number>this.length-1){
        return this.length-1;
      }else if(number<0){
        return 0;
      }else{
        return number;
      }
    },
    pageTo(number=0){
      this.currentSize=number;
      if (this.options.clientType===1) {
        this.length-1-this.currentSize>0 ? this.allowed(this.doms.next) : this.notAllowed(this.doms.next);
        this.currentSize>0 ? this.allowed(this.doms.prev) : this.notAllowed(this.doms.prev);
      }
      const {total,title,imgBox, currentSize} = this.doms;
      const {alt, src, width, height, element} = this.images[this.currentSize];

      currentSize.innerHTML=this.currentSize+1;
      title.innerHTML=alt;
      this.boothChange();
      const that = this;
      const nowSize = this.currentSize;
      if(!this.inserting[nowSize]){
        this.loadingControl(true);
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        image.referrerPolicy="no-referrer";
        if(image.complete) {
          that.insertImg(image, nowSize);
          return;
        }
        const unSubLoadEvent = this.on(image, 'load', function() {
          that.insertImg(image, nowSize);
          return;
        });
        const unSubErrorEvent = this.on(image, 'error', function() {
          image.src = '/imgerror.svg';
          that.insertImg(image, nowSize);
          return;
        });
        this.unEvents.push(unSubLoadEvent, unSubErrorEvent);
      }
    },
    openOrClose(bool) {
      if (bool) {
        this.classnames(this.cxtDom, 'img_open', true);
        this.mount();
      }else{
        this.classnames(this.cxtDom, 'img_open', false);
      }
      return this.options.modal;
    },
    boothChange(){
      const {imgBox} = this.doms;
      for (let index = 0; index < imgBox.children.length; index++) {
        const element = imgBox.querySelectorAll('.img_position')[index];
        if (this.currentSize===index) {
          if(this.inserting[this.currentSize]){
            this.controlBoxAdapt(element.firstChild);
          }
          this.classnames(element, 'show', true);
        }else{
          this.classnames(element, 'show', false);
        }
      };
    },  
    insertImg(img, nowSize){
      const {imgBox} = this.doms;
      const nowSizeBox = imgBox.children[nowSize].querySelector('.img_size');
      img['data-width']=img.width;
      img['data-height']=img.height;
      if (this.options.clientType===1) {
        this.imgAdapt(img, nowSizeBox);
      }
      nowSizeBox.append(img);
      this.inserting[nowSize]=true;
      this.loadingControl(false);
    },
    getStyle(dom,attr){
      const { clientType } = this.options;
      return dom.currentStyle?dom.currentStyle[attr]:getComputedStyle(dom)[attr] || clientType === 1 ? 60 : 30;
    },
    imgBoxResize() {
      const {imgBox} = this.doms;
      imgBox.width = Math.floor(imgBox.getBoundingClientRect().width);
      imgBox.height = Math.floor(imgBox.getBoundingClientRect().height-parseInt(this.getStyle(imgBox, 'paddingTop')));
    },
    imgAdapt(img, sizeBox){
      const {imgBox} = this.doms;
      imgBox.width ? null : imgBox.width = Math.floor(imgBox.getBoundingClientRect().width);
      imgBox.height ? null : imgBox.height = Math.floor(imgBox.getBoundingClientRect().height-parseInt(this.getStyle(imgBox, 'paddingTop')));
      if (img.width<=imgBox.width && img.height<=imgBox.height) {
        sizeBox.dataset.adapterIsActive=[0];
        sizeBox.dataset.adapted = 0;
        this.controlBoxAdapt(sizeBox);
        return;
      }else if(img.width/img.height >= imgBox.width/imgBox.height){
        sizeBox.dataset.adapterIsActive=[0, 1];
        this.controlBoxAdapt(sizeBox, 1);
        this.sizeBoxAdapt(sizeBox, this.caclScale(imgBox.width, img.width, this.options.gutter));
      }else{
        sizeBox.dataset.adapterIsActive=[0, 2];
        this.controlBoxAdapt(sizeBox, 2);
        this.sizeBoxAdapt(sizeBox, this.caclScale(imgBox.height, img.height, this.options.gutter));
      }
    },
    caclScale(imgBoxSize, imgSize, gutter=this.options.gutter) {
      return (imgBoxSize-gutter)/imgSize
    },
    sizeBoxAdapt(sizeBox, scale) {
      sizeBox.style.transform = `scale(${scale})`;
      sizeBox.dataset.scale = scale;
    },
    sizeBoxAdapted(sizeBox, number) {
      sizeBox.dataset.adapted = number;
    },
    controlBoxAdapt(sizeBox, num) {
      if (this.options.clientType==0) {
        return;
      }
      if(num!==undefined) this.sizeBoxAdapted(sizeBox, num);
      const {originalShap, widthAdapter, heightAdapter} = this.doms;
      // number是适配器标示0，1，2分别对应
      const number = sizeBox.dataset.adapted;
      const adapters = [originalShap, widthAdapter, heightAdapter];
      for (let index = 0; index < adapters.length; index++) {
        const element = adapters[index];
        if(!sizeBox.dataset.adapterIsActive.includes(index)){
          // console.log(adapters);
          this.classnames(element, 'notallow', true);
        }else{
          this.classnames(element, 'notallow', false);
        }
        if(index===parseInt(number)){
          this.classnames(element, 'active', true);
        }else{
          this.classnames(element, 'active', false);
        }
      }
    },
    loadingControl(bool){
      const {loading} = this.doms;
      const that = this;
      if(bool){
        this.loadingTime = setTimeout(function(){
          that.classnames(loading, 'show', true);
          // 100内的loading影响视觉忽略
        }, 100);
      }
      else{
        clearInterval(this.loadingTime);
        that.classnames(loading, 'show', false);
      }
    },
    notAllowed(dom){
      this.classnames(dom, 'notallow', true);
    },
    allowed(dom){
      this.classnames(dom, 'notallow', false);
    },
    classnames(dom, classname, bool){
      const classNameArr = dom.className.split(' ');
      if(bool){
        classNameArr.includes(classname) ? null : dom.className += ' '+classname;
      }else{
        classNameArr.includes(classname) ? dom.className = classNameArr.filter(item=>item!==classname).join(" ") : null;
      }
    },
    hasClassName(dom, className){
      const classNameArr = dom.className.split(' ');
      return classNameArr.includes(className);
    },
    getImgs(ele, images) {
      const childrens = ele.children;
      for (let index = 0; index < childrens.length; index++) {
        const element = childrens[index];
        if(element.tagName==="IMG") {
          const { alt, src, width, height, dataset } = element;
          const { src: dataSrc } = dataset;
          images.push({ alt, src: src || dataSrc, width, height, index: index+1, element });
        }else{
          this.getImgs(element, images);
        }
      }
    }
  }
  return {
    load: imageViewer.load.bind(imageViewer),
    pageTo: imageViewer.pageTo.bind(imageViewer),
    openOrClose: imageViewer.openOrClose.bind(imageViewer),
    adapteScreen: imageViewer.adapteScreen.bind(imageViewer),
  };
}

window.imageViewer ? window.imageViewer={imageViewer: window.imageViewer, new: getImageViewer()} : window.imageViewer = getImageViewer();