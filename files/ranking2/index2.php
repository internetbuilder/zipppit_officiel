<details id="details-panel1">
        <summary>xxxxx</summary>
        <p>yyyyyyyyyyyyyyyyyy</p>
    </details>
    
    
    <!DOCTYPE html>
<html>
<head>
    <title>Ranking - Leaderboard</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JYGKTZMEDZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JYGKTZMEDZ');
</script>
<script type="text/javascript" src="codebase/suite.js?v=7.3.3"></script>
		<link rel="stylesheet" href="codebase/suite.css?v=7.3.3">
		<link rel="stylesheet" href="common/index.css?v=7.3.3">
		<!-- custom sample head -->
		<style>
			.custom-class {
				margin-top: 25px;
				color: #fff;
				font-size: 25px;
				line-height: 1.5;
				background-color: #ccccc;
				box-shadow: 5px 5px 55px -15px rgba(2, 136, 209, 1);
				-webkit-animation: opacity .4s ease-in-out forwards;
				animation: opacity .4s ease-in-out forwards;
			}
			@-webkit-keyframes opacity {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}
			@keyframes opacity {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}
		</style>
        

</head>
<body class="container">
    <header class="dhx_sample-header">
        <div class="dhx_sample-header__main">
            <nav class="dhx_sample-header__breadcrumbs">
                <ul class="dhx_sample-header-breadcrumbs">
                            <li class="dhx_sample-header-breadcrumbs__item">
                                <a href="index.html" class="dhx_sample-header-breadcrumbs__link">Back</a>
                            </li>
                        </ul>
            </nav>
            <h1 class="dhx_sample-header__title">
                <div class="dhx_sample-header__content">
                    Menu
                </div>
            </h1>
        </div>
    </header>
    <section class="dhx_sample-controls">
        <button id="show" class="dhx_sample-btn dhx_sample-btn--flat">Claim</button>
    </section>
    <script>
      const popup = new dhx.Popup({
    css: "dhx_widget--bordered"
});

popup.attachHTML("<div style='padding: 0px; text-align: center'> <iframe src='https://claim.remixworlds.com/' title='description' height='600' width='350' ></iframe></div>");
document.querySelector("#show").addEventListener("click", function () {
    popup.show("show");
});
    </script>

    <div hidden="hidden" class="form-group">
        <label for="eos-account"><strong>Network</strong></label>
        <select onchange="getProducers()" class="form-control" id="network">
            <option value="https://api.hivebp.io">WAX Mainnet</option>
        </select>
    </div>
    <div hidden="hidden" class="form-group">
        <label for="eos-account"><strong>Account Name</strong></label>
        <input id="eos-account" class="form-control" placeholder="EOS Account">
    </div>
    <div hidden="hidden" class="form-group">
        <input type="radio" name="signing-method" onchange="toggleKeyInput()" value="key" checked>
        <label>Private Key</label>
        <input id="private-key" class="form-control" placeholder="Private key">
        </div>
    </div>
    <h2>Ranking</h2>
    <div class="form-group">
        <input type="search" id="filter-prods" class="form-control" placeholder="Filter Players" onkeyup="filterProds()">
    </div>
    <table id="block-producers" class="table">
        <thead><tr>
            <th>Rank</th>
            
            <th>Players</th>
            <th>Total Votes</th>
            <th>Reward/24h</th>



            <div class="wb-tabs">
    <div class="tabpanels">
            <details id="details-panel1">
                <summary>xxx</summary>
                <p>yyy</p>
            </details>
            </div>
        </div>

        </tr>
    </thead>
        <tbody>aaa</tbody>
    </table>
    
    <script src="eosjs-browser.js"></script>
    <script src="main.js"></script>
</body>
</html>