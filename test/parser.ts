import { Parser } from '../src/';

// @ts-ignore
~((a,b=require('util')[a])=>Object.prototype[b.defaultOptions.depth=1/0,a]=function(){return b(this,{customInspect:0})})('inspect');

const code = '-68 1i 68 1i 8e 34 cg 34 gs 34 gs 1i mq 1i n4 1i n4 -1i se -1i v8 -1i,-68 1i -6h 1h -71 1f -7g 1b -7v 16 -8c 11 -8o p -93 h -9c 8 -9l -3 -9t -f -a3 -s -a9 -1a -ad -1p -ah -2a -aj -2r -ak -3e -ak -3o -ak -de 0 -de 34 -bs 8e -bs au -ak e2 -ak#0 0 k 0 3e 0 3e 1i,0 0 0 1i,n4 -1i pu -1i,qi -1i r6 -1i,rg -1i se -1i,e2 -ak g8 -ak,io -ak j2 -ak,h6 -ak hg -ak,k0 -ak l8 -ak,li -ak m6 -ak,mq -ak o2 -ak,i4 -ak io -ak,v8 -1i 11e -1i,11o -1i 12m -1i,13a -1i 156 -1i,15g -1i 16e -1i,172 -1i 17c -1i,180 -1i 18k -1i#C bi 2g,V k0 -a 4 a,G -a0 -cq 0,W 9c -a0 oc -2q,G pa -2q 5k,T uu -26,B vi -26 -2q,B vi -2q 71,B vi -3e 6e,B vi -42 66';
const code2 = '#-68 0 -3o 0 -3o a -3e a -3e 0 -3e -a -3o -a -3o -k -34 -k -34 -a -2q -a -2q 0 -34 0 -34 a -2q a -2q u -2g u -2g k -26 k -26 a -2g a -2g 0 -2g -a -26 -a -26 -k -1s -k -1s -a -1s 0 -1i 0 -1i a -18 a -18 0 1s 0,-68 0 -68 -1i -5u -1i -5u -18 -5k -18 -5k -u -5a -u -5a -18 -50 -18 -50 -1i -5a -1i -5a -1s -5k -1s -5k -26 -5a -26 -50 -26 -50 -1s -4m -1s -4m -1i -4c -1i -4c -18 -4c -u -4m -u -4m -k -42 -k -42 -u -3o -u -3o -18 -3e -18 -3e -1i 1s -1i 1s 0#';

const parser = new Parser();
const parsed = parser.parse(code);

console.log(parsed);
console.log(parsed.move(200, -200), '\n');
console.log(parsed.merge(code2), '\n');
console.log(parsed.merge(parser.parse(code2)).code, '\n');
console.log(parsed.curveToStraight());