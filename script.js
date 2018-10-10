var arrayMetas=[];
var contadorClics=0;//Cuenta las veces que se da al botón de nuevo propósito.
const list = document.getElementById('todo-list')//Guarda la lista ul del html en el objeto list.
const itemCountSpan = document.getElementById('item-count')//Span que contiene un número que se incrementa o decrementa dependiendo del número de propositos.
const button=document.getElementsByTagName('button')[0];//Botón de nuevo propósito.
const uncheckedCountSpan = document.getElementById('unchecked-count')//Span que cotiene el número de propositos no hechos (unchecked).

window.onload=function(){//Cuando cargas la página hace
	imprimirBotonPanico();//Cuando carga la página imprime el botón de cerrar todo.
	button.onclick=function(){//Cuando clicas en el botón de nuevo propósito.
		imprimirCheckbox();//Crea la estructura li>checkbox+boton de cerrar.
		colorearLi();//Colorea los li de dos colores diferentes , se actualiza cada 20 milisegundos. 
		llenarArrayMetas();
		setInterval(function(){ deleteElements() }, 200);//Vigila que ninguno de los botones de los checkbox ha sido apretado, en caso contrario elimina el li.
		setInterval(function(){ deleteAllElements() }, 200);//Vigila el botón de "close all" y si se aprieta borra todos los li con sus hijos.
}	
	setInterval(function(){ checkedCheckbox() }, 200);//Vigila los checkbox 
}

function colorearLi(){
for(let i=0 ; i<contadorClics ; i++){
li=buscarLi(i);
if(i%2==0){
	li.style.backgroundColor="#7ca887";
}
else{
	li.style.backgroundColor="#f3f5cc";
}
}
}

function llenarArrayMetas(){
	arrayMetas[0]="Learn english";
	arrayMetas[1]="Footing twice a week";
	arrayMetas[2]="lose weight";
	arrayMetas[3]="Go to gym";
	arrayMetas[4]="Eat healthy food";
	arrayMetas[5]="Learn Javascript";
}



function imprimirCheckbox(){//Imprime la estructura li>checkbox+boton.
	var li=document.createElement("li");//Creamos el elemento li de la lista.
	var checkbox = document.createElement("INPUT");//Creamos un input type="checkbox"
	var texto = document.createElement("input");//Creamos un input type="text"
	var boton=document.createElement("input");//Creamos un input type="button"
	boton.setAttribute("type","button");
	boton.setAttribute("class","boton_cerrar");
	boton.value="X";//Le asignamos un texto al botón
	li.setAttribute("class","lista");//Le asignamos una clase a la lista.
	texto.setAttribute("size","60");  //Asignamos tamaño al cuadro de texto.
	texto.setAttribute("value",arrayMetas[contadorClics]);//Llenar texto con el contenido del array "arrayMetas[]"
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("class","check");

	list.appendChild(li);//Hacemos a li hijo de la lista (ul).
	document.getElementsByTagName("li")[contadorClics].appendChild(checkbox);//Hacemos al checkbox hijo de li en la posicion que le corresponde para que no se solapen.  
	document.getElementsByTagName("li")[contadorClics].appendChild(texto);//Hacemos el cuadro de texto hijo de li en su posición.                      
	document.getElementsByTagName("li")[contadorClics].appendChild(boton);//Hacemos al boton de cerrar hijo de li también.
	incrementarContador();//Incrementamos el contador (itemCountSpan).
	actualizarContador();//Lo actualizamos.
}

function imprimirBotonPanico(){//Imprime botón de cerrar todo.
	var botonPanico=document.createElement("input");//Crea el boton.
	botonPanico.setAttribute("type","button");
	botonPanico.value="Close all";//Le asigna un texto
	botonPanico.setAttribute("id","boton_panico");//Le asigna una id
	var father=document.getElementsByTagName("div")[0];//Selecciona el padre de donde queremos el botón situado
	father.insertBefore(botonPanico,father.children[2]);//Ponemos al boton como segundo hijo del primer div del html.	
}

function actualizarContador() {//Asigna al span el valor actual del contador.
	itemCountSpan.innerHTML=contadorClics;
}



function checkedCheckbox(){//Comprueba si alguno de los checkbox esta checked.
	var contadorChecks=0;
	for(var i=0 ; i<contadorClics ; i++){
		if(document.getElementsByClassName("check")[i].checked){
    		contadorChecks++;
    	}	
    }
    contadorChecks=contadorClics-contadorChecks;//Los uncheckeds son iguales a todos menos los checked.
	uncheckedCountSpan.innerHTML=contadorChecks;//Asignamos el valor al unchecked span
}


function deleteElements(){
	var ul,filaEliminada,fila,lista;
    lista=document.getElementsByTagName("ul")[0];
    for(let pos=0 ; pos<contadorClics && contadorClics>0 ; pos++){
    	filas=buscarLi(pos);
    	filas.getElementsByClassName("boton_cerrar")[0].onclick=function(){
    	filaEliminada=buscarLi(pos);
    	lista.removeChild(filaEliminada);
    	contadorClics--;
    }
}
}

function buscarLi(posicion){
var ul=document.getElementsByTagName("ul")[0];	
var li=ul.getElementsByTagName("li")[posicion];
return li;
}    
	
function incrementarContador(){//Incrementa el contador de clics.
	contadorClics++;	
}

function deleteAllElements(){//Borra todos los elementos (li).
	var botonPanico=document.getElementById("boton_panico");
	var ul=document.getElementsByTagName("ul")[0];
	botonPanico.onclick=function(){
		for(var i=contadorClics-1 ; i>-1 ; i--){
    		let li=buscarLi(i);
   			ul.removeChild(li);
}
		contadorClics=0;
}
	actualizarContador();
}