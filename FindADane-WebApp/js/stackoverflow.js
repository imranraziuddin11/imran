var addtobagbtn = document.getElementsByClassName('ovla-addtobag');

var tles = document.getElementsByClassName('prod-title');



for (i = 0; i < addtobagbtn.length; i++) {
    var button = addtobagbtn[i];



    button.addEventListener('click', function() {
        var button_target = event.target;
        var shopitem = button_target.parentElement.parentElement;

        var bagitems = document.getElementsByClassName('bagitems')[0];
        var imgsrc = shopitem.getElementsByClassName('prod-img')[0].src;

        appendbag(imgsrc, bagitems);

    });

}


function add(imgsrc, bagitems) {
    bagitems.insertAdjacentHTML("afterbegin", `<div class="bagrow"><div class="bagrowhead"><img src="${imgsrc}" class="bagprdimg" name="bagprdimg"></div><div class="bagrowleg"><button title="Remove From Bag" class="fas fa-times dltbag"></button><div class="bagprdinfo"><p class="bagprdtitle" title="Product Name">Girlfriend Regular Jeans</p><p class="prdbrand" title="Brand Name">H&M</p><p class="bagprdprice" title="Price">$24.99</p><p class="prdcolor" title="Color">Dark denim blue</p><p class="bagprdsize" title="Size">12</p><p class="prdcode" title="Product Code">0706016003</p><br><button class="far fa-heart movetofavbtn" title="Move To Bag"></button><span class="bagrowbtnbr"><label>Qty: </label><input type="number" value="1" name="indbagqty"title="Select Quantity" class="indbagqty bagrowfld" id="indbagqty"></span><span class="bagrowbtnbr"><label>Total: </label><input type="text" title="Total Price" class="indbagtotalprice bagrowfld" name="indbagtotalprice" readonly></span></div></div></div>`);
}

function appendbag(imgsrc, bagitems) {
    add(imgsrc, bagitems);


    localStorage.setItem("getbag", JSON.stringify(bagitems.innerHTML));



}