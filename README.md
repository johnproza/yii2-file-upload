Files upload extension for yii2
============================
Files upload extension for yii2.

This is extension, which helps to upload files in backend

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist johnproza/yii2-file-upload "*"
```

or add

```
"johnproza/yii2-file-upload" : "*"
```

to the require section of your `composer.json` file.

Module setup
------------

Insert into your config file
```php
'modules' => [
    'file' => [
        'class' => 'oboom\fileupload\Module',
        'uploadFolder' => '/home/somepath/frontend/web/uploads/files', // path to root file folder
        'extension'=>['jpg','png','jpeg','gif','svg'], //  available extensions of files
        'lang'=>"ru" // change frontend lang  (ru || en)
    ],
]
```
