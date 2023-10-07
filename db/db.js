const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/bookmysahayak';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to bookmysahayak DB")
})
