/* s3N10r sZcR1pTzC!!!!!1!1!!*/

function fadeIn(element, callback) {
	element.classList.add('fade-in');
	element.addEventListener('animationend', function() {
		element.classList.remove('fade-in');
		if (callback) callback();
	});
}

function fadeOut(element, callback) {
	element.classList.add('fade-out');
	element.addEventListener('animationend', function() {
		if (callback) callback();
		element.classList.remove('fade-out');
	});
}

document.addEventListener('DOMContentLoaded', function() {
	var htmlWordMatch = /(<\/?\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>)/gim;

	homeMenu();
	visitorCounter();
	lastUpdated();
	leetSpeak();
	outsideLinks();
	FAQify();

	// Home menu
	function homeMenu() {
		var menu_icons = document.querySelectorAll('#homeMenu .menuItem .icon');
		var length = menu_icons.length;
		for (var i = 0; i < length; i++) {
			var icon = menu_icons[i];
			var link = icon.parentElement.querySelector('.text > a');
			if (link != "") {
				icon.style.cursor = 'pointer';
				icon.dataset.href = link.href;
				if ((link.target != null) && (link.target != ""))
					icon.dataset.target = link.target;
				icon.addEventListener('click', function() {
					if (this.dataset.target != null)
						window.open(this.dataset.href, this.dataset.target);
					else
						window.location = this.dataset.href;
				});
			}
			else
				icon.style.cursor = 'default';
		}
	}
		
	// Random visitor counter
	function visitorCounter() 
	{
		var counters = document.getElementsByClassName('counter');
		var length = counters.length;
		for (var i = 0; i < length; i++) {
			var element = counters[i];
			var digits = element.getAttribute('rel');
			var counter = "";
			for (var i=0; i<=digits; i++) 
				counter += Math.floor(Math.random()*8) + 1 + "";
			element.innerHTML = counter;
		}
	}

	// Set last updated for URL.
	function lastUpdated() {
		var last_updates = document.getElementsByClassName('urlLastUpdated');
		var length = last_updates.length;
		for (var i = 0; i < length; i++) {
			var element = last_updates[i];
			getlastmod(element.getAttribute('rel'), appendLastModeDate, element);
		}
			
		function getlastmod(url, cb, element) {
			var req = new XMLHttpRequest();
			req.open("GET", url);
			req.addEventListener("load", function() {
				cb(element, req.getResponseHeader("Last-Modified"));
			}, false);
			req.send(null);
		}

		function appendLastModeDate(element, date) {
			element.append('Last updated: ' + date);
		}
	}
	
    // Doddering Git's "l33TsP33k" styling
	function leetSpeak( leetFirstStyle ) {
		if (leetFirstStyle == undefined) leetFirstStyle = 'l33Tf1RsT';
		var leetspeek_areas = document.getElementsByClassName('l33TsP33k');	// Only execute on "l33TsP33k" areas of the page
		var length = leetspeek_areas.length;
		for (var i = 0; i < length; i++) {
			var element = leetspeek_areas[i];
			var output = "";
			var tokens = element.innerHTML.split(htmlWordMatch);	// Split by whitespace into tags and content
			var tokenLength = tokens.length;					// Get number of tags and content
			for(var j=0; j<tokenLength; j++) {					// For each tag/content...
				var token = tokens[j].trim();					// Trim any whitespace
				if (token != "") {								// If there's anything left...
					if (token.substring(0,1) !="<") {			// Make sure we're not inside an HTML tag!!
						var words = token.split(/\s+/);			// Split by whitespace into words
						var length = words.length;				// Get number of words
						for (var k=0; k < length; k++) {		// For each word...
							var word = words[k].trim();			// Trim any whitespace
							if (word != "")						// If there anything left...
								// Apply style to first letter of word, and add trailing space
								output += "<span class=\"" + leetFirstStyle + "\">" + word.substring(0,1) + "</span>" + word.substring(1,word.length) + " ";
						}
					}
					else {
						// If we're in an HTML tag, just add it unaltered to the output.
						output += token;
					}
				}
			};
			// Finally, replace area with altered output.
			element.innerHTML = output;
		}
	}

	// Outside links open in new window
	function outsideLinks() {
		var links = document.getElementsByTagName('a');
		var length = links.length;
		for (var i = 0; i < length; i++) {
			var link = links[i];
			var href = link.getAttribute('href');
			if (href !== undefined && href !== null) 
				if (href.startsWith("http://") || href.startsWith("https://")) {
					link.setAttribute('target', '_blank');
				}
		}
	}
	
	// FAQ styling
	function FAQify() {
		var sd_faqs = document.getElementById('SDFaq');
		if (sd_faqs != null) {
			var output = "";
			var tokens = sd_faqs.innerHTML.split(htmlWordMatch);	// Split by whitespace into tags and content
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
			sd_faqs.innerHTML = output;
		}
	}
});
