
/*


function openSb(id,name,zahl) {  
  alert("Helllo");
};  
  
console.log("YOLO");

$(document).on('mousedown', 'td', function () {
 // var variable = $(this).wrapper().attr('data-c');
  var value = atjs.utils.getColumnData($(this), $(this).attr('data-e'));
  
  var myData=$(this).find('.wrapper').attr('data-c');
  var myText=$(this).find('.textWrapper');
  $('#sidebar').children().empty();
  var myDataText=$(this).children('.wrapper').attr('data-c');
 myText.clone().appendTo('#sidebar').css('display','block');
  var mycheck =atjs.utils.getColumnData($(this), $(this).data('data-a'));  
 //myData.appendTo('#sidebar').css('display','block');
  

  console.log($(this).children('.wrapper').attr('data-c'));
  
  
 


});
*/
function actItem(obj){  
  this.ID           = obj.data('a')
  this.Name         = obj.data('b')
  this.Weight       = obj.data('c')    
  this.Price       = genPrice(obj.data('d'))
  this.Struct       = obj.data('e')
  this.Compl        = obj.data('f')
  this.Type         = obj.data('g')
  this.TP           = obj.data('h')
  this.LS           = obj.data('i')
  this.AtPa         = obj.data('j')
  this.RW           = obj.data('k')
  this.Len          = obj.data('l')
  this.Source       = obj.data('m')
  
  
  this.KT           = obj.data('p')

  
  
  this.Cat          = [obj.data('n'),obj.data('o'),obj.data('p')]
  this.Reg          = obj.data('q')
  this.Des          = obj.data('r')
  this.Rule         = obj.data('t')
  this.ImageID      = obj.data('z')
  this.ImageAuthor  = obj.data('t')
  this.ImageLnk     = getImage(this.ID,this.Type,this.ImageID,this.ImageAuthor)  
  this.MySubTbl     = createSubTbl(this)
  //this.SubTbl = createTable(genTblArr(obj.data('k'))).outerHTML;
  

}







$(document).ready(function() {    
  $('td').on('mousedown',selectItem); 
});


function selectItem(){
  $('td').css("background","transparent")
  var wrapper = $(this).children('.wrapper')      
  var selObj = new actItem(wrapper)  
  showSidebar(selObj)
  $(this).css("background","red")
}




function showSidebar(item){          
  alert(item.MySubTbl)
  $( "<p>Test</p>" ).appendTo( "#here" );
  $('#sidebar').html("<p>Ok ich zeig sie jetzt</p>"); 
  //$('#sidebar').html(genTempl(item));     
  //$('.subtable tbody').on('scroll',scrollSubTbl);
}


function scrollSubTbl(){
    $('.subtable thead').css("left", -$(".subtable tbody").scrollLeft());
    $('.subtable thead th:nth-child(1)').css("left", $(".subtable tbody").scrollLeft()); 
    $('.subtable tbody td:nth-child(1)').css("left", $(".subtable tbody").scrollLeft());     
}


function genTempl(item){
  console.log("Hello again" + item.ID);
  var template=`
<div id="sb-head">  
  <div id="id-wrap">${item.ID}</div>
  <h1 id="sb-itemname">${item.Name}</h1>
<h3 id="sb-type">${item.Type}</h3>
</div> 
<div id="sb-body">
  <div class="img-wrap"><img src="${item.ImageLnk}"></div>
  ${item.MySubTbl}
  <br><br><br>
</div>
<div id="sb-footer">
  <div id="source" title="${item.Source}">${item.Source ? item.Source:""}</div>
</div>

`
 /*
    <h3>Regeltechnik: </h3>
    <div class="scrlbx-rule">
        <div class="indent">${item.rule}</div>
    </div>
    <h3>Waffenvorteil: </h3>
    <div class="wpn-adv">
        <div class="indent">Waffenvorteil</div>
    </div>
    <h3>Waffennachteil: </h3>
    <div class="wpn-dis">
        <div class="indent">Waffennachteil</div>
    </div>
</div>

<div class="sb-foot">
<div class="quelle">${item.source}</div>
</div>`

*/
  console.log("JAAAAA"+template);
  return template
};

function getImage(itemID,type,imageID,imageAuthor){        
  var myImage = ""
  
  if (imageID){
    myImage ="https://drive.google.com/thumbnail?id=" + imageID
    
  } else{ 
    switch (type) {
      case 'Gegenstand': console.log("Gegenstand aber kein Bild"); 
        break;
      case 'Waffe': console.log("Waffe aber kein Bild"); 
        break;
      case 'Rüstung': console.log("Rüstung aber kein Bild"); 
      break;           
    }
  }
  
  var myImageHtml=`<img class="icon" id="${itemID}_Image" ${myImage} title="Bild: ${imageAuthor}">`
  
  return myImage
};



function genPrice(myVal){
  myVal =String(myVal)
  //console.log("Achtung: "+myVal)
  var price = ""  
  var commaIndex = myVal.indexOf(',') ;
  console.log("Achtung: "+commaIndex)
 //Kein Komma
  if ( commaIndex < 0 ){
    //kein Komma also gibt es S
    var sVal = myVal.charAt( myVal.length - 1 );
    console.log("Achtung")
    if (sVal>0){ price = price + "S" + sVal; }
    //gibt es D
    if ( myVal.length >= 2 ){    
      var dVal = myVal.substring(0 , myVal.length - 1 );
          price = "D" + dVal + " " + price;
    }      
//there is comma
  } else {
    var postDecPlaces=myVal.substring(commaIndex,myVal.length).length
    //2 decimal places (kreutzer und Heller)
    if ( postDecPlaces > 2 ){
      var kVal = myVal.charAt( commaIndex + 2 );  
      var hVal = myVal.charAt( commaIndex + 1 );  
      price = "K" + kVal;
      if ( hVal > 0 ) {price = "H" + hVal + " " + price;}
      
      //1 decimal place   (nurHeller)   
    } else if ( postDecPlaces = 1 ){
            var hVal = myVal.charAt( commaIndex + 1 );  
            price = "H" + hVal;
       }    
    var sVal = myVal.charAt( commaIndex - 1 );
    if ( sVal > 0 ) {price = "S" + sVal + " " + price;}
    var preComma = myVal.substring( 0 , commaIndex - 1 )
    
    if ( preComma.length >= 1 ){    
      var dVal = preComma;
      price = "D" + dVal + " " + price;
    }    
  }  
  return price
}



// dynamic table

function genTblArr(CodeStr){
  var rows= CodeStr.split(';')
  var tblArr =[];  
  
  for (i=0 ;i < rows.length-1; i++){
    tblArr[i]=rows[i].split('>')    
  }  
  return tblArr
}

function createSubTbl(item){
  console.log("HansWORSCHT :"+item.ID)
  var Tbltemplate;
  
  switch (item.Type){
  case "Gegenstand":
  Tbltemplate=`
    <div class='subtable-wrap'>
    <table class='subtable-item'>
    <thead>
    <tr>
      <th>Gegenstand</th>
      <th>${item.Name}</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gewicht</td>   
        <td>${item.Weight}</td>
      </tr>
      <tr>
        <td>Strukturpunkte</td>   
        <td>${item.Struct}</td>
      </tr>
      <tr>
        <td>Preis</td>   
        <td>${item.Price}</td>
      </tr>
      <tr>
        <td>Komplexität</td>   
        <td>${item.Compl}</td>
      </tr>
    </tbody>
    </table>
   `
  break;
  case "Waffe":
     Tbltemplate=`
    <div class='subtable-wrap'>
    <table class='subtable-wpn'>
    <thead>
    <tr>
      
      <th colspan="2">${item.Name}</th>
    </tr>
    </thead>
    <tbody>
      <tr><td>KT</td><td>${item.KT}</td></tr>
      <tr><td>TP</td><td>${item.TP}</td></tr>
      <tr><td>LS</td><td>${item.LS}</td></tr>
      <tr><td>AT/PA-Mod</td><td>${item.AtPa}</td></tr>
      <tr><td>RW</td><td>${item.RW}</td></tr>
      <tr><td>Gewicht</td><td>${item.Weight}</td></tr>
      <tr><td>Länge</td><td>${item.Len}</td></tr>
      <tr><td>Preis</td><td>${item.Price}</td></tr>
      <tr><td>Komplexität</td><td>${item.Compl}</td></tr>
      <tr><td>Anmerkung</td><td>${item.Note}</td></tr>
    </tbody>
    </table>
   `
  break;
  }
  return Tbltemplate



}



function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var tableHead = document.createElement('thead');
  var tableWrap = document.createElement('div');
  var thcell = document.createElement('th');
  
  
  var rowHead =document.createElement('tr');
  tableData[0].forEach(function(cellData) {
      var cell = document.createElement('th');
      cell.appendChild(document.createTextNode(cellData));
      rowHead.appendChild(cell);
    });
    tableHead.appendChild(rowHead); 
  
  
  
  
  for(i=1; i < tableData.length; i++){
      
  var row = document.createElement('tr');
    tableData[i].forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    tableBody.appendChild(row);        
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);table.setAttribute("class","subtable");
      
  tableWrap.appendChild(table);tableWrap.setAttribute("class","subtable-wrap");    
  return tableWrap
}




