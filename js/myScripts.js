function addClass(key,e){
  
  var targetDiv = document.getElementById("Map").getElementsByClassName(key.className);
  
    targetDiv[0].classList.add(e);
  console.log(targetDiv[0].className);
}


function removeClass(key,e){
  var activeKey=key.className+" "+e
  var targetDiv = document.getElementById("Map").getElementsByClassName(activeKey);
  targetDiv[0].classList.remove(e);
}