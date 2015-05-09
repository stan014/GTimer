var GTimer = function () {
    var unit = 1000;
    var isStart = false;
    var jobs = [];
    var timer;
    function Job(n, i, f) {
        var countdown = i;
        var enable = false;
        this.id = n;
        this.interval = i;
        this.Work = f;
        this.step = function () {
            if (enable) {
                countdown -= unit;
                if (countdown <= 0) {
                    countdown = this.interval;
                    this.Work();
                }
            }
        }
        this.start = function () {
            if (!enable) {
                countdown = this.interval;
                enable = true;

            }
        }
        this.stop = function () {
            enable = false;
        }
        this.toggle = function (e) {
            if (e) {
                this.start();
            } else {
                this.stop();
            }
        }
        this.getDesc = function () {
            return { id: this.id, interval: this.interval };
        }
    }

    function find(id) {
        for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].id == id) {
                return { i: i, item: jobs[i] };
            }
        }
    }

    function toggle(id, enable) {
        if (id) {
            var exist = find(id);
            if (exist) {
                exist.item.toggle(enable);
            }
        } else {
            for (var i = 0; i < jobs.length; i++) {
                jobs[i].toggle(enable);
            }
        }
        if (enable && !isStart) {
            isStart = true;
            timer = window.setInterval(function () {
                for (i = 0; i < jobs.length; i++) {
                    jobs[i].step();
                }
            }, unit);
        }
    }

    return {
        add: function (id, interval, hanlder) {
            var j = new Job(id, interval, hanlder);
            var exist = find(id);
            if (exist) {
                jobs[exist.i] = j;
            } else {
                jobs.push(j);
            }
        },
        remove: function (id) {
            var exist = find(id);
            if (exist) {
                jobs.splice(exist.i, 1);
            }
        },
        getJobs: function () {
            var list = [];
            for (var i = 0; i < jobs.length; i++) {
                list.push(jobs[i].getDesc());
            }
            return list;
        },
        start: function (id) {
            toggle(id, true);
        },
        stop: function (id) {
            toggle(id, false);
        },
        destory: function () {
            jobs = [];
            if (isStart) {
                isStart = false;
                clearInterval(timer);
            }
        }
    }
}();
