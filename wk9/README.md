# WK9

### Disco Mirror

* Try our sketch here https://editor.p5js.org/Siro1998/sketches/8U5X0J_gI
* For wk9 project, We created a disco mirror with p5 sketch. We use a json file that has a lot of preset color palettes, and replace the original colors of the webcam with colors from a chosen palette. We get the color palette json file from this sketch. https://editor.p5js.org/oshoham/sketches/iVm_2LAHI. We also reference this https://happycoding.io/examples/p5js/images/image-palette.

![Capture](https://user-images.githubusercontent.com/43830622/141378504-338af0d0-5c59-49a2-87f8-9003fd1b53cf.PNG)


## Process
preload the JSON file.

```ruby
function preload() {
  data = loadJSON("palettes.json");
}

```

Set up the webcam. (The pixelSize is set to 20 pixels.)

```ruby
function setup() {
  createCanvas(600, 400);
  //pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/pixelSize, height/pixelSize);
  video.hide();
}

```

For every pixel in the video, draw a circle with a color from a random color palette.

```ruby
function draw() {
  index = floor(random(data.palettes.length));
  for(let y = 0; y< video.height;y++){
      for (let x = 0; x < video.width; x++) {
        const videoColor = video.get(x, y);
        const paletteColor = getPaletteColor(videoColor);
        noStroke();
        fill(paletteColor);
        circle(x*pixelSize, y*pixelSize,pixelSize);
      }
  }
}
```

In the getPaletteColor() funtion, we use the dist() function to calculate the difference between the original color and every colors from the palette. After that, we can replace the original pixel with the closest color from the palette.

```ruby

function getPaletteColor(imgColor) {
  const imgR = red(imgColor);
  const imgG = green(imgColor);
  const imgB = blue(imgColor);

  let minDistance = 999999;
  let targetColor;
  
  let palette = data.palettes[index];

  for (const c of palette) {
    const paletteR = red(c);
    const paletteG = green(c);
    const paletteB = blue(c);

    const colorDistance =
      dist(imgR, imgG, imgB,
           paletteR, paletteG, paletteB);

    if (colorDistance < minDistance) {
      targetColor = c;
      minDistance = colorDistance;
    }
  }

  return targetColor;
}

```
Watch our one minute self portrait video here!

[![Watch the video](https://user-images.githubusercontent.com/43830622/141379023-f6d60d87-04c9-4696-a906-883e4e7b4126.jpg)](https://vimeo.com/manage/videos/644986094)
