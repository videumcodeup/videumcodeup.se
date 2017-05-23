(() => {
  fetch("https://videum-codeup-github-repos.glitch.me").then(x => x.json()).then(repos => {
    document.querySelector(".github-repos-container").innerHTML = repos.reduce((string, repo) => {
      return `${string}<div class="repo"><a href="${repo.html_url}">${repo.name}</a></div>`;
    }, "");
  });
})();
