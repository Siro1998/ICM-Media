# Final Project

## Sentiment Flowers

For my final project, I used text to generate digital flowers. I made a p5.js website where people can type in some text and they will get a bunch of flowers showing on the screen. The color and shape of the flowers would vary based on the sentiment analysis of the text and I used L-System to design the growth of flowers. The purpose of this project is to make it a digital flowers sending website. As sometimes we want to send someone flowers but we can't physically do that because of distance or some other situations. On this website, I want the users to be able to generate flowers with what they want to say, so they can send someone digital flowers! 

Get your flower here https://editor.p5js.org/Siro1998/full/Milx5K_yY. 

Full code https://editor.p5js.org/Siro1998/sketches/Milx5K_yY.

<img width="536" alt="Screen Shot 2021-12-12 at 11 29 23 PM" src="https://user-images.githubusercontent.com/43830622/145752648-dd0a7c93-ed91-4c00-bd98-74e35c24490b.png"><img width="602" alt="Screen Shot 2021-12-12 at 11 29 31 PM" src="https://user-images.githubusercontent.com/43830622/145752663-6afbe1fd-60ec-4d78-8865-af3c6f15c3f5.png">

### Process
First, I followed [Daniel Shiffman's AFINN-111 Sentiment Analysis tutorial](https://editor.p5js.org/codingtrain/sketches/aNeMdpy-b). I downloaded a AFINN txt file with a lot of pre-scored word, and I converted it to json file. I created a blank text box on the page to get the typed-in text. If any words matched the AFINN words library, the score of that word would be add to the total sentiment score. I also calculated the division result of total score and the typed-in words length to get a comparative score of the whole sentence.
``` ruby
for (var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        var score = afinn[word];
        //console.log(word, score);
        totalScore += Number(score);
        scoredwords.push(word + ": " + score + " ");
      }
    }
```

Second step was creating a L-system grammar to generate the branches. This is the grammar I got. "X" and "F" are branches (go forward), and "^" are flowers. "+" means to rotate a positive angle, and "-" means to rotate a negative angle. Same for "&" and "%" but with a different angle assigned. I use "&" and "%" so the main branch will also bend a little. This makes the branches looks more natural.
``` ruby
var rules = [];
rules[0] = {
  a: "F",
  b: "X[+F][-F]XF^",
};
rules[1] = {
  a: "X",
  b: "X&%X",
};
```

``` ruby
for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    angle = random(radians(20),radians(40));
    branchAngle = random(radians(0),radians(5));
    if (current == "F"|| current == 'X') {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if(current == "^"){
      //ellipse(0, 0, 8);
      flowerGenerator(totalScore,length);
    }else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "&") {
      rotate(branchAngle);
    } else if (current == "%") {
      rotate(-branchAngle);
    }else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
```

Last step is to generate the flowers. The color of the flowers changes based on the comparative score. I made seven colors to match the score. A more positive score gives you pink and red flowers, and a more negative score generates more bluish flowers. The shape and the size of the flower is totally random. Every time I press on the generate button, I will get a new shape. However, the color will not change unless I change the text and get a different comparative score.
```ruby
function flowerGenerator(score,length){
  var c = score/length;
  var flowerColor;
  if(c>=1){
    flowerColor = color(200+random(-30,30), 30+random(-30,30),170+random(-30,30)) ;
    fill(flowerColor);//pink
  }else if(c>=0.5&&c<1){
    flowerColor = color(200+random(-30,30), 50+random(-30,30),50+random(-30,30)) ;
    fill(flowerColor);//red
  }else if(c>=0.3&&c<0.5){
    flowerColor = color(225+random(-30,30), 150+random(-30,30),10+random(-30,30)) ;
    fill(flowerColor);//orange
  }else if(c>=0&&c<0.3){
    flowerColor = color(225+random(-30,30), 225+random(-30,30),0+random(-30,30)) ;
    fill(flowerColor);//yellow
  }else if(c>=-0.3&&c<0){
    flowerColor = color(125+random(-30,30), 200+random(-30,30),75+random(-30,30)) ;
    fill(flowerColor);//green
  }else if(c>=-0.6&&c<-0.3){
    flowerColor = color(75+random(-30,30), 145+random(-30,30),175+random(-30,30)) ;
    fill(flowerColor);//blue
  }else if(c<-0.6){
    flowerColor = color(50+random(-30,30), 50+random(-30,30),120+random(-30,30)) ;
    fill(flowerColor);//dark blue
  }
  
  var randomSize = random(1,3);
  noStroke();
  for (var i = 0; i < flowerNum; i++) {
	  push();
	  rotate(TWO_PI * i / flowerNum);
	  ellipse(0, 0, flowerSizeW*randomSize, flowerSizeH*randomSize);
	  pop();
  }
  fill(255,255,30,180);
  ellipse(0,0,flowerSizeH*randomSize*0.2);
}
```

And here are some examples I generated.

<img width="347" alt="Screen Shot 2021-12-12 at 11 31 47 PM" src="https://user-images.githubusercontent.com/43830622/145753066-ee884b89-75cb-47d0-966c-a61f7a2e9732.png"><img width="347" alt="Screen Shot 2021-12-12 at 11 32 26 PM" src="https://user-images.githubusercontent.com/43830622/145753072-317e6484-33c6-41fd-b3ba-0384823c77c7.png"><img width="347" alt="Screen Shot 2021-12-12 at 11 32 59 PM" src="https://user-images.githubusercontent.com/43830622/145753076-56981ffa-4278-469b-851c-6989c4d67dbe.png"><img width="347" alt="Screen Shot 2021-12-12 at 11 34 26 PM" src="https://user-images.githubusercontent.com/43830622/145753087-65177307-6a07-46b7-881d-ccc98a3c37dc.png">


### Next Step
* I want to make the sentiment analysis more accurate. Because the words in AFINN library are very limited, I want to either get larger library or use another way to do the analysis. 
* I also want to use randomSeed() so with the same typed-in words, the generated results will be same.

### Reference
![Capture3](https://user-images.githubusercontent.com/43830622/142959181-a8cd7650-6bfa-40ce-bcd0-27181d3e7b73.PNG)
![Capture1](https://user-images.githubusercontent.com/43830622/142959184-00060691-a630-487f-9c15-b110e44cc6ab.PNG)
![Capture2](https://user-images.githubusercontent.com/43830622/142959188-480dc9e2-cc5d-439b-827b-aa133f83c7f1.PNG)
![Capture](https://user-images.githubusercontent.com/43830622/142959189-ff17dba8-8789-4e50-b386-fa622d0341e0.PNG)

- Sentiment Analysis
  - [AFINN-111 Sentiment Analysis](https://www.youtube.com/watch?v=uw3GbsY_Pbc&list=PLRqwX-V7Uu6YrbSJBg32eTzUU50E2B8Ch&index=44&ab_channel=TheCodingTrain)
  - [Node.js Sentiment](https://www.npmjs.com/package/sentiment)
- L-System
  - [Fractal Trees - L-System](https://editor.p5js.org/codingtrain/sketches/QmTx-Y_UP)
  - [Recursive trees in p5.js](https://www.youtube.com/watch?v=-3HwUKsovBE&ab_channel=ColorfulCoding)
  - [SIMULATION OF PLANTS](http://progsystem.free.fr/plantsimulation.htm)
  - [Algorithmic Beauty of Plants](http://algorithmicbotany.org/papers/abop/abop.pdf)





