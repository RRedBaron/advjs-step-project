// всі константи вже визначені у файлі main.js
// const searchInput = document.querySelector("#search");
// const urgencySelect = document.querySelector("#urgency-select");
// const statusSelect = document.querySelector("#status-select");
// const clearFiltersButton = document.querySelector("#clear-filters-button");


class CardFilter extends CardRender {
  async filterCards() {
    const searchInputValue = searchInput.value.toLowerCase();
    document.getElementById("card-wrapper").innerHTML = ""; // а це обов'язково прописувати чи це можна успадкувати?
    const res = await this.getCardsData(); // аналогічне питання як у рядку 11
    res.forEach(card => {
      if (this.hasMatchingSymbols(card, searchInputValue)) {
        this.renderSingleCard(card);
      }
    });
  }

  hasMatchingSymbols(card, searchInputValue) {
    console.log(card);
    //поки для перевірки зробив на прикладі fullName але це не зовсім правильно, бо треба по будь якому символу в отриманому json
    const cardSymbols = card.fullName.toLowerCase();
    return cardSymbols.includes(searchInputValue);
  }
}

searchInput.addEventListener("input", async () => {
  const searchInputValue = searchInput.value.toLowerCase();
  console.log(searchInputValue);

  await cardFilter.filterCards(searchInputValue);
});

urgencySelect.addEventListener("change", async () => {
  const selectUrgencyValue = urgencySelect.value.toLowerCase();
  console.log(selectUrgencyValue);

  await cardFilter.filterCards(selectUrgencyValue);
})

statusSelect.addEventListener("change", async () => {
  const selectStatusValue = statusSelect.value.toLowerCase();
  console.log(selectStatusValue);

  await cardFilter.filterCards(selectStatusValue);
})

const cardFilter = new CardFilter(`https://ajax.test-danit.com/api/v2/cards/`, token);

// urgencySelect.addEventListener("change", () => {
// displayCards();
// })

// statusSelect.addEventListener("change", () => {
// displayCards();
// })

// clearFiltersButton.addEventListener("click", () => {
// Clear all filters and reset the view
// card.clearFilters();
// });
