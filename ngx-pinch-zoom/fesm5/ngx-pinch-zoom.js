import { Component, ElementRef, Input, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Properties() { }
if (false) {
    /* Skipping unnamed member:
    "transition-duration"?: number;*/
    /* Skipping unnamed member:
    "double-tap"?: boolean;*/
    /* Skipping unnamed member:
    "double-tap-scale"?: number;*/
    /* Skipping unnamed member:
    "auto-zoom-out"?: boolean;*/
    /* Skipping unnamed member:
    "limit-zoom"?: number | "original image size";*/
    /** @type {?|undefined} */
    Properties.prototype.disabled;
    /** @type {?|undefined} */
    Properties.prototype.element;
    /** @type {?|undefined} */
    Properties.prototype.disablePan;
    /** @type {?|undefined} */
    Properties.prototype.overflow;
    /** @type {?|undefined} */
    Properties.prototype.disableZoomControl;
    /** @type {?|undefined} */
    Properties.prototype.zoomControlScale;
    /** @type {?|undefined} */
    Properties.prototype.backgroundColor;
    /** @type {?|undefined} */
    Properties.prototype.limitPan;
    /** @type {?|undefined} */
    Properties.prototype.minScale;
    /** @type {?|undefined} */
    Properties.prototype.eventHandler;
    /** @type {?|undefined} */
    Properties.prototype.listeners;
    /** @type {?|undefined} */
    Properties.prototype.wheel;
    /** @type {?|undefined} */
    Properties.prototype.autoHeight;
    /** @type {?|undefined} */
    Properties.prototype.wheelZoomFactor;
    /** @type {?|undefined} */
    Properties.prototype.draggableImage;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/properties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultProperties = {
    transitionDuration: 200,
    doubleTap: true,
    doubleTapScale: 2,
    limitZoom: "original image size",
    autoZoomOut: false,
    disabled: false,
    overflow: "hidden",
    zoomControlScale: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    minScale: 0,
    disableZoomControl: "auto",
    listeners: "mouse and touch",
    wheel: true,
    wheelZoomFactor: 0.2,
    draggableImage: false
};
/** @type {?} */
var backwardCompatibilityProperties = {
    "transition-duration": "transitionDuration",
    "double-tap": "doubleTap",
    "double-tap-scale": "doubleTapScale",
    "zoom-button": "zoomButton",
    "auto-zoom-out": "autoZoomOut",
    "limit-zoom": "limitZoom"
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/touches.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Properties$1() { }
if (false) {
    /** @type {?} */
    Properties$1.prototype.element;
    /** @type {?|undefined} */
    Properties$1.prototype.listeners;
    /** @type {?|undefined} */
    Properties$1.prototype.resize;
}
var Touches = /** @class */ (function () {
    function Touches(properties) {
        var _this = this;
        this.eventType = undefined;
        this.handlers = {};
        this.startX = 0;
        this.startY = 0;
        this.lastTap = 0;
        this.doubleTapMinTimeout = 300;
        this.tapMinTimeout = 200;
        this.touchstartTime = 0;
        this.i = 0;
        this.isMousedown = false;
        this.touchListeners = {
            "touchstart": "handleTouchstart",
            "touchmove": "handleTouchmove",
            "touchend": "handleTouchend"
        };
        this.mouseListeners = {
            "mousedown": "handleMousedown",
            "mousemove": "handleMousemove",
            "mouseup": "handleMouseup",
            "wheel": "handleWheel"
        };
        this.otherListeners = {
            "resize": "handleResize"
        };
        /*
             * Listeners
             */
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.elementPosition = _this.getElementPosition();
            _this.touchstartTime = new Date().getTime();
            if (_this.eventType === undefined) {
                _this.getTouchstartPosition(event);
            }
            _this.runHandler("touchstart", event);
        });
        /* Touchmove */
        this.handleTouchmove = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var touches = event.touches;
            // Pan
            if (_this.detectPan(touches)) {
                _this.runHandler("pan", event);
            }
            // Pinch
            if (_this.detectPinch(event)) {
                _this.runHandler("pinch", event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var touches = event.touches;
            // Double Tap
            if (_this.detectDoubleTap()) {
                _this.runHandler("double-tap", event);
            }
            // Tap
            _this.detectTap();
            _this.runHandler("touchend", event);
            _this.eventType = 'touchend';
            if (touches && touches.length === 0) {
                _this.eventType = undefined;
                _this.i = 0;
            }
        });
        /* Mousedown */
        this.handleMousedown = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.isMousedown = true;
            _this.elementPosition = _this.getElementPosition();
            _this.touchstartTime = new Date().getTime();
            if (_this.eventType === undefined) {
                _this.getMousedownPosition(event);
            }
            _this.runHandler("mousedown", event);
        });
        /* Mousemove */
        this.handleMousemove = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            //event.preventDefault();
            if (!_this.isMousedown) {
                return;
            }
            // Pan
            _this.runHandler("pan", event);
            // Linear swipe
            switch (_this.detectLinearSwipe(event)) {
                case "horizontal-swipe":
                    event.swipeType = "horizontal-swipe";
                    _this.runHandler("horizontal-swipe", event);
                    break;
                case "vertical-swipe":
                    event.swipeType = "vertical-swipe";
                    _this.runHandler("vertical-swipe", event);
                    break;
            }
            // Linear swipe
            if (_this.detectLinearSwipe(event) ||
                _this.eventType === 'horizontal-swipe' ||
                _this.eventType === 'vertical-swipe') {
                _this.handleLinearSwipe(event);
            }
        });
        /* Mouseup */
        this.handleMouseup = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Tap
            _this.detectTap();
            _this.isMousedown = false;
            _this.runHandler("mouseup", event);
            _this.eventType = undefined;
            _this.i = 0;
        });
        /* Wheel */
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.runHandler("wheel", event);
        });
        /* Resize */
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.runHandler("resize", event);
        });
        this.properties = properties;
        this.element = this.properties.element;
        this.elementPosition = this.getElementPosition();
        this.toggleEventListeners('addEventListener');
    }
    /**
     * @return {?}
     */
    Touches.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.toggleEventListeners('removeEventListener');
    };
    /**
     * @param {?} action
     * @return {?}
     */
    Touches.prototype.toggleEventListeners = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var listeners;
        if (this.properties.listeners === 'mouse and touch') {
            listeners = Object.assign(this.touchListeners, this.mouseListeners);
        }
        else {
            listeners = this.detectTouchScreen() ? this.touchListeners : this.mouseListeners;
        }
        if (this.properties.resize) {
            listeners = Object.assign(listeners, this.otherListeners);
        }
        for (var listener in listeners) {
            /** @type {?} */
            var handler = listeners[listener];
            // Window
            if (listener === "resize") {
                if (action === 'addEventListener') {
                    window.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    window.removeEventListener(listener, this[handler], false);
                }
                // Document
            }
            else if (listener === 'mouseup' || listener === "mousemove") {
                if (action === 'addEventListener') {
                    document.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    document.removeEventListener(listener, this[handler], false);
                }
                // Element
            }
            else {
                if (action === 'addEventListener') {
                    this.element.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    this.element.removeEventListener(listener, this[handler], false);
                }
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.handleLinearSwipe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        //event.preventDefault();
        this.i++;
        if (this.i > 3) {
            this.eventType = this.getLinearSwipeType(event);
        }
        if (this.eventType === 'horizontal-swipe') {
            this.runHandler('horizontal-swipe', event);
        }
        if (this.eventType === 'vertical-swipe') {
            this.runHandler('vertical-swipe', event);
        }
    };
    /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    Touches.prototype.runHandler = /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    function (eventName, response) {
        if (this.handlers[eventName]) {
            this.handlers[eventName](response);
        }
    };
    /*
     * Detection
     */
    /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    Touches.prototype.detectPan = /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    function (touches) {
        return touches.length === 1 && !this.eventType || this.eventType === 'pan';
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectDoubleTap = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        var currentTime = new Date().getTime();
        /** @type {?} */
        var tapLength = currentTime - this.lastTap;
        clearTimeout(this.doubleTapTimeout);
        if (tapLength < this.doubleTapMinTimeout && tapLength > 0) {
            return true;
        }
        else {
            this.doubleTapTimeout = setTimeout((/**
             * @return {?}
             */
            function () {
                clearTimeout(_this.doubleTapTimeout);
            }), this.doubleTapMinTimeout);
        }
        this.lastTap = currentTime;
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectTap = /**
     * @return {?}
     */
    function () {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        var currentTime = new Date().getTime();
        /** @type {?} */
        var tapLength = currentTime - this.touchstartTime;
        if (tapLength > 0) {
            if (tapLength < this.tapMinTimeout) {
                this.runHandler("tap", event);
            }
            else {
                this.runHandler("longtap", event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.detectPinch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var touches = event.touches;
        return (touches.length === 2 && this.eventType === undefined) || this.eventType === 'pinch';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.detectLinearSwipe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var touches = event.touches;
        if (touches) {
            if (touches.length === 1 && !this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
        else {
            if (!this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getLinearSwipeType = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.eventType !== 'horizontal-swipe' && this.eventType !== 'vertical-swipe') {
            /** @type {?} */
            var movementX = Math.abs(this.moveLeft(0, event) - this.startX);
            /** @type {?} */
            var movementY = Math.abs(this.moveTop(0, event) - this.startY);
            if ((movementY * 3) > movementX) {
                return 'vertical-swipe';
            }
            else {
                return 'horizontal-swipe';
            }
        }
        else {
            return this.eventType;
        }
    };
    /**
     * @return {?}
     */
    Touches.prototype.getElementPosition = /**
     * @return {?}
     */
    function () {
        return this.element.getBoundingClientRect();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getTouchstartPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.startX = event.touches[0].clientX - this.elementPosition.left;
        this.startY = event.touches[0].clientY - this.elementPosition.top;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getMousedownPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.startX = event.clientX - this.elementPosition.left;
        this.startY = event.clientY - this.elementPosition.top;
    };
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.moveLeft = /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        /** @type {?} */
        var touches = event.touches;
        if (touches) {
            return touches[index].clientX - this.elementPosition.left;
        }
        else {
            return event.clientX - this.elementPosition.left;
        }
    };
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.moveTop = /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        /** @type {?} */
        var touches = event.touches;
        if (touches) {
            return touches[index].clientY - this.elementPosition.top;
        }
        else {
            return event.clientY - this.elementPosition.top;
        }
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectTouchScreen = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        /** @type {?} */
        var mq = (/**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            return window.matchMedia(query).matches;
        });
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    };
    /* Public properties and methods */
    /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    Touches.prototype.on = /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    function (event, handler) {
        if (event) {
            this.handlers[event] = handler;
        }
    };
    return Touches;
}());
if (false) {
    /** @type {?} */
    Touches.prototype.properties;
    /** @type {?} */
    Touches.prototype.element;
    /** @type {?} */
    Touches.prototype.elementPosition;
    /** @type {?} */
    Touches.prototype.eventType;
    /** @type {?} */
    Touches.prototype.handlers;
    /** @type {?} */
    Touches.prototype.startX;
    /** @type {?} */
    Touches.prototype.startY;
    /** @type {?} */
    Touches.prototype.lastTap;
    /** @type {?} */
    Touches.prototype.doubleTapTimeout;
    /** @type {?} */
    Touches.prototype.doubleTapMinTimeout;
    /** @type {?} */
    Touches.prototype.tapMinTimeout;
    /** @type {?} */
    Touches.prototype.touchstartTime;
    /** @type {?} */
    Touches.prototype.i;
    /** @type {?} */
    Touches.prototype.isMousedown;
    /** @type {?} */
    Touches.prototype.touchListeners;
    /** @type {?} */
    Touches.prototype.mouseListeners;
    /** @type {?} */
    Touches.prototype.otherListeners;
    /** @type {?} */
    Touches.prototype.handleTouchstart;
    /** @type {?} */
    Touches.prototype.handleTouchmove;
    /** @type {?} */
    Touches.prototype.handleTouchend;
    /** @type {?} */
    Touches.prototype.handleMousedown;
    /** @type {?} */
    Touches.prototype.handleMousemove;
    /** @type {?} */
    Touches.prototype.handleMouseup;
    /** @type {?} */
    Touches.prototype.handleWheel;
    /** @type {?} */
    Touches.prototype.handleResize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ivypinch.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IvyPinchProperties() { }
if (false) {
    /** @type {?} */
    IvyPinchProperties.prototype.element;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.key;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTap;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTapScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.zoomControlScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.transitionDuration;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoZoomOut;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitZoom;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.disablePan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitPan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.minScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.eventHandler;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.listeners;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheel;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoHeight;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheelZoomFactor;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.draggableImage;
}
/** @type {?} */
var IvyPinchDefaultProperties = {
    doubleTap: true,
    doubleTapScale: 2,
    transitionDuration: 200,
    limitZoom: "original image size",
    minScale: 0,
    wheelZoomFactor: 0.2,
    draggableImage: true
};
var IvyPinch = /** @class */ (function () {
    function IvyPinch(properties) {
        var _this = this;
        this.i = 0;
        this.scale = 1;
        this.initialScale = 1;
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.initialMoveX = 0;
        this.initialMoveY = 0;
        this.moveXC = 0;
        this.moveYC = 0;
        this.lastTap = 0;
        this.draggingMode = false;
        this.distance = 0;
        this.doubleTapTimeout = 0;
        this.initialDistance = 0;
        this.events = {};
        this.maxHtmlContentScale = 3;
        this.maxScale = 1;
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.getElementPosition();
            if (_this.eventType === undefined) {
                _this.getTouchstartPosition(event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /* touchend */
            if (event.type === "touchend") {
                _this.i = 0;
                _this.draggingMode = false;
                /** @type {?} */
                var touches = event.touches;
                // Min scale
                if (_this.scale < 1) {
                    _this.scale = 1;
                }
                // Auto Zoom Out
                if (_this.properties.autoZoomOut && _this.eventType === 'pinch') {
                    _this.scale = 1;
                }
                // Align image
                if (_this.eventType === 'pinch' || _this.eventType === 'pan') {
                    _this.alignImage();
                }
                // Update initial values
                if (_this.eventType === 'pinch' ||
                    _this.eventType === 'pan' ||
                    _this.eventType === 'horizontal-swipe' ||
                    _this.eventType === 'vertical-swipe') {
                    _this.updateInitialValues();
                }
                _this.eventType = 'touchend';
                if (touches && touches.length === 0) {
                    _this.eventType = undefined;
                }
            }
            /* mouseup */
            if (event.type === "mouseup") {
                _this.draggingMode = false;
                _this.updateInitialValues();
                _this.eventType = undefined;
            }
        });
        /*
             * Handlers
             */
        this.handlePan = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.scale <= 1 || _this.properties.disablePan) {
                return;
            }
            event.preventDefault();
            var _a = _this.getClientPosition(event), clientX = _a.clientX, clientY = _a.clientY;
            if (!_this.eventType) {
                _this.startX = clientX - _this.elementPosition.left;
                _this.startY = clientY - _this.elementPosition.top;
            }
            _this.eventType = 'pan';
            _this.moveX = _this.initialMoveX + (_this.moveLeft(event, 0) - _this.startX);
            _this.moveY = _this.initialMoveY + (_this.moveTop(event, 0) - _this.startY);
            if (_this.properties.limitPan) {
                _this.limitPanY();
                _this.limitPanX();
            }
            /* mousemove */
            if (event.type === "mousemove") {
                _this.centeringImage();
            }
            _this.transformElement(0);
        });
        this.handleDoubleTap = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.toggleZoom(event);
            return;
        });
        this.handlePinch = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            if (_this.eventType === undefined || _this.eventType === 'pinch') {
                /** @type {?} */
                var touches = event.touches;
                if (!_this.eventType) {
                    _this.initialDistance = _this.getDistance(touches);
                    /** @type {?} */
                    var moveLeft0 = _this.moveLeft(event, 0);
                    /** @type {?} */
                    var moveLeft1 = _this.moveLeft(event, 1);
                    /** @type {?} */
                    var moveTop0 = _this.moveTop(event, 0);
                    /** @type {?} */
                    var moveTop1 = _this.moveTop(event, 1);
                    _this.moveXC = ((moveLeft0 + moveLeft1) / 2) - _this.initialMoveX;
                    _this.moveYC = ((moveTop0 + moveTop1) / 2) - _this.initialMoveY;
                }
                _this.eventType = 'pinch';
                _this.distance = _this.getDistance(touches);
                _this.scale = _this.initialScale * (_this.distance / _this.initialDistance);
                _this.moveX = _this.initialMoveX - (((_this.distance / _this.initialDistance) * _this.moveXC) - _this.moveXC);
                _this.moveY = _this.initialMoveY - (((_this.distance / _this.initialDistance) * _this.moveYC) - _this.moveYC);
                _this.handleLimitZoom();
                if (_this.properties.limitPan) {
                    _this.limitPanY();
                    _this.limitPanX();
                }
                _this.transformElement(0);
            }
        });
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            /** @type {?} */
            var zoomFactor = event.deltaY < 0 ? (_this.properties.wheelZoomFactor) : (-_this.properties.wheelZoomFactor);
            /** @type {?} */
            var newScale = _this.initialScale + zoomFactor;
            /* Round value */
            if (newScale < (1 + _this.properties.wheelZoomFactor)) {
                newScale = 1;
            }
            else if (newScale < _this.maxScale && newScale > _this.maxScale - _this.properties.wheelZoomFactor) {
                newScale = _this.maxScale;
            }
            if (newScale < 1 || newScale > _this.maxScale) {
                return;
            }
            if (newScale === _this.scale) {
                return;
            }
            _this.getElementPosition();
            _this.scale = newScale;
            /* Get cursor position over image */
            /** @type {?} */
            var xCenter = (event.clientX - _this.elementPosition.left) - _this.initialMoveX;
            /** @type {?} */
            var yCenter = (event.clientY - _this.elementPosition.top) - _this.initialMoveY;
            _this.setZoom({
                scale: newScale,
                center: [xCenter, yCenter]
            });
        });
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.setAutoHeight();
        });
        this.element = properties.element;
        this.elementTarget = this.element.querySelector('*').tagName;
        this.parentElement = this.element.parentElement;
        this.properties = Object.assign({}, IvyPinchDefaultProperties, properties);
        this.touches = new Touches({
            element: properties.element,
            listeners: properties.listeners,
            resize: properties.autoHeight
        });
        /* Init */
        this.setBasicStyles();
        /*
         * Listeners
         */
        this.touches.on('touchstart', this.handleTouchstart);
        this.touches.on('touchend', this.handleTouchend);
        this.touches.on('mousedown', this.handleTouchstart);
        this.touches.on('mouseup', this.handleTouchend);
        this.touches.on('pan', this.handlePan);
        this.touches.on('mousemove', this.handlePan);
        this.touches.on('pinch', this.handlePinch);
        if (this.properties.wheel) {
            this.touches.on('wheel', this.handleWheel);
        }
        if (this.properties.doubleTap) {
            this.touches.on('double-tap', this.handleDoubleTap);
        }
        if (this.properties.autoHeight) {
            this.touches.on('resize', this.handleResize);
        }
    }
    /**
     * @return {?}
     */
    IvyPinch.prototype.handleLimitZoom = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var limitZoom = this.maxScale;
        /** @type {?} */
        var minScale = this.properties.minScale;
        if (this.scale > limitZoom || this.scale <= minScale) {
            /** @type {?} */
            var imageWidth = this.getImageWidth();
            /** @type {?} */
            var imageHeight = this.getImageHeight();
            /** @type {?} */
            var enlargedImageWidth = imageWidth * this.scale;
            /** @type {?} */
            var enlargedImageHeight = imageHeight * this.scale;
            /** @type {?} */
            var moveXRatio = this.moveX / (enlargedImageWidth - imageWidth);
            /** @type {?} */
            var moveYRatio = this.moveY / (enlargedImageHeight - imageHeight);
            if (this.scale > limitZoom) {
                this.scale = limitZoom;
            }
            if (this.scale <= minScale) {
                this.scale = minScale;
            }
            /** @type {?} */
            var newImageWidth = imageWidth * this.scale;
            /** @type {?} */
            var newImageHeight = imageHeight * this.scale;
            this.moveX = -Math.abs((moveXRatio * (newImageWidth - imageWidth)));
            this.moveY = -Math.abs((-moveYRatio * (newImageHeight - imageHeight)));
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getLimitZoom = /**
     * @return {?}
     */
    function () {
        if (this.properties.limitZoom === "original image size") {
            if (this.elementTarget === "IMG") {
                /** @type {?} */
                var img = this.element.getElementsByTagName("img")[0];
                if (img.naturalWidth && img.offsetWidth) {
                    this.maxScale = img.naturalWidth / img.offsetWidth;
                    return this.maxScale;
                }
            }
            else {
                this.maxScale = this.maxHtmlContentScale;
                return this.maxScale;
            }
        }
        else {
            this.maxScale = this.properties.limitZoom;
            return this.maxScale;
        }
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.moveLeft = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientX = this.getClientPosition(event, index).clientX;
        return clientX - this.elementPosition.left;
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.moveTop = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientY = this.getClientPosition(event, index).clientY;
        return clientY - this.elementPosition.top;
    };
    /*
     * Detection
     */
    /*
         * Detection
         */
    /**
     * @return {?}
     */
    IvyPinch.prototype.centeringImage = /*
         * Detection
         */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        /** @type {?} */
        var initialMoveX = this.moveX;
        /** @type {?} */
        var initialMoveY = this.moveY;
        if (this.moveY > 0) {
            this.moveY = 0;
        }
        if (this.moveX > 0) {
            this.moveX = 0;
        }
        if (img) {
            this.limitPanY();
            this.limitPanX();
        }
        if (img && this.scale < 1) {
            if (this.moveX < this.element.offsetWidth * (1 - this.scale)) {
                this.moveX = this.element.offsetWidth * (1 - this.scale);
            }
        }
        return initialMoveX !== this.moveX || initialMoveY !== this.moveY;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.limitPanY = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgHeight = this.getImageHeight();
        /** @type {?} */
        var scaledImgHeight = imgHeight * this.scale;
        /** @type {?} */
        var parentHeight = this.parentElement.offsetHeight;
        /** @type {?} */
        var elementHeight = this.element.offsetHeight;
        if (scaledImgHeight < parentHeight) {
            this.moveY = (parentHeight - elementHeight * this.scale) / 2;
        }
        else {
            /** @type {?} */
            var imgOffsetTop = ((imgHeight - elementHeight) * this.scale) / 2;
            if (this.moveY > imgOffsetTop) {
                this.moveY = imgOffsetTop;
            }
            else if ((scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight) + this.moveY < 0) {
                this.moveY = -(scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight);
            }
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.limitPanX = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgWidth = this.getImageWidth();
        /** @type {?} */
        var scaledImgWidth = imgWidth * this.scale;
        /** @type {?} */
        var parentWidth = this.parentElement.offsetWidth;
        /** @type {?} */
        var elementWidth = this.element.offsetWidth;
        if (scaledImgWidth < parentWidth) {
            this.moveX = (parentWidth - elementWidth * this.scale) / 2;
        }
        else {
            /** @type {?} */
            var imgOffsetLeft = ((imgWidth - elementWidth) * this.scale) / 2;
            if (this.moveX > imgOffsetLeft) {
                this.moveX = imgOffsetLeft;
            }
            else if ((scaledImgWidth + Math.abs(imgOffsetLeft) - parentWidth) + this.moveX < 0) {
                this.moveX = -(imgWidth * this.scale + Math.abs(imgOffsetLeft) - parentWidth);
            }
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setBasicStyles = /**
     * @return {?}
     */
    function () {
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.transformOrigin = '0 0';
        this.setImageSize();
        this.setDraggableImage();
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeBasicStyles = /**
     * @return {?}
     */
    function () {
        this.element.style.display = '';
        this.element.style.alignItems = '';
        this.element.style.justifyContent = '';
        this.element.style.transformOrigin = '';
        this.removeImageSize();
        this.removeDraggableImage();
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setDraggableImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = this.properties.draggableImage;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeDraggableImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = !this.properties.draggableImage;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setImageSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '100%';
            imgElement[0].style.maxHeight = '100%';
            this.setAutoHeight();
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setAutoHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (!this.properties.autoHeight || !imgElement.length) {
            return;
        }
        /** @type {?} */
        var imgNaturalWidth = imgElement[0].getAttribute("width");
        /** @type {?} */
        var imgNaturalHeight = imgElement[0].getAttribute("height");
        /** @type {?} */
        var sizeRatio = imgNaturalWidth / imgNaturalHeight;
        /** @type {?} */
        var parentWidth = this.parentElement.offsetWidth;
        imgElement[0].style.maxHeight = parentWidth / sizeRatio + "px";
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeImageSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '';
            imgElement[0].style.maxHeight = '';
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getElementPosition = /**
     * @return {?}
     */
    function () {
        this.elementPosition = this.element.parentElement.getBoundingClientRect();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    IvyPinch.prototype.getTouchstartPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _a = this.getClientPosition(event), clientX = _a.clientX, clientY = _a.clientY;
        this.startX = clientX - this.elementPosition.left;
        this.startY = clientY - this.elementPosition.top;
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.getClientPosition = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientX;
        /** @type {?} */
        var clientY;
        if (event.type === "touchstart" || event.type === "touchmove") {
            clientX = event.touches[index].clientX;
            clientY = event.touches[index].clientY;
        }
        if (event.type === "mousedown" || event.type === "mousemove") {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            clientX: clientX,
            clientY: clientY
        };
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.resetScale = /**
     * @return {?}
     */
    function () {
        this.scale = 1;
        this.moveX = 0;
        this.moveY = 0;
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.updateInitialValues = /**
     * @return {?}
     */
    function () {
        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;
    };
    /**
     * @param {?} touches
     * @return {?}
     */
    IvyPinch.prototype.getDistance = /**
     * @param {?} touches
     * @return {?}
     */
    function (touches) {
        return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetHeight;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetWidth;
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    IvyPinch.prototype.transformElement = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        this.element.style.transition = "all " + duration + "ms";
        this.element.style.transform = "matrix(" + Number(this.scale) + ", 0, 0, " + Number(this.scale) + ", " + Number(this.moveX) + ", " + Number(this.moveY) + ")";
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.isTouchScreen = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return this.getMatchMedia(query);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    IvyPinch.prototype.getMatchMedia = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return window.matchMedia(query).matches;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.isDragging = /**
     * @return {?}
     */
    function () {
        if (this.properties.disablePan) {
            return false;
        }
        /** @type {?} */
        var imgHeight = this.getImageHeight();
        /** @type {?} */
        var imgWidth = this.getImageWidth();
        if (this.scale > 1) {
            return imgHeight * this.scale > this.parentElement.offsetHeight ||
                imgWidth * this.scale > this.parentElement.offsetWidth;
        }
        if (this.scale === 1) {
            return imgHeight > this.parentElement.offsetHeight ||
                imgWidth > this.parentElement.offsetWidth;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.pollLimitZoom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var poll = setInterval((/**
         * @return {?}
         */
        function () {
            if (_this.getLimitZoom()) {
                clearInterval(poll);
            }
        }), 10);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageElement = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            return imgElement[0];
        }
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    IvyPinch.prototype.toggleZoom = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (event === void 0) { event = false; }
        if (this.initialScale === 1) {
            if (event && event.changedTouches) {
                if (this.properties.doubleTapScale === undefined) {
                    return;
                }
                /** @type {?} */
                var changedTouches = event.changedTouches;
                this.scale = this.initialScale * this.properties.doubleTapScale;
                this.moveX = this.initialMoveX - (changedTouches[0].clientX - this.elementPosition.left) * (this.properties.doubleTapScale - 1);
                this.moveY = this.initialMoveY - (changedTouches[0].clientY - this.elementPosition.top) * (this.properties.doubleTapScale - 1);
            }
            else {
                this.scale = this.initialScale * (this.properties.zoomControlScale + 1);
                this.moveX = this.initialMoveX - this.element.offsetWidth * (this.scale - 1) / 2;
                this.moveY = this.initialMoveY - this.element.offsetHeight * (this.scale - 1) / 2;
            }
            this.centeringImage();
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
        else {
            this.resetScale();
        }
    };
    /**
     * @param {?} properties
     * @return {?}
     */
    IvyPinch.prototype.setZoom = /**
     * @param {?} properties
     * @return {?}
     */
    function (properties) {
        this.scale = properties.scale;
        /** @type {?} */
        var xCenter;
        /** @type {?} */
        var yCenter;
        /** @type {?} */
        var visibleAreaWidth = this.element.offsetWidth;
        /** @type {?} */
        var visibleAreaHeight = this.element.offsetHeight;
        /** @type {?} */
        var scalingPercent = (visibleAreaWidth * this.scale) / (visibleAreaWidth * this.initialScale);
        if (properties.center) {
            xCenter = properties.center[0];
            yCenter = properties.center[1];
        }
        else {
            xCenter = visibleAreaWidth / 2 - this.initialMoveX;
            yCenter = visibleAreaHeight / 2 - this.initialMoveY;
        }
        this.moveX = this.initialMoveX - ((scalingPercent * xCenter) - xCenter);
        this.moveY = this.initialMoveY - ((scalingPercent * yCenter) - yCenter);
        this.centeringImage();
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.alignImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isMoveChanged = this.centeringImage();
        if (isMoveChanged) {
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.removeBasicStyles();
        this.touches.destroy();
    };
    return IvyPinch;
}());
if (false) {
    /** @type {?} */
    IvyPinch.prototype.properties;
    /** @type {?} */
    IvyPinch.prototype.touches;
    /** @type {?} */
    IvyPinch.prototype.element;
    /** @type {?} */
    IvyPinch.prototype.elementTarget;
    /** @type {?} */
    IvyPinch.prototype.parentElement;
    /** @type {?} */
    IvyPinch.prototype.i;
    /** @type {?} */
    IvyPinch.prototype.scale;
    /** @type {?} */
    IvyPinch.prototype.initialScale;
    /** @type {?} */
    IvyPinch.prototype.elementPosition;
    /** @type {?} */
    IvyPinch.prototype.eventType;
    /** @type {?} */
    IvyPinch.prototype.startX;
    /** @type {?} */
    IvyPinch.prototype.startY;
    /** @type {?} */
    IvyPinch.prototype.moveX;
    /** @type {?} */
    IvyPinch.prototype.moveY;
    /** @type {?} */
    IvyPinch.prototype.initialMoveX;
    /** @type {?} */
    IvyPinch.prototype.initialMoveY;
    /** @type {?} */
    IvyPinch.prototype.moveXC;
    /** @type {?} */
    IvyPinch.prototype.moveYC;
    /** @type {?} */
    IvyPinch.prototype.lastTap;
    /** @type {?} */
    IvyPinch.prototype.draggingMode;
    /** @type {?} */
    IvyPinch.prototype.distance;
    /** @type {?} */
    IvyPinch.prototype.doubleTapTimeout;
    /** @type {?} */
    IvyPinch.prototype.initialDistance;
    /** @type {?} */
    IvyPinch.prototype.events;
    /** @type {?} */
    IvyPinch.prototype.maxHtmlContentScale;
    /** @type {?} */
    IvyPinch.prototype.maxScale;
    /** @type {?} */
    IvyPinch.prototype.handleTouchstart;
    /** @type {?} */
    IvyPinch.prototype.handleTouchend;
    /** @type {?} */
    IvyPinch.prototype.handlePan;
    /** @type {?} */
    IvyPinch.prototype.handleDoubleTap;
    /** @type {?} */
    IvyPinch.prototype.handlePinch;
    /** @type {?} */
    IvyPinch.prototype.handleWheel;
    /** @type {?} */
    IvyPinch.prototype.handleResize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinchZoomComponent = /** @class */ (function () {
    function PinchZoomComponent(elementRef) {
        this.elementRef = elementRef;
        this.transitionDuration = 200;
        this.doubleTap = true;
        this.doubleTapScale = 2;
        this.autoZoomOut = false;
        this.disabled = false;
        this.zoomControlScale = 1;
        this.backgroundColor = "rgba(0,0,0,0.85)";
        this.minScale = 0;
        this.listeners = 'mouse and touch';
        this.wheel = true;
        this.autoHeight = false;
        this.wheelZoomFactor = 0.2;
        this.draggableImage = false;
        this.applyOptionsDefault(defaultProperties, {});
    }
    Object.defineProperty(PinchZoomComponent.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return this._properties;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._properties = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "hostOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['overflow'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "hostBackgroundColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['backgroundColor'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isTouchScreen", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
            /** @type {?} */
            var mq = (/**
             * @param {?} query
             * @return {?}
             */
            function (query) {
                return window.matchMedia(query).matches;
            });
            if (('ontouchstart' in window)) {
                return true;
            }
            // include the 'heartz' as a way to have a non matching MQ to help terminate the join
            // https://git.io/vznFH
            /** @type {?} */
            var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
            return mq(query);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isDragging", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pinchZoom.isDragging();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['disabled'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "scale", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pinchZoom.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isZoomedIn", {
        get: /**
         * @return {?}
         */
        function () {
            return this.scale > 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initPinchZoom();
        /* Calls the method until the image size is available */
        this.pollLimitZoom();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var changedOptions = this.getProperties(changes);
        changedOptions = this.renameProperties(changedOptions);
        this.applyOptionsDefault(defaultProperties, changedOptions);
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.initPinchZoom = /**
     * @return {?}
     */
    function () {
        if (this.properties['disabled']) {
            return;
        }
        this.properties['element'] = this.elementRef.nativeElement.querySelector('.pinch-zoom-content');
        this.pinchZoom = new IvyPinch(this.properties);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PinchZoomComponent.prototype.getProperties = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var properties = {};
        for (var prop in changes) {
            if (prop !== 'properties') {
                properties[prop] = changes[prop].currentValue;
            }
            if (prop === 'properties') {
                properties = changes[prop].currentValue;
            }
        }
        return properties;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PinchZoomComponent.prototype.renameProperties = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        for (var prop in options) {
            if (backwardCompatibilityProperties[prop]) {
                options[backwardCompatibilityProperties[prop]] = options[prop];
                delete options[prop];
            }
        }
        return options;
    };
    /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    PinchZoomComponent.prototype.applyOptionsDefault = /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    function (defaultOptions, options) {
        this.properties = Object.assign({}, defaultOptions, options);
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.toggleZoom = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.toggleZoom();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.isControl = /**
     * @return {?}
     */
    function () {
        if (this.isDisabled) {
            return false;
        }
        if (this.properties['disableZoomControl'] === "disable") {
            return false;
        }
        if (this.isTouchScreen && this.properties['disableZoomControl'] === "auto") {
            return false;
        }
        return true;
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.pollLimitZoom = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.pollLimitZoom();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.destroy();
    };
    PinchZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pinch-zoom, [pinch-zoom]',
                    exportAs: 'pinchZoom',
                    template: "<div class=\"pinch-zoom-content\" [class.pz-dragging]=\"isDragging\">\n\t<ng-content></ng-content>\n</div>\n\n<!-- Control: one button -->\n<div class=\"pz-zoom-button pz-zoom-control-position-bottom\" \n\t[class.pz-zoom-button-out]=\"isZoomedIn\" \n\t*ngIf=\"isControl()\" \n\t(click)=\"toggleZoom()\"></div>",
                    styles: [":host{position:relative;overflow:hidden;display:block}.pinch-zoom-content{height:inherit}.pz-dragging{cursor:all-scroll}.pz-zoom-button{position:absolute;z-index:1000;color:#fff;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0xMiAxMGgtMnYySDl2LTJIN1Y5aDJWN2gxdjJoMnYxeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6TTcgOWg1djFIN3oiIGlkPSJzdmdfMiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);background-color:rgba(0,0,0,.8);background-position:center,-1000px;background-repeat:no-repeat,no-repeat;background-size:40px;width:56px;height:56px;border-radius:4px;opacity:.5;cursor:pointer;transition:opacity .1s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pz-zoom-button-out{background-position:-1000px,center}.pz-zoom-button:hover{opacity:.7}.pz-zoom-button.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-28px}.pz-zoom-button.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-button.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-28px}.pz-zoom-control{position:absolute;background-color:rgba(0,0,0,.8);border-radius:4px;overflow:hidden}.pz-zoom-control.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-48px}.pz-zoom-control.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-control.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-48px}.pz-zoom-in,.pz-zoom-out{width:48px;height:48px;background-position:center;background-repeat:no-repeat;opacity:1;cursor:pointer}.pz-zoom-in:hover,.pz-zoom-out:hover{background-color:rgba(255,255,255,.2)}.pz-zoom-control-position-bottom .pz-zoom-in,.pz-zoom-control-position-bottom .pz-zoom-out{float:right}.pz-disabled{opacity:.5;cursor:default}.pz-disabled:hover{background-color:rgba(255,255,255,0)}.pz-zoom-in{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBkPSJNLTE1LjgzNjczNDQyMDQ2MTY1Myw0NC41MzU0MDkzMDY3MTAxOCBoNTguMjA0MDgwODI3NTkzMDkgdi02LjU3NjIyNjcyMzM2OTIyMTUgSC0xNS44MzY3MzQ0MjA0NjE2NTMgeiIgZmlsbD0ibm9uZSIgaWQ9InN2Z18yIiBjbGFzcz0iIiBzdHJva2U9Im5vbmUiLz48L2c+PC9zdmc+)}.pz-zoom-out{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzSDV2LTJoMTR2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==)}"]
                }] }
    ];
    /** @nocollapse */
    PinchZoomComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PinchZoomComponent.propDecorators = {
        properties: [{ type: Input, args: ['properties',] }],
        transitionDuration: [{ type: Input, args: ['transition-duration',] }],
        doubleTap: [{ type: Input, args: ['double-tap',] }],
        doubleTapScale: [{ type: Input, args: ['double-tap-scale',] }],
        autoZoomOut: [{ type: Input, args: ['auto-zoom-out',] }],
        limitZoom: [{ type: Input, args: ['limit-zoom',] }],
        disabled: [{ type: Input, args: ['disabled',] }],
        disablePan: [{ type: Input }],
        overflow: [{ type: Input }],
        zoomControlScale: [{ type: Input }],
        disableZoomControl: [{ type: Input }],
        backgroundColor: [{ type: Input }],
        limitPan: [{ type: Input }],
        minScale: [{ type: Input }],
        listeners: [{ type: Input }],
        wheel: [{ type: Input }],
        autoHeight: [{ type: Input }],
        wheelZoomFactor: [{ type: Input }],
        draggableImage: [{ type: Input }],
        hostOverflow: [{ type: HostBinding, args: ['style.overflow',] }],
        hostBackgroundColor: [{ type: HostBinding, args: ['style.background-color',] }]
    };
    return PinchZoomComponent;
}());
if (false) {
    /** @type {?} */
    PinchZoomComponent.prototype.pinchZoom;
    /** @type {?} */
    PinchZoomComponent.prototype._properties;
    /** @type {?} */
    PinchZoomComponent.prototype.transitionDuration;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTap;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTapScale;
    /** @type {?} */
    PinchZoomComponent.prototype.autoZoomOut;
    /** @type {?} */
    PinchZoomComponent.prototype.limitZoom;
    /** @type {?} */
    PinchZoomComponent.prototype.disabled;
    /** @type {?} */
    PinchZoomComponent.prototype.disablePan;
    /** @type {?} */
    PinchZoomComponent.prototype.overflow;
    /** @type {?} */
    PinchZoomComponent.prototype.zoomControlScale;
    /** @type {?} */
    PinchZoomComponent.prototype.disableZoomControl;
    /** @type {?} */
    PinchZoomComponent.prototype.backgroundColor;
    /** @type {?} */
    PinchZoomComponent.prototype.limitPan;
    /** @type {?} */
    PinchZoomComponent.prototype.minScale;
    /** @type {?} */
    PinchZoomComponent.prototype.listeners;
    /** @type {?} */
    PinchZoomComponent.prototype.wheel;
    /** @type {?} */
    PinchZoomComponent.prototype.autoHeight;
    /** @type {?} */
    PinchZoomComponent.prototype.wheelZoomFactor;
    /** @type {?} */
    PinchZoomComponent.prototype.draggableImage;
    /**
     * @type {?}
     * @private
     */
    PinchZoomComponent.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinchZoomModule = /** @class */ (function () {
    function PinchZoomModule() {
    }
    PinchZoomModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PinchZoomComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        PinchZoomComponent
                    ],
                    providers: [],
                    bootstrap: [],
                    entryComponents: [
                        PinchZoomComponent
                    ]
                },] }
    ];
    return PinchZoomModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-pinch-zoom.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PinchZoomModule, PinchZoomComponent as ɵa };
//# sourceMappingURL=ngx-pinch-zoom.js.map
