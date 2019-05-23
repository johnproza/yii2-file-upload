<?php
/**
 * Created by PhpStorm.
 * User: john
 * Date: 21.05.2019
 * Time: 0:01
 */

namespace oboom\fileupload\controllers;
use Yii;
use yii\web\Controller;
use yii\web\UploadedFile;
use yii\helpers\FileHelper;


class ApiController extends Controller
{
    public function actionTree($path="null"){
        $path==="null" ? $path=Yii::$app->getModule('file')->uploadFolder : $path;

        //$files = FileHelper::findFiles(Yii::$app->getModule('file')->uploadFolder,['only'=>['*.jpg','*.txt']]);
        //$files2 = FileHelper::findFiles(Yii::$app->getModule('file')->uploadFolder);
        $dir = new \DirectoryIterator($path);
        $folder=[];
        $files=[];
        foreach ($dir as $fileinfo) {
            if ($fileinfo->isDir() && !$fileinfo->isDot()) {
                $folder[]=[
                    'path'=>$fileinfo->getPathname(),
                    'name'=>$fileinfo->getFilename(),
                    'createAt'=>$fileinfo->getATime(),
                    'size'=>round($this->getFolderSize($fileinfo->getPathname())/1000,2)
                ];
            }
            elseif($fileinfo->isFile() && !$fileinfo->isDot()) {
                $files[]=[  'name'=>$fileinfo->getFilename(),
                            'extension'=>$fileinfo->getExtension(),
                            'createAt'=>$fileinfo->getATime(),
                            'path'=>$fileinfo->getPathname(),
                            'size'=>round($fileinfo->getSize()/1000,2)];
            }
        }

        return $this->asJson([
            "folder"=>$folder,
            "files"=>$files,

        ]);
    }

    public function actionRemove($path="null"){
        if( $path!="null" && is_dir($path)){

            return $this->rmdirRecursive($path) ? $this->asJson([
                "status" => true
            ]) :  $this->asJson([
                "status" => false
            ]);

        }

        if( $path!="null" && !is_dir($path)){
            return unlink($path) ? $this->asJson([
                "status" => true
            ]) :  $this->asJson([
                "status" => false
            ]);

        }

        if(is_dir($path)) {
            return $this->asJson([
                "status" => false
            ]);
        }

    }

    public function actionCreateFolder(){
        $path = Yii::$app->request->post('path');
        $name = Yii::$app->request->post('name');

        if(!empty($path) && !empty($name)) {
            if (!is_dir($path.'/'.$name)) {
                $flag = FileHelper::createDirectory($path.'/'.$name);
            }
            return $this->asJson([
                "status"=>$flag,
                "path"=> $path.'/'.$name
            ]);
        }
    }

    public function actionUploadFiles(){ //$path,$name
        $path = Yii::$app->request->post('path');


        if(!empty($path)) {
            $file = UploadedFile::getInstanceByName('file');
            $fileName = $file->baseName.".".$file->getExtension();
            if($file) {
                $file->saveAs($path.'/'.$fileName);
            }


            return $this->asJson([
                "status"=>true,
                "name"=>$fileName,
                "size"=>$file->size,
                "path"=> $path.'/'.$fileName
            ]);
        }
    }



    public function actionDownload($path=null){
        if(!is_null($path)){
            if (file_exists($path)) {
                header('Content-Length: ' . filesize($path));
                $file = readfile($path);
                return $file;
            }

        }
    }

    private function getFolderSize($directory){
            $size = 0;
            foreach(new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directory)) as $file){
                $size+=$file->getSize();
            }
            return $size;


    }

    private function rmdirRecursive($path) {
        foreach(scandir($path) as $file) {
            if ('.' === $file || '..' === $file) continue;
            if (is_dir("$path/$file")) $this->rmdirRecursive("$path/$file");
            else unlink("$path/$file");
        }

        return rmdir($path);
    }

}
