#LMTLSS Static Sites

### At LMTLSS, we use this as the starting template for all of our client static sites.

#### Setup

- `npm install`
- `bower install`

#### Engine

Our workflow is powered by Grunt.js

To run a local server, start compiling Sass, and update changes on the fly with live reload, use `grunt serve`.

To build the website into a deployable, optimized form, use `grunt build` then look in your _/dist_ folder.

#### Usage

Here's how it works

- __Sass (.scss):__
    We use sass to beef up our css 

- __Image Optimization:__
    Please place your graphics in _/images/src_ instead of just _/images_ so Grunt can find images to optimize
    for you

- __Libs:__
    jQuery and Normalize.css come included in the template
