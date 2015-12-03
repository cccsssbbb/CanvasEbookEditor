function getCurrentCanvas(){
	return canvasAll[$("#currentPage").val()-1];
}

function uploadCanvas(a){
	if(a==null){
		a=getCurrentCanvas();
	}
	a.deactivateAll().renderAll();
	$(".filename").val($("#currentPage").val());
	document.getElementById("imageContent").value=a.toDataURL("image/png");
	return true;
}

function submitToSave(a){
	$(".filename").val($("#currentPage").val());
	document.getElementById("jsonContent").value=a;
	return true;
}

function downloadCanvas(a,b){
	if(b==null){
		b=getCurrentCanvas()
	}
	b.deactivateAll().renderAll();
	var c=document.createElement("a");
	c.setAttribute("href",b.toDataURL());
	c.setAttribute("download",a);
	c.style.display="none";
	document.body.appendChild(c);
	c.click();
	document.body.removeChild(c);
}

function download(a,c){
	var b=document.createElement("a");
	b.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(c));
	b.setAttribute("download",a);
	b.style.display="none";
	document.body.appendChild(b);
	b.click();
	document.body.removeChild(b);
}

function loadSVG(b){
	if(b==null){
		b=getCurrentCanvas();
	}
	var a=document.getElementById("loadFile").value;
	fabric.loadSVGFromURL(a,function(d,c){
		var e=fabric.util.groupSVGElements(d,c);
		b.add(e).renderAll()
	});
}

function loadJSON(d,b){
	if(d==null){
		d=getCurrentCanvas();
	}
	var c;
	var a;
	if(b==null){
		$("#loadFile").val($("#currentPage").val()+".json");
		c=document.getElementById("loadFile").value;
		a="private.php?img="+c;
	} else {
		c=b;
		a=c;
	}
	var f;
	if(window.XMLHttpRequest){
		f=new XMLHttpRequest()
	} else {
		if(window.ActiveXObject){
			f=new ActiveXObject("Microsoft.XMLHTTP")
		}
	}
	var e=false;
	f.onreadystatechange=function(){
		var g=f.responseText;
		if(g.indexOf("object")>-1){
			if(!e){
				document.getElementById("tmpJSON").value=g;
				d.loadFromDatalessJSON(g);
				var h=500;
				setTimeout(function(){
					d.renderAll()
				},h);
				e=true;
			}
		}
	};
	f.open("GET",a);
	f.send();
}

function deleteItems(a){
	if(a==null){
		a=getCurrentCanvas()
	}
	if(a.getActiveGroup()){
		a.getActiveGroup().forEachObject(function(b){
			a.remove(b);
		});
		a.discardActiveGroup().renderAll();
	} else {
		a.remove(a.getActiveObject());
	}
}

function changeLayer(a){
	canvas=getCurrentCanvas();
	if(canvas.getActiveGroup()){
		canvas.getActiveGroup().forEachObject(function(b){
			changeLayerCase(a,b);
		});
		canvas.renderAll();
	} else {
		changeLayerCase(canvas,a,canvas.getActiveObject());
	}
}

function changeLayerCase(a,c,b){
	if(a==null){
		a=getCurrentCanvas()
	}
	switch(c){
		case 1:
			a.bringForward(b);
			break;
		case 2:
			a.sendBackwards(b);
			break;
		case 3:
			a.sendToBack(b);
			break;
		default:
			a.bringToFront(b);
	}
}

var hasVideo=[];

var canvasAll=[];
$("canvas").each(function(){
	
	var a=new fabric.Canvas(this.id,{
		renderOnAddRemove:false
	});
	a.setHeight(768);
	a.setWidth(1024);
	a.setBackgroundImage("img/Desert.jpg",a.renderAll.bind(a),{
		originX:"left",
		originY:"top",
		left:canvasAll.length*10,
		top:canvasAll.length*10
	});
	loadJSON(a,"saved/load1.json");
	a.selectionBorderColor = 'red';
	a.on('object:selected', function(e){ 
	var obj = e.target;
	/*
		a.forEachObject(function(obj){
			try {
				console.log(obj.selected);
				
				if (obj["_element"].toString().indexOf("HTMLVideoElement") > -1) {
					/ *
					for (key in obj) {
						if (obj[key] != null && obj[key].toString().indexOf("function") != 0) {
							console.log("case 1 : " + key + " => " + obj[key]);
						}
					}
					* /
					console.log("----------------------------------------");					
				} else {
					console.log("not video : " + obj["_element"]);
					console.log("=====================================");
				}
				
				if (obj["_element"]["id"] != null) {
					console.log("case 1.1 : id => " + obj["_element"]["id"]);
				}
				/ *
				for (key in obj["_element"]) {
					if (obj["_element"][key] != null && obj["_element"][key].toString().indexOf("function") != 0) {
						console.log("case 1.1 : " + key + " => " + obj["_element"][key]);
					}
				}
				* /
				console.log("=====================================");
				
			} catch (e) {
				
			}
		  
		  obj.set({			
			cornerColor: 'red',
			cornerSize: 10,
			transparentCorners: true
		  });
		});
		*/
				if (obj["_element"] != null) { 
					if (obj["_element"]["id"] != null) {
						console.log(obj["_element"] + " => " + obj["_element"]["id"]);
					} else {
						console.log(obj["_element"]);
					}
				} else {
					console.log("_element null");
				}
				
		  obj.set({			
			cornerColor: 'red',
			cornerSize: 10,
			transparentCorners: true
		  });		
	});
	
	canvasAll.push(a);
	
	a.on('mouse:move', function() {
		if (!hasVideo[canvasAll.indexOf(a)]) {
			hasVideo[canvasAll.indexOf(a)] = true;
			
			var canvas = a;
			//var video1El = document.getElementById('video1');
			var video1El = document.createElement('video');
			video1El.src = 'http://html5demos.com/assets/dizzy.mp4';
			video1El.id= 'video' + canvasAll.indexOf(a) + '1';
			video1El.class= 'myvideo';
			video1El.width = 480;
			video1El.height = 360;
			video1El.loop = true;
			
			//var video2El = document.getElementById('video2');
			var video2El = document.createElement('video');
			video2El.src = 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4';
			video2El.id= 'video' + canvasAll.indexOf(a) + '2';
			video2El.class= 'myvideo';
			video2El.width = 480;
			video2El.height = 360;			
			video2El.loop = true;

			var video1 = new fabric.Image(video1El, {
			  left: 350,
			  top: 300,
			  angle: -15,
			  originX: 'center',
			  originY: 'center'
			});

			var video2 = new fabric.Image(video2El, {
			  left: 800,
			  top: 350,
			  angle: 15,
			  originX: 'center',
			  originY: 'center'
			});

			canvas.add(video1);
			video1.getElement().play();

			canvas.add(video2);
			video2.getElement().play();

			fabric.util.requestAnimFrame(function render() {
			  canvas.renderAll();
			  fabric.util.requestAnimFrame(render);
			});
		}
	});
});

function loadApp(){
	$(".flipbook").turn({
		width:2048,
		height:768,
		elevation:50,
		gradients:true,
		autoCenter:false}
	);
}

yepnope({
	test:Modernizr.csstransforms,
	yep:["lib/turn.js"],
	nope:["lib/turn.html4.min.js"],
	both:["css/basic.css"],
	complete:loadApp
});

$(".flipbook").bind("turned",function(c,d,a){
	$("#currentPage").val(d);
	try{
		canvasAll[d].renderAll()
	} catch(b) {
		console.log(b);
	}
});

function changePage(b){
	var a=$("#currentPage").val()*1;
	if(b==-1){
		a=a-1;
	}
	if(b==-2||a<1){
		a=1
	};
	if(b==1){
		a=a+1
	}
	if(b==2||a>canvasAll.length){
		a=canvasAll.length
	}
	$(".flipbook").turn("page",a)
}