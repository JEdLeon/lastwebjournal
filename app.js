const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 3301, () => { console.log('Server Port On-Line') });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let posts = [];

app.route(['/', '/index', '/home'])
    .get((req, res) => {
        res.render('home', {
            homeStartingContent,
            posts
        });
    });

app.route('/about')
    .get((req, res) => {
        res.render('about', {
            aboutContent
        });
    });

app.route('/contact')
    .get((req, res) => {
        res.render('contact', {
            contactContent
        });
    });

app.route('/compose')
    .get((req, res) => {
        res.render('compose');
    })
    .post((req, res) => {
        const post = {title: req.body.postTitle, body: req.body.postBody};
        posts.push(post);
        res.redirect('/home');
    });

app.route('/post/:postName')
    .get((req, res) => {
        let postTitle, postBody;
        for (let post of posts) {
            if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
                postTitle = post.title;
                postBody = post.body;
                break;
            }
            else if(_.toLower(post.title) === _.toLower(req.params.postName)){
                postTitle = post.title;
                postBody = post.body;
                break;
            }
            else{
                postTitle = 'No Matches Found :(';
                postBody = 'Try to search for a different post.';
            }
        }
        res.render('post', {
            postTitle,
            postBody
        });
    });

app.route('/remove')
    .get((req, res) => {
        res.render('remove');
    })
    .post((req, res) => {
        for (let i = 0; i < posts.length; i ++){
            if(_.lowerCase(posts[i].title) === _.lowerCase(req.body.postTitle)){
                posts.splice(i,i);
                break;
            }
            else if(_.toLower(posts[i].title) === _.toLower(req.body.postTitle)){
                posts.splice(i,i);
                break;
            }
        }
        res.redirect('/home');
    });