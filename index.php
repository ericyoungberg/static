<?php

/**
 * Setup
 */

require_once '.env.php';
require_once 'functions.php';


$page = basename($_SERVER['REQUEST_URI']);
$page = str_replace('.php', '', $page);

$page = ($_GET['request'] === str_replace('/', '', BASE_DIR) . '/' || empty($_GET['request'])) ? 'index' : trim(str_replace(BASE_DIR, '', $_GET['request']), '/');


/**
 * Config defaults
 */

$PAGE = [
  "show_footer" => true
];


/**
 * Load the content
 */
if (empty($_GET['action'])) {
  require_once 'pages/partials/header.php';
}

if (file_exists("pages/$page.php")) {
  require_once "pages/$page.php";
}
else {
  require_once "pages/errors/404.php";
}

require_once 'pages/partials/footer.php';


exit();
