### Spintax extended

Node.js library to parse spintax formatted text

### Installation

    $ npm install spintax

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

You may escape special characters:

```js
const spintax = require('spintax-extended');
spintax.unspin("[+\\++Red|\\[White\\]|Blue]"); //#"[White]+Red+Blue" ...
```
