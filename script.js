// Code goes here

var game = new Phaser.Game(800, 400, Phaser.AUTO, 'test', null, true, false)



var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var isoGroup, cursorPos, cursor;

var dataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAoCAYAAABD0IyuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc3MzlDNkQyRUI4MTFFNDgxRTRCN0IzNEY1Q0Q4QzEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzc3MzlDNkMyRUI4MTFFNDgxRTRCN0IzNEY1Q0Q4QzEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJGNDYzRjMxMTQ0NTExRTRBNDY3QjQyMDRBOTQ4MjhCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJGNDYzRjMyMTQ0NTExRTRBNDY3QjQyMDRBOTQ4MjhCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zFgK7gAAARBJREFUeNrs10EOgyAQBVBpPImeRM4FK72XJ5GrtIkJC0xpoQwzSP/fIIZEIC8DqkE+z8h7JTkphY1p5+PBRhzH8XbQPM+ic30MiJiYJCHfwi0IYhjFkAiRFgQxFcWwCOEWBDGEYpoQUlsQxBSIuYUQakEQkyGmCyGlgiDmg5i/EJIrCGIiGf2DMeZsp2kKBjjnulz4dZ3Lspztvu8QkyTGx1ob9Nd17ULQVYjWGjdfklPJ15pY7iIoV4ivLRBTevO9i6BSIbj51vq7bkUQtRCcSoRimhBUWwjEVBTDIohbCMQwiiEVJCUEYgTF/CTIy4lJqS0EYhIzcqvcti1JELcQiGmoxmTVoFbmho2J5CXAAAxleSAfRNOmAAAAAElFTkSuQmCC"

var test = document.getElementById('cube');


BasicGame.Boot.prototype =
{
  preload: function () {
    var data = new Image();
    data.src = dataURI;
    game.cache.addImage('tile', dataURI, data);
    game.cache.addImage('cube', test.src, test);
    game.time.advancedTiming = true;

    // Add and enable the plug-in.
    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    game.iso.anchor.setTo(0.5, 0);

    game.load.spritesheet('bubble-border', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbAgMAAADwuhzGAAAADFBMVEUAAAD///8AAADMzMyl8w72AAAAAXRSTlMAQObYZgAAADlJREFUCNdjYGDQWrWqgQGT5poaGpqFSTMtDQWCFRj0PyrR/3+B7cGgmf+/AroLk2bg////AwMGDQCR0FKxG5KiwAAAAABJRU5ErkJggg==', 9, 9);
        game.load.image('bubble-tail', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAADFBMVEUAAAAAAAD////MzMyoZCTaAAAAAXRSTlMAQObYZgAAAC1JREFUCNdjCA3NWrXUAY36/xULxYyN+hu1amUAAyYVwoBBhYYyYFDh/w9gUADQUTeozcOYAwAAAABJRU5ErkJggg==');
        game.load.bitmapFont('8bitoperator', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAABF9JREFUSMftlEur00AUx6cI0UXqxd0UpXXh0sWEgShYLCgIih9iSmC6SW/FC1Kx1kdFXRTrzoZC1W8gBLrxlVBINxOzkwbxUQJ1c9WWQL0XveqZpFyrH0E8q5nfnMd/zpkEEebeua2eOHGC5Hp6pUVQvRyJIL++vo61nm56GIlYr1g2Sk11EMp05arIi8V6HIvcM3TZmlYe9jmY38u0c10kHM8cU37pN2AJaKYgBEASsC7BRAK/65nvKefNpv8tc6eTgNq4tEx6HWqKmQxZgtZu0iKAy73YWysm0t/b6G9TxVDrM7hoG+W6jKsKFgalrD6PBNK6jqGo0ivf8OG+y5CmmH+8zmUs8nvkS9hnfo/muZhHbQnMnC0BBSXaKtjD/a52fQkaAArct+ZtdLlHapbNrkJIIwnRpMdLlgUAcRCi7eYosMY8dgDoAJp10JFKIvMoCGiydBiH66emrClMMMcAUC+H4RvdyLWZAB84E/HGxobOctcJmn8YdY4jP4lSx5RA0WQMmWgyiURoY4FTEFNKdVOC7XjtvRwDAGIGVAVtKsbIt6TLpiOBrsrJfUtCPKqI7cXeThFdbklQEQWlkWrMWbE2iT7I5Z4pnXGkzhJeuPPowFDXywtYs2H5JyUiig19wBgSjnubEkqFZxi6PZzCsCGYXBv43mQ0GCgcnmH0aoNQPRhFLd32OLoQ65yepPqrEY/1AefQQgAzmYMblCfg2JSSa08OBZ4RGZAUPBSoUnhwd88TBJaGlGiilJj4MNKsKKjDDWy+0wJAUH0GlT9uhjbPtugXSza0uB1rbQliaFwbNW/ypLt9noMZvlHQwoNXcKMdtouatTDfqWjxmfldFzxwuQseGC1+bG3PypADuxASPkGXXjMXcgQUu1a0GT5CupcAj+KdpHcAuGtN7iSPI6/sbAH47nZB241o1KH7HQwAjijXWnKceQBgnxUAUmZL3yJo61umBSDT07PuPa4SJD+sNfDoVYLhHq6yBOT6vNzT1z3aFBLszcBX6UIOAQNferQbPlQZ55V6CtZKzG8Zo4dSXVpFZfVE6SHnDHIOgg7YxATaSBwBAO50srnTI6BUm3dl94MOZS6At3ZjiFF9PoUj5rZI9aFNPAxV9AQ8ndUO2mSYgjFtbPdI1bKJKx+uXutCDuBplfpWZXO8BH1y4QwS2JM5nJiKUCqFEMUMXzQdud7byfPkH9SBTSngxwRMGKYvD4tlXh0MTBcAGDXrpwwFQC0A8PF5Z8O8ZSmlT+CRA1B+4tHsxccqzwII7SIATrPnHmNetXml08cJyFy0SMm3OUNgElTPnTKQtH3VQQLMW8XT6pAb+w8twVHoqFIeDg/qR+7LKlfOI+wZx+adN8bZw+jrcxCuYuFJD5Ta2nsV5doyh9yJ+ZSFL5uqszyVLSxbbaSwXdCiQ6ziXQck4sxtjFbBQSpwCRYrOWpj1PgNGlAFFdAfpnjOym4nHpjmKlAVCFm17Az9t3/TfgG1wI+/NyjOhQAAAABJRU5ErkJggg==', null, '<?xml version="1.0"?><font><info face="8bitoperator" size="11" bold="0" italic="0" charset="" unicode="1" stretchH="100" smooth="0" aa="0" padding="0,0,0,0" spacing="1,1" outline="0"/><common lineHeight="16" base="13" scaleW="128" scaleH="128" pages="1" packed="0" alphaChnl="0" redChnl="4" greenChnl="4" blueChnl="4"/><pages><page id="0" file="8bitoperator.png" /></pages><chars count="179"><char id="32" x="124" y="23" width="1" height="1" xoffset="0" yoffset="0" xadvance="6" page="0" chnl="15" /><char id="33" x="124" y="13" width="2" height="9" xoffset="1" yoffset="4" xadvance="4" page="0" chnl="15" /><char id="34" x="113" y="84" width="5" height="4" xoffset="1" yoffset="4" xadvance="7" page="0" chnl="15" /><char id="35" x="49" y="38" width="8" height="9" xoffset="1" yoffset="4" xadvance="10" page="0" chnl="15" /><char id="36" x="7" y="0" width="6" height="13" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="37" x="57" y="78" width="7" height="8" xoffset="1" yoffset="5" xadvance="9" page="0" chnl="15" /><char id="38" x="85" y="37" width="7" height="9" xoffset="1" yoffset="4" xadvance="9" page="0" chnl="15" /><char id="39" x="122" y="84" width="2" height="4" xoffset="1" yoffset="4" xadvance="4" page="0" chnl="15" /><char id="40" x="123" y="66" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="41" x="15" y="80" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="42" x="77" y="85" width="7" height="5" xoffset="1" yoffset="6" xadvance="9" page="0" chnl="15" /><char id="43" x="92" y="85" width="6" height="5" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="44" x="119" y="84" width="2" height="4" xoffset="1" yoffset="11" xadvance="4" page="0" chnl="15" /><char id="45" x="49" y="95" width="5" height="1" xoffset="1" yoffset="8" xadvance="7" page="0" chnl="15" /><char id="46" x="125" y="84" width="2" height="2" xoffset="1" yoffset="11" xadvance="4" page="0" chnl="15" /><char id="47" x="101" y="25" width="6" height="10" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="48" x="84" y="57" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="49" x="25" y="79" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="50" x="91" y="57" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="51" x="98" y="56" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="52" x="105" y="56" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="53" x="112" y="56" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="54" x="77" y="57" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="55" x="119" y="56" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="56" x="0" y="70" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="57" x="7" y="70" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="58" x="56" y="87" width="2" height="7" xoffset="1" yoffset="6" xadvance="4" page="0" chnl="15" /><char id="59" x="33" y="79" width="2" height="9" xoffset="1" yoffset="6" xadvance="4" page="0" chnl="15" /><char id="60" x="117" y="66" width="5" height="9" xoffset="1" yoffset="4" xadvance="7" page="0" chnl="15" /><char id="61" x="7" y="98" width="5" height="3" xoffset="1" yoffset="7" xadvance="7" page="0" chnl="15" /><char id="62" x="122" y="46" width="5" height="9" xoffset="1" yoffset="4" xadvance="7" page="0" chnl="15" /><char id="63" x="14" y="70" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="64" x="58" y="37" width="8" height="9" xoffset="1" yoffset="4" xadvance="10" page="0" chnl="15" /><char id="65" x="21" y="69" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="66" x="28" y="69" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="67" x="35" y="69" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="68" x="42" y="68" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="69" x="49" y="68" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="70" x="56" y="68" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="71" x="63" y="67" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="72" x="70" y="67" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="73" x="20" y="80" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="74" x="77" y="67" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="75" x="84" y="67" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="76" x="14" y="60" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="77" x="8" y="50" width="7" height="9" xoffset="1" yoffset="4" xadvance="9" page="0" chnl="15" /><char id="78" x="91" y="67" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="79" x="98" y="66" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="80" x="24" y="49" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="81" x="0" y="27" width="6" height="11" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="82" x="31" y="49" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="83" x="38" y="48" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="84" x="45" y="48" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="85" x="52" y="48" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="86" x="59" y="47" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="87" x="101" y="36" width="7" height="9" xoffset="1" yoffset="4" xadvance="9" page="0" chnl="15" /><char id="88" x="66" y="47" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="89" x="73" y="47" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="90" x="80" y="47" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="91" x="10" y="80" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="92" x="73" y="26" width="6" height="10" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="93" x="5" y="80" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="94" x="105" y="84" width="7" height="4" xoffset="1" yoffset="3" xadvance="9" page="0" chnl="15" /><char id="95" x="43" y="96" width="5" height="1" xoffset="0" yoffset="14" xadvance="5" page="0" chnl="15" /><char id="96" x="32" y="97" width="3" height="2" xoffset="1" yoffset="3" xadvance="5" page="0" chnl="15" /><char id="97" x="107" y="76" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="98" x="87" y="47" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="99" x="14" y="90" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="100" x="101" y="46" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="101" x="100" y="76" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="102" x="105" y="66" width="5" height="9" xoffset="1" yoffset="4" xadvance="7" page="0" chnl="15" /><char id="103" x="109" y="36" width="7" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="104" x="108" y="46" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="105" x="122" y="25" width="4" height="10" xoffset="1" yoffset="3" xadvance="6" page="0" chnl="15" /><char id="106" x="21" y="14" width="6" height="12" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="107" x="115" y="46" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="108" x="0" y="80" width="4" height="9" xoffset="1" yoffset="4" xadvance="6" page="0" chnl="15" /><char id="109" x="76" y="77" width="8" height="7" xoffset="1" yoffset="6" xadvance="10" page="0" chnl="15" /><char id="110" x="93" y="77" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="111" x="114" y="76" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="112" x="0" y="60" width="6" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="113" x="7" y="60" width="6" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="114" x="35" y="89" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="115" x="7" y="90" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="116" x="111" y="66" width="5" height="9" xoffset="1" yoffset="4" xadvance="7" page="0" chnl="15" /><char id="117" x="0" y="90" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="118" x="121" y="76" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="119" x="85" y="77" width="7" height="7" xoffset="1" yoffset="6" xadvance="9" page="0" chnl="15" /><char id="120" x="21" y="90" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="121" x="94" y="46" width="6" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="122" x="28" y="89" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="123" x="21" y="59" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="124" x="30" y="79" width="2" height="9" xoffset="1" yoffset="4" xadvance="4" page="0" chnl="15" /><char id="125" x="28" y="59" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="126" x="13" y="98" width="7" height="2" xoffset="1" yoffset="7" xadvance="9" page="0" chnl="15" /><char id="160" x="126" y="56" width="1" height="1" xoffset="0" yoffset="0" xadvance="6" page="0" chnl="15" /><char id="161" x="125" y="36" width="2" height="9" xoffset="1" yoffset="6" xadvance="4" page="0" chnl="15" /><char id="162" x="35" y="59" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="163" x="16" y="49" width="7" height="9" xoffset="1" yoffset="4" xadvance="9" page="0" chnl="15" /><char id="165" x="42" y="58" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="166" x="36" y="79" width="2" height="9" xoffset="1" yoffset="4" xadvance="4" page="0" chnl="15" /><char id="168" x="21" y="98" width="6" height="2" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="169" x="48" y="78" width="8" height="8" xoffset="1" yoffset="5" xadvance="10" page="0" chnl="15" /><char id="171" x="59" y="87" width="8" height="5" xoffset="1" yoffset="6" xadvance="10" page="0" chnl="15" /><char id="172" x="0" y="98" width="6" height="3" xoffset="1" yoffset="8" xadvance="8" page="0" chnl="15" /><char id="174" x="39" y="79" width="8" height="8" xoffset="1" yoffset="5" xadvance="10" page="0" chnl="15" /><char id="176" x="99" y="85" width="5" height="5" xoffset="1" yoffset="3" xadvance="7" page="0" chnl="15" /><char id="177" x="42" y="88" width="6" height="7" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="180" x="28" y="97" width="3" height="2" xoffset="1" yoffset="3" xadvance="5" page="0" chnl="15" /><char id="181" x="49" y="58" width="6" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="182" x="0" y="50" width="7" height="9" xoffset="1" yoffset="4" xadvance="9" page="0" chnl="15" /><char id="183" x="40" y="97" width="2" height="2" xoffset="1" yoffset="7" xadvance="4" page="0" chnl="15" /><char id="184" x="36" y="97" width="3" height="2" xoffset="1" yoffset="13" xadvance="5" page="0" chnl="15" /><char id="187" x="68" y="85" width="8" height="5" xoffset="1" yoffset="6" xadvance="10" page="0" chnl="15" /><char id="191" x="56" y="58" width="6" height="9" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="192" x="73" y="0" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="193" x="42" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="194" x="42" y="0" width="6" height="13" xoffset="1" yoffset="0" xadvance="8" page="0" chnl="15" /><char id="195" x="65" y="0" width="7" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="196" x="87" y="0" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="197" x="28" y="0" width="6" height="13" xoffset="1" yoffset="0" xadvance="8" page="0" chnl="15" /><char id="198" x="38" y="38" width="10" height="9" xoffset="1" yoffset="4" xadvance="12" page="0" chnl="15" /><char id="199" x="108" y="0" width="6" height="12" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="200" x="28" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="201" x="49" y="13" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="202" x="35" y="0" width="6" height="13" xoffset="1" yoffset="0" xadvance="8" page="0" chnl="15" /><char id="203" x="94" y="0" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="204" x="122" y="0" width="4" height="12" xoffset="1" yoffset="1" xadvance="6" page="0" chnl="15" /><char id="205" x="77" y="13" width="4" height="12" xoffset="1" yoffset="1" xadvance="6" page="0" chnl="15" /><char id="206" x="14" y="0" width="6" height="13" xoffset="0" yoffset="0" xadvance="6" page="0" chnl="15" /><char id="207" x="101" y="0" width="6" height="12" xoffset="0" yoffset="1" xadvance="6" page="0" chnl="15" /><char id="208" x="93" y="36" width="7" height="9" xoffset="0" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="209" x="57" y="0" width="7" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="210" x="63" y="13" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="211" x="80" y="0" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="212" x="0" y="0" width="6" height="13" xoffset="1" yoffset="0" xadvance="8" page="0" chnl="15" /><char id="213" x="49" y="0" width="7" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="214" x="70" y="13" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="215" x="85" y="85" width="6" height="5" xoffset="1" yoffset="7" xadvance="8" page="0" chnl="15" /><char id="216" x="67" y="37" width="8" height="9" xoffset="0" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="217" x="35" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="218" x="14" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="219" x="21" y="0" width="6" height="13" xoffset="1" yoffset="0" xadvance="8" page="0" chnl="15" /><char id="220" x="7" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="221" x="0" y="14" width="6" height="12" xoffset="1" yoffset="1" xadvance="8" page="0" chnl="15" /><char id="222" x="63" y="57" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="223" x="70" y="57" width="6" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="224" x="87" y="25" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="225" x="94" y="25" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="226" x="110" y="13" width="6" height="11" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="227" x="14" y="27" width="7" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="228" x="45" y="27" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="229" x="82" y="13" width="6" height="11" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="230" x="65" y="77" width="10" height="7" xoffset="1" yoffset="6" xadvance="12" page="0" chnl="15" /><char id="231" x="59" y="26" width="6" height="10" xoffset="1" yoffset="6" xadvance="8" page="0" chnl="15" /><char id="232" x="108" y="25" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="233" x="21" y="38" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="234" x="7" y="27" width="6" height="11" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="235" x="115" y="25" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="236" x="33" y="38" width="4" height="10" xoffset="1" yoffset="3" xadvance="6" page="0" chnl="15" /><char id="237" x="28" y="38" width="4" height="10" xoffset="1" yoffset="3" xadvance="6" page="0" chnl="15" /><char id="238" x="117" y="13" width="6" height="11" xoffset="0" yoffset="2" xadvance="6" page="0" chnl="15" /><char id="239" x="0" y="39" width="6" height="10" xoffset="0" yoffset="3" xadvance="6" page="0" chnl="15" /><char id="240" x="117" y="36" width="7" height="9" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="241" x="22" y="27" width="7" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="242" x="7" y="39" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="243" x="14" y="38" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="244" x="103" y="13" width="6" height="11" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="245" x="30" y="27" width="7" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="246" x="38" y="27" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="247" x="49" y="87" width="6" height="7" xoffset="1" yoffset="5" xadvance="8" page="0" chnl="15" /><char id="248" x="76" y="37" width="8" height="9" xoffset="0" yoffset="5" xadvance="8" page="0" chnl="15" /><char id="249" x="52" y="26" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="250" x="66" y="26" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="251" x="96" y="13" width="6" height="11" xoffset="1" yoffset="2" xadvance="8" page="0" chnl="15" /><char id="252" x="80" y="26" width="6" height="10" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="253" x="115" y="0" width="6" height="12" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /><char id="254" x="89" y="13" width="6" height="11" xoffset="1" yoffset="4" xadvance="8" page="0" chnl="15" /><char id="255" x="56" y="13" width="6" height="12" xoffset="1" yoffset="3" xadvance="8" page="0" chnl="15" /></chars></font>');


  },
  create: function () {

    // Create a group for our tiles.
    isoGroup = game.add.group();
    bubble = game.world.add(new SpeechBubble(game, 180, 190, 100, "Lets move forwards"));
    // Let's make a load of tiles on a grid.
    this.spawnTiles();

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

    winTriggered = false;


  },
  update: function () {
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    game.iso.unproject(game.input.activePointer.position, cursorPos);

    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    // isoGroup.forEach(function (tile) {
    //     var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
    //     // If it does, do a little animation and tint change.
    //     if (!tile.selected && inBounds) {
    //         tile.selected = true;
    //         tile.tint = 0x86bfda;
    //         game.add.tween(tile).to({ isoZ: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
    //     }
    //     // If not, revert back to how it was.
    //     else if (tile.selected && !inBounds) {
    //         tile.selected = false;
    //         tile.tint = 0xffffff;
    //         game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, false);
    //     }
    // });
    if(!game.tweens.isTweening(bubble)){
      game.add.tween(bubble).to({ x: player.x, y: player.y-19}, 140, Phaser.Easing.Linear.None, true);
    }

    if(!game.tweens.isTweening(player)){
      var currentTileX = ((player.isoX-50)/38);
      var currentTileY = ((player.isoY-50)/38);


      var nextPosX = player.isoX, nextPosY = player.isoY, moved = false;

      if (this.cursors.down.isDown) {
        console.log(bubble)
        nextPosX = player.isoX + 38;
        nextPosY = player.isoY;
        moved = true;
      } else if (this.cursors.up.isDown) {
        nextPosX = player.isoX - 38;
        nextPosY = player.isoY;
        moved = true;
      } else if (this.cursors.right.isDown) {
        nextPosX = player.isoX;
        nextPosY = player.isoY - 38;
        moved = true;
      } else if (this.cursors.left.isDown) {
        nextPosX = player.isoX;
        nextPosY = player.isoY +  38;
        moved = true;
      }


      if(this.checkTile(currentTileX, currentTileY) === 0) {
        game.add.tween(player).to({ isoZ :player.isoZ-100}, 500, Phaser.Easing.Linear.None, true);
        game.iso.simpleSort(isoGroup);
        moved = false;
      } else if(this.checkTile(currentTileX, currentTileY) === 3) {
        if(!winTriggered) {
          bubble.kill();
          bubble = game.world.add(new SpeechBubble(game, 180, 190, 100, "We Won!"));
          bubble.x = player.x;
  bubble.y = player.y;
          winTriggered = true;
        }
        moved = false;
      }

      if(moved) {

        game.add.tween(player).to({ isoX: nextPosX, isoY: nextPosY}, 200, Phaser.Easing.Quadratic.InOut, true);
      }
    }
  },
  render: function () {
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
  },
  spawnTiles: function () {

    layout = [[2, 2, 2, 2, 2, 1, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 0, 1],
    [0, 0, 0, 0, 2, 1, 1],
    [0, 0, 0, 0, 3, 1, ],
  ];
  var tile;
  for (var y = 0; y < layout.length; y++) {
    for (var x = 0; x < layout[y].length; x++) {
      // Create a tile using the new game.add.isoSprite factory method at the specified position.
      // The last parameter is the group you want to add it to (just like game.add.sprite)
      if(layout[y][x] > 0) {
        tile = game.add.isoSprite((x*38)+50, (y*38)+50, 0, 'tile', 0, isoGroup);
      }
      if(layout[y][x] === 2){
        tile.tint = 0x86bfda;
      }
      if(layout[y][x] === 3){
        tile.tint = 0x00FF00;
      }
      tile.anchor.set(0.5, 0);
    }
  }

  player = game.add.isoSprite(50, 50, 1, 'cube', 0, isoGroup);
  player.tint = 0x86bfda;
  player.anchor.set(0.5);
  bubble.x = player.x;
  bubble.y = player.y;

  this.cursors = game.input.keyboard.createCursorKeys();

  this.game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN,
    Phaser.Keyboard.SPACEBAR
  ]);
},

checkTile : function(x,y) {
  if((x < 0 || y < 0)) {
    return 0;
  }

  if(layout[y] !== undefined) {
    if(layout[y][x] === undefined) {
      return 0;
    } else if(layout[y][x] === 0){
      return 0;
    } else {
      return layout[y][x];
    }
  } else {
    return 0;
  }
}
};

var SpeechBubble = function(game, x, y, width, text) {
    Phaser.Sprite.call(this, game, x, y);

    // Some sensible minimum defaults
    width = width || 27;
    var height = 18;

    // Set up our text and run our custom wrapping routine on it
    this.bitmapText = game.make.bitmapText(x + 12, y + 4, '8bitoperator', text, 12);
    SpeechBubble.wrapBitmapText(this.bitmapText, width);

    // Calculate the width and height needed for the edges
    var bounds = this.bitmapText.getLocalBounds();
    if (bounds.width + 18 > width) {
        width = bounds.width + 18;
    }
    if (bounds.height + 14 > height) {
        height = bounds.height + 14;
    }

    // Create all of our corners and edges
    this.borders = [
        game.make.tileSprite(x + 9, y + 9, width - 9, height - 9, 'bubble-border', 4),
        game.make.image(x, y, 'bubble-border', 0),
        game.make.image(x + width, y, 'bubble-border', 2),
        game.make.image(x + width, y + height, 'bubble-border', 8),
        game.make.image(x, y + height, 'bubble-border', 6),
        game.make.tileSprite(x + 9, y, width - 9, 9, 'bubble-border', 1),
        game.make.tileSprite(x + 9, y + height, width - 9, 9, 'bubble-border', 7),
        game.make.tileSprite(x, y + 9, 9, height - 9, 'bubble-border', 3),
        game.make.tileSprite(x + width, y + 9, 9, height - 9, 'bubble-border', 5)
    ];

    // Add all of the above to this sprite
    for (var b = 0, len = this.borders.length; b < len; b++) {
        this.addChild(this.borders[b]);
    }

    // Add the tail
    this.tail = this.addChild(game.make.image(x + 18, y + 3 + height, 'bubble-tail'));

    // Add our text last so it's on top
    this.addChild(this.bitmapText);
    this.bitmapText.tint = 0x111111;

    // Offset the position to be centered on the end of the tail
    this.pivot.set(x + 25, y + height + 24);
};

SpeechBubble.prototype = Object.create(Phaser.Sprite.prototype);
SpeechBubble.prototype.constructor = SpeechBubble;

SpeechBubble.wrapBitmapText = function (bitmapText, maxWidth) {
    var words = bitmapText.text.split(' '), output = "", test = "";

    for (var w = 0, len = words.length; w < len; w++) {
        test += words[w] + " ";
        bitmapText.text = test;
        bitmapText.updateText();
        if (bitmapText.textWidth > maxWidth) {
            output += "\n" + words[w] + " ";
        }
        else {
            output += words[w] + " ";
        }
        test = output;
    }

    output = output.replace(/(\s)$/gm, ""); // remove trailing spaces
    bitmapText.text = output;
    bitmapText.updateText();
}


game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
