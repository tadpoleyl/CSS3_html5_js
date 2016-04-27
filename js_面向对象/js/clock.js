function clock(id, x, y, radius, w, h) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");
    this.canvas.setAttribute("width", w);
    this.canvas.setAttribute("height", h);
    this.Line();
    this.init();
};
clock.prototype.arc = function () {//画圆
    this.context.clearRect(0, 0, this.w, this.h);
    this.context.strokeStyle = "purple";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.stroke();
};
clock.prototype.minute = function () {
    this.arc();
    for (var i = 0; i < 60; i++) {
        if (i % 5 === 0) continue;
        this.context.save();
        this.context.lineWidth = 1;
        this.context.strokeStyle = "#000";
        this.context.translate(this.x, this.y);
        this.context.rotate(i * 6 * Math.PI / 180);
        this.context.beginPath();
        this.context.moveTo(0, -this.radius);
        this.context.lineTo(0, -this.radius + 10);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    };
};
clock.prototype.clocks = function () {
    this.minute();
    for (var i = 0; i < 12; i++) {
        this.context.save();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#000";
        this.context.translate(this.x, this.y);
        this.context.rotate(i * 30 * Math.PI / 180);
        this.context.beginPath();
        this.context.moveTo(0, -this.radius);
        this.context.lineTo(0, -this.radius+15);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    };
};
clock.prototype.Line = function () {
    this.clocks();
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = hour > 12 ? hour - 12 : hour;
    //时钟线
    this.context.save();
    this.context.lineWidth = 4;
    this.context.strokeStyle = "pink";
    this.context.translate(this.x, this.y);
    this.context.rotate(hour * 30 * Math.PI / 180);
    this.context.beginPath();
    this.context.moveTo(0, -this.radius+40);
    this.context.lineTo(0, 10);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();
    //分钟线
    this.context.save();
    this.context.lineWidth = 2;
    this.context.strokeStyle = "#b200ff";
    this.context.translate(this.x, this.y);
    this.context.rotate(min * 6 * Math.PI / 180);
    this.context.beginPath();
    this.context.moveTo(0, -this.radius+20);
    this.context.lineTo(0, 10);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();

    //秒钟线
    this.context.save();
    this.context.lineWidth = 1;
    this.context.strokeStyle = "red";
    this.context.translate(this.x, this.y);
    this.context.rotate(sec * 6 * Math.PI / 180);
    this.context.beginPath();
    this.context.moveTo(0, -this.radius+10);
    this.context.lineTo(0, 10);
    this.context.closePath();
    this.context.stroke();
    this.context.restore();

};
clock.prototype.init = function () {
    var _this = this;
    setInterval(function () {
        _this.Line();
    }, 1000);
};
$.extend({
    clockInit: function (id,x,y,radius,w,h) {
        return new clock(id, x, y, radius, w, h);
    }
});