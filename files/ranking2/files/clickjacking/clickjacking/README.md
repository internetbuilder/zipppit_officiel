# Clickjacking
Clickjacking and its Tips

%%%%%%%%%%%%%%%%%   Clickjacking   %%%%%%%%%%%%%%%%%%%%%%%%

#Description:

Clickjacking, also known as a "UI redress attack", is when an attacker uses multiple transparent or opaque layers to trick a user into clicking on a button or link on another page when they were intending to click on the the top level page. Thus, the attacker is "hijacking" clicks meant for their page and routing them to another page, most likely owned by another application, domain, or both.

#Tips:

1) Visit clickjacker.io to check if the site is vulnerable to Clickjacking or not.

2) Test must be perform on both browser i.e Mozila Firefox and Google Chrome.

3) If site doesn't have X-Frame-Option Set, then is may vulnerable to Clickjacking.


# Manually check the Clickjacking.
The clickjacking.html file is attached to the repository. Replace the Victim URL with this "https:/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" in the Code.
 
