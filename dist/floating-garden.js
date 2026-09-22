import * as THREE from 'three';
import { GLTFLoader } from './vendor/GLTFLoader.js';
const slots=[...document.querySelectorAll('.float-slot')];
let renderer;
try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{console.info('Floating garden: showing image fallbacks.');}
if(renderer){
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
 renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.domElement.className='floating-canvas';renderer.domElement.setAttribute('aria-hidden','true');document.body.append(renderer.domElement);
 const scene=new THREE.Scene();
 scene.add(new THREE.HemisphereLight(0xffffff,0x777255,3));
 const light=new THREE.DirectionalLight(0xffffff,4);light.position.set(-200,400,500);scene.add(light);
 const fill=new THREE.DirectionalLight(0xe6efff,2);fill.position.set(300,-100,400);scene.add(fill);
 const camera=new THREE.OrthographicCamera(0,innerWidth,innerHeight,0,0.1,2000);camera.position.z=1000;
 const models=[];let paused=document.documentElement.classList.contains('motion-paused');let previous=0;let elapsed=0;let raf=0;
 function resize(){renderer.setSize(innerWidth,innerHeight);camera.right=innerWidth;camera.top=innerHeight;camera.updateProjectionMatrix();draw();}
 function draw(){
  for(const item of models){
   const r=item.slot.getBoundingClientRect();item.group.visible=r.bottom>0&&r.top<innerHeight&&r.width>0;
   if(!item.group.visible)continue;
   const size=Math.min(r.width,r.height)*.80;
   item.group.scale.setScalar(size);
   item.group.position.set(r.left+r.width/2,innerHeight-r.top-r.height/2+Math.sin(elapsed*item.speed+item.phase)*5,0);
   item.group.rotation.set(Math.sin(elapsed*.4+item.phase)*.09,elapsed*item.spin+item.phase*.08,Math.sin(elapsed*.6+item.phase)*.10);
  }
  renderer.render(scene,camera);
 }
 function tick(time){raf=0;if(paused||document.hidden)return;if(!previous)previous=time;
  if(time-previous>40){elapsed+=Math.min((time-previous)/1000,.1);previous=time;draw();}
  raf=requestAnimationFrame(tick);
 }
 function start(){if(!raf&&!paused&&!document.hidden){previous=0;raf=requestAnimationFrame(tick)}}
 window.addEventListener('gg-motion',e=>{paused=e.detail.paused;if(paused){cancelAnimationFrame(raf);raf=0;draw()}else start()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else start()});
 window.addEventListener('resize',resize);window.addEventListener('scroll',()=>{if(paused)draw()},{passive:true});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);slots.forEach(s=>s.classList.remove('model-ready'));renderer.domElement.hidden=true;});
 const loader=new GLTFLoader();
 async function load(kind,path){
  try{
   const gltf=await loader.loadAsync(path);
   const box=new THREE.Box3().setFromObject(gltf.scene),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
   const scale=1/Math.max(size.x,size.y,size.z);
   for(const slot of slots.filter(s=>s.dataset.model===kind||(kind==='peace'&&s.dataset.model==='black'))){
    const model=gltf.scene.clone(true);model.position.copy(center).multiplyScalar(-scale);model.scale.setScalar(scale);
    model.traverse(o=>{if(!o.isMesh)return;o.material=o.material.clone();o.material.side=THREE.DoubleSide;
      if(slot.dataset.model==='black'){o.material.map=null;o.material.color.set('#292b29');o.material.metalness=.12;o.material.roughness=.65;}
      else if(kind==='peace'){o.material.metalness=.35;o.material.roughness=.3;}
    });
    const group=new THREE.Group();group.add(model);scene.add(group);
    models.push({slot,group,speed:.55+Math.random()*.4,spin:(.22+Math.random()*.25)*(Math.random()>.5?1:-1),phase:Math.random()*6.28});
    slot.classList.add('model-ready');
   }
   draw();
  }catch(error){console.warn('Floating garden model could not load:',kind,error.message)}
 }
 resize();Promise.all([load('plant','./assets/models/plant.glb'),load('peace','./assets/models/peace.glb')]).then(start);
}
