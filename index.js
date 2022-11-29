const form = document.querySelector('form');
const titleInput = form.elements['title'];
const linkInput = form.elements['link'];
const descriptionInput = form.elements['description'];
const categoryInput = form.elements['category'];

const bookmarksWrapper = document.querySelector('.songs-wrapper');
const bookmarkDetails = document.querySelector('.bookmark-details');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookmark = {
    title: titleInput.value,
    link: linkInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };

  let newBookmarks = [];
  const allBookmarks = localStorage.getItem('bookmarks');
  if (allBookmarks) {
    newBookmarks = JSON.parse(allBookmarks);
    newBookmarks.push(bookmark);
  } else {
    newBookmarks.push(bookmark);
  }
  localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  displayBookmarks();
});

const displayBookmarks = () => {
  let bookmarksTemplate = '';
  const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  if (allBookmarks.length < 1) {
    bookmarksWrapper.innerHTML = '<h3>No Bookmarks Yet</h3>';
  } else {
    allBookmarks?.forEach((bookmark, index) => {
      bookmarksTemplate += `
      <div class="bookmark" onclick="displayBookmarkDetails(${index})" id=bookmark-${index}>
          <div class="avatar-names">
            <div class="avatar">
              ${bookmark.title.charAt(0)}
            </div>
            <div class="title-description">
              <p class="title">${bookmark.title}</p>
              <p class="description">${bookmark.description}</p>
            </div>
          </div>
          <div class="actions" onclick="deleteBookmark(${index})">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>`;
    });
    bookmarksWrapper.innerHTML = bookmarksTemplate;
    updateCounter();
    form.reset();
  }
};

const deleteBookmark = (index) => {
  const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const newBookmarks = allBookmarks.filter((bookmark, i) => i != index);
  localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  displayBookmarks();
  updateCounter();
};

const displayBookmarkDetails = (index) => {
  // Remove Active class to all other elements
  const bookmarks = document.querySelectorAll('.bookmark');
  bookmarks?.forEach((bookmark) => {
    bookmark.classList.remove('active');
  });

  // Add active class to current contact

  document.getElementById(`bookmark-${index}`).classList.add('active');

  // Display Contact details
  const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const bookmarkToDisplay = allBookmarks[index];
  const { title, link, description, category } = bookmarkToDisplay;
  bookmarkDetails.innerHTML = `
  <div class="bookmark-item">
        <span> <i class="fa-solid fa-user"></i></span>
        <p>${title}</p>
      </div>
      <div class="bookmark-item">
        <span><i class="fa fa-link" aria-hidden="true"></i></span>
        <p class ="link">${link}</p>
      </div>
      <div class="bookmark-item">
      <i class="fa-solid fa-angles-right"></i>
        <p>${description}</p>
      </div>
      <div class="bookmark-item">
      <i class="fa-sharp fa-solid fa-object-ungroup"></i>
        <p>${category}</p>
      </div>`;
};

const updateCounter = () => {
  const allBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  document.getElementById('counter').textContent = `${allBookmarks?.length}`;
};