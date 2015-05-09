# GTimer

GTimer provides a global timer management to make use multiple timers more easier, it's based on 
```javascript
window.setInterval(function () {
	...
}, interval);
```

## Gettting Started

Include the js file as the following:
```html
<script type="text/javascript" src="/js/timer.js"></script>
```

## Create a Job

GTimer treat any interval function as a Job, each job need 3 parameters.
 * id: the uniqueidentifer for job.
 * interval: the interval of job be executed (ms).
 * f: the function will be executed.

You can create a new job as the following:
```javascript
function hello(){
	console.log('hello!');
}
GTimer.add('job1', 3000, hello);
```

## Start/Stop Jobs

 To start/stop all jobs in GTimer, you just need to
 ```javascript
 GTimer.start();
 ```
 or
  ```javascript
 GTimer.stop();
 ```
You can start/stop specific job by id. 
```javascript
GTimer.start('job1');
GTimer.stop('job1');
```

## Manage Jobs

 
If you want to start/stop specific job, you can do it by job id.
```javascript
GTimer.remove('job1');
```
You can get all jobs by
```javascript
var jobs = GTimer.getJobs();
```
It will return an array which contains id & interval for each job, and 
```javascript
GTimer.destory();
```
will clear all jobs and stop the timer.
