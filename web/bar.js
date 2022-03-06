let logo = '<a href="index.html" id="logo"><img src="logo.png" alt="Error" height="50px"><div><span id="adarsh">Adarsh </span>Suman</div></a>';
let desktopMenu = '<div id="desktopMenu">  <a href="index.html">Home</a> <a href="about.html">About</a> <a href=""> Contact</a>  </div>';
let social = '<div id="social"><a href="https://www.instagram.com/_adarsh.s/" target="_blank"><img src="insta.png" height="22px"></a><a href="https://www.youtube.com/channel/UCkdSVbjY4sS1I7hw9ZJMdew" target="_blank"><img src="youtube.png" alt="Error" height="20px"></a></div>';
let mobileIcon = '<div id="mobileIcon"><img src="menu.png" /></div>';
let mobileMenu = '<div id="mobileMenu"><a href="index.html">Home</a><a href="about.html">About</a><a href=""> Contact</a></div>'

let footMemu = '<div id="footMemu"><div><a href="index.html">Home</a></div><div><a href="about.html">About</a></div><div><a href="">Contact</a></div></div>'
let footLogo ='<div id="footLogo"><img src="logo.png"><div>© 2022-25 Adarsh Creation</div><div>Developed by Adarsh Suman</div></div>'
let footSocial ='<div id="footSocial"><a href="mailto:adarsh3699@gmail.com" target="_blank"><img src="google.png">adarsh3699<div></div></a><a href="https://www.instagram.com/_adarsh.s/" target="_blank"><img src="insta.png"  height="24px"><div>Instagram</div></a><a href="https://www.youtube.com/channel/UCkdSVbjY4sS1I7hw9ZJMdew" target="_blank"><img src="youtube.png" height="23px"><div>&#160 YouTube</div></a></div>'

// document.getElementById('bar').innerHTML = '<div id="topBar">' + logo + desktopMenu + social + mobileIcon + '</div>' + mobileMenu;
// document.getElementById('bottomBar').innerHTML = footMemu + footLogo + footSocial;

$('#bar').html('<div id="topBar">' + logo + desktopMenu + social + mobileIcon + '</div>' + mobileMenu);
$('#bottomBar').html(footMemu + footLogo + footSocial);

let flag = true;
$('#mobileIcon').on("click", function(e) {
    e.stopPropagation(); // this will not call any other event, applied on its parent

    flag = !flag;
    
    if (flag == true) {
        // document.getElementById("mobileMenu").classList.add("show");
        $('#mobileMenu').addClass("show");
    } else {
        // document.getElementById("mobileMenu").classList.remove("show");
        $('#mobileMenu').removeClass("show");
    }
});

$(document).on("click", function(e){
    console.log("asdfg")
    document.getElementById("mobileMenu").classList.remove("show");
});

$(document).ready(function(){
    $('#loaderBack').css('display', 'none');
    console.log("loaded")
    // setTimeout(function(){
    //     $('#loaderBack').css('display', 'none');
    // }, 500)
});

// $('#html').load('about.html');

// let flag = true;
// function handleMenuClick() {  
//     flag = !flag;
    
//     if (flag == true) {
//         document.getElementById("mobileMenu").classList.add("show");
//     } else {
//         document.getElementById("mobileMenu").classList.remove("show");
//     } 
// }
