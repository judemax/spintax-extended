const Spintax=require('../');

console.log(Spintax.fullUnspinList("Wow text without spintax! Amazing!"));
console.log(Spintax.fullUnspinList("A[Red|White|Blue]"));
console.log(Spintax.fullUnspinList("[+{_|-}+Red|White|Blue {1|2}]"));

console.log(Spintax.randomUnspinList("A[Red|2 [+\\++Whi|Te] {1|2}|Blue]",10));
console.log(Spintax.randomUnspinList("[+{_|-}+Red|White|Blue {1|2}]",10,true));

