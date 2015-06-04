Portfolio
=========

**Description**

Portfolio is a jQuery plugin which displays a simple portfolio.
Link the images you want to highlight on your website with information and tags.
Useful for people who want to show their partners, sponsors, or as a showcase of web developments.

**Features**

* Lightweight
* Adaptive to the image dimensions
* Several effects: flip, slide & fade
* Several events: click, hover
* Flexible configuration
* Fully customizable using HTML & CSS
* Free to use under MIT licence

**How to**

*Include the CSS file*

```html
<link rel="stylesheet" type="text/css" href="css/portfolio.css" />
```

*Include jQuery*

Do not forget to load jQuery before calling the Portfolio script.
The recommended way to include jQuery is to include it from a CDN:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
```

*Include the JavaScript file*
```html
<script src="js/portfolio.js"></script>
```

*Edit your JavaScript code*

```JavaScript
$(document).ready(function () {
    var options = {
        buttonText: "Voir le site"
    };
    $('.portfolio').portfolio(options);
});
```

*Edit your HTML code*

```html
<div class="portfolio">
    <div class="card_container">
        <div class="card" data-title="Titre" data-link="http://www.site.com" data-tags="tag 1, tag 2">
          <div class="front face">
            <img src="/images/site.png" alt="Titre" />
          </div>
          <div class="back face">
            <p>Description</p>
          </div>
        </div>
    </div>
    <!-- ... -->
</div>
```

**Options**

| parameter | type | default | value(s) | description |
| ----------|------|---------|----------|-------------|
| event | string | "click" | "click", "hover" | The mouse event which trigger the effect |
| effect | string | "slide" | "slide", "flip", "fade" | The way the data corresponding to the image will be displayed |
| button | string | "Click here" | "whatever you want" | The link button text |

**Next steps**

* Pagination: CSS3 overflow property (fragment-overflow).
* Browsers that do not support flip effect: degraded mode.

**License**

MIT LICENSE
