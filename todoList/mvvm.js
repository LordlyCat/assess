/*var data = {
  name: 'mi'
}

function observe(obj, key, callBack) {
  let old = obj[key]
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return old
    },
    set: function(now) {
      if(now !== old) {
        callBack(old, now);
        old = now;
      }
    }
  })
}



function callBack (old,now) {
	console.log(old + "-->" + now);
}

observe(data, 'name')
data.name = 'mirone';

*/




function observeAllKey(obj, callback) {
  Object.keys(obj).forEach(function(key){
    observer(obj, key, callback)
  })
}

function observer(obj, key, callback) {
  let old = obj[key]
  if (old.toString() === '[object Object]') {
    observeAllKey(old, callback)
  } else {
	    Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function() {
	      return old
	    },
	    set: function(now) {
	      if(now !== old) {
	        callBack(old, now);
	        old = now;
	      }
	    }
	  })
  }
}

function callBack (old,now) {
	console.log(old + "-->" + now);
}

var data = {
  name: 'mi',
  do: {
  	a: 1,
  	b: 2
  }
}

observeAllKey(data, callBack);









	











