<!DOCTYPE html>
<html>
<head>
    <title>Tracking Pixel</title>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JYGKTZMEDZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JYGKTZMEDZ');
</script>
</head>
<body>
<?php
echo 'Hi ' . htmlspecialchars($_GET["affiliate"]) . '!';
?>
</body>
<head>
</head>
</html>