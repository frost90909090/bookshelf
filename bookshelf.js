var titulo,autor,tags,numPaginas,pagina;
const result = []
function pesquisar(){
	if(isNaN(pagina)){
		pagina = 1;
	}
	var i;
	result.length = 0;
	titulo = $('#tituloSearch').val();
	autor = $('#artistaSearch').val();
	tags = $('#tagsSearch').val();
	//pagina = getPagina();
	if(titulo == null){
		titulo = "";
	}
	if(autor == null){
		autor = "";
	}
	if(tags == null){
		tags = "";
	}
	var data = new FormData();
	data.append('titulo',titulo);
	data.append('autor',autor);
	data.append('tags',tags);
	data.append('p',pagina);
	var xhr = new XMLHttpRequest();
	xhr.open('POST',"bookshelf.php");
	xhr.onload = function(){
		var i, count, buff;
		var resultado = this.response;
		numPaginas = 50;
		count = 0;
		buff = "";
		for(i = 1; i< resultado.length; i++){
			if(resultado[i] == "$" || i >= resultado.length){
				result[count] = buff;
				buff = "";
				count++;
			}
			else{
				buff = buff + resultado[i];
			}
		}
		i = 0;
		for(i = 0 ; i < result.length; i++){
			result[i] = JSON.parse(result[i]);
		}
		preencherEstante();
	//	console.log(this.response);
	};
	xhr.send(data);
	return false;
}

function preencherEstante(){
	var i;
	var html = "";
	var numRow = Math.floor(result.length/3);
	var resto = result.length%3;
	var t1,t2,t3;
	t1 = "";
	t2 = "";
	t3 = "";
	for(i = 0; i < numRow; i++){
		t1 = result[i*3]['titulo'].length < 34 ? result[i*3]['titulo'] : (result[i*3]['titulo'].substring(0,31) + "...");
		t2 = result[(i*3)+1]['titulo'].length < 34 ? result[(i*3)+1]['titulo'] : (result[(i*3)+1]['titulo'].substring(0,31) + "...");
		t3 = result[(i*3)+2]['titulo'].length < 34 ? result[(i*3)+2]['titulo'] : (result[(i*3)+2]['titulo'].substring(0,31) + "...");
		html += "<div class='row'>";
		html += "<div class='col-xs-4'><input type='image' class='book' src='albums/" +result[i*3]['pasta']+"/" +result[i*3]['capa']+"' onclick='window.location=\"http://192.168.0.3/book.php?code=" +result[i*3]['codigo'] + "\"'/><p class='legenda'>"+ t1 +"</p></div>";
		html += "<div class='col-xs-4'><input type='image' class='book' src='albums/" +result[(i*3)+1]['pasta']+ "/" + result[(i*3)+1]['capa']+"' onclick='window.location=\"http://192.168.0.3/book.php?code="+result[(i*3)+1]['codigo'] + "\"'/><p class='legenda'>" + t2 + "</p></div>";
		html += "<div class='col-xs-4'><input type='image' class='book' src='albums/" +result[(i*3)+2]['pasta']+ "/" +result[(i*3)+2]['capa']+"' onclick='window.location=\"http://192.168.0.3/book.php?code=" +result[(i*3)+2]['codigo'] + "\"'/><p class='legenda'>" + t3 + "</p></div>";
		html += "</div>";
	}
	if(resto > 0){
		t1 = "";
		t2 = "";
		t1 = result[result.length-resto]['titulo'].length < 34 ? result[result.length-resto]['titulo'] : (result[result.length-resto]['titulo'].substring(0,31) + "...");
		t2 = result[result.length-resto+1]['titulo'].length < 34 ? result[result.length-resto+1]['titulo'] : (result[result.length-resto+1]['titulo'].substring(0,31) + "...");
		html += "<div class='row'>";
		if(resto > 0){
			html += "<div class='col-xs-4'><input type='image' class='book' src='albums/" +result[result.length-resto]['pasta']+ "/" + result[result.length-resto]['capa']+"' onclick='window.location=\"http://192.168.0.3/book.php?code=" + result[result.length-resto]['codigo'] + "\"'/><p class='legenda'>" + t1 + "</p></div>";

		}
		if(resto > 1){
			html += "<div class='col-xs-4'><input type='image' class='book' src='albums/" +result[result.length-resto+1]['pasta']+ "/" + result[result.length-resto+1]['capa']+"' onclick='window.location=\"http://192.168.0.3/book.php?code=" + result[result.length-resto+1]['codigo'] + "\"'/><p class='legenda'>" + t2 + "</p></div>";
		}
		html += "</div>";
	}
	$('#shelfDiv').html(html);	
	titulo = "";
	autor = "";
	tags = "";
	html = "";
	paginacao();
}

function changePage(change){
	pagina += change;
	if(pagina < 1){
		pagina = 1;
	}
	else if(pagina > (numPaginas/15)+1){
		pagina = numPaginas+1;
	}
	
}

function paginacao(){
	var ht = "";
	console.log(pagina);
	if(isNaN(pagina) || pagina < 4){
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=1;pesquisar();\">1</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=2;pesquisar();\">2</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=3;pesquisar();\">3</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=4;pesquisar();\">4</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=5;pesquisar();\">5</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=6;pesquisar();\">6</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"pagina=7;pesquisar();\">7</button></li>";
	}
	else{
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(-3);pesquisar();\">"+ (pagina - 3) +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(-2);pesquisar();\">"+ (pagina - 2) +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(-1);pesquisar();\">"+ (pagina - 1) +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(0);pesquisar();\">"+ pagina +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(1);pesquisar();\">"+ (pagina + 1) +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(2);pesquisar();\">"+ (pagina + 2) +"</button></li>";
		ht += "<li><button class=\"btn btn-warning\" onclick=\"changePage(3);pesquisar();\">"+ (pagina + 3) +"</button></li>";

	}
	$('#pageSel').html(ht);	
}
pesquisar();
