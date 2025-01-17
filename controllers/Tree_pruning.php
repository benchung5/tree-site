<?php
namespace Controllers;
use Lib\Controller;

class Tree_pruning extends Controller 
{
	public function __construct() 
	{
		parent::__construct();
	}

	public function index() 
	{
		$this->render('tree_pruning', null);
	}
}