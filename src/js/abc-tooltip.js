// eslint-disable-next-line no-unused-vars
class AbcTooltip {
  constructor(args = {}, {
    target = null, content = null, html = false, position = 'top', event = 'hover', gap = 0,
  } = args) {
    if (!target) {
      const tooltips = document.querySelectorAll('[data-abc-tt-content]');

      tooltips.forEach((tooltip) => {
        const {
          abcTtContent: tooltipContent,
          abcTtHtml: tooltipIsHtml = true,
          abcTtPosition: tooltipPosition = 'top',
          abcTtEvent: tooltipEvent = 'hover',
          abcTtGap: tooltipGap = 0,
        } = tooltip.dataset;

        // eslint-disable-next-line no-new
        new AbcTooltip({
          target: tooltip,
          content: tooltipContent,
          html: tooltipIsHtml === 'true',
          position: tooltipPosition,
          event: tooltipEvent,
          gap: Number(tooltipGap),
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

    if (this.event === 'hover') {
      this.target.addEventListener('mouseenter', this.enter.bind(this));
      this.target.addEventListener('mouseleave', this.leave.bind(this));
    } else if (this.event === 'click') {
      this.target.addEventListener('click', this.enter.bind(this));
      this.displayed = false;
    }
  }

  enter() {
    if (this.event === 'hover') {
      this.insertTooltipIntoDocument();
      this.adjustPositions();
    } else if (this.event === 'click' && !this.displayed) {
      this.insertTooltipIntoDocument();
      this.adjustPositions();
      this.displayed = true;
    } else {
      this.leave();
      this.displayed = false;
    }
  }

  leave() {
    this.tooltip.remove();
  }

  adjustPositions() {
    const { gap } = this;

    if (this.position === 'top') {
      this.tooltip.style.top = `${this.target.offsetTop - this.tooltip.offsetHeight - gap}px`;
      this.tooltip.style.left = `${this.target.offsetLeft - (this.tooltip.offsetWidth / 2) + (this.target.offsetWidth / 2)}px`;
    } else if (this.position === 'bottom') {
      this.tooltip.style.top = `${this.target.offsetTop + this.target.offsetHeight + gap}px`;
      this.tooltip.style.left = `${this.target.offsetLeft - (this.tooltip.offsetWidth / 2) + (this.target.offsetWidth / 2)}px`;
    } else if (this.position === 'left') {
      this.tooltip.style.top = `${this.target.offsetTop + (this.target.offsetHeight / 2) - (this.tooltip.offsetHeight / 2)}px`;
      this.tooltip.style.left = `${this.target.offsetLeft - this.tooltip.offsetWidth - gap}px`;
    } else if (this.position === 'right') {
      this.tooltip.style.top = `${this.target.offsetTop + (this.target.offsetHeight / 2) - (this.tooltip.offsetHeight / 2)}px`;
      this.tooltip.style.left = `${this.target.offsetLeft + this.target.offsetWidth + gap}px`;
    }
  }

  insertTooltipIntoDocument() {
    document.body.prepend(this.tooltip);
  }

  createTooltipHTMLStructure() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('abc-tooltip', `abc-tooltip-p-${this.position}`);

    tooltip.innerHTML = `
      <div class="abc-tooltip-box"></div>
      <div class="abc-tooltip-triangle-body">
        <div class="abc-tooltip-triangle"></div>
      </div>
    `;

    if (this.html) {
      tooltip.firstElementChild.innerHTML = this.content;
    } else {
      tooltip.firstElementChild.textContent = this.content;
    }

    this.tooltip = tooltip;
  }
}
