/*
 * ガントチャート表示のサンプルプログラム
 * Copyright (c) 2013 Cybozu
 * 
 * Licensed under the MIT License
 * 
 * https://developers.cybozu.com/ja/tutorial/sample3.html
 *
 */ 
 
 /*
 * Copied & Modified by Ryu Yamashita
 *
 * 【注意】
 * 　・利用に際しては上記オリジナルサイトをご一読ください
 * 　・ガントチャートライブラリの読み込みにRawGitを利用していますので、CDNとしての継続性等には各自ご注意ください
 * 
 */
 
(function () {
 
    "use strict";
    function loadCSS(href) {
        document.write('<link rel="stylesheet" type="text/css" href="' + href + '" />');
    }
 
    function loadJS(src) {
        document.write('<script type="text/javascript" src="' + src + '"></script>');
    }
 
    function convertDateTime(str) {
        return '/Date(' + (new Date(str)).getTime() + ')/';
    }
 
    // レコード一覧表示時のイベント処理
    kintone.events.on('app.record.index.show', function(event){
 
        // レコード一覧のメニューの下側の空白部分の要素を取得する
        var elSpace = kintone.app.getHeaderSpaceElement();
 
        // スタイルを調整する
        elSpace.style.marginRight = '26px';
        elSpace.style.border = 'solid 1px #ccc';
 
        // ガントチャートのエレメントを検索する
        var elGantt = document.getElementById ('gantt')
 
        // エレメントがない場合、ガントチャートのエレメントを作成する
        if (elGantt === null) {
          elGantt = document.createElement('div');
          elGantt.id = 'gantt';
          elSpace.appendChild(elGantt);
        }
 
        var records = event.records;
        var source = [];
        for (var i = 0; i < records.length; i++) {
            var r = records[i];
            var obj = {
                name: r['To_Do']['value'],
                desc: r['Details']['value'],
                values: [{
                    from: convertDateTime(r['From']['value']),
                    to: convertDateTime(r['To']['value']),
                    label: r['To_Do']['value'],
                    customClass: 'gantt' + r['Color']['value']
                }]
            };
            source.push(obj);
        }
 
        $(elGantt).gantt({
            source: source,
            navigate: "scroll",
            scale: "days",
            maxScale: "months",
            minScale: "days",
            left: "70px",
            itemsPerPage: 20
        });
     });
 
     // jQuery.Gantt の CSS ファイル
     loadCSS("https://rawgit.com/taitems/jQuery.Gantt/master/css/style.css");
     // jQuery の JavaScript ファイル
     loadJS("https://rawgit.com/taitems/jQuery.Gantt/master/js/jquery.min.js");
     // jQuery.Gantt の JavaScript ファイル
     loadJS("https://rawgit.com/taitems/jQuery.Gantt/master/js/jquery.fn.gantt.min.js");
                
})();