document.addEventListener('DOMContentLoaded', function () {
  const select = document.getElementById('category-select');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const dropdownLinks = document.querySelectorAll('.nav-links [data-filter]');

  function cardCategories(card) {
    // prefer data-categories, fall back to data-category for older markup
    const raw = card.dataset.categories ?? card.dataset.category ?? 'all';
    // split on commas or spaces, normalize to lowercase and trim
    return raw.split(/[\s,]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
  }

  function filter(category) {
    const cat = (category || 'all').toLowerCase();
    productCards.forEach(card => {
      const cats = cardCategories(card);
      if (cat === 'all' || cats.includes(cat)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    if (select) select.value = cat;
  }

  if (select) {
    select.addEventListener('change', () => filter(select.value));
  }

  dropdownLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = a.dataset.filter || 'all';
      filter(cat);
      a.blur();
    });
  });

  // apply category from URL (e.g. products.html?category=slice)
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category');
  if (initialCategory) filter(initialCategory);
});