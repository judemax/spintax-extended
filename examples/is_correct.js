const Spintax=require('../');

console.log(Spintax.isCorrect("Wow text without spintax! Amazing!")); //true
console.log(Spintax.isCorrect("Oh, look, {Red|White|Blue} {water|star|color}!")); //true
console.log(Spintax.isCorrect("\\[Red|[Whi|Te]{Whi\\|te}|Blue\\]")); //true
console.log(Spintax.isCorrect("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]")); //true
console.log(Spintax.isCorrect("[Red|White|Blue]")); //true
console.log(Spintax.isCorrect("[+_+Red|White|Blue]")); //true
console.log(Spintax.isCorrect("[+{_|-}+Red|White|Blue {1|2}]")); //true
console.log(Spintax.isCorrect("[+\\++Red|\\[White\\]|Blue]")); //true
console.log(Spintax.isCorrect("A[Red|2 [+\\++Whi|Te]}{ {1|2}|Blue]")); //false
console.log(Spintax.isCorrect("A[Red|2 [+\\++Whi|Te] {1|[2}]|Blue]")); //false
console.log(Spintax.isCorrect("[Red|{White|Blue]")); //false
console.log(Spintax.isCorrect("Red|White|Blue}")); //false
