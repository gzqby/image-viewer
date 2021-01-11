const path = require('path');

const express = require('express');
// const ejs = require('ejs');

const { uuid } = require('./utils');

const users = new Map();
const images = new Map();
const PORT = process.env.PORT || 3000;
const SL = process.env.SL || 10;
const UL = process.env.UL || 100;
const app = express();
const HOSTDIR = path.join(__dirname, '../example');

app.set('views', HOSTDIR);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(path.join(HOSTDIR, '../client')))

app.get('/request-view', (req, res)=>{
  const { src, title, alt, json } = req.query;
  // users.set();
  if(!src){
    res.end('src of query is undefined')
  }
  let imageviewercookie = getCookie(req.headers.cookie, 'imageviewer');
  if (!imageviewercookie) {
    imageviewercookie = uuid();
  }
  if (!users.has(imageviewercookie)) {
    res.setHeader('Set-Cookie', `imageviewer=${imageviewercookie};`)
  }
  userImgAdd(imageviewercookie, {src, alt});
  if(json){
    res.redirect(`/image-viewer-json?title=${title}`);
    return;
  }
  res.redirect(`/image-viewer?title=${title}`);
});

app.get('/image-viewer', (req, res)=>{
  const imageviewercookie = getCookie(req.headers.cookie, 'imageviewer');
  const { src, title, alt } = req.query;
  if(!imageviewercookie){
    res.redirect(`/request-view?src=${src}&title=${title}&alt=${alt}`);
  }else{
    const imagesArr = getImages(imageviewercookie);
    res.render('index.html', {images: imagesArr, title});
  }
});

app.get('/image-viewer-json', (req, res)=>{
  const imageviewercookie = getCookie(req.headers.cookie, 'imageviewer');
  if(!imageviewercookie){
    const { src, title, alt } = req.query;
    if (src) {
      res.redirect(`/request-view?src=${src}&title=${title}&alt=${alt}`);
    }
  }else{
    res.json(imagesArr);
    res.end();
  }
});

function getCookie(cookies, name) {
  return (new RegExp('(?:^|\;\\s)'+name+'=([^\;]+)(?:$|\;)', 'g').exec(cookies)||[])[1];
}

function userImgAdd(key, {src, title='', alt=''}) {
  let srcs,titles, alts, user;
  if(!src) return;
  else if(src instanceof Array){
    srcs = [...src];
    titles = [...title];
    alts = [...alt];
  }else{
    srcs = [src];
    titles = [title];
    alts = [alt];
  };
  if(!users.has(key)) {
    // 添加用户
    users.set(key, []);
    if(users.size>UL) {
      const count = users.size-UL;
      const keys = users.keys();
      while(count){
        const key = keys.shift();
        users.delete(key);
        count--;
      }
    }
  }
  user=users.get(key);
  user.unshift(...srcs);
  for (let index = 0; index < srcs.length; index++) {
    const element = srcs[index];
    images.set(element, {src: element, title: titles[index]||'', alt: alts[index]});
  }
  // 当前user的存量信息
  if(user.length>SL){
    const count = user.length-SL;
    while(count){
      const imageKey = user.pop();
      images.delete(imageKey);
      count--;
    }
  }
}

function getImages(key) {
  const srcs = users.get(key);
  let imageInfos = [];
  if(srcs){
    for (let index = 0; index < srcs.length; index++) {
      const src = srcs[index];
      imageInfos.push(images.get(src));
    }
  }
  return imageInfos;
}

app.listen(PORT);