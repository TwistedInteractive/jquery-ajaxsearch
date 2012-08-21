/*

Simple AJAX Search plugin.

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

 */

(function($){
    $.fn.ajaxSearch = function(options)
    {
        var settings = $.extend( {
            url: '/search/',
            param: 'query',
            input_name: 'query',
            method: 'get',
            id: 'searchresultbox',
            label: 'Search Results:',
            spinner: 'images/spinner.gif',
            allowsubmit: false
        }, options);

        var inputField = $('input[name="' + settings.input_name + '"]', this);

        this.append('<div id="' + settings.id + '"><h3>' + settings.label + '</h3><ul class="main"></ul>' +
            '<a href="#" class="close">×</a><div class="spinner"><img src="'+settings.spinner+'" /></div></div>');
        var searchResultsBox = $('#' + settings.id);
        var spinner = $('div.spinner', searchResultsBox);

        if(!settings.allowsubmit)
        {
            this.submit(function(e){
                e.preventDefault();
            });
        }

        // Close button search results:
        $('a.close', searchResultsBox).click(function(e){
            e.preventDefault();
            inputField.val('');
            searchResultsBox.stop().animate({opacity: 0}, function(){
                $(this).hide();
            });
        });

        // Run an AJAX request on each keystroke:
        inputField.keyup(function(){
            var query = this.value;
            var data  = {};
            data[settings.param] = query;
            if(query != '')
            {
                if(searchResultsBox[0].style.display != 'block')
                {
                    searchResultsBox.stop().show().css({opacity: 0}).animate({opacity: 1});
                }
                $('ul.main', searchResultsBox).html('');
                spinner.show();
                $.ajax({
                    method: settings.method,
                    url: settings.url,
                    data: data,
                    success: function(data){
                        spinner.hide();
                        $('collection', data).each(function(){
                            var name = this.attributes['name'].value;
                            var type = this.attributes['type'].value;
                            if($('item', this).length > 0)
                            {
                                $('ul.main', searchResultsBox).append('<li class="' + type + '"><h4>' + name + '</h4><ul></ul></li>')
                                $('item', this).each(function(){
                                    var itemName    = $('name', this).text();
                                    var href        = $(this).attr('href');
                                    var excerptHtml = $('excerpt', this).text();
                                    $('li.' + type + ' ul', searchResultsBox).append('<li onclick="window.location = \''+href+'\';"><a href="'+href+'">'+itemName+'</a><div class="excerpt">'+excerptHtml+'</div></li>');
                                });
                            }
                        });
                    }
                });
            } else {
                searchResultsBox.stop().animate({opacity: 0}, function(){
                    $(this).hide();
                });
            }
        });
    }
})(jQuery);