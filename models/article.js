let mongoose = require('mongoose');
let marked = require('marked')
let slugify = require('slugify');
let createDomPurify = require('dompurify');
let { JSDOM } = require('jsdom');
let domPurify = createDomPurify(new JSDOM().window)

let articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    markdown : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },

    slug : {
        type : String,
        required : true,
        unique : true
    },
    sanitizedHTML : {
        type: String,
        required : true
    }
})


articleSchema.pre('validate', function (next){
    if(this.title) {
        this.slug = slugify(this.title, {lower : true, strict : true})
    }

    if (this.markdown) {
        this.sanitizedHTML = domPurify.sanitize(marked(this.markdown)); 
    }

    next()
})

module.exports = mongoose.model('Article',articleSchema);