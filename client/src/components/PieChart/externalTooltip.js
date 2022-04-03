const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector('.tooltipEl');

  if (!tooltipEl) {
    // create CONTAINER div
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltipEl';
  }

  return tooltipEl;
}

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;

  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    const chartEl = document.getElementsByClassName('doughnutCnt')[0];
    chartEl.addEventListener('mouseleave', () => {
      tooltipEl.style.visibility = 'hidden';
    });
    return;
  } else {
    tooltipEl.style.visibility = 'visible';
  }

  // create CHILDREN elements
  if (tooltip.dataPoints) {
    // Remove old children
    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    const selectedLang = tooltip.dataPoints[0].label;

    // create SPAN for the number of lines
    const span = document.createElement('span');
    span.innerText = tooltip.dataPoints[0].formattedValue + ' bytes';
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