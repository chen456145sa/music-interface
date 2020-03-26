//得到路径 专门处理路由操作
const express = require('express');
const router = express.Router();
const service = require('./service.js'); //引入业务处理


//路由处理


// router.get('/home/newslist', service.getNewList);

// router.get('/home/newsinfo', service.getNewInfo);

// //当使用restful风格 时 获得参数 用req.params
// router.get('/api/getcomments/:id', service.getComments);

// router.get('/api/getimgcategory', service.getimgcategory);

// ///api/getimages/23
// router.get('/api/getimages/:id', service.getimages);

// router.get('/api/getgoodlist/', service.getGoodList);

// router.get('/api/goods/getGoodinfo/:id', service.getGoodInfo);

// router.get('/api/goods/getshopcarlist/:id', service.getshopcarlist);
//如果不导出就会出现错误 ： app.use() requires a middleware function 

//得到轮播图数据
router.get('/recommend/getBannerImages',service.getBannerImages);

//得到推荐歌单列表数据
router.get('/recommend/getSongList',service.getSongList);

router.get('/singer/getSingerList',service.getSingerList);
//歌曲库
router.get('/singer/getSongListbyId/:id',service.getSongListbyId);

router.get('/singer/getSongLrcById/:id',service.getSongLrcById);

router.get('/recommend/getRecSongsById/:id',service.getRecSongsById);

router.get('/category/getCategory',service.getCategory);

router.get('/category/getCategoryByTag/:tag',service.getCategoryByTag);

router.get('/search/getHotKey',service.getHotKey);

router.get('/search/searchList/:key',service.getSearchList);

router.get('/search/searchList2',service.getSearchList2);

router.get('/collection/:id',service.getSongById);
module.exports = router;