/* =================================
// The Present is a Present
// Brought to you by Faculty Creative
// Coded with love in the city of brotherly love, 2011 
/* ===============================*/
/* Thanks to the following for useful tools and informative demos:
// http://matthewlein.com/ceaser/
// http://www.paulrhayes.com/2009-03/an-analogue-clock-using-only-css/
// http://www.sitepoint.com/creating-accurate-timers-in-javascript/
// http://www.colorzilla.com/gradient-editor/
// http://www.farinspace.com/jquery-image-preload-plugin/
/* ===============================*/


$(document).ready(function() {


	// ================================================
	// Image preloader thanks to (see above)
	//$("#content").fadeTo(0);
/*
	var isLoaded = false;
	
	// cache buster
	var t = (new Date).getTime();  
	var the_images = [];
*/
	
	// Pet all the image on this page, add timestamp (to prevent caching)
	// Put them into array to preload
/*
	var elems = $("img").each(function(index) {
		var s = $(this).attr("src");
		the_images.push( s + "?i=" + index +  "&t=" + t )
	});
*/


/*
	jQuery.imgpreload(the_images,
	{
		each: function()
		{
			var pattern = new RegExp( "i=(\\d)", "gi" );
			var m = pattern.exec($(this).attr('src'));
			var status = $(this).data('loaded')?'success':'error';

			//$('#footer').append('<li>' + m[1] + ': ' + $(this).attr('src') + ' ' + status + '</li>');
		},
		all: function()
		{
			//$('#footer').append('<li> all images loaded </li>');
			isLoaded = true;
			//$("#content").fadeTo(1, 300, function() {
				//startAnimation();
			//})
			
		}
	});
*/
	
		
		
	// ================================================
	// Scaling animations look poor in firefox.
	// Also, firefox needs specific music files. 
	// TODO - Can we choose one that is supported by all? 
	var isFirefox = false;
	if ($.browser.mozilla) {
	    isFirefox = true;
	}


	// ================================================
	// Load music element, must be created as new object, cant just select with jQuery
	// Maybe try creating the element then changing props? 
	var audio = document.createElement('audio');
	
	if (isFirefox == true) {
		audio.src = 'happy_xmas.ogg';
	} else {
		audio.src = 'happy_xmas.mp3';
	}

	audio.controls = true;
	audio.autoplay = true;
	audio.volume = 0.2;
	audio.loop = "loop";
	audio.preload = "auto";
	$("#tunes").append(audio);
		



	// ================================================
	// Set and declare variables
	var start = new Date().getTime(),  
	    elapsed = '0.0',
	    bannerDots = 15,
		pos_doyle = 0,
		inc_doyle = 45,
		pos_banner = 0,
		inc_banner = 720,
		lastSecond = 0,
		i = 20,
		inc_logo = 180;
		
		var pos = new Array();
		var currentPos = new Array();
		
	
	
	
	
	// ================================================
	// Set initial position of the logos	
	// loop through all set position
	$(".fLogo").each(function(cc) {
		var r = "rotate(" + i + "deg)";
		$(this).css({"-moz-transform" : r, "-webkit-transform" : r});
		pos[cc] = i;
		i = i + 45;
		currentPos[cc] = pos[cc];
		var d =  (cc / 8) + "s";
		$(this).css({"-moz-transition-delay" : d, "-webkit-transition-delay" : d});
	});




	// ================================================
	// function to rotate the logos
	function turnLogos() {
		$(".fLogo").each(function(cc) {
			if (cc%2 == 0) {
				currentPos[cc] = currentPos[cc] + inc_logo;
				var r = "rotate(" + currentPos[cc] + "deg)";
			} else {
				currentPos[cc] = currentPos[cc] - inc_logo;
				var r = "rotate(" + currentPos[cc] + "deg)";
			}
			
			$(this).css({"-moz-transform" : r, "-webkit-transform" : r});
			
		});
	}

	
	
	
	
	// ================================================
	// Create a new timer that fires (roughly) every 100 milliseconds
	window.setInterval(function()  
	{  
	    // Get elapsed time
	    var time = new Date().getTime() - start;  
	    elapsed = Math.floor(time / 100) / 10;  
	    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }  
	    
	    // Do some math stuff to make the hand move correctly
	    seconds = new Date().getSeconds();
		sdegree = seconds * 6;
		srotate = "rotate(" + sdegree + "deg)";
		
		// put times in divs so we can see time pass.
		$("#theSecondsNow").html("Now: " + seconds);
		$("#theSecondsEllapsed").html("elapsed: " + elapsed);
		
		// Rotate the clock dial!
		// We will be supporting Mozilla, Safari, and Chrome. Sorry IE :(
		$("#clockDial").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
	    
	    
	    // Do things
	    // Minutely
	    if (seconds == 0 && lastSecond != seconds ) {
			pos_banner = pos_banner + inc_banner;
			var r = "rotate(-" + pos_banner + "deg)";
			$("#bannerPresent").css({"-moz-transform" : r, "-webkit-transform" : r});
	    }    
	    
	   
	    // Quarterly
	    if ((seconds == 15 || seconds == 30 || seconds == 45 || seconds == 0) && (lastSecond != seconds) ) {
			pos_doyle = pos_doyle + inc_doyle;
			var r = "rotate(-" + pos_doyle + "deg)";
			$("#doyle").css({"-moz-transform" : r, "-webkit-transform" : r});
			
			// Defined above, careful, this could be a memory hog.
			turnLogos();
	    } 
	    

	    // Secondly
	    if (lastSecond != seconds) {
	    	var srotateDots = "rotate(" + bannerDots + "deg)";
			bannerDots = bannerDots + 25;
	    	$("#bannerDots").css({"-moz-transform" : srotateDots, "-webkit-transform" : srotateDots});
	    	
			if (isFirefox == false) {
				if (seconds%2 == 0) { // if the seconds are even 
		    		$("#clockRing").css({"-moz-transform" : "scale(1.01)", "-webkit-transform" : "scale(1.01)"});
				} else {
		    		$("#clockRing").css({"-moz-transform" : "scale(0.99)", "-webkit-transform" : "scale(0.98)"});
				}
			} 
	    }
	    
	    // put current seconds into last seconds
	    lastSecond = seconds;

	}, 100); // End timer


});





