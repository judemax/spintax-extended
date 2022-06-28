### Spintax extended

Node.js library to parse spintax formatted text. 
The library also supports the extended spintex format.
Your spintax text can be any nesting level.

### Installation

    $ npm install spintax-extended

### Examples

```js
const spintax = require('spintax-extended');
//simple:
spintax.unspin("{Red|White|Blue} water"); //#"Red water" or "Blue water" or "White water"
//with permutation:
spintax.unspin("[Red|White|Blue]"); //#"RedBlueWhite" or "BlueRedWhite" etc.
//permutations with separator(s):
spintax.unspin("[+_+Red|White|Blue]"); //#"Red_Blue_White" ...
spintax.unspin("[+{_|-}+Red|White|Blue {1|2}]"); //#"White-Blue 2-Red" ...
```

You may escape special characters if you need:

```js
const spintax = require('spintax-extended');
spintax.unspin("[+\\++Red|\\[White\\]|Blue]"); //#"[White]+Red+Blue" ...
```

You can count all possible variations:

```js
const spintax = require('spintax-extended');
spintax.countVariations("[+{_|-}+Red|White|Blue {1|2}]"); //24
spintax.countVariations("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]"); //24
```

You can get the full unspin list:

```js
const spintax = require('spintax-extended');
spintax.fullUnspinList("[+{_|-}+Red|White|Blue {1|2}]");
spintax.fullUnspinList("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]");
```

or random unspin list (unique or not):

```js
const spintax = require('spintax-extended');
spintax.randomUnspinList("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]",10); //not unique
spintax.randomUnspinList("[+{_|-}+Red|White|Blue {1|2}]",10,true); //unique (true as a third argument)
```

You can get unspin text by index:

```js
const spintax = require('spintax-extended');
spintax.unspinByIndex("Oh, look, {Red|White|Blue} {water|star|color}!",1); //for index 1 - "Oh, look, White water!"
```

To check correction of spintax text use `isCorrect` function:

```js
const spintax = require('spintax-extended');
spintax.isCorrect("[+{_|-}+Red|White|Blue {1|2}]"); //true
spintax.isCorrect("[+\\++Red|\\[White\\]|Blue]"); //true
spintax.isCorrect("A[Red|2 [+\\++Whi|Te]}{ {1|2}|Blue]"); //false
spintax.isCorrect("A[Red|2 [+\\++Whi|Te] {1|[2}]|Blue]"); //false
spintax.isCorrect("[Red|{White|Blue]"); //false
```

You can also use OOP to avoid parsing every time:

```js
const Spintax = require('spintax-extended');
const spintax = new Spintax("[+{_|-}+Red|White|Blue {1|2}]");
console.log(spintax.unspin()); //Red-Blue 1-White
console.log(spintax.countVariations()); //24
console.log(spintax.fullUnspinList()); //full unspin list
console.log(spintax.randomUnspinList(10)); //not unique random list
console.log(spintax.randomUnspinList(10,true)); //unique random list
console.log(spintax.unspinByIndex(1));//Red-White-Blue 1
console.log(spintax.isCorrect()); //true
```

More examples in the `examples` folder.

