#frame-scss
##Sassy CSS framework

Includes functions/mixins for media queries/breakpoints, flexible responsive grids, effects and shapes. Also included are some functions/mixins to more easily debug your own custom Sass :)

###Main features
- Easy configuration of media queries and breakpoints. Set them the way you want or need them.
- 10, 11 or 12 columns? It doesn't matter, you define the widths and how each column reacts to different breakpoints.
- Cool transition mixin! Just define the easing, time and delay properties in the main `_frame.scss` settings file and you're ready to go. Now all your transitions automatically have the same default properties. You can even create multiple groups for different transitions if you need them.
- Lots of type check functions, sort functions, and more list/map related functions!
- Includes [normalize.css v3.0.2](https://github.com/necolas/normalize.css/) and more useful style classes.
- Some basic shapes and effects, such as hexagons, triangles, gradients and fancy text shadows.
- Extended debug functions and mixins. Output variables in the console or the compiled CSS to see what their actual values are. This makes developing your own stuff even easier :)

###Installation
Either [download the latest release](https://github.com/roeldev/frame-scss/releases) or [install with Bower](http://bower.io): `bower install --save frame-scss`

###How to use
1. Copy the `_frame.scss` and `_frame-basics.scss` files into your project folder.
2. Update the `@import` rules so they point to the right file(s) in the `source` folder of this package.
3. Now you can change the default values of the settings variables so it suits your project.

All main variables and settings are placed in `_frame.scss`. Here you can add colors, fonts, breakpoints, or custom variables specific for you project. If you need any of these values, just call the appropiate `frame-` function (eg. `$frame-colors` -> `frame-color()`). That's it. _Please note that removing any of the `$frame-` prefixed variables will break the framework._

In `_frame-basics.scss` you can remove (by adding comments) any predefined style classes wich you don't plan to use. This will keep the compiled CSS file cleaner and smaller.

If you plan to use the grid system or the predefined icon fonts functions, you must also copy the `_frame-grid.scss` and `_frame-iconfont.scss` files to your project folder. Don't forget to update the `@import` rules for these files too ;)

This project is still work in progress. Some stuff may still change, so use at your own risk.

###To do:
- Add gaps to blockgrid (high)
- Add flexgrid grid system (medium priority as <= IE10 does not fully support flexbox)
- Complete `slice/splice` functions (medium)
- Complete `_sort-regular` function (medium)
- Extend documentation for certain functions (medium)
- Add table-/inlinegrid systems (low priority, perhaps even skip this one)
- Add more shapes (low priority)
- It's probably a good idea to create a couple of examples (low priority)
