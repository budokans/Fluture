import {application1, func} from './internal/check';
import {makeError} from './internal/error';
import {noop, call} from './internal/utils';
import {createInterpreter} from './future';

export var Node = createInterpreter(1, 'node', function Node$interpret(rec, rej, res){
  function Node$done(err, val){
    cont = err ? function EncaseN3$rej(){
      open = false;
      rej(err);
    } : function EncaseN3$res(){
      open = false;
      res(val);
    };
    if(open){
      cont();
    }
  }
  var open = false, cont = function(){ open = true };
  try{
    call(this.$1, Node$done);
  }catch(e){
    rec(makeError(e, this, this.context));
    open = false;
    return noop;
  }
  cont();
  return function Node$cancel(){ open = false };
});

export function node(f){
  var context = application1(node, func, f);
  return new Node(context, f);
}
