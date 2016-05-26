$(function () {

    var Controller = Backbone.Router.extend({
        routes: {
            "": "game", // Пустой hash-тэг
            "!/": "game", // Начальная страница
            "!/rules": "rules", // Блок удачи
            "!/records": "records" // Блок ошибки
        },

        showPage: function (page) {
            $(".block").hide(); // Прячем все блоки
            $("#" + page).show(); // Показываем нужный блок
        },

        game: function () {
            this.showPage("game");
        },

        rules: function () {
            this.showPage("rules");
        },

        records: function () {
            this.showPage("records");
        }
    });

    var controller = new Controller(); // Создаём контроллер

    Backbone.history.start();  // Запускаем HTML5 History push

});
