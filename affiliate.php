<?php 
$a = $_GET["a"];
?>
<!DOCTYPE html>
<html class="no-js" lang="fr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0">
    <title>Free City invitation by <?php if(!$a){ echo "kkere.wam"; } if($a){ echo "$a"; } ?></title>
    <link rel="preload" href="files/Site.min.css" as="style">
    <link rel="reload" href="files/style.min.css" as="style">
        <link rel="preload" href="files/sso-theme.min.css" as="style">
    <link href="files/Site.min.css" rel="stylesheet" type="text/css">
    <link href="files/style.min.css" rel="stylesheet" type="text/css">
        <link href="files/sso-theme.min.css" rel="stylesheet" type="text/css">
        <script src='waxjs.js'></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XTEM2SY6EK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XTEM2SY6EK');
</script>
<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
<script>
  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "224c931b-c7a6-4969-997d-5d047c89460d",
    });
  });
</script>
</head>
<body style="background-image: url('files/bg2-plain.png');" align="center">
<center>
    <div id="container">
        <header>
<img src="files/logo.png" alt="Remix Gaming" width="150px" height="150px">
<p>Game Interacting With Wax NFT Standard Assets</p>

        </header>
        <section id="main" align="center">
<img src="files/new-logo-freecity.png" alt="FreeCityGame" width="100%">
<p>Welcome new P2E FreeCityGame players. First you must register for free by signing this contract. 
You are also immediately eligible for any drops we do. 
<br>
Interplanetary political power games. FreeCity will be the first city to be conquered in this fantastic metaverse to come.
        <br><br>
        <img src="files/freecity.png" alt="Free City NFT" width="75%">
        <br><br>
        <p>


1- Click this buttons to login with your wax wallet.
<br><br>
<button id="login" onclick=login() >WAX Login</button>
<input hidden="hidden" id="wallet">
<br><br>
<hr><br>
2- Click this buttons to register the game.
<br><br>

<button id="sign" onclick=sign() >Register to FreeCityGame</button><br><br>
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
          account: 'freecitygamx',
          name: 'adduseraff',
          authorization: [{
            actor: wax.userAccount,
            permission: 'active',
          }],
          data: {
            wallet,
            affiliate_wallet: '<?php if(!$a){ echo "kkere.wam"; } if($a){ echo "$a"; } ?>',
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
      code: 'freecitygamx',
      scope: 'freecitygamx',
      table: 'users',
      lower_bound: wax.userAccount,
      upper_bound: wax.userAccount,
    });

    const message = res.rows[0] ? res.rows[0].message : `<No message is set for ${wax.userAccount}>`;
  }

  // set a random value to the initial message value
  document.getElementById('message').value = Math.random().toString(36).substring(2);

</script>
<br>
3- After you register, you can go to the gaming dapp.<br>
<a href="https://play.remixworlds.com/">https://play.remixworlds.com/</a> 
<br><br>
        <img src="wax.svg" alt="WAX" width="75px" height="75px">
    </p>
<br>

        </section>
       
        <footer align="center">
        <br><img src="files/logo-extrasaucestudio2.png" alt="Extra Sauce Studio" width="75px" height="75px">
            <br><br>
            © RemixWorlds.com
        </footer>
    </div>
    </center>
</body></html>