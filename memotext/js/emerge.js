var Wextensible=Wextensible||{};
Wextensible.FORM_EMERGE_JS=function(){
	Wextensible.FormEmerge=(function(){
		var wxG=Wextensible.general;
		var PID="IDPRE";
		var PCL="CLPRE";
		var MAX_TABS=20;
		var forms=[];
		var formsAbiertos=0;

		function cerrarFormularios(){
			try{
				for(var i=0,maxi=forms.length;i<maxi;i++){
					var n=forms[i].nombre;var m=forms[i].abierto;
					if(forms[i].abierto){
						var temp=forms[i].eventoCerrar;
						forms[i].eventoCerrar=false;
						forms[i].cerrar();
						forms[i].eventoCerrar=temp;
						var marco=forms[i].form("marco");
						if(marco!=null)marco.style.display="none";
					}
				}
				formsAbiertos=0;
				var pantalla=document.getElementById(PID+"pantalla");
				if(pantalla!=null)pantalla.style.display="none";
			}catch(e){
				alert("Error al cerrar todos los formularios ("+e.message+")");
			}
		}

		function formRef(nombreForm){
			try{
				for(var i=0,maxi=forms.length;i<maxi;i++){
					if(forms[i].nombre==nombreForm)return forms[i];
				}
				return null;
			}
			catch(e){
				return null;
			}
		}

		var bodyWidth=0;

		var tempConstructor=
		function(nombreForm,cadenaTitulo,conPantalla,
			conBotones,moverForm,accionEnvio,metodoEnvio,dondePonerForm,ajustarAncho,botonMaximizar){
			this.PID=PID;this.PCL=PCL;this.nombre="";
			try{
				if((nombreForm!=null)&&(nombreForm!="")){
					if(formRef(nombreForm)!=null){
						alert("Ya ha sido creado el formulario '"+nombreForm+"'");
						return;
					}
					else{
						this.nombre=nombreForm;
					}
				}
				else{
					alert("El nombre del formulario es obligatorio");
					return;
				}
			}catch(e){
				alert("Error al comprobar nombre para nuevo formulario "+nombreForm);
				return;
			}
			this.titulo=nombreForm;
			if((cadenaTitulo!=null)&&(cadenaTitulo!="")) this.titulo=cadenaTitulo;var htmlGen="";
			this.pantalla=conPantalla;
			if(conPantalla){
				var pant=document.getElementById(PID+"pantalla");
				if(pant==null){
					var sty='style="';
					var prefOpacity=wxG.vpForCss["opacity"];
					if(prefOpacity){
						sty+=wxG.descambiaGuiones(prefOpacity)+": 0.6; ";
					}
					else{
						sty+="filter: alpha(opacity=60); ";
					}
					htmlGen+='<div id="'+PID+'pantalla" '+sty+'" '+'onclick="'+this.nombre+'.cerrarFormulario()">&nbsp;</div>';
				}
			}
			this.botones=conBotones;
			this.idObjetoRespuesta=PID+this.nombre+"objetoRespuesta";
			try{
				htmlGen+="<input type='hidden' id='"+this.idObjetoRespuesta+"' value='' />";
			}
			catch(e){
				alert("Error al establecer objeto respuesta para "+this.form+": "+e.message);
			}
			this.respuesta="";
			this.operacionRespuesta=null;
			this.eventoAbrir=false;
			this.eventoAceptar=false;
			this.eventoCancelar=false;
			this.eventoAplicar=false;
			this.eventoCerrar=false;
			this.ejecutaEventoAbrir=function(){};
			this.ejecutaEventoAceptar=function(){};
			this.ejecutaEventoCancelar=function(){};
			this.ejecutaEventoAplicar=function(){};
			this.ejecutaEventoCerrar=function(){};
			this.botonPulsado="";
			this.abierto=false;
			this.totalTabs=0;
			this.numTab=-1;
			this.eventoPestanya=false;
			this.ejecutaEventoPestanya=function(){};
			this.mover="todo";
			if(moverForm=="nada"){
				this.mover="nada";
			}
			else if(moverForm=="marco"){
				this.mover="marco";
			}
			else{
				this.mover="todo";
			}
			this.iniciaMover=false;
			this.xMover=0;
			this.yMover=0;
			if(this.mover=="marco"){
				var sty='style="';
				var prefOpacity=wxG.vpForCss["opacity"];
				if(prefOpacity){
					sty+=wxG.descambiaGuiones(prefOpacity)+": 0.6; ";
				}
				else{
					sty+="filter: alpha(opacity=60); ";
				}
				htmlGen+='<div id="'+PID+this.nombre+'marco" '+'unselectable="on" class="'+PCL+'marco" '+sty+
				wxG.descambiaGuiones(wxG.vpForCss["user-select"])+': none;" ';
				if(wxG.touch){
					htmlGen+='ontouchstart="'+this.nombre+'.moverMarco(event)" '+'ontouchmove="'+this.nombre+'.moverMarco(event)" '+'ontouchend="'+
					this.nombre+'.moverMarco(event)" '+'ontouchleave="'+this.nombre+'.moverMarco(event)" ';
				}
				if(wxG.mouse){
					htmlGen+='onmouseup="'+this.nombre+'.moverMarco(event)" '+'onmousemove="'+this.nombre+'.moverMarco(event)" '+'onmouseout="'+
					this.nombre+'.moverMarco(event)" '+'onmouseleave="'+this.nombre+'.moverMarco(event)" ';}
					htmlGen+='></div>';}
					this.paraEnvio=false;
					this.accionEnvio="";
					this.metodoEnvio="post";
					if((accionEnvio!=null)&&(accionEnvio!="")){
						this.paraEnvio=true;this.accionEnvio=accionEnvio;
						if((metodoEnvio!=null)&&(metodoEnvio!="")&&((metodoEnvio.toLowerCase()=="get")||(metodoEnvio.toLowerCase()=="post"))){
							this.metodoEnvio=metodoEnvio;}}this.idDondeForm="";
							if((dondePonerForm!=null)&&(dondePonerForm!="")){
								this.idDondeForm=dondePonerForm;}this.zIndexBase=10000000;
								this.ajustarAncho=ajustarAncho;
								this.botonMaximizar=botonMaximizar;
								this.dataMax={max:false,tabdiv:false,wmin:0,hmin:0,wmax:0,hmax:0,left:0,top:0};
								this.indiceForm=forms.length;
								forms.push(this);
								this.forms=forms;
								try{
									var thtml="";
									thtml+='<form id="'+PID+this.nombre+'" unselectable="on" ';
									if(this.paraEnvio){
										thtml+='action="'+this.accionEnvio+'" '+'method="'+this.metodoEnvio+'" ';
									}
									if(this.mover=="todo"){
										if(wxG.touch){
											thtml+='ontouchmove="'+this.nombre+'.moverTodo(1, event)" ';
											thtml+='ontouchleave="'+this.nombre+'.moverTodo(2, event)" ';
										}
										if(wxG.mouse){thtml+='onmousemove="'+this.nombre+'.moverTodo(1, event)" '+'onmouseout="'+
											this.nombre+'.moverTodo(2, event)" '+'onmouseleave="'+this.nombre+'.moverTodo(2, event)" ';}
									}
									if(wxG.touch){
										thtml+='ontouchend="'+this.nombre+'.traerAlFrente(event)" ';
									}
									if(wxG.mouse){
										thtml+='onmouseup="'+this.nombre+'.traerAlFrente()" ';
									}
									thtml+='class="'+PCL+'form-emerge" style="z-index: '+this.zIndexBase+'; '+
									wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none; ">';
									thtml+='<div id="'+PID+this.nombre+'Barra" unselectable="on" '+'class="'+PCL+
									'form-emerge-cabeza" '+'style="'+wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none;">';
									thtml+='<div class="'+PCL+'form-emerge-boton-cerrar" unselectable="on" '+'id="'+
									PID+this.nombre+'Boton-cerrar" '+'style="'+
									wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none;" '+'onclick="'+this.nombre+'.cerrar()" '+'>&times;</div>';
									if(this.botonMaximizar){
										thtml+='<div class="'+PCL+'form-emerge-boton-maximizar" unselectable="on" '+'id="'+
										PID+this.nombre+'Boton-maximizar" '+'style="'+
										wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none;" '+'onclick="'+
										this.nombre+'.maximizar()" '+'><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>';
									}
									thtml+='<div id="'+PID+this.nombre+'Titulo" unselectable="on" '+'style="'+
									wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none; ';
									if(this.mover=="nada")thtml+='cursor: no-drop; ';
									thtml+='" class="'+PCL+'form-emerge-titulo" ';
									if(wxG.touch){
										thtml+='ontouchend="'+this.nombre+'.traerAlFrente(event)" ';
									}
									if(wxG.mouse){thtml+='onclick="'+this.nombre+'.traerAlFrente()" ';
				}
				if(this.mover!="nada"){
					thtml+='style = "cursor: move" ';
					if(this.mover=="todo"){
						if(wxG.touch){
							thtml+='ontouchstart="'+this.nombre+'.moverTodo(0, event)" ';
						}
						if(wxG.mouse){
							thtml+='onmousedown="'+this.nombre+'.moverTodo(0, event)" '+'onmouseup="'+this.nombre+'.moverTodo(2, event)" ';
						}
					}
					else{
						if(wxG.touch){
							thtml+='ontouchstart="'+this.nombre+'.moverMarco(event)" ';
						}
						if(wxG.mouse){
							thtml+='onmousedown="'+this.nombre+'.moverMarco(event)" '+'onmouseup="'+this.nombre+'.moverMarco(event)" ';
						}
					}
				}
				thtml+='>'+this.titulo+'</div></div>';
				thtml+='<div id="'+PID+this.nombre+'Interior" ';
				if(wxG.touch){
					thtml+='ontouchend="'+this.nombre+'.traerAlFrente(event)" ';
				}
				thtml+='class="'+PCL+'form-emerge-interior" '+'data-font-size="1" ';
				if(this.ajustarAncho){thtml+='style="max-width: '+(document.body.offsetWidth-16)+'px; "';}thtml+='></div>';
				if(this.botones>0){thtml+='<fieldset id="'+PID+this.nombre+'Botones" unselectable="on" '+'style="'+
					wxG.descambiaGuiones(wxG.vpForCss['user-select'])+': none;" ';
				if(wxG.touch){
					thtml+='ontouchend="'+this.nombre+'.traerAlFrente(event)" ';
			}
			thtml+='class="'+PCL+'form-emerge-botones">'+'<input id="'+PID+this.nombre+'BotonAceptar" ';
			if(this.paraEnvio){thtml+='type="submit" value="enviar" ';
		}
		else{
			thtml+='type="button" value="aceptar" ';}thtml+='onclick = "'+this.nombre+'.aceptar()" />';
				if(this.botones>1){
					thtml+='<input type="button" id="'+PID+this.nombre+'BotonCancelar" '+'value="cancelar" onclick="'+this.nombre+'.cancelar()" />';
				}
				if(this.botones>2){
					thtml+='<input id="'+PID+this.nombre+'BotonAplicar" ';
				if(this.paraEnvio){
					thtml+='type="reset" value="borrar" ';
			}
			else{
				thtml+='type="button" value="aplicar" ';
			}
			thtml+='onclick="'+this.nombre+'.aplicar()" />';
		}
		thtml+='</fieldset>';
	}
	thtml+='<div  id="'+PID+this.nombre+'Dimensionar" ';
	if(wxG.touch){
		thtml+='onclick="'+this.nombre+'.traerAlFrente(event)" ';
	}
	thtml+='class = "'+PCL+'form-emerge-dimensionar">'+'<input type="button" onclick="'+
	this.nombre+'.dimensionar(1)" value="+" />'+'<input type="button" onclick="'+
	this.nombre+'.dimensionar(-1)" value="-" />'+'</div>';thtml+='</form>';htmlGen+=thtml;
	if(this.idDondeForm==""){
		var htmlDin=document.getElementById("htmldin");
		if(!htmlDin){htmlDin=document.createElement("div");
				htmlDin.id="htmldin";
				document.body.appendChild(htmlDin);
			}
			var frag=document.createDocumentFragment();
			var div=document.createElement("div");
			div.innerHTML=htmlGen;
			frag.appendChild(div);
			htmlDin.appendChild(frag);
		}
		else{
			var elemento=document.getElementById(this.idDondeForm);
			if(elemento){
				if(elemento.innerHTML!=""){
					alert("Error al crear dinámicamente el nuevo formulario "+this.nombre+": el elemento '"+
						this.idDondeForm+"' para ubicar "+"el formulario debe estar vacío.");
				}else{
					elemento.innerHTML=htmlGen;
				}
			}else{
				alert("Error al crear dinámicamente el nuevo formulario "+this.nombre+": no existe el elemento '"+
					this.idDondeForm+"' para ubicar "+"el formulario.");
				return;
			}
		}
	}catch(e){
		alert("Error al crear dinámicamente el nuevo formulario "+this.nombre+": "+e.message);
			}
		};

			tempConstructor.prototype.form=function(idElementoSinPrefijo,omitirPrefijo){
				try{
					if(idElementoSinPrefijo==null){
						return document.getElementById(PID+this.nombre);
					}else{
						if((omitirPrefijo==null)||(!omitirPrefijo)){
							return document.getElementById(PID+this.nombre+idElementoSinPrefijo);
						}else{
					return document.getElementById(idElementoSinPrefijo);
				}
			}
		}catch(e){
			return null;
		}
	};

	tempConstructor.prototype.nuevoInterior=function(html){
					try{
						var inter=this.form("Interior");
						inter.innerHTML=html;
				}catch(e){alert("Error con nuevo interior para "+this.nombre+": "+e.message);
			}
		};

		tempConstructor.prototype.anexaInterior=function(html,antesDespues){
			try{
				var inter=this.form("Interior");
				var ad="despues";
				if((antesDespues==null)||(antesDespues=="")){ad="despues";}
				else if((antesDespues=="antes")||(antesDespues=="despues")){ad=antesDespues;}
				if(ad=="antes"){inter.innerHTML=html+inter.innerHTML;
				}else{
					inter.innerHTML=inter.innerHTML+html;
				}
			}catch(e){alert("Error al anexar interior para "+this.nombre+": "+e.message);
		}
	};

	tempConstructor.prototype.creaTabs=function(arrayNombres,arrayHtmls,ancho,alto,antesDespues){
		try{
			var anchoAltoTabdiv="";
			if((ancho!=null)&&(ancho!="")){
				anchoAltoTabdiv="width: "+ancho+";";
			}
			if((alto!=null)&&(alto!="")){
				anchoAltoTabdiv+="height: "+alto+";";
			}
			if(anchoAltoTabdiv!="")anchoAltoTabdiv="style = '"+anchoAltoTabdiv+"' ";
			this.totalTabs=arrayNombres.length;
			if(this.totalTabs>MAX_TABS)this.totalTabs=MAX_TABS;
			if(this.totalTabs<1){
				alert("Error en el número de pestañas de "+this.nombre);
			}else{
				if(arrayHtmls.length<this.totalTabs){
					for(var i=arrayHtmls.length,maxi=this.totalTabs;i<maxi;i++){
						arrayHtmls[i]="&nbsp";}
					}
					var thtml="<div id='"+PID+this.nombre+"ContieneTabs'>"+"<table class = '"+PCL+"form-emerge-tabs'><tr>";
					for(var i=0,maxi=this.totalTabs;i<maxi;i++){
						thtml+="<th class = '"+PCL+"form-emerge-tabcks'>&nbsp;</th>"+"<th id = '"+PID+this.nombre+"Tabck"+i+"' "+"class = '"+PCL+"form-emerge-tabck' "+"onclick = '"+this.nombre+".activaTab(this)'>";
						thtml+=arrayNombres[i]+"</th>";
					}
					thtml+="</tr>";
						thtml+="<tr><td colspan='"+(2*this.totalTabs)+"' >";
						for(var i=0,maxi=this.totalTabs;i<maxi;i++){
							thtml+="<div id = '"+PID+this.nombre+"Tabdiv"+i+"' "+"class='"+PCL+"form-emerge-tabdiv' "+anchoAltoTabdiv+">"+arrayHtmls[i]+"</div>";
						}
						thtml+="</td></tr></table></div>";var ad="antes";
						if((antesDespues!=null)&&(antesDespues!=""))ad=antesDespues;
						this.anexaInterior(thtml,ad);
						this.activaTab(0);}}
						catch(e){
							alert("Error al crear pestañas para "+this.nombre+": "+e.message);
						}
					};

	tempConstructor.prototype.abrir=function(interior,titulo,izquierda,arriba,ancho,alto,sobresale,foco){
								try{this.iniciaMover=false;this.xMover=0;this.yMover=0;this.botonPulsado="";
								if(this.pantalla){
									cerrarFormularios();
									document.getElementById(PID+"pantalla").style.display="block";
								}
								if((titulo!=null)&&(titulo!="")){if(titulo!=""){this.titulo=titulo;wxG.setInnerText(this.form("Titulo"),titulo);
			}}var elemInter=this.form("Interior");
			if((interior!=null)&&(interior!=""))this.nuevoInterior(interior);
			this.form().style.display="block";
			if((alto!=null)&&(alto!=""))elemInter.style.height=alto;
			var anchoBody=9999999;
			if((ancho!=null)&&(ancho!="")){
				if(this.ajustarAncho){
					anchoBody=document.body.offsetWidth-16;
					try{
						elemInter.style.maxWidth=anchoBody+"px";
				}catch(e){}
			}
			elemInter.style.width=ancho;
		}
		if(sobresale)elemInter.style.overflow=sobresale;
		this.form().style.left=0;
		if((izquierda!=null)&&(izquierda!="")){
			if(izquierda=="center"){
				izquierda=parseInt((document.body.offsetWidth-this.form().offsetWidth)/2,10);
			}
			if(isNaN(izquierda))izquierda=0;
			var derechaBody=document.body.offsetWidth;
			var derechaForm=izquierda+this.form().offsetWidth;
			if(derechaForm>derechaBody)izquierda=izquierda-(derechaForm-derechaBody);
			this.form().style.left=izquierda+"px";
		}
		this.form().style.top=0;
		if((arriba!=null)&&(arriba!="")){if(arriba=="center"){
			var bst=0;
			if(document.body.scrollTop){
				bst=document.body.scrollTop;
			}else if(document.documentElement.scrollTop){
				bst=document.documentElement.scrollTop;
			}
			arriba=parseInt((window.innerHeight-this.form().offsetHeight)/2,10)+bst;
		}
		if(isNaN(arriba))arriba=0;
		var abajoBody=document.body.offsetHeight;
		var abajoForm=arriba+this.form().offsetHeight;
		if(abajoForm>abajoBody)arriba=arriba-(abajoForm-abajoBody);
		this.form().style.top=arriba+"px";
	}
	bodyWidth=document.body.clientWidth;
	var objetoRespuesta=document.getElementById(this.idObjetoRespuesta);
	if(objetoRespuesta){

						if(objetoRespuesta.hasAttribute("value")){
							this.respuesta=objetoRespuesta.value;
						}else{
							this.respuesta=wxG.getInnerText(objetoRespuesta);
						}
					}
					var focoEnBoton=true;if(foco!=null){
						switch(typeof(foco)){
						case"number":this.form()[foco].focus();
						focoEnBoton=false;
						break;
						case"object":foco.focus();
						focoEnBoton=false;
						break;
						case"string":
						if(foco!=""){
							this.form(foco,true).focus();
							focoEnBoton=false;
							break;}
						}
					}if(focoEnBoton){
						if(this.botones==1){
						this.form("BotonAceptar").focus();}else if(this.botones>1){
							this.form("BotonCancelar").focus();}
						}
						if(this.botonMaximizar){
							var wmin=0,hmin=0,fw=0.9,fh=0.8;
							if(this.totalTabs>0){
								this.dataMax.tabdiv=true;
								for(var i=0,maxi=this.totalTabs;i<maxi;i++){
									var tabdiv=this.form("Tabdiv"+i);
									wmin=Math.max(wmin,tabdiv.offsetWidth);
									hmin=Math.max(hmin,tabdiv.offsetHeight);}
						this.form("Interior").style.width="auto";
						this.form("Interior").style.height="auto";}else{
						this.dataMax.tabdiv=false;
						wmin=this.form("Interior").offsetWidth;
						hmin=this.form("Interior").offsetHeight;
					}
					try{
						if(!this.ajustarAncho||wmin<anchoBody)
							this.form("Interior").style.maxWidth="none";
						this.form("Interior").style.maxHeight="none";
					}catch(e){}
					this.dataMax.wmin=wmin;
					this.dataMax.hmin=hmin;
					this.dataMax.wmax=Math.round((window.innerWidth||document.documentElement.clientWidth)*fw,0);
					this.dataMax.hmax=Math.round((window.innerHeight||document.documentElement.clientHeight)*fh,0);
					this.dataMax.max=false;}this.abierto=true;
					formsAbiertos++;
					this.traerAlFrente();
					if(this.eventoAbrir)this.ejecutaEventoAbrir();
				}catch(e){
					alert("Error al abrir "+this.nombre+": "+e.message);
			}
			};

					tempConstructor.prototype.activaTab=function(unTab){
						try{
							this.numTab=0;
						if(typeof(unTab)=="object"){
							var cad=unTab.id;
							var idTab=cad.split("Tabck");
					this.numTab=parseInt(idTab[1]);}
					else if(typeof(unTab)=="number"){
						this.numTab=unTab;
					}else{
						this.numTab=0;
					}
					var esteTabDiv=this.form("Tabdiv"+this.numTab);
					for(var i=0,maxi=this.totalTabs;i<maxi;i++){
						var tabdiv=this.form("Tabdiv"+i);
						var tabck=this.form("Tabck"+i);
						if(tabdiv.id==esteTabDiv.id){
							tabdiv.style.display="block";
							tabck.style.color="blue";
							tabck.style.backgroundColor="rgb(230,230,205)";
							tabck.style.borderBottom="rgb(230,230,205) solid 1px";
						}else{
							tabdiv.style.display="none";
							tabck.style.color="white";
							tabck.style.backgroundColor="gray";
							tabck.style.borderBottom="gray solid 1px";
						}
					}if(this.eventoPestanya)this.ejecutaEventoPestanya();
				}catch(e){
					alert("Error al activar una pestaña de "+this.nombre+": "+e.message);
				}
			};
					
					tempConstructor.prototype.dotarRespuesta=function(){
						var valorAnterior,resultado,attrValue=false;
						var objetoRespuesta=document.getElementById(this.idObjetoRespuesta);
						try{
							attrValue=objetoRespuesta.hasAttribute("value");
						}catch(e){attrValue=false;}
						if(attrValue){valorAnterior=objetoRespuesta.value;}
						else{valorAnterior=wxG.getInnerText(objetoRespuesta);}
					if(this.operacionRespuesta!==null){
						resultado=valorAnterior+this.operacionRespuesta+this.respuesta;
					}else{
						resultado=this.respuesta;
					}if(attrValue){
						objetoRespuesta.value=resultado;
					}else{
						wxG.setInnerText(objetoRespuesta,resultado);
					}
				};

				tempConstructor.prototype.aceptar=function(){
					try{
						this.botonPulsado="aceptar";
						this.form().style.zIndex=this.zIndexBase;
						this.form().style.display="none";
						if(this.eventoAceptar)this.ejecutaEventoAceptar();
						this.dotarRespuesta();
						if(formsAbiertos>0)formsAbiertos--;
						if((this.pantalla)&&(formsAbiertos==0)){
							document.getElementById(PID+"pantalla").style.display="none";}
							if(this.botonMaximizar&&this.dataMax.max)this.maximizar();this.abierto=false;}
							catch(e){alert(this.nombre+", error método aceptar(): "+e.name+", "+e.message);
				this.botonPulsado="";
			}};

			tempConstructor.prototype.aplicar=function(){
				try{
					this.botonPulsado="aplicar";
			if(this.eventoAplicar)this.ejecutaEventoAplicar();this.dotarRespuesta();}
			catch(e){
				alert(this.nombre+", error método aplicar(): "+e.name+", "+e.message);
				this.botonPulsado="";}
			};

				tempConstructor.prototype.cancelar=function(){
					this.botonPulsado="cancelar";
			try{this.respuesta="";this.form().style.zIndex=this.zIndexBase;this.form().style.display="none";
			if(this.eventoCancelar)this.ejecutaEventoCancelar();if(formsAbiertos>0)formsAbiertos--;
			if((this.pantalla)&&(formsAbiertos==0)){document.getElementById(PID+"pantalla").style.display="none";}
			if(this.botonMaximizar&&this.dataMax.max)this.maximizar();
				this.abierto=false;
			}catch(e){alert(this.nombre+", error método cancelar(): "+e.name+", "+e.message);
			}
		};

		tempConstructor.prototype.cerrar=function(){
			this.botonPulsado="cerrar";
		try{this.respuesta="";this.form().style.display="none";this.form().style.zIndex=this.zIndexBase;
		if(this.eventoCerrar)this.ejecutaEventoCerrar();if(formsAbiertos>0)formsAbiertos--;
		if((this.pantalla)&&(formsAbiertos==0)){
			document.getElementById(PID+"pantalla").style.display="none";}
			if(this.botonMaximizar&&this.dataMax.max)this.maximizar();
				this.abierto=false;
			}catch(e){
				alert(this.nombre+", error método cerrar(): "+e.name+", "+e.message);
			}
		};

				tempConstructor.prototype.maximizar=function(){
					try{
						if(this.botonMaximizar){
						var w=0,h=0,left=0,top=0;
						if(this.dataMax.max){
							this.dataMax.max=false;
							w=this.dataMax.wmin;
							h=this.dataMax.hmin;
							left=this.dataMax.left;
							top=this.dataMax.top;
						}else{
							this.dataMax.max=true;w=this.dataMax.wmax;
							h=this.dataMax.hmax;this.dataMax.left=this.form().offsetLeft;
							this.dataMax.top=this.form().offsetTop-document.body.scrollTop-document.documentElement.scrollTop;
				}
				if(this.dataMax.tabdiv){
					for(var i=0,maxi=this.totalTabs;i<maxi;i++){
					var tabdiv=this.form("Tabdiv"+i);tabdiv.style.width=w+"px";tabdiv.style.height=h+"px";
				}
			}else{this.form("Interior").style.width=w+"px";this.form("Interior").style.height=h+"px";}this.form().style.left=left+"px";
			this.form().style.top=(top+document.body.scrollTop+document.documentElement.scrollTop)+"px";}
		}catch(e){
			alert(this.nombre+", error método maximizar(): "+e.name+", "+e.message);}
		};

			tempConstructor.prototype.moverTodo=function(modo,evento){
				try{
					var evt=window.event||evento;var touch=(evt.type.indexOf("touch")>-1);
			var tev;
			if(touch){
				tev=evt.changedTouches[0];
			}else{tev=evt;}
			switch(modo){
				case 0:{
					if(evt.preventDefault){evt.stopPropagation();
						evt.preventDefault();}
			this.xMover=tev.clientX;this.yMover=tev.clientY;
					this.iniciaMover=true;break;
				}
					case 1:{if(this.iniciaMover){
						if(evt.preventDefault){
							evt.stopPropagation();
							evt.preventDefault();
						}
						var diferx=tev.clientX-this.xMover;
						var difery=tev.clientY-this.yMover;
						var izq=this.form().offsetLeft+diferx;
						var sup=this.form().offsetTop+difery;
						this.form().style.left=izq+"px";
						this.form().style.top=sup+"px";
						this.xMover=tev.clientX;
						this.yMover=tev.clientY;}
						break;}
					case 2:{
						if(wxG.touch&&evt.preventDefault){
							evt.stopPropagation();
							evt.preventDefault();}this.iniciaMover=false;}}
						}catch(e){}
					};

					tempConstructor.prototype.moverMarco=function(event){
						try{var evt=event||window.event;
								if(evt.preventDefault){evt.stopPropagation();
									evt.preventDefault();
								}
								var touch=(evt.type.indexOf("touch")>-1);
								var tev;
								if(touch){tev=evt.changedTouches[0];}else{
									tev=evt;}
									var elemento=tev.target||tev.srcElement;
									var marco=this.form("marco");
									var classTag=elemento.className;
									var wsx=window.scrollX||document.documentElement.scrollLeft;
									var wsy=window.scrollY||document.documentElement.scrollTop;
									if((evt.type=="mousedown")||(evt.type=="touchstart")){
									if(classTag==(PCL+"form-emerge-titulo")){
										marco.style.left=(this.form().offsetLeft-wsx)+"px";
										marco.style.top=(this.form().offsetTop-wsy)+"px";
										marco.style.width=this.form().offsetWidth+"px";
					marco.style.height=this.form().offsetHeight+"px";
					marco.style.display="block";
					this.xMover=tev.clientX;
					this.yMover=tev.clientY;
					this.iniciaMover=true;}
				}else if((evt.type=="mousemove")||(evt.type=="touchmove")){
						if(this.iniciaMover){var izq=marco.offsetLeft+tev.clientX-this.xMover;
						var sup=marco.offsetTop+tev.clientY-this.yMover;
						marco.style.left=izq+"px";marco.style.top=sup+"px";this.xMover=tev.clientX;
					this.yMover=tev.clientY;
				}
			}else if((evt.type=="mouseup")||(evt.type=="mouseout")||(evt.type=="mouseleave")||(evt.type=="touchend")||(evt.type=="touchleave")){
				if(this.iniciaMover){
					this.iniciaMover=false;
					this.form().style.left=(marco.offsetLeft+wsx)+"px";this.form().style.top=(marco.offsetTop+wsy)+"px";
					marco.style.display="none";
				}
			}
		}catch(e){this.form("marco").style.display="none";}
};

tempConstructor.prototype.traerAlFrente=function(event){
				try{
					var evt=event||window.event;
					var touch=false,tev;if(evt!=undefined){touch=(evt.type.indexOf("touch")>-1);
					if(touch){tev=evt.changedTouches[0];}else{tev=evt;}
				}
				if(formsAbiertos>1){for(var i=0,maxi=forms.length;i<maxi;i++){
						var zi=forms[i].zIndexBase;var nombre=forms[i].nombre;
						if(forms[i].nombre==this.nombre)zi+=100000;
						if(forms[i].form()){forms[i].form().style.zIndex=zi;}
					}
					}if(touch&&(evt.type=="touchend")&&(this.mover=="todo")&&(tev.target.id)&&(tev.target.id==(PID+this.nombre+"Titulo"))){
						this.moverTodo(2,event);
					}
				}catch(e){alert("Error al traer al frente "+this.nombre+": "+e.message);}
			};

			tempConstructor.prototype.dimensionar=function(masMenos){
				try{
					var fs=parseFloat(this.form("Interior").getAttribute("data-font-size"));
					fs=fs+masMenos*0.2;
					if(fs<0.4)fs=0.4;
					if(fs>2)fs=2;
					this.form("Interior").setAttribute("data-font-size",fs);
			this.form("Interior").style.fontSize=fs+"em";}catch(e){}};
			tempConstructor.prototype.cerrarFormulario=function(){cerrarFormularios();};
			tempConstructor.prototype.getPID=function(){return PID;};
				tempConstructor.prototype.getPCL=function(){return PCL;};
						wxG.prefijarCss(["user-select","opacity"]);
						window.onresize=function(){
							if(formsAbiertos>0){
							if(document.body.clientWidth!=bodyWidth){
						for(var i=0,maxi=forms.length;i<maxi;i++){
						if(forms[i].abierto)forms[i].cerrar();
					}
				}
			}
		};
			return tempConstructor;
		})
();

		};