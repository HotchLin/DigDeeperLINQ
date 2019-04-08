(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{208:function(e,t,n){"use strict";n.r(t);var r=n(0),_=Object(r.a)({},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),n("blockquote",[n("p",[e._v("Source Code: "),n("a",{attrs:{href:"https://github.com/dotnet/corefx/blob/master/src/System.Linq/src/System/Linq/Join.cs",target:"_blank",rel:"noopener noreferrer"}},[e._v("Join.cs"),n("OutboundLink")],1)])]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),e._m(7),e._v(" "),e._m(8),e._v(" "),e._m(9),e._v(" "),e._m(10),e._v(" "),e._m(11),e._v(" "),e._m(12),e._v(" "),n("p",[e._v("從取值的方式可以知道其中一方沒有值是都不會成為結果的。")]),e._v(" "),e._m(13),e._v(" "),n("ul",[n("li",[e._v("Source Code: "),n("a",{attrs:{href:"https://github.com/dotnet/corefx/blob/master/src/System.Linq/tests/JoinTests.cs",target:"_blank",rel:"noopener noreferrer"}},[e._v("JoinTests"),n("OutboundLink")],1)])]),e._v(" "),e._m(14),e._m(15),e._v(" "),e._m(16),e._v(" "),e._m(17),e._v(" "),e._m(18),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/dotnet/corefx/blob/master/src/System.Linq/tests/JoinTests.cs",target:"_blank",rel:"noopener noreferrer"}},[e._v("JoinTests"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/dotnet/corefx/blob/master/src/System.Linq/src/System/Linq/Join.cs",target:"_blank",rel:"noopener noreferrer"}},[e._v("Join.cs"),n("OutboundLink")],1)])])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"join的原碼探索"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#join的原碼探索","aria-hidden":"true"}},[this._v("#")]),this._v(" Join的原碼探索")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("上一章我們講到"),t("code",[this._v("Join")]),this._v("的應用方式，在方法中設定"),t("code",[this._v("inner")]),this._v("跟"),t("code",[this._v("outer")]),this._v("及對應的鍵值就可以取得兩個資料(物件)合併的資料，現在我們來看看他是怎麼做到的吧。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"原始碼分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#原始碼分析","aria-hidden":"true"}},[this._v("#")]),this._v(" 原始碼分析")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[n("code",[e._v("Join")]),e._v("有"),n("strong",[e._v("兩個")]),e._v("公開方法，差別在於其中一個多了一個"),n("code",[e._v("Comparer")]),e._v("的參數，而這兩個公開方法的實作其實就只差在這個"),n("code",[e._v("Comparer")]),e._v("有沒有傳入"),n("code",[e._v("Iterator")]),e._v("而已，下面列出了他們的實作流程:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("判斷傳入的參數是否為空，如果是空則拋出"),t("code",[this._v("ArgumentNull")]),this._v("例外")]),this._v(" "),t("li",[this._v("如果參數皆合法，則叫用"),t("code",[this._v("JoinIterator")]),this._v("取得Join的結果")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("接下來我們來看"),t("code",[this._v("JoinIterator")]),this._v(":")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-C# extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("private static IEnumerable<TResult> JoinIterator<TOuter, TInner, TKey, TResult>(IEnumerable<TOuter> outer, IEnumerable<TInner> inner, Func<TOuter, TKey> outerKeySelector, Func<TInner, TKey> innerKeySelector, Func<TOuter, TInner, TResult> resultSelector, IEqualityComparer<TKey> comparer)\n{\n    using (IEnumerator<TOuter> e = outer.GetEnumerator())\n    {\n        if (e.MoveNext())\n        {\n            Lookup<TKey, TInner> lookup = Lookup<TKey, TInner>.CreateForJoin(inner, innerKeySelector, comparer);\n            if (lookup.Count != 0)\n            {\n                do\n                {\n                    TOuter item = e.Current;\n                    Grouping<TKey, TInner> g = lookup.GetGrouping(outerKeySelector(item), create: false);\n                    if (g != null)\n                    {\n                        int count = g._count;\n                        TInner[] elements = g._elements;\n                        for (int i = 0; i != count; ++i)\n                        {\n                            yield return resultSelector(item, elements[i]);\n                        }\n                    }\n                }\n                while (e.MoveNext());\n            }\n        }\n    }\n}\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("此"),t("code",[this._v("Iterator")]),this._v("的流程如下:")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("巡覽"),n("code",[e._v("outer")]),e._v("的每個元素")]),e._v(" "),n("li",[e._v("取得以"),n("code",[e._v("inner")]),e._v("鍵值分組的"),n("code",[e._v("inner")]),e._v("元素的"),n("code",[e._v("Grouping")])]),e._v(" "),n("li",[e._v("用"),n("code",[e._v("outer")]),e._v("的鍵值去"),n("code",[e._v("inner")]),e._v("的"),n("code",[e._v("Grouping")]),e._v("中查找是否有相同的鍵值組別")]),e._v(" "),n("li",[e._v("有的話將目前的"),n("code",[e._v("outer")]),e._v("及"),n("code",[e._v("inner")]),e._v("傳給"),n("code",[e._v("resultSelector")]),e._v("取得結果回傳")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("這裡我們看到了一個熟悉的身影，就是上次介紹"),n("code",[e._v("GroupBy")]),e._v("的時候有講解的"),n("code",[e._v("Lookup")]),e._v("，它的功用是可以將相同鍵值的物件整理到同一個"),n("code",[e._v("Grouping")]),e._v("物件中，這裡它將"),n("code",[e._v("inner")]),e._v("分組，"),n("code",[e._v("outer")]),e._v("再使用它查找對應的鍵值，藉以取得對應的資料。")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("這裡也可以看出因為外層是巡覽"),n("code",[e._v("outer")]),e._v("，"),n("code",[e._v("outer")]),e._v("找到"),n("code",[e._v("inner")]),e._v("後才依序輸出"),n("code",[e._v("outer")]),e._v("跟"),n("code",[e._v("inner")]),e._v("的資料，所以資料排序會是"),n("code",[e._v("outer")]),e._v("後才是"),n("code",[e._v("inner")]),e._v("。")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("最後這段實作告訴我們"),n("code",[e._v("Join")]),e._v("這個方法確實是"),n("strong",[e._v("Inner Join")]),e._v("的實作，原因可以從"),n("code",[e._v("inner")]),e._v("跟"),n("code",[e._v("outer")]),e._v("取值的方式知道:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("code",[this._v("inner")]),this._v("依鍵值分組")]),this._v(" "),t("li",[t("code",[this._v("outer")]),this._v("依"),t("code",[this._v("inner")]),this._v("組別取得對應的資料")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"測試案例賞析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#測試案例賞析","aria-hidden":"true"}},[this._v("#")]),this._v(" 測試案例賞析")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language-C# extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("[Fact]\npublic void SelectorsReturnNull()\n{\n    int?[] inner = { null, null, null };\n    int?[] outer = { null, null };\n    Assert.Empty(outer.Join(inner, e => e, e => e, (x, y) => x));\n}\n")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("如果是"),n("code",[e._v("null")]),e._v("跟"),n("code",[e._v("null")]),e._v("做"),n("code",[e._v("Join")]),e._v("的話，還是會得到"),n("strong",[e._v("空")]),e._v("。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"結語"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#結語","aria-hidden":"true"}},[this._v("#")]),this._v(" 結語")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("這篇的篇幅比較短，真正複雜的分組("),n("code",[e._v("Lookup")]),e._v(")已經在介紹"),n("code",[e._v("GroupBy")]),e._v("的時候講解了，這裡就是利用"),n("code",[e._v("Lookup")]),e._v("來取得對應的資料，明天我們來介紹另一個"),n("code",[e._v("Join")]),e._v(": "),n("code",[e._v("GroupJoin")]),e._v("。")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"參考"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#參考","aria-hidden":"true"}},[this._v("#")]),this._v(" 參考")])}],!1,null,null,null);t.default=_.exports}}]);