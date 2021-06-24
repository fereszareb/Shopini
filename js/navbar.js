fetch('./navbar.json').then(r => r.json()).then(function(menujson){
    var x ='';
for (i=0 ; i< Object.keys(menujson.menu).length; i++){
    x= x+ '<li class="nav-item dropdown"> <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">'+menujson.menu[i].categorie+'</a>';
    if (Object.keys(menujson.menu[i].sous_categorie).length >0){
        x += '<ul class="dropdown-menu" aria-labelledby="navbarDropdown">';
        for (k=0;k<Object.keys(menujson.menu[i].sous_categorie).length;k++){
            x += '<li><a class="dropdown-item" href="'+menujson.menu[i].sous_categorie[k].link+'">'+menujson.menu[i].sous_categorie[k].sous_categorie+'</a></li>';
        }
        x += '</ul></li>';
    }
}
document.getElementById('add').innerHTML= x ;
});


kk = {"panier":[
    {"data_id":21,"titre":"ASUS GXT firebase TOXIX MAX 12XFN256 bleu", "prix":2980, "quantite":2 , "image": "https://media.ldlc.com/r1600/ld/products/00/05/70/92/LD0005709200_1_0005825721.jpg"},
    {"data_id":20,"titre":"ASUS GXT firebase TOXIX MAX 12XFN256 bleu", "prix":2980, "quantite":7 , "image": "https://media.ldlc.com/r1600/ld/products/00/05/70/92/LD0005709200_1_0005825721.jpg"}
]};
localStorage.panier = JSON.stringify(kk) ;
chargerPanier();
    function chargerPanier(){
    if ("panier" in localStorage){
        var product = JSON.parse(localStorage.panier);var prix_totale = 0;var nbr_product=0 ; var product_script = '<li ><ul class="product_list_panier">';
        for (i=0 ; i<Object.keys(product.panier).length ;i++){
            product_script += '<li><a class="remove" data-product_id="'+product.panier[i].data_id+'">×</a><img width="300" height="300" src="'+product.panier[i].image+'" loading="lazy"> <a>'+product.panier[i].titre+'</a><div class="prise"><span class="quantite">'+product.panier[i].quantite+'</span><span>x</span><span class="prise-product">'+product.panier[i].prix+'</span><span class="devise">TND</span></div></li>';
            prix_totale+= product.panier[i].quantite * product.panier[i].prix ;
            nbr_product+= product.panier[i].quantite ; 
        }
        product_script+= '</ul></li><li><hr>'+prix_totale+' TND <hr></li><li></li><li></li>';
        document.getElementById('panier_dropdown_id').innerHTML= product_script;
        document.getElementById('nombre-of-product-in-panier').innerText = nbr_product ;
        document.getElementById('total-prise-of-product').innerText = prix_totale ;

    }else{
        document.getElementById('panier_dropdown_id').innerHTML= '<div class="panier-empty">Panier vide</div>';
        document.getElementById('nombre-of-product-in-panier').innerText = 0 ;
        document.getElementById('total-prise-of-product').innerText = 0 ;
    }
    deletee();
}

function deletee(){
    var remove = document.getElementsByClassName('remove'); 

    for (var i = 0; i < remove.length; i++) {
       remove[i].addEventListener('click', function(){
            var id = this.getAttribute('data-product_id');
            var ww = JSON.parse(localStorage.panier);
            for (k=0 ; k<Object.keys(ww.panier).length ; k++){
                console.log(ww.panier[k].data_id+' == '+id);
                if (ww.panier[k].data_id == id){
                    ww.panier.splice(k,1)
                    //delete ww.panier[k]
                }
            }
            if (Object.keys(ww.panier).length == 0){
                localStorage.removeItem('panier');
            }else{
            localStorage.panier = JSON.stringify(ww);
            }
            chargerPanier();
       }); 
    }
}


