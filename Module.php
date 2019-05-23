<?php

namespace oboom\fileupload;

use Yii;
use yii\helpers\Inflector;


class Module extends \yii\base\Module
{
    /**
     * @inheritdoc
     */
    public $userIdentityClass;
    public $defaultRoute = 'default';
    public $extension = ['jpg','png','jpeg','gif','svg'];
    public $uploadFolder = 'F:\OSPanel\domains\cms\core\frontend\web\uploads\files';
    public $controllerNamespace = 'oboom\fileupload\controllers';
    public $lang = "en";
    public $mainLayout = '@oboom/fileupload/views/layouts/main.php';

    public function init()
    {

        parent::init();

        if ($this->userIdentityClass === null) {
            $this->userIdentityClass = Yii::$app->getUser()->identityClass;
        }
    }
}
