"use strict";

var SColor = {
	/**
	 * [image: the object of an image]
	 * @type {[type]}
	 */
	image: null,

	/**
	 * [init: constructor]
	 * @param  {Image} image [the image]
	 * @return {[type]}       [description]
	 */
	init: function (image) {
		this.image = image;
	},
	
	/**
	 * [createCanvas: create a dom of 'canvas']
	 * @return {[type]} [description]
	 */
	createCanvas: function () {
		return document.createElement('canvas');
	},

	/**
	 * [convertRGB: generate a format of rgb]
	 * @param  {[type]} data [the data return of getImageData]
	 * @return {[type]}      [description]
	 */
	convertRGB: function (data) {
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
	getBlock: function (top, left, width, height) {
		"use strict";
		var canvas = this.createCanvas();
        var context = canvas.getContext('2d');
		
		/**
		 * set width and height
		 */
		canvas.width = this.image.width;
        canvas.height = this.image.height;

        /**
         * draw the image
         */
        context.drawImage(this.image, 0, 0, canvas.width, canvas.height);

        /**
         * get the pixel data
         */
        var data = context.getImageData(top, left, width, height).data;

        /**
         * return the rgb format
         */
        return this.convertRGB(data);
	}
};
