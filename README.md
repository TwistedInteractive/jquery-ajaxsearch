jquery-ajaxsearch
=================

A Simple AJAX Search helper plugin for jQuery.
 
HTML:

    <form method="post" action="">
        <input type="text" name="query" placeholder="object, onderwerp" />
    </form>

JS:

	$('#nav form').ajaxSearch({
	    url: '/search/',                    // The URL to load
	    param: 'query'                      // The name of the parameter to send to the AJAX-page
	    input_name: 'query',                // The input name of the query
	    method: 'get',                      // The method to call the AJAX page
	    id: 'searchresultbox',              // The ID of the search results box
	    label: 'Search Results:',           // The label to show
	    spinner: 'images/spinner.gif',      // The image to the AJAX spinner
	    allowsubmit: false                  // Allow the form to be submitted (by pressing 'enter' for example)
	});
	

Response XML is expected in this format:

    <results>
        <collection type="projecten" name="Projecten">
            <item href="http://goevaers.twistedweb.nl/objecten/detail/9/strijp-s/">
                <name>Strijp-S</name>
                <excerpt>
                     <![CDATA[
                     <p>Strijp-S Lorem <strong>ipsum</strong> dolar sit amet Sed tortor eros, tristique eu semper ut, pharetra… dolor mauris lacinia felis, nec viverra sapien arcu vitae leo. HTML <strong>Ipsum</strong> Presents Pellentesque habitant morbi tristique senectus et netus et…</p>
                     ]]>
                 </excerpt>
             </item>
        </collection>
    </results>
