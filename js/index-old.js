var url = new URL(window.location.href);
var params = url.searchParams;

const checkIfImageExists = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
    });
};

window.addEventListener('load', function () {
    if (params.has('code')) {
        var code = location.search;
        inpcode = code.substr(code.indexOf('=') + 1);
        const url = 'https://api.annict.com/oauth/token';
        const formData = new FormData();
        formData.append('client_id', 'VtT2W4KnbkGJySAKsPTn2srbP9n2Fjl5nB18x0ctviI');
        formData.append('client_secret', 'Yx7-SumbSha-DP9QYu1mDz5VFhB6b5ICJuUWp3KkWI4');
        formData.append('grant_type', 'authorization_code');
        formData.append('redirect_uri', 'https://192.168.1.6:5500/');
        formData.append('code', inpcode);
        {
            fetch(url, {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    console.log('error');
                }
                console.log('ok');
                return response.json();
            }).then((data) => {
                localStorage.setItem('token', data.access_token);
                window.location.replace("/?id=0")
            }).catch((error) => {
                console.log(error);
            });
        };
    } else {
        //localstorageにトークン存在確認
        if (localStorage.hasOwnProperty('token')) {
            if (localStorage.getItem('token') !== null) {
                //urlパラメータにid確認
                if (params.has('id')) {
                    //sessionStorageにannictデータ存在確認
                    if (sessionStorage.hasOwnProperty('annict_data')) {
                        if (sessionStorage.getItem('annict_data') !== null) {
                            var annictdata = JSON.parse(sessionStorage.getItem('annict_data'))
                            //パラメータ
                            var id = location.search;
                            inpid = id.substr(id.indexOf('=') + 1);
                            //imgが有効か
                            checkIfImageExists(annictdata.viewer.works.nodes[inpid].image.recommendedImageUrl)
                                .then((url) => {
                                    document.getElementById("img").src = annictdata.viewer.works.nodes[inpid].image.recommendedImageUrl;
                                })
                                .catch((url) => {
                                    document.getElementById("img").src = 'image/no_image.png';
                                });
                            //タイトル
                            document.getElementById("title").innerHTML = annictdata.viewer.works.nodes[inpid].title;
                            //エピソード
                            var annictdata_episodes = annictdata.viewer.works.nodes[inpid].episodes.nodes.filter((item) => item.viewerDidTrack !== true)
                            //エピソードがないときボタン非表示
                            const watch_epi_button = document.getElementById("watch_episode_button");
                            if (annictdata.viewer.works.nodes[inpid].noEpisodes == true) {
                                document.getElementById("top_episode_title").innerHTML = "エピソードが存在しません。";
                                watch_epi_button.style.display = "none";
                            } else if (annictdata_episodes[0] == null) {
                                document.getElementById("top_episode_title").innerHTML = "エピソードが登録されていません。";
                                watch_epi_button.style.display = "none";
                            } else {
                                document.getElementById("top_episode_number").innerHTML = "─" + annictdata_episodes[0].numberText + "─";
                                document.getElementById("top_episode_title").innerHTML = annictdata_episodes[0].title;
                            }


                            const spinner = document.getElementById('loading');
                            setTimeout(function () {
                                spinner.classList.add('loaded');
                            }, 1000)

                        } else {
                            var token = localStorage.getItem('token')
                            axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                                .then((annictdata) => {
                                    sessionStorage.setItem('annict_data', JSON.stringify(annictdata.data.data));
                                    console.log(annictdata.data.data);
                                    window.location.replace("/?id=0")
                                });
                        }
                    } else {
                        var token = localStorage.getItem('token')
                        axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                            .then((annictdata) => {
                                sessionStorage.setItem('annict_data', JSON.stringify(annictdata.data.data));
                                console.log(annictdata.data.data);
                                window.location.replace("/?id=0")
                            });
                    }
                } else {
                    var token = localStorage.getItem('token')
                    axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                        .then((annictdata) => {
                            sessionStorage.setItem('annict_data', JSON.stringify(annictdata.data.data));
                            window.location.replace("/?id=0")
                        });
                }
            } else {
                window.location.replace("https://annict.com/oauth/authorize?client_id=VtT2W4KnbkGJySAKsPTn2srbP9n2Fjl5nB18x0ctviI&redirect_uri=https%3A%2F%2F192.168.1.6%3A5500%2F&response_type=code&scope=read+write");
            }
        } else {
            window.location.replace("https://annict.com/oauth/authorize?client_id=VtT2W4KnbkGJySAKsPTn2srbP9n2Fjl5nB18x0ctviI&redirect_uri=https%3A%2F%2F192.168.1.6%3A5500%2F&response_type=code&scope=read+write");
        }
    }
});

function cleardata() {
    localStorage.clear();
}
function nextid() {
    var id = location.search;
    inpid = id.substr(id.indexOf('=') + 1);
    nextidn = Number(inpid) + 1
    window.location.replace("/?id=" + nextidn)
}
function id0() {
    window.location.replace("/?id=0")
}

function watch_episode(id) {
    document.getElementById("watch_button_msg").innerHTML = "記録中…";
    document.getElementById("tick").style.display = "none";
    var annictdata = JSON.parse(sessionStorage.getItem('annict_data'))
    var annictdata_episodes = annictdata.viewer.works.nodes[inpid].episodes.nodes.filter((item) => item.viewerDidTrack !== true)
    var annictdata_episodes_id = annictdata_episodes[id].id
    console.log(annictdata_episodes_id)
    var token = localStorage.getItem('token')
    axios.post("https://api.annict.com/graphql", { query: "mutation{createRecord(input:{episodeId:\"" + annictdata_episodes_id + "\",}){record{annictId,episode{title}}}}" }, { headers: { Authorization: "bearer " + token } },)
        .then(() => {
            document.getElementById("watch_button_msg").innerHTML = "記録しました！";
            axios.post("https://api.annict.com/graphql", { query: query }, { headers: { Authorization: "bearer " + token } },)
                .then((annictdata) => {
                    sessionStorage.setItem('annict_data', JSON.stringify(annictdata.data.data));
                });
        })
}