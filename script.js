const defaultEvents=[
{name:"Fellowship Meeting",date:"May 25, 2026",time:"2:00 PM - 4:30 PM",location:"Harar High School"},
{name:"Youth Leadership Training",date:"June 8, 2026",time:"9:00 AM - 3:00 PM",location:"Harar High School"},
{name:"Community Outreach",date:"June 22, 2026",time:"8:00 AM - 1:00 PM",location:"Harar City"}];
const defaultAnnouncements=[{title:"Welcome to our new website",text:"Our fellowship website is now online. More updates will be added here."},{title:"Join our next meeting",text:"Check the Events page for the latest schedule."}];
function get(key,fallback){return JSON.parse(localStorage.getItem(key)||"null")||fallback}
function renderEvents(){let el=document.getElementById("eventsList");if(!el)return;let events=get("events",defaultEvents);el.innerHTML=events.map(e=>`<article class="card"><h2>${e.name}</h2><p><b>${e.date}</b><br>${e.time}<br>${e.location}</p></article>`).join("")}
function renderHomeEvents(){let el=document.getElementById("homeEvents");if(!el)return;let events=get("events",defaultEvents);el.innerHTML=events.slice(0,3).map(e=>`<p><b>${e.name}</b><br>${e.date} · ${e.location}</p>`).join("")}
function renderAnnouncements(){let el=document.getElementById("announcementsList");if(!el)return;let a=get("announcements",defaultAnnouncements);el.innerHTML=a.map(x=>`<article class="card"><h2>${x.title}</h2><p>${x.text}</p></article>`).join("")}
const TELEGRAM_BOT_TOKEN="8989093642:AAFMmwGALPxZIFURKI5mceXVDaeONstyIWg";
const TELEGRAM_CHAT_ID="7010391875";
function sendToTelegram(formLabel,data){let lines=Object.entries(data).map(([k,v])=>`*${k}*: ${v}`).join("\n");let text=`📩 New ${formLabel} submission\n${lines}`;return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:TELEGRAM_CHAT_ID,text:text,parse_mode:"Markdown"})}).catch(err=>console.error("Telegram send failed:",err))}
function saveForm(id,key,status,label){let form=document.getElementById(id);if(!form)return;form.addEventListener("submit",e=>{e.preventDefault();let data=Object.fromEntries(new FormData(form));let arr=get(key,[]);arr.push({...data,submitted:new Date().toLocaleString()});localStorage.setItem(key,JSON.stringify(arr));sendToTelegram(label||id,data);form.reset();document.getElementById(status).textContent="Thank you. Your information has been saved successfully.";})}
function renderAdmin(){let j=document.getElementById("adminJoins"),p=document.getElementById("adminPartners");if(j){let a=get("joins",[]);j.innerHTML=a.length?a.map(x=>`<p><b>${x.name}</b><br>${x.phone}<br>${x.submitted}</p>`).join(""):"No applications yet."}if(p){let a=get("partners",[]);p.innerHTML=a.length?a.map(x=>`<p><b>${x.name}</b><br>${x.organization||""}<br>${x.phone}<br>${x.submitted}</p>`).join(""):"No requests yet."}}
function clearDemoData(){localStorage.removeItem("joins");localStorage.removeItem("partners");alert("Demo submissions cleared.");renderAdmin()}
renderHomeEvents();renderEvents();renderAnnouncements();renderAdmin();
saveForm("joinForm","joins","joinStatus","Join Us");saveForm("partnerForm","partners","partnerStatus","Partnership");