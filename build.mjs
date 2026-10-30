import {mkdir,copyFile} from 'node:fs/promises';
import {puzzles} from './puzzles.js';
import {validate} from './game.js';
validate(puzzles);await mkdir('dist',{recursive:true});for(const file of ['index.html','style.css','app.js','game.js','puzzles.js','storage.js'])await copyFile(file,'dist/'+file);console.log('Production build ready in dist/');
