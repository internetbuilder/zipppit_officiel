const popup = new dhx.Popup({
    css: "dhx_widget--bordered"
});

popup.attachHTML("<div style='padding: 16px; text-align: center'> <iframe src='https://claim.remixworlds.com/' title='description' height='600' width='350' ></iframe></div>");
document.querySelector("#show").addEventListener("click", function () {
    popup.show("show");
});