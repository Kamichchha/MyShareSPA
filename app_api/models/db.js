var mongoose=require('mongoose');
var uri;
if(process.env.NODE_ENV==='production'){
    uri=process.env.MONGOLAB_URI;
}
else{
    uri=process.env.LOCAL_DB_URI;
}


mongoose.connect(uri);

mongoose.connection.on('connected',function(){
    console.log('Connected database on URI: '+uri);
});

mongoose.connection.on('error',function(err){
    console.log('Error connecting to URI : '+uri +'.Error is :'+err);
});

mongoose.connection.on('disconnected',function(){
    console.log('Disconnected database on URI: '+uri);
});

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
         process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./stockModel');
require('./userModel');