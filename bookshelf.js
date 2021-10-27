var titulo,autor,tags;
function pesquisar(){
	//var i,cont,buff;
	titulo = $('#tituloSearch').val();
	autor = $('#artistaSearch').val();
	tags = $('#tagsSearch').val();
	/*cont = 0;
	buff = ""; 
	for(i = 0; i < tagsSearch.length; i++){
		if(tagsSearch[i] == ' ' || i >= tagsSearch.length){
			tags[cont] = buff;
			buff = "";
			cont++;
		}
		else{
			buff+=tagsSearch[i];
		}
	}*/
	sendAjax();
}

function sendAjax(){
	/*console.log("clicou");
	$.ajax({
		type: 'POST',
		url:'bookshelf.php',
		data: ({
			"titulo": titulo,
			"autor": autor,
			"tags": tags
		}),
		dataType: 'json',
		success: function(result){
			alert(result);
		}
	});*/
	console.log(tags);
	var data = new FormData();
	data.append('titulo',titulo);
	data.append('autor',autor);
	data.append('tags',tags);
	console.log(data);
	var xhr = new XMLHttpRequest();
	xhr.open('POST',"bookshelf.php");
	xhr.onload = function(){
		var i, count, buff;
		const result = [];
		var resultado = this.response;
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
		for(i = 0 ; i < result.length; i++){
			result[i] = JSON.parse(result[i]);
		}
	};
	xhr.send(data);
	console.log("end");
	return false;
}
