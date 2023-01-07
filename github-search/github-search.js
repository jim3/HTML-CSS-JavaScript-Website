const baseURL = "https://api.github.com";
const form = document.querySelector("#repos-form");
const usernameInput = document.querySelector("#github-username");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  githubSearch(username);
});

const githubSearch = (username) => {
  fetch(`${baseURL}/users/${username}/repos`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const repoList = document.querySelector("#repos-list");
      data.forEach((repo) => {
        repoList.insertAdjacentHTML(
          "beforeend",
          `<li><a href="${repo.html_url}" target="_blank">
        <h2>${repo.full_name}</h2><p>${repo.description}</p></a></li>`
        );
      });
    });
};
