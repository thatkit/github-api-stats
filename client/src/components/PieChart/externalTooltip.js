const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {

    // create CONTAINER div
    tooltipEl = document.createElement('div');

    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '4px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
  }

  return tooltipEl;
}

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;

  console.log(chart)
  // console.log(tooltip)

  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // create CHILDREN elements
  if (tooltip.dataPoints) {
    // Remove old children
    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    // create HEADING for the language name 
    const h3 = document.createElement('h3');
    h3.innerText = tooltip.dataPoints[0].label;
    tooltipEl.appendChild(h3);

    // create SPAN for the number of lines
    const span = document.createElement('h3');
    span.innerText = tooltip.dataPoints[0].parsed + ' lines';
    tooltipEl.appendChild(span);

    // create UNORDERED LIST for the related repos
    const ul = document.createElement('ul');
    ul.className = 'repos';

    // console.log(tooltip.dataPoints[0].dataset.repos)
    tooltip.dataPoints[0].dataset.repos
      .filter(repo => Object.keys(repo.langs).includes(tooltip.dataPoints[0].label))
      .forEach(repo => {
        const li = document.createElement('li');
        
        li.innerHTML = `
          <a href='${repo.url}' target='_blank'>${repo.name}</a>
        `;
        
        ul.appendChild(li);
      });
    tooltipEl.appendChild(ul);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

  chart.canvas.parentNode.appendChild(tooltipEl);
}