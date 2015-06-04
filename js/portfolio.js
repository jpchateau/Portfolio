/**
* Portfolio jQuery plug-in
*
* @author Jean-Philippe Chateau <contact@jpchateau.com>
* @version 1.0.0
* @license MIT http://opensource.org/licenses/MIT
* @date 2015-06-04
*/
(function ($) {
    'use strict';

    $.fn.portfolio = function (options) {
        var PortfolioEffects = {
            effects: {
                slideOpen: function ($item) {
                    debug('slideOpen');
                    if ('block' !== $item.find('.overlay').css('display')) {
                        $item.find('.overlay').slideDown('fast');
                    }
                },
                slideClose: function ($item) {
                    debug('slideClose');
                    if ('block' === $item.find('.overlay').css('display')) {
                        $item.find('.overlay').slideUp('fast');
                    }
                }
            },
            bindEvent: function ($element, effect, event) {
                switch (effect) {
                case 'slide':
                    if ('click' === event) {
                        $element.bind('click', function () {
                            PortfolioEffects.effects.slide($(this));
                        });
                    }
                    if ('hover' === event) {
                        $element.bind('mouseenter', function () {
                            PortfolioEffects.effects.slideOpen($(this));
                        });
                        $element.bind('mouseleave', function () {
                            PortfolioEffects.effects.slideClose($(this));
                        });
                    }
                    break;
                }
            }
        };

        var debug = function (message) {
            if (window.console && window.console.log && settings.debug) {
                window.console.log(message);
            }
        };

        var checkSettings = function () {
            if ('undefined' === typeof settings.effect || 'slide' !== settings.effect) {
                debug('Error - check options effect');
            }
            if ('undefined' === typeof settings.event || ('click' !== settings.event && 'hover' !== settings.event)) {
                debug('Error - check options event');
            }
            if ('undefined' !== typeof settings.debug && (false !== settings.debug && true !== settings.debug)) {
                debug('Error - check options debug');
            }

            debug('options processed');
        };

        var defaults = {
            "event": "hover",           // hover|click
            "effect": "slide",          // slide
            "buttonText": "Click here", // whatever you want
            "debug": false              // false|true
        };

        var settings = $.extend({}, defaults, options);

        checkSettings();

        var createItemOverlay = function ($item) {
            // Title
            var titleElement = document.createElement('span');
            titleElement.setAttribute('class', 'title');
            titleElement.appendChild(document.createTextNode($item.attr('data-title')));

            // Description
            var descriptionElement = document.createElement('p');
            descriptionElement.setAttribute('class', 'description');
            descriptionElement.appendChild(document.createTextNode($item.find('p').html()));

            // Tags
            var tags = [],
                tagsContainerElement = document.createElement('div'),
                tagElement,
                tag,
                i;

            tagsContainerElement.setAttribute('class', 'tags-container');
            if ($item.attr('data-tags') !== '') {
                tags = $item.attr('data-tags').split(',');
            }
            for (i in tags) {
                if (tags.hasOwnProperty(i)) {
                    tag = document.createTextNode(tags[i].trim());
                    tagElement = document.createElement('span');
                    tagElement.style.display = 'inline-block';
                    tagElement.appendChild(tag);
                    tagsContainerElement.appendChild(tagElement);
                }
            }

            // Link
            var linkContainerElement = document.createElement('div');
            linkContainerElement.setAttribute('class', 'link_container');
            var linkElement = document.createElement('a');
            linkElement.href = $item.attr('data-link');
            linkElement.style.display = 'inline-block';
            linkElement.appendChild(document.createTextNode(settings.buttonText));
            linkContainerElement.appendChild(linkElement);

            // Overlay
            var overlay = document.createElement('div');
            overlay.style.width = $item.find('img').width() + 'px';
            overlay.style.height = $item.find('img').height() + 'px';
            overlay.setAttribute('class', 'overlay');

            overlay.appendChild(titleElement);
            overlay.appendChild(descriptionElement);
            overlay.appendChild(tagsContainerElement);
            overlay.appendChild(linkContainerElement);
            $item.append(overlay);

            debug($item.attr('data-title') + ' overlay created!');
        };

        var buildOverlays = function ($portfolioElement) {
            $portfolioElement.find('.card').each(function () {
                $(this).parent().css('width', $(this).find('img').width() + 'px');
                $(this).parent().css('height', $(this).find('img').height() + 'px');
                debug('width and height processed');

                createItemOverlay($(this));
            });
        };

        var bindEvents = function ($portfolioElement) {
            $portfolioElement.find('.card').each(function () {
                PortfolioEffects.bindEvent($(this), settings.effect, settings.event);
            });
        };

        return this.each(function () {
            buildOverlays($(this));
            bindEvents($(this));
        });
    };
}(jQuery));