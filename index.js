const puppeteer = require('puppeteer');//using puppeteer
const data=require("./config.json");//using json file
let noOfPosts=process.argv[2];
(async function()  {
  const browser = await puppeteer.launch({headless: false});//launching browser
  const page = await browser.newPage();//opening new page 
  await page.goto('https://www.instagram.com/',{waitUntil: "networkidle2"});//for visiting any url n browser//and wait until page is loaded
  //await page.screenshot({path: 'example.png'});
await page.type("input[name='username']",data.user,{delay:100});
await page.type("input[name='password']",data.pwd,{delay:100});
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2"}),
  await page.click("button[type='submit']"),
]);
await page.type("input[placeholder='Search']","pepper_pepcoding");
await page.waitForSelector(".drKGC .fuqBx a",{visible:true});
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2"}),
  await page.click(".drKGC .fuqBx a"),
]);
await page.waitForSelector("._9AhH0",{visible:true});
await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2"}),
  page.click("._9AhH0"),
]);//first post will be opened

//applying do while loop,for liking multiple posts .
let i=0;
do{
  await page.waitForSelector(".fr66n button");
  await page.click(".fr66n button");
//liking first post
  await Promise.all([
  page.waitForNavigation({ waitUntil: "networkidle2"}),
  page.click("._65Bje.coreSpriteRightPaginationArrow"),
  ]);//after liking move to next post  
}while(i<noOfPosts){
}
 // await browser.close();
})();