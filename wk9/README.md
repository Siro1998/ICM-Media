# WK9

### Random Diary Generator

* Try my sketch here https://editor.p5js.org/Siro1998/sketches/SyJDm0CRB
* For wk9 assignment, I created a random diary generator using CFG with Tracery. It is a very interesting assignment, I didn't face much difficulties during the process. I used the example tracery p5 sketch https://editor.p5js.org/a2zitp/sketches/RhZo1vmhs, and modified the data.

```ruby
let data = {
  "diary":["#month# #date#, 20#digit##digit# #weather#. I have some #food# today, it tastes #adj#. I #activity# in the morning, #activity# in the afternoon, and #activity# in the evening. I feel #emotion#."],
  "month":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "date":["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
  "digit":["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  "weather":["sunny", "cloudy", "rainy", "foggy", "windy", "snowy", "stormy"],
  "activity":["do my homework", "take a nap", "watch youtube", "play video games", "do some workout", "go for a date", "hang out with my friends", "go grocery shopping", "do nothing", "go to class", "work", "make some art"],
  "food": ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🍅", "🍆", "🌽", "🌶", "🍄", "🌰", "🍞", "🧀", "🍖", "🍗", "🍔", "🍟", "🍕", "🌭", "🌮", "🌯", "🍳", "🍲", "🍿", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🍡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", 'pizza', 'dumplings', 'hamburger', 'ice cream', 'french fries', 'salmon'],
  "adj": ["🔥",'👍','👎', 'good', 'delicious', 'funny', 'weird','terrible'],
  "emotion":['😎', '😍', '💚', '🔥', 'great', 'wonderful', 'funny', 'weird', 'happy', 'sad', 'angry','tired']
}
```

* I changed the title to *Random Diary*, and I didn't change anything for the generate button and clear button.

```ruby
let grammar;

function setup() {
  noCanvas();
  // Make the grammar
  grammar = tracery.createGrammar(data);

  // A button to generate a new sentence
  let button = select('#generate');
  button.mousePressed(generate);

  // A button to clear everything
  let clearButton = select('#clearButton');
  clearButton.mousePressed(clearAll);
}

// Remove everything
function clearAll() {
  let elements = selectAll('.text');
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
}

function generate() {
  let expansion = grammar.flatten('#diary#');
  let par = createP(expansion);
  let r = floor(random(100, 255));
  let g = floor(random(150, 255));
  let b = floor(random(200, 255));
  par.style('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
  par.class('text');
}
```

* And here is some random diary I generated.

<img width="616" alt="Screen Shot 2021-11-06 at 9 17 24 PM" src="https://user-images.githubusercontent.com/43830622/140628729-8754d5cf-46a6-41f0-9d31-452973d9f460.png">

