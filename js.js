const userLink = document.getElementById('myInput');
const commentInput = document.getElementById('commentInput');
const linksContainer = document.getElementById('links-container');
let links = JSON.parse(localStorage.getItem('links')) || [];
//SAVE LINKS
function saveLinks() {
  localStorage.setItem('links', JSON.stringify(links));
}
//DOMAIN URL
function getDomain(url) {
  try {
    const obj = new URL(url);
    return obj.hostname; // вернёт например "youtube.com"
  } catch {
    return url; // если URL некорректный, оставляем как есть
  }
}
//CREATE LINK
function createLink(linkObj, index) {
  const wrapper = document.createElement('div');
  const link = document.createElement('a');
  link.textContent = getDomain(linkObj.url);
  link.href = linkObj.url;
  link.target = '_blank';
  link.style.display = 'inline-block';
  wrapper.style.marginTop = '0.5rem';
  //COMMENT STYLE
  const comment = document.createElement('span');
  comment.textContent = ` — ${linkObj.comment || ''}`;
  comment.style.color = 'blue';
  //DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    links.splice(index, 1);
    saveLinks();
    renderLinks();
  });
  wrapper.appendChild(link);
  wrapper.appendChild(comment);
  wrapper.appendChild(deleteButton);
  linksContainer.appendChild(wrapper);
}
//RENDER LINKS IN WINDOW
function renderLinks() {
  linksContainer.innerHTML = '';
  links.forEach((linkObj, index) => {
    createLink(linkObj, index);
  });
}
//ADD LINK AND COMMENT
function addLink() {
  if (userLink.value.trim() !== '') {
    links.push({
      url: userLink.value.trim(),
      comment: commentInput.value.trim(),
    });
    saveLinks();
    renderLinks();
    userLink.value = '';
    commentInput.value = '';
  }
}

userLink.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addLink();
});

commentInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addLink();
});
//RENDER
renderLinks();
