const gulp = require('gulp');

const util = require('util');

const environment = require('./gulp/environment');

const DefaultRegistry = require('undertaker-registry');

function Registry() {
    DefaultRegistry.call(this);
}

util.inherits(Registry, DefaultRegistry);

Registry.prototype.init = function(taker) {
    

    //taker.task(require('./gulp/tasks/copyHtml'));
    //taker.task(require('./gulp/tasks/copyImages'));
    //taker.task(require('./gulp/tasks/copyScripts'));
    //taker.task(require('./gulp/tasks/copyUnchanged'));

    //taker.task(require('./gulp/tasks/collectViewXml'));

    //taker.task(require('./gulp/tasks/clean'));
    taker.task(require('./gulp/tasks/buildTailWind'));
    //taker.task(require('./gulp/tasks/cleanCache'));
    taker.task(require('./gulp/tasks/browserSync'));

    taker.task(
        'build',
        taker.series(
            taker.parallel(
                'buildTailWind'
            )
        )
    );

    taker.task(
        'watch',
        taker.series(function enableWatch(done) {
            environment.watch = true;
            done();
        }, 'build')
    );

    taker.task('serve', taker.series('watch', 'browserSync'));
};


gulp.registry(new Registry());
