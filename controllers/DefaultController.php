<?php
/**
 * Created by PhpStorm.
 * User: john
 * Date: 12.11.2018
 * Time: 12:59
 */

namespace oboom\fileupload\controllers;
use Yii;
use yii\web\Controller;
use yii\data\ArrayDataProvider;


class DefaultController extends Controller
{



    public function actionIndex($cat=null,$item=null){
        return $this->render('index');

    }

}

