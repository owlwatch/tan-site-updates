# Travel Advantage Network
## Site Updates Repository

### Introduction

This is my development environment to produce a dummy version of the
Travel Advantage Network. It is written in PHP to help reduce loads
of repetitive code. You can find the functioning version of this project
at [http://tan.owlwatch.com](http://tan.owlwatch.com)

For implementation purposes, the important directories are `assets` and `templates`.
The markup has been broken into multiple files to help with organization
and code reuse. The PHP is fairly minimal, so these individual templates
should be useful on their own. To get straight HTML, you can visit the
site above and simply view the source.

### Fonts

Fonts are used from [https://typekit.com/](Typekit). The Typekit configured in the
[https://github.com/owlwatch/tan-site-updates/blob/master/templates/head.php](head.php)
template is our own Owl Watch account. TAN should create a typekit account and
their own kit for their own instances.

The font we are using is [https://typekit.com/fonts/freight-sans-pro](Freight Sans Pro).
When creating the kit, this is all that needs to be added - we currently include all weights
(except the black) although we do not currently use them all.

> This documentation is still under development in conjunction with the remainder
> of the template and asset files. We will be documenting how to implement javascript
> shortly...