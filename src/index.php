<?php
	/*! Purple v3.0.0 | (c) DrMaxNix 2021 | www.drmaxnix.de */
	$_PURPLE_VERSION = "3.0.0";
	
	
	// CHECK IF SPLASH SHOULD BE SHOWN //
	$_SPLASH = (strpos($_SERVER["REQUEST_URI"], "/splash") === 0);
	
	
	// LOAD PANEL-LIST //
	if(!$_SPLASH){
		//reset
		$__panel = [];
		
		//get panels
		$panel_dir = scandir("panel");
		
		//reset grid width and height (this will be set when iterating through panels)
		$__grid_width = 0;
		$__grid_height = 0;
		
		//add to list with info
		for($q = 0; $q < sizeof($panel_dir); $q++){
			$panel = $panel_dir[$q];
			
			//if this is not '.' or '..'
			if($panel !== "." and $panel !== ".."){
				//get dimensions and panel-name from dir-name
				$part = explode("-", pathinfo($panel)["basename"]);
				$pos_x = (int)$part[0];
				$pos_y = (int)$part[1];
				$size_x = (int)$part[2];
				$size_y = (int)$part[3];
				$name = (isset($part[4]) ? $part[4] : NULL);
				
				//set grid width and height to new max
				$__grid_width = max($__grid_width, $pos_x + $size_x);
				$__grid_height = max($__grid_height, $pos_y + $size_y);
				
				//add this panel to list
				$__panel[] = ["pos_x" => $pos_x, "pos_y" => $pos_y, "size_x" => $size_x, "size_y" => $size_y, "name" => $name, "dir" => $panel];
			}
		}
	}
	
	
	
	
	
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<style type="text/css">
			<?php
				// GLOBAL STYLESHEETS //
				//get stylesheets
				$style_dir = scandir("style");
				
				//load them
				for($q = 0; $q < sizeof($style_dir); $q++){
					$stylesheet = $style_dir[$q];
					
					//if this is not '.' or '..'
					if($stylesheet !== "." and $stylesheet !== ".."){
						require("style/" . $stylesheet);
						echo("\n");
					}	
				}
				
				
				// PANEL STYLESHEETS //
				if($_SPLASH){
					//get path of this panel's stylesheet
					$stylesheet_path = "splash/index.css";
					
					//if this panel has a stylesheet
					if(file_exists($stylesheet_path)){
						require($stylesheet_path);
						echo("\n");
					}
					
				} else {
					for($q = 0; $q < sizeof($__panel); $q++){
						$panel = $__panel[$q];
						
						//get path of this panel's stylesheet
						$stylesheet_path = "panel/" . $panel["dir"] . "/index.css";
						
						//if this panel has a stylesheet
						if(file_exists($stylesheet_path)){
							require($stylesheet_path);
							echo("\n");
						}
					}
				}
			?>
		</style>
		
		<script type="text/javascript">
			<?php
				// GLOBAL SCRIPTS //
				//get scripts
				$script_dir = scandir("script");
				
				//load them
				for($q = 0; $q < sizeof($script_dir); $q++){
					$script = $script_dir[$q];
					
					//if this is not '.' or '..'
					if($script !== "." and $script !== ".."){
						require("script/" . $script);
						echo("\n");
					}	
				}
				
				
				// PANEL SCRIPTS //
				if($_SPLASH){
					//get path of this panel's script
					$script_path = "splash/index.js";
					
					//if this panel has a script
					if(file_exists($script_path)){
						require($script_path);
						echo("\n");
					}
					
				} else {
					for($q = 0; $q < sizeof($__panel); $q++){
						$panel = $__panel[$q];
						
						//get path of this panel's script
						$script_path = "panel/" . $panel["dir"] . "/index.js";
						
						//if this panel has a script
						if(file_exists($script_path)){
							require($script_path);
							echo("\n");
						}
					}
				}
			?>
		</script>
		
		<?php
			// GLOBAL INCLUDES //
			if(file_exists("includes.php")){
				require("includes.php");
				echo("\n");
				
			} else if(file_exists("includes.html")){
				require("includes.html");
				echo("\n");
			}
		?>
		
		<!-- reload page once a day cause some browsers tend to leak memory over time -->
		<meta http-equiv="refresh" content="86400" />
	</head>
	<body>
		<div class="panel-container">
			<?php
				// MAYBE DISPLAY SPLASH //
				if($_SPLASH){
					require("splash/index.php");
					
				} else {
					// ADD PANELS //
					for($q = 0; $q < sizeof($__panel); $q++){
						$panel = $__panel[$q];
						
						//calculate css values in percent
						$pos_x_percent = ($panel["pos_x"] / $__grid_width) * 100;
						$pos_y_percent = ($panel["pos_y"] / $__grid_height) * 100;
						$size_x_percent = ($panel["size_x"] / $__grid_width) * 100;
						$size_y_percent = ($panel["size_y"] / $__grid_height) * 100;
						
						//open panel-div
						echo("<div class=\"panel" . ($panel["name"] !== NULL ? (" panel-" . $panel["name"]) : "") . "\" style=\"left: " . $pos_x_percent . "%; top: " . $pos_y_percent . "%; width: calc(" . $size_x_percent . "% - var(--layout-panel-margin) - (2 * var(--layout-panel-padding))); height: calc(" . $size_y_percent . "% - var(--layout-panel-margin) - (2 * var(--layout-panel-padding)));\">");
						
						//zero position for panel contents
						echo("<div class=\"panel-box\" style=\"display: block; box-sizing: border-box; width: 100%; height: 100%; position: relative;\">");
						
						//get path of this panel's content-file
						$content_path_php = "panel/" . $panel["dir"] . "/index.php";
						$content_path_html = "panel/" . $panel["dir"] . "/index.html";
						
						//load content-file
						if(file_exists($content_path_php)){
							require($content_path_php);
						} else if(file_exists($content_path_html)){
							require($content_path_html);
						}
						
						//close divs
						echo("</div></div>");
					}
				}
			?>
		</div>
	</body>
</html>
