var id = location.search;
inpid = id.substring(id.indexOf('=') + 1);
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
const spinner = document.getElementById('loading');

window.addEventListener('load', function () {
    if (params.has('id')) {
        if (sessionStorage.hasOwnProperty('annict_data')) {
            if (sessionStorage.getItem('annict_data') !== null) {
                no_token.style.display = "none";
                var annictdata = JSON.parse(sessionStorage.getItem('annict_data'));
                //見てるアニメがない場合
                if (!annictdata.length) {
                    episode_back.style.display = "none";
                } else {
                    none_watch.style.display = "none";
                    //メニュー
                    other_works(annictdata);
                    //imgが有効か
                    checkIfImageExists(annictdata[inpid].work.image.facebookOgImageUrl)
                        .then((url) => {
                            document.getElementById("img").src = url;
                        })
                        .catch(() => {
                            document.getElementById("img").src = 'image/no_image.png';
                        });
                    //タイトル
                    document.getElementById("title").innerHTML = annictdata[inpid].work.title;
                    //エピソード
                    var annictdata_episodes = annictdata[inpid].work.episodes.nodes.filter((item) => item.viewerDidTrack !== true);
                    //エピソードがないときボタン非表示
                    const watch_epi_button = document.getElementById("watch_episode_button");
                    if (annictdata[inpid].work.noEpisodes == true) {
                        document.getElementById("top_episode_title").innerHTML = "エピソードが存在しません。";
                        other_episode_card_open.style.display = "none";
                        right_box.style.display = "none";
                        watch_epi_button.style.display = "none";
                        watch_work_button.style.display = "";
                    } else if (annictdata_episodes[0] == null) {
                        document.getElementById("top_episode_title").innerHTML = "エピソードが登録されていません。";
                        other_episode_card_open.style.display = "none";
                        right_box.style.display = "none";
                        watch_epi_button.style.display = "none";
                        watch_work_button.style.display = "";
                    } else { //エピソードありの処理
                        document.getElementById("top_episode_number").innerHTML = "─" + annictdata_episodes[0].numberText + "─";
                        document.getElementById("top_episode_title").innerHTML = (annictdata_episodes[0].title == null) ? "" : annictdata_episodes[0].title;
                        document.getElementById("top_episode_channel").innerHTML = (annictdata[inpid].nextProgram == null) ? "" : annictdata[inpid].nextProgram.channel.name;
                        //放送,配信時間
                        const annictDateTime = new Date(annictdata[inpid].nextProgram?.startedAt)
                        const japanDateTime = annictDateTime.toLocaleString('ja-JP', {
                            timeZone: 'Asia/Tokyo',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        var top_episode_startedAt = (annictdata[inpid].nextProgram == null) ? "" : japanDateTime;
                        document.getElementById("top_episode_time").innerHTML = (top_episode_startedAt == null) ? "" : top_episode_startedAt.toLocaleString();
                        const currentUTCDate = new Date();
                        var top_episode_startedAt_info_time = (annictdata[inpid].nextProgram == null) ? "" : ((annictDateTime.getFullYear() * 360) + (annictDateTime.getMonth() * 30) + annictDateTime.getDate()) - ((currentUTCDate.getFullYear() * 360) + (currentUTCDate.getMonth() * 30) + currentUTCDate.getDate());
                        var tomorrow = `<dev style="margin: 0 5px; padding: 0 5px; background-color: rgb(6, 182, 212); border-radius: 5px;">明日</dev>`
                        var today = `<dev style="margin: 0 5px; padding: 0 5px; background-color: rgb(220, 53, 69); border-radius: 5px;">今日</dev>`
                        var end = `<dev style="margin: 0 5px; padding: 0 5px; background-color: rgb(25, 135, 84); border-radius: 5px;">終了</dev>`
                        if (top_episode_startedAt_info_time > 1) {
                            var top_episode_startedAt_info = ""
                        } else if (top_episode_startedAt_info_time === 1) {
                            if (annictDateTime.getHours() >= 5) {
                                var top_episode_startedAt_info = tomorrow
                            } else if (annictDateTime.getHours() <= 5) {
                                var top_episode_startedAt_info = today
                            }
                        } else if (top_episode_startedAt_info_time === 0) {
                            var top_episode_startedAt_info = today
                        } else if (top_episode_startedAt_info_time < 0) {
                            var top_episode_startedAt_info = end
                        } else {
                            var top_episode_startedAt_info = ""
                        };
                        var top_episode_info = document.getElementById('top_episode_info')
                        top_episode_info.insertAdjacentHTML('beforeend', top_episode_startedAt_info);

                        if (annictdata_episodes.length == 1) {
                            other_episode_card_open.style.display = "none";
                            other_episode_card.style.display = "none";
                            right_box.style.display = "none";
                        } else {
                            other_episode(annictdata_episodes.length, annictdata_episodes);
                        }
                    }
                }

                setTimeout(function () {
                    spinner.classList.add('loaded');
                }, 1000)
            } else {
                annict_data(localStorage.getItem('token'), 0)
            }
        } else {
            annict_data(localStorage.getItem('token'), 0)
        }
    } else {
        if (localStorage.getItem('token') !== null) {
            annict_data(localStorage.getItem('token'), 0)
        } else {
            episode_back.style.display = "none";
            none_watch.style.display = "none";
            no_token.style.display = "";
            header.style.display = "none";
        }
    }
    setTimeout(function () {
        spinner.classList.add('loaded');
    }, 1000)
});

function token_fome_button() {
    var token_fome = document.getElementById('token-fome-input')
    localStorage.setItem('token', token_fome.value.trim());
    annict_data(localStorage.getItem('token'), 0)
}

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    episode_back.style.display = "none";
    none_watch.style.display = "none";
    no_token.style.display = "";
    logout_msg.style.display = "block";
    header.style.display = "none";
}

function watch_episode(id) {
    document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録中…";
    var annictdata = JSON.parse(sessionStorage.getItem('annict_data'))
    var annictdata_episodes = annictdata[inpid].work.episodes.nodes.filter((item) => item.viewerDidTrack !== true)
    var annictdata_episodes_id = annictdata_episodes[id].id
    var token = localStorage.getItem('token')
    try {
        axios.post("https://api.annict.com/graphql", { query: `mutation{createRecord(input:{episodeId:"${annictdata_episodes_id}",}){record{annictId,episode{title}}}}` }, { headers: { Authorization: "bearer " + token } },)
            .then(() => {
                document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録しました！";
                annict_data(localStorage.getItem('token'), inpid)
            })
            .catch(() => {
                document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録できませんでした…";
            })
    } catch {
        document.getElementById(`watch_button_msg_${id}`).innerHTML = "予期せぬエラーです…";
    }
}

function watch_multiple_episode(id) {
    document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録中…";
    var annictdata = JSON.parse(sessionStorage.getItem('annict_data'))
    var annictdata_episodes = annictdata[inpid].work.episodes.nodes.filter((item) => item.viewerDidTrack !== true)
    var token = localStorage.getItem('token')
    var plusquery = ""
    for (i = 0; i < id + 1; i++) {
        let addquery = `e${i}:createRecord(input:{episodeId:"${annictdata_episodes[i].id}",}){record{annictId}}`;
        (i == 0) ? plusquery = `mutation{` + addquery : plusquery = plusquery + addquery;
    }
    var endquery = plusquery + `}`
    try {
        axios.post("https://api.annict.com/graphql", { query: endquery }, { headers: { Authorization: "bearer " + token } },)
            .then(() => {
                document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録しました！";
                annict_data(localStorage.getItem('token'), inpid)
            })
            .catch(() => {
                document.getElementById(`watch_button_msg_${id}`).innerHTML = "記録できませんでした…";
            })
    } catch {
        document.getElementById(`watch_button_msg_${id}`).innerHTML = "予期せぬエラーです…";
    }
}

function watch_work() {
    document.getElementById("watch_work_button_msg").innerHTML = "変更中…";
    var annictdata = JSON.parse(sessionStorage.getItem('annict_data'))
    var token = localStorage.getItem('token')
    try {
        axios.post("https://api.annict.com/graphql", { query: `mutation{updateStatus(input: {workId: "${annictdata[inpid].work.id}",state: WATCHED}) {work{annictId}}}` }, { headers: { Authorization: "bearer " + token } },)
            .then(() => {
                document.getElementById("watch_work_button_msg").innerHTML = "変更しました！";
                annict_data(localStorage.getItem('token'), 0)
            })
            .catch(() => {
                document.getElementById("watch_work_button_msg").innerHTML = "変更できませんでした…";
            })
    } catch {
        document.getElementById("watch_work_button_msg").innerHTML = "予期せぬエラーです…";
    }
}

$(function () {
    $('.other_episode_card_open').click(function () {
        $(this).prev('.other_episode_card').slideToggle();
        $(this).toggleClass("open");
    });
});

$('.menu').on('click', function () {
    $('.menu_line').toggleClass('active');
    $('.menu_nav').fadeToggle();
    var body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('no_scroll')) {
        // スクロール開放
        body.style.top = '';
        body.classList.remove('no_scroll');
        window.scrollTo(0, scrollTop);
    } else {
        // スクロール禁止
        scrollTop = window.scrollY;
        body.style.top = (scrollTop * -1) + 'px';
        body.classList.add('no_scroll');
    }
    if ($('.logout_button').css('display') == 'none') {
        $('.logout_button').css('display', '')
    } else {
        $('.logout_button').css('display', 'none')
    }
});