# Travel Advantage Network
### Site Updates Repository

#### Introduction

This is my development environment to produce a dummy version of the
Travel Advantage Network. It is written in PHP to help reduce loads
of repetitive code. You can find the functioning version of this project
at [http://tan.owlwatch.com](http://tan.owlwatch.com)

For implementation purposes, the important directories are `assets` and `templates`.
The markup has been broken into multiple files to help with organization
and code reuse. The PHP is fairly minimal, so these individual templates
should be useful on their own. To get straight HTML, you can visit the
site above and simply view the source.

#### Fonts

Fonts are used from [https://typekit.com/](Typekit). The Typekit configured in the
[https://github.com/owlwatch/tan-site-updates/blob/master/templates/head.php](head.php)
template is our own Owl Watch account. TAN should create a typekit account and
their own kit for their own instances. When you create a new kit, you must supply
domains that are valid for their use, which is why our kit will not work on someone
else domain. If you would like to use our kit during development, please let us
know what the development domain is and we can add it to our kit settings.

The font we are using is [https://typekit.com/fonts/freight-sans-pro](Freight Sans Pro).
When creating the kit, this is all that needs to be added - we currently include all weights
(except the black) although we do not currently use them all.

#### Bower and Composer

We are using bower and composer to manage dependencies during development. I would normally not
include all the packages in the git repo, but for the sake of completeness, I am
leaving them in this project so the dependencies can be found easily.

> This documentation is still under development in conjunction with the remainder
> of the template and asset files. We will be documenting how to implement javascript
> shortly...

#### Cart Object

The cart object (see assets/js/cart.js) has an `items` property that contains objects representing the different holds the user has in their cart. Each of these `item` in that array contains the following structure. 

```javascript
{
  "property": {
    "id": 48336,
    "thumb": "path_to_image",
    "images": [
      {
        "full": "path_to_image",
        "lg": "path_to_image",
        "thmb": "path_to_image"
      }
    ],
    "is_plus": true,
    "is_excess_inventory": false,
    "title": "Name of Property",
    "address": "2396 Old Scenic Highway 98",
    "city": "Mirimar Beach",
    "state": "Florida",
    "checkinDay": "Sunday",
    "amenities": {
      "resort": "HTML String"
    }
  },
  "room": {
    "bedrooms": 1,
    "rate": "$248",
    "vap": "$30"
  },
  "vapEnabled": true,
  "date": "2014-12-28",
  "dates": "12/28/2014 - 01/04/2015",
  "expiration": 1418765826263, // javascript timestamp
  "uid": "1418764926263-0", // unique id for the "hold"
}
```

*Important* this is a structure that was developed for demo data and does not necessarily have to be strictly followed. The most important properties are the `uid`, `dates`, and `expiration`. If the structure differs in implementation, the Handlebar templates will need to be adjusted to reflect the change (see templates/layout/footer.php)
