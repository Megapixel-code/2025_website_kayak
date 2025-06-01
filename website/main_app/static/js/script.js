// class elements
var class_wave;
// id elements
var id_site_header;
var id_header_path_container;
var id_page_header;
var id_burger_menu_dark_background
// tag elements
var tag_body;
// program variables
var b_is_computer; // boolean true if we are a computer false otherwise
var rng; // rng object
let resize_timeout; // for the resizeThrottler function

window.onresize = function() {resizeThrottler()};
window.onload = loadFunction;


/* ================= RANDOMNESS CLASS WITH SEED ================= */
/**
 * Pseudo random number generator object with a seed
 * @param {int} seed the seed of the random number generator
 */
function RNG(seed){
    // LCG using GCC constants
    // https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
    this.modulus = 0x80000000; // 2**31;
    this.multiplier = 1103515245;
    this.increment = 12345;

    this.state = seed;
}
/**
 * Changes the state of the generator while returning a random positive int
 * @returns a random positive int
 */
RNG.prototype.nextInt = function(){
    // will change the state to the next int and return the int
    this.state = (this.state * this.multiplier + this.increment) % this.modulus;
    return this.state;
}
/**
 * Changes the state of the generator while returning a int inside of the range
 * @param {int} start
 * @param {int} end
 * @returns a random int inside of the range, including start and end
 */
RNG.prototype.nextRange = function(start, end){
    // returns a number inside the range, including start and end
    var range = end - start;
    var random_in_range = Math.floor((this.nextInt() / this.modulus) * (range + 1));
    return start + random_in_range;
}
/* ================= END RANDOMNESS CLASS ================= */


function loadFunction(){
    class_wave = document.getElementsByClassName("wave");

    id_site_header = document.getElementById("site_header");
    id_header_path_container = document.getElementById("header_path_container");
    id_page_header = document.getElementById("page_header");
    id_burger_menu_dark_background = document.getElementById("burger_menu_dark_background");
    
    
    tag_body = document.getElementsByTagName("body")[0];

    // init rng with unique seed based on the height and width of the window
    var rng_height = new RNG(window.innerHeight);
    var rng_width = new RNG(window.innerWidth);
    var seed = Math.floor((rng_width.nextInt() / 2) + (rng_height.nextInt() / 2));
    rng = new RNG(seed);
    // updates the waves
    updateWaves();

    /* calls the resizeFunction twice with diferent bools to make sure the program is init correctly */
    b_is_computer = true;
    resizeFunction();
    b_is_computer = false;
    resizeFunction();
}



function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resize_timeout) {
        // set a timeout to prevent multiple event’s firing
        resize_timeout = setTimeout(function () {
            resize_timeout = null;
            resizeFunction();
            // The resizeFunction will execute at a rate of 15fps
        }, 100);
    }
}


function resizeFunction(){
    /* change page image size */
    id_page_header.style.height = ((window.innerHeight)*0.98)+"px";
    
    /* responsive code */
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
            id_header_path_container.style.overflowY = "";
        }
        else {
            id_header_path_container.style.overflowY = "scroll";
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
        id_site_header.className = "";

        closeBurgerMenu();
    }
}


function scrollFunction(){
    /* this function is only called when we are a computer */
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        // if we scroll
        id_site_header.className = "header_scrolled_computer";
    }
    else {
        // if we are at the top of the page
        id_site_header.className = "header_not_scrolled_computer";
    }
}


function openBurgerMenu(){
    /* function will be called when we are on a computer and when we open the burger menu (on phone) */
    id_header_path_container.className = "burger_menu_open";
    
    if (document.body.clientWidth >= 900){
        /* if we are on computer */
        /* we dont want to see the darkened background */
        id_burger_menu_dark_background.style.display = "none";
        /* we want to be able to scroll the main page */
        tag_body.style.overflow = "";
    }
    else {
        /* if we are on phone */
        id_burger_menu_dark_background.style.display = "";
        /* we dont want to be able to scroll the main page */
        tag_body.style.overflow = "hidden";
    }
}


function closeBurgerMenu(){
    /* function will be called when we are on a phone and when we close the burger menu (on phone) */
    // if the burger didnt open yet it will not close, important for animation
    if (id_header_path_container.className == "burger_menu_before_first_open"){
        return;
    }
    id_header_path_container.className = "burger_menu_close";
    id_burger_menu_dark_background.style.display = "none";
    tag_body.style.overflow = "";
}


function updateWaves(){
    /* this function will generate unique waves for each device depending on the width and height of the device */
    /* --size is between 20 and 40 px */
    /* --p is between 45 and 70 px */
    /* --R equals sqrt(--size**2 + --p**2) */

    /* for each wave :
     * change top
     * change --size and --p and --R
     */
    let size, p, r, offset;

    for (let i = 0; i < class_wave.length; i++) {
        size = rng.nextRange(20, 40);
        p = rng.nextRange(45, 70);
        r = Math.sqrt(size ** 2 + p ** 2);
        offset = rng.nextRange(-8, 8);

        class_wave[i].style.setProperty("--size",size+"px");
        class_wave[i].style.setProperty("--p",p+"px");
        class_wave[i].style.setProperty("--R",r+"px");
        class_wave[i].style.top = offset+"px";
    }
}
