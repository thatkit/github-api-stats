const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    // create CONTAINER div
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltipEl';
  }

  return tooltipEl;
}

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;

  // console.log(chart) // # for testing
  // console.log(tooltip) // # for testing

  const tooltipEl = getOrCreateTooltip(chart);

  // // Hide if no tooltip
  // if (tooltip.opacity === 0) {
  //   tooltipEl.style.opacity = 0;
  //   return;
  // } // # was needed when I wanted to make tooltip disappear when not hovered

  // create CHILDREN elements
  if (tooltip.dataPoints) {
    // Remove old children
    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    const selectedLang = tooltip.dataPoints[0].label;

    // create SPAN for the number of lines
    const span = document.createElement('span');
    span.innerText = tooltip.dataPoints[0].formattedValue + ' lines';
    tooltipEl.appendChild(span);

    // create HEADING for the language name 
    const h3 = document.createElement('h3');
    h3.innerText = selectedLang;
    tooltipEl.appendChild(h3);

    // create UNORDERED LIST for the related repos
    const ul = document.createElement('ul');
    ul.className = 'repos';

    // console.log(tooltip.dataPoints[0].dataset.repos)
    tooltip.dataPoints[0].dataset.repos
      .filter(repo => Object.keys(repo.langs).includes(selectedLang))
      .sort((a, b) => b.langs[selectedLang] - a.langs[selectedLang])
      .forEach(({ githubUrl, name }) => {
        const li = document.createElement('li');
        
        li.innerHTML = `<a href='${githubUrl}' target='_blank'>${name}</a>`;
        li.style.backgroundColor = tooltip.dataPoints[0].element.options.backgroundColor;
        
        ul.appendChild(li);
      });
      
    tooltipEl.appendChild(ul);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.font = tooltip.options.bodyFont.string;

  chart.canvas.parentNode.appendChild(tooltipEl);
}