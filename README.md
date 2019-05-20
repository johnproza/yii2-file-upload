Files upload extension for yii2
============================
Comments extension for items

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
    'fileupload' => [
        'class' => 'oboom\fileupload\Module',
    ],
]
```
