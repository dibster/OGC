/**
 * Created by dibster on 2/17/14.
 */

'use strict';

var context = require('../config/env/db');
var moment = require('moment');
var _ = require('lodash');


var db = context.db;
var BSON = context.BSON;


exports.copyProject= function(req, res) {
    // req.body will contain, array of people, array of tasks / milestones and list of documents

    var id = req.params.id;
    var copyParms = req.body;

    // calculate the number of days we want to fit the new tasks into
    var scheduleDuration = moment(copyParms.endDate).diff(moment(copyParms.startDate), 'days');

    // calculate the number of elapsed days in the template
    var numberOfTasks = copyParms.tasks.length;
    // get first and last task by checking dates

    // set to position 0 and last one as they are probably right

    var firstDate = copyParms.tasks[0].date;
    var lastDate =  copyParms.tasks[numberOfTasks -1].date;

    for (var i = 1; i< numberOfTasks;i++) {
        if (copyParms.tasks[i].date < firstDate) {
            firstDate = copyParms.tasks[i].date;
        }
        // not else if in case the first and last tasks are reversed because of the order they were added
        if (copyParms.tasks[i].date > lastDate) {
            lastDate = copyParms.tasks[i].date;
        }
    }

    var templateDuration = moment(lastDate).diff(moment(firstDate), 'days');

    // We need to recalculate the tasks using the proportion of days based on the template and my desired duration

    var squashFactor = scheduleDuration / templateDuration;

    var newTasks = [];
    var newTask = {};
    var user = 1;

    // set the first task
    newTask.name = copyParms.tasks[0].name;
    newTask.who = copyParms.tasks[0].who;
    newTask.date = copyParms.startDate;
    newTask.u = user;
    newTask.cd = new Date();

    newTasks.push(newTask);

    // loop through and set new Tasks

    for (i=1;i<numberOfTasks;i++) {
        var additionalTask = {};
        // diff between tasks in days
        var diff = moment(copyParms.tasks[i].date).diff(moment(copyParms.tasks[i-1].date),'days');
        var daysToAdd = Math.round(diff * squashFactor);

        var calculatedDate = moment(newTasks[i-1].date).add('days', daysToAdd);
        if (!copyParms.useWeekends) {
            if (calculatedDate.day() === 6) {
                calculatedDate.subtract('d', 1);
            }
            else if (calculatedDate.day() === 7) {
                calculatedDate.add('d', 1);
            }
        }

        additionalTask.name = copyParms.tasks[i].name;
        additionalTask.who = copyParms.tasks[i].who;
        additionalTask.date = calculatedDate.toJSON();
        additionalTask.u = user;
        additionalTask.cd = new Date();
        newTasks.push(additionalTask);
    }

    // retrieve latest version of PRoject and add teh new Tasks to it
    db.collection('ogcprojects', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            if (item.length === 0) {
                // set 404
                res.status(404).send('Not found');
            }
            else {

                // add the new tasks, tasks may be undefined if it is empty

                if (!(_.has(item, 'tasks'))){
                    item.tasks = newTasks;
                }
                else {
                    var currentTasks = item.tasks;
                    item.tasks = currentTasks.concat(newTasks);
                }

                var object = item;

                // Update TimeStamp Data
                object.md = new Date();

                db.collection('ogcprojects', function(err, collection) {
                    collection.update({'_id': new BSON.ObjectID(id)}, object, {safe: true}, function(err, result) {
                        if (err) {
                            console.log('Error updating object: ' + err);
                            res.send({'error': 'An error has occurred'});
                        } else {
                            console.log('' + result + ' document(s) updated');
                            res.send(object);
                        }
                    });
                });
            }
        });
    });
};
