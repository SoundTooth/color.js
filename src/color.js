"use strict";

var SColor = {
    /**
     * [image: the object of an image]
     * @type {[type]}
     */
    image: null,

    /**
     * [canvas: the objcet of a canvas]
     * @type {[type]}
     */
    canvas: null,

    /**
     * [context: the context of the canvas]
     * @type {[type]}
     */
    context: null,

    /**
     * [init: constructor]
     * @param  {Image} image [the image]
     * @return {[type]}       [description]
     */
    init: function(image) {
        "use strict";
        this.image = image;
        this.canvas = this.createCanvas();
        this.context = this.canvas.getContext('2d');

        /**
         * set width and height
         */
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;

        /**
         * draw the image
         */
        this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    },

    /**
     * [createCanvas: create a dom of 'canvas']
     * @return {[type]} [description]
     */
    createCanvas: function() {
        "use strict";
        return document.createElement('canvas');
    },

    /**
     * [convertRGB: generate a format of rgb]
     * @param  {[type]} data [the data return of getImageData]
     * @return {[type]}      [description]
     */
    convertRGB: function(data) {
        "use strict";
        return {
            r: data[0],
            g: data[1],
            b: data[2]
        };
    },

    /**
     * [getBlock: get the color of a block of the image]
     * @param  {[type]} top    [x]
     * @param  {[type]} left   [y]
     * @param  {[type]} width  [the width of the block]
     * @param  {[type]} height [the height of the block]
     * @return {[type]}        [description]
     */
    getBlock: function(top, left, width, height) {
        "use strict";
        /**
         * get the pixel data
         */
        var data = this.context.getImageData(top, left, width, height).data;

        /**
         * return the rgb format
         */
        return this.convertRGB(data);
    },

    traceNext: function(x, y, dx, dy, template, tolerateRate) {
    	if (this.checkColor(this.getBlock(x + dx, y + dy, 1, 1), template, tolerateRate) && this.internalArea(x + dx, y + dy)) {
    		return this.traceNext(x + dx, y + dx, dx, dy, template, tolerateRate);
    	}

		if (this.checkColor(this.getBlock(x + dx, y, 1, 1), template, tolerateRate) && this.internalArea(x + dx, y)) {
    		return this.traceNext(x + dx, y, dx, dy, template, tolerateRate);
    	}

    	if (this.checkColor(this.getBlock(x, y + dy, 1, 1), template, tolerateRate) && this.internalArea(x, y + dy)) {
    		return this.traceNext(x, y + dy, dx, dy, template, tolerateRate);
    	}

    	return {
    		x: x,
    		y: y
    	};
    },

    internalArea: function(x, y) {
    	if ((x > this.canvas.width || x < 0) || (y > this.canvas.height || y < 0)) {
    		return false;
    	}
    	return true;
    },

    checkColor: function(color, template, rate) {
        /**
         * [if: R out of range]
         */
        if (color.r < (template.r - template.r * rate) || color.r > (template.r + template.r * rate)) {
            return false;
        }

        /**
         * [if: G out of range]
         */
        if (color.g < (template.g - template.g * rate) || color.g > (template.g + template.g * rate)) {
            return false;
        }

        /**
         * [if: B out of range]
         */
        if (color.b < (template.b - template.b * rate) || color.b > (template.b + template.b * rate)) {
            return false;
        }

        /**
         * legal
         */
        return true;
    },

    traceFourPoints: function(startX, startY, tolerateRate) {
        "use strict";
        /**
         * 1px*1px by default
         */
        var width = 1,
            height = 1;

        /**
         * [template: template color]
         */
        var template = this.getBlock(startX, startY, width, height);

        /**
         * bottom-right
         */
        console.log(this.traceNext(startX, startY, 1, 1, tolerateRate));
    }
};
