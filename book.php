<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"></link>
                <script type="text/javascript" src="bootstrap/js/jquery-3.6.0.js"></script>
                <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
                <script type="text/javascript" src="book.js"></script>
                <link rel="stylesheet" href="bookshelf.css"></link>
	</head>
	<body>
		<div id="infoDiv">
			<?php
				if(isset($_GET['code'])){
					$conn = mysqli_connect("localhost","root","p0r0nt0?","bookshelf");
					if(!$conn){
						echo "Sem conexão"; 
						die("Connection failed: " . mysqli_connect_error());
					}
					else{
						$query = "select * from books where codigo='" . $_GET['code'] ."'"; 
						$result = mysqli_query($conn,$query);
						if(mysqli_num_rows($result) == 1){
							while($row = $result -> fetch_assoc()){
								$btn = $row['pasta'];
								$html = "<div>
										<input type=\"image\" id=\"capa\" src=\"" . $row['pasta'] . "/" . $row['capa'] . "\" onclick=\"window.location='http://192.168.0.69/" . $row['pasta'] ."/index.html'\"/> 
									</div>
									<div id=\"info\">
										<div id=\"infoTitulo\">" . $row['titulo']. "</div>
										<div id=\"infoCode\">Código: " . $row['codigo']. "</div>
										<div id=\"infoAutor\">Autor: " . $row['autor'] . "</div>
										<div id=\"infoGrupo\">Grupo: " .$row['grupo'] . "</div>
									</div>
									<div id=\"infoTags\">Tags: " . $row['tags'] . "</div>";
								echo $html;

							}
						}
						else if(mysqli_num_rows($result) < 1){
							echo "Sem resultados";
						}
						else{
							echo "muitos resultados";
						}
					}
					mysqli_close($conn);
				}	
			?>	
		</div>
		<?php
			echo "<button class=\"btn btn-warning\" id=\"readBtn\" onclick=\"window.location='http://192.168.0.69/" . $btn . "/index.html'\">Ler</button>";
		?>
	</body>
</html>
