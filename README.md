### Spintax extended

Node.js library to parse spintax formatted text. The library also supports the extended spintex format.

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

You can also use OOP to avoid parsing every time:

```js
const Spintax = require('spintax-extended');
const spintax = new Spintax("[+{_|-}+Red|White|Blue {1|2}]");
console.log(spintax.unspin()); //Red-Blue 1-White
console.log(spintax.countVariations()); //24
```

More examples in the `examples` folder.

