"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var AbcTooltip = function() {
    function AbcTooltip() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : args, _ref$target = _ref.target, target = _ref$target === void 0 ? null : _ref$target, _ref$content = _ref.content, content = _ref$content === void 0 ? null : _ref$content, _ref$html = _ref.html, html = _ref$html === void 0 ? false : _ref$html, _ref$position = _ref.position, position = _ref$position === void 0 ? "top" : _ref$position, _ref$event = _ref.event, event = _ref$event === void 0 ? "hover" : _ref$event, _ref$gap = _ref.gap, gap = _ref$gap === void 0 ? 0 : _ref$gap;
        _classCallCheck(this, AbcTooltip);
        if (!target) {
            var tooltips = document.querySelectorAll("[data-abc-tt-content]");
            tooltips.forEach(function(tooltip) {
                var _tooltip$dataset = tooltip.dataset, tooltipContent = _tooltip$dataset.abcTtContent, _tooltip$dataset$abcT = _tooltip$dataset.abcTtHtml, tooltipIsHtml = _tooltip$dataset$abcT === void 0 ? true : _tooltip$dataset$abcT, _tooltip$dataset$abcT2 = _tooltip$dataset.abcTtPosition, tooltipPosition = _tooltip$dataset$abcT2 === void 0 ? "top" : _tooltip$dataset$abcT2, _tooltip$dataset$abcT3 = _tooltip$dataset.abcTtEvent, tooltipEvent = _tooltip$dataset$abcT3 === void 0 ? "hover" : _tooltip$dataset$abcT3, _tooltip$dataset$abcT4 = _tooltip$dataset.abcTtGap, tooltipGap = _tooltip$dataset$abcT4 === void 0 ? 0 : _tooltip$dataset$abcT4;
                new AbcTooltip({
                    target: tooltip,
                    content: tooltipContent,
                    html: tooltipIsHtml === "true",
                    position: tooltipPosition,
                    event: tooltipEvent,
                    gap: Number(tooltipGap)
                });
            });
            return;
        }
        this.target = target;
        this.content = content;
        this.position = position;
        this.html = html;
        this.event = event;
        this.gap = gap;
        this.createTooltipHTMLStructure();
        if (this.event === "hover") {
            this.target.addEventListener("mouseenter", this.enter.bind(this));
            this.target.addEventListener("mouseleave", this.leave.bind(this));
        } else if (this.event === "click") {
            this.target.addEventListener("click", this.enter.bind(this));
            this.displayed = false;
        }
    }
    _createClass(AbcTooltip, [ {
        key: "enter",
        value: function enter() {
            if (this.event === "hover") {
                this.insertTooltipIntoDocument();
                this.adjustPositions();
            } else if (this.event === "click" && !this.displayed) {
                this.insertTooltipIntoDocument();
                this.adjustPositions();
                this.displayed = true;
            } else {
                this.leave();
                this.displayed = false;
            }
        }
    }, {
        key: "leave",
        value: function leave() {
            this.tooltip.remove();
        }
    }, {
        key: "adjustPositions",
        value: function adjustPositions() {
            var gap = this.gap;
            if (this.position === "top") {
                this.tooltip.style.top = "".concat(this.target.offsetTop - this.tooltip.offsetHeight - gap, "px");
                this.tooltip.style.left = "".concat(this.target.offsetLeft - this.tooltip.offsetWidth / 2 + this.target.offsetWidth / 2, "px");
            } else if (this.position === "bottom") {
                this.tooltip.style.top = "".concat(this.target.offsetTop + this.target.offsetHeight + gap, "px");
                this.tooltip.style.left = "".concat(this.target.offsetLeft - this.tooltip.offsetWidth / 2 + this.target.offsetWidth / 2, "px");
            } else if (this.position === "left") {
                this.tooltip.style.top = "".concat(this.target.offsetTop + this.target.offsetHeight / 2 - this.tooltip.offsetHeight / 2, "px");
                this.tooltip.style.left = "".concat(this.target.offsetLeft - this.tooltip.offsetWidth - gap, "px");
            } else if (this.position === "right") {
                this.tooltip.style.top = "".concat(this.target.offsetTop + this.target.offsetHeight / 2 - this.tooltip.offsetHeight / 2, "px");
                this.tooltip.style.left = "".concat(this.target.offsetLeft + this.target.offsetWidth + gap, "px");
            }
        }
    }, {
        key: "insertTooltipIntoDocument",
        value: function insertTooltipIntoDocument() {
            document.body.prepend(this.tooltip);
        }
    }, {
        key: "createTooltipHTMLStructure",
        value: function createTooltipHTMLStructure() {
            var tooltip = document.createElement("div");
            tooltip.classList.add("abc-tooltip", "abc-tooltip-p-".concat(this.position));
            tooltip.innerHTML = '\n      <div class="abc-tooltip-box"></div>\n      <div class="abc-tooltip-triangle-body">\n        <div class="abc-tooltip-triangle"></div>\n      </div>\n    ';
            if (this.html) {
                tooltip.firstElementChild.innerHTML = this.content;
            } else {
                tooltip.firstElementChild.textContent = this.content;
            }
            this.tooltip = tooltip;
        }
    } ]);
    return AbcTooltip;
}();