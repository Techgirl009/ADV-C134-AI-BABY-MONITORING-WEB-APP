img = "";
status = "";
objects = [ ];

function preload()
{
    img = loadImage("dog_cat.jpg");
}

function setup()
{
    canvas = createCanvas(650, 580);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(650, 580);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status - detecting objects";
}

function draw()
{
    image(video, 0, 0, 650, 580);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_objects").innerHTML = "Number of Objects Detected Are : " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " % ", objects[i].x, objects[i].y);
            noFill();
            strokeWeight = 100;
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded()
{
    console.log("model loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
         console.log(error);
    }
    
    else
    {
        console.log(results);
        objects = results;
    } 
}

