FXHASH PFP Token generator
================

A boilerplate to automate and ease the creation of profile picture projects on fxhash.

# Licensing

[![Template license: CC BY-NC-SA 4.0](https://img.shields.io/badge/Template%20license-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/) [![Generated code license: MIT](https://img.shields.io/badge/Generated%20code%20license-MIT-lightgrey.svg)](https://mit-license.org/)

The template itself is licensed as [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), you can read what this means in clear terms [on the creative commons website](https://creativecommons.org/licenses/by-nc-sa/4.0/).

The generated code is licensed as [MIT](https://mit-license.org/), which basically means "*do with it as you like, as long as you don't remove the original included license*". You do not need to mention that you used this template in your works, however it would be nice if you did - and it would be even nicer if you added me with a 1% primary split, or similar. Read the [linked document](https://mit-license.org/) or included `LICENSE` file for legal details.

# How to use

*Note:* You will need to have [nodejs](https://nodejs.org/) installed.

## Get up and running

Download this generator by clicking on "Code" and then "Download ZIP" in the top part of this website, or by [clicking here](https://github.com/PureSpider/fxhash-pfp/archive/refs/heads/master.zip).

Extract it somewhere, and find the `layers` directory inside the `project/public` directory. This is where you will save your layers. You do *not* need to change any other part of the project.

## Build your layers

Think of the layers like a stack of transparent layers on top of each other.

For each layer your project will have, generate a new directory with a name like this: `order-name`. For example: `00-base`, `01-skin`, `02-eyes`, and so on. This determines the order your layers will be "stacked" in, with `00` being all the way in the bottom of the stack, `01` on top of that, and so on.

Then, in those directories, add your layer variations with a preset name, including chances, like this: `chance-name`. Here are some examples: `5-blue`, `15-red`, `1-orange`. The chances do *not* need to add up to 100, they are just relative to each other. A chance of `5` is half as likely to appear as a chance of `10`, but five times as likely as a chance of `1`, for example.

### **Important notes**
* Make sure to use *no* spaces in your file or folder names! If you want spaces in the attributes, use `_` instead
* Emojis, question marks, and other special characters in folder or file names will not work either.
* All images need to be the *exact* same size, otherwise they will look skewed
* All images need to be in the PNG format
* All images need to be transparent in all spots where lower layers should be seen through
* The generated ZIP file needs to be less than 30 megabytes!
* Clearly mark your project as a layered composition, either in the description or by using the <kbd>Image composition</kbd> tag - ideally both!

### Layer options

There is a set of options you can use to define certain aspects of your layers, for example if they are hidden in the feature display or their blend mode.

See the following table for available options and their values:

| Option name | Possible values | Description
| --- | --- | --- |
| hide | `true`, `false`, *default: `false`* | If a layer is hidden, it will not show up in the feature list on fxhash |
|blend| [All values listed here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation#operations), *default: `source-over`* | Sets the blend mode of this layer, much like in your picture editing program |

To set these values, you need to add them to your layer names like in the following examples:

| Options | Result |
| --- | --- |
| `hide`: `true`, `blend`: `overlay` | `00-(hide-true_blend-overlay)-layer_name` |
| `hide`: `false`, `blend`: `destination-out` | `00-(blend-destination-out)-layer_name` |

### Layer structure example

Here is a complete layer structure as an example, with `hair`, `clothes` and `accessories` having custom chances, and `whiteseyes` and `clownoutline` being hidden, and `mouths` being hidden and using a custom blend mode:
```
📁 project
└── 📁 public
   └── 📁 layers
      ├── 📁 00-background
      |  ├── 🖼️ 1-beige.png
      |  ├── 🖼️ 1-blue.png
      |  ├── 🖼️ 1-brown.png
      |  ├── 🖼️ 1-darkblue.png
      |  ├── 🖼️ 1-darkpink.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-lightblue.png
      |  ├── 🖼️ 1-purple.png
      |  ├── 🖼️ 1-red.png
      |  └── 🖼️ 1-yellow.png
      ├── 📁 01-(hide)-whiteseyes
      |  └── 🖼️ 1-whiteseyes.png
      ├── 📁 02-skincolour
      |  ├── 🖼️ 1-aqua.png
      |  ├── 🖼️ 1-beige.png
      |  ├── 🖼️ 1-blue.png
      |  ├── 🖼️ 1-brown.png
      |  ├── 🖼️ 1-gold.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-pink.png
      |  ├── 🖼️ 1-purple.png
      |  └── 🖼️ 1-red.png
      ├── 📁 03-eyes
      |  ├── 🖼️ 1-aqua.png
      |  ├── 🖼️ 1-blue.png
      |  ├── 🖼️ 1-brown.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-neon.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-pastel.png
      |  ├── 🖼️ 1-pink.png
      |  ├── 🖼️ 1-purple.png
      |  └── 🖼️ 1-red.png
      ├── 📁 04-(hide_blend-multiply)-mouths
      |  ├── 🖼️ 1-aqua.png
      |  ├── 🖼️ 1-darkblue.png
      |  ├── 🖼️ 1-darkergreen.png
      |  ├── 🖼️ 1-darkgreen.png
      |  ├── 🖼️ 1-darkpurple.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-maroon.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-purple.png
      |  └── 🖼️ 1-yellow.png
      ├── 📁 05-teeth
      |  ├── 🖼️ 1-black.png
      |  ├── 🖼️ 1-brown.png
      |  ├── 🖼️ 1-darkgreen.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-lilac.png
      |  ├── 🖼️ 1-neon.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-purple.png
      |  ├── 🖼️ 1-red.png
      |  └── 🖼️ 1-yellow.png
      ├── 📁 06-eyebrows
      |  ├── 🖼️ 1-aqua.png
      |  ├── 🖼️ 1-black.png
      |  ├── 🖼️ 1-blue.png
      |  ├── 🖼️ 1-darkblue.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-pink.png
      |  ├── 🖼️ 1-purple.png
      |  ├── 🖼️ 1-red.png
      |  └── 🖼️ 1-yellow.png
      ├── 📁 07-facepaint
      |  ├── 🖼️ 1-eyeblue.png
      |  ├── 🖼️ 1-eyegreen.png
      |  ├── 🖼️ 1-eyered.png
      |  ├── 🖼️ 1-faceblue.png
      |  ├── 🖼️ 1-faceorange.png
      |  ├── 🖼️ 1-facered.png
      |  ├── 🖼️ 1-mouthblue.png
      |  ├── 🖼️ 1-mouthorange.png
      |  ├── 🖼️ 1-mouthred.png
      |  └── 🖼️ 1-none.png
      ├── 📁 08-(hide)-clownoutline
      |  └── 🖼️ 1-outline.png
      ├── 📁 09-clownnoses
      |  ├── 🖼️ 1-aqua.png
      |  ├── 🖼️ 1-blue.png
      |  ├── 🖼️ 1-green.png
      |  ├── 🖼️ 1-neon.png
      |  ├── 🖼️ 1-none.png
      |  ├── 🖼️ 1-orange.png
      |  ├── 🖼️ 1-pastel.png
      |  ├── 🖼️ 1-pink.png
      |  ├── 🖼️ 1-purple.png
      |  ├── 🖼️ 1-red.png
      |  └── 🖼️ 1-yellow.png
      ├── 📁 10-hair
      |  ├── 🖼️ 1-none.png
      |  ├── 🖼️ 1-red.png
      |  ├── 🖼️ 5-aqua.png
      |  ├── 🖼️ 5-blue.png
      |  ├── 🖼️ 5-darkgreen.png
      |  ├── 🖼️ 5-neon.png
      |  ├── 🖼️ 5-orange.png
      |  ├── 🖼️ 5-pastel.png
      |  ├── 🖼️ 5-pink.png
      |  ├── 🖼️ 5-purple.png
      |  └── 🖼️ 5-yellow.png
      ├── 📁 11-clothes
      |  ├── 🖼️ 1-none.png
      |  ├── 🖼️ 5-aqua.png
      |  ├── 🖼️ 5-blue.png
      |  ├── 🖼️ 5-green.png
      |  ├── 🖼️ 5-lilac.png
      |  ├── 🖼️ 5-neon.png
      |  ├── 🖼️ 5-orange.png
      |  ├── 🖼️ 5-pink.png
      |  ├── 🖼️ 5-purple.png
      |  ├── 🖼️ 5-red.png
      |  └── 🖼️ 5-yellow.png
      └── 📁 12-accessories
         ├── 🖼️ 1-none.png
         ├── 🖼️ 10-bubblegum.png
         ├── 🖼️ 10-earringcross.png
         ├── 🖼️ 10-Nosering.png
         ├── 🖼️ 11-textbubbleha.png
         ├── 🖼️ 2-nightcap.png
         ├── 🖼️ 4-pipe.png
         ├── 🖼️ 5-lasereyesblue.png
         ├── 🖼️ 5-lasereyesneon.png
         ├── 🖼️ 5-lasereyesred.png
         ├── 🖼️ 5-monocle.png
         ├── 🖼️ 6-cigar.png
         ├── 🖼️ 7-cigarette.png
         └── 🖼️ 8-partywhistle.png
```

### Additional features

Collectors can click/tap the image to make a <kbd>Download image</kbd> button appear. This lets them download the image in the original resolution, instead of the scaled presentation on the website.

## Generate your token

After you have setup your layers and are happy with them, double click one of the included files `generate.bat` (Windows) or `generate.sh` (Mac and Linux), depending on the system you are on.
If you are on mac or linux, you have to make the `generate.sh` file executable first.

This produces a `project.zip` file in the `dist-zipped` directory. This is the file you need to upload to fxhash to generate your token.

## Publish your token

Go to [https://fxhash.xyz/sandbox/](https://fxhash.xyz/sandbox/) and upload the `project.zip` file in there to see if it works properly.

Finally, you can mint your token using the same `project.zip` file.

The capture settings are as follows:
<dl>
  <dt>When will the capture module trigger?</dt>
  <dd>Programmatic trigger using fxpreview()</dd>
  <dt>What will be the target of the capture module?</dt>
  <dd>From &lt;canvas&gt;</dd>
  <dt>A CSS selector that targets the canvas on which your graphics are rendered</dt>
  <dd>#theCanvas</dd>
</dl>
