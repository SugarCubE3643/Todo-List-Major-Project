const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum : ['Personal', 'Work', 'School', 'Cleaning', 'Errands', 'Others'],
	    default: 'Personal',
    },
    done: {
        type: Boolean,
        default: false,
        required: true
    }
});

taskSchema.methods.formatDate = function(dueDate) {
    const newDate = new Date(this[dueDate]);
    let formattedDate = `${ `0${ newDate.getDate() }`.slice(-2) }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`; 
        formattedDate += `${ newDate.getFullYear() }`; 
                
    return formattedDate;
}


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;