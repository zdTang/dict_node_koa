const request=require('./libs/request');
const fs=require('fs');
const JSDOM=require('jsdom').JSDOM;
const gbk=require('gbk');
const Mysql=require('mysql-pro');

let db=new Mysql({
  mysql: {
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: '',
    database: 'tmall_shouji'
  }
});

async function query(sql){
  await db.startTransaction();
  let data=await db.executeTransaction(sql);
  await db.stopTransaction();

  return data;
}

//
function html2$(html){
  let document=new JSDOM(html).window.document;
  return document.querySelectorAll.bind(document);
}

//
function indexParser(buffer){
  let $=html2$(html2$(buffer.toString())('textarea.f1')[0].value);
  return Array.from($('li')).map(li=>{
    let oA=li.getElementsByClassName('mod-g-photo')[0];

    return {
      url:          'https:'+oA.href,
      img_src:      'https:'+oA.children[0].getAttribute('data-lazyload-src'),
      name:         li.getElementsByClassName('mod-g-tit')[0].children[0].innerHTML,
      descrption:   li.getElementsByClassName('mod-g-desc')[0].innerHTML,
      price:        li.getElementsByClassName('mod-g-nprice')[0].innerHTML.match(/\d+(\.\d+)?/g)[0],
      sales:        li.getElementsByClassName('mod-g-sales')[0].innerHTML.match(/\d+/g)[0]
    };
  });
}

async function indexSpider(){
  try{
    let {body, headers}=await request('https://shouji.tmall.com/');
    let datas=indexParser(body);

    await indexProcessor(datas);
  }catch(e){
    console.log('index, 请求失败');
    console.log(e);
  }
}

async function indexProcessor(datas){
  //1.存到数据库
  for(let i=0;i<datas.length;i++){
    let rows=await query(`SELECT * FROM item_table WHERE url='${datas[i].url}'`);

    if(rows.length>0){
      await query(`UPDATE item_table SET img_src='${datas[i].img_src}',name='${datas[i].name}',descrption='${datas[i].descrption}',price='${datas[i].price}',sales='${datas[i].sales}' WHERE ID=${rows[0].ID}`);
    }else{
      await query(`INSERT INTO item_table (ID, url, img_src, name, descrption, price, sales) VALUES(0, '${datas[i].url}', '${datas[i].img_src}', '${datas[i].name}', '${datas[i].descrption}', '${datas[i].price}', '${datas[i].sales}')`);
    }
  }

  //2.继续抓取详情
  for(let i=0;i<datas.length;i++){
    await detailSpider(datas[i].url);
  }
}

//
async function detailSpider(url){
  try{
    let {body, headers}=await request(url);
    let data=detailParser(body);

    detailProcessor(data);
  }catch(e){
    console.log('detail, 请求失败');
    console.log(e);
  }
}

function detailParser(body){
  let $=html2$(gbk.toString('utf-8', body));

  let attributes={};

  Array.from($('.attributes-list li')).forEach(li=>{
    let n=li.innerHTML.search(/：|:/);
    if(n==-1)return;

    let key=li.innerHTML.substring(0, n);
    let val=li.innerHTML.substring(n+1);

    attributes[key]=val;
  });

  console.log(attributes);
}

async function detailProcessor(data){

}

//入口函数
(async ()=>{
  await indexSpider();
})();
