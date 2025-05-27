window.onscroll = function() {scrollFunction()};

function scrollFunction(){
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        document.getElementById("header").style.background = `rgba(256, 256, 256, 1)`;
        document.getElementById("header").style.boxShadow = `0px 1px 5px gray`;
    }
    else {
        document.getElementById("header").style.background = `rgba(256, 256, 256, 0.1)`;
        document.getElementById("header").style.boxShadow = `0px 1px 5px transparent`;
    }
}