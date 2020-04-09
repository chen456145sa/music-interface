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
const hotkey = require('./data/hotkey.json');
const reclist = require('./data/reclist.json');
const reclistSong = require('./data/reclistSong.json');
const path =require('path');
const fs = require('fs');

const db = require('./db.js');


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

exports.getHotKey =function(req,res) {
	res.jsonp(hotkey);
}

exports.getSearchList =function(req,res) {
	let key = req.params.key;
	let obj = {
		singer: [],
		song: []
	};
	singer2.singerlist.forEach(item => {
		if(item.singer_name.indexOf(key)!=-1) {
			// console.log(item)
			obj.singer.push(item);
		}
	})
	songs.songList.forEach(item => {
		if(item.song_name.indexOf(key)!=-1 || item.singer_name.indexOf(key)!=-1) {
			// console.log(item)
			obj.song.push(item);
		}
	})
	// console.log(obj)
	res.jsonp(obj);
}

exports.getSearchList2 =function(req,res) {
	let key = req.query.key;
	let page = req.query.page;
	let perpage = req.query.perpage;
	let obj = {
		singer: [],
		song: []
	};
	console.log(page)
	let singerArr = [];
	let songArr = [];
	singer2.singerlist.forEach(item => {
		if(item.singer_name.indexOf(key)!=-1) {
			singerArr.push(item);
		}
	})
	songs.songList.forEach(item => {
		if(item.song_name.indexOf(key)!=-1 || item.singer_name.indexOf(key)!=-1) {
			songArr.push(item);
		}
	})
	//裁决数组
	singerArr.forEach((item,index) => {
		if(page == 1) {
			if(index<perpage) {
				obj.singer.push(item)
			}
		}else {
			if(index>(page-1)*perpage&&index<page*perpage) {
				obj.singer.push(item)
			}
		}	
	})
	songArr.forEach((item,index) => {
		if(page == 1) {
			if(index<perpage) {
				obj.song.push(item)
			}
		}else {
			if(index>(page-1)*perpage&&index<page*perpage) {
				obj.song.push(item)
			}
		}	
	})
	// console.log(req.query)
	res.jsonp(obj);
}

exports.getSongById = function(req,res) {
	let id = req.params.id;
	let song = {};
	songs.songList.forEach(element => {
		if(element.song_id == id) {
			song = element
		}
	});
	res.jsonp(song);
}

exports.getRecList =function(req,res) {
	let number = req.query.number;
	let tagGroup = req.query.tagGroup;
	let recArray = [];
	// console.log(tagGroup)
	// var rectemp = [...reclist.list];
	let rectemp = JSON.parse(JSON.stringify(reclist.list))  //数组复制（引用地址不同）
	rectemp.forEach((item,index)=> {
		if(tagGroup.indexOf(item.tag)>-1) {
			var i = 0;
			while(i< number) {
				//随机取一个元素
				if(item.list.length>=1) {
					recArray.push(item.list.splice( Math.floor(Math.random()*item.list.length), 1)[0]);
				}
				i++;
			}
			// console.log(item.tag)
			// console.log(item.list)
		}
	})
	// console.log(recArray)
	res.jsonp(recArray);
}

exports.getRecListSong = function(req,res) {
	let id = req.params.id;
	let list = [];
	reclistSong.songlist.forEach(element => {
		if(element.id == id) {
			list.push(element)
		}
	});
	res.jsonp(list);
}

exports.saveTag = function(req,res) {   //插入数据库
	// let id = req.query.id;
	let tag = req.query.tag;

	// let sql = 'INSERT INTO taglist(Id,tag,val) VALUES(?,?,?)';
	let sql = 'SELECT * FROM mytag.taglist where tag = ?';
	// let data = [2]; //表示？的东西
	let data = tag; //表示？的东西
	db.base(sql,data,(result)=>{
		console.log(result[0]);
		if(result[0] !== undefined) {
			console.log('值需要增加')
			let modSql = 'UPDATE mytag.taglist SET val = ? WHERE Id = ?';
			let newVal = result[0].val+1;
			let modSqlParams = [ newVal, result[0].id];

			db.base(modSql,modSqlParams,(result)=>{
				// console.log(result);
				console.log('增加成功')
			});


		}else {
			console.log('插入新对象')
			let addSql = 'INSERT INTO mytag.taglist(tag,val) VALUES(?,?)';
			let addSqlParams = [ tag , 1 ];
			db.base(addSql,addSqlParams,(result)=>{
				// console.log(result);
				console.log('插入成功')
			});

		}
	});

	res.jsonp(['tag收到']);
}

exports.getTag = function(req,res) {
	let sql = 'SELECT * FROM mytag.taglist';
	let data = null;
	// let arr = [] 
	db.base(sql,data,(result)=>{
		console.log(result);
		console.log('查询成功')
		// arr = [...result]
		res.jsonp(result);
	});
	// console.log(arr)
	
}

