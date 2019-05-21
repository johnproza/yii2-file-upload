<?php
/**
 * Created by PhpStorm.
 * User: john
 * Date: 21.05.2019
 * Time: 0:01
 */

namespace oboom\fileupload\controllers;
use Yii;
use yii\data\ArrayDataProvider;
use yii\web\Controller;
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
            return rmdir($path) ? $this->asJson([
                "status" => true
            ]) :  $this->asJson([
                "status" => true
            ]);

        }

        if( $path!="null" && !is_dir($path)){
            return unlink($path) ? $this->asJson([
                "status" => true
            ]) :  $this->asJson([
                "status" => true
            ]);

        }

        if(is_dir($path)) {
            return $this->asJson([
                "status" => false
            ]);
        }

    }

    public function actionCreateFolder($path,$name){
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

    public function actionDownload($path=null){
        if(!is_null($path)){
            if (file_exists($path)) {
//                header('Content-Description: File Transfer');
//                header('Content-Type: application/octet-stream');
//                header('Content-Disposition: attachment; filename="'.basename($path).'"');
//                header('Expires: 0');
//                header('Cache-Control: must-revalidate');
//                header('Pragma: public');
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
//        $line = exec('du -sh ' . $directory);
//        $line = trim(str_replace($directory, '', $line));
//        return $line;

    }

}
