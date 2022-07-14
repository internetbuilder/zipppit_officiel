<?php 
$to = $_GET["to"];
$quantity = $_GET["quantity"];
$memo = $_GET["memo"];
?>
<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0">
    <title>yyyyyxxxxx <?php if(!$a){ echo "xxxxx.wam"; } if($a){ echo "$a"; } ?></title>
    <link rel="preload" href="files/Site.min.css" as="style">
    <link rel="reload" href="files/style.min.css" as="style">
    <link rel="preload" href="files/sso-theme.min.css" as="style">

    <link href="files/Site.min.css" rel="stylesheet" type="text/css">
    <link href="files/style.min.css" rel="stylesheet" type="text/css">
    <link href="files/sso-theme.min.css" rel="stylesheet" type="text/css">

        <script src='waxjs.js'></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXX');
</script>

</head>
<body style="background-image: url('files/bg2-plain.png');" align="center">
<center>
    <div id="container">
        <header>
<img src="files/logo.png" alt="Remix Gaming" width="150px" height="150px">
<p>xxxxx</p>

        </header>
        <section id="main" align="center">
<img src="files/new-logo-freecity.png" alt="FreeCityGame" width="100%">
<p>xxxxxxxxxxxxxxxxxxxxxxxxx
        <br><br>
        <img src="files/freecity.png" alt="Free City NFT" width="75%">
        <br><br>
        <p>


Login/Register
<br><br>
<button id="login" onclick=login() >WAX Cloud Wallet</button>
<input hidden="hidden" id="wallet">
<br><br>
<hr><br>
Execute this action
<br><br>

<button id="sign" onclick=sign() >Transfer</button><br><br>
<hr>
<label>Response</label>
<h1 id="response"></h1>
<hr>

</p>
<script>
  const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
  });
  // const wax = new waxjs.WaxJS({
  //   rpcEndpoint: 'http://wax-all.test:8888',
  //   tryAutoLogin: true,
  //   waxSigningURL: 'http://all-access.wax.test:8113',
  //   waxAutoSigningURL: 'http://idm.wax.test:8113/v1/accounts/auto-accept/'
  // });

  async function login() {
    try {
      const userAccount = await wax.login();
      document.getElementById('wallet').value = userAccount;
      document.getElementById('response').append('* You are Login *');
      await getCurrentMessage();
    } catch(e) {
      document.getElementById('response').append(e.message);
    }
  }

  async function sign() {
    if(!wax.api) {
      return document.getElementById('response').append('* Login first *');
    }

    const wallet = document.getElementById('wallet').value;

    try {
      const result = await wax.api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            from,
            to: 'xxxxx.wam',
            quantity: '0.00000000 WAX',
            memo: '<?php if(!$memo){ echo "Get New NFT"; } if($a){ echo "$memo"; } ?>',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      document.getElementById('response').append('* You are Register *');
      await new Promise(resolve => setTimeout(resolve, 1000));
      await getCurrentMessage();
    } catch(e) {
      document.getElementById('response').append('* Expired Transaction *');
    }
  }

  async function getCurrentMessage() {
    const res = await wax.rpc.get_table_rows({
      json: true,
      code: 'xxxxxxxxx',
      scope: 'xxxxxxxx',
      table: 'xxxxxxx',
      lower_bound: wax.userAccount,
      upper_bound: wax.userAccount,
    });

    const message = res.rows[0] ? res.rows[0].message : `<No message is set for ${wax.userAccount}>`;
  }

  // set a random value to the initial message value
  document.getElementById('message').value = Math.random().toString(36).substring(2);

</script>
<br>
After, you go to your inventory.<br>
<a href="https://wax.atomichub.io/profile/xxxxx.wam#inventory">wax.userAccount/</a> 
<br><br>
        <img src="wax.svg" alt="WAX" width="75px" height="75px">
    </p>
<br>

        </section>
       
        <footer align="center">
        
            ©xxxxx.com
        </footer>
    </div>
    </center>
</body></html>