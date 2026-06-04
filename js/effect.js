$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;

		// ── Two-row balloon layout ──
		// Row 1: H B D  (b11 b22 b33)
		// Row 2: B A B Y (b44 b55 b66 b77)
		function balloonPositions() {
			var sw    = $(window).width();
			var vh    = $(window).height();
			var cx    = sw / 2 - Math.round(sw * 0.07);                // shifted ~7% left

			// Spacing: fits 3 / 4 balloons across 88% of screen width
			var s1 = Math.min(150, Math.floor(sw * 0.88 / 3));         // row-1 step (3 balloons)
			var s2 = Math.min(130, Math.floor(sw * 0.88 / 4));         // row-2 half-step (4 balloons)

			// Vertical: row 1 at 26%, row 2 at 51% of viewport height
			var r1 = Math.round(vh * 0.26);
			var r2 = Math.round(vh * 0.51);

			return {
				b11: { top: r1, left: cx - s1       },   // H
				b22: { top: r1, left: cx             },   // B
				b33: { top: r1, left: cx + s1        },   // D
				b44: { top: r2, left: cx - s2 * 1.5 },   // B
				b55: { top: r2, left: cx - s2 * 0.5 },   // A
				b66: { top: r2, left: cx + s2 * 0.5 },   // B
				b77: { top: r2, left: cx + s2 * 1.5 }    // Y
			};
		}

		$(window).resize(function(){
			vw = $(window).width() / 2;
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			var pos = balloonPositions();
			$('#b11').animate(pos.b11, 500);
			$('#b22').animate(pos.b22, 500);
			$('#b33').animate(pos.b33, 500);
			$('#b44').animate(pos.b44, 500);
			$('#b55').animate(pos.b55, 500);
			$('#b66').animate(pos.b66, 500);
			$('#b77').animate(pos.b77, 500);
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');

		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
			$('.decoration-scene').fadeIn('slow');
		});
	});

	function loopOne() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}
	function loopEight() {
		var randleft = 1000*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6',).addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		// loopEight();

		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		// Scroll the cake section into view smoothly
		$('html, body').animate({
			scrollTop: $('.cake-cover').offset().top - 60
		}, 900);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		vw = $(window).width() / 2;

		// 🎆 Launch fireworks — run for 7 s then wind down naturally
		if (typeof FireworksStart === 'function') FireworksStart(7000);

		// Stop floating animations and rename IDs so resize handler can track them
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');

		// Animate into two rows:  H B D  /  B A B Y
		var pos = balloonPositions();
		$('#b11').animate(pos.b11, 600);
		$('#b22').animate(pos.b22, 600);
		$('#b33').animate(pos.b33, 600);
		$('#b44').animate(pos.b44, 700);
		$('#b55').animate(pos.b55, 700);
		$('#b66').animate(pos.b66, 700);
		$('#b77').animate(pos.b77, 700);

		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		// Stop any remaining fireworks when moving to the message step
		if (typeof FireworksStop === 'function') FireworksStop();
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $messages = $(".message p");   // only inside .message
		var totalMessages = $messages.length;

		function msgLoop(i) {
			if (i < totalMessages - 1) {
				$messages.eq(i).fadeIn('slow').delay(1500).fadeOut('slow').promise().done(function(){
					msgLoop(i + 1);
				});
			} else {
				// Last message stays + cake comes back
				$messages.eq(i).fadeIn('slow').promise().done(function(){
					$('.cake').fadeIn('fast');
				});
			}
		}

		msgLoop(0);
	});

});

// Zoom (lightbox) feature
$('.album-photo').click(function() {
    var src = $(this).attr('src');
    $('#lightbox img').attr('src', src);

    // Force flex only when showing
    $('#lightbox').css('display', 'flex').hide().fadeIn('fast');
});

// Close when clicking outside image
$('#lightbox').click(function(e) {
    if (e.target !== this) return; // only close if background clicked
    $('#lightbox').fadeOut('fast');
});




//alert('hello');