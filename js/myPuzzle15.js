var arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
function getNull(){	//функция возвращает координату пустой клетки
	for (var yi = 0;  yi < 4; yi++) {
		for (var xj = 0; xj < 4; xj++) {
			if (arr[yi][xj] === 0) {
				return{"x":xj,"y":yi};
			}
		}
	}
}


function init() {
	console.time("draw");
	var fieldSize = 40; // vmin - размер игрового поля ///////////////////////////////  было 80
	var boneSize = 10;  // размер костяшки vmin /////////////////////////////////////   было 20

	makeGameField(fieldSize); // создаем игровое поле///////////////////////////////////////////////

	var field = new Game15(); 	// создаем объект пятнашек

	field.draw(boneSize); // ------- рисуем наши пятнашки на экране --------------
	field.mix(100); // перемешиваем

	function eventMouse(x,y){ // функция действия при кликах мыши
		field.move(x,y,true); // третий аргумент - нужно увеличивать счетчик ходов
		if(field.victory().res){
			alert("You win in "+field.victory().clicks+"  steps!"); // alert принимает только один аргумент
		}
	}

	function eventKey(x,y){ // функция действия при нажатии клавиш
		// нужно переместить подходящую костяшку, если это возможно
		var xNull = getNull().x;
		var yNull = getNull().y;
		var xBone = x+xNull, yBone = y+yNull; // координаты клетки кандидата
		if((xBone >= 0 && xBone < 4) && (yBone >= 0 && yBone < 4)){
			// костяшку сдвинуть можно
			field.move(xBone,yBone, true); // третий аргумент - нужно увеличивать счетчик ходов
			if(field.victory().res){
				alert("You win in "+field.victory().clicks+"  steps!"); // alert принимает только один аргумент
			}

		}
	}

	$(function(){ // обработчик кликов мыши
		var fieldSpace = $('#fff');
		fieldSpace.click(function(e){
			e.preventDefault(); // preventDefault
			e.stopPropagation(); // stopPropagation
			var br = this.getBoundingClientRect(); // br - это область клиента, на которую произвели клик, то есть игровое поле
			var myField = br.right - br.left; // это ширина игрового поля в пикселах
			var myBone = Math.floor(myField/4); // это размер костяшки в пикселах. Мы знаем, что игровое поле 80vmin а костяшка 20vmin
			var x = ( e.pageX - fieldSpace.offset().left) / myBone | 0; // координата костяшки в пределах 0-3
			var y = ( e.pageY - fieldSpace.offset().top) / myBone | 0; // координата костяшки в пределах 0-3
			eventMouse(x,y); // вызов функции действия

		});
	});

	$(function(){ // обработчик клавиатуры
		var body = $('body');
		body.keydown(function(e){
			e.preventDefault(); // preventDefault
			e.stopPropagation(); // stopPropagation
			switch (e.which) {
				case 37 : eventKey(1,0);break; // хотим сместить костяшку с правой позиции (+1) горизонтали и на 0 по вертикали
				case 39 : eventKey(-1,0);break; // хотим сместить костяшку с левой позиции (-1) по горизонтали
				case 38 : eventKey(0,1);break; // хотим сместит сверху по вертикали
				case 40 : eventKey(0,-1); // хотим сместить снизу по вертикали
			}
		});

	});

	$(function(){ // обработчик нажатия клавиши New Game
		var newGameButton = $('#newGameButton');
		newGameButton.click(function(){
			console.log ("You pressed NewGame");
			field.mix(100);
			placeShowResult.innerHTML = 'Your steps - ' + field.showClicks(); // обновляем отображение счетчика
		});

	});

} // the end of the init function


function Game15(){
	var cellView = null;
	var numView = null;

	var clicks = 0;
	var placeShowResult = document.getElementById('placeShowResult');
	// метод, рисующий наши пятнашки на экране
	this.draw = function(boneSize) {
		// console.log('arr',arr);
				$("#fff").empty(); // очищаем игровое поле перед началом отрисовки
				if (arr[0][0] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-00")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[0][0])	// пишем цифры
							.addClass("bone-text"); // размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-00") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[0][1] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-01")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[0][1])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-01") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[0][2] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-02")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[0][2])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-02") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[0][3] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-03")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[0][3])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-03") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[1][0] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-04")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[1][0])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-04") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[1][1] > 0) {
					// console.log('!!! Bones!!!')
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-05")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[1][1])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-05") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[1][2] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-06")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[1][2])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-06") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[1][3] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-07")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[1][3])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-07") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[2][0] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-08")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[2][0])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-08") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[2][1] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-09")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[2][1])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-09") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[2][2] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-10")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[2][2])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-10") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[2][3] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-11")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[2][3])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-11") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[3][0] > 0) {
					// console.log('!!! Bones!!!')
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-12")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[3][0])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-12") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[3][1] > 0) {
					// console.log('!!! Bones!!!')
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-13")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[3][1])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-13") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[3][2] > 0) {
					// console.log('!!! Bones!!!')
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-14")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[3][2])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-14") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}

				if (arr[3][3] > 0) {
					$("<div></div>")// создаем костяшки
						.addClass("bones")
						.addClass("b-15")// стили костяшки
							.appendTo('.wrapper')
							.append($('<p></p>')).text(arr[3][3])	// пишем цифры
							.addClass("bone-text");	// размер шрифта 1/3 определяем в медиазапросах
				}

				else{
					$("<div></div>")// создаем костяшки
						.addClass("bones-white") // стили белой костяшки
						.addClass("b-15") // стили костяшки
						.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}
	}; // --> end of this.draw method

	// метод перемещает "пятнашку" в пустую клетку
	this.move = function(x,y, ifPlusClicks) {
		var nullX = getNull().x;
		var nullY = getNull().y;
		var getTargetBone; // определяем DOM - элемент, на который нажали
		var getBoneNumber; // определяем номер элемента, на который нажали
		var getBoneWidth; // определяем ширину костяшки - на такое расстояние и переместим нашу костяшку
		function moveSlowly(){
			if(y == nullY && x < nullX) {
					// направо
					getTargetBone.animate({left: getTargetBoneLeft + getBoneWidth+"px"});// анимация
				}

				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.animate({left: getTargetBoneLeft - getBoneWidth+"px"});// анимация
				}

				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.animate({top: getTargetBoneTop - getBoneWidth+"px"});// анимация
				}

				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.animate({top: getTargetBoneTop + getBoneWidth+"px"});// анимация
				}
		}

		if(((x-1 == nullX || x+1 == nullX) && y == nullY) || ((y-1 == nullY || y+1 == nullY) && x == nullX)) {

			getBoneWidth = parseInt( $('#fff').css('width'),10)/4; // ширина костяшки - работает!
			// сейчас мы определим элемент, на который нажали и его порядковый номер
			if( y == 0 && x == 0) {
				getTargetBone = $(".b-00");
				console.log("!!!getTargetBone = ", getTargetBone)
				console.log("We press 00");
				console.log("getTargetBone = ", getTargetBone);
				getBoneNumber = 0;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-00").addClass("b-01");
				}

				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-00").addClass("b-04");
				}
			}

			if( y == 0 && x == 1) {
				getTargetBone = $(".b-01");
				getBoneNumber = 1;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-01").addClass("b-02");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-01").addClass("b-00");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-01").addClass("b-05");
				}
			}

			if( y == 0 && x == 2) {
				getTargetBone = $(".b-02");
				getBoneNumber = 2;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-02").addClass("b-03");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-02").addClass("b-01");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-02").addClass("b-06");
				}
			}

			if( y == 0 && x == 3) {
				getTargetBone = $(".b-03");
				getBoneNumber = 3;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-03").addClass("b-04");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-03").addClass("b-02");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-03").addClass("b-07");
				}
			}

			if( y == 1 && x == 0) {
				getTargetBone = $(".b-04");
				getBoneNumber = 4;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-04").addClass("b-05");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-04").addClass("b-04");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-04").addClass("b-00");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-04").addClass("b-08");
				}
			}

			if( y == 1 && x == 1) {
				getTargetBone = $(".b-05");
				getBoneNumber = 5;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-05").addClass("b-06");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-05").addClass("b-04");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-05").addClass("b-01");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-05").addClass("b-09");
				}
			}

			if( y == 1 && x == 2) {
				getTargetBone = $(".b-06");
				getBoneNumber = 6;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-06").addClass("b-07");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-06").addClass("b-05");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-06").addClass("b-02");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-06").addClass("b-10");
				}
			}

			if( y == 1 && x == 3) {
				getTargetBone = $(".b-07");
				getBoneNumber = 7;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-07").addClass("b-07");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-07").addClass("b-06");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-07").addClass("b-03");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-07").addClass("b-11");
				}
			}

			if( y == 2 && x == 0) {
				getTargetBone = $(".b-08");
				getBoneNumber = 8;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-08").addClass("b-09");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-08").addClass("b-08");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-08").addClass("b-04");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-08").addClass("b-12");
				}
			}

			if( y == 2 && x == 1) {
				getTargetBone = $(".b-09");
				getBoneNumber = 9;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-09").addClass("b-10");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-09").addClass("b-08");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-09").addClass("b-05");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-09").addClass("b-13");
				}
			}

			if( y == 2 && x == 2) {
				getTargetBone = $(".b-10");
				getBoneNumber = 10;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-10").addClass("b-11");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-10").addClass("b-09");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-10").addClass("b-06");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-10").addClass("b-14");
				}
			}

			if( y == 2 && x == 3) {
				getTargetBone = $(".b-11");
				getBoneNumber = 11;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-11").addClass("b-11");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-11").addClass("b-10");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-11").addClass("b-07");
				}
				if(y < nullY && x == nullX) {
					// вниз
					getTargetBone.removeClass("b-11").addClass("b-15");
				}
			}

			if( y == 3 && x == 0) {
				getTargetBone = $(".b-12");
				getBoneNumber = 12;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-12").addClass("b-13");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-12").addClass("b-12");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-12").addClass("b-08");
				}
			}

			if( y == 3 && x == 1) {
				getTargetBone = $(".b-13");
				getBoneNumber = 13;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-13").addClass("b-14");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-13").addClass("b-12");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-13").addClass("b-09");
				}
			}

			if( y == 3 && x == 2) {
				getTargetBone = $(".b-14");
				getBoneNumber = 14;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-14").addClass("b-15");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-14").addClass("b-13");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-14").addClass("b-10");
				}
			}

			if( y == 3 && x == 3) {
				getTargetBone = $(".b-15");
				getBoneNumber = 15;
				getTargetBoneLeft = parseInt(getTargetBone.css('left'),10);
				getTargetBoneTop = parseInt(getTargetBone.css('top'),10);
				console.log("getTargetBoneLeft= ", getTargetBoneLeft);
				console.log("getTargetBoneTop= ", getTargetBoneTop);
				moveSlowly();
				if(y == nullY && x < nullX) {
					// направо
					getTargetBone.removeClass("b-15").addClass("b-15");
				}
				if(y == nullY && x > nullX) {
					// налево
					getTargetBone.removeClass("b-15").addClass("b-14");
				}
				if(y > nullY && x == nullX) {
					// вверх
					getTargetBone.removeClass("b-15").addClass("b-11");
				}
			}

			arr[nullY][nullX] = arr[y][x];
			arr[y][x] = 0;
				if (ifPlusClicks){
				clicks++; console.log('clicks=', clicks);
				}
				placeShowResult.innerHTML = 'Your steps - ' + clicks;
				// -----------------  вывод сообщения о ходах на экран --------------------

		}
	}; 	//  --> end of this.move method

	// проверка условия победы
	this.victory = function() {
		var e = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
		var res = true;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (e[i][j] != arr[i][j]) {
					res = false;
				}
			}
		}
		return {"res":res, "clicks":clicks}; // clicks была доступна внутри Game() - возвращаем ее, делаем доступной
	}; // --> end of this.victory method

	// функция возвращает произвольное логическое значение
	function getRandomBool() {
		if (Math.floor(Math.random() * 2) === 0) {
			return true;
		} else {return false;}  // ----------------------------------------костыль
	};  // --> end of getRandomBool function

	// метод перемешивает пятнашки
	this.mix = function(stepCount) {
		console.log('mix starts', stepCount);
		var x,y;
		for (var i = 0; i < stepCount; i++) {
			var nullX = getNull().x;
			var nullY = getNull().y;
			var hMove = getRandomBool();
			var upLeft = getRandomBool();
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft) { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft) { y = nullY; x = nullX + 1;}
			if (hMove && upLeft) { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <=3) {
				this.move(x,y);
				this.draw(10);
			}
		}
		clicks = 0;
		console.log('why clicks is not zero', clicks);
	}; //  --> end of this.mix method

	// метод возвращает текущее значение clicks из объекта пятнашек field
	this.showClicks = function(){
		return clicks;
	}
}

function makeGameField(fieldSize) {
	$('.wrapper')
	.attr('id','fff');	// стили поля
}