var A_TCALCONF={cssprefix:"tcal",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Su","Mo","Tu","We","Th","Fr","Sa"],longwdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],yearscroll:true,weekstart:0,prevyear:"Previous Year",nextyear:"Next Year",prevmonth:"Previous Month",nextmonth:"Next Month",format:"Y-m-d"};var A_TCALTOKENS=[{t:"Y",r:"19\\d{2}|20\\d{2}",p:function(a,b){a.setFullYear(Number(b));return a},g:function(a){var b=a.getFullYear();return b}},{t:"m",r:"0?[1-9]|1[0-2]",p:function(a,b){a.setMonth(Number(b)-1);return a},g:function(a){var b=a.getMonth()+1;return(b<10?"0":"")+b}},{t:"F",r:A_TCALCONF.months.join("|"),p:function(b,c){for(var a=0;a<12;a++){if(A_TCALCONF.months[a]==c){b.setMonth(a);return b}}},g:function(a){return A_TCALCONF.months[a.getMonth()]}},{t:"d",r:"0?[1-9]|[12][0-9]|3[01]",p:function(a,b){a.setDate(Number(b));if(a.getDate()!=b){a.setDate(0)}return a},g:function(a){var b=a.getDate();return(b<10?"0":"")+b}},{t:"j",r:"0?[1-9]|[12][0-9]|3[01]",p:function(a,b){a.setDate(Number(b));if(a.getDate()!=b){a.setDate(0)}return a},g:function(a){var b=a.getDate();return b}},{t:"l",r:A_TCALCONF.longwdays.join("|"),p:function(a,b){return a},g:function(a){return A_TCALCONF.longwdays[a.getDay()]}},{t:"S",r:"st|nd|rd|th",p:function(a,b){return a},g:function(a){n_date=a.getDate();if(n_date%10==1&&n_date!=11){return"st"}if(n_date%10==2&&n_date!=12){return"nd"}if(n_date%10==3&&n_date!=13){return"rd"}return"th"}}];function f_tcalGetHTML(k){var o=f_tcalGetInputs(true);if(!o){return}var p=A_TCALCONF.cssprefix,h=A_TCALCONF.format;var a=f_tcalParseDate(A_TCALCONF.today,A_TCALCONF.format);if(!a){a=f_tcalResetTime(new Date())}var j=f_tcalParseDate(o.value,h);if(!j){j=f_tcalParseDate(A_TCALCONF.selected,A_TCALCONF.format)}if(!j){j=new Date(a)}k=k?f_tcalResetTime(k):new Date(j);var d=new Date(k);d.setDate(1);d.setDate(1-(7+d.getDay()-A_TCALCONF.weekstart)%7);var b,g='<table id="'+p+'Controls"><tbody><tr>'+(A_TCALCONF.yearscroll?'<td id="'+p+'PrevYear" '+f_tcalRelDate(k,-1,"y")+' title="'+A_TCALCONF.prevyear+'"></td>':"")+'<td id="'+p+'PrevMonth"'+f_tcalRelDate(k,-1)+' title="'+A_TCALCONF.prevmonth+'"></td><th>'+A_TCALCONF.months[k.getMonth()]+" "+k.getFullYear()+'</th><td id="'+p+'NextMonth"'+f_tcalRelDate(k,1)+' title="'+A_TCALCONF.nextmonth+'"></td>'+(A_TCALCONF.yearscroll?'<td id="'+p+'NextYear"'+f_tcalRelDate(k,1,"y")+' title="'+A_TCALCONF.nextyear+'"></td>':"")+'</tr></tbody></table><table id="'+p+'Grid"><tbody><tr>';for(var f=0;f<7;f++){g+="<th>"+A_TCALCONF.weekdays[(A_TCALCONF.weekstart+f)%7]+"</th>"}g+="</tr>";var l,e,m=new Date(d);while(m.getMonth()==k.getMonth()||m.getMonth()==d.getMonth()){g+="<tr>";for(var c=0;c<7;c++){b=[];l=m.getDate();e=m.getMonth();if(m.getMonth()!=k.getMonth()){b[b.length]=p+"OtherMonth"}if(m.getDay()==0||m.getDay()==6){b[b.length]=p+"Weekend"}if(m.valueOf()==a.valueOf()){b[b.length]=p+"Today"}if(m.valueOf()==j.valueOf()){b[b.length]=p+"Selected"}g+="<td"+f_tcalRelDate(m)+(b.length?' class="'+b.join(" ")+'">':">")+l+"</td>";m.setDate(++l)}g+="</tr>"}g+="</tbody></table>";return g}function f_tcalRelDate(b,c,a){var a=(a=="y"?"FullYear":"Month");var d=new Date(b);if(c){d["set"+a](b["get"+a]()+c);if(d.getDate()!=b.getDate()){d.setDate(0)}}return' onclick="f_tcalUpdate('+d.valueOf()+(c?",1":"")+')"'}function f_tcalResetTime(a){a.setMilliseconds(0);a.setSeconds(0);a.setMinutes(0);a.setHours(12);return a}function f_tcalCancel(){var b=A_TCALCONF.cssprefix;var d=document.getElementById(b);if(d){d.style.visibility=""}var a=f_tcalGetInputs();for(var c=0;c<a.length;c++){f_tcalRemoveClass(a[c],b+"Active")}}function f_tcalUpdate(a,d){var c=f_tcalGetInputs(true);if(!c){return}d_date=new Date(a);var b=A_TCALCONF.cssprefix;if(d){var e=document.getElementById(b);if(!e||e.style.visibility!="visible"){return}e.innerHTML=f_tcalGetHTML(d_date,c)}else{c.value=f_tcalGenerateDate(d_date,A_TCALCONF.format);f_tcalCancel()}}function f_tcalOnClick(){var c=A_TCALCONF.cssprefix;var a=c+"Active";var b=f_tcalHasClass(this,a);f_tcalCancel();if(b){return}f_tcalAddClass(this,a);var d=f_getPosition(this,"Left"),e=f_getPosition(this,"Top")+this.offsetHeight;var f=document.getElementById(c);if(!f){f=document.createElement("div");f.onselectstart=function(){return false};f.id=c;document.getElementsByTagName("body").item(0).appendChild(f)}f.innerHTML=f_tcalGetHTML(null);f.style.top=e+"px";f.style.left=(d+this.offsetWidth-f.offsetWidth)+"px";f.style.visibility="visible"}function f_tcalParseDate(d,f){if(!d){return}var b,g="^",j={},i,a=0;for(var c=0;c<f.length;c++){b=f.charAt(c);if(A_TCALTOKENS_IDX[b]){j[b]=++a;g+="("+A_TCALTOKENS_IDX[b]["r"]+")"}else{if(b==" "){g+="\\s"}else{g+=(b.match(/[\w\d]/)?"":"\\")+b}}}var k=new RegExp(g+"$");if(!d.match(k)){return}var e,h=f_tcalResetTime(new Date());h.setDate(1);for(c=0;c<A_TCALTOKENS.length;c++){b=A_TCALTOKENS[c]["t"];if(!j[b]){continue}e=RegExp["$"+j[b]];h=A_TCALTOKENS[c]["p"](h,e)}return h}function f_tcalGenerateDate(b,a){var e,c="";for(var d=0;d<a.length;d++){e=a.charAt(d);c+=A_TCALTOKENS_IDX[e]?A_TCALTOKENS_IDX[e]["g"](b):e}return c}function f_tcalGetInputs(e){var b=document.getElementsByTagName("input"),c,d,a=[];for(n=0;n<b.length;n++){c=b[n];if(!c.type||c.type!="text"){continue}if(!f_tcalHasClass(c,"tcal")){continue}if(e&&f_tcalHasClass(c,A_TCALCONF.cssprefix+"Active")){return c}a[a.length]=c}return e?null:a}function f_tcalHasClass(b,c){var e=b.className;if(!e){return false}var a=e.split(" ");for(var d=0;d<a.length;d++){if(a[d]==c){return true}}return false}function f_tcalAddClass(a,b){if(f_tcalHasClass(a,b)){return}var c=a.className;a.className=(c?c+" ":"")+b}function f_tcalRemoveClass(c,d){var f=c.className;if(!f||f.indexOf(d)==-1){return false}var a=f.split(" "),b=[];for(var e=0;e<a.length;e++){if(a[e]==d){continue}b[b.length]=a[e]}c.className=b.join(" ");return true}function f_getPosition(c,e){var a=0,d,b=c;while(b){d=b["offset"+e];a+=d;b=b.offsetParent}b=c;while(b!=document.body){d=b["scroll"+e];if(d&&b.style.overflow=="scroll"){a-=d}b=b.parentNode}return a}function f_tcalInit(){if(!document.getElementsByTagName){return}var b,a=f_tcalGetInputs();for(var c=0;c<a.length;c++){b=a[c];b.onclick=f_tcalOnClick;f_tcalAddClass(b,A_TCALCONF.cssprefix+"Input")}window.A_TCALTOKENS_IDX={};for(c=0;c<A_TCALTOKENS.length;c++){A_TCALTOKENS_IDX[A_TCALTOKENS[c]["t"]]=A_TCALTOKENS[c]}}function f_tcalAddOnload(a){if(document.addEventListener){window.addEventListener("load",a,false)}else{if(window.attachEvent){window.attachEvent("onload",a)}else{var b=window.onload;if(typeof window.onload!="function"){window.onload=a}else{window.onload=function(){b();a()}}}}}f_tcalAddOnload(f_tcalInit);