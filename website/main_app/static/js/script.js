// id elements
var id_header;
var id_header_path_container;
// tag elements
var tag_body;
// program variables
var b_is_computer; // boolean true if we are a computer false otherwise

window.onresize = function() {resizeFunction()};
window.onload = loadFunction;


function loadFunction(){
    id_header = document.getElementById("header");
    id_header_path_container = document.getElementById("header_path_container");
    
    tag_body = document.getElementsByTagName("body")[0];

    /* calls the resizeFunction twice with diferent bools to make sure the program is init correctly */
    b_is_computer = true;
    resizeFunction();
    b_is_computer = false;
    resizeFunction();
}


function resizeFunction(){
    if (document.body.clientWidth >= 900){
        /* we are now a computer */
        if (b_is_computer){
            // if we aleready are a computer no changes needed, return.
            return;
        }
        b_is_computer = true;

        // activates the scroll function for the header
        window.onscroll = function() {scrollFunction()};
        scrollFunction();
        
        // show the page links in the header
        openBurgerMenu();
    }
    else{        
        /* if the screen is big enough, we disable scroll in the burger menu, else we enable */
        if (window.innerHeight >= 540){
            id_header_path_container.style.overflowY = '';
        }
        else {
            id_header_path_container.style.overflowY = `scroll`;
        }

        /* we are now a phone */
        if (!b_is_computer){
            // if we aleready are a phone no changes needed, return.
            return;
        }
        b_is_computer = false;
        // deactivate the scroll function
        window.onscroll = function() {};

        // removes atributes that have been touched by scrollFunction
        id_header.className = '';

        closeBurgerMenu();
    }
}


function scrollFunction(){
    /* this function is only called when we are a computer */
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        // if we scroll
        id_header.className = `header_scrolled_computer`;
    }
    else {
        // if we are at the top of the page
        id_header.className = 'header_not_scrolled_computer';
    }
}


function openBurgerMenu(){
    /* function will be called when we are on a computer and when we open the burger menu (on phone) */
    id_header_path_container.style.display = '';
    
    if (document.body.clientWidth >= 900){
        /* if we are on computer we want to be able to scroll */
        tag_body.style.overflow = '';
    }
    else {
        tag_body.style.overflow = `hidden`;
    }
}

function closeBurgerMenu(){
    /* function will be called when we are on a phone and when we close the burger menu (on phone) */
    id_header_path_container.style.display = `none`;
    tag_body.style.overflow = '';
}