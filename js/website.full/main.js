/* s3N10r sZcR1pTzC!!!!!1!1!!*/
$(document).ready( function() {
	var htmlWordMatch = /(<\/?\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)/gim;
	visitorCounter();
	leetSpeak();
	headers();
	FAQify();
	
	// Old school blinking!
	//$('.blink').each( function () {
	//	blinker($(this));
	//});
	$('.blink').animate({
	    opacity: 0.5
	  }, 500);
	// Set last updated for page.
	$('.lastUpdated').append('Last updated: ' + document.lastModified);
	// Set last updated for URL.
	$('.urlLastUpdated').each( function() {
		var element = $(this);
		getlastmod(element.attr("rel"), appendLastModeDate, element);
	});
	
	function appendLastModeDate(element, date) {
		element.append('Last updated: ' + date);
	}
	
	function getlastmod(url, cb, element) {
	    var req = new XMLHttpRequest();
	    req.open("GET", url);
	    req.addEventListener("load", function() {
	        cb(element, req.getResponseHeader("Last-Modified"));
	    }, false);
	    req.send(null);
	}
	
	// Random visitor counter
	function visitorCounter() 
	{		
		$('.counter').each( function() {
			var element = $(this);
			var digits = element.attr("rel");
			var counter = "";
			for (var i=0; i<=digits; i++) 
				counter += Math.floor(Math.random()*8) + 1 + "";
			element.append(counter);
		});
	}
	
	// Header links
	$('.link').click(function(){ window.location = $(this).attr('rel'); });

    // "Saggie" in demo pages
    $('#saggie .title').each(function() {
        $(this).attr('title','sAgG13!!!1!');
        $(this).click(function(){ window.location = '/default.html'; });
    });

    // "More" links
    $('.more').each(function() {
        $(this).attr('title','[ m0R3!!!11!1 ]');
        $('.link').click(function(){ window.location = $(this).attr('rel'); });
    });

    // Doddering Git's "l33TsP33k" styling
	function leetSpeak() {
		$('.l33TsP33k').each( function() {						// Only execute on "l33TsP33k" areas of the page
			var output = "";
			var tokens = $(this).html().split(htmlWordMatch);	// Split by whitespace into tags and content
			var tokenLength = tokens.length;					// Get number of tags and content
			for(var i=0; i<tokenLength; i++) {					// For each tag/content...
				var token = tokens[i].trim();					// Trim any whitespace
				if (token != "") {								// If there's anything left...
					if (token.substring(0,1) !="<") {			// Make sure we're not inside an HTML tag!!
						var words = token.split(/\s+/);			// Split by whitespace into words
						var length = words.length;				// Get number of words
						for (var j=0; j < length; j++) {		// For each word...
							var word = words[j].trim();			// Trim any whitespace
							if (word != "")						// If there anything left...
								// Apply style to first letter of word, and add trailing space
								output += "<span class=\"l33Tf1RsT\">" + word.substring(0,1) + "</span>" + word.substring(1,word.length) + " ";
						}
					}
					else {
						// If we're in an HTML tag, just add it unaltered to the output.
						output += token;
					}
				}
			};
			// Finally, replace area with altered output.
			$(this).html(output);
		});
	}


    // Doddering Git's "l33TsP33k" styling- extra strength!!
    function leetSpeakExtra() {
        $('.l33TsP33k3xTrA').each( function() {				    // Only execute on "l33TsP33k3xTrA" areas of the page
            var output = "";
            var tokens = $(this).html().split(htmlWordMatch);	// Split by whitespace into tags and content
            var tokenLength = tokens.length;					// Get number of tags and content
            for(var i=0; i<tokenLength; i++) {					// For each tag/content...
                var token = tokens[i].trim();					// Trim any whitespace
                if (token != "") {								// If there's anything left...
                    if (token.substring(0,1) !="<") {			// Make sure we're not inside an HTML tag!!
                        var words = token.split(/\s+/);			// Split by whitespace into words
                        var length = words.length;				// Get number of words
                        for (var j=0; j < length; j++) {		// For each word...
                            var word = words[j].trim();			// Trim any whitespace
                            if (word != "")						// If there anything left...
                            // Alternate for each character
                            var apply = false;
                            var charLength = word.length;
                            for (var k=0; k < charLength; k++)
                            {
                                if (apply)
                                    output += "<span class=\"l33Tf1RsT\">" + word.substring(k,1) + "</span>";
                                else
                                    output += word.substring(k,1);
                                apply = !apply;
                            }
                        }
                    }
                    else {
                        // If we're in an HTML tag, just add it unaltered to the output.
                        output += token;
                    }
                }
            };
            // Finally, replace area with altered output.
            $(this).html(output);
        });
    }

	// Header logo links
	function headers() {
		$('#homeMenu .menuItem .icon').each( function() {
			var link = $(this).parent().find('.text a')[0];
			if (link != "" ) {
				if ((link.target != null)&&(link.target != "")) 
					$(this).click(function() { window.open(link.href, link.target); });
				else
					$(this).click(function() { window.location = link.href; });
			}
			else 
				$(this).css('cursor', 'default');
		});
	}

	
	// FAQ styling
	function FAQify() {
		$('#SDFaq').each( function() {							// Only execute on "SDFaq" area of the page
			var output = "";
			var tokens = $(this).html().split(htmlWordMatch);	// Split by whitespace into tags and content
			var tokenLength = tokens.length;					// Get number of tags and content
			for(var i=0; i<tokenLength; i++) {					// For each tag/content...
				var token = tokens[i].trim();					// Trim any whitespace
				if (token != "") {								// If there's anything left...
					if (token.substring(0,1) !="<") {			// Make sure we're not inside an HTML tag!!
						var result = token.replace(/(faq)/gi, "<span class='faq'>$1</span>");
						// Apply style to first letter of word, and add trailing space
						output += result + " ";
					}
					else {
						// If we're in an HTML tag, just add it unaltered to the output.
						output += token;
					}
				}
			};
			// Finally, replace area with altered output.
			$(this).html(output);
		});
	}
	
	function blinker( element ) {
		function blink_element() {
		    $('.blink').fadeOut(500, function() {
		    	$('.blink').fadeIn(500);
		    });
		}
		setInterval(blink_element, 1000);
	}
});
