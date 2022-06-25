const Spintax=require('../');

console.log(Spintax.countVariations("Wow text without spintax! Amazing!"));//1
console.log(Spintax.countVariations("Oh, look, {Red|White|Blue} {water|star|color}!"));//9
console.log(Spintax.countVariations("\\[Red|[Whi|Te]{Whi\\|te}|Blue\\]"));//2
console.log(Spintax.countVariations("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]"));//24
console.log(Spintax.countVariations("[Red|White|Blue]"));//6
console.log(Spintax.countVariations("[+_+Red|White|Blue]"));//6
console.log(Spintax.countVariations("[+{_|-}+Red|White|Blue {1|2}]"));//24
console.log(Spintax.countVariations("[+\\++Red|\\[White\\]|Blue]"));//6