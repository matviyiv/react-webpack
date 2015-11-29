var context = require.context('./client', true, /-spec\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);