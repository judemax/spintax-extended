const Spintax=require('../');

const spintax=new Spintax("[+{_|-}+Red|White|Blue {1|2}]");
console.log(spintax.unspin()); //Red-Blue 1-White
console.log(spintax.countVariations()); //24
console.log(spintax.fullUnspinList()); //full unspin list
console.log(spintax.randomUnspinList(10)); //not unique random list
console.log(spintax.randomUnspinList(10,true)); //unique random list
console.log(spintax.unspinByIndex(1));//Red-White-Blue 1
console.log(spintax.isCorrect()); //true