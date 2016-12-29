<?php


/**
 * Utilities
 */
function asset($str, $return = false) {
  $asset = rtrim(BASE_URL, '/') . '/assets/' . ltrim($str, '/');

  if ($return) {
    return $asset;
  }
  else {
    echo $asset; 
  }
}

function anchor($str, $return = false) {
  $anchor = rtrim(BASE_URL, '/') . '/' . ltrim($str, '/');

  if ($return) {
    return $anchor; 
  }
  else {
    echo $anchor; 
  }
}

function redirect($route) {
  header("Location: $route");
  exit();
}

