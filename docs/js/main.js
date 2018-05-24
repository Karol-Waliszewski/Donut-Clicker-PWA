"use strict";!function e(n,t,r){function o(a,c){if(!t[a]){if(!n[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+a+"'")}var l=t[a]={exports:{}};n[a][0].call(l.exports,function(e){var t=n[a][1][e];return o(t||e)},l,l.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(require,module,exports){var DonutModule=function(){var $donut=document.querySelector("#donut"),$clicks=document.querySelector("#clicks"),$money=document.querySelector("#money"),money=0,clicks=0,moneyOnClick=1,moneyPerTime=1,moneyEveryTime=3e5,database,countClick=function(){clicks++,$clicks.innerHTML=clicks,saveProgress("clicks",clicks)},clickMoney=function(){money+=moneyOnClick,$money.innerHTML=money,saveProgress("money",money)},timeMoney=function e(){money+=moneyPerTime,$money.innerHTML=money,setTimeout(e,moneyEveryTime)},openDatabase=function(e){var n=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,t=n.open("DonutClicker",1);t.onerror=function(e){console.error("[IndexedDB] Opening error.")},t.onsuccess=function(n){console.log("[IndexedDB] Database initialised."),database=n.target.result,database.onerror=function(e){console.error("[IndexedDB] error: "+e.target.errorCode)},e()},t.onupgradeneeded=function(n){if(console.log("[IndexedDB] Database upgrade."),database=n.target.result,!database.objectStoreNames.contains("ClickerStore")){var t=database.createObjectStore("ClickerStore",{keyPath:"key"});t.createIndex("key","key",{unique:!0}),t.createIndex("value","value",{unique:!1}),e()}}},closeDatabase=function(){database.close(),database=null},saveProgress=function(e,n){if(!database)return alert("Open database at first"),!1;database.transaction(["ClickerStore"],"readwrite").objectStore("ClickerStore").put({key:e,value:n}).onerror=function(e){console.error("[IndexedDB] Error: "+e)}},loadProgress=function loadProgress(){if(!database)return alert("Open database at first"),!1;var tx=database.transaction(["ClickerStore"],"readwrite"),store=tx.objectStore("ClickerStore"),request=store.openCursor();request.onsuccess=function(e){var cursor=e.target.result;cursor&&(eval(cursor.value.key+" = "+cursor.value.value),cursor.continue())}},Upgrade=function(e){this.level=1,this.btn=e.btnElement,this.rM=e.requiredMoney,this.mM=e.moneyMultiplier,this.oM=e.obtainedMoney,this.uM=e.upgradeMultiplier,this.dE=e.donutElement,e.hasOwnProperty("statElement")&&(this.sE=e.statElement)};Upgrade.prototype.boost=function(){if(money<this.rM)return!1;this.level++,this.btn.previousElementSibling.children[1].innerHTML=this.level,money-=this.rM,$money.innerHTML=parseInt(money),this.checkUpgradeAvailable(),this.rM=this.rM*this.mM,this.oM=parseInt(this.oM*this.uM),this.hasOwnProperty("sE")&&(this.sE.innerHTML=this.oM);var e=getRandomColor();return this.dE.forEach(function(n){n.style.fill=e}),parseInt(this.oM)},Upgrade.prototype.checkUpgradeAvailable=function(){this.rM<=money?this.btn.parentElement.classList.remove("disabled"):this.btn.parentElement.classList.add("disabled")};var clickUpgrade=new Upgrade({requiredMoney:40,obtainedMoney:1,moneyMultiplier:3,upgradeMultiplier:2,btnElement:document.querySelector("#clickUpgrade"),donutElement:document.querySelectorAll(".donut__topping")}),moneyEveryTimeUpgrade=new Upgrade({requiredMoney:200,obtainedMoney:300,moneyMultiplier:2.5,upgradeMultiplier:.97,btnElement:document.querySelector("#timeUpgrade"),statElement:document.querySelector("#moneyEveryTime"),donutElement:document.querySelectorAll(".donut__frostig")}),moneyPerTimeUpgrade=new Upgrade({requiredMoney:100,obtainedMoney:1,moneyMultiplier:3.5,upgradeMultiplier:2.5,btnElement:document.querySelector("#moneyTimeUpgrade"),statElement:document.querySelector("#moneyPerTime"),donutElement:document.querySelectorAll(".donut__cake")}),handleEvents=function(){$donut.addEventListener("click",function(){countClick(),clickMoney()}),$donut.addEventListener("mousedown",function(e){e.preventDefault()},!1),clickUpgrade.btn.addEventListener("click",function(){moneyOnClick=clickUpgrade.boost()||moneyOnClick}),moneyEveryTimeUpgrade.btn.addEventListener("click",function(){moneyEveryTime=1e3*moneyEveryTimeUpgrade.boost()||moneyEveryTime,window.clearTimeout(timeMoney),setTimeout(timeMoney,moneyEveryTime)}),moneyPerTimeUpgrade.btn.addEventListener("click",function(){moneyPerTime=moneyPerTimeUpgrade.boost()||moneyPerTime})},setStats=function(){document.querySelector("#moneyEveryTime").innerHTML=moneyEveryTime/1e3,document.querySelector("#moneyPerTime").innerHTML=moneyPerTime,$clicks.innerHTML=clicks,$money.innerHTML=money},setIntervals=function(){setTimeout(timeMoney,moneyEveryTime),setInterval(clickUpgrade.checkUpgradeAvailable.bind(clickUpgrade),200),setInterval(moneyEveryTimeUpgrade.checkUpgradeAvailable.bind(moneyEveryTimeUpgrade),200),setInterval(moneyPerTimeUpgrade.checkUpgradeAvailable.bind(moneyPerTimeUpgrade),200)},init=function(){handleEvents(),openDatabase(function(){loadProgress(),setStats(),setIntervals()})}()}()},{}],2:[function(e,n,t){e("./donut.js"),e("./randomColor.js"),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("Service-Worker.js").then(function(e){console.log("ServiceWorker registration successful with scope:",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})})},{"./donut.js":1,"./randomColor.js":3}],3:[function(e,n,t){},{}]},{},[2]);
//# sourceMappingURL=maps/main.js.map