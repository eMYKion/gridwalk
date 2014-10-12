var camera, scene, renderer
var plane, cube, cube2;
 
var mouseX=0, mouseY=0;

var w=0,a=0; 
var windowX=window.innerWidth, windowY=window.innerHeight; 
var t=0;

const PI=Math.PI;
        
init();
animate();


function init() {
    scene = new THREE.Scene();
        
    camera = new THREE.PerspectiveCamera( 75, windowX / windowY, 1, 2000 );
    camera.position.set(0,0,1000);
//    camera.rotation.x = -PI/3;
        
    controls = new THREE.OrbitControls( camera );
        
    plane = new THREE.Mesh( new THREE.PlaneGeometry(1000, 1000), new THREE.MeshBasicMaterial( {color: 0xdddddd, side: THREE.DoubleSide } ) );
        
    cube = new THREE.Mesh(new THREE.BoxGeometry(50,50,50), new THREE.MeshBasicMaterial({color:0xff0000}));
        
    cube2 = new THREE.Mesh(new THREE.BoxGeometry(50,500,500), new THREE.MeshBasicMaterial({color:0xff0000}));
        
    //shape = new THREE.Mesh(new THREE., new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true}));
        
        
    scene.add( plane, cube, cube2 );
    plane.position.x = 0;
    plane.position.y = -10;
    plane.position.z = 0;
    plane.rotation.x = -PI/2;
        
        
    cube.position.x = 0;
    cube.position.y = 200;
    cube.position.z = -250;
        
    cube2.position.x = 100;
    cube2.position.y = 200;
    cube2.position.z = -250;
        
    cube.rotation.z = PI/3;
        
        
       
        
        
    //this is an unnecessary comment
        
        
        
        
        
        
        
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( windowX, windowY );
        
    document.body.appendChild( renderer.domElement );
        
        
        
//    document.addEventListener('mousemove',OnMouseMove,false);
        
//    function OnMouseMove(event){
//        mouseX=event.clientX;
//        mouseY=event.clientY;
//    }
//        
//    document.addEventListener('keydown',OnKeyPress,false);
//        
//    function OnKeyPress(event){
//        if(event.charCode==116){
//            w+=10;
//        }else if(event.cherCode==116){
//            w-=10;
//        }
//            
//            
//    }
       
}
    
function animate() {
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    render();
}
 
function render() {
    
    t+=1;
    
    
    //camera.rotation.y=Math.cos(t/100);
    
//    console.log("camera:\n\t("+camera.position.x+","+camera.position.y+","+camera.position.z+")\n\trot:("+
//    camera.rotation.x+","+camera.rotation.y+","+camera.rotation.z+")");
//    camera.position.y=1020;//+500*Math.cos(t/100);
    
    
    cube.rotation.y += PI/32;
    cube.position.y = 200+10*Math.cos(t/5);
    
    cube2.rotation.x +=PI/32;
    cube2.scale.set(1,1,Math.abs(Math.cos(t/50)));
    cube2.position.x=200+10*Math.cos(t/5);
    //moving camera according to mouse
//    camera.rotation.x= -PI/3+PI/2048*(mouseY-windowY/2);
//    camera.rotation.y=PI/2048*(mouseX-windowX/2);
//    camera.position.z=-1*w;
    
    /*
    if(){
    }else if(){
    }else if(){
    }else if(){
    }else{
    }
    */
    
    renderer.render( scene, camera );  
    
    //plane.position.y+=5;
   
}