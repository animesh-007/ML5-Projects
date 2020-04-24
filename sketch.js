let mobilenet;
let video;
let classifier;
let label = '';
let ukbutton;
let whistlebutton;
let trainbutton;
let savebutton;


function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('model.json',custommodel);
}


function custommodel() {
	console.log('custom model is ready!!!');

}


function videoready() {
	console.log('Model is ready!!!');
  //   mobilenet.predict(gotResults);
  }

  function whiletraining(loss){
	  if(loss == null){
		  console.log('training complete');
		  classifier.classify(gotResults);
	  }else{
	  console.log(loss);
	  }
  }

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    //console.log(results);
    label = results;
    classifier.classify(gotResults);
  }
}

// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video,videoready);

  ukbutton = createButton('ukulele');
  ukbutton.mousePressed(function(){
	classifier.addImage('ukulele');
  });

  whistlebutton = createButton('whistle');
  whistlebutton.mousePressed(function(){
	classifier.addImage('whistle');
  });

  trainbutton = createButton('train');
  trainbutton.mousePressed(function(){
	classifier.train(whiletraining);
  });

  savebutton = createButton('save');
  savebutton.mousePressed(function(){
	classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}