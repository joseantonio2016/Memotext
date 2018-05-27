/*Jose Antonio*/
/*abrir archivo*/
document.getElementById('openfile')
  .addEventListener('change', function(){
    var fr = new FileReader();
    fr.onload=function(){
document.getElementById("textarea1").textContent = this.result;
    }
    fr.readAsText(this.files[0], 'ISO-8859-1');
  });

/*arrastrar archivo*/
//let area = document.getElementById('area');
let txtarea = document.getElementById("textarea1");
var origen = document.getElementById('orige');

txtarea.addEventListener('dragover', e => e.preventDefault());
txtarea.addEventListener('drop', readFile);

function readFile (e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  
  if (file.type === 'text/plain') {
    let reader = new FileReader();
   // reader.onloadend = () => printFileContents(reader.result);
   reader.onloadend = () => document.getElementById("textarea1").textContent =reader.result;
    reader.readAsText(file, 'ISO-8859-1');
  } else {
    alert('Solo archivo de texto');
  }
}

var words = [];
var seleccionadosRand = [];

document.getElementById('lblguardar').addEventListener('click',function(){
  var trv = txtarea.value;
  if (trv.length>0)
  imprimeContenido(txtarea.value);
else alert('Escriba texto antes');
});

function imprimeContenido (contenido) {
  origen.innerHTML="";
  words = contenido.split(/\s/);
  arWords(words);
}

function arWords(_items){
  var asd = '';
_items.forEach((item, index)=>asd+=
  String.raw`<input type="checkbox" onchange="choosekeys(${index})" id="mf${index}">`+
  `<label for="mf${index}">${item}</label><label class="sw"> </label>`);
origen.innerHTML=asd;
}

var inix = -1;
function choosekeys(_inix){
var hy = document.getElementById('idswitch');
hy.checked?setinix(_inix):setItems(_inix);

}

function setinix(_inix){
(inix>=0)&&(inix!=_inix)?concatkeys(_inix):inix=_inix;
}
function concatkeys(_inix){
var min = Math.min(inix,_inix),max = Math.max(inix,_inix)
rest = Math.abs(inix-_inix);
var arr = words.slice(min,max+1).join(' ');
words.splice(min, rest+1, arr);
arWords(words);
}

var uliste = document.getElementById('uliste');
var urlist = document.getElementById('url_list');
var escogidos = [],arrIndexSel=[];
var in_dex = -1;

function setItems(_index){
//reemplazamos con espacios blancos
//_index==in_dex?return:in_dex=_index;
if (_index<=in_dex) return;
in_dex=_index;
arrIndexSel.push(_index);
escogidos.push(words[_index]);
escogidos.sort(function(a, b){return 0.5 - Math.random()});
uliste.innerHTML='';
urlist.innerHTML='';
escogidos.forEach(escog=>uliste.innerHTML+=String.raw`<li>${escog}</li>`);
escogidos.forEach(escag=>urlist.innerHTML+=String.raw`<option value="${escag}">`);
var elemento = document.getElementById("mf"+_index);
elemento.className = "transparente";
}

document.getElementById('idswitch')
  .addEventListener('change', reset);

function reset(){
    uliste.innerHTML='';
   urlist.innerHTML='';
  arWords(words);
  inix = -1;
  in_dex = -1;
  escogidos=[];
}

function formEval2(_words, _indisel){
var asd = '';
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" id="et${index}" list="url_list">`:
  asd+=String.raw`<input type="checkbox" id="mf${index}" class="sinefecto"><label for="mf${index}">${item} </label>`
  );
origen.innerHTML=asd;
}
function formEval3(_words, _indisel){
var asd = '';
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" id="et${index}">`:
  asd+=String.raw`<input type="checkbox" id="mf${index}" class="sinefecto"><label for="mf${index}">${item} </label>`
  );
origen.innerHTML=asd;
}
function formEval4(_words, _indisel){
var asd = '';
//recorre todo el array _words, compara si _indisel que viene de 
//collectindexrandom contiene ese index, si es verdad
//agrega mas input text, sino agrega mas checkbox representado por
//el label a traves de for="mf${index}"
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" onclick="speakEt(${index})" id="et${index}">`:
  asd+=String.raw`<input type="checkbox" id="mf${index}" class="sinefecto"><label for="mf${index}">${item} </label>`
  );
arrIndexSel=_indisel.sort(function(a, b){return a-b});
origen.innerHTML=asd;
}


function abrirTab(evt, nametab) {
    cerrarTab();
    document.getElementById(nametab).style.display = "block";
    evt.currentTarget.className += " active";
}

function cerrarTab() {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

//funcion de boton dificultad click
function leveldific(){
  var rangevalor = document.getElementById('leveldificultad').value;

  if (rangevalor==2) formEval2(words,arrIndexSel);
  else
  if (rangevalor==3) formEval3(words,arrIndexSel);
  else if (rangevalor==4)
  formEval4(words,collectIndexRandom(words.length, 9));
  else if (rangevalor==5)
  formEval4(words,collectIndexRandom(words.length, 6));
  else if (rangevalor==6)
  formEval4(words,collectIndexRandom(words.length, 3));//
  else arWords(words);
}

//retorna una matriz de numeros que seran indices de textinput
function collectIndexRandom(intmax, intdiv)
{
var arrrand = [];
//intmax=30 intdiv = 3 x= 10
var x = Math.floor(intmax/intdiv);
do
{
  //random 0.4*30=12
var rand = Math.floor((Math.random() * intmax));
//array.includes booleano , si es falso agrega con push
  if (!arrrand.includes(rand)) arrrand.push(rand);
}
while (arrrand.length<x);
return arrrand;
}

function evalua(){
var etval = "",wrval="";
arrIndexSel.forEach(item=>etval+=document.getElementById("et"+item).value);
arrIndexSel.forEach(item=>wrval+=words[item]);
(etval==wrval)?alert('Lo hiciste bien'):alert('Intenta de nuevo\netval='+etval+"\nwrval="+wrval);
}

var eti="";
function speakEt(_indicet){
  eti = "#et"+_indicet;
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    '*tag': function(tag) {
      $(eti).val(tag);
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);
  annyang.setLanguage("es-PE");

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

var tooltipObj = new DHTMLgoodies_formTooltip();
tooltipObj.setTooltipPosition('right');
tooltipObj.setPageBgColor('#EEEEEE');
tooltipObj.setTooltipCornerSize(15);
tooltipObj.initFormFieldTooltip();

/*if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'hola': function() {
      alert("hola Jose Antonio");
    },
    '*tag': function(tag) {
      alert(tag);
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);
  annyang.setLanguage("es-PE");

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}*/
