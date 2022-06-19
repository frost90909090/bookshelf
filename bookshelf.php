
<?php
if(isset($_POST['p'])){
       	$titulo = $_POST['titulo'];
	$autor = $_POST['autor'];
	$tags = $_POST['tags'];
	$page = $_POST['pagina'];
	$p = $_POST['p'];
	$tagsArray = [];
	$totalPaginas = 0;
	$arr = str_split($tags);	
	$buff = "";
	if($page = null){
		$page = 1;
	}
	for($i = 0; $i < strlen($tags); $i++){
		if(strcmp($arr[$i]," ") == 0 || $i >= strlen($tags)-1){
			if($i >= strlen($tags)-1){
				$buff = $buff . $arr[$i];
			}
			array_push($tagsArray,$buff);
			$buff = "";
		}
		else{
			$buff = $buff . $arr[$i];
		}
	}

	$conn = mysqli_connect("localhost","root","p0r0nt0?","bookshelf");
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
	}
	$query = "select codigo, titulo, pasta, capa from books ";
	if($titulo != '' || $autor != '' || count($tagsArray) > 0){
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
		//$query = $query . "autor like '%" . $autor . "%'";
	}
	
	if(sizeof($tagsArray) > 0){
		if($titulo != '' || $autor != ''){
			$query = $query . 'and ';
		}
		$query = $query . '(';
		for($i = 0; $i < sizeof($tagsArray); $i = $i+1){
			if($i > 0){
				$query = $query . 'and ';
			}
			$query = $query . "tags like '%" . $tagsArray[$i] . "%' ";
		}
		$query = $query . ")";
	}
	$query = $query . " order by titulo limit 15";
	$result = mysqli_query($conn,$query);
	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($row);
			echo "$";
		}	
	}
	$query = "select * from books";
/*	$result = mysqli_query($conn,$query);
	$totalPaginas = mysqli_num_rows($result);
	echo $totalPaginas;
	echo "$";*/
	mysqli_close($conn);
	echo($query);
}
?>
