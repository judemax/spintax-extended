const Spintax=require('../');

console.log(Spintax.unspin("Wow text without spintax! Amazing!"));
console.log(Spintax.unspin("Oh, look, {Red|White|Blue} {water|star|color}!"));
console.log(Spintax.unspin("\\[Red|[Whi|Te]{Whi\\|te}|Blue\\]"));
console.log(Spintax.unspin("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]"));
console.log(Spintax.unspin("[Red|White|Blue]"));
console.log(Spintax.unspin("[+_+Red|White|Blue]"));
console.log(Spintax.unspin("[+{_|-}+Red|White|Blue {1|2}]"));
console.log(Spintax.unspin("[+\\++Red|\\[White\\]|Blue]"));

//Always "Oh, look, White water!" for index 1:
console.log(Spintax.unspinByIndex("Oh, look, {Red|White|Blue} {water|star|color}!",1));