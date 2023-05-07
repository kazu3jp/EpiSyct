function other_works(annictdata) {
    var menu_box_list = document.getElementById('menu_box_list')
    var maxwork = annictdata.length;
    for (i = 0; i < maxwork; i++) {
        var in_menu_box_list = `<li class="menu_item"><a href="/?id=${i}">${annictdata[i].work.title}</a></li>`
        menu_box_list.insertAdjacentHTML('beforeend', in_menu_box_list);
    }
}