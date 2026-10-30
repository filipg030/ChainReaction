import http from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed=['index.html','style.css','app.js','game.js','puzzles.js','storage.js'];
http.createServer(async(req,res)=>{const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!allowed.includes(name)){res.writeHead(404);res.end('Not found');return;}try{const data=await readFile(new URL(name,import.meta.url));res.writeHead(200,{'Content-Type':name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(500);res.end('Unable to load app');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
