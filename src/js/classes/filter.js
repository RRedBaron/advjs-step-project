const form = document.getElementById('search-form');
form.addEventListener('input', e => {
  const filters = {}

  const formData = new FormData(form);

  for (let pair of formData.entries()) {
    filters[pair[0]] = pair[1];
  }
  card.filterCards(filters);
});

form.addEventListener('reset' , () => {
  card.resetFilters();
})

