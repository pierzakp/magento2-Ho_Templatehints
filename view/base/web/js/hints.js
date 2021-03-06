/**!
 * Copyright (c) 2016 H&O E-commerce specialisten B.V. (http://www.h-o.nl/)
 * See LICENSE.txt for license details.
 */

document.addEventListener("DOMContentLoaded", function(event) {
  require(['jquery'], function ($) {
    "use strict"


    $(document).keydown(function(event) {
      if (! event.shiftKey) {
        return
      }

      var hintElements = $('[data-ho-hinttype], .ho-hint')

      hintElements.each(function(){
        var hintElem = $(this);
        var hintType = hintElem.data('ho-hinttype');
        hintElem.removeAttr('data-ho-hinttype');

        hintElem.data('ho-hintdata');
        hintElem.removeAttr('data-ho-hintdata')

        hintElem.addClass('ho-hint')
                .addClass('ho-hint-outline')
                .addClass('ho-hint-'+hintType)
      });
    })


    //Remove styles when no 
    $(document).keyup(function(event) {
      if (event.shiftKey) {
        return
      }

      $('.ho-hint').removeClass('ho-hint-outline ho-hint-hover')
    })


    $(document).on('mouseover', '.ho-hint', function(event){
      if (!event.shiftKey) {
        return
      }

      $(this).addClass('ho-hint-hover')
    })


    $(document).on('mouseout', '.ho-hint', function(event){
      if (!event.shiftKey) {
        return
      }

      $(this).removeClass('ho-hint-hover')
    })


    $(document).on('click', '.ho-hint', function(event){
      if (! event.shiftKey) {
        return
      }

      hint(this);

      return false
    })

    window.hint = function(elem) {
      var hintElem = $(elem)
      var hintData = hintElem.data('ho-hintdata');
      hintElem.removeAttr('data-ho-hintdata')
      var hintType = hintElem.data('ho-hinttype');
      hintElem.removeAttr('data-ho-hinttype')

      if (typeof hintData != 'object') {
        console.log('can not parse as json', hintData)
        return
      }

      switch (hintType) {
        case 'container':

          console.groupCollapsed(hintType+': '+hintData['name'])

          Object.keys(hintData).forEach(function(key){
            if (['name'].indexOf(key) >= 0) {
              return;
            }
            console.log(key+':', hintData[key]);
          })
          console.log(this)

          console.groupEnd()

          break;
        case 'block':
        case 'ui-component':
          console.groupCollapsed(hintType+': '+hintData['name']+' | '+hintData['moduleName'])
          Object.keys(hintData).forEach(function(key){
            if (['name', 'cache', 'moduleName'].indexOf(key) >= 0) {
              return;
            }
            console.log(hintData[key]);
          })
          console.log(hintData['cache'])
          console.log(elem)

          console.groupEnd()
          break;
      }
    }
  })
})
