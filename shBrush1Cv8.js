;(function() {

	// Master highlighter
	//
	var sh = null;
	if (typeof(SyntaxHighlighter) != 'undefined') {
		sh = SyntaxHighlighter;

	} else if (typeof(require) != 'undefined') {
		sh = require('shCore').SyntaxHighlighter;

	};

	/**
		* Adds brush to highlighter
		*
		* @param {Object} brush      Brush.
		* @param {Array}  aliases    String array of brush names (aliases).
		*/
	var registerBrush = function(brush, aliases) {
		brush.prototype = new sh.Highlighter();

		brush.aliases = aliases;
		for (var key in aliases) {
			sh.brushes[aliases[key]] = brush;
		}

		if (typeof(exports) != 'undefined') {
			exports.Brush = brush;
		};
	}

	// Brush for internal language
	//
	var brush1CLang = function () {

		// Helpers
		//
		var cyrillicChars = 'а-яА-ЯёЁ';

		/**
			* Converts space separated list of keywords into a regexp string.
			* \b don't work with unicode, using this regexp constructor instead of this.getKeywords
			*
			* @param  {String} wordList    Space separated keywords.
			* @return {String}             Regular expression string.
			*/
		var getKeywords = function(wordList) {
			var excludeChars = '[^a-zA-Z' + cyrillicChars + ']';
			var keywords     = wordList.replace(/\s+/gmi, '|');

			return '(?:^|' + excludeChars + ')(' + keywords + ')(?=$|' + excludeChars + ')';
		};

		/**
			* Regexp for operators. Special char are fixed
			*
			* @param  {String} operatorList    Space separated operators.
			* @return {String}                 Regular expression string.
			*/
		var getOperators = function(operatorList) {
			var operators = operatorList.replace(/[\\\^\$\*\+\?\.\(\)\{\}\[\]\:\=\!\|\,\-]/gm, '\\$&').replace(/\s+/gmi, '|');

			return '(' + operators + ')';
		};

		/**
			* Regexp for identifier.
			*
			* @return {String} Regular expression string.
			*/
		var getIDs = function() {
			var charset = 'a-zA-Z' + cyrillicChars;

			return '([_' + charset + '][_0-9' + charset + ']*)';
		};

		var keywords = 'While For Each In To Do Break Continue EndDo'
		             + ' If Then ElsIf Else EndIf'
		             + ' New'
		             + ' Goto'
		             + ' Var Export'
		             + ' Try Except Raise EndTry'
		             + ' Procedure Val Export Return EndProcedure'
		             + ' Function EndFunction'
		             + ' AddHandler RemoveHandler'
		             + ' Null'
		             + ' Undefined True False'
		             + ' And Or Not'
		             + ' Пока Для Каждого Из По Цикл Прервать Продолжить КонецЦикла'
		             + ' Если Тогда ИначеЕсли Иначе КонецЕсли'
		             + ' Новый'
		             + ' Перейти'
		             + ' Перем Экспорт'
		             + ' Процедура Знач Экспорт Возврат КонецПроцедуры'
		             + ' Попытка Исключение ВызватьИсключение КонецПопытки'
		             + ' Функция КонецФункции'
		             + ' ДобавитьОбработчик УдалитьОбработчик'
		             + ' Неопределено Истина Ложь'
		             + ' И Или Не'
		;

		var operators = '+ - * / % = ? . , ( ) [ ] ; &lt; &gt;';

		this.regexList = [
			{ regex: /^\s*((?:#|&).*)$/gm,            css: 'preprocessor' },      	// Preprocessor and compiler options
			{ regex: sh.regexLib.singleLineCComments, css: 'comments' },          	// Comments

			{ regex: /"([^"]*)"/gm,                      css: 'string' },         	// Singleline and multiline string
			{ regex: /('[^'$\n]*['$\n])/gm,              css: 'color1' },         	// Date constants
			{ regex: /((?:[0-9]+?\.[0-9]+)|([0-9]+))/gm, css: 'color2' },         	// Number constants

			{ regex: new RegExp(getKeywords(keywords), 'igm'),   css: 'keyword'  },	// Keywords
			{ regex: new RegExp(getOperators(operators), 'igm'), css: 'color3'   },	// Operators
			{ regex: new RegExp(getIDs(), 'igm'),                css: 'variable' } 	// Variable
		];

	};
	registerBrush(brush1CLang, ['lang1c']);

})();
