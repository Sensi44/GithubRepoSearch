// class Search{
//     constructor(view) {
//         this.view = view;
//         this.view.searchInput.addEventListener('keyup', this.searchUsers.bind(this));
//     }
//
//     async searchUsers() {
//         return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`)
//             .then((res) => {
//                 if (res.ok) {
//
//                     res.json().then(res => {
//                         console.log(res);
//                         for (let repo of res.items) {;
//                             console.log(repo)
//                             this.createResult(repo.id);
//                         }
//                     })
//                 }
//
//
//                 else {
//                     // обработка ошибки
//                 }
//             })
//     }
//
//     createResult(repo) {
//         let mainListElement = document.createElement('li');
//         mainListElement.classList.add('user-list-item');
//         mainListElement.innerText = repo;
//         this.view.usersList.append(mainListElement);
//     }
//
//
// }