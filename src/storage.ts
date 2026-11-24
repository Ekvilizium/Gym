import {KEY,read,type State} from './engine';
export function loadState():State|null{return read(localStorage.getItem(KEY))}
export function saveState(state:State){const raw=JSON.stringify(state);read(raw);localStorage.setItem(KEY,raw)}
export function openPhotos():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const req=indexedDB.open('gym-media',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('photos'))req.result.createObjectStore('photos',{keyPath:'id'})};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
export type Photo={id:string;date:string;data:Blob};
export async function putPhoto(photo:Photo){const db=await openPhotos();try{await new Promise<void>((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').put(photo);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}finally{db.close()}}
export async function listPhotos():Promise<Photo[]>{const db=await openPhotos();try{return await new Promise((resolve,reject)=>{const req=db.transaction('photos').objectStore('photos').getAll();req.onsuccess=()=>resolve(req.result as Photo[]);req.onerror=()=>reject(req.error)})}finally{db.close()}}

export async function deletePhoto(id:string){const db=await openPhotos();try{await new Promise<void>((resolve,reject)=>{const tx=db.transaction('photos','readwrite');tx.objectStore('photos').delete(id);tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);tx.onerror=()=>reject(tx.error)})}finally{db.close()}}
