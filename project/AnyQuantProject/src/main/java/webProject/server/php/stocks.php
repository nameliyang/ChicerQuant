<?php
/**
 * Created by PhpStorm.
 * User: G
 * Date: 16/5/19
 * Time: 下午11:26
 */
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Headers: X-Requested-With');
   header("Access-Control-Allow-Method: GET");
require_once('db_login.php');
header("Content-Type: text/json;charset=utf8");

    function allStocksForPotato()
    {
        $connection = getDBConnection();
        $stmt = $connection->prepare("select stock_id,stock_name from industry_stock");
        return execQuery($connection,$stmt);
    }
    echo allStocksForPotato();
?>