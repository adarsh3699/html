let logo = '<div id="logo"><a href="index.html"><img src="image/logo.png" height="50px"><div><span id="adarsh">Adarsh </span>Suman</div></a></div>';
let desktopMenu = '<div id="desktopMenu">  <a href="index.html">Home</a> <a href="about.html">About</a> <a href="contact.html">Contact</a>  </div>';
let social = '<div id="social"><a href="https://www.instagram.com/_adarsh.s/" target="_blank"><img src="image/insta.png" height="22px"></a><a href="https://www.youtube.com/channel/UCkdSVbjY4sS1I7hw9ZJMdew" target="_blank"><img src="image/youtube.png" height="20px"></a></div>';
let mobileIcon = '<div id="mobileIcon"><img src="image/menu.png" /></div>';
let mobileMenu = '<div id="mobileMenu"><a href="index.html">Home</a><a href="about.html">About</a><a href="contact.html">Contact</a></div>'

let footMemu = '<div id="footMemu"><div><a href="index.html">Home</a></div><div><a href="about.html">About</a></div><div><a href="contact.html">Contact</a></div></div>'
let footLogo ='<div id="footLogo"><img src="image/logo.png"><div>© 2022-25 (Version 0.5)</div><div>Developed by Adarsh Suman</div></div>'
let footSocial ='<div id="footSocial"><a href="mailto:adarsh3699@gmail.com" target="_blank"><img src="image/google.png" height = "22px">adarsh3699<div></div></a><a href="https://www.instagram.com/_adarsh.s/" target="_blank"><img src="image/insta.png"  height="19px"><div>Instagram</div></a><a href="https://www.youtube.com/channel/UCkdSVbjY4sS1I7hw9ZJMdew" target="_blank"><img src="image/youtube.png" height="18px"><div>&#160 YouTube</div></a></div>'


$('#bar').html('<div id="topBar">' + logo + desktopMenu + social + mobileIcon + '</div>' + mobileMenu);
$('#bottomBar').html(footMemu + footLogo + footSocial);

let flag = false;
$('#mobileIcon').on("click", function(e) {
    e.stopPropagation(); // this will not call any other event, applied on its parent

    flag = !flag;
    
    if (flag == true) {
        $('#mobileMenu').addClass("show");
    } else {
        $('#mobileMenu').removeClass("show");
    }
});

$(document).on("click", function(e){
    $('#mobileMenu').removeClass("show");
});

$(document).ready(function(){
    $('#loaderBack').css('display', 'none');
    
    $('.disclaimer').remove();
});

$('#send').on("click", function() {
    let email = $('#email').val();
    let text = $('#textArea').val();
    
    if (email === "") {
        $("#confirmEmail").text('Please enter your email')
    } else{
        $("#confirmEmail").text('')
    }
    
    if (text === "") {
        $('#confirmMsg').text('Please enter your msg')
    } else {
        $("#confirmMsg").text('')
    }

    if (email !== "" && text !== "") {
        $("#send").addClass("disableBtn");
        console.log("mast");
    }
});

/* Animation */
$(document).ready(function() {
    function loop()
    {

        $('.line-1').html("My name is <b>Adarsh</b> <a>Suman</a>").addClass('anim-typewriter');

        setTimeout(function()
        {
            $('.line-1').addClass('anim-typewriter-remove');
        }, 6000);

        setTimeout(function()
        {
            $('.line-1').html("And i'm not a <b>Bhemu</b> ").width('550px').addClass('anim-typewriter2');
        }, 10500);

        setTimeout(function()
        {
            $('.line-1').addClass('anim-typewriter-remove2');			
        }, 15000);
        
        setTimeout(function()
        {
            $('.line-1').html("").removeClass('anim-typewriter').removeClass('anim-typewriter2').removeClass('anim-typewriter-remove').removeClass('anim-typewriter-remove2').width('690px');
        }, 18000);
    }

    loop();

    //repeating the animation
    setInterval(function()
    {
        loop();
    }, 18500);

})