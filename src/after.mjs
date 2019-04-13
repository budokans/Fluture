import {application1, application, any, positiveInteger} from './internal/check';
import {createInterpreter, never} from './future';

export var After = createInterpreter(2, 'after', function After$interpret(rec, rej, res){
  var id = setTimeout(res, this.$1, this.$2);
  return function After$cancel(){ clearTimeout(id) };
});

After.prototype.extractRight = function After$extractRight(){
  return [this.$2];
};

function alwaysNever(_){
  return never;
}

export function after(time){
  var context1 = application1(after, positiveInteger, time);
  return time === Infinity ? alwaysNever : (function after(value){
    var context2 = application(2, after, any, value, context1);
    return new After(context2, time, value);
  });
}
