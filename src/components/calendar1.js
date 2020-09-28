
шпаргалка
блоггера
	
HTML/CSS Оптимизация Blogger Полезное
Календарь для сайта | JavaScript
15.11.13 NMitra

    Мини-календарь в один месяц
    Появляющийся при заполнении поля input календарь
    Полный календарь с установленными мной датами
    Дата статьи в виде календаря на CSS
    Как узнать дату, на которую приходится, например, последняя пятница марта | JavaScript

Вид виджета	Описание	Код
Скрипт простого календаря HTML
Сентябрь	2020
Пн	Вт	Ср	Чт	Пт	Сб	Вс
	1	2	3	4	5	6
7	8	9	10	11	12	13
14	15	16	17	18	19	20
21	22	23	24	25	26	27
28	29	30				
	Это основа. В коде даны подробные комментарии. 	открыть
Как создать календарь со стрелками-переключателями
‹	Сентябрь 2020	›
Пн	Вт	Ср	Чт	Пт	Сб	Вс
	1	2	3	4	5	6
7	8	9	10	11	12	13
14	15	16	17	18	19	20
21	22	23	24	25	26	27
28	29	30	 	 	 	 
 	 	 	 	 	 	 
	На большинстве сайтах календарём пользуются для просмотра ближайших дней плюс-минус месяц, например, чтобы определиться с днём недели числа. В листании годов нет необходимости. 	
открыть
Календарь для сайта
Пн	Вт	Ср	Чт	Пт	Сб	Вс
	1	2	3	4	5	6
7	8	9	10	11	12	13
14	15	16	17	18	19	20
21	22	23	24	25	26	27
28	29	30	 	 	 	 
 	 	 	 	 	 	 
	Можно сделать календарь, в котором нажатие на год/месяц приводит к появлению списка месяцев, ещё один клик — к выбору годов, ещё — к выбору списка периодов годов. Но на практике это не удобно и не понятно: нужно совершить много кликов, разобраться во всей структуре, а человек хочет поменьше думать. В код добавлен список официальных праздников. 	открыть
Как сделать календарь с неделями
	Пн	Вт	Ср	Чт	Пт	Сб	Вс
36		1	2	3	4	5	6
37	7	8	9	10	11	12	13
38	14	15	16	17	18	19	20
39	21	22	23	24	25	26	27
40	28	29	30				
 							
	Полезен на странице сайта института, где учебный процесс завязан на недельных циклах. Для того, чтобы узнать номер недели используется этот скрипт. 	открыть

<style>
#calendar2 {
  width: 100%;
  font: monospace;
  line-height: 1.2em;
  font-size: 15px;
  text-align: center;
}
#calendar2 thead tr:last-child {
  font-size: small;
  color: rgb(85, 85, 85);
}
#calendar2 thead tr:nth-child(1) td:nth-child(2) {
  color: rgb(50, 50, 50);
}
#calendar2 thead tr:nth-child(1) td:nth-child(1):hover, #calendar2 thead tr:nth-child(1) td:nth-child(3):hover {
  cursor: pointer;
}
#calendar2 tbody td {
  color: rgb(44, 86, 122);
}
#calendar2 tbody td:nth-child(n+6), #calendar2 .holiday {
  color: rgb(231, 140, 92);
}
#calendar2 tbody td.today {
  background: rgb(220, 0, 0);
  color: #fff;
}
</style>

<table id="calendar2">
  <thead>
    <tr><td>‹<td colspan="5"><td>›
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
  <tbody>
</table>

<script>
function Calendar2(id, year, month) {
var Dlast = new Date(year,month+1,0).getDate(),
    D = new Date(year,month,Dlast),
    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
    calendar = '<tr>',
    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
}else{
  for(var  i = 0; i < 6; i++) calendar += '<td>';
}
for(var  i = 1; i <= Dlast; i++) {
  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
  }else{
    calendar += '<td>' + i;
  }
  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
  }
}
for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
document.querySelector('#'+id+' tbody').innerHTML = calendar;
document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
    document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
}
}
Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
}
// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
}
</script>

Выпадающий календарь в input

Типы input описаны здесь. Среди них есть несколько для дат
вид 	код 	формат 	описание
	<input type="date" value="2012-04-10"/> 	yyyy-mm-dd 	дата
	<input type="datetime" value="2012-04-10T20:37:40"/> 	yyyy-mm-ddTHH:MM:SS 	дата и время с часовым поясом, нет поддержки, работает как type="text"
	<input type="datetime-local" value="2012-04-10T20:37:40"/> 	yyyy-mm-ddTHH:MM:SS 	дата и время
	<input type="month" value="2012-04"/> 	yyyy-mm 	год и месяц
	<input type="week" value="2012-W46"/> 	yyyy-W 	год и порядковый номер недели
	<input type="time" value="20-37"/> 	HH:MM:SS (секунды не обязательны) 	время

Можно указывать максимальное и минимальное значение

<input type="date" max="2012-04-20" min="2012-04-10" value="2012-04-15"/>

value с сегодняшней датой и текущим временем в input type="date" на JavaScript
вид 	код
	<input type="date" id="davaToday">
<script>
document.getElementById('davaToday').valueAsDate = new Date();
</script>
	<input type="datetime-local" id="datetimeLocalToday">
<script>
document.getElementById('datetimeLocalToday').value = new Date().toJSON().slice(0,19);
</script>
	<input type="month" id="monthToday">
<script>
document.getElementById('monthToday').valueAsDate = new Date();
</script>
	<input type="week" id="weekToday">
<script>
document.getElementById('weekToday').valueAsDate = new Date();
</script>
	<input type="time" id="timeToday">
<script>
document.getElementById('timeToday').value = new Date().toJSON().slice(11,16);
</script>
Большой календарь со всеми 12 месяцами на HTML
Календарь на 2019 год	Календарь на 2020 год	Календарь на 2021 год
Январь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
		1	2	3	4	5
6	7	8	9	10	11	12
13	14	15	16	17	18	19
20	21	22	23	24	25	26
27	28	29	30	31		
	Февраль
Пн	Вт	Ср	Чт	Пт	Сб	Вс
					1	2
3	4	5	6	7	8	9
10	11	12	13	14	15	16
17	18	19	20	21	22	23
24	25	26	27	28	29	
	Март
Пн	Вт	Ср	Чт	Пт	Сб	Вс
						1
2	3	4	5	6	7	8
9	10	11	12	13	14	15
16	17	18	19	20	21	22
23	24	25	26	27	28	29
30	31					
Апрель
Пн	Вт	Ср	Чт	Пт	Сб	Вс
		1	2	3	4	5
6	7	8	9	10	11	12
13	14	15	16	17	18	19
20	21	22	23	24	25	26
27	28	29	30			
	Май
Пн	Вт	Ср	Чт	Пт	Сб	Вс
				1	2	3
4	5	6	7	8	9	10
11	12	13	14	15	16	17
18	19	20	21	22	23	24
25	26	27	28	29	30	31
	Июнь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
1	2	3	4	5	6	7
8	9	10	11	12	13	14
15	16	17	18	19	20	21
22	23	24	25	26	27	28
29	30					
Июль
Пн	Вт	Ср	Чт	Пт	Сб	Вс
		1	2	3	4	5
6	7	8	9	10	11	12
13	14	15	16	17	18	19
20	21	22	23	24	25	26
27	28	29	30	31		
	Август
Пн	Вт	Ср	Чт	Пт	Сб	Вс
					1	2
3	4	5	6	7	8	9
10	11	12	13	14	15	16
17	18	19	20	21	22	23
24	25	26	27	28	29	30
31						
	Сентябрь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
	1	2	3	4	5	6
7	8	9	10	11	12	13
14	15	16	17	18	19	20
21	22	23	24	25	26	27
28	29	30				
Октябрь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
			1	2	3	4
5	6	7	8	9	10	11
12	13	14	15	16	17	18
19	20	21	22	23	24	25
26	27	28	29	30	31	
	Ноябрь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
						1
2	3	4	5	6	7	8
9	10	11	12	13	14	15
16	17	18	19	20	21	22
23	24	25	26	27	28	29
30						
	Декабрь
Пн	Вт	Ср	Чт	Пт	Сб	Вс
	1	2	3	4	5	6
7	8	9	10	11	12	13
14	15	16	17	18	19	20
21	22	23	24	25	26	27
28	29	30	31			

<style>
#calendarBig { /* весь календарь */ 
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  border-spacing: 0 1.5em;
}
#calendarBig td {
  vertical-align: top;
}
#calendarBig > thead td:not(:nth-child(2)) { /* предыдущий-следующий года */ 
  text-decoration: underline;
  color: rgb(0, 119, 204);
  cursor: pointer;
}
#calendarBig > thead td:not(:nth-child(2)):hover { /* если наведён курсор на предыдущий-следующий года */ 
  color: #ff3200;
}
#calendarBig > thead td:nth-child(2) { /* текущий год */ 
  font-size: 150%;
  font-weight: 700;
  color: rgb(140, 61, 2);
}
#calendarBig, #calendarBig table {
  font: monospace;
  line-height: 1.2em;
  font-size: 15px;
  text-align: center;
}
#calendarBig table { /* таблицы с месяцами выравнены по верхней границе, горизонтально — по центру */ 
  display: inline-table;
}
#calendarBig table thead tr:nth-child(1) { /* названия месяцев */ 
  font-size: 110%;
  font-weight: 700;
}
#calendarBig table thead tr:last-child { /* название дней недели */ 
  font-size: small;
  font-weight: 700;
  color: rgb(103, 103, 103);
}
#calendarBig table tbody td { /* дни */ 
  color: rgb(44, 86, 122);
}
#calendarBig table tbody td:nth-child(n+6), #calendarBig .holiday { /* выходные и праздники */ 
  color: rgb(231, 140, 92);
}
#calendarBig table tbody td.today { /* сегодня */ 
  outline: 3px solid red;
}
#calendarBig table tbody td[title] { /* выделенные даты */ 
  outline: 3px solid green;
  background: yellow;
  cursor: help;
}
#calendarBig table tbody td[title] a { /* выделенные даты-ссылки */ 
  display: block;
  text-decoration: none;
}
#calendarBig table tbody td[title] a:hover { /* выделенные даты-ссылки под курсором */
  background: #fde910;
  color: red;
}
</style>

<table id="calendarBig">
 <thead>
  <tr><td><td><td>
 <tbody>
  <tr>
    <td>
      <table data-m="0">
        <thead>
          <tr><td colspan="7">Январь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="1">
        <thead>
          <tr><td colspan="7">Февраль
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="2">
        <thead>
          <tr><td colspan="7">Март
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
  <tr>
    <td>
      <table data-m="3">
        <thead>
          <tr><td colspan="7">Апрель
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="4">
        <thead>
          <tr><td colspan="7">Май
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="5">
        <thead>
          <tr><td colspan="7">Июнь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
  <tr>
    <td>
      <table data-m="6">
        <thead>
          <tr><td colspan="7">Июль
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="7">
        <thead>
          <tr><td colspan="7">Август
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="8">
        <thead>
          <tr><td colspan="7">Сентябрь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
  <tr>
    <td>
      <table data-m="9">
        <thead>
          <tr><td colspan="7">Октябрь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="10">
        <thead>
          <tr><td colspan="7">Ноябрь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
    <td>
      <table data-m="11">
        <thead>
          <tr><td colspan="7">Декабрь
          <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
        <tbody>
      </table>
</table>

<!-- 
День рождения происходит из года в год, поэтому data-yyyy (год) не указывается.
Можно чтобы дата была ссылкой на другую страницу, тогда нужно написать data-link (адрес страницы, куда перенаправить пользователя). Одна дата не может вести на несколько страниц [вернее может, но в код нужно внести дополнительные изменения].
data-dd (день), data-mm (месяц), data-text(сообщение, видимое при наведении курсора мышки) нужно заполнять всегда. Один день может содержать несколько записей, одна дата может иметь только один data-text (см. пример 3).
-->
<div id="calendarTable">
  <div data-dd="18" data-mm="8" data-text="День рождения"></div>
  <div data-dd="5" data-mm="1" data-yyyy="2013" data-text="регулярные выражения
JavaScript примеры" data-link="http://shpargalkablog.ru/2013/07/replace.html"></div>
  <div data-dd="28" data-mm="11" data-yyyy="2013" data-text="✈ встреча у бабушки
☏ поздравить Ивана Ивановича с именинами
☄ комета ISON"></div>
</div>

<script>
function calendarBig(year) {
for (var m = 0; m <= 11; m++) {
var D = new Date(year,[m],1),
    Dlast = new Date(D.getFullYear(),D.getMonth()+1,0).getDate(),
    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
    calendar = '<tr>';

if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
}else{
  for(var  i = 0; i < 6; i++) calendar += '<td>';
}

for(var  i = 1; i <= Dlast; i++) {
  if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
  }else{
    if (
        (i == 1 && D.getMonth() == 0 && ((D.getFullYear() > 1897 && D.getFullYear() < 1930) || D.getFullYear() > 1947)) ||
        (i == 2 && D.getMonth() == 0 && D.getFullYear() > 1992) ||
        ((i == 3 || i == 4 || i == 5 || i == 6 || i == 8) && D.getMonth() == 0 && D.getFullYear() > 2004) ||
        (i == 7 && D.getMonth() == 0 && D.getFullYear() > 1990) ||
        (i == 23 && D.getMonth() == 1 && D.getFullYear() > 2001) ||
        (i == 8 && D.getMonth() == 2 && D.getFullYear() > 1965) ||
        (i == 1 && D.getMonth() == 4 && D.getFullYear() > 1917) ||
        (i == 9 && D.getMonth() == 4 && D.getFullYear() > 1964) ||
        (i == 12 && D.getMonth() == 5 && D.getFullYear() > 1990) ||
        (i == 7 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 2005)) ||
        (i == 8 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 1992)) ||
        (i == 4 && D.getMonth() == 10 && D.getFullYear() > 2004)
       ) {
      calendar += '<td class="holiday">' + i;
    }else{
      calendar += '<td>' + i;
    }
  }
  if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
  }
}

if (DNlast != 0) {
  for(var  i = DNlast; i < 7; i++) calendar += '<td>';
}

document.querySelector('#calendarBig table[data-m="' + [m] + '"] tbody').innerHTML = calendar;
document.querySelector('#calendarBig > thead td:nth-child(2)').innerHTML = 'Календарь на ' + year + ' год';
document.querySelector('#calendarBig > thead td:nth-child(1)').innerHTML = 'Календарь на ' + parseFloat(parseFloat(year)-1) + ' год';
document.querySelector('#calendarBig > thead td:nth-child(3)').innerHTML = 'Календарь на ' + parseFloat(parseFloat(year)+1) + ' год';

// абзац создаёт сообщения
for (var k = 1; k <= document.querySelectorAll('#calendarTable div').length; k++) {
  var myD = document.querySelectorAll('#calendarBig table td'),
      my = document.querySelector('#calendarTable div:nth-child(' + [k] + ')');
  for (var i = 0; i < myD.length; i++) {
    if (my.dataset.yyyy) {
      if (myD[i].innerHTML == my.dataset.dd && myD[i].parentNode.parentNode.parentNode.dataset.m == (my.dataset.mm - 1) && year == my.dataset.yyyy) {
        myD[i].title = my.dataset.text;
        if (my.dataset.link) {
          myD[i].innerHTML = '<a href="' + my.dataset.link + '" target="_blank">' + myD[i].innerHTML + '</a>';
        }
      }
    }else{
      if (myD[i].innerHTML == my.dataset.dd && myD[i].parentNode.parentNode.parentNode.dataset.m == (my.dataset.mm - 1)) {
        myD[i].title = my.dataset.text;
        if (my.dataset.link) {
          myD[i].innerHTML = '<a href="' + my.dataset.link + '" target="_blank">' + myD[i].innerHTML + '</a>';
        }
      }
    }
  }
}

}}

calendarBig(new Date().getFullYear());
document.querySelector('#calendarBig > thead td:nth-child(1)').onclick = calendarBigG;
document.querySelector('#calendarBig > thead td:nth-child(3)').onclick = calendarBigG;
function calendarBigG() {calendarBig(this.innerHTML.replace(/[^\d]/gi, ''));}

</script>

Можно сделать большие подсказки (как сделать). Но это базовый образец и усложнять его не хочется.
Полный календарь, где даты идут вслед

В коде выше в JS строку

if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += '';
}else{
  for(var  i = 0; i < 6; i++) calendar += '';
}

заменить на

if (DNfirst != 0) {
  for(var  i = 1; i < DNfirst; i++) calendar += ''+[new Date(new Date(year,[m-1],1).getFullYear(),new Date(year,[m-1],1).getMonth()+1,0).getDate() - DNfirst + i + 1];
}else{
  for(var  i = 0; i < 6; i++) calendar += ''+[new Date(new Date(year,[m-1],1).getFullYear(),new Date(year,[m-1],1).getMonth()+1,0).getDate() + i - 5];
}

Строку

if (DNlast != 0) {
  for(var  i = DNlast; i < 7; i++) calendar += '';
}

заменить на

if (DNlast != 0) {
  for(var  i = DNlast; i < 7; i++) calendar += '' + [i +1-DNlast];
}

Добавить CSS перед закрывающимся тегом </style>:

#calendarBig table tbody td.next { /* выделенные даты-ссылки под курсором */
  color: #ccc;
}

в f t
наверх ↑
68 комментариев:

Анонимный
    Полезная информация, благодарствую :) 
NMitra
    Совсем не запланированная: накопились знания про new Date() при написании цикла "сколько часов, сколько минут...", которые тут и использовала. 
Анонимный
    Отлично всё работает. Очень полезно для верстальщика. 
NMitra
    Да, я понимаю, что это не конечный вариант, и понимаю, что проще написать своё "творение", чем разбираться в чужой работе. Поэтому стараюсь либо давать самое простое решение, либо писать комментарии. 
Aleksey
    NMitra, спасибо. Своё "творение" писать не проще, но приходится. И без таких "самых простых решений" это сделать очень трудно (долго). У меня календарь занял около 600 строк js, К сожалению выложить его не могу, но могу показать http://result-systems.ru/dbopen?RF.TVR/DP_2013
    Там список документов - откройте любой в режиме правки. Календарь рассчитан на ввод с клавиатуры. Открыть по Enter 
NMitra
    Заценила :) 
Анонимный
    отличные календари) но как заставить работать календарь со стрелками в IE (желательно IE8)? а то сами стрелки не работают( 
NMitra
    Десятка норм. Честно говоря, не могу сказать что там именно ему не нравится. Возможно document.querySelector (не помню когда начал поддерживать) или он с селекторами CSS не дружит. ( 
Анонимный
    Ошибка в коде 2-го календаря (со стрелками-переключателями). Если сегодня 31-е число вы не сможете переключиться на месяца в которых нет 31-го числа, либо не сможете переключиться на невисокосный февраль, если сегодня число большее, чем 28-е. Да вообще много ошибок, хотя и не критичных, в коде, например не генерируются закрывающие теги для ячеек и строчек таблицы, многократно используются вызовы функций для получения одних и тех же значений, вместо сохранения в переменную и последующего использования, постоянно используются длинные цепочки в querySelector вместо назначения id на нужный элемент и выборки его по id. Но вообщем код рабочий, за исключением описанного бага, за что огромная благодарность автору. 
NMitra
    Спасибо за бдительность!!! Код подправила. Теперь как по маслу.

    Закрывающиеся теги не нужны http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission
    Точно, querySelector я люблю без меры. Разница с id незначительна.
    Вызовы функций, предполагаю, каждый под себя сделает. Зато так понятно что откуда берётся. Учитывая, что я сегодня на код смотрела как в первый раз, сразу в нём разобралась. 
Анонимный
    Экспериментировать можно и нужно в процессе саморазвития, но в коммерческих (да и любых других проектах) лучше использовать готовые проверенные и отлаженные решения (их масса беЗплатных). Как пример http://jqueryui.com/datepicker/ или http://plugins.jquery.com/tag/calendar/ (их довольно много, не только джекверных, они кроссбраузерны и кастомизируемы и т.д.). Цените своё время и экономьте средства заказчика. 
NMitra
    Согласна. Для себя считаю так. Код пишется для новых версий браузера. В приоритете мобильные телефоны, планшеты, ноутбуки. Они быстро морально устаревают или ломаются. Как ни крути их пользователи установят последние версии браузеров.

    Прозрачность, выделение столбцов таблицы, <input type="date"> и т.п. Для пользователей новых версий браузеров будет всё красиво и юзабильно. Для старых версий должно быть доступно. То есть чтобы они могли воспользоваться функциями, заказать товар, вёрстка не съезжала, но при заполнении поля input не будет показан календарь. Они просто ручками наберут нужную дату. 
Анонимный
    Всем привет. Мне надо сделать так, чтобы при нажатии на день календаря джаваскриптом стягивало число, месяц и год, и заносило это дело в поле (скрытое, но для теста сделал поля видимыми). Когда нахожусь на текущем месяце, то все отлично: http://prntscr.com/40xg4r
    А вот стоит мне переключить месяц, все остается также http://prntscr.com/40xgrj . Ошибок инспектор кода не выдает. 
NMitra
    Нашлась минутка для ответа. Предполагаю идея должна быть ясна: day2() нужно добавлять и при переключении месяцев:

    <div id="rez"></div>

    <script>
    function day2() {
    var day2 = document.querySelectorAll('#calendar2 tbody td');
    for (var i = 0; i < day2.length; i++) {
    day2[i].onclick = function() {
    document.querySelector('#rez').innerHTML = this.innerHTML + ' ' + parseFloat(parseFloat(this.parentNode.parentNode.parentNode.querySelector('thead td:nth-child(2)').dataset.month) + 1) + ' ' + this.parentNode.parentNode.parentNode.querySelector('thead td:nth-child(2)').dataset.year;
    }
    }
    }

    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());

    day2();

    // переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
    day2();
    }

    // переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
    day2();
    }
    </script> 
Анонимный
    Спасибо автору за статью. Буду признателен если подскажете как в календаре со стрелками (пример 2) вывести даты с ссылками и подсказками. 
NMitra
    В CSS добавьте:

    #calendar2 tbody td[title] {
    outline: 3px solid green;
    background: yellow;
    cursor: help;
    }
    #calendar2 tbody td[title] a {
    display: block;
    }

    В HTML добавьте:

    <div id="calendarTable">
    <div data-dd="5" data-mm="9" data-yyyy="2014" data-text="Некое событие" data-link="http://shpargalkablog.ru/2013/11/calendar.html"></div>
    <div data-dd="8" data-mm="10" data-yyyy="2014" data-text="Другое событие" data-link="http://shpargalkablog.ru/2013/11/calendar.html"></div>
    </div> 
NMitra
    Скрипт будет таким:

    function Calendar2(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
    D = new Date(year,month,Dlast),
    DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
    DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
    calendar = '<tr>',
    month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    soob = document.querySelectorAll('#calendarTable div');;
    if (DNfirst != 0) {
    for(var i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
    for(var i = 0; i < 6; i++) calendar += '<td>';
    }
    for(var i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
    }else{
    calendar += '<td>' + i;
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
    }
    }
    for(var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
    document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }

    // абзац создаёт сообщения
    for (var k = 0; k < soob.length; k++) {
    if (soob[k].dataset.yyyy == D.getFullYear() && soob[k].dataset.mm - 1 == D.getMonth()) {
    var mytd = document.querySelectorAll('#'+id+' tbody td');
    for (var p = 0; p < mytd.length; p++) {
    if (soob[k].dataset.dd == mytd[p].innerHTML) {
    if (soob[k].dataset.link) {
    mytd[p].innerHTML = '<a href="' + soob[k].dataset.link + '" target="_blank">' + mytd[p].innerHTML + '</a>';
    }
    if (soob[k].dataset.text) {
    mytd[p].title = soob[k].dataset.text;
    }
    }
    }
    }
    }

    }
    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
    // переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
    }
    // переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
    } 
Анонимный
    Спасибо за оперативный ответ, очень помогли. 
Анонимный
    А как в календаре на год сделать чтобы одни даты были одного цвета, а другие другого 
Анонимный
    Имеется ввиду определенные даты заданные через data-dd, ... на которых появляется подсказка 
NMitra
    Добавьте по аналогии с data-text ещё и data-class
    В div (всегда прописываете)
    data-class="mytd1"
    В скрипте в двух местах после myD[i].title = my.dataset.text; добавьте
    myD[i].className = my.dataset.class;
    Стиль будет
    #calendarBig .mytd1
    #calendarBig .mytd2 
NMitra
    Пример http://jsfiddle.net/NMitra/3Ljdb2s7/ 
Анонимный
    Спасибо огромное!
    Всё оказывается просто... Учиться, учиться и еще раз учиться :) 
Андрей Бакрин
    Как сделать так, чтобы при клике по дате, вылезало окно с выбором цвета (2-3 цвета), пользователь мог выбрать каким цветом закрасить дату. Нужно для графика работы. 
NMitra
    Андрей, со всем уважением, но это уже делается за плату. 
Анонимный
    1 января 2014 вообще то среда,а не вторник (браузер FF) 
NMitra
    У меня среда. А где вы смотрите (какой из калькуляторов)? 
Анонимный
    Спасибо NMitra, отличные календари, прям то что надо. 
NMitra
    Рада помочь! 
Виталий
    Привет! Очень понравился Большой календарь со всеми 12 месяцами на HTML.
    Но хотелось бы переделать его: Дни недели с ПН по ВС были бы по левую и правую сторону, а даты месяцев соответственно шли бы не по горизонтали, а по вертикали.
    Подскажите! 
NMitra
    Привет, с трудом представляю как это должно выглядеть. Добавьте в стили

    #calendarBig {
    transform: rotate(-90deg);
    }
    #calendarBig table tbody td {
    transform: rotate(90deg);
    } 
Виталий
    получается лабуда... 
Виталий
    как сделать календарь аналогично как в Виндовс 7, когда изменяешь дату с переходами в месяца, года и десятилетия? 
NMitra
    Я могу сделать чтоб ровненько было, но всё равно лабуда получится. Если у вас есть пример, когда дни недели находятся сбоку, приведите его, пожалуйста.

    Календарь как в Виндовс 7 делать более трудоёмко и не бесплатно. 
Виталий
    как ещё сделать в Большом календаре на год чтобы при нажатии на день
    текст выводился внизу календаря, а не во всплывающей подсказке???
NMitra
    Без ссылок, клик будет выводить текст под календарём http://jsfiddle.net/NMitra/uq41yoxx/
    Так как календарь занимает почти всю высоту экрана монитора (особенно на планшетах), то всплывающие подсказки оставила 
Виталий
    Подскажите, как правильно добавить условие, что
    today, ... иначе holiday или "ещё какие-то дни", тогда ... td...
    т.е. параллельно с holiday
    а то запутался... сори...
NMitra
    Когда текущий день совпадает с праздником, то что-то должно происходить?

    Строку
    calendar += '<td class="today">' + i;

    замените на
    if (
    ((i > 0 && i < 9) && D.getMonth() == 0) ||
    (i == 23 && D.getMonth() == 1 ) ||
    (i == 8 && D.getMonth() == 2) ||
    (i == 1 && D.getMonth() == 4) ||
    (i == 9 && D.getMonth() == 4) ||
    (i == 12 && D.getMonth() == 5) ||
    (i == 4 && D.getMonth() == 10)
    ) {
    calendar += '<td class="todayPR">' + i;
    }else{
    calendar += '<td class="today">' + i;
    } 
NMitra
    И для todayPR укажите свои стили 
Виталий
    хм, так закрасились все выходные.
    Нужно стилями отметить и другие дни, кроме праздников.
    Т.е. есть праздники, а есть и другие памятные дни, которые нужно тоже отметить стилями отдельно от праздников и рядовых дней.
    Пока не получается. 
NMitra
    if (
    ((i > 0 && i < 9) && D.getMonth() == 0) ||
    (i == 23 && D.getMonth() == 1 ) ||
    (i == 8 && D.getMonth() == 2) ||
    (i == 1 && D.getMonth() == 4) ||
    (i == 9 && D.getMonth() == 4) ||
    (i == 12 && D.getMonth() == 5) ||
    (i == 4 && D.getMonth() == 10)
    ) {
    calendar += '<td class="todayPR">' + i;
    }else{
    if (
    (i == 20 && D.getMonth() == 3) ||
    (i == 5 && D.getMonth() == 8 )
    ) {
    calendar += '<td class="todayMYPR">' + i;
    }else{
    calendar += '<td class="today">' + i;
    }
    }

    Установите свои стили

    #calendarBig .holiday, #calendarBig .todayPR {
    color: blue;
    }
    #calendarBig .todayMYPR {
    color: green;
    } 
Виталий
    Вроде логику вижу, однако непонятно, где здесь должны быть эти строки:
    от for(var i = 1; i <= Dlast; i++)
    и до if (DNlast != 0) 
NMitra
    Это всё остаётся, вам нужно заменить одну строку, озвученную в комментарии 38

    calendar += '<td class="today">' + i; 
Анонимный
    это то и так понятно
    не понятно то, что это не работает... 
NMitra
    Стили нужно более подробно расписывать

    #calendarBig table tbody td.holiday, #calendarBig table tbody td.todayPR {
    color: blue;
    }
    #calendarBig table tbody td.todayMYPR {
    color: green;
    }

    См. http://jsfiddle.net/NMitra/srdq5oc7/ 
Sergey Zavrazhnov
    Можно чтобы дата была ссылкой на другую страницу, тогда нужно написать data-link (адрес страницы, куда перенаправить пользователя). Одна дата не может вести на несколько страниц [вернее может, но в код нужно внести дополнительные изменения]

    Возникла необходимость сделать дату ссылкой на несколько различных страниц. Что нужно в код добавить???
    Заранее спасибо 
NMitra
    См. http://jsfiddle.net/NMitra/y2qxys9w/ 
Дмитрий Вашкевич
    Подскажите, как закрыть для выбора определенные даты в календаре (чтобы они были выделены другим цветом и их нельзя было выбрать для передачи в форму) 
NMitra
    Можно в JS, а можно только CSS и HTML.
    CSS и HTML (пример http://jsfiddle.net/NMitra/t3uv1jcu/ ):

    последним в calendarTable добавьте свои даты, только оставьте пустым data-text=""

    <div id="calendarTable">
    .....................................
    <div data-dd="28" data-mm="11" data-yyyy="2015" data-text=""></div>
    </div>

    тогда в CSS внесите приблизительно такой стиль

    #calendarBig table tbody td[title=""] {
    outline: 3px none green;
    background: #ccc;
    cursor: not-allowed;
    } 
Дмитрий Шумов
    хороший календарь советую всем без рекламы и всего прочего 
NMitra
    Благодарю за комментарий, Дмитрий 
СГ
    приветствую! прошу вашего совета. Есть страничка на простом html, на ней церковный календарь в виде длинного списка. Как привязать какой-либо из ваших скриптов так, чтобы при открытии странички мы видели перед собою не верх страницы, а сегодняшний день? посмотреть можно здесь maristarover.ru в левом меню Месяцеслов. С уважением Сергей Генн. 
NMitra
    Привет, не поняла. Нужно чтобы страница перематывалась? Или в правой колонке висела картинка конкретного месяца? Второе делается по той же схеме http://shpargalkablog.ru/2010/07/kartinku-v-zagolovok-bloga.html#mes 
NMitra
    Первое http://shpargalkablog.ru/2015/07/hash-scrolling.html 
Анонимный
    Всем салют!Подскажите,как в календаре(на 12 мес который) сделать не три месяца в столбце,а пять,хотя бы 
NMitra
    Здравствуйте, на 5 плохо - получится что два месяца будут отшельниками. Вот по 4-ре месяца (тег tr чтоит через каждые четыре td; верхняя колонка объединяет две ячейки с помощью colspan="2")

    <table id="calendarBig">
    <thead>
    <tr><td><td colspan="2"><td>
    <tbody>
    <tr>
    <td>
    <table data-m="0">
    <thead>
    <tr><td colspan="7">Январь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="1">
    <thead>
    <tr><td colspan="7">Февраль
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="2">
    <thead>
    <tr><td colspan="7">Март
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="3">
    <thead>
    <tr><td colspan="7">Апрель
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <tr>
    <td>
    <table data-m="4">
    <thead>
    <tr><td colspan="7">Май
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="5">
    <thead>
    <tr><td colspan="7">Июнь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="6">
    <thead>
    <tr><td colspan="7">Июль
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="7">
    <thead>
    <tr><td colspan="7">Август
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <tr>
    <td>
    <table data-m="8">
    <thead>
    <tr><td colspan="7">Сентябрь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="9">
    <thead>
    <tr><td colspan="7">Октябрь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="10">
    <thead>
    <tr><td colspan="7">Ноябрь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    <td>
    <table data-m="11">
    <thead>
    <tr><td colspan="7">Декабрь
    <tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс
    <tbody>
    </table>
    </table> 
Ильнарик
    Как в календаре на 1 месяц прописать события, как в календаре на весь год? 
Анонимный
    А можно ли сделать в большом календаре, чтобы на следующий/предыдущий год открывался в новом окне со своим title и description? То же самое и для каждого месяца большого календаря? 
NMitra
    Можно создать несколько страниц и без всякого JS, только на HTML сделать календарь.
    Можно с помощью PHP, но я не разбиралась как именно. 
NMitra
    Пример https://jsfiddle.net/NMitra/LLtqjqcm/ 
yes_59
    Доброго времени суток! Во было бы замечательно если в календаре со стрелками-переключателями добавить выделение государственных праздников, а ещё прекрасней выделенным цветом например недели каникул. Работаю в школе пишу своё пространство. С ув. Александр. 
NMitra
    В календаре со стрелками вместо

    for(var i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
    }else{
    calendar += '<td>' + i;
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
    }
    }

    напишите

    for(var i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
    calendar += '<td class="today">' + i;
    }else{
    if ( // список официальных праздников
    (i == 1 && D.getMonth() == 0 && ((D.getFullYear() > 1897 && D.getFullYear() < 1930) || D.getFullYear() > 1947)) || // Новый год
    (i == 2 && D.getMonth() == 0 && D.getFullYear() > 1992) || // Новый год
    ((i == 3 || i == 4 || i == 5 || i == 6 || i == 8) && D.getMonth() == 0 && D.getFullYear() > 2004) || // Новый год
    (i == 7 && D.getMonth() == 0 && D.getFullYear() > 1990) || // Рождество Христово
    (i == 23 && D.getMonth() == 1 && D.getFullYear() > 2001) || // День защитника Отечества
    (i == 8 && D.getMonth() == 2 && D.getFullYear() > 1965) || // Международный женский день
    (i == 1 && D.getMonth() == 4 && D.getFullYear() > 1917) || // Праздник Весны и Труда
    (i == 9 && D.getMonth() == 4 && D.getFullYear() > 1964) || // День Победы
    (i == 12 && D.getMonth() == 5 && D.getFullYear() > 1990) || // День России (декларации о государственном суверенитете Российской Федерации ознаменовала окончательный Распад СССР)
    (i == 7 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 2005)) || // Октябрьская революция 1917 года
    (i == 8 && D.getMonth() == 10 && (D.getFullYear() > 1926 && D.getFullYear() < 1992)) || // Октябрьская революция 1917 года
    (i == 4 && D.getMonth() == 10 && D.getFullYear() > 2004) // День народного единства, который заменил Октябрьскую революцию 1917 года
    ) {
    calendar += '<td class="holiday">' + i;
    }else{
    calendar += '<td>' + i;
    }
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
    calendar += '<tr>';
    }
    } 
NMitra
    Про дни каникул: вместо

    calendar += '<td>' + i;

    напишите

    if (
    ((i > 27 && (i < 32)) && D.getMonth() == 11 && D.getFullYear() == 2015) || // каникулы с 28 по 31 декабря 2015 года
    ((i > 25 && (i < 32)) && D.getMonth() == 4 && D.getFullYear() == 2016) // каникулы с 25 по 31 мая 2016 года
    ) {
    calendar += '<td class="vacation" title="Каникулы">' + i;
    }else{
    calendar += '<td>' + i;
    }
NMitra
    i — это день
    D.getMonth() — это месяц - 1. Например декабрь — это 12 месяц года, тогда для него D.getMonth() равен (два символа ==) 11
    D.getFullYear() — это год, его можно не писать, тогда дата каникул в любой год будет в одно и то же время. Но я сомневаюсь, что школьники часто будут интересоваться в какое время каникулы были в прошлом году.

    i, D.getMonth() и D.getFullYear() объединены символами &&
    это условие берём в скобки и при необходимости пишем ещё одно условие, также в скобках. Условия объединяются символами ||

    И CSS: перед

    #calendar2 tbody td.today

    добавить

    #calendar2 .vacation {
    color: #919191;
    } 
yes_59
    Ok 
yes_59
    Доброго времени суток! Спасибо! Просто замечательно! Всё работает, но вот если, например неделю каникул цветом выделить, при этом не изменяя фон текущей даты или запрограммировать, например на 15 января олимпиаду (событие) и при загрузке страницы выдавать сообщение о напоминании или подтверждении этого события. С благодарностью Александр 
NMitra
    Доброе время суток: это 2015,12-1,31 сравниваемая дата 31.12.2015. Когда текущая дата будет равна сравниваемой, появится сообщение

    <script>
    if ((new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()) - new Date(2015,12-1,31))/86400000 == 0) {alert('сообщение');}
    </script> 
