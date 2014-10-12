//essentials
var camera, scene, renderer
var windowX=window.innerWidth, windowY=window.innerHeight;

moveq = new Array(4);
dirq = new Array(4);

var t;

//objects
var building, plant, plane, texture;



//
const PI=Math.PI;
const camspd=100;
const turnspd=PI/32;
var rotY=0;

//main declarations
init();
animate();



//initilization
function init() {
    
    //renderer to display all things: WebGL
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( windowX, windowY );
    document.body.appendChild( renderer.domElement );
    
    
    //create the camera object
    camera = new THREE.PerspectiveCamera( 75, windowX / windowY, 1, 10000 );
    camera.position.set(0,5,1000);
    
    //include a camera: object-oriented
    controls = new THREE.OrbitControls( camera );
    
    //tron texture for THE GRID    TEXTURE MUST BE A POWER OF TWO
    texture = new THREE.ImageUtils.loadTexture("TRON_Tile.png");
    texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
    texture.repeat.set(100,100);
    texture.anisotropy=renderer.getMaxAnisotropy();
    
    
    
    
    //random blender stuff
    
    loader = new THREE.JSONLoader();
    
    
    function lld( geometry ) {
        monkey = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        monkey.scale.set( 500, 500, 500 );
        monkey.position.set(0,1000,0);
        scene.add(monkey);
        
    }
    
    function lld2( geometry ) {
        wow = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
        wow.scale.set( 500, 500, 500 );
        wow.position.set(1000,1000,1000);
        wow.rotation.y +=PI;
        scene.add(wow);
        
    }
    
    loader.load( "test.js", lld);
    loader.load( "wow.js", lld2);
    
    
    
    
    //create THE GRID
    plane = new THREE.Mesh( new THREE.PlaneGeometry(10000, 10000), new THREE.MeshBasicMaterial(
        
        {
            color: 0x00ddff,
            map:texture
        }
        //this is a javascript object
    ));
    plane.position.set(0, 0, 0);
    //put THE GRID in the xz-plane\/
    plane.rotation.x=-PI/2;
    
    
    building = new THREE.Mesh(new THREE.BoxGeometry(50,1000,50), new THREE.MeshBasicMaterial(
        {
            color: 0x00ddff,
            wireframe: true
        }
    ));
    
    building.position.y+=500+1;
    
    
    plant = new THREE.Mesh(new THREE.BoxGeometry(50,100,50), new THREE.MeshBasicMaterial(
        {
            color: 0xffdd00,
            wireframe: true
        }
    ));
    
    plant.position.set(100,50+1,0);
    
    
    //add objects to scene
    scene = new THREE.Scene();
    scene.add(camera, plane, plant, building);
    
    
    
    //add event listeners
    document.addEventListener('keydown', movecamtr, false);
    document.addEventListener('keyup', movecamfa, false);
    
    /*KEYCODES
    w - 87   moveq[0]
    a - 65   moveq[2]
    s - 83   moveq[1]
    d - 68   moveq[3]
    
    q - 81   dirq[0]
    e - 69   dirq[1]
    r - 82   dirq[2]
    f - 70   dirq[3]
    */
    
    function movecamtr(event){
        
        if(event.keyCode==87){//if w pressed
           moveq[0]=true;
        }
        if(event.keyCode==83){//if s pressed
            moveq[1]=true;
        }
        if(event.keyCode==65){//if a pressed
            moveq[2]=true;
        }
        if(event.keyCode==68){//if d pressed
            moveq[3]=true;
        }  
        
        if(event.keyCode==81){//if q pressed
            dirq[0]=true;
        }
        if(event.keyCode==69){//if q pressed
            dirq[1]=true;
        }
        if(event.keyCode==82){//if r pressed
            dirq[2]=true;
        }
        if(event.keyCode==70){//if f pressed
            dirq[3]=true;
        }
    }
    function movecamfa(event){
        
        if(event.keyCode==87){//if w released
           moveq[0]=false;
        }
        if(event.keyCode==83){//if w released
            moveq[1]=false;
        }
        if(event.keyCode==65){//if w released
            moveq[2]=false;
        }
        if(event.keyCode==68){//if w released
            moveq[3]=false;
        }
            
        if(event.keyCode==81){//if q released
            dirq[0]=false;
        }
        if(event.keyCode==69){//if q released
            dirq[1]=false;
        }
        if(event.keyCode==82){//if r released
            dirq[2]=false;
        }
        if(event.keyCode==70){//if f released
            dirq[3]=false;
        }
        
        
        
    }
    
    
    
    //end of init()
}



function animate() {
    
    //constant @ 100 "FPS"
    //Date() involves milliseconds
    
    var frame = new Date();
    var curr = new Date();
    while(curr-frame<10){
        curr = new Date();
    }
    t+=10/1000;
    requestAnimationFrame( animate );
    render();
}


function render() {
    
    
    //
    
    
    //trigonometry to ensure magnitude of camera movement vector (in zx-plane) always has magnitude of
    //10pxl/s in any direction
    
    //rotation in y-axis (verticle) is rotY (IN RADIANS NOT DEGREES!!) 
    //since camera.rotation.y is not modular
    if(camera.rotation.y===NaN){
        rotY=0;
        
    }else{
        rotY=camera.rotation.y;
        rotY = (Math.abs(rotY)%(2*PI));
        
    }
    
    
    
    //camera.position.z+=camspd*Math.sin(rotY);
    //camera.position.x+=camspd*Math.sin(rotY);
    if(dirq[0]==true){//q key
        camera.rotation.y+=turnspd;
        console.log(Math.round(rotY*1000)/1000);
    }
    if(dirq[1]==true){//e key
        camera.rotation.y-=turnspd;
        console.log(Math.round(rotY*1000)/1000);
    }
    
    
    
    if(dirq[2]==true){//r key
        camera.position.y+=camspd;
        
    }
    if(dirq[3]==true){//f key
        camera.position.y-=camspd;
        
    }
    
    
    if(moveq[0]==true){//w key
        camera.position.z-=Math.sqrt(camspd)*(Math.cos(rotY));
        camera.position.x+=Math.sqrt(camspd)*(Math.sin(rotY));
    }
    if(moveq[1]==true){//s key
        camera.position.z+=Math.sqrt(camspd)*(Math.cos(rotY));
        camera.position.x-=Math.sqrt(camspd)*(Math.sin(rotY));
    }
    if(moveq[2]==true){//a key
        camera.position.x-=Math.sqrt(camspd)*(Math.sin(rotY+PI/2));
        camera.position.z+=Math.sqrt(camspd)*(Math.cos(rotY+PI/2));
    }
    if(moveq[3]==true){//d key
        camera.position.x+=Math.sqrt(camspd)*(Math.sin(rotY+PI/2));
        camera.position.z-=Math.sqrt(camspd)*(Math.cos(rotY+PI/2));
    }
    /*
    if(moveq[0]==true){//w key
        camera.position.z-=camspd;
    }
    if(moveq[1]==true){//s key
        camera.position.z+=camspd;
    }
    if(moveq[2]==true){//a key
        camera.position.x-=camspd;
    }
    if(moveq[3]==true){//d key
        camera.position.x+=camspd;
    }
    */
    renderer.render( scene, camera ); 
    
    
}