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

// возвращает размер клиентской области окна
function GetWindowClientSize() {
		var uaB=navigator.userAgent.toLowerCase();
		var isOperaB = (uaB.indexOf('opera')  > -1);
		var isIEB=(!isOperaB && uaB.indexOf('msie') > -1);

		var ClientWidth=((document.compatMode||isIEB)&&!isOperaB)?
		(document.compatMode=='CSS1Compat')?
		document.documentElement.clientWidth:
		document.body.clientWidth:
		(document.parentWindow||document.defaultView).innerWidth;

		var ClientHeight=((document.compatMode||isIEB)&&!isOperaB)?
		(document.compatMode=='CSS1Compat')?
		document.documentElement.clientHeight:
		document.body.clientHeight:
		(document.parentWindow||document.defaultView).innerHeight;

	return {width:ClientWidth, height:ClientHeight};
}

function init() {
	console.time("draw");
	var fieldSize = 40; // vmin - размер игрового поля ///////////////////////////////  было 80
	var boneSize = 10;  // размер костяшки vmin /////////////////////////////////////   было 20

	////определяем ширину и высоту клиентской области окна
	var ClientWidth = GetWindowClientSize().width;
	var ClientHeight = GetWindowClientSize().height;
	console.log('clientWidth = ', ClientWidth);
	console.log('clientHeight = ', ClientHeight);

	makeGameField(fieldSize); // создаем игровое поле///////////////////////////////////////////////

	var field = new Game15(); 	// создаем объект пятнашек

	field.draw(boneSize); // ------- рисуем наши пятнашки на экране --------------
	// console.log ('point48');
	console.timeEnd("draw"); // рисуем наши пятнашки

	field.mix(100); // перемешиваем

	function eventMouse(x,y){ // функция действия при кликах мыши
		field.move(x,y,true); // третий аргумент - нужно увеличивать счетчик ходов
		field.draw(boneSize);
		//console.log("field.victory().clicks= ",field.victory().clicks);
		if(field.victory().res){
			alert("You win in "+field.victory().clicks+"  steps!"); // alert принимает только один аргумент
		}
	}

	function eventKey(x,y){ // функция действия при нажатии клавиш
		// нужно переместить подходящую костяшку, если это возможно
		var xNull = getNull().x;
		// console.log ('xNull = ',xNull);
		var yNull = getNull().y;
		// console.log ('yNull = ',yNull);
		var xBone = x+xNull, yBone = y+yNull; // координаты клетки кандидата
		// console.log('xBone = ', xBone);
		// console.log('yBone = ', yBone);
		if((xBone >= 0 && xBone < 4) && (yBone >= 0 && yBone < 4)){
			// костяшку сдвинуть можно
			//alert('xBone = '+xBone + ' yBone = '+yBone);
			field.move(xBone,yBone, true); // третий аргумент - нужно увеличивать счетчик ходов
			field.draw(boneSize);
			//console.log("field.victory().clicks= ",field.victory().clicks);
			if(field.victory().res){
				alert("You win in "+field.victory().clicks+"  steps!"); // alert принимает только один аргумент
			}

		}
	}

	$(function(){ // обработчик кликов мыши
		var fieldSpace = $('#fff');
		fieldSpace.click(function(e){
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
			switch (e.which) {
				case 37 : eventKey(1,0);break; // хотим сместить костяшку с правой позиции (+1) горизонтали и на 0 по вертикали
				case 39 : eventKey(-1,0);break; // хотим сместить костяшку с левой позиции (-1) по горизонтали
				case 38 : eventKey(0,1);break; // хотим сместит сверху по вертикали
				case 40 : eventKey(0,-1); // хотим сместить снизу по вертикали
			}
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
		for (var yi = 0; yi < 4; yi++) {
			for (var xj = 0; xj < 4; xj++) {
				if (arr[yi][xj] > 0) {
											// console.log('!!! Bones!!!')
											$("<div></div>",{
													'width': boneSize+"vmin",
													'height': boneSize+"vmin",})		// создаем костяшки
												.addClass("bones")
												.css({



													'left': xj*boneSize+"vmin",
													'top': yi*boneSize+"vmin",})			// стили костяшки

												.appendTo('.wrapper')
												.append($('<p></p>')).text(arr[yi][xj])			// пишем цифры
												.css({
													'text-align':'center',
													'color':'white',
													'text-weight':'bold',
													'font-family':'arial',
													'line-height':boneSize+"vmin",
													'font-size':Math.floor(boneSize/3)+"vmin",
													'color':'white',});									// размер шрифта 1/3
				}
				else{
											$("<div></div>",{
													'width': boneSize+"vmin",
													'height': boneSize+"vmin",})		// создаем костяшки
												.addClass("bones")
												.css({
													'background-color':'#999',
													'-webkit-clip-path':'inset(2px 2px 2px 2px round 2px)', // это цвет пустой костяшки


													'left': xj*boneSize+"vmin",
													'top': yi*boneSize+"vmin",
													'margin-left':'auto',
													'margin-right':'auto',})			// стили костяшки

												.appendTo('.wrapper') 	// цифру на ней не пишем -  маленький костыль
				}
			}
		}
	}; // --> end of this.draw method
	// метод перемещает "пятнашку" в пустую клетку
	this.move = function(x,y, ifPlusClicks) {
		var nullX = getNull().x;
		var nullY = getNull().y;
		/*console.log ('x=',x,'y=',y,'nullx=',nullX,'nully=',nullY);*/
		if(((x-1 == nullX || x+1 == nullX) && y == nullY) || ((y-1 == nullY || y+1 == nullY) && x == nullX)) {

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
			//console.log('i=',i);
			var nullX = getNull().x;
			var nullY = getNull().y;
			//console.log('nullX=', nullX,' nullY=',nullY);
			var hMove = getRandomBool();
			var upLeft = getRandomBool();
			//console.log('hMove=',hMove,' upLeft=',upLeft);
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft) { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft) { y = nullY; x = nullX + 1;}
			if (hMove && upLeft) { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <=3) {
				//console.log('Coordinats for move x=',x,' y=',y);
				this.move(x,y);
				this.draw(10);
			}
		}
	clicks = 0;
	console.log('why clicks is not zero', clicks);
	}; //  --> end of this.mix method
}

function makeGameField(fieldSize) {
	$('.wrapper')
	.css({
		'width': fieldSize+"vmin",
		'height': fieldSize+"vmin",
		'background-color': '#999',
	 	'margin': '0 auto',
	 	'position': 'relative',}).attr('id','fff');		// стили поля
}