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


    
    var   galleries = $('.gallery-set'),
          paginations = $('.pagination'),
          loadIcon = $('<div class="loadingIcon"> <img src="load/_21_loading-gif-transparent-background_Free-Content-Discovery-Influencer-Marketing-Tool-Buzzsumo-.gif" alt="loading"></div>');

          loadIcon.appendTo(gallery).hide();
          

$(window).on('scroll', function(){

    if(loadIcon.is(':visible') )  return;

    var data = paginations.data('bottom-page'),
        id = '#' + data.slice(0,-5);
    
  
    if($(window).scrollTop() + $(window).height() >= $(document).height()) 
    {
        console.log(id);
        
        if (gallery.find(id).length) {
            loadIcon.hide('fast');
            return ;
        }
        else{
            loadNewGallery(data);   
        }

    };

    function loadNewGallery(data){

        loadIcon.show('fast');

            var request = $.ajax({
                url:data
            }).promise();

            request.done(function(data){

                var newGallery = $(data).find('.gallery-set');

                newGallery.appendTo(gallery);
            });

            request.fail(function(){
                alert('nepodarilo sa');
            });
            request.always(function(){
                loadIcon.hide();
            });



    };
    
          
        
});




    // paginations.on('click', function(event){
        
    //          event.preventDefault();

    //     var a = $(this),
    //         li = a.parent();

    //         if(li.is('.active') || loading.is(':visible') )  return;

    //         var href = a.attr('href'),
    //             currentGallery = gallery.find('.gallery-set');

    //             li.addClass('active').siblings('li').removeClass('active');

    //         var id = '#' + href.slice(0,-5);

    //             if (gallery.find(id).length) {
    //                 currentGallery.hide();
    //                 $(id).show();
    //             }
    //             else {
    //                 loadNewGallery(href);
    //             }

    //             function loadNewGallery(href){
    //                 currentGallery.hide();
    //                 loading.show();
                
    //             var request = $.ajax({
    //                 url:href
    //             });
    //             request.done(function(data){
    //                 var newGallery = $(data).find('.gallery-set');
    //                 newGallery.hide().appendTo(gallery).show();
    //                 currentGallery.hide();
    //             });
    //             request.fail(function(){
    //                 alert('nepodarilo sa');
    //             });
    //             request.always(function(){
    //                 loading.hide();
    //             });
    //         }
    // });


    

}(jQuery));