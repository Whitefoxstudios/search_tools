(function($, window, document){
  'use-strict';

  $(window).bind('load', function(e){
    var truncate = function(str, limit = 60){
        if(str && typeof str !== undefined && str.length > limit) {
          return str.substring(0, limit);
        } else {
          return str;
        }
      },

      overflow = function(str, limit = 60){
        if(str && typeof str !== undefined && str.length > limit){
          return str.substring(limit, str.length);
        } else {
          return false;
        }
      },

      wfs = {
        toolbar: $('<div></div>', {
          class: 'wfs-toolbar'
        }),

        snippet: {
          wrapper: $('<a></a>', {
            href: 'https://www.google.com/search?num=100&q=site:'+window.location.hostname,
            target: '_blank',
            class: 'wfs-snippet--wrapper'
          }),

          title: {
            overflow: $('<mark></mark>', {
              text: overflow($('head title').text()),
              class: 'wfs-snippet--title--overflow wfs-err-warning'
            }),

            wrapper: $('<a></a>', {
              href: 'https://www.google.com/search?num=100&q=site:'+window.location.hostname,
              target: '_blank',
              text: truncate($('head title').text()),
              class: 'wfs-snippet--title'
            })
          },

          url: $('<cite></cite>', {
            text: window.location.href,
            class: 'wfs-snippet--url'
          }),

          description: {
            overflow: $('<mark></mark>', {
              text: overflow($('meta[name="description"]').attr('content'), 320),
              class: 'wfs-snippet--description--overflow wfs-err-warning'
            }),

            wrapper: $('<div></div>', {
              text: truncate($('meta[name="description"]').attr('content'), 320),
              class: 'wfs-snippet--description'
            })
          },

          toggle: $('<a></a>', {
            html: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="16px" height="16px"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>',
            href: '#',
            class: 'wfs-snippet--toggle'
          })
        }
      }, // #! end wfs

      fixed = $('*').filter(function(){
        return $(this).css('position') == 'fixed';
      }),

      bottom = fixed.filter(function(){
        return $(this).css('bottom').length > 0;
      });

      wfs.snippet.build = function(){
        wfs.snippet.wrapper.appendTo(wfs.toolbar);

        wfs.snippet.toggle.appendTo(wfs.snippet.wrapper);

        wfs.snippet.title.wrapper.appendTo(wfs.snippet.wrapper);

        if(wfs.snippet.title.overflow.text() !== 'false'){
          wfs.snippet.title.overflow.appendTo(wfs.snippet.title.wrapper);
        }

        wfs.snippet.url.appendTo(wfs.snippet.wrapper);

        wfs.snippet.description.wrapper.appendTo(wfs.snippet.wrapper);

        if(wfs.snippet.description.overflow.text() !== 'false'){
          wfs.snippet.description.overflow.appendTo(wfs.snippet.description.wrapper);
        }
      };

      wfs.load = function(){
        $('html >body').addClass('wfsDidFinishLoading');

        if(!(location.hostname.match(/(google|app\.flashissue|app\.asana)\.com/))) {

          $('html >body.wfsDidFinishLoading').append(wfs.toolbar);

          wfs.snippet.build();

          bottom.addClass('wfs--fixed-bottom');

          if(parseInt(bottom.css('bottom')) < (32+15)){
            bottom.css('bottom', bottom.css('bottom')+32+15+'px');
          }

          if($('html >body.wfsDidFinishLoading form select').length > 0){
            $('html >body.wfsDidFinishLoading form select').chosen({
              disable_search_threshold: 10,
              allow_single_deselect: true,
              search_contains: true
            });
          }
        }
      };

      wfs.load();
  });
})(window.jQuery, window, document, undefined);
