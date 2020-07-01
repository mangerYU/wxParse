function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e) {
    var a = this, t = e.target.dataset.src, i = e.target.dataset.from;
    void 0 !== i && i.length > 0 && wx.previewImage({
        current: t,
        urls: a.data[i].imageUrls
    });
}

function t(e) {
    var a = this, t = e.target.dataset.from, o = e.target.dataset.idx;
    void 0 !== t && t.length > 0 && i(e, o, a, t);
}

function i(e, a, t, i) {
    var n = t.data[i];
    if (0 != n.images.length) {
        var r = n.images, d = o(e.detail.width, e.detail.height, t, i);
        r[a].width = d.imageWidth, r[a].height = d.imageheight, n.images = r;
        var s = {};
        s[i] = n, t.setData(s);
    }
}

function o(e, a, t, i) {
    var o = 0, n = 0, r = 0, d = 0, s = {};
    return wx.getSystemInfo({
        success: function(g) {
            var h = t.data[i].view.imagePadding;
            o = g.windowWidth - 2 * h, n = g.windowHeight, console.log("windowWidth" + o), e > o ? (r = o, 
            console.log("autoWidth" + r), d = r * a / e, console.log("autoHeight" + d), s.imageWidth = r, 
            s.imageheight = d) : (s.imageWidth = e, s.imageheight = a);
        }
    }), s;
}

var n = e(require("./showdown.js")), r = e(require("./html2json.js"));

module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', d = arguments[3], s = arguments[4], g = d, h = {};
        if ("html" == i) h = r.default.html2json(o, e); else if ("md" == i || "markdown" == i) {
            var l = new n.default.Converter().makeHtml(o);
            h = r.default.html2json(l, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== s && (h.view.imagePadding = s);
        var m = {};
        m[e] = h, g.setData(m), g.setData({
            canshow: g.data.canshow + 1
        }), console.log(g.data.canshow), g.wxParseImgLoad = t, g.wxParseImgTap = a;
    },
    wxParseTemArray: function(e, a, t, i) {
        for (var o = [], n = i.data, r = null, d = 0; d < t; d++) {
            var s = n[a + d].nodes;
            o.push(s);
        }
        e = e || "wxParseTemArray", (r = JSON.parse('{"' + e + '":""}'))[e] = o, i.setData(r);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", t = arguments[2];
        r.default.emojisInit(e, a, t);
    }
};