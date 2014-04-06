/**
 * Created by dibster on 2/17/14.
 */
'use strict';

/**
 * create thunbbails
 */

exports.generate = function(req, res) {

    if (req.isImage) {
        res = {'thumbnailUrl': req.targetPath };
    }
    return res;

};

