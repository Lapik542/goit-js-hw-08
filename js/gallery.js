const galleryContainer = document.querySelector('.gallery');

function createGalleryItem({ preview, original, description }) {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery-item');

  const link = document.createElement('a');
  link.classList.add('gallery-link');
  link.href = original;

  const image = document.createElement('img');
  image.classList.add('gallery-image');
  image.src = preview;
  image.setAttribute('data-source', original);
  image.alt = description;

  link.appendChild(image);
  listItem.appendChild(link);

  return listItem;
}

function renderGallery(images) {
  const galleryItems = images.map(createGalleryItem);
  galleryContainer.append(...galleryItems);
}

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const largeImageURL = event.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  window.addEventListener('keydown', closeModalOnEscape);
}

function closeModalOnEscape(event) {
  if (event.key === 'Escape') {
    basicLightbox.close();
    window.removeEventListener('keydown', closeModalOnEscape);
  }
}

galleryContainer.addEventListener('click', openModal);

renderGallery(images);
