"use strict";

var SColor = {

	image: null,

	init: function (image) {
		this.image = image;
	},
	
	createCanvas: function () {
		return document.createElement('canvas');
	},

	convertRGB: function (data) {
		return {
			r: data[0],
			g: data[1],
			b: data[2]
		};
	},

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
