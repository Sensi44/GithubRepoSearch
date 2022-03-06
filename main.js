const debounce = (fn, debounceTime) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(()=> {
            fn.apply(this, args);
        }, debounceTime)
    }
};



class View {
    constructor() {
        this.app = document.getElementById('app');
        this.search = this.createElement('div', 'search');

        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Search Repositories';

        this.searchLine = this.createElement('div', 'search-line');
        this.searchInput = this.createElement('input', 'search-input');
        this.searchCounter = this.createElement('span', 'counter');
        this.searchLine.append(this.searchInput);
        this.searchLine.append(this.searchCounter);

        this.usersWrapper = this.createElement('div', 'users-wrapper');
        this.usersList = this.createElement('ul', 'users')
        this.usersWrapper.append(this.usersList);

        this.searchResult = this.createElement('div', 'search-result');
        this.searchResult.append(this.usersWrapper);

        this.main = this.createElement('div', 'main');

        this.app.append(this.title);
        this.app.append(this.search);
        this.search.append(this.searchLine);
        this.search.append(this.searchResult);
        this.app.append(this.main);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass);
        }
        return element
    }

    clearResult(){
        let list = document.querySelectorAll('.user-list-item');
        if (list.length === 0) return
        this.results = [];
        console.log(list);
        for (let li of list) {
            li.remove();
        }
    }




    createSearchResult(repo, results, id) {
        let mainListElement = document.createElement('li');
        mainListElement.classList.add('user-list-item');
        mainListElement.innerText = repo;
        mainListElement.id = id;
        this.usersList.append(mainListElement);
        let list = document.querySelectorAll('.user-list-item');
        mainListElement.addEventListener('click', (e) => {
            for (let li of list) {
                for (let res of results) {
                    if (e.target === li && +li.id === res.id) {
                        console.log(res)
                        this.createResult(res);
                        this.searchInput.value = '';
                    }
                }
            }
        })

    }


    createResult(res) {
        let result = this.createElement('div', `main-result`);
        let title = this.createElement('span', `main-title`);
        title.innerText = `Name:  ${res.name}`;
        let author = this.createElement('span', `main-author`);
        author.innerText = `Owner: ${res.owner.login}`;
        let stars = this.createElement('span', `main-stars`);
        stars.innerText = `Stars: ${res.stargazers_count}`;
        let link = this.createElement('a', `main-link`);
        link.href = res.clone_url;
        link.innerText = `Ссылка на репозиторий`;
        link.target = "target_blank"
        let close = this.createElement('div', `main-delete`);
        close.innerText = 'X'
        close.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
        result.append(title);
        result.append(author);
        result.append(stars);
        result.append(close);
        result.append(link);
        this.main.append(result);
    }
}





class Search{
    constructor(view) {
        this.view = view;
        this.view.searchInput.addEventListener('keyup', debounce(this.searchUsers.bind(this), 300));
        this.view.results = [];
    }

    async searchUsers() {
        this.view.clearResult();
        if (+this.view.searchInput.value === 0) return;
        return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}&per_page=5`)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(res => {
                //console.log(res);

                for (let repo of res.items) {
                   // console.log(repo);
                    this.view.createSearchResult(repo.name, this.view.results, repo.id);
                    this.view.results.push(repo);

                    //console.log(this.view.results)
                }

            })
            .catch(err => console.log(err));
    };

}

new Search(new View());











