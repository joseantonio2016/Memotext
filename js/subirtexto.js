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
let area = document.getElementById('textarea1');

area.addEventListener('dragover', e => e.preventDefault());
area.addEventListener('drop', readFile);

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

let txtarea = document.getElementById("textarea1");
var origen = document.getElementById('orige');
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
  document.getElementById('textarea1').style.display='none';
var asd = '';
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" id="et${index}" list="url_list">`:
  asd+=String.raw`<input type="checkbox" id="mf${index}" class="sinefecto"><label for="mf${index}">${item} </label>`
  );
origen.innerHTML=asd;
}
function formEval3(_words, _indisel){
  document.getElementById('textarea1').style.display='none';
var asd = '';
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" id="et${index}">`:
  asd+=String.raw`<input type="checkbox" id="mf${index}" class="sinefecto"><label for="mf${index}">${item} </label>`
  );
origen.innerHTML=asd;
}
function formEval4(_words, _indisel){
  document.getElementById('textarea1').style.display='none';
var asd = '';
_words.forEach((item, index)=>
  _indisel.includes(index)?
  asd+=String.raw`<input type="text" size="8" id="et${index}">`:
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
  formEval4(words,collectIndexRandom(words.length, 3));
  else arWords(words);
}

function collectIndexRandom(intmax, intdiv)
{
var arrrand = [];
var x = Math.floor(intmax/intdiv);
do
{
var rand = Math.floor((Math.random() * intmax));
  if (arrrand.includes(rand))continue;
   arrrand.push(rand);
}
while (arrrand.length<x);
return arrrand;
}

function evalua(){
var etval = "",wrval="";
arrIndexSel.forEach(item=>etval+=document.getElementById("et"+item).value);
arrIndexSel.forEach(item=>wrval+=words[item]);
(etval==wrval)?alert('Lo hiciste bien'):alert('Intenta de nuevo')
//alert("etval="+etval+" wrval="+wrval);
//if (etval==wrval)alert('Lo hiciste bien')
//else alert('Intenta de nuevo');
}
  

/*
var myArray = [0,1,2],
    needle = 1,
    index = contains.call(myArray, needle); // true

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var elemento = document.getElementById("mf"+_index);
elemento.className += " transparente";

<input type="checkbox" id="mf${word}"></input><label for="mf$word">$word</label><label>&nbsp;</label>
words.forEach(word => origen.innerHTML=[origen.innerHTML,
    '<input type="checkbox" id="mf',word,'"></input><label for="mf',word,'">',
    word,'</label><label>&nbsp;</label>'].join('');

 <fieldset id="orige" class="origec">
      <input type="checkbox" id="mf nylon"></input>
<label for="mf nylon">nylon</label>
<label>&nbsp;</label>
<input type="checkbox" id="mf PA"></input>
<label for="mf PA">polyamida PA</label>
    </fieldset>

https://javascript.info/regexp-methods
To split the string:
str.split(str|reg)
We also covered two flags:

The g flag to find all matches (global search),
The y flag to search at exactly the given position inside the text.

document.getElementById("demo").innerHTML = res;
    var nombres = "Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ";
document.write(nombres + "<br>" + "<br>");
var expresionRegular = /\s*;\s*|i/;
var listaNombres = nombres.split(expresionRegular);
document.write(listaNombres);
}

I would do what you started: split by /W+/ and then validate each token (length and stopwords) in the array by using .filter().

var text = "This is a short text about StackOverflow.";
var stopwords = ['this'];

var words = text.split(/\W+/).filter(function(token) {
    token = token.toLowerCase();
    return token.length >= 2 && stopwords.indexOf(token) == -1;
});

console.log(words); // ["is", "short", "text", "about", "StackOverflow"]


<form onsubmit="setTimeout('document.forms[0].reset()', 2000)"...
Get the text content of the first <button> element in the document:

var x = document.getElementsByTagName("BUTTON")[0].textContent;


//LEER ARCHIVO
function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
   // mostrarContenido(contenido);
   document.getElementById("contenidofile").textContent = e.target.result;
  }
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById('contenidofile');
  elemento.innerHTML = contenido;
}

//MUESTRA ARCHIVO
function printFileContents (contents) {
  area.style.lineHeight = '30px';
  area.textContent = '';
  let lines = contents.split(/\n/);

  lines.forEach(line => area.textContent += line + '\n');
}


Con JavaScript puro (Sin Librerias, ni frameworks) mediante className para añadir una determinada clase a un elemento, tener en cuenta que lo que tienes es una clase y no un id para que identifique a tu elemento, retornará un arreglo al hacer  getElementsByClassName por eso el uso del for. el += es para concatenar la cadena del atributo class por tal motivo el espacio al inicio si no terminarían juntas las dos clases

var elemento = document.getElementsByClassName("images");
for(var i = 0; i < elemento.length; i++)
    elemento[i].className += " col-md-6";
Sí su elemento tuviese un identificador (id) sería de forma directa

var elemento = document.getElementById("images");
elemento.className += " col-md-6";
Por medio de Jquery , usaría addClass para añadir el nombre de una clase a un determinado elemento del HTML

$('.images').addClass('col-md-6');


/*
switch(document.getElementById('leveldificultad').value)
{
case 1:
  alert(1);
  break;
case 2:
//formEval2(words,arrIndexSel);
  alert(2);
  break;
case 3:
  alert(3);
//formEval3(words,arrIndexSel);
  break;
case 4:
  var arr = collectIndexRandom(words.length, 9);
  formEval3(words,arr);
  break;
case 5:
  var arr = collectIndexRandom(words.length, 6);
  formEval3(words,arr);
  break;
case 6:
  var arr = collectIndexRandom(words.length, 3);
  formEval3(words,arr);
  break;

 }
 */


