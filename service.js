/**
 * 业务模块
 */
// const data = require('./data.json');
// const newInfo = require('./newInfo.json');
// const comments = require('./comment.json');
// const category = require('./category.json');
// const images = require('./images.json');
// const goodList = require('./goodList.json');
// const goodInfo = require('./goodInfo.json');
// const cartgoodInfo = require('./cartgoodInfo.json');
const bannerImages = require('./data/bannerImage.json');
const recommendList = require('./data/recommendList.json');
const singer2 = require('./data/singer2.json');
const songs = require('./data/songs.json');
const recommendSongs = require('./data/recommendSongs.json');
const category = require('./data/category.json');
const categorySongs = require('./data/categorySongs.json');
const path =require('path');
const fs = require('fs');


//app.get('/', (req, res)=> {
//	//res.sendFile(__dirname + '/' +'interface.html');
//});
//res.json();
//app.get('/allBooks', (req, res)=> {
//		res.json(result);            
//});
//app.get('/newslist', (req, res)=> {
//	res.jsonp(data);
//});

////获取数据的方法：
//let data2 = req.params;  //restful 参数的获取
//let d3 = req.query; //可以获得?后面的参数

//get方式获取id
//let id = req.query.id;

//post方式获取表单数据
//let info = req.body;


//res.jsonp(); 解决跨域问题。  访问的url可以加callback = fn
//获取新闻列表
// exports.getNewList = function(req,res) {
// 	res.jsonp(data);
// }

// exports.getNewInfo = function(req,res) {
// 	res.jsonp(newInfo);
// }

// exports.getComments = function(req,res) {
// 	//let data2 = req.params;  //restful 参数的获取
// 	//let d3 = req.query; //可以获得?后面的参数
// 	//get方式获取id
// 	//let id = req.query.id;
// 	//post方式获取表单数据
// 	//let info = req.body;
	
// 	res.jsonp(comments);
// }

// exports.getimgcategory = function(req,res) {
// 	res.jsonp(category);
// }

// exports.getimages = function(req,res) {
// 	let id = req.params.id;
// 	images.message.forEach(item => {
// 		if(item.category == id) {
// 			res.jsonp(item.list);
// 		}
// 	})
	
// }

// exports.getGoodList = function(req,res) {
// 	//console.log(req.query);
// 	let page = req.query.pageIndex;
// 	goodList.message.forEach( item =>{
// 		if(item.pageIndex == page) {
// 			res.jsonp(item.list);
// 		}
// 	})
// }

// exports.getGoodInfo = function(req,res) {
// 	let id = req.params.id;
// 	goodInfo.message.forEach(item => {
// 		if(item.id == id) {
// 			res.jsonp(item);
// 		}
// 	})
	
// }

// exports.getshopcarlist = function(req,res) {
// 	let id = req.params.id;
// //	id = id.split("");
// //	console.log("id:"+id);
// //	let arr = [];
// //	id.forEach(item => {  //提取id
// //		if(item!=",") {
// //			arr.push(item);
// //		}
// //	})
// //	console.log("arr:"+arr);
// 	//console.log("id:"+id);
// 	let arr2 = [];
	
// 	cartgoodInfo.message.forEach(item => {
// 		if(id.indexOf(item.id)>= 0) {
// 			arr2.push(item)
// 		}
// 	})
// 	//console.log(arr2);
// 	res.jsonp(arr2);
// }


exports.getBannerImages =function(req,res) {
	res.jsonp(bannerImages);
}

exports.getSongList =function(req,res) {
	res.jsonp(recommendList);
}

exports.getSingerList =function(req,res) {
	res.jsonp(singer2);
}

exports.getSongListbyId =function(req,res) {
	let singerId = req.params.id;
	let songLists = [];
	songs.songList.forEach(element => {
		if(element.singer_id == singerId) {
			songLists.push(element);
		}
	});
	res.jsonp(songLists);
}

exports.getSongLrcById =function(req,res) {
	let songId = req.params.id;
	console.log(songId)
	songs.songList.forEach(element => {
		if(element.song_id == songId) {
			// res.sendFile(element.songlrc);
			res.sendFile( __dirname + "/" + "public/lrc/"+element.songlrc);
			return
		}
	});
	// res.sendFile( __dirname + "/" + "public/lrc/"+element.songlrc);
}


exports.getRecSongsById =function(req,res) {
	let id = req.params.id;
	recommendSongs.songlist.forEach(item => {
		if(item.id == id) {
			res.jsonp(item);
			return
		}
	})
}


exports.getCategory =function(req,res) {
	res.jsonp(category);
}

exports.getCategoryByTag =function(req,res) {
	let tag = req.params.tag;
	console.log(tag)
	let arr = []
	categorySongs.songlist.forEach(item => {
		if(item.tag == tag) {
			arr.push(item)
		}
	})
	res.jsonp(arr);
	// res.jsonp(category);
}