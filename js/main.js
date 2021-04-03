const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Search states
const searchStates = async searchText => {
  const res = await fetch('https://github.com/mmv-dev/js-indianstatelookup/blob/main/data/ind_states.json');
  const states = await res.json();

  // Get matches to current text input

  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerText = ''
  }

  outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => `
    <div class="card card-body mb-1">
      <h4>
        ${match.name} (${match.abbr}) <span
        class="text-primary">${match.capital}</span>
      </h4>
      <small>Lat: ${match.lat} / Long: ${match.lng}</small>
    </div>
    `
    ).join('');

    matchList.innerHTML = html;
  }
}

search.addEventListener('input', () => searchStates(search.value));
