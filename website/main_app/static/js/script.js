window.onresize = function() {resizeFunction()}

window.onload = resizeFunction


function resizeFunction(){
    if (document.body.clientWidth > 900){
        window.onscroll = function() {scrollFunction()};
        scrollFunction();
    }
    else{
        window.onscroll = function() {};

        var header = document.getElementById("header");
        header.style.background = '';
        header.style.boxShadow = '';
        header.style.color = '';
        document.querySelector("header#header div ul").style.color = '';
    }
}


function scrollFunction(){
    var header = document.getElementById("header");
    
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        header.style.background = `rgba(256, 256, 256, 1)`;
        header.style.boxShadow = `0px 1px 5px gray`;
        header.style.color = `black`;
        document.querySelector("header#header div ul").style.color = `#026e9f`;
    }
    else {
        header.style.background = `rgba(256, 256, 256, 0)`;
        header.style.boxShadow = `0px 1px 5px transparent`;
        header.style.color = `white`;
        document.querySelector("header#header div ul").style.color = `white`;
    }
}