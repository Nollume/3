(function($){

var gallery = $('.gallery');
    overlay = $('<div/>', {id:'overlay'}),
    loading = $('.load');

    
    


    overlay.appendTo('body').hide();
    loading.hide();

    gallery.on('click','a', function(e){
        e.preventDefault();
        
        var href = $(this).attr('href'),
            image = $('<img>',{src:href,alt:'obrazok'});

            scrollHide = $('html, body').css({
                overflow: 'hidden',
                height: '100%'
            });

            loading.show();



        image.on('load', function() {
               overlay.html(image).show();

               loading.hide();

            });
    });

    overlay.on('click', function(){
        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });

        overlay.hide();
    });

    $(document).on('keyup', function(event){

        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        });

        if( event.which === 27) overlay.hide();
    });


    
    var paginations = $('<div class="pagination " data-bottom-page="trees.html"></div>'),
        loadIcon = $('<div class="loadingIcon"> <img src="load/_21_loading-gif-transparent-background_Free-Content-Discovery-Influencer-Marketing-Tool-Buzzsumo-.gif" alt="loading"></div>');
        

        paginations.appendTo(gallery);

        loadIcon.appendTo(gallery).hide();
          

$(window).on('scroll', function()
{

    if(loadIcon.is(':visible') )  return;

    var currentGallery = gallery.find('.gallery-set');
        data = paginations.data('bottom-page'),
        id = '#' + data.slice(0,-5);
    
  
    if($(window).scrollTop() + $(window).height() >= $(document).height()) 
    {
        
        if (id === '#trees'){   
            paginations = $('<div class="pagination " data-bottom-page="lakes.html"></div>');

        };

        if (id === '#lakes'){
            paginations.hide();
        };

        if (gallery.find(id).length) {
            loadIcon.hide('fast');
            return ;
            
        }
        else{
            loadNewGallery(data);   
        }

    };

        function loadNewGallery(data)
        {

            loadIcon.show('fast');

                var request = $.ajax(
                {
                    url:data
                }).promise();

                request.done(function(data)
                {

                    var newGallery = $(data).find('.gallery-set');
                        
                    newGallery.appendTo(gallery);
                    

                });

                request.fail(function()
                {
                    alert('nepodarilo sa');
                });
                request.always(function()
                {
                    loadIcon.hide();
                });

        };        
        
});
   
}(jQuery));