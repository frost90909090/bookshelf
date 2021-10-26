var titulo,autor,tagsSearch;
const tags = [];
function pesquisar(){
	var i,cont,buff;
	titulo = $('#tituloSearch').val();
	autor = $('#artistaSearch').val();
	tagsSearch = $('#tagsSearch').val();
	cont = 0;
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
	}
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
	var data = new FormData();
	data.append('titulo',titulo);
	data.append('autor',autor);
	data.append('tags',tags);
	var xhr = new XMLHttpRequest();
	xhr.open('POST',"bookshelf.php");
	xhr.onload = function(){
		console.log(this.response);
	};
	xhr.send(data);
	console.log("end");
	return false;
}
