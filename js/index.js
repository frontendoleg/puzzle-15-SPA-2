$(function () {

    var Controller = Backbone.Router.extend({
        routes: {
            "": "game", // ������ hash-���
            "!/": "game", // ��������� ��������
            "!/rules": "rules", // ���� �����
            "!/records": "records" // ���� ������
        },

        showPage: function (page) {
            $(".block").hide(); // ������ ��� �����
            $("#" + page).show(); // ���������� ������ ����
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

    var controller = new Controller(); // ������ ����������

    Backbone.history.start();  // ��������� HTML5 History push

});
