let mobilenet;
let video;
let predictor;
let value = 0 ;
let slider;
let addbutton;
let trainbutton;


function modelReady() {
  console.log('Model is ready!!!');
//   mobilenet.predict(gotResults);
}

function videoready() {
	console.log('video is ready!!!');
  //   mobilenet.predict(gotResults);
  }

  function whiletraining(loss){
	  if(loss == null){
		  console.log('training complete');
		  predictor.predict(gotResults);
	  }else{
	  console.log(loss);
	  }
  }

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    value = results;
    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video,videoready);

  slider = createSlider(0,1,0.5,0.01);

  addbutton = createButton('add');
  addbutton.mousePressed(function(){
	predictor.addImage(slider.value());
  });


  trainbutton = createButton('train');
  trainbutton.mousePressed(function(){
	predictor.train(whiletraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(value, 10, height - 20);
}