function annict_data(token, id) {
    if (token != null) {
        try {
            axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                .then((annictdata) => {
                    var annictdata_null = annictdata.data.data.viewer.libraryEntries.nodes.filter(function (elem) {
                        return elem.nextProgram === null;
                    });
                    annictdata = annictdata.data.data.viewer.libraryEntries.nodes.filter(function (elem) {
                        return elem.nextProgram !== null;
                    });
                    annictdata.sort((a, b) => {
                        if (a.nextProgram?.startedAt < b.nextProgram?.startedAt) return 1;
                        if (a.nextProgram?.startedAt > b.nextProgram?.startedAt) return -1;
                        return 0;
                    });
                    sessionStorage.setItem('annict_data', JSON.stringify(annictdata.concat(annictdata_null)));
                    sessionStorage.setItem('annict_data_null', JSON.stringify(annictdata_null));
                    window.location.replace(`/?id=${id}`)
                })
                .catch(() => {
                    episode_back.style.display = "none";
                    none_watch.style.display = "none";
                    no_token.style.display = "";
                    error_msg.style.display = "block";
                    logout_msg.style.display = "none";
                    localStorage.clear();
                });
        } catch {
            episode_back.style.display = "none";
            none_watch.style.display = "none";
            no_token.style.display = "";
            error_msg.style.display = "block";
            logout_msg.style.display = "none";
            localStorage.clear();
        }
    } else {
        localStorage.clear();
        window.location.replace("/");
    }
}