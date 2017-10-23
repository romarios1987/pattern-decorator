var randomDate = function randomDate(start, end) {
    var rand = Math.random();
    var date = new Date(start.getTime() + rand * (end.getTime() - start.getTime()));
    var currentDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    return currentDate;
};

function User() {
    this.lastVisitDate = randomDate(new Date(2017, 6, 1), new Date());
    this.globalDiscount = Math.round(Math.random() * 5) + 2;
    this.nightDiscount = Math.round(Math.random() * 10);
    this.weekendDiscount = Math.round(Math.random() * 10);
    this.ordersCount = Math.round(Math.random() * 10);
    this.ordersTotalPrice = Math.round(Math.random() * 1000) + 100.99;
    this.bonus = Math.round(Math.random() * 10) + 5;

    this.getDiscount = function () {
        var nowDate = new Date();
        var totalDiscount = 0;
        if (nowDate.getHours >= 23 || nowDate.getHours <= 5) {
            totalDiscount += this.nightDiscount;
        }
        if (nowDate.getDay() >= 1 && nowDate.getDay() <= 5) {
            totalDiscount += this.globalDiscount;
        }
        if (nowDate.getDay() == 0 && nowDate.getDay() == 6) {
            totalDiscount += this.weekendDiscount;
        }
        return totalDiscount;
    };

    this.getBonus = function () {
        var bonus = 0;
        var nowDate = Date.parse(new Date());
        var tenDaysLater = nowDate - 1000 * 60 * 60 * 24 * 10;
        var lastVisitDate = Date.parse(new Date(this.lastVisitDate));
        if (lastVisitDate > tenDaysLater && lastVisitDate < nowDate) {
            bonus += this.bonus;
        }
        bonus += this.ordersCount;
        return bonus;
    }
}

//var dataTable = document.querySelector('table.data-table tbody');
var arr = [];
for (var i = 0; i < 5; i++) {
    arr[i] = new User();
}

var dataTable = document.querySelector('table.data-table tbody');
arr.forEach(function (item) {
    var tr = document.createElement('tr');

    var tdLastVisit = document.createElement('td');
    tdLastVisit.setAttribute('data-name', 'last-visit');
    tdLastVisit.innerText = item.lastVisitDate;
    dataTable.appendChild(tr);
    tr.appendChild(tdLastVisit);

    var tdGlobalDiscount = document.createElement('td');
    tdGlobalDiscount.setAttribute('data-name', 'global-discount');
    tdGlobalDiscount.innerText = item.globalDiscount + "%";
    tr.appendChild(tdGlobalDiscount);

    var tdNightDiscount = document.createElement('td');
    tdNightDiscount.setAttribute('data-name', 'night-discount');
    tdNightDiscount.innerText = item.nightDiscount + "%";
    tr.appendChild(tdNightDiscount);

    var tdWeekendDiscount = document.createElement('td');
    tdWeekendDiscount.setAttribute('data-name', 'weekend-discount');
    tdWeekendDiscount.innerText = item.weekendDiscount + "%";
    tr.appendChild(tdWeekendDiscount);

    var tdOrdersCount = document.createElement('td');
    tdOrdersCount.setAttribute('data-name', 'orders-count');
    tdOrdersCount.innerText = item.ordersCount;
    tr.appendChild(tdOrdersCount);

    var tdOrdersTotalPrice = document.createElement('td');
    tdOrdersTotalPrice.setAttribute('data-name', 'orders-total-price');
    tdOrdersTotalPrice.innerText = "$ " + item.ordersTotalPrice;
    tr.appendChild(tdOrdersTotalPrice);

    var tdUserBonus = document.createElement('td');
    tdUserBonus.setAttribute('data-name', 'user-bonus');
    tdUserBonus.innerText = "$ " + item.bonus;
    tr.appendChild(tdUserBonus);

    var tdTotalDiscount = document.createElement('td');
    tdTotalDiscount.setAttribute('data-name', 'total-discount');
    tdTotalDiscount.innerText = item.getDiscount() + "%";
    tr.appendChild(tdTotalDiscount);

    var tdTotalBonus = document.createElement('td');
    tdTotalBonus.setAttribute('data-name', 'total-bonus');
    tdTotalBonus.innerText = item.getBonus() + "%";
    tr.appendChild(tdTotalBonus);

});

