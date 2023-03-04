function annict_data(token, id) {
    if (token != null) {
        try {
            axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                .then((annictdata) => {
                    sessionStorage.setItem('annict_data', JSON.stringify(annictdata.data.data));
                    window.location.replace(`/?id=${id}`)
                })
                .catch(() => {
                    episode_back.style.display = "none";
                    none_watch.style.display = "none";
                    no_token.style.display = "";
                    error_msg.style.display = "block";
                    logout_msg.style.display = "none";
                });
        } catch {
            episode_back.style.display = "none";
            none_watch.style.display = "none";
            no_token.style.display = "";
            error_msg.style.display = "block";
            logout_msg.style.display = "none";
        }
    } else {
        window.location.replace("/");
    }
}