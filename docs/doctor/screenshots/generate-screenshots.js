#!/usr/bin/nodejs

const puppeteer = require('puppeteer');

// for showing mouse cursor
//const {installMouseHelper} = require('./install-mouse-helper');

(async() => {
const browser = await puppeteer.launch({ args: ['--no-sandbox'], defaultViewport: { width: 1440, height: 1280 }});
const page = await browser.newPage();
await page.goto('https://www.patient-pager.com/', {waitUntil: 'networkidle2'});
//await page.screenshot({path: '01-splash.png'});
//await page.emulateMedia('screen');
await page.pdf({path: '01-splash.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

await page.click('.room-create', {waitUntil: 'networkidle2'});
//await page.waitForSelector('.modal-close') //not sufficient to await
  //completion of animation
await page.waitFor(1000); // completion of animation
await page.screenshot({path: '02-roomcreated.png'});
await page.pdf({path: '02-roomcreated.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

// Testmodus aktivieren
await page.click(".modal-close");
await page.waitFor(1000); // completion of animation
await page.screenshot({path: '03-mainscreen.png'});
await page.pdf({path: '03-mainscreen.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});


// Versuch: Mauszeiger anzeigen mit install-mouse-helper 
  // Geht leider nicht so toll.
  // (injects html object at mouse position!)
//await installMouseHelper(page);
//var myWidget = await page.$(".doctor-title");
//var myWidget_box = await myWidget.boundingBox();
//x= myWidget_box.x + myWidget_box.width/2; 
//y= myWidget_box.y + myWidget_box.height/2;


await page.select('.doctor-title', 'Dr.');
  
//await page.mouse.click(x,y)
//await page.mouse.move(x, y);
//await page.mouse.down();
//await(1000);
  //
await page.click(".doctor-title");

//await page.hover("Dr.") //wrong

  // Zeigt bei screenshot als png das Titelauswahl-Menü an
  // Bei pdf/svg export wird das Auswahlmenü leider nicht angezeigt.
await page.screenshot({path: '04-titleselector.png'});
await page.pdf({path: '04-titleselector.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

await page.click(".doctor-title");
//await page.mouse.up();
  
await page.type(".doctor-first-name", "Leonard");
await page.type(".doctor-name", "McCoy");

await page.screenshot({path: '05-doctordata.png'});
await page.pdf({path: '05-doctordata.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

await page.hover(".doctor-create");
await page.waitFor(300);
await page.screenshot({path: '06-doctorcreate.png'});
await page.pdf({path: '06-doctorcreate.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});



await page.mouse.move(0,0); //unhover
await page.waitFor(300);

await page.click(".doctor-create");
await page.screenshot({path: '07-doctorappears.png'});
await page.pdf({path: '07-doctorappears.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

await page.type(".doctor-first-name", "Beverley");
await page.type(".doctor-name", "Crusher");
await page.click(".doctor-create");


await page.type(".user-first-name", "James T.");
await page.type(".user-name", "Kirk");
await page.type(".user-phone", "+4916011223344");
await page.click(".doctor-select");

await page.screenshot({path: '08-userdata.png'});
await page.pdf({path: '08-userdata.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});

await page.click(".user-create");
await page.waitFor(300);
await page.screenshot({path: '09-userappears.png'});
await page.pdf({path: '09-userappears.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});
await page.waitFor(5000);
await page.screenshot({path: '10-userappears-no-topright-no-sms-box.png'});
await page.pdf({path: '10-userappears-no-topright-no-sms-box.pdf', printBackground: true, scale: 0.5, margin:{bottom:'7.2cm', top:'7.2cm'}});



await browser.close();
})();


