
<?php
if(isset($_POST['titulo'])){
       	$titulo = $_POST['titulo'];
	$autor = $_POST['autor'];
	$tags = $_POST['tags'];
	$buff = "";
	$count = 0;
	$tagsArray = [];
	/*
	for($i = 0; $i < strlen($tags); $i++){
		if($tags[i] == " " || $i >= strlen($tags)){
			array_push($tagsArray,$buff);
			$buff = "";
			count++;
		}	
		else{
			$buff = $buff . $tags[i];
		}
	}

	for($i = 0 ; $i < sizeof($tagsArray);$i++){
		echo $tagsArray[i] . "\n";
	}*/

	$conn = mysqli_connect("localhost","root","p0r0nt0?","bookshelf");
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
	}
	$query = "select titulo, pasta, capa from books ";
	if($titulo != '' || $autor != ''){
		$query = $query . "where ";
	}
	if($titulo != ''){
		$query = $query . "titulo like '%" .$titulo ."%' ";
	}
	if($autor != ''){
		if($titulo != ''){
			$query = $query . 'and ';
		}
		$query = $query . "(autor like '%" . $autor . "%' or grupo like '%" . $autor . "%') ";
	}
	if(sizeof($tagsArray) > 0){
		if($titulo != '' || $autor != ''){
			$query = $query . 'and ';
		}
		$query = $query . '(';
		for($i = 0; $i < sizeof($tagsArray); $i++){
			if($i > 0){
				$query = $query . 'and ';
			}
			$query = $query . "tags like '%" . $tagsArray[i] . "%' ";
		}
		$query = $query . ")";
	}
	$result = mysqli_query($conn,$query);
	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($row);
			echo "$";
		}	
	}
	mysqli_close($conn);
}
?>
