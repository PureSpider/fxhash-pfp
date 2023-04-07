const jsondata = require('../../tmp/layers.json');

String.replacei = String.prototype.replacei = function (rep, rby) {
  var pos = this.toLowerCase().indexOf(rep.toLowerCase());
  return pos == -1 ? this : this.substr(0, pos) + rby + this.substr(pos + rep.length);
};

const pick = (arr) => arr[(fxrand() * arr.length) | 0];

const getWeightedOption = function (options) {
  let choices = [];
  for (let i in options)
    choices = choices.concat(new Array(options[i][1]).fill(options[i][0]));
  return pick(choices);
};

/*
layeredCanvas v0.1
by Federico Jacobi
federicojacobi.com
Abstraction layer on canvas to mimic the use of layers
*/

const layeredCanvas = function (canvas) {
  this.layers = [];

  var extend = function (defaults, options) {
    var extended = {}, prop;
    for (prop in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, prop))
        extended[prop] = defaults[prop];
    }
    for (prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop))
        extended[prop] = options[prop];
    }
    return extended;
  };

  this.addLayer = function (obj) {

    layer = extend({
      id: Math.random().toString(36).substr(2, 5),
      show: true,
      render: function (canvas, ctx) { }
    }, obj);

    if (this.getLayer(layer.id) !== false) {
      console.log('Layer already exists');
      console.log(obj);
      return false;
    }

    this.layers.push(layer);
    return this;
  };

  this.getLayer = function (id) {
    var length = this.layers.length;
    for (var i = 0; i < length; i++) {
      if (this.layers[i].id === id)
        return this.layers[i];
    }
    return false;
  };

  this.removeLayer = function (id) {
    var length = this.layers.length;
    for (var i = 0; i < length; i++) {
      if (this.layers[i].id === id) {
        removed = this.layers[i];
        this.layers.splice(i, 1);
        return removed;
      }
    }
    return false;
  };

  this.render = function () {
    var canvas = this.canvas;
    var ctx = this.ctx2d;
    this.layers.forEach(function (item, index, array) {
      if (item.show)
        item.render(canvas, ctx);
    });
  };

  this.canvas = canvas;
  this.ctx2d = this.canvas.getContext('2d');
};

const offScreen = document.createElement('canvas');
const offScreenLayered = new layeredCanvas(offScreen);

const onScreen = document.getElementById('theCanvas');
const onScreenCtx = onScreen.getContext('2d');

const dlButton = document.getElementById('download');

function downloadImage() {
  const link = document.createElement('a');
  link.download = 'fxhash-download.png';
  link.href = offScreen.toDataURL();
  link.click();
}

onScreen.addEventListener('click', event => {
  dlButton.classList.toggle("visible");
});

dlButton.addEventListener('click', event => {
  downloadImage();
});

let imageSizeSet = null;

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
window.$fxhashFeatures = {};

// https://stackoverflow.com/a/14731922/953010
/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

function render() {
  onScreenCtx.drawImage(offScreen, 0, 0, onScreen.width, onScreen.height);
}

function onWindowResize() {
  let ratio = calculateAspectRatioFit(offScreen.width, offScreen.height, window.innerWidth, window.innerHeight);

  onScreen.width = ratio.width;
  onScreen.height = ratio.height;

  render();
}
window.addEventListener('resize', onWindowResize, false);

let toLoad = 0;

const regex = /\d+(-\([\w-]+\))?-(.+)/;

Object.keys(jsondata)
  .filter(key => jsondata[key].length)
  .sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
  .forEach(key => {
    toLoad++; // Count each layer (not image) that has yet to be loaded

    let options = [];
    jsondata[key].forEach(elem => {
      options.push([elem, parseInt(elem.split('-')[0])]);
    });

    // Select value for attribute
    let selected = getWeightedOption(options);

    const layerOptions = {};

    const r = regex.exec(key);
    let optionString = r[1];
    const layerName = r[2];

    if (optionString) {
      optionString = optionString.substring(2, optionString.length - 1);
      optionArray = optionString.split('_');

      for (const option of optionArray) {
        let currOption = option.split('-');

        let flag = currOption.shift();
        let value;

        if (currOption.length) {
          value = currOption.join('-');
        }

        if (value) {
          layerOptions[flag] = value;
        } else {
          layerOptions[flag] = true;
        }
      }
    }

    if (!layerOptions.hide) {
      window.$fxhashFeatures[layerName] = selected.split('-').splice(1).join('-').replacei('.png', '').replaceAll('_', ' ');
    }

    let selectedLayerImage = new Image();
    selectedLayerImage.addEventListener('load', function () {
      // If no size is set,
      // use first image to determine
      if (!imageSizeSet) {
        imageSizeSet = true;

        offScreen.width = selectedLayerImage.width;
        offScreen.height = selectedLayerImage.height;

        window.dispatchEvent(new Event('resize'));
      }

      offScreenLayered.render();
      render();

      toLoad--;
      if (toLoad == 0) {
        fxpreview();
      }
    }, false);
    selectedLayerImage.src = './layers/' + key + '/' + selected;

    let layerObj = {
      id: key,
      show: true,
      render: function (canvas, ctx) {
        if (layerOptions.blend) {
          ctx.globalCompositeOperation = layerOptions.blend;
        } else {
          ctx.globalCompositeOperation = 'source-over';
        }

        ctx.drawImage(selectedLayerImage, 0, 0, canvas.width, canvas.height);
      }
    };

    offScreenLayered.addLayer(layerObj);
  });

$fx.features(window.$fxhashFeatures);
console.log(window.$fxhashFeatures);
