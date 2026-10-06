const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  const page=await browser.newPage({viewport:{width:1600,height:1067},deviceScaleFactor:1});
  await page.goto(pathToFileURL(path.resolve('UDL-Planning-Portfolio.html')).href);
  await page.pdf({path:'UDL-Planning-Portfolio.pdf',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:8px;width:100%;text-align:center;color:#556">UDL Planning Portfolio · <span class="pageNumber"></span> / <span class="totalPages"></span></div>',tagged:true});
  await page.goto(pathToFileURL(path.resolve('preview.html')).href);
  const overflow=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
  await page.screenshot({path:'preview.png',fullPage:true});
  console.log(JSON.stringify({preview:overflow,pdf:'UDL-Planning-Portfolio.pdf'}));
  await browser.close();
})();
