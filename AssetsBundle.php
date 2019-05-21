<?php
/**
 * Created by PhpStorm.
 * User: john
 * Date: 12.11.2018
 * Time: 13:20
 */

namespace oboom\fileupload;
use yii\web\AssetBundle;

class AssetsBundle extends AssetBundle
{
    public $sourcePath = '@vendor/johnproza/yii2-file-upload/assets';
    public $css = [
        'css/style.css',
        'css/ionicons.min.css',
    ];
    public $js = [
        'js/main.bundle.js',
        'js/note-tree.bundle.js',
        'js/vendors~note-tree.bundle.js',
        'js/system.bundle.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
    ];

    public $publishOptions = [
        'forceCopy' => true,
    ];
}