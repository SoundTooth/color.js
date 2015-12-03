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

        /**
         * show the image
         */
        $(document.body).append(this.canvas);
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

    traceNext: function(x, y, dx, rotate, template, tolerateRate) {
        /**
         * calculate the new point
         */
        var newX = x + dx,
            newY = y + Math.tan(rotate) * dx;

        /**
         * trace next if the next point is legal
         */
        if (this.internalArea(newX, newY) && this.checkColor(this.getBlock(newX, Math.round(newY), 1, 1), template, tolerateRate)) {
            return this.traceNext(newX, newY, dx, rotate, template, tolerateRate);
        }

        /**
         * when illegal, then return the current point
         */
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
         * trace the Degree 1
         */
        var rotate = 0;
        var timeFn = null;
        timeFn = setInterval(function() {
        	if (rotate > 360) {
        		clearInterval(timeFn);
        	}

        	if (rotate == 90 || rotate == 270) {
        		rotate++;
                return;
            }

            var point_right = SColor.traceNext(startX, startY, 1, rotate, template, tolerateRate);
            $('#point-container').append('<div class="point" style="top: ' + (point_right.y - 1) + 'px; left: ' + (point_right.x - 1) + 'px"></div>');

            var point_left = SColor.traceNext(startX, startY, -1, rotate, template, tolerateRate);
            $('#point-container').append('<div class="point" style="top: ' + (point_left.y - 1) + 'px; left: ' + (point_left.x - 1) + 'px"></div>');
            rotate++;
        }, 1);
    }
};
