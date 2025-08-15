const userLink = document.getElementById('myInput');
const linksContainer = document.getElementById('links-container');
let links = JSON.parse(localStorage.getItem('links')) || [];
function saveLinks() {
  localStorage.setItem('links', JSON.stringify(links));
}
function getDomain(url) {
  try {
    const obj = new URL(url);
    return obj.hostname; // вернёт например "youtube.com"
  } catch {
    return url; // если URL некорректный, оставляем как есть
  }
}
function createLink(text, index) {
  const wrapper = document.createElement('div');
  const link = document.createElement('a');
  link.textContent = getDomain(text);
  link.href = text;
  link.target = '_blank';
  link.style.display = 'inline-block';
  link.style.marginRight = '10px';
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.style.cursor = 'pointer';
  deleteButton.addEventListener('click', () => {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
  });
  wrapper.appendChild(link);
  wrapper.appendChild(deleteButton);
  linksContainer.appendChild(wrapper);
}

function renderLinks() {
  linksContainer.innerHTML = '';
  links.forEach((link, index) => {
    createLink(link, index);
  });
}

userLink.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && userLink.value.trim() !== '') {
    links.push(userLink.value.trim());
    saveLinks();
    renderLinks();
    userLink.value = '';
  }
});
renderLinks();
