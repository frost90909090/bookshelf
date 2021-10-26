
<?php
if(isset($_POST['titulo'])){
       	$titulo = $_POST['titulo'];
	$autor = $_POST['autor'];
	$tags = $_POST['tags'];

	$conn = mysqli_connect("localhost","root","p0r0nt0?","bookshelf");
	if(!$conn){
		die("Connection failed: " . mysqli_connect_error());
	}
	$query = "select titulo from books where titulo like '%" .$titulo ."%'";
	$result = mysqli_query($conn,$query);
	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
			echo $row["titulo"];
			echo "\n";
		}	
	}
	else{
		echo "Nada encontrado";
	}
	mysqli_close($conn);
}
?>
