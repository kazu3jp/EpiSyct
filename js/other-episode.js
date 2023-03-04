function other_episode(epi_num,annictdata_episodes_data) {
    var other_episode_card = document.getElementById('other_episode_card')
    for (i = 1; i < epi_num; i++) {
        episode_title = (annictdata_episodes_data[i].title == null ) ? "" : annictdata_episodes_data[i].title
        var in_other_episode = `<ul class="other_episode_list">
        <li class="list_episode_number">─${annictdata_episodes_data[i].numberText}─</li>
        <li class="list_episode_title">${episode_title}</li>
        <div class="list_episode_button">
            <button class="watch_episode_list_button" id="watch_episode_list_button"
                onclick="watch_multiple_episode(${i}); disabled = true;">
                <svg class="send-up" id="send-up" viewBox="0 0 15 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                    <path d="M7.5 1.5l4 4m-4-4l-4 4m4-4V12M1 13.5h13" stroke="currentColor"></path>
                </svg>
                <span class="watch_button_msg" id="watch_button_msg_${i}">ここまで記録する</span>
            </button>
        </div>
    </ul>
    <hr size="1px" width="90%" color="#bbb">`
        other_episode_card.insertAdjacentHTML('beforeend', in_other_episode);
    }
}