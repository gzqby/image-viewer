function getImageViewer() {
  const imageViewer = {
    // gutter is max value of what distance is image to image box
    // clientType is flag of client type: 0 is phone,1 is PC
    defaultOptions: {
      gutter: 60, clientType: 1, languge: 'zh_CN',
      close: false, full: true, github: true,
      imagesIsNotOk: ()=>{throw new Error("can't get images")},
    },
    unEvents: [],
    currentSize: 0,
    images: [],
    doms: null,
    inserting: {},
    getDoms(cxt) {
      const cxtDom = document.querySelector(cxt);
      const currentSize = cxtDom.querySelector('.currentSize');
      const total = cxtDom.querySelector('.total');
      const prev = cxtDom.querySelector('.prev');
      const next = cxtDom.querySelector('.next');
      const originalShap = cxtDom.querySelector('.originalShap');
      const heightAdapter = cxtDom.querySelector('.heightAdapter');
      const widthAdapter = cxtDom.querySelector('.widthAdapter');
      const title = cxtDom.querySelector('.img_title .img_con');
      const actions = cxtDom.querySelector('.actions');
      const imgBox = cxtDom.querySelector('.img_imgBox');
      const loading = cxtDom.querySelector('.img_loading');
      const closeIcon = cxtDom.querySelector('.img_close');
      const fullIcon = cxtDom.querySelector('.img_full');
      const controlBox = cxtDom.querySelector('.img_controlBox');
      return {cxtDom,currentSize,total,prev,next,originalShap,heightAdapter,widthAdapter,title,actions,imgBox,loading,closeIcon,fullIcon,controlBox};
    },
    load({list, images, options={}}) {
      this.options = {...this.defaultOptions, ...options};
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
      this.doms = this.getDoms('.imageViewerBox');
      this.mount();
    },
    mount() {
      const {total,title,imgBox,prev,next,originalShap,widthAdapter,heightAdapter,closeIcon,fullIcon,cxtDom,controlBox} = this.doms;
      const { close, full, github, clientType } = this.options;
      this.length = this.images.length;
      total.innerHTML=this.length;
      let length = this.length;
      this.classnames(controlBox, 'show', true);
      while(length){
        const img_position = document.createElement('div');
        img_position.className='img_position';
        img_position.innerHTML = '<div class="img_size"></div>';
        imgBox.append(img_position);
        length--;
      }
      this.pageTo();
      const that = this;
      if(close) {
        const unSubCloseEvent = this.on(closeIcon, 'click',function(event){
          event.preventDefault();
          that.classnames(cxtDom, 'hide', true);
          that.unmount();
        });
        this.unEvents.push(unSubCloseEvent);
      }
      if(full) {
        const unSubFullEvent = this.on(fullIcon, 'click',function(event){
          event.preventDefault();
          that.screenFull(cxtDom);
        });
        this.unEvents.push(unSubFullEvent);
      }
      if(clientType===1) {
        // const positions = imgBox.querySelectorAll('.img_position');
        // for (let index = 0; index < positions.length; index++) {
        //   const position = positions[index];
        //   console.log(position.firstChild.dataset.scale);
        // }
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
      const unSubSizeEvent = this.on(window, 'resize',function(event){
        event.preventDefault();
        const sizeBox = imgBox.children[that.currentSize].firstChild;
        const img = sizeBox.firstChild;
        that.imgBoxResize();
        that.imgAdapt(img, sizeBox);
      });
      this.unEvents.push(unSubPrevEvent, unSubNextEvent, unSubOriginalShapEvent, unSubWidthAdapterEvent, unSubHeightAdapterEvent, unSubSizeEvent);
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
      this.length-1-this.currentSize>0 ? this.allowed(this.doms.next) : this.notAllowed(this.doms.next);
      this.currentSize>0 ? this.allowed(this.doms.prev) : this.notAllowed(this.doms.prev);
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
        if(image.complete) {
          that.insertImg(image, nowSize);
          return;
        }
        this.on(image, 'load', function() {
          that.insertImg(image, nowSize);
          return;
        });
      }
    },
    boothChange(){
      const {imgBox} = this.doms;
      for (let index = 0; index < imgBox.children.length; index++) {
        const element = imgBox.children[index];
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
      this.imgAdapt(img, nowSizeBox);
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
  return {load: imageViewer.load.bind(imageViewer), pageTo: imageViewer.pageTo.bind(imageViewer)};
}

window.imageViewer ? window.imageViewer={imageViewer: window.imageViewer, new: getImageViewer()} : window.imageViewer = getImageViewer();